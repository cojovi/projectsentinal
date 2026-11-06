const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const yaml=require('js-yaml');
const root=path.resolve(__dirname,'..');
const source=()=>yaml.load(fs.readFileSync(path.join(root,'_config.aurora.yml'),'utf8'));
const shipped=()=>JSON.parse(fs.readFileSync(path.join(root,'public/api/site.json'),'utf8')).theme_config;

test('the original Aurora Dia mascot stays enabled in source AND actual shipped site API',()=>{
 const configured=source().aurora_bot;
 assert.equal(configured.enable,true,'The original site mascot must not be disabled during unrelated cleanup');
 assert.equal(configured.bot_type,'dia');
 assert.equal(configured.locale,'en');
 assert.ok(Array.isArray(configured.tips.messages)&&configured.tips.messages.length>0);
 assert.ok(configured.tips.messages.some(message=>message.includes('<span>Dia</span>')));
 assert.ok(configured.tips.mouseover.some(rule=>rule.selector==='#Aurora-Dia'));
 assert.deepEqual(shipped().aurora_bot,configured,'The built API must preserve the original mascot settings and messages');
});

test('mascot restoration ships the native character without re-enabling broken unrelated plugins',()=>{
 const api=shipped();
 for(const key of ['gitalk','valine','twikoo','waline','busuanzi','copy_protection']) {
  assert.equal(api[key].enable,false,key+' must remain disabled');
 }
 const directory=path.join(root,'public/static/js');
 const code=fs.readdirSync(directory).filter(name=>name.endsWith('.js')).map(name=>fs.readFileSync(path.join(directory,name),'utf8')).join('\n');
 for(const marker of ['Aurora-Dia--left-eye','Aurora-Dia--right-eye','Aurora-Dia--tips','initializeBot']) {
  assert.ok(code.includes(marker),'Missing original native mascot component: '+marker);
 }
 assert.equal(api.aurora_bot.enable,true,'Native initialization must actually be requested by the emitted config');
});
