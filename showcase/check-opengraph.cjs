// Exercise the actual Hexo filter without a running Hexo instance or network calls.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const test = require('node:test');
let filter;
vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname, '../blog/scripts/opengraph.js'), 'utf8'), {
  hexo: { extend: { filter: { register(name, fn) { assert.equal(name, 'after_render:html'); filter = fn; } } } }
});
const context = {config: {title: 'Example Publication', url: 'https://example.invalid'}, theme: {config: {site_meta: {description: 'Default description'}}}};
const run = (html, page) => filter.call(context, html, page);
test('article metadata escapes attributes and normalizes GitHub artwork', () => {
 const out = run('<html><head></head><body></body></html>', {page: {title: 'A "quoted" <title>', layout: 'post', description: '<b>Readable</b> & useful', cover: 'https://github.com/example/site/blob/main/art/hero.png?raw=true', path: 'post/test.html'}});
 assert.ok(out.includes('content="A &quot;quoted&quot; &lt;title&gt;"'));
 assert.ok(out.includes('content="Readable &amp; useful"'));
 assert.ok(out.includes('content="article"'));
 assert.ok(out.includes('https://raw.githubusercontent.com/example/site/main/art/hero.png'));
 assert.ok(out.includes('content="https://example.invalid/post/test.html"'));
 assert.ok(out.includes('content="image/png"'));
 assert.ok(out.includes('content="summary_large_image"'));
});
test('existing social fields are retained without duplication on rerender', () => {
 const out = run('<head><meta property="og:title" content="Existing"><meta name="twitter:title" content="Existing"></head>', {title: 'Replacement'});
 assert.equal((out.match(/property="og:title"/g)||[]).length, 1);
 assert.equal((out.match(/name="twitter:title"/g)||[]).length, 1);
 assert.ok(out.includes('content="Existing"'));
 assert.equal(run(out, {title: 'Replacement'}), out);
});
test('relative covers resolve against the publication URL', () => {
 const out = run('<head></head>', {cover: '/media/hero.webp'});
 assert.ok(out.includes('https://example.invalid/media/hero.webp'));
 assert.ok(out.includes('content="image/webp"'));
});
test('body image fallback and imageless cards remain meaningful', () => {
 assert.ok(run('<head></head><img src="/cover.jpg">', {}).includes('https://example.invalid/cover.jpg'));
 const out = run('<head></head>', {});
 assert.ok(out.includes('name="twitter:card" content="summary"'));
 assert.ok(!out.includes('property="og:image"'));
});
test('missing HTML head or render data is unchanged', () => {
 assert.equal(run('<main>No head</main>', {}), '<main>No head</main>');
 assert.equal(run('<head></head>', null), '<head></head>');
 assert.equal(run('', {}), '');
});
