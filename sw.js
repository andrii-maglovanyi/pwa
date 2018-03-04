/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/service-worker/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/service-worker/constants.js":
/*!*****************************************!*\
  !*** ./src/service-worker/constants.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\n * @name CACHE_NAME\n *\n * @description\n * Service Worker static and dynamic cache names\n *\n * @type {Object}\n */\nconst CACHE_NAME = exports.CACHE_NAME = {\n  static: 'static-cache',\n  dynamic: 'dynamic-cache'\n};\n\n/**\n * @name SERVICE_WORKER_ASSET\n *\n * @description\n * Production ready Service Worker asset name\n *\n * @type {string}\n */\n\nconst SERVICE_WORKER_ASSET = exports.SERVICE_WORKER_ASSET = 'sw.js';\n/**\n * @name STATIC_ASSETS\n *\n * @description\n * Static assets to be cached on initial application load\n *\n * @type {Array<string>}\n */\nconst STATIC_ASSETS = exports.STATIC_ASSETS = ['./index.html', './index.js', `./${SERVICE_WORKER_ASSET}`];\n\n//# sourceURL=webpack:///./src/service-worker/constants.js?");

/***/ }),

/***/ "./src/service-worker/helpers.js":
/*!***************************************!*\
  !*** ./src/service-worker/helpers.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.cacheFirst = cacheFirst;\nexports.networkFirst = networkFirst;\n\nvar _constants = __webpack_require__(/*! ./constants */ \"./src/service-worker/constants.js\");\n\n/**\n * @name cacheFirst\n *\n * @description\n * Try to retrieve assets from cache with fallback on the network\n *\n * @param request Request stands as the cache key\n * @returns {Promise<Response>}\n */\nasync function cacheFirst(request) {\n  console.log(request);\n  console.log(caches);\n\n  caches.keys().then(function (keyList) {\n    return Promise.all(keyList.map(function (key) {\n\n      console.log('KEY', key);\n\n      caches.open(key).then(function (keyListz) {\n        console.log('SUBKEY', keyListz);\n      });\n    }));\n  });\n\n  const cachedResponse = await caches.match(request);\n  console.log('FOUND IN CACHE', cachedResponse);\n\n  return cachedResponse || fetch(request);\n}\n\n/**\n * @name networkFirst\n *\n * @description\n * Retrieve data from network first and cache it\n *\n * @param request Request stands as the cache key\n * @returns {Promise<Response>}\n */\nasync function networkFirst(request) {\n  const cache = await caches.open(_constants.CACHE_NAME.dynamic);\n\n  try {\n    const response = await fetch(request.clone());\n\n    // Check if we received a valid response\n    if (!response || response.status !== 200 || response.type !== 'basic') {\n      return response;\n    }\n\n    cache.put(request, response.clone());\n\n    return response;\n  } catch (error) {\n    const cachedResponse = await cache.match(request);\n\n    return cachedResponse || caches.match('./fallback.json');\n  }\n}\n\n//# sourceURL=webpack:///./src/service-worker/helpers.js?");

/***/ }),

/***/ "./src/service-worker/index.js":
/*!*************************************!*\
  !*** ./src/service-worker/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _constants = __webpack_require__(/*! ./constants */ \"./src/service-worker/constants.js\");\n\nvar _helpers = __webpack_require__(/*! ./helpers */ \"./src/service-worker/helpers.js\");\n\n// The first time the user starts up the PWA, 'install' is triggered.\n/* eslint-disable no-restricted-globals */\n\nself.addEventListener('install', async event => {\n  event.waitUntil(async function () {\n    console.log('SW [install]');\n\n    const cache = await caches.open(_constants.CACHE_NAME.static);\n    cache.addAll(_constants.STATIC_ASSETS);\n\n    console.log('SW [statics cached]');\n  }());\n});\n\nself.addEventListener('fetch', event => {\n  console.log('SW [fetch]');\n\n  const { request } = event;\n  const url = new URL(request.url);\n\n  if (url.origin === location.origin) {\n    console.log('MATCH');\n    event.respondWith((0, _helpers.cacheFirst)(request));\n  } else {\n    event.respondWith((0, _helpers.networkFirst)(request));\n  }\n});\n\n//# sourceURL=webpack:///./src/service-worker/index.js?");

/***/ })

/******/ });