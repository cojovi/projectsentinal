const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const c=require('../authority/contract.cjs');
const quality=require('../authority/quality.cjs');
const root=path.resolve(__dirname,'..');
const expected=require('./fixtures/backlog-recovery-20261105.json');
const map=JSON.parse(fs.readFileSync(path.join(root,'public/authority-map.json')));
test('approved recovered articles retain original editorial dates, no reader-facing recovery notes, ledgers, images and complete discovery',()=>{
 assert.equal(expected.length,9);
 const legacy=new Set(require('../authority/legacy-articles.json'));
 for(const item of expected){
  assert.ok(!legacy.has(item.key),'new articles cannot be grandfathered');
  const source=c.readSource(path.join(root,'source/_posts',item.key+'.md'));
  const record=map.articles.find(a=>a.key===item.key);assert.ok(record,item.key);
  assert.equal(record.published.slice(0,10),item.date);assert.ok(record.updated>=record.published);
  assert.doesNotMatch(source.body,/Archival note:|Originally scheduled/);
  const review=JSON.parse(fs.readFileSync(path.join(root,'reviews',item.key+'.json')));
  assert.equal(review.source_sha256,quality.bodyHash(source.body));assert.ok(review.claims.length);
  assert.equal(quality.check(source,review).pass,true);
  assert.equal(source.data.author,'Protocol Sentinel desk');assert.equal(source.data.editorial_notices,false);
  const bytes=fs.readFileSync(path.join(root,'source',source.data.cover));
  assert.equal(bytes.readUInt32BE(16),1600);assert.equal(bytes.readUInt32BE(20),900);
  for(const file of ['index.html','archives/index.html','post-sitemap.xml','rss.xml'])assert.ok(fs.readFileSync(path.join(root,'public',file),'utf8').includes(record.path),file+': '+item.key);
 }
});
