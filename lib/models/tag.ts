import warehouse from 'warehouse';
import { slugize, full_url_for } from 'hexo-util';
const { hasOwnProperty: hasOwn } = Object.prototype;
import type Hexo from '../hexo';

export = (ctx: Hexo) => {
  const Tag = new warehouse.Schema({
    name: {type: String, required: true}
  });

  // Check for duplicate tags (case-insensitive) before saving
  Tag.pre('save', function(next) {
    if (this.name && typeof this.name === 'string') {
      const TagModel = ctx.model('Tag');
      // Find all tags and check for case-insensitive duplicates
      const allTags = TagModel.find({}, {lean: true});
      const normalizedName = this.name.toLowerCase();
      
      for (const tag of allTags) {
        if (tag.name && tag.name.toLowerCase() === normalizedName) {
          // Skip if it's the same document being updated
          if (tag._id && this._id && tag._id.toString() === this._id.toString()) {
            continue;
          }
          // Tag with same name (case-insensitive) already exists
          return next(new Error(`Tag \`${this.name}\` already exists (case-insensitive match with \`${tag.name}\`)!`));
        }
      }
    }
    next();
  });

  Tag.virtual('slug').get(function() {
    const map = ctx.config.tag_map || {};
    let name = this.name;
    if (!name) return;

    if (Reflect.apply(hasOwn, map, [name])) {
      name = map[name] || name;
    }

    // Always use lowercase transform for tags to ensure consistent URLs
    // This prevents issues where tags with different cases create different slugs
    return slugize(name, {transform: 1}); // 1 = lowercase
  });

  Tag.virtual('path').get(function() {
    let tagDir = ctx.config.tag_dir;
    if (!tagDir.endsWith('/')) tagDir += '/';

    return `${tagDir + this.slug}/`;
  });

  Tag.virtual('permalink').get(function() {
    return full_url_for.call(ctx, this.path);
  });

  Tag.virtual('posts').get(function() {
    const PostTag = ctx.model('PostTag');

    const ids = PostTag.find({tag_id: this._id}).map(item => item.post_id);

    return ctx.locals.get('posts').find({
      _id: {$in: ids}
    });
  });

  Tag.virtual('length').get(function() {
    // Note: this.posts.length is also working
    // But it's slow because `find` has to iterate over all posts
    const PostTag = ctx.model('PostTag');

    return PostTag.find({tag_id: this._id}).length;
  });

  // Note: Duplicate check moved to pre-save hook above for case-insensitive checking

  // Remove PostTag references
  Tag.pre('remove', data => {
    const PostTag = ctx.model('PostTag');
    return PostTag.remove({tag_id: data._id});
  });

  return Tag;
};
