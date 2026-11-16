// Inspect final files, after Hexo and all authority output have finished.
const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
const {base} = require('./contract.cjs');

const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry =>
 entry.isDirectory() ? walk(path.join(dir,entry.name)) : [path.join(dir,entry.name)]);
const sourceAssets = root => walk(path.join(root,'source/authority')).filter(file => /\.(js|css)$/.test(file));

function inspectAssets(root) {
 const out = path.join(root,'public'), errors = [], missing = new Set(), references = new Set();
 const nonempty = file => fs.existsSync(file) && fs.lstatSync(file).isFile() && fs.statSync(file).size > 0;
 for (const source of sourceAssets(root)) {
  const name = path.relative(path.join(root,'source'),source), target = path.join(out,name);
  if (!nonempty(target)) errors.push('Missing/empty shipped source asset: '+name);
  else if (!fs.readFileSync(source).equals(fs.readFileSync(target))) errors.push('Shipped source mismatch: '+name);
 }
 function check(reference, document) {
  const url = new URL(reference,new URL(document,base));
  if (url.origin !== base || !['https:','http:'].includes(url.protocol)) return;
  const name = decodeURIComponent(url.pathname);
  references.add(name);
  const file = path.resolve(out,'.'+name);
  if (!file.startsWith(out+path.sep) || !nonempty(file)) missing.add(name);
 }
 const htmlFiles = walk(out).filter(file => file.endsWith('.html'));
 for (const file of htmlFiles) {
  const $ = cheerio.load(fs.readFileSync(file,'utf8'));
  const document = '/'+path.relative(out,file).split(path.sep).join('/');
  $('[src],link[rel~="stylesheet"][href]').each((_,node) => check($(node).attr('src') ?? $(node).attr('href'),document));
 }
 let shimImports = 0;
 const shim = path.join(out,'authority/comments-disabled.js');
 const exports = nonempty(shim) ? [...fs.readFileSync(shim,'utf8').matchAll(/export function (\w+)/g)].map(m=>m[1]) : [];
 for (const file of walk(path.join(out,'static/js')).filter(file => file.endsWith('.js'))) {
  const code = fs.readFileSync(file,'utf8'), document = '/'+path.relative(out,file).split(path.sep).join('/');
  if (code.includes('https://unpkg.com/@waline/client')) errors.push('Remote comments import remains: '+document);
  for (const match of code.matchAll(/(?:\bfrom\s*|\bimport\s*(?:\(\s*)?)["']([^"']+)["']/g)) {
   if (match[1].startsWith('.') || match[1].startsWith('/')) check(match[1],document);
   if (match[1] === '/authority/comments-disabled.js') shimImports++;
  }
  for (const match of code.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']\/authority\/comments-disabled\.js["']/g)) {
   for (const binding of match[1].split(',')) {
    const name = binding.trim().split(/\s+as\s+/)[0];
    if (!exports.includes(name)) errors.push('Missing comments shim export: '+name);
   }
  }
 }
 if (!shimImports) errors.push('Expected compiled native comments shim import');
 return {htmlFilesScanned:htmlFiles.length, uniqueLocalReferences:references.size, shimImports,
  missingLocalAssets:[...missing].sort(), errors};
}
function assertAssets(root) {
 const report = inspectAssets(root);
 if (report.errors.length || report.missingLocalAssets.length) throw Error('Final asset audit failed: '+JSON.stringify(report));
 return report;
}
module.exports = {sourceAssets, inspectAssets, assertAssets};
if (require.main === module) console.log(JSON.stringify(assertAssets(path.resolve(__dirname,'..')),null,2));
