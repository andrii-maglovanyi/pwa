!function(t){var e={};function n(c){if(e[c])return e[c].exports;var r=e[c]={i:c,l:!1,exports:{}};return t[c].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,c){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:c})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="pwa/",n(n.s=22)}({1:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.CACHE_NAME={static:"static-cache",dynamic:"dynamic-cache"};const c=e.SERVICE_WORKER_ASSET="sw.js";e.STATIC_ASSETS=["./index.html","./index.js",`./${c}`]},21:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cacheFirst=async function(t){return await caches.match(t)||fetch(t)},e.networkFirst=async function(t){const e=await caches.open(c.CACHE_NAME.dynamic);try{const n=await fetch(t.clone());return n&&200===n.status&&"basic"===n.type?(e.put(t,n.clone()),n):n}catch(n){const c=await e.match(t);return c||caches.match("./fallback.json")}};var c=n(1)},22:function(t,e,n){"use strict";var c=n(1),r=n(21);self.addEventListener("install",async()=>{console.log("SW [install]"),(await caches.open(c.CACHE_NAME.static)).addAll(c.STATIC_ASSETS),console.log("SW [statics cached]")}),self.addEventListener("fetch",t=>{console.log("SW [fetch]");const e=t.request;new URL(e.url).origin===location.origin?t.respondWith((0,r.cacheFirst)(e)):t.respondWith((0,r.networkFirst)(e))})}});