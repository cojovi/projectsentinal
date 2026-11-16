/* Progressive handoff: keep complete server content until the matching API body exists.
   Never clear Vue's root; native Aurora navigation remains mounted. */
(() => {
 let map, scheduled=false, frame=null, lastPath='';
 const clean=p=>p.replace(/\/$/,'')||'/';
 const fallbackRoute=clean(location.pathname);
 const fallbackKey=document.querySelector('#sentinel-prerender .sentinel-contract')?.dataset.key;
 const remove=(selector)=>document.querySelectorAll(selector).forEach(n=>n.remove());
 const setMeta=(selector,attrs)=>{let node=document.querySelector(selector);if(!node){node=document.createElement(selector.startsWith('link')?'link':'meta');document.head.append(node);}for(const[k,v]of Object.entries(attrs))node.setAttribute(k,v);};
 function sync(){scheduled=false;const route=clean(location.pathname);
  const staticReader=document.getElementById('sentinel-prerender');
  const live=document.querySelector('#app .sentinel-contract');
  // Route ownership works even when the manifest or article API never arrives.
  // A different native article/archive must not discard this complete response.
  if(staticReader){staticReader.hidden=route!==fallbackRoute;
   if(route===fallbackRoute && (fallbackKey?live?.dataset.key===fallbackKey:fallbackRoute==='/archives'&&document.querySelector('#app .timeline .timeline-item')))staticReader.remove();
  }
  const discovery=document.getElementById('sentinel-discovery');if(discovery){discovery.hidden=route!=='/';if(route==='/'&&document.querySelector('#app .article-container a[href^="/post/"]'))discovery.remove();}
  if(!map)return;const article=map.articles.find(a=>a.path===route);const item=article||map.pages.find(p=>p.path===route);
  // Expose a return path to the trust pages from every client-rendered article.
  if(live && !document.querySelector('#app .sentinel-footer')){const footer=document.createElement('footer');footer.className='sentinel-footer';footer.innerHTML='<a href="/about">About</a> · <a href="/ownership">Ownership</a> · <a href="/editorial-standards">Standards</a> · <a href="/contact">Contact</a> · <a href="/privacy">Privacy</a>';live.after(footer);}
   // Robots are route state too: never carry withdrawal noindex to ordinary pages.
   remove('meta[name="keywords"],meta[name^="twitter:"]');
   const robots=item?(item.robots||map.robots.indexable):map.robots.noindex;
   if(document.querySelectorAll('meta[name="robots"]').length!==1 || document.querySelector('meta[name="robots"]')?.content!==robots){remove('meta[name="robots"]');setMeta('meta[name="robots"]',{name:'robots',content:robots});}
   if(item){const title=item.title==='Protocol Sentinel'?item.title:item.title+' | Protocol Sentinel';if(document.title!==title)document.title=title;
   // Apply only when needed so the MutationObserver cannot trigger a feedback loop.
   const expected=JSON.stringify(item.schema||null);const current=document.getElementById('sentinel-schema');
   if(lastPath!==route || document.querySelector('link[rel="canonical"]')?.href!=='https://protocolsentinel.com'+item.path || (current?.textContent||'null')!==expected){
    remove('link[rel="canonical"],meta[property^="og:"],meta[name="description"],script[type="application/ld+json"]');
    setMeta('link[rel="canonical"]',{rel:'canonical',href:'https://protocolsentinel.com'+item.path});
    for(const[name,content]of Object.entries({'og:url':'https://protocolsentinel.com'+item.path,'og:title':item.title,'og:description':item.description,'og:type':article?'article':'website','og:image':item.schema?.image||'https://protocolsentinel.com/brand/og.jpeg','og:site_name':'Protocol Sentinel'}))setMeta(`meta[property="${name}"]`,{property:name,content});
    setMeta('meta[name="description"]',{name:'description',content:item.description});
    if(item.schema){const s=document.createElement('script');s.id='sentinel-schema';s.type='application/ld+json';s.textContent=expected;document.head.append(s);}lastPath=route;
   }
  }else if(lastPath!==route){remove('link[rel="canonical"],meta[property^="og:"],meta[name="description"],script[type="application/ld+json"]');lastPath=route;}
 }
 function schedule(){if(!scheduled){scheduled=true;frame=requestAnimationFrame(sync);}}
 // Policy/profile routes are complete documents, not unsupported Aurora SPA routes.
 document.addEventListener('click',e=>{const a=e.target.closest?.('a[href]');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank')return;const u=new URL(a.href,location.href);if(u.origin!==location.origin)return;const target=map?.articles.find(x=>x.aliases.includes(u.pathname));if(target){e.preventDefault();e.stopImmediatePropagation();location.assign(target.path+u.search+u.hash);return;}if(map?.pages.some(p=>p.path===clean(u.pathname)&&!['/','/archives'].includes(p.path))){e.preventDefault();e.stopImmediatePropagation();location.assign(u.href);}},true);
 const observer=new MutationObserver(schedule);const observe=()=>observer.observe(document.documentElement,{subtree:true,childList:true});observe();
 addEventListener('pagehide',()=>{observer.disconnect();if(frame!==null)cancelAnimationFrame(frame);scheduled=false;});
 addEventListener('pageshow',()=>{observe();schedule();});
 for(const name of ['pushState','replaceState']){const original=history[name];history[name]=function(...args){const v=original.apply(this,args);schedule();return v;};}addEventListener('popstate',schedule);
 fetch('/authority-map.json').then(r=>{if(!r.ok)throw Error('map unavailable');return r.json();}).then(data=>{map=data;schedule();}).catch(()=>{/* Full server document remains readable. */});
})();
