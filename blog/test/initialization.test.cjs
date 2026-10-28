/* Fault injection is confined to disposable copies; shared dependencies stay read-only. */
const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const os=require('node:os');const path=require('node:path');const {spawnSync}=require('node:child_process');
const original=path.resolve(__dirname,'..');
const cases=[
 ['unsafe alias and invalid author',root=>{},'slug: qa/unsafe\n',/Unsafe alias \/post\/qa\/unsafe/],
 ['invalid source YAML',root=>{},'broken: [\n',/unexpected end|end of the stream/i],
 ['missing source directory',root=>fs.rmSync(path.join(root,'source/_posts'),{recursive:true}),'',/ENOENT.*_posts/],
 ['missing contract dependency',root=>fs.rmSync(path.join(root,'authority/contract.cjs')),'',/Cannot find module.*contract\.cjs/],
 ['vendor setup failure',root=>fs.writeFileSync(path.join(root,'authority/vendor/aurora/generators/index.js'),"module.exports=()=>{throw Error('QA vendor initialization failure');};\n"),'',/QA vendor initialization failure/]
];
for(const [name,inject,extra,expected]of cases)test('direct Hexo fails closed before emitting on '+name,{timeout:90000},()=>{
 const sandbox=fs.mkdtempSync(path.join(os.tmpdir(),'ps-init-gate-')),root=path.join(sandbox,'blog'),out=path.join(root,'public'),marker='PSQAINITBODYMARKER7D31';
 try{
  fs.cpSync(original,root,{recursive:true,filter:src=>!['node_modules','public','db.json','.deploy_git'].includes(path.basename(src))});
  fs.symlinkSync(path.join(original,'node_modules'),path.join(root,'node_modules'),'dir');
  const fixture=path.join(root,'source/_posts/2026-10-28-qa-initialization.md');
  fs.writeFileSync(fixture,`---\ntitle: Initialization gate probe\ndate: 2026-10-28T12:00:00Z\npublished: true\nauthor: Invented QA Credentials\n${extra}---\n${marker} invalid byline and no supporting sources.\n`);
  inject(root);
  fs.mkdirSync(out,{recursive:true});const sentinel=Buffer.from('Existing output must remain byte-identical.\n');fs.writeFileSync(path.join(out,'sentinel-root'),sentinel);
  const r=spawnSync(process.execPath,[require.resolve('hexo/bin/hexo'),'generate'],{cwd:root,encoding:'utf8',timeout:60000});
  assert.equal(r.error,undefined,r.error?.message);assert.equal(r.signal,null,r.stdout+r.stderr);
  assert.match(r.stdout+r.stderr,expected);
  assert.notEqual(r.status,0,'Hexo must reject initialization failure during its lifecycle, even though it swallows script-load errors:\n'+r.stdout+r.stderr);
  assert.deepEqual(fs.readdirSync(out),['sentinel-root'],'no new output may precede the failed gate');
  assert.deepEqual(fs.readFileSync(path.join(out,'sentinel-root')),sentinel);
 }finally{fs.rmSync(sandbox,{recursive:true,force:true});}
});
test('authority build rejects whole-script syntax failure swallowed by the Hexo loader',{timeout:90000},()=>{
 const sandbox=fs.mkdtempSync(path.join(os.tmpdir(),'ps-syntax-gate-')),root=path.join(sandbox,'blog');
 try{
  fs.cpSync(original,root,{recursive:true,filter:src=>!['node_modules','public','db.json','.deploy_git'].includes(path.basename(src))});
  fs.symlinkSync(path.join(original,'node_modules'),path.join(root,'node_modules'),'dir');
  fs.writeFileSync(path.join(root,'scripts/authority.js'),'const = ;\n');
  const r=spawnSync(process.execPath,[path.join(root,'authority/build.cjs')],{cwd:root,encoding:'utf8',timeout:60000});
  assert.equal(r.error,undefined,r.error?.message);assert.equal(r.signal,null,r.stdout+r.stderr);
  assert.match(r.stdout+r.stderr,/SyntaxError/);assert.match(r.stdout+r.stderr,/Hexo failed/);assert.notEqual(r.status,0);
  assert.equal(fs.existsSync(path.join(root,'public')),false,'parent build must stop before generation');
 }finally{fs.rmSync(sandbox,{recursive:true,force:true});}
});
