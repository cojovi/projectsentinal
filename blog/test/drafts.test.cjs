/* All mutations are confined to a disposable script root; never invoke production Python generators. */
const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const os=require('node:os');const path=require('node:path');const {spawnSync}=require('node:child_process');const c=require('../authority/contract.cjs');
const regularFiles=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?regularFiles(path.join(dir,e.name)):e.isFile()?[path.join(dir,e.name)]:[]);
const formats=['stale.html','stale.json','stale.xml','stale.js','stale.css','stale.txt','extensionless','stale.bin'];
function assertNoMarker(dir,marker){assert.ok(fs.lstatSync(dir).isDirectory(),'output root must be a real directory');const files=regularFiles(dir),needle=Buffer.from(marker);for(const file of files)assert.ok(!fs.readFileSync(file).includes(needle),file);return files.length;}
test('marker scanner rejects every regular file format and never follows output symlinks',()=>{
 const sandbox=fs.mkdtempSync(path.join(os.tmpdir(),'ps-marker-scan-')),out=path.join(sandbox,'public'),outside=path.join(sandbox,'outside'),marker='PSQASCANMARKER4B72';
 try{
  fs.mkdirSync(out);fs.mkdirSync(outside);fs.writeFileSync(path.join(outside,'private.bin'),marker);
  fs.symlinkSync(outside,path.join(out,'untrusted-directory'),'dir');fs.symlinkSync(path.join(outside,'private.bin'),path.join(out,'untrusted-file'));
  for(const name of formats){const file=path.join(out,name);fs.writeFileSync(file,Buffer.concat([Buffer.from([0xff,0,0x80]),Buffer.from(marker),Buffer.from([0,0xfe])]));assert.throws(()=>assertNoMarker(out,marker),{code:'ERR_ASSERTION'},name+' must be inspected');fs.rmSync(file);}
  fs.writeFileSync(path.join(out,'ordinary-file'),Buffer.from([0,1,0xff]));assert.equal(assertNoMarker(out,marker),1);
 }finally{fs.rmSync(sandbox,{recursive:true,force:true});}
});
test('one publication predicate excludes both draft states and draft storage even with explicit published true',()=>{for(const data of [{draft:true},{published:false},{draft:true,published:true}]){const s={key:'draft',data};assert.equal(c.isPublished(s),false);assert.equal(c.urlMap([s]).articles.length,0);}assert.equal(c.isPublished({source:'_drafts/example.md',published:true}),false);assert.equal(c.isPublished({data:{published:true}}),true);assert.throws(()=>c.normalize({key:'qa-draft',data:{draft:true}},'',{articles:[]}),/unpublished/);});
test('clean isolated builds exclude invalid draft markers from every emitted regular file and enforce explicit publication gate',{timeout:180000},t=>{
 const original=path.resolve(__dirname,'..'),sandbox=fs.mkdtempSync(path.join(os.tmpdir(),'ps-draft-exclusion-')),root=path.join(sandbox,'blog'),marker='PSQADRAFTMARKER9C2E'+path.basename(sandbox);
 try{
  fs.cpSync(original,root,{recursive:true,filter:src=>!['node_modules','public','db.json','.deploy_git'].includes(path.basename(src))});fs.symlinkSync(path.join(original,'node_modules'),path.join(root,'node_modules'),'dir');fs.symlinkSync(path.resolve(original,'../test'),path.join(sandbox,'test'),'dir');
  const fixture=(state,title=marker)=>`---\ntitle: ${title}\ndate: 2026-10-28T12:00:00Z\nauthor: Invented QA Credentials\ntags: [${marker}]\ncategories: [${marker}]\nfeature: true\npinned: true\n${state}\n---\n${marker} invalid byline, no supporting sources. Complete draft body.\n`;
  const fixtures=[['_posts/2099-01-01-qa-legacy-draft.md','draft: true\npublished: true'],['_posts/2099-01-02-qa-hexo-draft.md','published: false'],['_posts/2099-01-03-qa-draft-only.md','draft: true'],['_drafts/qa-storage-draft.md','published: true']];
  for(const [file,state]of fixtures){const target=path.join(root,'source',file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,fixture(state));assert.equal(c.isPublished(c.readSource(target)),false);}
  // Clean must remove stale private markers regardless of suffix or byte encoding.
  const stale=path.join(root,'public/qa-stale');fs.mkdirSync(stale,{recursive:true});for(const name of formats)fs.writeFileSync(path.join(stale,name),Buffer.concat([Buffer.from([0xff,0,0x80]),Buffer.from(marker),Buffer.from([0,0xfe])]));
  const build=()=>spawnSync(process.execPath,[path.join(root,'authority/build.cjs')],{cwd:root,encoding:'utf8',timeout:90000});
  let r=build();assert.equal(r.status,0,r.stdout+r.stderr);
  // Remove fixtures before output assertions; this test never mutates the working corpus.
  for(const [file]of fixtures)fs.rmSync(path.join(root,'source',file));
  for(const name of formats)assert.equal(fs.existsSync(path.join(stale,name)),false,name+' stale output survives clean');
  t.diagnostic('Scanned '+assertNoMarker(path.join(root,'public'),marker)+' emitted regular files as bytes, including all asset formats.');
  const map=JSON.parse(fs.readFileSync(path.join(root,'public/authority-map.json')));assert.equal(map.articles.length,77);assert.equal(regularFiles(path.join(root,'public/api/articles')).length,77);assert.equal(map.articles.reduce((n,a)=>n+a.aliases.length,0),97);
  const published=path.join(root,'source/_posts/2026-10-28-qa-explicit-publication.md');fs.writeFileSync(published,fixture('published: true','Explicit publication gate probe'));
  r=build();assert.notEqual(r.status,0,'explicit publication must pass quality gate');assert.match(r.stdout+r.stderr,/Publishing gate:.*qa-explicit-publication/);
  r=spawnSync(process.execPath,[require.resolve('hexo/bin/hexo'),'generate'],{cwd:root,encoding:'utf8',timeout:90000});assert.notEqual(r.status,0,'direct Hexo must fail the same publication gate, not swallow a script-load error');assert.match(r.stdout+r.stderr,/Publishing gate:.*qa-explicit-publication/);
  if(fs.existsSync(path.join(root,'public')))assertNoMarker(path.join(root,'public'),marker);
 }finally{fs.rmSync(sandbox,{recursive:true,force:true});}
});
