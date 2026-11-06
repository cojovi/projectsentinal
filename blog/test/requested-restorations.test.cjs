const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const yaml=require('js-yaml');const cheerio=require('cheerio');const {marked}=require('marked');const c=require('../authority/contract.cjs');
const root=path.resolve(__dirname,'..');const fixture=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/publisher-restorations.json'),'utf8'));
function original(f){const m=f.source.match(/^---\r?\n([\s\S]*?)\r?\n---\s*\n/);return {data:yaml.load(m[1]),body:f.source.slice(m[0].length)};}
function actualSource(f){return c.readSource(path.join(root,f.path.replace(/^blog\//,'')));}
const map=c.urlMap(fixture.map(actualSource));
test('all ten selected Protocol Sentinel articles restore exact original title, body, date and taxonomy',()=>{
 assert.equal(fixture.length,10);
 for(const f of fixture){const a=actualSource(f),o=original(f);assert.equal(a.data.title,o.data.title,f.path+' title');assert.equal(a.body,o.body,f.path+' exact original body');assert.equal(c.date(a.data.date),c.date(o.data.date));assert.deepEqual(a.data.tags,o.data.tags);assert.deepEqual(a.data.categories,o.data.categories);assert.equal(c.publication(a).withdrawn,false);assert.equal(a.data.editorial_notices,false);}
});
test('restored original copies have pending current evidence instead of a stale documented-body verification',()=>{
 for(const f of fixture){const s=actualSource(f);const review=JSON.parse(fs.readFileSync(path.join(root,'reviews',s.key+'.json'),'utf8'));assert.equal(review.status,'source-review-pending',s.key);assert.equal(review.source_sha256,undefined,s.key+' no recomputed verification hash');assert.ok(review.history?.length,s.key+' retained dated history');const a=c.normalize(s,marked.parse(s.body),map,review);assert.equal(a.withdrawn,false);assert.equal(a.evidence.status,'source-review-pending');const $=cheerio.load(a.content);assert.equal($('.evidence-limits,.corrections,.withdrawal-status').length,0,s.key+' notice-free original');assert.ok($('.article-body').text().length>1000,s.key);}
});
test('restored Depp article and all other selected originals are in emitted reader/API and normal discovery',()=>{
 const publicRoot=path.join(root,'public');const emitted=JSON.parse(fs.readFileSync(path.join(publicRoot,'authority-map.json'),'utf8'));const sitemap=fs.readFileSync(path.join(publicRoot,'post-sitemap.xml'),'utf8');const home=fs.readFileSync(path.join(publicRoot,'index.html'),'utf8');
 for(const f of fixture){const key=path.basename(f.path,'.md');const item=emitted.articles.find(x=>x.key===key);assert.ok(item,key);assert.equal(item.withdrawn,false,key);assert.equal(item.title,original(f).data.title);assert.ok(sitemap.includes(c.base+item.path),key);assert.ok(home.includes(item.path),key+' ordinary homepage discovery');const api=JSON.parse(fs.readFileSync(path.join(publicRoot,item.api),'utf8'));const $=cheerio.load(api.content);assert.equal($('.evidence-limits,.corrections,.withdrawal-status').length,0,key);assert.equal(api.title,item.title);assert.match(api.robots,/^index/);}
});
test('notice preference cannot suppress a genuine withdrawal record',()=>{
 const s={key:'synthetic-withdrawn-fixture',data:{title:'Fixture',date:'2026-01-01',publication_state:'withdrawn',editorial_notices:false},body:'Historical record.'};const a=c.normalize(s,'<p>Historical record.</p>',c.urlMap([s]));const $=cheerio.load(a.content);assert.equal($('.withdrawal-status').length,1);assert.equal($('.evidence-limits').length,1);assert.equal(a.robots,c.robots.noindex);
});
