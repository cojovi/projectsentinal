const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const os=require('node:os');const cheerio=require('cheerio');
const {decodeImageMetadata,readSocialImageMetadata}=require('../authority/social-image-metadata.cjs');
const root=path.resolve(__dirname,'../public');const base='https://protocolsentinel.com';
const png=fs.readFileSync(path.join(root,'og/who-gets-to-say-your-ai-can-run.png'));
const jpeg=fs.readFileSync(path.join(root,'brand/og.jpeg'));
test('new article uses its exact cover and measured 1600x900 PNG metadata',()=>{
 const $=cheerio.load(fs.readFileSync(path.join(root,'post/2026-11-14-who-gets-to-say-your-ai-can-run/index.html'),'utf8'));
 assert.deepEqual(decodeImageMetadata(png),{width:1600,height:900,type:'image/png'});
 assert.equal($('meta[property="og:image"]').attr('content'),base+'/og/who-gets-to-say-your-ai-can-run.png');
 for(const [field,value] of Object.entries({width:1600,height:900,type:'image/png'})){assert.equal($(`meta[property="og:image:${field}"]`).length,1);assert.equal($(`meta[property="og:image:${field}"]`).attr('content'),String(value));}
});
test('all emitted article/page social dimensions and MIME match their own local image bytes',()=>{
 const map=JSON.parse(fs.readFileSync(path.join(root,'authority-map.json'),'utf8'));
 for(const item of [...map.articles,...map.pages]){
  const $=cheerio.load(fs.readFileSync(path.join(root,item.path==='/'?'index.html':item.path.slice(1)+'/index.html'),'utf8'));
  const image=$('meta[property="og:image"]').attr('content');const measured=readSocialImageMetadata(image,{publicDir:root});
  for(const field of ['width','height','type']){
   const tags=$(`meta[property="og:image:${field}"]`);assert.equal(tags.length,measured?1:0,item.path+' '+field);
   if(measured)assert.equal(tags.attr('content'),String(measured[field]),item.path+' '+field);
  }
  if(image.startsWith('https:'))assert.equal($('meta[property="og:image:secure_url"]').attr('content'),image);
 }
});
test('decoder uses signatures rather than extensions; supports the JPEG homepage fallback',()=>{
 const info=decodeImageMetadata(jpeg);assert.equal(info.type,'image/jpeg');assert.ok(info.width>0&&info.height>0);
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'ps-socialmeta-'));
 try{fs.writeFileSync(path.join(dir,'wrong.png'),jpeg);fs.writeFileSync(path.join(dir,'a photo.png'),png);
 assert.deepEqual(readSocialImageMetadata('/wrong.png',{publicDir:dir}),info);
 assert.deepEqual(readSocialImageMetadata(base+'/a%20photo.png?v=2',{publicDir:dir}),{width:1600,height:900,type:'image/png'});
 assert.equal(readSocialImageMetadata('https://elsewhere.invalid/a.png',{publicDir:dir}),null);
 assert.equal(readSocialImageMetadata('/missing.png',{publicDir:dir}),null);
 assert.equal(decodeImageMetadata(png.subarray(0,20)),null);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('unsafe paths and symlinks cannot disclose bytes outside the public directory',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'ps-socialmeta-')),pub=path.join(dir,'public');fs.mkdirSync(pub);
 try{fs.writeFileSync(path.join(dir,'outside.png'),png);fs.symlinkSync('../outside.png',path.join(pub,'escape.png'));
 assert.throws(()=>readSocialImageMetadata('/..%2Foutside.png',{publicDir:pub}),/unsafe|escapes/);
 assert.throws(()=>readSocialImageMetadata('/escape.png',{publicDir:pub}),/symlink escapes/);
 assert.equal(readSocialImageMetadata('/bad%ZZ.png',{publicDir:pub}),null);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
