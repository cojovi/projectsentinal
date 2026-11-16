const {chromium}=require('playwright');const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');const {serve}=require('./server.cjs');
(async()=>{const root=path.resolve(__dirname,'../public');const map=JSON.parse(fs.readFileSync(path.join(root,'authority-map.json')));const server=serve(root);await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;let browser;try{browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});}catch(e){server.closeAllConnections();await new Promise(r=>server.close(r));throw e;}const errors=[];let context;
 try{
  context=await browser.newContext({viewport:{width:1365,height:1000}});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  const first=map.articles.find(a=>a.key.includes('2026-10-22-what-happens'));const next=map.articles.find(a=>a.key.includes('2026-10-26-php2shell'));
  console.log('Browser plugin not available; regular Playwright. Flow: canonical article -> matching Aurora body -> client article navigation -> matching metadata -> trust document.');
  await page.goto(origin+first.path,{waitUntil:'domcontentloaded'});
  await page.waitForSelector('#app .sentinel-contract',{timeout:20000});
  await page.waitForFunction(key=>document.querySelector('#app .sentinel-contract')?.dataset.key===key&&!document.querySelector('#sentinel-prerender'),first.key);
  assert.equal(await page.locator('.sentinel-contract:visible').count(),1);assert.equal(await page.locator('h1:visible').first().textContent(),first.title);
  assert.ok((await page.locator('#app .article-body').textContent()).length>4000);assert.match(await page.title(),/Protocol Sentinel$/);
  await page.screenshot({path:'/tmp/protocol-desktop.png',fullPage:false});
  // Exercise the actual Vue Router instance through a native related-article card.
  const native=page.locator('#app a[href^="/post/"]').first();
  console.log('native article anchors:',await page.locator('#app a[href^="/post/"]').count());
  // Aurora card links use handlers rather than anchors. Its real prev/next card has class article-container.
  const cards=page.locator('#app .article-container');console.log('native cards:',await cards.count());
  if(await native.count()){await native.click();}else {await cards.first().click();}
  await page.waitForFunction(old=>location.pathname!==old,first.path);
  const destination=map.articles.find(a=>a.path===new URL(page.url()).pathname);assert.ok(destination,'native card navigated to a known article');
  await page.waitForFunction(key=>document.querySelector('#app .sentinel-contract')?.dataset.key===key,destination.key);
  await page.waitForFunction(url=>document.querySelector('link[rel="canonical"]')?.href===url,'https://protocolsentinel.com'+destination.path);
  assert.equal(await page.locator('.sentinel-contract:visible').count(),1);assert.equal(await page.locator('script[type="application/ld+json"]').count(),1);assert.equal(JSON.parse(await page.locator('#sentinel-schema').textContent()).headline,destination.title);assert.equal(await page.title(),destination.title+' | Protocol Sentinel');
  await page.locator('#app .corrections a[href="/corrections"]').click();await page.waitForURL(origin+'/corrections');assert.ok((await page.locator('main article').textContent()).includes('Public issues are public'));
  await page.setViewportSize({width:390,height:844});await page.goto(origin+first.path);await page.waitForSelector('#app .sentinel-contract');await page.waitForFunction(()=>!document.querySelector('#sentinel-prerender'));assert.equal(await page.locator('.sentinel-contract:visible').count(),1);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'mobile horizontal overflow');await page.screenshot({path:'/tmp/protocol-mobile.png',fullPage:false});
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const plain=await nojs.newPage();await plain.goto(origin+first.path);assert.equal(await plain.locator('.sentinel-contract:visible').count(),1);const initialBody=await plain.locator('.article-body').textContent();const jsBody=await page.locator('#app .article-body').textContent();assert.equal(initialBody,jsBody);assert.equal(await plain.locator('h1:visible').first().textContent(),first.title);await plain.screenshot({path:'/tmp/protocol-nojs.png',fullPage:false});assert.equal((await plain.goto(origin+'/post/no-article-here')).status(),404);await nojs.close();
  assert.deepEqual(errors,[],'relevant app runtime errors');console.log('PASS: desktop/mobile, JS/no-JS full-body parity, native client navigation, metadata/schema replacement, policy link and actual 404. Screenshots /tmp/protocol-{desktop,mobile,nojs}.png');
 }finally{await context?.close();await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
