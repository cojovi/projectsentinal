const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const cheerio=require('cheerio');
const c=require('../authority/contract.cjs');
const {serve}=require('./server.cjs');
const root=path.resolve(__dirname,'..'),out=path.join(root,'public');
const read=f=>fs.readFileSync(path.join(out,f),'utf8');
const map=JSON.parse(read('authority-map.json'));
const restored=()=>map.articles.find(a=>a.key==='2026-09-23-they-cloned-johnny-depp-to-accuse-tom-hanks');

test('publisher-restored Depp story is published with original title, complete reader/API, hero and no stale withdrawal metadata',()=>{
 const a=restored();assert.ok(a);assert.equal(a.withdrawn,false);assert.equal(a.publication_state,'published');assert.equal(a.robots,c.robots.indexable);assert.equal(a.type,'analysis');
 const $=cheerio.load(read(a.path.slice(1)+'/index.html'));assert.equal($('h1').text(),a.title);assert.match(a.title,/^They Cloned Johnny Depp/);assert.equal($('meta[name="robots"]').attr('content'),c.robots.indexable);assert.equal($('.withdrawal-status,.evidence-limits,.corrections').length,0);assert.equal($('.next-read').length,1);assert.ok($('.article-body').text().length>5000);assert.equal($('.sentinel-hero').length,1);
 const api=JSON.parse(read(a.api.slice(1)));assert.equal(api.withdrawn,false);assert.equal(api.robots,a.robots);assert.equal(api.title,a.title);assert.equal(JSON.parse($('#sentinel-schema').text()).creativeWorkStatus,undefined);
 for(const route of [a.path,a.path+'/',a.path+'/index.html',...a.aliases,a.api])assert.ok(!read('_headers').includes(route+'\n  X-Robots-Tag: noindex, follow\n'),route);
});
test('restored story participates in ordinary homepage, sitemap, RSS, archive and native search discovery',()=>{
 const a=restored();assert.equal(map.articles.filter(x=>x.withdrawn).length,0);
 for(const file of ['index.html','rss.xml','post-sitemap.xml','archives/index.html'])assert.ok(read(file).includes(a.path),file);
 const archive=cheerio.load(read('archives/index.html'));assert.equal(archive(`a[href="${a.path}"]`).text(),a.title);assert.ok(read('api/search.json').includes(a.key));
 const corrections=cheerio.load(read('corrections/index.html'));assert.match(corrections('article').text(),/now published again, not withdrawn/);assert.match(corrections('article').text(),/historical actions/);
});
test('ten restoration records preserve historical checked-body ledgers without falsely binding them to restored originals',()=>{
 const reviews=fs.readdirSync(path.join(root,'reviews')).filter(f=>f.endsWith('.json'));assert.equal(reviews.length,10);
 for(const file of reviews){
  const r=JSON.parse(fs.readFileSync(path.join(root,'reviews',file)));assert.equal(r.status,'source-review-pending');assert.equal(r.source_sha256,undefined);assert.equal(r.checked_at,undefined);assert.equal(r.review_process.completed_full_factcheck,false);assert.equal(r.review_process.human_reviewer,null);assert.equal(r.claims.length,0);assert.ok(r.unknowns.length);assert.equal(r.restoration.verification_performed,false);
  const historical=r.history.at(-1).record;assert.equal(historical.status,'documented');assert.match(historical.source_sha256,/^[a-f0-9]{64}$/);assert.equal(historical.review_process.completed_full_factcheck,false);assert.equal(historical.review_process.human_reviewer,null);assert.ok(historical.claims.length);assert.ok(historical.scope.includes('not a full article fact-check'));
  for(const claim of historical.claims){assert.ok(claim.unknowns);assert.ok(['supported','attributed','uncertain','opinion'].includes(claim.disposition));for(const u of claim.sources)assert.ok(historical.sources.includes(u));}
  for(const checked of historical.checked_sources||[]){assert.ok(checked.checked_excerpt);assert.match(checked.source_text_sha256,/^[a-f0-9]{64}$/);assert.ok(historical.sources.includes(checked.url));}
 }
});
test('a future genuine withdrawal retains noindex, correction schema and mandatory evidence even with notices disabled',()=>{
 const source={key:'test-only-withdrawal',data:{title:'Test-only withdrawal fixture',date:'2026-01-01',publication_state:'withdrawn',editorial_notices:false,cover:'/fixture.png'},body:'Test-only historical record.'};
 const a=c.normalize(source,'<p>Test-only historical record.</p>',c.urlMap([source]));const $=cheerio.load(a.content);
 assert.equal(a.withdrawn,true);assert.equal(a.robots,c.robots.noindex);assert.equal(a.schema.creativeWorkStatus,'Withdrawn');assert.equal(a.schema.image,undefined);assert.equal($('.withdrawal-status').length,1);assert.equal($('.evidence-limits').length,1);assert.equal($('.corrections').length,1);assert.equal($('.sentinel-hero,.next-read').length,0);
});
test('static host fixture still applies exact noindex headers to synthetic withdrawals/aliases without contaminating ordinary or unknown routes',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'sentinel-withdrawal-host-'));let server;
 try{
  const route='/post/test-only-withdrawal';const api='/api/articles/test-only-withdrawal.json';const targets=[route,route+'/',route+'/index.html',route+'.html',api];
  fs.mkdirSync(path.join(temp,'post/test-only-withdrawal'),{recursive:true});fs.mkdirSync(path.join(temp,'api/articles'),{recursive:true});
  fs.writeFileSync(path.join(temp,'_headers'),targets.map(p=>p+'\n  X-Robots-Tag: noindex, follow\n').join(''));
  fs.writeFileSync(path.join(temp,'_redirects'),route+' '+route+'/index.html 200!\n'+route+'.html '+route+' 301!\n');
  fs.writeFileSync(path.join(temp,route+'/index.html'),'<h1>Test-only withdrawal</h1>');fs.writeFileSync(path.join(temp,api),'{}');fs.writeFileSync(path.join(temp,'ordinary.html'),'<h1>Ordinary test fixture</h1>');fs.writeFileSync(path.join(temp,'404.html'),read('404.html'));
  server=serve(temp);await new Promise(r=>server.listen(0,'127.0.0.1',r));const host='http://127.0.0.1:'+server.address().port;
  for(const p of targets){const r=await fetch(host+p,{redirect:'manual'});assert.equal(r.headers.get('x-robots-tag'),'noindex, follow',p);assert.ok([200,301].includes(r.status));}
  assert.equal((await fetch(host+'/ordinary.html')).headers.get('x-robots-tag'),null);const missing=await fetch(host+'/post/not-a-real-fixture');assert.equal(missing.status,404);assert.match(await missing.text(),/name="robots" content="noindex, follow"/);
 }finally{if(server){server.closeAllConnections();await new Promise(r=>server.close(r));}fs.rmSync(temp,{recursive:true,force:true});}
});
