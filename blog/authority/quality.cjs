/* Local, read-only publishing gate. No fetching, publishing or notifications. */
const fs=require('node:fs');const path=require('node:path');const crypto=require('node:crypto');const c=require('./contract.cjs');
function bodyHash(body){return crypto.createHash('sha256').update(body.trim()).digest('hex');}
function similarity(a,b){const words=s=>s.toLowerCase().replace(/[^\p{L}\p{N} ]/gu,' ').split(/\s+/).filter(Boolean);const shingles=s=>{const w=words(s);return new Set(w.slice(0,-4).map((_,i)=>w.slice(i,i+5).join(' ')));};const x=shingles(a),y=shingles(b);if(!x.size||!y.size)return 0;return [...x].filter(t=>y.has(t)).length/Math.min(x.size,y.size);}
function check(s,review={},sisterBody=null){const errors=[];const warnings=[];const d=s.data;
 if(!['Protocol Sentinel','Protocol Sentinel desk','protocol-sentinel','Cody Viveiros'].includes(d.author))errors.push('Assign a registered desk or explicitly identified owner; legacy bylines are not new author identities.');
 if(!d.article_type)errors.push('Declare article_type.');
 if(!d.evidence_status&&!review.status)errors.push('Declare evidence status; never imply automatic verification.');
 if(d.reviewed===true||review.reviewed===true)errors.push('Unsupported reviewed flag. Use a claim ledger, not a review badge.');
 for(const url of [...(d.sources||[]),...(review.sources||[])]){if(!c.safeUrl(typeof url==='string'?url:url.url))errors.push('Unsafe source URL: '+JSON.stringify(url));}
 for(const match of s.body.matchAll(/(?:\]\(\s*|(?:href|src)=["'])([^\s)"'>]+)/gi)){const u=match[1];if(!c.safeUrl(u)&&!/^\/(?!\/)|^#|^mailto:/i.test(u))errors.push('Unsafe body URL: '+u);}
 if(!((d.sources||[]).length+(review.sources||[]).length)&&!(d.unknowns||review.unknowns)?.length)errors.push('Record sources or explicitly state missing evidence in unknowns.');
 if(!d.reporting_cutoff&&!review.reporting_cutoff)warnings.push('Reporting cutoff not recorded; displayed as unknown.');
 if((d.cover||d.image)&&!d.image_credit&&!d.hero_credit)errors.push('Illustration requires recorded credit and production limits.');
 if(d.cover && /generated|synthetic/i.test(d.image_credit||d.hero_credit||'')&&!/illustration|not.*evidence/i.test(d.image_credit||d.hero_credit))errors.push('Synthetic media credit must identify illustration or limits.');
 try{c.date(d.date);c.date(d.updated||d.date);if(c.date(d.updated||d.date)<c.date(d.date))errors.push('Update precedes publication.');}catch(e){errors.push(e.message);}
 if(review.source_sha256&&review.source_sha256!==bodyHash(s.body))errors.push('Review ledger is stale: source body hash changed.');
 if((review.status||d.evidence_status)==='documented'){
  if(!review.source_sha256)errors.push('Documented ledger requires source_sha256.');
  if(!review.claims?.length)errors.push('Documented ledger requires claims.');
  for(const claim of review.claims||[]){if(!claim.claim||!['supported','attributed','uncertain','opinion'].includes(claim.disposition))errors.push('Each claim needs text and an honest disposition.');if(!claim.unknowns)errors.push('Each claim needs explicit limits/unknowns.');for(const u of claim.sources||[])if(!c.safeUrl(u))errors.push('Unsafe claim source.');}
  if((!review.sources?.length&&!c.publication(s).withdrawn)||!review.reporting_cutoff)errors.push('Documented ledger requires supporting URLs and reporting cutoff.');
 }
 if(sisterBody===null)warnings.push('Sister-body comparison not supplied. Record comparison before publication.');
 else {const score=similarity(s.body,sisterBody);if(score>=0.5)errors.push('Substantial sister-body overlap: '+(100*score).toFixed(1)+'%; explain provenance and create distinct value.');}
 const groups=new Map();for(const source of review.sources||[]){if(typeof source==='object'&&source.underlying_account){groups.set(source.underlying_account,(groups.get(source.underlying_account)||0)+1);}}
 for(const [name,count]of groups)if(count>1)warnings.push(`${count} links share underlying account "${name}"; not independent corroboration.`);
 return {key:s.key,source_sha256:bodyHash(s.body),errors,warnings,pass:errors.length===0};
}
if(require.main===module){const args=process.argv.slice(2);if(!args[0]){console.error('Usage: npm run quality -- source/_posts/article.md [--review reviews/article.json] [--sister-body path.md]');process.exitCode=2;}else{const take=name=>{const i=args.indexOf(name);return i>=0?args[i+1]:null;};const review=take('--review');const sister=take('--sister-body');const result=check(c.readSource(path.resolve(args[0])),review?JSON.parse(fs.readFileSync(review)): {},sister?c.readSource(sister).body:null);console.log(JSON.stringify(result,null,2));process.exitCode=result.pass?0:1;}}
// Shared by the authority build and Hexo hooks, including direct hexo generate.
function assertPublishable(sources,root){
 const legacy=new Set(require('./legacy-articles.json'));
 for(const source of sources.filter(c.isPublished)){
  const file=path.join(root,'reviews',source.key+'.json');const review=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)):{};
  if(!legacy.has(source.key)){const result=check(source,review);if(!result.pass)throw Error('Publishing gate: '+source.key+' '+result.errors.join('; '));}
  if(review.status==='documented'){const result=check({...source,data:{...source.data,author:'Protocol Sentinel desk',article_type:review.article_type||'analysis'}},review);const errors=result.errors.filter(e=>!e.startsWith('Illustration requires'));if(errors.length)throw Error('Review gate: '+source.key+' '+errors.join('; '));}
 }
}
module.exports={check,similarity,bodyHash,assertPublishable};
