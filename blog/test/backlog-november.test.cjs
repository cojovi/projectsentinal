const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');
const c=require('../authority/contract.cjs');const q=require('../authority/quality.cjs');
const root=path.resolve(__dirname,'..');
const expected=[
 ['2026-11-07-what-powers-googles-wyoming-promise','2026-11-07T09:32:00.000Z'],
 ['2026-11-12-what-did-google-prove-about-signal','2026-11-12T09:39:00.000Z'],
 ['2026-11-14-what-chatgpt-wallet-actually-authorizes','2026-11-14T21:42:00.000Z'],
 ['2026-11-17-what-did-the-ai-attacker-actually-prove','2026-11-17T09:48:57.000Z'],
 ['2026-11-22-why-is-signal-taking-away-the-screenshot','2026-11-22T09:59:12.000Z']
];
test('remaining approved November backlog retains provenance dates, complete bodies and native publication contracts',()=>{
 const map=JSON.parse(fs.readFileSync(path.join(root,'public/authority-map.json')));
 for(const [key,date] of expected){
  const source=c.readSource(path.join(root,'source/_posts',key+'.md'));
  const review=JSON.parse(fs.readFileSync(path.join(root,'reviews',key+'.json')));
  assert.equal(c.isPublished(source),true);assert.equal(q.check(source,review).pass,true);
  assert.equal(q.bodyHash(source.body),review.source_sha256);
  assert.equal(c.date(source.data.date),date);assert.ok(c.date(source.data.updated)>date);
  assert.doesNotMatch(source.body,/INTERNAL DRAFT|Originally scheduled|recovery batch|publication held/i);
  const article=map.articles.find(x=>x.key===key);assert.ok(article);
  assert.equal(article.published,date);assert.equal(article.schema.mainEntityOfPage,c.base+article.path);
  const bytes=fs.readFileSync(path.join(root,'source',source.data.cover));
  assert.equal(bytes.readUInt32BE(16),1600);assert.equal(bytes.readUInt32BE(20),900);
  const html=fs.readFileSync(path.join(root,'public',article.path,'index.html'),'utf8');
  assert.match(html,/class="article-body"/);assert.ok(html.includes(source.data.title.replaceAll('&','&amp;')));
  for(const file of ['index.html','archives/index.html','post-sitemap.xml','rss.xml'])assert.ok(fs.readFileSync(path.join(root,'public',file),'utf8').includes(article.path));
 }
});
test('Spirit later safeguards are explicit and Meta uses the recovered original rating action, not public recovery notes',()=>{
 const spirit=c.readSource(path.join(root,'source/_posts/2026-10-13-what-happens-to-work-chats-when-company-disappears.md'));
 assert.match(spirit.body,/Later developments: November 2026/);assert.match(spirit.body,/ISO 27559/);assert.match(spirit.body,/judicial approval/);
 const meta=c.readSource(path.join(root,'source/_posts/2026-11-02-metas-ai-warning-has-a-lease-attached.md'));
 assert.match(meta.body,/3652897/);assert.match(meta.body,/affirmed its ratings/);
 assert.doesNotMatch(meta.body,/recovery check|during recovery|preserved reporting/);
});
