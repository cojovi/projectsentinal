/* Compare a disposable future-mtime build with the final root build; never touch retained source mtimes. */
const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const os=require('node:os');const path=require('node:path');const {spawnSync}=require('node:child_process');const c=require('../authority/contract.cjs');
test('future source mtimes cannot change complete bodies, source dates, schemas, host rules or emitted reader assets',{timeout:120000},()=>{
 const original=path.resolve(__dirname,'..'),out=path.join(original,'public'),sandbox=fs.mkdtempSync(path.join(os.tmpdir(),'ps-mtime-proof-')),root=path.join(sandbox,'blog');
 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
 const posts=path.join(original,'source/_posts');const sources=fs.readdirSync(posts).filter(f=>f.endsWith('.md')&&!f.startsWith('.')).map(f=>c.readSource(path.join(posts,f))).filter(c.isPublished);
 const selected=[sources.find(s=>!s.data.updated),sources.find(s=>s.key.includes('2026-10-22-what-happens'))];assert.ok(selected.every(Boolean));
 const originalStats=selected.map(s=>fs.statSync(s.source,{bigint:true}).mtimeNs);
 try{
  fs.cpSync(original,root,{recursive:true,filter:src=>!['node_modules','public','db.json','.deploy_git'].includes(path.basename(src))});fs.symlinkSync(path.join(original,'node_modules'),path.join(root,'node_modules'),'dir');fs.symlinkSync(path.resolve(original,'../test'),path.join(sandbox,'test'),'dir');
  for(const s of selected)fs.utimesSync(path.join(root,'source/_posts',s.key+'.md'),new Date('2031-01-01'),new Date('2031-01-01'));
  const r=spawnSync(process.execPath,[path.join(root,'authority/build.cjs')],{cwd:root,encoding:'utf8',timeout:90000});assert.equal(r.status,0,r.stdout+r.stderr);
  const files=walk(out).filter(f=>f.endsWith('.html')||f.startsWith(path.join(out,'authority')+path.sep)).map(f=>path.relative(out,f));files.push('authority-map.json','rss.xml','sitemap.xml','post-sitemap.xml','page-sitemap.xml','_headers','_redirects');
  for(const file of files)assert.deepEqual(fs.readFileSync(path.join(root,'public',file)),fs.readFileSync(path.join(out,file)),file);
  // Aurora taxonomy array order may vary between clean builds; compare the actual body/date/identity contract.
  for(const s of sources){const file='api/articles/'+s.key+'.json',a=JSON.parse(fs.readFileSync(path.join(out,file))),b=JSON.parse(fs.readFileSync(path.join(root,'public',file)));for(const field of ['title','content','date','updated','cover','permalink','author','robots','evidence','publication_state','withdrawn','article_type'])assert.deepEqual(b[field],a[field],s.key+' '+field);}
  assert.deepEqual(selected.map(s=>fs.statSync(s.source,{bigint:true}).mtimeNs),originalStats,'root source mtimes must remain untouched');
 }finally{fs.rmSync(sandbox,{recursive:true,force:true});}
});
