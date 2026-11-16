const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const cheerio=require('cheerio');
const {inspectAssets,sourceAssets}=require('../authority/assets.cjs');
const root=path.resolve(__dirname,'..'),out=path.join(root,'public');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);

test('final public reader CSS/runtime/comments shim exist, are nonempty regular files and match source bytes',()=>{
 for(const name of ['reader.css','reader.js','comments-disabled.js']) assert.ok(fs.existsSync(path.join(out,'authority',name)),'Missing shipped /authority/'+name);
 for(const source of sourceAssets(root)) {
  const target=path.join(out,path.relative(path.join(root,'source'),source));
  assert.ok(fs.lstatSync(target).isFile(),target+' must not be a symlink');
  assert.ok(fs.statSync(target).size>0,target+' must not be empty');
  assert.deepEqual(fs.readFileSync(target),fs.readFileSync(source),target+' must match intended source');
 }
});
test('ALL generated HTML local src/styles and compiled native module imports resolve to nonempty emitted assets',()=>{
 const report=inspectAssets(root);
 assert.ok(report.htmlFilesScanned>=99);
 assert.ok(report.shimImports>0);
 assert.deepEqual(report.missingLocalAssets,[]);
 assert.deepEqual(report.errors,[]);
});
test('actual shipped comments ES module provides all four native Aurora import bindings',async()=>{
 const code=fs.readFileSync(path.join(out,'authority/comments-disabled.js'),'utf8');
 const shim=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
 assert.deepEqual(Object.keys(shim).sort(),['RecentComments','commentCount','init','pageviewCount'].sort());
 for(const name of Object.keys(shim))assert.equal(typeof shim[name],'function');
 assert.throws(()=>shim.init(),/Comments disabled/);
});
test('every generated HTML injects exactly one GA4 loader/config for the retained property',()=>{
 for(const file of walk(out).filter(f=>f.endsWith('.html'))) {
  const $=cheerio.load(fs.readFileSync(file,'utf8'));
  const loaders=$('script[src]').toArray().filter(n=>$(n).attr('src').includes('googletagmanager.com/gtag/js'));
  assert.equal(loaders.length,1,file+' GA4 loader count');
  assert.equal(new URL($(loaders[0]).attr('src')).searchParams.get('id'),'G-4PBBYC5R3L',file);
  const inline=$('script:not([src])').toArray().map(n=>$(n).text()).join('\n');
  const configs=[...inline.matchAll(/gtag\(\s*['"]config['"]\s*,\s*['"]([^'"]+)['"]/g)];
  assert.deepEqual(configs.map(m=>m[1]),['G-4PBBYC5R3L'],file+' GA4 config count/property');
 }
});
