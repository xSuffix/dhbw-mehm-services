if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,l)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const u=e=>i(e,n),f={module:{uri:n},exports:t,require:u};s[n]=Promise.all(r.map((e=>f[e]||u(e)))).then((e=>(l(...e),t)))}}define(["./workbox-06f7c1ce"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_...all_.622b1cf4.js",revision:null},{url:"assets/_id_.12a727e3.css",revision:null},{url:"assets/_id_.f597d795.js",revision:null},{url:"assets/404.42f670b3.js",revision:null},{url:"assets/app.34cb3d0f.js",revision:null},{url:"assets/app.973d4e0e.css",revision:null},{url:"assets/contact.723fd970.js",revision:null},{url:"assets/footerless.a51dc912.js",revision:null},{url:"assets/imprint.5884ef5f.js",revision:null},{url:"assets/jdenticon-module.687b0030.js",revision:null},{url:"assets/login.2854e2d3.js",revision:null},{url:"assets/privacy.23aba09d.js",revision:null},{url:"assets/register.5b7b0dc7.js",revision:null},{url:"assets/submit.f67c10f0.js",revision:null},{url:"assets/user.843627f5.js",revision:null},{url:"assets/virtual_pwa-register.1c1f76db.js",revision:null},{url:"contact.html",revision:"14eceebe0e72f5133d4fbca18bece745"},{url:"imprint.html",revision:"f215b243df75c755547a67eebd42af9e"},{url:"index.html",revision:"631b02d85e41dd0cdfc615e776436af9"},{url:"login.html",revision:"702dfeb165b22eb85c2319f541b6dfa9"},{url:"privacy.html",revision:"1b7d365852e3c68146992193cae611d4"},{url:"register.html",revision:"77f17dabe56c9efa4331c8ba1f852f79"},{url:"submit.html",revision:"7034a52a6045b412ca131372a67ef6cf"},{url:"user.html",revision:"58a4d0eb8b15e613987ff586655d6d04"},{url:"favicon.ico",revision:"be7dd31082f20e5e99dbfcafbbf5ff60"},{url:"robots.txt",revision:"987497bfb623e1059632e5a607d56454"},{url:"safari-pinned-tab.svg",revision:"12612bafd41ea63a219dfc907a31754f"},{url:"pwa-192x192.png",revision:"e77b26cc1775dd8fdf8b9af0f1f36afc"},{url:"pwa-512x512.png",revision:"d48711d16baf3fc89577467989522b82"},{url:"manifest.webmanifest",revision:"d6708706480d0955d80fdcb467d736a4"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
