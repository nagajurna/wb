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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//utils.js
var utils = {
	//AJAX requests
	ajax: function ajax(options) {
		'use strict';

		var promise = new Promise(function (resolve, reject) {
			var method = options.method;
			var url = options.url;
			var data = options.data;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState === 4) {
					if (xmlhttp.status === 200) {
						resolve(xmlhttp.responseText);
					} else {
						reject(Error(xmlhttp.statusText));
					}
				}
			};

			xmlhttp.open(method, url, true);
			xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xmlhttp.setRequestHeader("Accept", "text/json, text/html");
			//xmlhttp.setRequestHeader("Cache-Control", "public, max-age=86400, must-revalidate");//1 day = 86400s

			if (data) {
				xmlhttp.setRequestHeader("Content-type", "application/json");
				xmlhttp.send(data);
			} else {
				xmlhttp.send();
			}
		});

		return promise;
	},

	//check role admin			
	checkRole: function checkRole() {
		'use strict';

		var options = { method: 'GET', url: '/users/currentuser' };
		return utils.ajax(options).then(function (response) {
			var user = JSON.parse(response).user;
			return new Promise(function (resolve, reject) {
				if (user && user.admin === true) {
					resolve(user);
				} else {
					reject(Error('error'));
				}
			});
		});
	},

	//active link : change class
	activeLink: function activeLink() {
		'use strict';
		//index (nav-bar-top) links

		var root = document.querySelector("#navigation");
		var links = root.querySelectorAll("a");
		for (var i = 0; i < links.length; i++) {

			if (links[i].id === 'home-link' || links[i].id === 'menu-home-link') {
				if (location.href.match(/#\/[^\/]+\/read$/)) {
					utils.addClass("#" + links[i].id, "w3-text-gray");
					utils.removeClass("#" + links[i].id, "w3-text-black");
				} else {
					utils.addClass("#" + links[i].id, "w3-text-black");
					utils.removeClass("#" + links[i].id, "w3-text-gray");
				}
			} else if (links[i].id === 'last-link' || links[i].id === 'menu-last-link') {
				if (location.hash === '' || location.hash === '#/') {
					utils.addClass("#" + links[i].id, "w3-text-black");
					utils.removeClass("#" + links[i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + links[i].id, "w3-text-gray");
					utils.removeClass("#" + links[i].id, "w3-text-black");
				}
			} else if (links[i].id === 'authors-link' || links[i].id === 'menu-authors-link') {
				if (location.hash.match(/#\/authors/)) {
					utils.addClass("#" + links[i].id, "w3-text-black");
					utils.removeClass("#" + links[i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + links[i].id, "w3-text-gray");
					utils.removeClass("#" + links[i].id, "w3-text-black");
				}
			} else {

				if (location.href === links[i].href) {
					utils.addClass("#" + links[i].id, "w3-text-black");
					utils.removeClass("#" + links[i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + links[i].id, "w3-text-gray");
					utils.removeClass("#" + links[i].id, "w3-text-black");
				}

				//admin-link
				if (location.hash.match(/#\/admin/)) {
					if (links[i].href.match(/#\/admin/)) {
						utils.addClass("#" + links[i].id, "w3-text-black");
						utils.removeClass("#" + links[i].id, "w3-text-gray");
					} else {
						utils.addClass("#" + links[i].id, "w3-text-gray");
						utils.removeClass("#" + links[i].id, "w3-text-black");
					}
				}
			}
		}

		//admin (admin-nav-bar-top) links
		if (!document.querySelector("#admin-nav-bar-top")) {
			return;
		}
		var adminRoot = document.querySelector("#admin-nav-bar-top");
		var adminLinks = adminRoot.querySelectorAll("a");
		for (var _i = 0; _i < adminLinks.length; _i++) {
			if (location.href === adminLinks[_i].href) {
				utils.addClass("#" + adminLinks[_i].id, "w3-text-black");
				utils.removeClass("#" + adminLinks[_i].id, "w3-text-gray");
			} else {
				utils.addClass("#" + adminLinks[_i].id, "w3-text-gray");
				utils.removeClass("#" + adminLinks[_i].id, "w3-text-black");
			}

			//admin-books
			if (location.hash.match(/#\/admin\/books\//)) {
				if (adminLinks[_i].href.match(/#\/admin\/books\//)) {
					utils.addClass("#" + adminLinks[_i].id, "w3-text-black");
					utils.removeClass("#" + adminLinks[_i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + adminLinks[_i].id, "w3-text-gray");
					utils.removeClass("#" + adminLinks[_i].id, "w3-text-black");
				}

				//admin-authors	
			} else if (location.hash.match(/#\/admin\/authors\//)) {
				if (adminLinks[_i].href.match(/#\/admin\/authors\//)) {
					utils.addClass("#" + adminLinks[_i].id, "w3-text-black");
					utils.removeClass("#" + adminLinks[_i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + adminLinks[_i].id, "w3-text-gray");
					utils.removeClass("#" + adminLinks[_i].id, "w3-text-black");
				}
				//admin-users	
			} else if (location.hash.match(/#\/admin\/users\//)) {
				if (adminLinks[_i].href.match(/#\/admin\/users\//)) {
					utils.addClass("#" + adminLinks[_i].id, "w3-text-black");
					utils.removeClass("#" + adminLinks[_i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + adminLinks[_i].id, "w3-text-gray");
					utils.removeClass("#" + adminLinks[_i].id, "w3-text-black");
				}
				//admin-home	
			} else if (location.hash.match(/#\/admin\/.+/)) {
				if (adminLinks[_i].hash === '#/admin/') {
					utils.addClass("#" + adminLinks[_i].id, "w3-text-black");
					utils.removeClass("#" + adminLinks[_i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + adminLinks[_i].id, "w3-text-gray");
					utils.removeClass("#" + adminLinks[_i].id, "w3-text-black");
				}
			}
		}
	},

	setHTML: function setHTML(selector, content) {
		var elements = document.querySelectorAll(selector);
		if (!elements) {
			return;
		}
		for (var i = 0; i < elements.length; i++) {
			if (content) {
				elements[i].innerHTML = content;
			} else {
				elements[i].innerHTML = '';
			}
		}
	},

	bind: function bind(container, object, className) {
		var elements = void 0;
		if (className) {
			elements = container.querySelectorAll('[data-utils-bind].' + className);
		} else {
			elements = container.querySelectorAll('[data-utils-bind]');
		}
		//get template and props for each repeat element
		for (var i = 0; i < elements.length; i++) {
			var brackets = [];
			var props = [];
			var content = elements[i].getAttribute('data-utils-bind');
			var newContent = '';

			if (content.match(/{{[^{]+}}/g)) {
				brackets = content.match(/{{[^{]+}}/g);
			}

			//replace each bracket of element
			for (var j = 0; j < brackets.length; j++) {
				var prop = brackets[j].replace(/({|})/g, '').trim();
				props.push(prop);
				var pattern = new RegExp(brackets[j], 'g');
				if (object[prop]) {
					newContent = content.replace(pattern, object[prop]);
					content = newContent;
				} else {
					newContent = content.replace(pattern, '');
					content = newContent;
				}
			}

			if (elements[i].nodeName === 'INPUT' || elements[i].nodeName === 'TEXTAREA') {
				elements[i].value = content;
			} else {
				elements[i].innerHTML = content;
			}
		}
	},

	addClass: function addClass(selector, className) {
		var elements = document.querySelectorAll(selector);
		var name = void 0,
		    array = void 0;
		for (var i = 0; i < elements.length; i++) {
			name = className;
			array = elements[i].className.split(" ");
			if (array.indexOf(name) == -1) {
				elements[i].className += " " + className;
			}
		}
	},

	removeClass: function removeClass(selector, className) {
		var elements = document.querySelectorAll(selector);
		var name = void 0;
		for (var i = 0; i < elements.length; i++) {
			name = className;
			var pattern = new RegExp(className, 'g');
			elements[i].className = elements[i].className.replace(pattern, "");
		}
	}
};

exports.default = utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(3), __webpack_require__(43), __webpack_require__(12), __webpack_require__(44), __webpack_require__(45), __webpack_require__(13), __webpack_require__(8), __webpack_require__(46), __webpack_require__(14), __webpack_require__(15), __webpack_require__(47), __webpack_require__(16), __webpack_require__(48)], __WEBPACK_AMD_DEFINE_RESULT__ = function (arr, document, getProto, _slice, concat, push, indexOf, class2type, toString, hasOwn, fnToString, ObjectFunctionString, support, DOMEval) {

	"use strict";

	var version = "3.2.1",


	// Define a local copy of jQuery
	jQuery = function jQuery(selector, context) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init(selector, context);
	},


	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([a-z])/g,


	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function fcamelCase(all, letter) {
		return letter.toUpperCase();
	};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function toArray() {
			return _slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function get(num) {

			// Return all the elements in a clean array
			if (num == null) {
				return _slice.call(this);
			}

			// Return just the one element from the set
			return num < 0 ? this[num + this.length] : this[num];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function pushStack(elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function each(callback) {
			return jQuery.each(this, callback);
		},

		map: function map(callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function slice() {
			return this.pushStack(_slice.apply(this, arguments));
		},

		first: function first() {
			return this.eq(0);
		},

		last: function last() {
			return this.eq(-1);
		},

		eq: function eq(i) {
			var len = this.length,
			    j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function end() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function () {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function error(msg) {
			throw new Error(msg);
		},

		noop: function noop() {},

		isFunction: function isFunction(obj) {
			return jQuery.type(obj) === "function";
		},

		isWindow: function isWindow(obj) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function isNumeric(obj) {

			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type(obj);
			return (type === "number" || type === "string") &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN(obj - parseFloat(obj));
		},

		isPlainObject: function isPlainObject(obj) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if (!obj || toString.call(obj) !== "[object Object]") {
				return false;
			}

			proto = getProto(obj);

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if (!proto) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
			return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
		},

		isEmptyObject: function isEmptyObject(obj) {

			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;

			for (name in obj) {
				return false;
			}
			return true;
		},

		type: function type(obj) {
			if (obj == null) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
		},

		// Evaluates a script in a global context
		globalEval: function globalEval(code) {
			DOMEval(code);
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function camelCase(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		each: function each(obj, callback) {
			var length,
			    i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android <=4.0 only
		trim: function trim(text) {
			return text == null ? "" : (text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function makeArray(arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function inArray(elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function merge(first, second) {
			var len = +second.length,
			    j = 0,
			    i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function grep(elems, callback, invert) {
			var callbackInverse,
			    matches = [],
			    i = 0,
			    length = elems.length,
			    callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function map(elems, callback, arg) {
			var length,
			    value,
			    i = 0,
			    ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function proxy(fn, context) {
			var tmp, args, proxy;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = _slice.call(arguments, 2);
			proxy = function proxy() {
				return fn.apply(context || this, args.concat(_slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArrayLike(obj) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
		    type = jQuery.type(obj);

		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	}

	return jQuery;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//dataStore.js
var dataStore = {

	store: {},

	setData: function setData(collection, data) {
		dataStore.store[collection] = data;
	},

	pushData: function pushData(collection, data) {
		if (!dataStore[collection]) {
			dataStore.store[collection] = data;
		} else {
			dataStore[collection].push(data);
		}
	},

	getData: function getData(collection, id) {
		if (collection && id) {
			var array = dataStore.store[collection];
			var itemId = id;
			var item = void 0;
			for (var i = 0; i < array.length; i++) {
				if (array[i].id === itemId) {
					item = array[i];
					break;
				}
			}
			return item;
		} else if (collection && !id) {
			return dataStore.store[collection];
		} else if (!collection && !id) {
			return dataStore.store;
		}
	}
};

exports.default = dataStore;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	"use strict";

	return window.document;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(30);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	"use strict";

	return [];
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(50)], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	"use strict";
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	"use strict";

	// [[Class]] -> type pairs

	return {};
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function (pnum) {
	"use strict";

	return new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	"use strict";

	return (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
	);
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(18), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document, documentElement, support) {

	"use strict";

	(function () {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if (!div) {
				return;
			}

			div.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild(container);

			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild(container);

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		var pixelPositionVal,
		    boxSizingReliableVal,
		    pixelMarginRightVal,
		    reliableMarginLeftVal,
		    container = document.createElement("div"),
		    div = document.createElement("div");

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
		container.appendChild(div);

		jQuery.extend(support, {
			pixelPosition: function pixelPosition() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function boxSizingReliable() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function pixelMarginRight() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function reliableMarginLeft() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		});
	})();

	return support;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (arr) {
	"use strict";

	return arr.slice;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (arr) {
	"use strict";

	return arr.indexOf;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function (class2type) {
	"use strict";

	return class2type.hasOwnProperty;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function (hasOwn) {
	"use strict";

	return hasOwn.toString;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	"use strict";

	// All support tests are defined in their respective modules.

	return {};
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

	"use strict";

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function

	var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
		    len = elems.length,
		    bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
			chainable = true;

			if (!jQuery.isFunction(value)) {
				raw = true;
			}

			if (bulk) {

				// Bulk operations run against the entire set
				if (raw) {
					fn.call(elems, value);
					fn = null;

					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function fn(elem, key, value) {
						return bulk.call(jQuery(elem), value);
					};
				}
			}

			if (fn) {
				for (; i < len; i++) {
					fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
				}
			}
		}

		if (chainable) {
			return elems;
		}

		// Gets
		if (bulk) {
			return fn.call(elems);
		}

		return len ? fn(elems[0], key) : emptyGet;
	};

	return access;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (document) {
	"use strict";

	return document.documentElement;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(9), __webpack_require__(20), __webpack_require__(21), __webpack_require__(11), __webpack_require__(7) // Get jQuery.contains
], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, rnumnonpx, rmargin, getStyles, support) {

	"use strict";

	function curCSS(elem, name, computed) {
		var width,
		    minWidth,
		    maxWidth,
		    ret,


		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

		computed = computed || getStyles(elem);

		// getPropertyValue is needed for:
		//   .css('filter') (IE 9 only, #12537)
		//   .css('--customProperty) (#3144)
		if (computed) {
			ret = computed.getPropertyValue(name) || computed[name];

			if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
				ret = jQuery.style(elem, name);
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" : ret;
	}

	return curCSS;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	"use strict";

	return (/^margin/
	);
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	"use strict";

	return function (elem) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

// Initialize a jQuery object
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(53), __webpack_require__(54)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document, rsingleTag) {

	"use strict";

	// A central reference to the root jQuery(document)

	var rootjQuery,


	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	    init = jQuery.fn.init = function (selector, context, root) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === "string") {
			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (jQuery.isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
								this.attr(match, context[match]);
							}
						}
					}

					return this;

					// HANDLE: $(#id)
				} else {
					elem = document.getElementById(match[2]);

					if (elem) {

						// Inject the element directly into the jQuery object
						this[0] = elem;
						this.length = 1;
					}
					return this;
				}

				// HANDLE: $(expr, $(...))
			} else if (!context || context.jquery) {
				return (context || root).find(selector);

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor(context).find(selector);
			}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
			this[0] = selector;
			this.length = 1;
			return this;

			// HANDLE: $(function)
			// Shortcut for document ready
		} else if (jQuery.isFunction(selector)) {
			return root.ready !== undefined ? root.ready(selector) :

			// Execute immediately if ready is not present
			selector(jQuery);
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	return init;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function (pnum) {

	"use strict";

	return new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	"use strict";

	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function get() {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}

	return addGetHookIf;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _router = __webpack_require__(26);

var _router2 = _interopRequireDefault(_router);

var _dataStore = __webpack_require__(2);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//index.js
var index = function () {
	'use strict';

	var root = void 0;

	var searchInput = function searchInput() {
		//MODAL SEARCH (small devices)
		//search open
		root.querySelector("#search-open").addEventListener("click", function (event) {
			event.preventDefault();
			root.querySelector('#search-modal').style.display = 'block';
		}, false);
		//search close
		root.querySelector("#search-close").addEventListener("click", function (event) {
			root.querySelector('#search-modal').style.display = 'none';
		}, false);
		//search valid
		root.querySelector("#search-form").addEventListener("submit", function (event) {
			event.preventDefault();
			var search = root.querySelector('[name=search]').value;
			if (search !== '') {
				location.hash = '#/search?q=' + search;
			}
			root.querySelector('#search-modal').style.display = 'none';
			root.querySelector('[name=search]').value = '';
		}, false);
	};

	var init = function init() {
		//if book/id/read 
		if (location.hash.match(/#\/[^\/]+\/read$/)) {
			_utils2.default.addClass("#nav-bar-top", "hidden"); //hide nav-bar-top
		} else {
			_utils2.default.removeClass("#nav-bar-top", "hidden");
			if (window.innerWidth < 768) {
				_utils2.default.addClass("#top-links", "hidden");
				_utils2.default.removeClass("#menu-open", "hidden");
			} else {
				_utils2.default.removeClass("#top-links", "hidden");
				_utils2.default.addClass("#menu-open", "hidden");
			}
		}

		root = document.querySelector("#navigation");
		//MODAL MENU (small devices)
		//open modal
		root.querySelector("#menu-open").addEventListener("click", function () {
			root.querySelector('#menu').style.display = 'block';
		}, false);
		//close modal
		root.querySelector("#menu-close").addEventListener("click", function () {
			root.querySelector('#menu').style.display = 'none';
		}, false);
		//menu links : close modal on click
		var links = root.querySelectorAll("#menu a");
		for (var i = 0; i < links.length; i++) {
			links[i].addEventListener("click", function () {
				setTimeout(function () {
					root.querySelector('#menu').style.display = 'none';
				}, 100);
			}, false);
		}

		searchInput();
	};

	//function getData
	var getData = function getData() {
		//check if user && user===admin
		var options = { method: 'GET', url: '/users/currentuser' };
		_utils2.default.ajax(options).then(function (response) {
			var currentUser = JSON.parse(response).user;
			//pass currentUser to store
			_dataStore2.default.setData('currentUser', currentUser);
			//check role : if admin => admin-link
			if (currentUser.admin && currentUser.admin === true) {
				_utils2.default.removeClass('#admin-item', 'hidden');
				_utils2.default.removeClass('#menu-admin-item', 'hidden');
			} else {
				_utils2.default.addClass('#admin-item', 'hidden');
				_utils2.default.addClass('#menu-admin-item', 'hidden');
			}

			//get authors
			var options = { method: 'GET', url: '/authors/' };
			return _utils2.default.ajax(options);
		}).then(function (response) {
			var authors = JSON.parse(response).authors;
			//pass authors to store
			_dataStore2.default.setData('authors', authors);

			//get books
			var options = { method: 'GET', url: '/books/' };
			return _utils2.default.ajax(options);
		}).then(function (response) {
			var books = JSON.parse(response).books;
			//pass books to store
			_dataStore2.default.setData('books', books);
			return 'done';
		}).then(function (resolve) {
			//call router
			(0, _router2.default)();
			//loader stop
			_utils2.default.addClass('#loader-container', 'hidden');
		}).catch(function (error) {
			console.log(error);
		});
	};

	window.addEventListener('DOMContentLoaded', function (e) {
		init();
		getData();

		window.addEventListener('hashchange', function () {
			if (location.hash.match(/#\/[^\/]+\/read$/)) {
				_utils2.default.addClass("#nav-bar-top", "hidden");
			} else {
				_utils2.default.removeClass("#nav-bar-top", "hidden");
				if (window.innerWidth < 768) {
					_utils2.default.addClass("#top-links", "hidden");
					_utils2.default.removeClass("#menu-open", "hidden");
				} else {
					_utils2.default.removeClass("#top-links", "hidden");
					_utils2.default.addClass("#menu-open", "hidden");
				}
			}
		}, false);

		window.addEventListener('resize', function () {
			//utils.removeClass("#nav-bar-top", "hidden");
			if (window.innerWidth < 768) {
				_utils2.default.addClass("#top-links", "hidden");
				_utils2.default.removeClass("#menu-open", "hidden");
			} else {
				_utils2.default.removeClass("#top-links", "hidden");
				_utils2.default.addClass("#menu-open", "hidden");
			}
		}, false);
	}, false);
}();

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(2);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _home = __webpack_require__(27);

var _home2 = _interopRequireDefault(_home);

var _search = __webpack_require__(32);

var _search2 = _interopRequireDefault(_search);

var _booksNext = __webpack_require__(36);

var _booksNext2 = _interopRequireDefault(_booksNext);

var _bookRead = __webpack_require__(40);

var _bookRead2 = _interopRequireDefault(_bookRead);

var _authors = __webpack_require__(69);

var _authors2 = _interopRequireDefault(_authors);

var _adminLogin = __webpack_require__(73);

var _adminLogin2 = _interopRequireDefault(_adminLogin);

var _adminRouter = __webpack_require__(75);

var _adminRouter2 = _interopRequireDefault(_adminRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//admin (template - no controller)

//authors (controller)

//books-next(controller)

//home(controller)
var adminTemplate = __webpack_require__(114);
//adminRouter (sub-router)

//adminLogin (controller)

//book-read (controller)

//search(controller)


//routes.js
var router = function router() {
	'use strict';

	var routes = function routes(oldhash, newhash) {

		var container = document.querySelector('#container');

		//ROUTES
		if (newhash === '' || newhash === '#/') {
			//HOME
			(0, _home2.default)(container);
		} else if (newhash.match(/#\/search\?q=/)) {
			//SEARCH
			(0, _search2.default)(container);
		} else if (newhash === '#/tobepublished') {
			//TO BE PUBLISHED
			(0, _booksNext2.default)(container);
		} else if (newhash.match(/#\/[^\/]+\/read$/)) {
			//BOOK READ
			(0, _bookRead2.default)(container);
		} else if (newhash.match(/#\/authors\?(search=(A-Z))?/)) {
			//AUTHORS
			(0, _authors2.default)(container);
		} else if (newhash.match(/#\/admin/) && newhash !== '#/admin/login/') {
			//ADMIN : if admin not connected, redirect to /admin/login
			_utils2.default.checkRole().then(function (response) {
				//admin
				//Insert adminTemplate including #adminContainer for admin routes
				var user = response;
				container.innerHTML = ""; //empty the container
				var div = document.createElement('div');
				div.innerHTML = adminTemplate();
				container.appendChild(div);
				_utils2.default.activeLink(); //for adminLinks
				return user;
			}).then(function (user) {
				//ADMIN ROUTES : call to sub-router (admin routes)
				(0, _adminRouter2.default)(oldhash, newhash, user);
			}).catch(function (error) {
				//not admin
				location.hash = '#/admin/login/';
			});
		} else if (newhash === '#/admin/login/') {
			//ADMIN LOGIN : if admin already connected, redirect to /admin
			_utils2.default.checkRole().then(function (admin) {
				//admin
				location.hash = '#/admin/';
			}).catch(function (error) {
				//not admin
				(0, _adminLogin2.default)(container);
			});
		} else {
			//FALLBACK
			location.hash = '#/';
		}
	};

	//ON LOAD (called by index.js)
	//if(location.hash === "") { location.hash = "#/"; }

	var oldhash = void 0,
	    newhash = void 0;

	newhash = location.hash;
	_dataStore2.default.setData('location', { prevLocation: oldhash, newLocation: newhash });
	routes(oldhash, newhash);
	//active link
	_utils2.default.activeLink();

	window.addEventListener('hashchange', function () {
		oldhash = newhash;
		newhash = location.hash;
		//store prev and new location in dataStore
		_dataStore2.default.setData('location', { prevLocation: oldhash, newLocation: newhash });
		//call routes
		routes(oldhash, newhash);
		//active link
		_utils2.default.activeLink();
	}, false);
};

exports.default = router;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dataStore = __webpack_require__(2);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _home = __webpack_require__(28);

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var homeTemplate = __webpack_require__(31);
//home.js
var home = function home(container) {
	'use strict';

	var c = container;

	//Get books from dataStore
	var bs = _dataStore2.default.getData('books');
	//get last 12 visible books reverse order
	var lBs = bs.filter(function (b) {
		return b.visible;
	}).reverse().slice(0, 12);

	//go to book/read
	var readBk = function readBk(event) {
		var b = _dataStore2.default.getData('books', event.currentTarget.id);
		var path = b.path.replace(/^\/books\/[^\/]+/, '');
		location.hash = '#' + path + "/read";
		var doc = window.document;
		var docEl = doc.documentElement;
		var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
		if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
			requestFullScreen.call(docEl);
		}
	};
	//open infos
	var openInfos = function openInfos(event) {
		var id = event.target.id.replace('open-', '');
		document.getElementById(id).style.display = 'block';
	};
	//close infos
	var closeInfos = function closeInfos(event) {
		var id = event.target.id.replace('close-', '');
		document.getElementById(id).style.display = 'none';
	};

	//insert template in container
	c.innerHTML = homeTemplate({ books: lBs });
	var root = document.querySelector('#home-container');
	//scroll after read
	if (_dataStore2.default.getData('location').prevLocation !== undefined && _dataStore2.default.getData('location').prevLocation.match(/\/read$/)) {
		var id = _dataStore2.default.getData('book');
		var el = document.getElementById(id);
		el.scrollIntoView(true);
		var html = document.getElementsByTagName("html")[0];
		html.scrollTop = html.scrollTop - 30;
	}
	//link to book/read
	var bks = root.querySelectorAll('.book');
	for (var i = 0; i < bks.length; i++) {
		bks[i].addEventListener('click', readBk, false);
	}
	//modal (infos)
	//open
	var openInfosBtns = root.querySelectorAll('.open-infos-btn');
	for (var _i = 0; _i < openInfosBtns.length; _i++) {
		openInfosBtns[_i].addEventListener('click', openInfos, false);
	}
	//close
	var closeInfosBtns = root.querySelectorAll('.close-infos-btn');
	for (var _i2 = 0; _i2 < closeInfosBtns.length; _i2++) {
		closeInfosBtns[_i2].addEventListener('click', closeInfos, false);
	}
};

exports.default = home;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./home.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./home.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "#home-container #top-page-header {\n\ttext-align: center;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tfont-size: 1em;\n\tfont-variant: small-caps;\n\tletter-spacing: 1px;\n\tline-height: 25px;\n\twidth: 110px;\n\tmargin: auto;\n\tmargin-top: 32px;\n\tdisplay: block;\n}\n\n@media only screen and (min-width: 768px) {\n\t#home-container #top-page-header {\n\t\tdisplay: none;\n\t}\n}\n\n#home-container #booksList {\n\tmax-width: 568px;\n\tmargin: auto;\n}\n\n@media only screen and (min-width: 853px) {\n\t#home-container #booksList {\n\t\tmax-width: 852px;\n\t}\n}\n\n@media only screen and (min-width: 1137px) {\n\t#home-container #booksList {\n\t\tmax-width: 1136px;\n\t}\n}\n\n#home-container .w3-col {\n\twidth: 100%;\n\theight: 408px;\n\t\n}\n\n@media only screen and (min-width: 600px) {\n\t#home-container .w3-col {\n\t\twidth: 284px;\n\t}\n}\n\n#home-container #paper {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#home-container .book {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n\tposition: relative;\n}\n\n#home-container .book .logo .span2 {\n\tfont-variant: small-caps;\n\tfont-style: normal;\n}\n\n#home-container #book-btn {\n\twidth: 238px;\n\theight: 40px;\n\tmargin: auto;\n\tmargin-top: 8px;\n}\n\n#home-container #book-btn button {\n\tfont-family: \"Times New Roman\", Georgia, serif;\n\tfont-size: 1em;\n\tletter-spacing: 1.5px;\n\tbackground-color: transparent;\n}\n\n/*\nMODAL (INFOS)\n*/\n\n#home-container .w3-modal {\n\tfont-family: \"Verdana\", serif;\n}\n\n#home-container .w3-modal #footer {\n\tpadding-top: 16px;\n}\n\n#home-container .w3-modal .close-infos-btn {\n\tfont-size: 1.1em;\n\tfont-family: \"Verdana\", serif;\n\tletter-spacing: 1px;\n}\n\n#home-container .w3-modal p {\n\tmargin: 0px;\n\tmargin-top: 8px;\n}\n\n#home-container .w3-modal ul {\n\tmargin: 0px;\n\tpadding-left: 10px;\n\tlist-style-type: none;\n}\n\n#home-container .w3-modal .contrib-role {\n\ttext-transform: capitalize;\n}\n\n\n\n", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="home-container" class="w3-content" style="max-width: 1136px">\n\n	<div id="top-page-header" class="w3-light-gray">nouveautés</div>\n	<div id="booksList" class="w3-padding-64 w3-animate-opacity">\n		<div class=\'w3-row\'>\n			<% for(var i=0; i<books.length; i++) {%>\n				\n				<!-- MODAL (INFOS) -->\n				<%- include src/components/home/infos-modal.ejs -%>\n				\n				<div class="w3-col" style="text-align: center">\n					<div id="paper" style="background-color: <%- books[i].styles.color %>; background-image: url(<%- books[i].styles.image %>)">\n						<div id="<%= books[i].id %>" class="book" style="<%= books[i].styles.cover %>">\n							<p class="author" style="<%=books[i].styles.author %>"><%- books[i].authorDisplay %></p>\n							<p class="title" style="<%-books[i].styles.title %>">\n								<%- books[i].title %>\n							</p>\n							<% if(books[i].subtitle1) {%>\n							<p class="subtitle1" style="<%= books[i].styles.subtitle1 %>">\n								<%- books[i].subtitle1 %></a>\n							</p>\n							<% } %>\n							<% if(books[i].subtitle2) {%>\n							<p class="subtitle1" style="<%= books[i].styles.subtitle2 %>">\n								<%- books[i].subtitle2 %></a>\n							</p>\n							<% } %>\n							<p class="logo" style="<%=books[i].styles.logo %>">\n								<span class="span1">L&rsquo;Intermédiaire</span><br/>\n								<span class="span2">éditions</span>\n							</p>\n					   </div>\n				   </div>\n				   <div id="book-btn" >\n						<button id="open-infos-<%= books[i].id %>" \n						        class="open-infos-btn align-right w3-btn w3-ripple w3-hover-none" >+ d\'infos</button>\n				   </div>\n				</div>\n				\n			<% } %>\n		</div>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="home-container" class="w3-content" style="max-width: 1136px">\n\n	<div id="top-page-header" class="w3-light-gray">nouveautés</div>\n	<div id="booksList" class="w3-padding-64 w3-animate-opacity">\n		<div class=\'w3-row\'>\n			');
                __stack.lineno = 6;
                for (var i = 0; i < books.length; i++) {
                    buf.push("\n				\n				<!-- MODAL (INFOS) -->\n				" + function() {
                        var buf = [];
                        buf.push('<div id="infos-', escape((__stack.lineno = 1, books[i].id)), '" class="w3-modal" style="background-color: rgba(0,0,0,0.1)">\n	<div class="w3-modal-content w3-card w3-animate-top" style="max-width: 500px">\n		<div class="w3-container w3-padding-16 ">\n			  <p><b>Titre : </b>', (__stack.lineno = 4, books[i].title), "</p>\n			  ");
                        __stack.lineno = 5;
                        if (books[i].subtitle1) {
                            buf.push("\n				<p><b>Sous-titre : </b>", (__stack.lineno = 6, books[i].subtitle1), "</p>\n			  ");
                            __stack.lineno = 7;
                        }
                        buf.push("\n			  ");
                        __stack.lineno = 8;
                        if (books[i].subtitle2) {
                            buf.push("\n				<p><b>Sous-sous-titre : </b>", (__stack.lineno = 9, books[i].subtitle2), "</p>\n			  ");
                            __stack.lineno = 10;
                        }
                        buf.push("\n			  <p><b>Année de parution : </b>", (__stack.lineno = 11, books[i].year), "</p>\n			  ");
                        __stack.lineno = 12;
                        if (books[i].authors.length > 1) {
                            buf.push("\n					<p>\n						<span><b>Auteurs :</b></span>\n						<br>\n						<ul>\n						");
                            __stack.lineno = 17;
                            for (var j = 0; j < books[i].authors.length; j++) {
                                buf.push("\n							<li>\n								", (__stack.lineno = 19, books[i].authors[j].name), " (", (__stack.lineno = 19, books[i].authors[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 19, books[i].authors[j].death), ")\n							</li>\n						");
                                __stack.lineno = 21;
                            }
                            buf.push("\n						</ul>\n					</p>\n			  ");
                            __stack.lineno = 24;
                        } else if (books[i].authors.length === 1) {
                            buf.push("\n					<p><b>Auteur : </b>", (__stack.lineno = 25, books[i].authors[0].name), " (", (__stack.lineno = 25, books[i].authors[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 25, books[i].authors[0].death), ")</p>\n			  ");
                            __stack.lineno = 26;
                        }
                        buf.push("\n			  ");
                        __stack.lineno = 27;
                        if (books[i].contribs.length > 1) {
                            buf.push("\n					<p>\n						<span><b>Contributions :</b></span>\n						<br>\n						<ul>\n						");
                            __stack.lineno = 32;
                            for (var j = 0; j < books[i].contribs.length; j++) {
                                buf.push('\n							<li>\n								<span class="contrib-role">', (__stack.lineno = 34, books[i].contribs[j].role), " : </span>\n								", (__stack.lineno = 35, books[i].contribs[j].name), " (", (__stack.lineno = 35, books[i].contribs[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 35, books[i].contribs[j].death), ")\n							</li>\n						");
                                __stack.lineno = 37;
                            }
                            buf.push("\n						</ul>\n					</p>\n			  ");
                            __stack.lineno = 40;
                        } else if (books[i].contribs.length === 1) {
                            buf.push('\n					<p>\n						<span><b>Contribution : </b></span>\n						<br>\n						<ul>\n							<li>\n								<span class="contrib-role">', (__stack.lineno = 46, books[i].contribs[0].role), " : </span>\n								", (__stack.lineno = 47, books[i].contribs[0].name), " (", (__stack.lineno = 47, books[i].contribs[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 47, books[i].contribs[0].death), ")\n							</li>\n						</ul>\n					</p>\n			  ");
                            __stack.lineno = 51;
                        }
                        buf.push('\n			  <p class="book-source"><b>Source : </b>\n				  <ul>\n					  <li>&Eacute;diteur : ', (__stack.lineno = 54, books[i].source.publisher), "</li>\n					  <li>Année de parution : ", (__stack.lineno = 55, books[i].source.year), "</li>\n				  </ul>\n			  </p>\n			  ");
                        __stack.lineno = 58;
                        if (books[i].description) {
                            buf.push("\n			  <div>", (__stack.lineno = 59, books[i].description), "</div>\n			  ");
                            __stack.lineno = 60;
                        }
                        buf.push('\n		</div>\n		<div id=footer class="w3-container w3-border-bottom">\n			<button id="close-infos-', escape((__stack.lineno = 63, books[i].id)), '" \n					class="close-infos-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-bottomright"\n					>Fermer</button>\n		</div>\n	</div>\n</div>\n');
                        return buf.join("");
                    }() + '				\n				<div class="w3-col" style="text-align: center">\n					<div id="paper" style="background-color: ', (__stack.lineno = 11, books[i].styles.color), "; background-image: url(", (__stack.lineno = 11, books[i].styles.image), ')">\n						<div id="', escape((__stack.lineno = 12, books[i].id)), '" class="book" style="', escape((__stack.lineno = 12, books[i].styles.cover)), '">\n							<p class="author" style="', escape((__stack.lineno = 13, books[i].styles.author)), '">', (__stack.lineno = 13, books[i].authorDisplay), '</p>\n							<p class="title" style="', (__stack.lineno = 14, books[i].styles.title), '">\n								', (__stack.lineno = 15, books[i].title), "\n							</p>\n							");
                    __stack.lineno = 17;
                    if (books[i].subtitle1) {
                        buf.push('\n							<p class="subtitle1" style="', escape((__stack.lineno = 18, books[i].styles.subtitle1)), '">\n								', (__stack.lineno = 19, books[i].subtitle1), "</a>\n							</p>\n							");
                        __stack.lineno = 21;
                    }
                    buf.push("\n							");
                    __stack.lineno = 22;
                    if (books[i].subtitle2) {
                        buf.push('\n							<p class="subtitle1" style="', escape((__stack.lineno = 23, books[i].styles.subtitle2)), '">\n								', (__stack.lineno = 24, books[i].subtitle2), "</a>\n							</p>\n							");
                        __stack.lineno = 26;
                    }
                    buf.push('\n							<p class="logo" style="', escape((__stack.lineno = 27, books[i].styles.logo)), '">\n								<span class="span1">L&rsquo;Intermédiaire</span><br/>\n								<span class="span2">éditions</span>\n							</p>\n					   </div>\n				   </div>\n				   <div id="book-btn" >\n						<button id="open-infos-', escape((__stack.lineno = 34, books[i].id)), '" \n						        class="open-infos-btn align-right w3-btn w3-ripple w3-hover-none" >+ d\'infos</button>\n				   </div>\n				</div>\n				\n			');
                    __stack.lineno = 39;
                }
                buf.push("\n		</div>\n	</div>\n</div>\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dataStore = __webpack_require__(2);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _search = __webpack_require__(33);

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchTemplate = __webpack_require__(35);

//authors.js
var search = function search(container) {
	'use strict';

	var c = container;

	var search = location.hash.replace(/#\/search\?q\=/, '').replace('\'', '’');
	var nores = '';
	if (search.split('').length < 3) {
		nores = 'Aucun résultat.';
		c.innerHTML = searchTemplate({ books: [], nores: nores });
		return;
	}
	var q = new RegExp(search, 'gi');

	//get visible books from dataStore
	var bs = _dataStore2.default.getData('books').filter(function (b) {
		return b.visible === true;
	});
	//get search books
	var sbs = bs.filter(function (b) {
		return b.title.replace('&nbsp;', ' ').match(q);
	});
	//get visible authors from dataStore
	var as = _dataStore2.default.getData('authors').filter(function (a) {
		return a.visible === true;
	});
	//get search authors
	var sas = as.filter(function (a) {
		return a.name.replace('&nbsp;', ' ').match(q);
	});
	for (var i = 0; i < sas.length; i++) {
		var a = sas[i];

		var _loop = function _loop(j) {
			var ab = a.contribs[j].book;
			var ba = bs.filter(function (b) {
				return b.id === ab.id;
			});
			if (ba[0] && ba[0].visible === true) {
				sbs.push(ba[0]);
			}
		};

		for (var j = 0; j < a.contribs.length; j++) {
			_loop(j);
		}

		var _loop2 = function _loop2(j) {
			var ab = a.books[j];
			var ba = bs.filter(function (b) {
				return b.id === ab.id;
			});
			if (ba[0] && ba[0].visible === true) {
				sbs.push(ba[0]);
			}
		};

		for (var j = 0; j < a.books.length; j++) {
			_loop2(j);
		}
	}

	console.log(sbs);
	console.log(sas);

	if (sbs.length === 0) {
		nores = 'Aucun résultat.';
		c.innerHTML = searchTemplate({ books: [], nores: nores });
		return;
	}

	//go to book/read
	var readBk = function readBk(event) {
		var b = _dataStore2.default.getData('books', event.currentTarget.id);
		var path = b.path.replace(/^\/books\/[^\/]+/, '');
		location.hash = '#' + path + "/read";
	};
	//open infos
	var openInfos = function openInfos(event) {
		var id = event.target.id.replace('open-', '');
		document.getElementById(id).style.display = 'block';
	};
	//close infos
	var closeInfos = function closeInfos(event) {
		var id = event.target.id.replace('close-', '');
		document.getElementById(id).style.display = 'none';
	};
	c.innerHTML = searchTemplate({ books: sbs.reverse(), nores: nores });
	var root = document.querySelector('#search-container');
	//scroll after read
	if (_dataStore2.default.getData('location').prevLocation !== undefined && _dataStore2.default.getData('location').prevLocation.match(/\/read$/)) {
		var id = _dataStore2.default.getData('book');
		var el = document.getElementById(id);
		el.scrollIntoView(true);
		var html = document.getElementsByTagName("html")[0];
		html.scrollTop = html.scrollTop - 30;
	}
	//link to book/read
	var bks = root.querySelectorAll('.book');
	for (var _i = 0; _i < bks.length; _i++) {
		bks[_i].addEventListener('click', readBk, false);
	}
	//modal (infos)
	//open
	var openInfosBtns = root.querySelectorAll('.open-infos-btn');
	for (var _i2 = 0; _i2 < openInfosBtns.length; _i2++) {
		openInfosBtns[_i2].addEventListener('click', openInfos, false);
	}
	//close
	var closeInfosBtns = root.querySelectorAll('.close-infos-btn');
	for (var _i3 = 0; _i3 < closeInfosBtns.length; _i3++) {
		closeInfosBtns[_i3].addEventListener('click', closeInfos, false);
	}
};

exports.default = search;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./search.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./search.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "#search-container #top-page-header {\n\ttext-align: center;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tfont-size: 1em;\n\tfont-variant: small-caps;\n\tletter-spacing: 1px;\n\tline-height: 25px;\n\twidth: 98px;\n\tmargin: auto;\n\tmargin-top: 32px;\n\tdisplay: block;\n}\n\n@media only screen and (min-width: 768px) {\n\t#search-container #top-page-header {\n\t\tdisplay: none;\n\t}\n}\n\n#search-container #booksList {\n\tmax-width: 568px;\n\tmargin: auto;\n}\n\n@media only screen and (min-width: 853px) {\n\t#search-container #booksList {\n\t\tmax-width: 852px;\n\t}\n}\n\n@media only screen and (min-width: 1137px) {\n\t#search-container #booksList {\n\t\tmax-width: 1136px;\n\t}\n}\n\n#search-container .w3-col {\n\twidth: 100%;\n\theight: 408px;\n}\n\n@media only screen and (min-width: 600px) {\n\t#search-container .w3-col {\n\t\twidth: 284px;\n\t}\n}\n\n#search-container #paper {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#search-container .book {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#home-container .book .logo .span2 {\n\tfont-variant: small-caps;\n\tfont-style: normal;\n}\n\n#search-container #book-btn {\n\twidth: 238px;\n\theight: 40px;\n\tmargin: auto;\n\tmargin-top: 8px;\n}\n\n#search-container #book-btn button {\n\tfont-family: \"Times New Roman\", Georgia, serif;\n\tfont-size: 1em;\n\tletter-spacing: 1.5px;\n\tbackground-color: transparent;\n}\n\n/*\nMODAL (INFOS)\n*/\n#search-container .w3-modal {\n\tfont-family: \"Verdana\", serif;\n}\n\n#search-container .w3-modal #footer {\n\tpadding-top: 16px;\n}\n\n#search-container .w3-modal .close-infos-btn {\n\tfont-size: 1.1em;\n\tfont-family: \"Verdana\", serif;\n\tletter-spacing: 1px;\n}\n\n#search-container .w3-modal p {\n\tmargin: 0px;\n\tmargin-top: 8px;\n}\n\n#search-container .w3-modal ul {\n\tmargin: 0px;\n\tpadding-left: 10px;\n\tlist-style-type: none;\n}\n\n#search-container .w3-modal .contrib-role {\n\ttext-transform: capitalize;\n}\n\n#nores {\n\ttext-align: center;\n}\n\n#nores p {\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tfont-size: 1.2em;\n\tfont-variant: small-caps;\n\tletter-spacing: 1px;\n}\n\n", ""]);

// exports


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="search-container" class="w3-content" style="max-width: 1136px">\n	<div id="top-page-header" class="w3-light-gray">recherche</div>\n	<% if(nores!==\'\') {%>\n		<div id="nores" class="w3-padding-32 w3-animate-opacity">\n			<p><%= nores %></p>\n		</div<\n	<%}%>\n	<div id="booksList" class="w3-padding-64 w3-animate-opacity">\n		<div class=\'w3-row\'>\n			<% for(var i=0; i<books.length; i++) {%>\n				\n				<!-- MODAL (INFOS) -->\n				<%- include src/components/search/infos-modal.ejs -%>\n				\n				<div class="w3-col" style="text-align: center">\n					<div id="paper" id="paper" style="background-color: <%- books[i].styles.color %>; background-image: url(<%- books[i].styles.image %>)">\n					<div id="<%= books[i].id %>" class="book" style="<%=books[i].styles.cover %>">\n						<p class="author" style="<%=books[i].styles.author %>"><%- books[i].authorDisplay %></p>\n						<p class="title" style="<%=books[i].styles.title %>">\n							<%- books[i].title %>\n						</p>\n						<% if(books[i].subtitle1) {%>\n						<p class="subtitle1" style="<%=books[i].styles.subtitle1 %>">\n							<%- books[i].subtitle1 %></a>\n						</p>\n						<% } %>\n						<% if(books[i].subtitle2) {%>\n						<p class="subtitle1" style="<%=books[i].styles.subtitle2 %>">\n							<%- books[i].subtitle2 %></a>\n						</p>\n						<% } %>\n						<p class="logo" style="<%=books[i].styles.logo %>">\n							<span class="span1">L&rsquo;Intermédiaire</span><br/>\n							<span class="span2">éditions</span>\n						</p>\n				   </div>\n				   </div>\n				   <div id="book-btn" >\n						<button id="open-infos-<%= books[i].id %>" \n						        class="open-infos-btn align-right w3-btn w3-ripple w3-hover-none" >+ d\'infos</button>\n				   </div>\n				</div>\n				\n			<% } %>\n		</div>\n	\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="search-container" class="w3-content" style="max-width: 1136px">\n	<div id="top-page-header" class="w3-light-gray">recherche</div>\n	');
                __stack.lineno = 3;
                if (nores !== "") {
                    buf.push('\n		<div id="nores" class="w3-padding-32 w3-animate-opacity">\n			<p>', escape((__stack.lineno = 5, nores)), "</p>\n		</div<\n	");
                    __stack.lineno = 7;
                }
                buf.push('\n	<div id="booksList" class="w3-padding-64 w3-animate-opacity">\n		<div class=\'w3-row\'>\n			');
                __stack.lineno = 10;
                for (var i = 0; i < books.length; i++) {
                    buf.push("\n				\n				<!-- MODAL (INFOS) -->\n				" + function() {
                        var buf = [];
                        buf.push('<div id="infos-', escape((__stack.lineno = 1, books[i].id)), '" class="w3-modal" style="background-color: rgba(0,0,0,0.1)">\n	<div class="w3-modal-content w3-card w3-animate-top" style="max-width: 500px">\n		<div class="w3-container w3-padding-16 ">\n			  <p><b>Titre : </b>', (__stack.lineno = 4, books[i].title), "</p>\n			  ");
                        __stack.lineno = 5;
                        if (books[i].subtitle1) {
                            buf.push("\n				<p><b>Sous-titre : </b>", (__stack.lineno = 6, books[i].subtitle1), "</p>\n			  ");
                            __stack.lineno = 7;
                        }
                        buf.push("\n			  ");
                        __stack.lineno = 8;
                        if (books[i].subtitle2) {
                            buf.push("\n				<p><b>Sous-sous-titre : </b>", (__stack.lineno = 9, books[i].subtitle2), "</p>\n			  ");
                            __stack.lineno = 10;
                        }
                        buf.push("\n			  <p><b>Année de parution : </b>", (__stack.lineno = 11, books[i].year), "</p>\n			  ");
                        __stack.lineno = 12;
                        if (books[i].authors.length > 1) {
                            buf.push("\n					<p>\n						<span><b>Auteurs :</b></span>\n						<br>\n						<ul>\n						");
                            __stack.lineno = 17;
                            for (var j = 0; j < books[i].authors.length; j++) {
                                buf.push("\n							<li>\n								", (__stack.lineno = 19, books[i].authors[j].name), " (", (__stack.lineno = 19, books[i].authors[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 19, books[i].authors[j].death), ")\n							</li>\n						");
                                __stack.lineno = 21;
                            }
                            buf.push("\n						</ul>\n					</p>\n			  ");
                            __stack.lineno = 24;
                        } else if (books[i].authors.length === 1) {
                            buf.push("\n					<p><b>Auteur : </b>", (__stack.lineno = 25, books[i].authors[0].name), " (", (__stack.lineno = 25, books[i].authors[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 25, books[i].authors[0].death), ")</p>\n			  ");
                            __stack.lineno = 26;
                        }
                        buf.push("\n			  ");
                        __stack.lineno = 27;
                        if (books[i].contribs.length > 1) {
                            buf.push("\n					<p>\n						<span><b>Contributions :</b></span>\n						<br>\n						<ul>\n						");
                            __stack.lineno = 32;
                            for (var j = 0; j < books[i].contribs.length; j++) {
                                buf.push('\n							<li>\n								<span class="contrib-role">', (__stack.lineno = 34, books[i].contribs[j].role), " : </span>\n								", (__stack.lineno = 35, books[i].contribs[j].name), " (", (__stack.lineno = 35, books[i].contribs[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 35, books[i].contribs[j].death), ")\n							</li>\n						");
                                __stack.lineno = 37;
                            }
                            buf.push("\n						</ul>\n					</p>\n			  ");
                            __stack.lineno = 40;
                        } else if (books[i].contribs.length === 1) {
                            buf.push('\n					<p>\n						<span><b>Contribution : </b></span>\n						<br>\n						<ul>\n							<li>\n								<span class="contrib-role">', (__stack.lineno = 46, books[i].contribs[0].role), " : </span>\n								", (__stack.lineno = 47, books[i].contribs[0].name), " (", (__stack.lineno = 47, books[i].contribs[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 47, books[i].contribs[0].death), ")\n							</li>\n						</ul>\n					</p>\n			  ");
                            __stack.lineno = 51;
                        }
                        buf.push('\n			  <p class="book-source"><b>Source : </b>\n				  <ul>\n					  <li>&Eacute;diteur : ', (__stack.lineno = 54, books[i].source.publisher), "</li>\n					  <li>Année de parution : ", (__stack.lineno = 55, books[i].source.year), "</li>\n				  </ul>\n			  </p>\n			  ");
                        __stack.lineno = 58;
                        if (books[i].description) {
                            buf.push("\n			  <div>", (__stack.lineno = 59, books[i].description), "</div>\n			  ");
                            __stack.lineno = 60;
                        }
                        buf.push('\n		</div>\n		<div id=footer class="w3-container w3-border-bottom">\n			<button id="close-infos-', escape((__stack.lineno = 63, books[i].id)), '" \n					class="close-infos-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-bottomright"\n					>Fermer</button>\n		</div>\n	</div>\n</div>\n');
                        return buf.join("");
                    }() + '				\n				<div class="w3-col" style="text-align: center">\n					<div id="paper" id="paper" style="background-color: ', (__stack.lineno = 15, books[i].styles.color), "; background-image: url(", (__stack.lineno = 15, books[i].styles.image), ')">\n					<div id="', escape((__stack.lineno = 16, books[i].id)), '" class="book" style="', escape((__stack.lineno = 16, books[i].styles.cover)), '">\n						<p class="author" style="', escape((__stack.lineno = 17, books[i].styles.author)), '">', (__stack.lineno = 17, books[i].authorDisplay), '</p>\n						<p class="title" style="', escape((__stack.lineno = 18, books[i].styles.title)), '">\n							', (__stack.lineno = 19, books[i].title), "\n						</p>\n						");
                    __stack.lineno = 21;
                    if (books[i].subtitle1) {
                        buf.push('\n						<p class="subtitle1" style="', escape((__stack.lineno = 22, books[i].styles.subtitle1)), '">\n							', (__stack.lineno = 23, books[i].subtitle1), "</a>\n						</p>\n						");
                        __stack.lineno = 25;
                    }
                    buf.push("\n						");
                    __stack.lineno = 26;
                    if (books[i].subtitle2) {
                        buf.push('\n						<p class="subtitle1" style="', escape((__stack.lineno = 27, books[i].styles.subtitle2)), '">\n							', (__stack.lineno = 28, books[i].subtitle2), "</a>\n						</p>\n						");
                        __stack.lineno = 30;
                    }
                    buf.push('\n						<p class="logo" style="', escape((__stack.lineno = 31, books[i].styles.logo)), '">\n							<span class="span1">L&rsquo;Intermédiaire</span><br/>\n							<span class="span2">éditions</span>\n						</p>\n				   </div>\n				   </div>\n				   <div id="book-btn" >\n						<button id="open-infos-', escape((__stack.lineno = 38, books[i].id)), '" \n						        class="open-infos-btn align-right w3-btn w3-ripple w3-hover-none" >+ d\'infos</button>\n				   </div>\n				</div>\n				\n			');
                    __stack.lineno = 43;
                }
                buf.push("\n		</div>\n	\n	</div>\n</div>\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dataStore = __webpack_require__(2);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _booksNext = __webpack_require__(37);

var _booksNext2 = _interopRequireDefault(_booksNext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var booksNextTemplate = __webpack_require__(39);
//home.js
var booksNext = function booksNext(container) {
	'use strict';

	var c = container;

	//Get books from dataStore
	var bs = _dataStore2.default.getData('books');
	//get non-visible books
	var nvbs = bs.filter(function (b) {
		return b.visible === false;
	});
	//open infos
	var openInfos = function openInfos(event) {
		var id = event.target.id.replace('open-', '');
		document.getElementById(id).style.display = 'block';
	};
	//close infos
	var closeInfos = function closeInfos(event) {
		var id = event.target.id.replace('close-', '');
		document.getElementById(id).style.display = 'none';
	};
	//insert template in container
	c.innerHTML = booksNextTemplate({ books: nvbs });
	var root = document.querySelector('#books-next-container');

	//modal (infos)
	//open
	var openInfosBtns = root.querySelectorAll('.open-infos-btn');
	for (var i = 0; i < openInfosBtns.length; i++) {
		openInfosBtns[i].addEventListener('click', openInfos, false);
	}
	//close
	var closeInfosBtns = root.querySelectorAll('.close-infos-btn');
	for (var _i = 0; _i < closeInfosBtns.length; _i++) {
		closeInfosBtns[_i].addEventListener('click', closeInfos, false);
	}
};

exports.default = booksNext;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./books-next.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./books-next.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "#books-next-container #top-page-header {\n\ttext-align: center;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tfont-size: 1em;\n\tfont-variant: small-caps;\n\tletter-spacing: 1px;\n\tline-height: 25px;\n\twidth: 100px;\n\tmargin: auto;\n\tmargin-top: 32px;\n\tdisplay: block;\n}\n\n@media only screen and (min-width: 768px) {\n\t#books-next-container #top-page-header {\n\t\tdisplay: none;\n\t}\n}\n\n#books-next-container #booksList {\n\tmax-width: 568px;\n\tmargin: auto;\n}\n\n@media only screen and (min-width: 853px) {\n\t#books-next-container #booksList {\n\t\tmax-width: 852px;\n\t}\n}\n\n@media only screen and (min-width: 1137px) {\n\t#books-next-container #booksList {\n\t\tmax-width: 1136px;\n\t}\n}\n\n#books-next-container .w3-col {\n\twidth: 100%;\n\theight: 408px;\n}\n\n@media only screen and (min-width: 600px) {\n\t#books-next-container .w3-col {\n\t\twidth: 284px;\n\t}\n}\n\n#books-next-container #paper {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#books-next-container .book {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#books-next-container .book .logo .span2 {\n\tfont-variant: small-caps;\n\tfont-style: normal;\n}\n\n#books-next-container #book-btn {\n\twidth: 238px;\n\theight: 40px;\n\tmargin: auto;\n\tmargin-top: 8px;\n}\n\n#books-next-container #book-btn button {\n\tfont-family: \"Times New Roman\", Georgia, serif;\n\tfont-size: 1em;\n\tletter-spacing: 1.5px;\n\tbackground-color: transparent;\n}\n\n/*\nMODAL (INFOS)\n*/\n#books-next-container .w3-modal {\n\tfont-family: \"Verdana\", serif;\n}\n\n#books-next-container .w3-modal #footer {\n\tpadding-top: 16px;\n}\n\n#books-next-container .w3-modal .close-infos-btn {\n\tfont-size: 1.1em;\n\tfont-family: \"Verdana\", serif;\n\tletter-spacing: 1px;\n}\n\n#books-next-container .w3-modal p {\n\tmargin: 0px;\n\tmargin-top: 8px;\n}\n\n#books-next-container .w3-modal ul {\n\tmargin: 0px;\n\tpadding-left: 10px;\n\tlist-style-type: none;\n}\n\n#books-next-container .w3-modal .contrib-role {\n\ttext-transform: capitalize;\n}\n\n\n\n", ""]);

// exports


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="books-next-container" class="w3-content" style="max-width: 1200px">\n	<div id="top-page-header" class="w3-light-gray">à paraître</div>\n	<div id="booksList" class="w3-padding-64 w3-animate-opacity">\n		<div class=\'w3-row\'>\n			<% for(var i=0; i<books.length; i++) {%>\n				\n				<!-- MODAL (INFOS) -->\n				<%- include src/components/books-next/infos-modal.ejs -%>\n				\n				<div class="w3-col" style="text-align: center">\n					<div id="paper" style="background-color: <%= books[i].styles.color %>; background-image: url(<%- books[i].styles.image %>)">\n					<div class="book" style="<%=books[i].styles.cover %>">\n						<p class="author" style="<%=books[i].styles.author %>"><%- books[i].authorDisplay %></p>\n						<p class="title" style="<%-books[i].styles.title %>">\n							<span><%- books[i].title %></span>\n						</p>\n						<% if(books[i].subtitle1) {%>\n						<p class="subtitle1" style="<%= books[i].styles.subtitle1 %>">\n							<%- books[i].subtitle1 %></a>\n						</p>\n						<% } %>\n						<% if(books[i].subtitle2) {%>\n						<p class="subtitle1" style="<%= books[i].styles.subtitle2 %>">\n							<%- books[i].subtitle2 %></a>\n						</p>\n						<% } %>\n						<p class="logo" style="<%=books[i].styles.logo %>">\n							<span class="span1">L&rsquo;Intermédiaire</span><br/>\n							<span class="span2">éditions</span>\n						</p>\n				   </div>\n				   </div>\n				   <div id="book-btn" >\n						<button id="open-infos-<%= books[i].id %>" class="open-infos-btn align-right w3-btn w3-ripple w3-hover-none">+ d\'infos</button>\n				   </div>\n				</div>\n				\n			<% } %>\n		</div>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="books-next-container" class="w3-content" style="max-width: 1200px">\n	<div id="top-page-header" class="w3-light-gray">à paraître</div>\n	<div id="booksList" class="w3-padding-64 w3-animate-opacity">\n		<div class=\'w3-row\'>\n			');
                __stack.lineno = 5;
                for (var i = 0; i < books.length; i++) {
                    buf.push("\n				\n				<!-- MODAL (INFOS) -->\n				" + function() {
                        var buf = [];
                        buf.push('<div id="infos-', escape((__stack.lineno = 1, books[i].id)), '" class="w3-modal" style="background-color: rgba(0,0,0,0.1)">\n	<div class="w3-modal-content w3-card w3-animate-top" style="max-width: 500px">\n		<div class="w3-container w3-padding-16">\n			  <p><b>Titre : </b>', (__stack.lineno = 4, books[i].title), "</p>\n			  ");
                        __stack.lineno = 5;
                        if (books[i].subtitle1) {
                            buf.push("\n				<p><b>Sous-titre : </b>", (__stack.lineno = 6, books[i].subtitle1), "</p>\n			  ");
                            __stack.lineno = 7;
                        }
                        buf.push("\n			  ");
                        __stack.lineno = 8;
                        if (books[i].subtitle2) {
                            buf.push("\n				<p><b>Sous-sous-titre : </b>", (__stack.lineno = 9, books[i].subtitle2), "</p>\n			  ");
                            __stack.lineno = 10;
                        }
                        buf.push("\n			  <p><b>Année de parution : </b>", (__stack.lineno = 11, books[i].year), "</p>\n			  ");
                        __stack.lineno = 12;
                        if (books[i].authors.length > 1) {
                            buf.push("\n					<p>\n						<span><b>Auteurs :</b></span>\n						<br>\n						<ul>\n						");
                            __stack.lineno = 17;
                            for (var j = 0; j < books[i].authors.length; j++) {
                                buf.push("\n							<li>\n								", (__stack.lineno = 19, books[i].authors[j].name), " (", (__stack.lineno = 19, books[i].authors[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 19, books[i].authors[j].death), ")\n							</li>\n						");
                                __stack.lineno = 21;
                            }
                            buf.push("\n						</ul>\n					</p>\n			  ");
                            __stack.lineno = 24;
                        } else if (books[i].authors.length === 1) {
                            buf.push("\n					<p><b>Auteur : </b>", (__stack.lineno = 25, books[i].authors[0].name), " (", (__stack.lineno = 25, books[i].authors[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 25, books[i].authors[0].death), ")</p>\n			  ");
                            __stack.lineno = 26;
                        }
                        buf.push("\n			  ");
                        __stack.lineno = 27;
                        if (books[i].contribs.length > 1) {
                            buf.push("\n					<p>\n						<span><b>Contributions :</b></span>\n						<br>\n						<ul>\n						");
                            __stack.lineno = 32;
                            for (var j = 0; j < books[i].contribs.length; j++) {
                                buf.push('\n							<li>\n								<span class="contrib-role">', (__stack.lineno = 34, books[i].contribs[j].role), " : </span>\n								", (__stack.lineno = 35, books[i].contribs[j].name), " (", (__stack.lineno = 35, books[i].contribs[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 35, books[i].contribs[j].death), ")\n							</li>\n						");
                                __stack.lineno = 37;
                            }
                            buf.push("\n						</ul>\n					</p>\n			  ");
                            __stack.lineno = 40;
                        } else if (books[i].contribs.length === 1) {
                            buf.push('\n					<p>\n						<span><b>Contribution : </b></span>\n						<br>\n						<ul>\n							<li>\n								<span class="contrib-role">', (__stack.lineno = 46, books[i].contribs[0].role), " : </span>\n								", (__stack.lineno = 47, books[i].contribs[0].name), " (", (__stack.lineno = 47, books[i].contribs[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 47, books[i].contribs[0].death), ")\n							</li>\n						</ul>\n					</p>\n			  ");
                            __stack.lineno = 51;
                        }
                        buf.push('\n			  <p class="book-source"><b>Source : </b>\n				  <ul>\n					  <li>&Eacute;diteur : ', (__stack.lineno = 54, books[i].source.publisher), "</li>\n					  <li>Année de parution : ", (__stack.lineno = 55, books[i].source.year), "</li>\n				  </ul>\n			  </p>\n			  ");
                        __stack.lineno = 58;
                        if (books[i].description) {
                            buf.push("\n			  <div>", (__stack.lineno = 59, books[i].description), "</div>\n			  ");
                            __stack.lineno = 60;
                        }
                        buf.push('\n		</div>\n		<div id=footer class="w3-container w3-border-bottom">\n			<button id="close-infos-', escape((__stack.lineno = 63, books[i].id)), '" \n					class="close-infos-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-bottomright"\n					>Fermer</button>\n		</div>\n	</div>\n</div>\n');
                        return buf.join("");
                    }() + '				\n				<div class="w3-col" style="text-align: center">\n					<div id="paper" style="background-color: ', escape((__stack.lineno = 10, books[i].styles.color)), "; background-image: url(", (__stack.lineno = 10, books[i].styles.image), ')">\n					<div class="book" style="', escape((__stack.lineno = 11, books[i].styles.cover)), '">\n						<p class="author" style="', escape((__stack.lineno = 12, books[i].styles.author)), '">', (__stack.lineno = 12, books[i].authorDisplay), '</p>\n						<p class="title" style="', (__stack.lineno = 13, books[i].styles.title), '">\n							<span>', (__stack.lineno = 14, books[i].title), "</span>\n						</p>\n						");
                    __stack.lineno = 16;
                    if (books[i].subtitle1) {
                        buf.push('\n						<p class="subtitle1" style="', escape((__stack.lineno = 17, books[i].styles.subtitle1)), '">\n							', (__stack.lineno = 18, books[i].subtitle1), "</a>\n						</p>\n						");
                        __stack.lineno = 20;
                    }
                    buf.push("\n						");
                    __stack.lineno = 21;
                    if (books[i].subtitle2) {
                        buf.push('\n						<p class="subtitle1" style="', escape((__stack.lineno = 22, books[i].styles.subtitle2)), '">\n							', (__stack.lineno = 23, books[i].subtitle2), "</a>\n						</p>\n						");
                        __stack.lineno = 25;
                    }
                    buf.push('\n						<p class="logo" style="', escape((__stack.lineno = 26, books[i].styles.logo)), '">\n							<span class="span1">L&rsquo;Intermédiaire</span><br/>\n							<span class="span2">éditions</span>\n						</p>\n				   </div>\n				   </div>\n				   <div id="book-btn" >\n						<button id="open-infos-', escape((__stack.lineno = 33, books[i].id)), '" class="open-infos-btn align-right w3-btn w3-ripple w3-hover-none">+ d\'infos</button>\n				   </div>\n				</div>\n				\n			');
                    __stack.lineno = 37;
                }
                buf.push("\n		</div>\n	</div>\n</div>\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(2);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _localStore = __webpack_require__(41);

var _localStore2 = _interopRequireDefault(_localStore);

var _WebBook = __webpack_require__(42);

var _WebBook2 = _interopRequireDefault(_WebBook);

var _bookRead = __webpack_require__(65);

var _bookRead2 = _interopRequireDefault(_bookRead);

var _hammerjs = __webpack_require__(67);

var _hammerjs2 = _interopRequireDefault(_hammerjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookReadTemplate = __webpack_require__(68);
//book.js
var book = function book(container) {
	'use strict';

	var c = container;

	var init = function init() {
		var textContainer = bookContainer.querySelector('[data-wb-text-container]');
		var tocLarge = bookContainer.querySelector('#toc-large-device');
		var tabOptions = bookContainer.querySelector('#tab-options');
		var options = bookContainer.querySelector('#options');
		var optionsMedium = bookContainer.querySelector('#options-medium');
		var fontSizesLarge = tabOptions.querySelectorAll('[name=fontSize]');
		var fontSizesMedium = optionsMedium.querySelectorAll('[name=fontSize]');
		var fontSizes = options.querySelectorAll('[name=fontSize]');
		var fontsLarge = tabOptions.querySelectorAll('[name=fontFamily]');
		var fontsMedium = optionsMedium.querySelectorAll('[name=fontFamily]');
		var fonts = options.querySelectorAll('[name=fontFamily]');
		var tabInfos = bookContainer.querySelector('#tab-infos');
		var bookCommands = bookContainer.querySelector('#book-commands');
		var bookNavBarBottom = bookContainer.querySelector('#book-nav-bar-bottom');
		var bookNavBarBottomSmall = bookContainer.querySelector('#book-nav-bar-bottom-small');
		var fontSizeValidLarge = bookContainer.querySelector('#font-size-valid-large');
		var fontSizeValid = bookContainer.querySelector('#font-size-valid');
		var cover = text.querySelector("#cover.wb-section");

		//DIMENSIONS
		var h = void 0,
		    w = void 0,
		    marginY = void 0,
		    marginX = void 0,
		    font = void 0,
		    fontSize = void 0,
		    lineHeight = void 0,
		    top = void 0;

		//font-family
		font = _localStore2.default.getFont() ? _localStore2.default.getFont() : bk.styles.font;
		text.style.fontFamily = font;
		bookContainer.querySelector('#current-section-title').style.fontFamily = font;
		bookContainer.querySelector('#currentByTotal').style.fontFamily = font;

		//width (responsive)
		if (window.innerWidth >= 768) {
			_utils2.default.addClass('[data-wb-text-container]', 'w3-card-2');
			//max-height: 720
			if (window.innerHeight > 832) {
				//748 + navBarBottom height (1*44) + textContainer minimum top * 2 (2*20)
				h = 748;
				top = (window.innerHeight - 748 - 44) / 2;
				textContainer.style.top = top - 15 + 'px';
				tocLarge.style.marginTop = top - 15 + 'px';
				tabOptions.style.marginTop = top + 33 + 'px';
				tabInfos.style.marginTop = top + 80 + 'px';
				bookCommands.style.top = top - 16 + 'px';
				bookNavBarBottom.style.marginTop = top - 15 + 'px';
			} else {
				h = window.innerHeight - 44 - 40; //navBarBottom height (1*44) + textContainer top * 2 (2*20)
				textContainer.style.top = '15px';
				tocLarge.style.marginTop = '15px';
				tabOptions.style.marginTop = '63px';
				tabInfos.style.marginTop = '111px';
				bookCommands.style.top = '15px';
				bookNavBarBottom.style.marginTop = '15px';
			}
			w = 550;
			fontSize = _localStore2.default.getFontSize('large') ? _localStore2.default.getFontSize('large') : 16;
			text.style.fontSize = fontSize + 'px';
			cover.style.fontSize = '16px';
			if (window.innerWidth < 1366) {
				for (var i = 0; i < fontSizesMedium.length; i++) {
					if (fontSizesMedium[i].value == fontSize) {
						fontSizesMedium[i].checked = true;
					}
				}
				for (var _i = 0; _i < fontsMedium.length; _i++) {
					if (fontsMedium[_i].value == font) {
						fontsMedium[_i].checked = true;
					}
				}
			} else {
				for (var _i2 = 0; _i2 < fontSizesLarge.length; _i2++) {
					if (fontSizesLarge[_i2].value == fontSize) {
						fontSizesLarge[_i2].checked = true;
					}
				}
				for (var _i3 = 0; _i3 < fontsLarge.length; _i3++) {
					if (fontsLarge[_i3].value == font) {
						fontsLarge[_i3].checked = true;
					}
				}
			}
		} else {
			_utils2.default.removeClass('[data-wb-text-container]', 'w3-card-2');
			h = window.innerHeight - 30; //30px = nav-bar-bottom-small height
			w = window.innerWidth;
			bookNavBarBottomSmall.style.width = w + 'px';
			fontSize = _localStore2.default.getFontSize('small') ? _localStore2.default.getFontSize('small') : 14;
			text.style.fontSize = fontSize + 'px';
			cover.style.fontSize = '14px';
			font;
			for (var _i4 = 0; _i4 < fontSizes.length; _i4++) {
				if (fontSizes[_i4].value == fontSize) {
					fontSizes[_i4].checked = true;
				}
			}
			for (var _i5 = 0; _i5 < fonts.length; _i5++) {
				if (fonts[_i5].value == font) {
					fonts[_i5].checked = true;
				}
			}
			textContainer.style.top = '0px';
		}

		//marginY is relative to line-height (line-height : 1.5em)
		lineHeight = fontSize * 1.5;
		marginY = h % lineHeight !== 0 ? lineHeight * 2 + h % lineHeight / 2 : lineHeight * 2;

		//marginX : smaller for very small devices
		if (window.innerWidth > 420) {
			marginX = 50;
		} else {
			marginX = 25;
		}

		//new Book
		var book = new _WebBook2.default(bookContainer, {
			height: h,
			maxWidth: w,
			marginY: marginY,
			marginX: marginX
		});

		if (_localStore2.default.getBkmrk(bk.id)) {
			book.goToBookmark(_localStore2.default.getBkmrk(bk.id));
		}

		if (window.innerWidth >= 1366) {
			//Toc-large height
			bookContainer.querySelector("#toc-large-device div").style.maxHeight = h + "px";
		}

		//on resize
		window.addEventListener('resize', function (event) {
			if (window.innerWidth >= 768) {
				_utils2.default.addClass('[data-wb-text-container]', 'w3-card-2');
				//max-height: 720
				if (window.innerHeight >= 832) {
					//748 + navBarBottom height (1*44) + textContainer minimum top * 2 (2*20)
					h = 748;
					top = (window.innerHeight - 748 - 44) / 2;
					textContainer.style.top = top - 15 + 'px';
					tocLarge.style.marginTop = top - 15 + 'px';
					tabOptions.style.marginTop = top + 33 + 'px';
					tabInfos.style.marginTop = top + 80 + 'px';
					bookCommands.style.top = top - 16 + 'px';
					bookNavBarBottom.style.marginTop = top - 15 + 'px';
				} else {
					h = window.innerHeight - 44 - 40; //navBars height *2 (2*44) + textContainer top * 2 (2*20)
					textContainer.style.top = '15px';
					tocLarge.style.marginTop = '15px';
					tabInfos.style.marginTop = '63px';
					tabInfos.style.marginTop = '111px';
					bookCommands.style.top = '15px';
					bookNavBarBottom.style.marginTop = '15px';
				}
				w = 550;
				fontSize = _localStore2.default.getFontSize('large') ? _localStore2.default.getFontSize('large') : 16;
				text.style.fontSize = fontSize + 'px';
				cover.style.fontSize = '16px';
				if (window.innerWidth < 1366) {
					for (var _i6 = 0; _i6 < fontSizesMedium.length; _i6++) {
						if (fontSizesMedium[_i6].value == fontSize) {
							fontSizesMedium[_i6].checked = true;
						}
					}
				} else {
					for (var _i7 = 0; _i7 < fontSizesLarge.length; _i7++) {
						if (fontSizesLarge[_i7].value == fontSize) {
							fontSizesLarge[_i7].checked = true;
						}
					}
				}
			} else {
				_utils2.default.removeClass('[data-wb-text-container]', 'w3-card-2');
				h = window.innerHeight - 30; //30px = nav-bar-bottom-small height
				w = window.innerWidth;
				bookNavBarBottomSmall.style.width = w + 'px';
				fontSize = _localStore2.default.getFontSize('small') ? _localStore2.default.getFontSize('small') : 14;
				text.style.fontSize = fontSize + 'px';
				cover.style.fontSize = '14px';
				for (var _i8 = 0; _i8 < fontSizes.length; _i8++) {
					if (fontSizes[_i8].value == fontSize) {
						fontSizes[_i8].checked = true;
					}
				}
				textContainer.style.top = '0px';
			}

			if (window.innerWidth >= 1366) {
				//Toc-large height
				bookContainer.querySelector("#toc-large-device div").style.maxHeight = h + "px";
			}

			//marginY is relative to line-height
			lineHeight = fontSize * 1.5;
			marginY = h % lineHeight !== 0 ? lineHeight * 2 + h % lineHeight / 2 : lineHeight * 2;

			//marginX : smaller for very small devices
			if (window.innerWidth > 420) {
				marginX = 50;
			} else {
				marginX = 25;
			}

			//set new dimensions
			book.setHeight(h);
			book.setMaxWidth(w);
			book.setMarginY(marginY);
			book.setMarginX(marginX);

			if (book.col === true) {
				book.toBook();
			}
		}, false);

		//SWIPE - forward, backward on swipe left and right (hammer.js)
		// small devices
		var swipeContainer = new _hammerjs2.default(bookContainer.querySelector('[data-wb-text-container]'));
		swipeContainer.on("swiperight swipeleft", function (event) {
			if (event.type === "swipeleft") {
				book.forward();
			} else if (event.type === "swiperight") {
				book.backward();
			}
		});

		//TOUCHES, forward, backward
		document.addEventListener('keydown', function (event) {
			if (event.which === 39) {
				book.forward();
			} else if (event.which === 37) {
				book.backward();
			} else if (event.which === 36) {
				book.toFirstPage();
			} else if (event.which === 35) {
				book.toLastPage();
			}
		}, false);

		//BUTTONS FORWARD/BACKWARD
		//large
		var forwardLarge = bookContainer.querySelector('#forward-large');
		var backwardLarge = bookContainer.querySelector('#backward-large');

		forwardLarge.addEventListener('click', function (event) {
			book.forward();
		}, false);

		backwardLarge.addEventListener('click', function (event) {
			book.backward();
		}, false);

		//TOC		
		var toc = bookContainer.querySelector('#toc');
		var openTocs = bookContainer.querySelectorAll('.open-toc');

		for (var _i9 = 0; _i9 < openTocs.length; _i9++) {
			openTocs[_i9].addEventListener('click', function (event) {
				toc.className = toc.className === 'open' ? '' : 'open';
			}, false);
		}

		toc.querySelector("#close-toc").addEventListener('click', function () {
			toc.className = '';
		}, false);

		//Close toc on click
		var tocLinks = toc.querySelectorAll('a');
		for (var _i10 = 0; _i10 < tocLinks.length; _i10++) {
			tocLinks[_i10].addEventListener('click', function () {
				toc.className = '';
			}, false);
		}

		//OPTIONS
		//small
		var optionsOpen = bookContainer.querySelector('#open-options');
		optionsOpen.addEventListener('click', function () {
			options.className = options.className === 'open' ? '' : 'open';
		});
		var optionsClose = bookContainer.querySelector('#close-options');
		optionsClose.addEventListener('click', function () {
			options.className = '';
		});
		//medium
		var optionsMediumOpen = bookContainer.querySelector('#open-options-medium');
		optionsMediumOpen.addEventListener('click', function () {
			optionsMedium.className = optionsMedium.className === 'open' ? '' : 'open';
		});
		var optionsCloseMedium = bookContainer.querySelector('#close-options-medium');
		optionsCloseMedium.addEventListener('click', function () {
			optionsMedium.className = '';
		});

		//TAB-CONTAINER
		var swingContainer = bookContainer.querySelector('#swing-container');
		var swingBar = bookContainer.querySelector('#swing-bar');
		var tabHome = bookContainer.querySelector('#tab-home-link');

		var toggleTocLarge = bookContainer.querySelector('#toggle-toc-large-device');
		var toggleTabOptions = bookContainer.querySelector('#toggle-tab-options');
		var toggleTabInfos = bookContainer.querySelector('#toggle-tab-infos');
		var closeTocLarge = bookContainer.querySelector('#close-toc-large-device');
		var closeTabOptions = bookContainer.querySelector('#close-tab-options');
		var closeTabInfos = bookContainer.querySelector('#close-tab-infos');
		//TOGGLE TOC-LARGE-DEVICE
		toggleTocLarge.addEventListener('click', function (event) {
			if (!tocLarge.className.match(/open/)) {
				if (tabInfos.className.match(/open/)) {
					tabInfos.style.zIndex = '0';
					tocLarge.style.zIndex = '1000';
					_utils2.default.removeClass('#tab-infos', 'open');
				} else if (tabOptions.className.match(/open/)) {
					tabOptions.style.zIndex = '0';
					tocLarge.style.zIndex = '1000';
					_utils2.default.removeClass('#tab-options', 'open');
				}
				_utils2.default.addClass('#toc-large-device', 'open');
				_utils2.default.addClass('#swing-container', 'left');
				_utils2.default.addClass('#swing-bar', 'left');
			} else {
				tocLarge.style.zIndex = '0';
				_utils2.default.removeClass('#toc-large-device', 'open');
				_utils2.default.removeClass('#swing-container', 'left');
				_utils2.default.removeClass('#swing-bar', 'left');
			}
		}, false);

		//CLOSE TOC-LARGE-DEVICE
		closeTocLarge.addEventListener('click', function (event) {
			_utils2.default.removeClass('#toc-large-device', 'open');
			_utils2.default.removeClass('#swing-container', 'left');
			_utils2.default.removeClass('#swing-bar', 'left');
			tocLarge.style.zIndex = '0';
		}, false);

		//TOGGLE TAB-OPTIONS
		toggleTabOptions.addEventListener('click', function (event) {
			if (!tabOptions.className.match(/open/)) {
				if (tocLarge.className.match(/open/)) {
					tocLarge.style.zIndex = '0';
					tabOptions.style.zIndex = '1000';
					_utils2.default.removeClass('#toc-large-device', 'open');
				} else if (tabInfos.className.match(/open/)) {
					tabInfos.style.zIndex = '0';
					tabOptions.style.zIndex = '1000';
					_utils2.default.removeClass('#tab-infos', 'open');
				}
				_utils2.default.addClass('#tab-options', 'open');
				_utils2.default.addClass('#swing-container', 'left');
				_utils2.default.addClass('#swing-bar', 'left');
			} else {
				tabOptions.style.zIndex = '0';
				_utils2.default.removeClass('#tab-options', 'open');
				_utils2.default.removeClass('#swing-container', 'left');
				_utils2.default.removeClass('#swing-bar', 'left');
			}
		}, false);

		//CLOSE TAB-INFOS
		closeTabOptions.addEventListener('click', function (event) {
			_utils2.default.removeClass('#tab-options', 'open');
			_utils2.default.removeClass('#swing-container', 'left');
			_utils2.default.removeClass('#swing-bar', 'left');
			tabOptions.style.zIndex = '0';
		}, false);

		//TOGGLE TAB-INFOS
		toggleTabInfos.addEventListener('click', function (event) {
			if (!tabInfos.className.match(/open/)) {
				if (tocLarge.className.match(/open/)) {
					tocLarge.style.zIndex = '0';
					tabInfos.style.zIndex = '1000';
					_utils2.default.removeClass('#toc-large-device', 'open');
				} else if (tabOptions.className.match(/open/)) {
					tabOptions.style.zIndex = '0';
					tabInfos.style.zIndex = '1000';
					_utils2.default.removeClass('#tab-options', 'open');
				}
				_utils2.default.addClass('#tab-infos', 'open');
				_utils2.default.addClass('#swing-container', 'left');
				_utils2.default.addClass('#swing-bar', 'left');
			} else {
				tabInfos.style.zIndex = '0';
				_utils2.default.removeClass('#tab-infos', 'open');
				_utils2.default.removeClass('#swing-container', 'left');
				_utils2.default.removeClass('#swing-bar', 'left');
			}
		}, false);

		//CLOSE TAB-INFOS
		closeTabInfos.addEventListener('click', function (event) {
			_utils2.default.removeClass('#tab-infos', 'open');
			_utils2.default.removeClass('#swing-container', 'left');
			_utils2.default.removeClass('#swing-bar', 'left');
			tabInfos.style.zIndex = '0';
		}, false);

		//HOME
		var homeLinks = bookContainer.querySelectorAll('.home');
		for (var _i11 = 0; _i11 < homeLinks.length; _i11++) {
			homeLinks[_i11].addEventListener('click', function (event) {
				event.preventDefault();
				var prevLocation = _dataStore2.default.getData('location').prevLocation;
				location.hash = prevLocation ? prevLocation : '#/';
			}, false);
		}

		//BOOKMARK
		var addBookmarks = bookContainer.querySelectorAll('.add-bookmark');
		for (var _i12 = 0; _i12 < addBookmarks.length; _i12++) {
			addBookmarks[_i12].addEventListener('click', function (event) {
				if (book.checkFirstPage()) {
					return;
				}
				var newBmrk = book.getBookmark();
				var bookmark = document.querySelector('#bookmark');
				var p = bookmark.querySelector('p');
				var msg = void 0;
				if (_localStore2.default.getBkmrk(bk.id)) {
					var oldBkmrk = _localStore2.default.getBkmrk(bk.id);
					if (oldBkmrk.sectionId === newBmrk.sectionId && oldBkmrk.el === newBmrk.el) {
						msg = 'Votre signet a bien été inséré.';
					} else {
						msg = 'Votre signet a bien été déplacé.';
					}
				} else {
					msg = 'Un signet a été ajouté.';
				}
				p.innerHTML = msg;
				_localStore2.default.setBkmrk(bk.id, newBmrk);
				bookmark.className = 'show';
				setTimeout(function () {
					bookmark.className = bookmark.className.replace("show", "");
				}, 2500);
			}, false);
		}

		//FONT-SIZE
		//large
		for (var _i13 = 0; _i13 < fontSizesLarge.length; _i13++) {
			fontSizesLarge[_i13].addEventListener('click', function (event) {
				var size = event.target.value;
				_localStore2.default.setFontSize('large', size);
				//text opacity = 0
				text.style.opacity = '0';
				bookContainer.querySelector('#current-section-title').style.opacity = '0';
				bookContainer.querySelector('#currentByTotal').style.opacity = '0';
				_utils2.default.removeClass('#text-loader-container', 'hidden');
				setTimeout(function () {
					//marginY is relative to line-height (line-height : 1.5em)
					var lineHeight = size * 1.5;
					var marginY = h % lineHeight !== 0 ? lineHeight * 2 + h % lineHeight / 2 : lineHeight * 2;
					book.setMarginY(marginY);
					//text size
					text.style.fontSize = size + 'px';
					cover.style.fontSize = '16px';
					//book
					book.toBook();
					//end loader
					setTimeout(function () {
						_utils2.default.addClass('#text-loader-container', 'hidden');
						text.style.opacity = '1';
						bookContainer.querySelector('#current-section-title').style.opacity = '1';
						bookContainer.querySelector('#currentByTotal').style.opacity = '1';
					}, 200);
				}, 100);
			}, false);
		}

		//medium
		for (var _i14 = 0; _i14 < fontSizesMedium.length; _i14++) {
			fontSizesMedium[_i14].addEventListener('click', function (event) {
				var size = event.target.value;
				_localStore2.default.setFontSize('large', size);
				setTimeout(function () {
					optionsMedium.className = '';
					//close modal && text opacity = 0
					text.style.opacity = '0';
					bookContainer.querySelector('#current-section-title').style.opacity = '0';
					bookContainer.querySelector('#currentByTotal').style.opacity = '0';
					_utils2.default.removeClass('#text-loader-container', 'hidden');
					setTimeout(function () {
						//marginY is relative to line-height (line-height : 1.5em)
						var lineHeight = size * 1.5;
						var marginY = h % lineHeight !== 0 ? lineHeight * 2 + h % lineHeight / 2 : lineHeight * 2;
						book.setMarginY(marginY);
						//text size
						text.style.fontSize = size + 'px';
						cover.style.fontSize = '16px';
						//book
						book.toBook();
						//end loader
						setTimeout(function () {
							_utils2.default.addClass('#text-loader-container', 'hidden');
							text.style.opacity = '1';
							bookContainer.querySelector('#current-section-title').style.opacity = '1';
							bookContainer.querySelector('#currentByTotal').style.opacity = '1';
						}, 200);
					}, 150);
				}, 100);
			}, false);
		}

		//small
		for (var _i15 = 0; _i15 < fontSizes.length; _i15++) {
			fontSizes[_i15].addEventListener('click', function (event) {
				var size = event.target.value;
				_localStore2.default.setFontSize('small', size);
				setTimeout(function () {
					//start loader and colose modal
					_utils2.default.removeClass('#text-loader-container', 'hidden');
					_utils2.default.removeClass('#options', 'open');
					document.body.style.overflow = 'hidden';
					setTimeout(function () {
						//marginY is relative to line-height (line-height : 1.5em)
						var lineHeight = size * 1.5;
						var marginY = h % lineHeight !== 0 ? lineHeight * 2 + h % lineHeight / 2 : lineHeight * 2;
						book.setMarginY(marginY);
						//text size
						text.style.fontSize = size + 'px';
						cover.style.fontSize = '14px';
						//book
						book.toBook();
						//end loader
						setTimeout(function () {
							document.body.style.overflow = 'visible';
							_utils2.default.addClass('#text-loader-container', 'hidden');
						}, 200);
					}, 300);
				}, 100);
			}, false);
		}

		//FONT-FAMILY
		//large
		for (var _i16 = 0; _i16 < fontsLarge.length; _i16++) {
			fontsLarge[_i16].addEventListener('click', function (event) {
				var font = event.target.value;
				_localStore2.default.setFont(font);
				//text opacity = 0
				text.style.opacity = '0';
				bookContainer.querySelector('#current-section-title').style.opacity = '0';
				bookContainer.querySelector('#currentByTotal').style.opacity = '0';
				_utils2.default.removeClass('#text-loader-container', 'hidden');
				setTimeout(function () {
					//text font
					text.style.fontFamily = font;
					bookContainer.querySelector('#current-section-title').style.fontFamily = font;
					bookContainer.querySelector('#currentByTotal').style.fontFamily = font;
					//book
					book.toBook();
					//end loader
					setTimeout(function () {
						_utils2.default.addClass('#text-loader-container', 'hidden');
						text.style.opacity = '1';
						bookContainer.querySelector('#current-section-title').style.opacity = '1';
						bookContainer.querySelector('#currentByTotal').style.opacity = '1';
					}, 200);
				}, 100);
			}, false);
		}

		//medium
		for (var _i17 = 0; _i17 < fontsMedium.length; _i17++) {
			fontsMedium[_i17].addEventListener('click', function (event) {
				var font = event.target.value;
				_localStore2.default.setFont(font);
				setTimeout(function () {
					optionsMedium.className = '';
					//close modal && text opacity = 0
					text.style.opacity = '0';
					bookContainer.querySelector('#current-section-title').style.opacity = '0';
					bookContainer.querySelector('#currentByTotal').style.opacity = '0';
					_utils2.default.removeClass('#text-loader-container', 'hidden');
					setTimeout(function () {
						//text font
						text.style.fontFamily = font;
						bookContainer.querySelector('#current-section-title').style.fontFamily = font;
						bookContainer.querySelector('#currentByTotal').style.fontFamily = font;
						//book
						book.toBook();
						//end loader
						setTimeout(function () {
							_utils2.default.addClass('#text-loader-container', 'hidden');
							text.style.opacity = '1';
							bookContainer.querySelector('#current-section-title').style.opacity = '1';
							bookContainer.querySelector('#currentByTotal').style.opacity = '1';
						}, 200);
					}, 150);
				}, 100);
			}, false);
		}

		//small
		for (var _i18 = 0; _i18 < fonts.length; _i18++) {
			fonts[_i18].addEventListener('click', function (event) {
				var font = event.target.value;
				_localStore2.default.setFont(font);
				setTimeout(function () {
					//start loader and close modal
					_utils2.default.removeClass('#text-loader-container', 'hidden');
					_utils2.default.removeClass('#options', 'open');
					document.body.style.overflow = 'hidden';
					setTimeout(function () {
						//text font
						text.style.fontFamily = font;
						bookContainer.querySelector('#current-section-title').style.fontFamily = font;
						bookContainer.querySelector('#currentByTotal').style.fontFamily = font;
						//book
						book.toBook();
						//end loader
						setTimeout(function () {
							document.body.style.overflow = 'visible';
							_utils2.default.addClass('#text-loader-container', 'hidden');
						}, 200);
					}, 300);
				}, 100);
			}, false);
		}

		//end loader
		document.body.style.overflow = 'visible';
		setTimeout(function () {
			_utils2.default.addClass('#book-loader-container', 'hidden');
		}, 800);

		//show book
		setTimeout(function () {
			bookContainer.className = 'show';
		}, 800);
	};

	//GET BOOK
	var bks = _dataStore2.default.getData('books');
	var bk = void 0;
	var loc = location.hash.replace(/(#|\/read)/g, '');
	var title = '';
	for (var i = 0; i < bks.length; i++) {
		title = bks[i].path.replace(/^\/books\/[^\/]+/, '');
		if (title === loc) {
			bk = bks[i];
			break;
		}
	}

	//GET TEMPLATE ET START LOADER
	//insert template in container
	document.body.style.height = window.innerHeight + 'px';
	document.body.style.overflow = 'hidden';
	c.innerHTML = bookReadTemplate({ book: bk });
	//START LOADER
	_utils2.default.removeClass('#book-loader-container', 'hidden');

	//BOOK CONTAINER
	var bookContainer = document.querySelector('#bookContainer');

	//GET TEXT CONTENT
	var text = bookContainer.querySelector('[data-wb-text]');
	var options = { method: 'GET', url: bk.path + '.css' };
	_utils2.default.ajax(options).then(function (content) {
		var head = document.querySelector('head');
		if (_dataStore2.default.getData('book')) {
			head.lastChild.innerHTML = content;
		} else {
			var style = document.createElement('style');
			style.setAttribute('type', 'text/css');
			style.innerHTML = content;
			head.appendChild(style);
		}
		_dataStore2.default.setData('book', bk.id);
		options = { method: 'GET', url: bk.path + '.html' };
		return _utils2.default.ajax(options);
	}).then(function (content) {
		var div = document.createElement('div');
		div.innerHTML = content;
		text.appendChild(div);
		init();
	});
};

exports.default = book;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//localStore.js
var localStore = {

	setBkmrk: function setBkmrk(bkId, bkmrk) {
		var bkmrks = [];
		if (typeof Storage !== "undefined") {
			//check localStorage for bkmrks array
			if (localStorage.getItem('bkmrks')) {
				bkmrks = JSON.parse(localStorage.getItem('bkmrks'));
				//check for bk.id
				var item = void 0;
				for (var i = 0; i < bkmrks.length; i++) {
					if (bkmrks[i].bkId === bkId) {
						item = bkmrks[i];
						break;
					}
				}
				if (item) {
					item.bkmrk = bkmrk;
				} else {
					bkmrks.push({ bkId: bkId, bkmrk: bkmrk });
				}
			} else {
				bkmrks.push({ bkId: bkId, bkmrk: bkmrk });
			}
			localStorage.setItem('bkmrks', JSON.stringify(bkmrks));
		}
	},

	getBkmrk: function getBkmrk(bkId) {
		var bkmrks = [];
		if (typeof Storage !== "undefined") {
			//check localStorage for bkmrks array
			if (localStorage.getItem('bkmrks')) {
				bkmrks = JSON.parse(localStorage.getItem('bkmrks'));
				//check for bk.id
				var item = bkmrks.filter(function (o) {
					return o.bkId === bkId;
				})[0];
				if (item) {
					return item.bkmrk;
				}
			}
		}
	},

	setFontSize: function setFontSize(device, size) {
		var fSizes = [];
		if (typeof Storage !== "undefined") {
			//check localStorage for fSizes array
			if (localStorage.getItem('fSizes')) {
				fSizes = JSON.parse(localStorage.getItem('fSizes'));
				//check for bk.id
				var item = void 0;
				for (var i = 0; i < fSizes.length; i++) {
					if (fSizes[i].device === device) {
						item = fSizes[i];
						break;
					}
				}
				if (item) {
					item.size = size;
				} else {
					fSizes.push({ device: device, size: size });
				}
			} else {
				fSizes.push({ device: device, size: size });
			}
			localStorage.setItem('fSizes', JSON.stringify(fSizes));
		}
	},

	getFontSize: function getFontSize(device) {
		var fSizes = [];
		if (typeof Storage !== "undefined") {
			//check localStorage for bkmrks array
			if (localStorage.getItem('fSizes')) {
				fSizes = JSON.parse(localStorage.getItem('fSizes'));
				//check for bk.id
				var item = fSizes.filter(function (o) {
					return o.device === device;
				})[0];
				if (item) {
					return item.size;
				}
			}
		}
	},

	setFont: function setFont(f) {
		var font = '';
		if (typeof Storage !== "undefined") {
			//check localStorage for fSizes array
			if (localStorage.getItem('font')) {
				font = JSON.parse(localStorage.getItem('font'));
				font = f;
			} else {
				font = f;
			}
			localStorage.setItem('font', JSON.stringify(font));
		}
	},

	getFont: function getFont() {
		var font = '';
		if (typeof Storage !== "undefined") {
			//check localStorage for bkmrks array
			if (localStorage.getItem('font')) {
				font = JSON.parse(localStorage.getItem('font'));
				return font;
			}
		}
	}
};

exports.default = localStore;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(1);

var _core2 = _interopRequireDefault(_core);

__webpack_require__(49);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebBook = function () {
	function WebBook(bookContainer, options) {
		_classCallCheck(this, WebBook);

		//containers
		this._bookContainer = bookContainer;
		this._textContainer = bookContainer.querySelector('[data-wb-text-container]');
		this._text = bookContainer.querySelector('[data-wb-text]');
		//options
		this._height = options.height;
		this._width = options.maxWidth;
		this._marginX = options.marginX === undefined ? 35 : options.marginX;
		this._marginY = options.marginY === undefined ? 20 : options.marginY;
		//init position, col ,containerWidth and bookmark
		this._position = 0;
		this.col = true; //default true = toBook()
		this._bookmark = 0;
		this._containerWidth = null;
		//this.lastBreak is used as a ghost page
		this._lastBreak = document.createElement('DIV');
		this._lastBreak.className = 'wb-text-break';
		this._text.appendChild(this._lastBreak);
		//this._lastElement is used as landmark
		this._lastElement = document.createElement('DIV');
		this._lastElement.className = 'wb-section wb-no-toc';
		this._lastElement.id = 'last';
		var p = document.createElement('P');
		p.innerHTML = '&nbsp;'; //not empty (for mozColumns)
		this._lastElement.appendChild(p);
		this._text.appendChild(this._lastElement);
		//sections
		this._sections = this._text.querySelectorAll('.wb-section');
		//sections without wb-no-toc
		this._tocSections = [];
		for (var i = 0; i < this._sections.length; i++) {
			if (!this._sections[i].className.match(/wb-no-toc/)) {
				this._tocSections.push(this._sections[i]);
			}
		}
		//breaks
		this._breaks = this._text.querySelectorAll('.wb-text-break');

		//toc
		this._tocs = this._bookContainer.querySelectorAll('[data-wb-toc]');
		//getTocs before querying this.elPageNumbers
		this.getTocs();
		//infos containers
		this._currentPages = this._bookContainer.querySelectorAll('.wb-current-page');
		this._totalPages = this._bookContainer.querySelectorAll('.wb-total-pages');
		this._currentTotalPages = this._bookContainer.querySelectorAll('.wb-currentByTotal-pages');
		this._elPageNumbers = this._bookContainer.querySelectorAll('[data-wb-element-page-number]');
		this._sectionTitles = this._bookContainer.querySelectorAll('.wb-current-section-title');
		//start pagination
		this._startPage = 0;
		//links : replace default with goToPage
		this.setLinks();

		if ('webkitColumnWidth' in document.body.style || 'mozColumnWidth' in document.body.style || 'columnWidth' in document.body.style) {
			this.toBook();
		} else {
			this.toScroll();
		}
	}

	_createClass(WebBook, [{
		key: 'toBook',
		value: function toBook() {
			if ('webkitColumnWidth' in document.body.style || 'mozColumnWidth' in document.body.style || 'columnWidth' in document.body.style) {

				var cs = this._textContainer.style;
				var ts = this._text.style;
				if (ts.webkitColumns !== 'auto auto' || ts.mozColumns !== 'auto auto' || ts.columns !== 'auto auto') {
					ts.webkitColumns = 'auto auto';
					ts.mozColumns = 'auto auto';
					ts.columns = 'auto auto';
				}

				this.col = true;

				//text-container
				cs.boxSizing = "border-box";
				cs.webkitBoxSizing = "border-box";
				cs.overflow = "hidden";
				cs.position = "relative";
				cs.padding = "0px";
				cs.height = this.getHeight() + "px";
				cs.maxWidth = this.getMaxWidth() + "px"; //maxWidth : responsive
				this._containerWidth = this._textContainer.clientWidth; //responsive

				//sections
				//hack firefox (pour offsetLeft) : minHeight = 10%
				for (var i = 0; i < this._sections.length; i++) {
					if (this._sections[i].style.minHeight !== "10%") {
						this._sections[i].style.minHeight = "10%";
					}
				}
				//manual breaks
				for (var _i = 0; _i < this._breaks.length; _i++) {
					if (this._breaks[_i].style.marginBottom !== "300%") {
						this._breaks[_i].style.marginBottom = "300%";
						this._breaks[_i].style.width = "0px";
					}
				}
				//last element
				if (this._lastElement.style.marginBottom !== "300%") {
					this._lastElement.style.marginBottom = "300%";
				}

				//text
				ts.boxSizing = "border-box";
				ts.webkitBoxSizing = "border-box";
				ts.position = "absolute";
				ts.left = 0;
				ts.top = 0;
				ts.height = "100%";
				ts.width = "100%";
				ts.paddingRight = this.getMarginX() + "px";
				ts.paddingLeft = this.getMarginX() + "px";
				ts.paddingTop = this.getMarginY() + "px";
				ts.paddingBottom = this.getMarginY() + "px";
				ts.mozColumnFill = "auto"; //important !!!
				ts.columnFill = "auto"; //important !!!		
				ts.webkitColumnWidth = this._containerWidth + "px";
				ts.mozColumnWidth = this._containerWidth + "px";
				ts.columnWidth = this._containerWidth + "px";
				ts.mozColumnGap = this.getMarginX() * 2 + "px";
				ts.webkitColumnGap = this.getMarginX() * 2 + "px";
				ts.columnGap = this.getMarginX() * 2 + "px";

				//getPageStart
				this.getPageStart();
				//info containers wb-total-pages
				for (var _i2 = 0; _i2 < this._totalPages.length; _i2++) {
					if (this._totalPages[_i2].innerHTML !== this.getTotalPages()) {
						this._totalPages[_i2].innerHTML = this.getTotalPages();
					}
				}
				//containers data-wb-element-page-number
				for (var _i3 = 0; _i3 < this._elPageNumbers.length; _i3++) {
					var id = this._elPageNumbers[_i3].getAttribute('data-wb-element-page-number');
					var pageNumber = this.elementPageNumber(id);
					if (pageNumber < 1) {
						this._elPageNumbers[_i3].innerHTML = "";
					} else if (this._elPageNumbers[_i3].innerHTML != pageNumber) {
						this._elPageNumbers[_i3].innerHTML = pageNumber;
					}
				}

				//Go to bookmark
				if (this._bookmark) {
					this.goToBookmark(this._bookmark);
					this._position = Math.round((0, _core2.default)(this._text).position().left);
				}

				//Refresh info containers
				this.refresh();
			}
		}
	}, {
		key: 'toScroll',
		value: function toScroll() {
			'use strict';

			this.col = false;
			var cs = this._textContainer.style;
			var ts = this._text.style;
			//container
			cs.height = "auto";
			cs.maxWidth = this.getMaxWidth() + "px";
			cs.overflow = "visible";
			//text
			ts.position = "static";
			ts.height = "auto";
			cs.paddingRight = this.getMarginX() + "px";
			cs.paddingLeft = this.getMarginX() + "px";
			cs.paddingTop = this.getMarginY() + "px";
			cs.paddingBottom = this.getMarginY() + "px";

			if ('webkitColumnWidth' in document.body.style || 'mozColumnWidth' in document.body.style || 'columnWidth' in document.body.style) {
				ts.webkitColumns = "auto auto";
				ts.mozColumns = "auto auto";
				ts.columns = "auto auto";
			}

			//Sections (for mozColumns)
			for (var i = 0; i < this._sections.length; i++) {
				this._sections[i].style.minHeight = "0";
			}
			//manual breaks
			for (var _i4 = 0; _i4 < this._breaks.length; _i4++) {
				this._breaks[_i4].style.marginBottom = "0";
			}
			//last element
			this._lastElement.style.marginBottom = "0px";

			//wb-total-pages empty
			for (var _i5 = 0; _i5 < this._totalPages.length; _i5++) {
				this._totalPages[_i5].innerHTML = "";
			}
			//data-wb-element-page-number empty
			for (var _i6 = 0; _i6 < this._elPageNumbers.length; _i6++) {
				this._elPageNumbers[_i6].innerHTML = "";
			}

			this.refresh();
		}
	}, {
		key: 'setMaxWidth',
		value: function setMaxWidth(w) {
			this._width = w;
			return this;
		}
	}, {
		key: 'getMaxWidth',
		value: function getMaxWidth() {
			return this._width;
		}
	}, {
		key: 'setHeight',
		value: function setHeight(h) {
			this._height = h;
			return this;
		}
	}, {
		key: 'getHeight',
		value: function getHeight() {
			return this._height;
		}
	}, {
		key: 'setMarginX',
		value: function setMarginX(m) {
			this._marginX = m;
			return this;
		}
	}, {
		key: 'getMarginX',
		value: function getMarginX() {
			return this._marginX;
		}
	}, {
		key: 'setMarginY',
		value: function setMarginY(m) {
			this._marginY = m;
			return this;
		}
	}, {
		key: 'getMarginY',
		value: function getMarginY() {
			return this._marginY;
		}
	}, {
		key: 'setLinks',
		value: function setLinks() {
			var _this2 = this;

			var links = this._bookContainer.querySelectorAll('.wb-link');
			for (var i = 0; i < links.length; i++) {
				links[i].addEventListener('click', function (e) {
					if (_this2.col === true) {
						e.preventDefault();
						var href = e.currentTarget.getAttribute('href');
						var id = href.replace(/^#/, "");
						_this2.goToPage(_this2.elementPageNumber(id));
					}
				}, false);
			}
		}
	}, {
		key: 'forward',
		value: function forward() {
			if (Math.round((0, _core2.default)(this._lastElement).position().left) + this._position > this._containerWidth + this.getMarginX()) {
				this._position = Math.round((0, _core2.default)(this._text).position().left);
				this._position -= this._containerWidth;
				this._text.style.left = this._position + "px";
				this.refresh();
			}
		}
	}, {
		key: 'backward',
		value: function backward() {
			if (this._position < 0) {
				this._position = Math.round((0, _core2.default)(this._text).position().left);
				this._position += this._containerWidth;
				this._text.style.left = this._position + "px";
				this.refresh();
			}
		}
	}, {
		key: 'toFirstPage',
		value: function toFirstPage() {
			if (this._position < 0) {
				this._position = 0;
				this._text.style.left = this._position + "px";
				this.refresh();
			}
		}
	}, {
		key: 'toLastPage',
		value: function toLastPage() {
			if (Math.round((0, _core2.default)(this._lastElement).position().left) + this._position > this._containerWidth + this.getMarginX()) {
				this._position = this._containerWidth + this.getMarginX() - Math.round((0, _core2.default)(this._lastElement).position().left);
				this._text.style.left = this._position + "px";
				this.refresh();
			}
		}
	}, {
		key: 'getPageStart',
		value: function getPageStart() {
			var index = void 0,
			    startIndex = void 0;
			for (var i = 0; i < this._sections.length; i++) {
				if (this._sections[i].className.match(/wb-no-page/)) {
					index = i;
				} else {
					if (index !== undefined && startIndex === undefined) {
						startIndex = i;
						var id = this._sections[startIndex].id;
						var el = this._text.querySelector('#' + id + ' p:first-child');
						var elPosition = Math.round((0, _core2.default)(el).position().left) - this.getMarginX();
						elPosition = elPosition % this._containerWidth !== 0 ? elPosition - elPosition % this._containerWidth : elPosition; //always at a page beginning
						this._startPage = elPosition / this._containerWidth;
					}
				}
			}
		}
	}, {
		key: 'checkFirstPage',
		value: function checkFirstPage() {
			var check = this._position === 0 ? true : false;
			return check;
		}
	}, {
		key: 'getPageNumber',
		value: function getPageNumber() {
			//this._position/this._containerWidth is start of a page : start 0 is page 1,... (so : +1)
			var pageNumber = Math.abs(Math.floor(this._position / this._containerWidth)) + 1;
			//this._startPage (pagination start)
			pageNumber = pageNumber - this._startPage;
			return pageNumber;
		}
	}, {
		key: 'getTotalPages',
		value: function getTotalPages() {
			var totalPages = Math.floor(Math.round((0, _core2.default)(this._lastElement).position().left) / this._containerWidth);
			totalPages = totalPages - this._startPage;
			return totalPages;
		}
	}, {
		key: 'goToPage',
		value: function goToPage(number) {
			number = number < 1 - this._startPage ? 1 - this._startPage : number;
			number = number > this.getTotalPages() ? this.getTotalPages() : number;
			number = number + this._startPage;
			var position = this._containerWidth * (number - 1);
			this._text.style.left = -position + "px";
			this._position = Math.round((0, _core2.default)(this._text).position().left);
			this.refresh();
		}
	}, {
		key: 'elementPageNumber',
		value: function elementPageNumber(id) {
			var el = void 0;
			if (this._text.querySelector('#' + id).className.match(/wb-section/)) {
				el = this._text.querySelector('#' + id + ' p:first-child');
			} else {
				el = this._text.querySelector('#' + id);
			}
			var elPosition = Math.round((0, _core2.default)(el).position().left) - this.getMarginX();
			elPosition = elPosition % this._containerWidth !== 0 ? elPosition - elPosition % this._containerWidth : elPosition; //always at a page beginning
			var elPageNumber = elPosition / this._containerWidth + 1; //elPosition/this._containerWidth is position of a page : position 0 is page 1,...
			elPageNumber = elPageNumber - this._startPage;
			return elPageNumber;
		}
	}, {
		key: 'getSectionTitle',
		value: function getSectionTitle() {
			var position = -this._position;
			var title = void 0;
			for (var i = 0; i < this._sections.length; i++) {
				var id = this._sections[i].id;
				if (this.getPageNumber() < this.elementPageNumber(id)) {
					var prevSectionId = this._sections[i - 1].id;
					if (this.getPageNumber() === this.elementPageNumber(prevSectionId)) {
						//title from second page of section (= not with section-title)
						title = "";
					} else {
						title = this._sections[i - 1].getAttribute('data-wb-title') ? this._sections[i - 1].getAttribute('data-wb-title') : this._sections[i - 1].title;
					}
					break;
				}
			}
			return title;
		}
	}, {
		key: 'getTocs',
		value: function getTocs() {
			if (this._tocs.length === 0) {
				return;
			}

			var toc = this._tocs[0];
			if (toc.getAttribute('data-wb-toc')) {
				var tocTitle = document.createElement('p');
				tocTitle.setAttribute('class', 'wb-toc-title');
				tocTitle.innerHTML = toc.getAttribute('data-wb-toc');
				toc.appendChild(tocTitle);
			}
			var content = document.createElement('div');
			var list = document.createElement('ul');
			list.setAttribute('class', 'wb-toc-list');
			for (var i = 0; i < this._sections.length; i++) {
				var section = this._sections[i];
				if (!section.className.match(/wb-no-toc/)) {
					var item = document.createElement('li');
					item.setAttribute('class', 'wb-toc-item');
					if (!section.className.match(/wb-toc-no-page-number/)) {
						var link = document.createElement('a');
						link.setAttribute('href', '#' + section.id);
						link.setAttribute('class', 'wb-link');
						item.appendChild(link);
						var title = document.createElement('span');
						title.setAttribute('class', 'wb-toc-item-title');
						title.innerHTML = section.getAttribute('data-wb-title-toc') ? section.getAttribute('data-wb-title-toc') : section.title;
						link.appendChild(title);
						var page = document.createElement('span');
						page.setAttribute('class', 'wb-toc-item-page-number');
						page.setAttribute('data-wb-element-page-number', section.id);
						link.appendChild(page);
					} else {
						var _title = document.createElement('span');
						_title.setAttribute('class', 'wb-toc-item-title');
						_title.innerHTML = section.getAttribute('data-wb-title-toc') ? section.getAttribute('data-wb-title-toc') : section.title;
						item.appendChild(_title);
					}
					list.appendChild(item);
				}
			}
			content.appendChild(list);
			toc.appendChild(content);

			if (this._tocs[1]) {
				for (var j = 1; j < this._tocs.length; j++) {
					if (this._tocs[j].getAttribute('data-wb-toc')) {
						var _tocTitle = document.createElement('p');
						_tocTitle.setAttribute('class', 'wb-toc-title');
						_tocTitle.innerHTML = this._tocs[j].getAttribute('data-wb-toc');
						this._tocs[j].appendChild(_tocTitle);
					}
					var clonedContent = content.cloneNode(true);
					this._tocs[j].appendChild(clonedContent);
				}
			}
		}
	}, {
		key: 'getTocsCurrentSection',
		value: function getTocsCurrentSection() {
			var sections = [].slice.call(this._sections);
			var _this = this;
			var doneSections = sections.filter(function (section) {
				return _this.elementPageNumber(section.id) <= _this.getPageNumber();
			});
			var currentSection = doneSections[doneSections.length - 1];
			if (currentSection) {
				for (var i = 0; i < this._tocs.length; i++) {
					var toc = this._tocs[i];
					var links = [].slice.call(toc.querySelectorAll('a'));
					var link = links.filter(function (l) {
						return l.getAttribute('href').replace(/^#/, '') === currentSection.id;
					});
					var currentLink = links.filter(function (l) {
						return l.parentElement.className.match(/current/);
					});
					if (!currentLink[0]) {
						if (link[0]) {
							link[0].parentElement.className += ' current';
						}
					} else if (currentLink[0] && currentLink[0] !== link[0]) {
						currentLink[0].parentElement.className = currentLink[0].parentElement.className.replace(/ current/, '');
						if (link[0]) {
							link[0].parentElement.className += ' current';
						}
					}
				}
			}
		}
	}, {
		key: 'insertBookmark',
		value: function insertBookmark() {
			//get current section
			var sections = [].slice.call(this._sections);
			var _this = this;
			var doneSections = sections.filter(function (section) {
				return _this.elementPageNumber(section.id) <= _this.getPageNumber();
			});
			var currentSection = doneSections[doneSections.length - 1];
			if (currentSection) {
				var elements = document.querySelectorAll('#' + currentSection.id + ' *');
				var position = Math.abs(this._position);
				var elPosition = void 0;
				for (var i = 0; i < elements.length; i++) {
					var _elPosition = Math.round((0, _core2.default)(elements[i]).position().left) - this.getMarginX();
					_elPosition = _elPosition % this._containerWidth !== 0 ? _elPosition - _elPosition % this._containerWidth : _elPosition; //always at a page beginning
					if (_elPosition === position) {
						if (currentSection.id === 'last') {
							this._bookmark = { sectionId: sections[0].id, el: 0 };
							break;
						}
						this._bookmark = { sectionId: currentSection.id, el: i };
						break;
					} else if (_elPosition > position) {
						this._bookmark = { sectionId: currentSection.id, el: i - 1 };
						break;
					}
				}
			}
		}
	}, {
		key: 'goToBookmark',
		value: function goToBookmark(bookmark) {
			var els = this._text.querySelectorAll('#' + bookmark.sectionId + ' *');
			var el = els[bookmark.el];
			//position : offsetLeft of element relative to text
			var position = Math.round((0, _core2.default)(el).position().left) - this.getMarginX();
			position = position % this._containerWidth !== 0 ? position - position % this._containerWidth : position; //always at a page beginning
			//text position = -position
			this._text.style.left = -position + "px";
			this._position = Math.round((0, _core2.default)(this._text).position().left);
			this.refresh();
		}
	}, {
		key: 'getBookmark',
		value: function getBookmark() {
			return this._bookmark;
		}
	}, {
		key: 'setBookmark',
		value: function setBookmark(bookmark) {
			this._bookmark = bookmark;
		}
	}, {
		key: 'refresh',
		value: function refresh() {
			this.insertBookmark();

			if (this.col === false) {

				for (var i = 0; i < this._currentPages.length; i++) {
					this._currentPages[i].innerHTML = "";
				}

				for (var _i7 = 0; _i7 < this._currentTotalPages.length; _i7++) {
					this._currentTotalPages[_i7].innerHTML = "";
				}

				for (var _i8 = 0; _i8 < this._sectionTitles.length; _i8++) {
					this._sectionTitles[_i8].innerHTML = "";
				}
			} else {

				if (this._tocs.length !== 0) {
					this.getTocsCurrentSection();
				}
				//containers wb-current-page
				for (var _i9 = 0; _i9 < this._currentPages.length; _i9++) {
					if (this.getPageNumber() < 1) {
						this._currentPages[_i9].innerHTML = "";
					} else if (this._currentPages[_i9].innerHTML !== this.getPageNumber()) {
						this._currentPages[_i9].innerHTML = this.getPageNumber();
					}
				}
				//containers wbcurrentByTotal-pages
				for (var _i10 = 0; _i10 < this._currentTotalPages.length; _i10++) {
					if (this.getPageNumber() < 1) {
						this._currentTotalPages[_i10].innerHTML = "";
					} else if (this._currentTotalPages[_i10].innerHTML !== this.getPageNumber() + "/" + this.getTotalPages()) {
						this._currentTotalPages[_i10].innerHTML = this.getPageNumber() + "/" + this.getTotalPages();
					}
				}
				//containers wb-current-section-title
				for (var _i11 = 0; _i11 < this._sectionTitles.length; _i11++) {
					if (this._sectionTitles[_i11].innerHTML != this.getSectionTitle()) {
						this._sectionTitles[_i11].innerHTML = this.getSectionTitle();
					}
				}
			}
		}
	}]);

	return WebBook;
}();

exports.default = WebBook;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	"use strict";

	return Object.getPrototypeOf;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (arr) {
	"use strict";

	return arr.concat;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (arr) {
	"use strict";

	return arr.push;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function (class2type) {
	"use strict";

	return class2type.toString;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function (fnToString) {
	"use strict";

	return fnToString.call(Object);
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (document) {
	"use strict";

	function DOMEval(code, doc) {
		doc = doc || document;

		var script = doc.createElement("script");

		script.text = code;
		doc.head.appendChild(script).parentNode.removeChild(script);
	}

	return DOMEval;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(17), __webpack_require__(3), __webpack_require__(18), __webpack_require__(9), __webpack_require__(19), __webpack_require__(24), __webpack_require__(11), __webpack_require__(52), __webpack_require__(22), __webpack_require__(56), __webpack_require__(7) // contains
], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, access, document, documentElement, rnumnonpx, curCSS, addGetHookIf, support, nodeName) {

	"use strict";

	jQuery.offset = {
		setOffset: function setOffset(elem, options, i) {
			var curPosition,
			    curLeft,
			    curCSSTop,
			    curTop,
			    curOffset,
			    curCSSLeft,
			    calculatePosition,
			    position = jQuery.css(elem, "position"),
			    curElem = jQuery(elem),
			    props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options)) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = options.top - curOffset.top + curTop;
			}
			if (options.left != null) {
				props.left = options.left - curOffset.left + curLeft;
			}

			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({
		offset: function offset(options) {

			// Preserve chaining for setter
			if (arguments.length) {
				return options === undefined ? this : this.each(function (i) {
					jQuery.offset.setOffset(this, options, i);
				});
			}

			var doc,
			    docElem,
			    rect,
			    win,
			    elem = this[0];

			if (!elem) {
				return;
			}

			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if (!elem.getClientRects().length) {
				return { top: 0, left: 0 };
			}

			rect = elem.getBoundingClientRect();

			doc = elem.ownerDocument;
			docElem = doc.documentElement;
			win = doc.defaultView;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function position() {
			if (!this[0]) {
				return;
			}

			var offsetParent,
			    offset,
			    elem = this[0],
			    parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if (jQuery.css(elem, "position") === "fixed") {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
					left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
				};
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function offsetParent() {
			return this.map(function () {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function (val) {
			return access(this, function (elem, method, val) {

				// Coalesce documents and windows
				var win;
				if (jQuery.isWindow(elem)) {
					win = elem;
				} else if (elem.nodeType === 9) {
					win = elem.defaultView;
				}

				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}

				if (win) {
					win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
			}
		});
	});

	return jQuery;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(51)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, Sizzle) {

	"use strict";

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function (window) {

	var i,
	    support,
	    Expr,
	    getText,
	    isXML,
	    tokenize,
	    compile,
	    select,
	    outermostContext,
	    sortInput,
	    hasDuplicate,


	// Local document vars
	setDocument,
	    document,
	    docElem,
	    documentIsHTML,
	    rbuggyQSA,
	    rbuggyMatches,
	    matches,
	    contains,


	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	    preferredDoc = window.document,
	    dirruns = 0,
	    done = 0,
	    classCache = createCache(),
	    tokenCache = createCache(),
	    compilerCache = createCache(),
	    sortOrder = function sortOrder(a, b) {
		if (a === b) {
			hasDuplicate = true;
		}
		return 0;
	},


	// Instance methods
	hasOwn = {}.hasOwnProperty,
	    arr = [],
	    pop = arr.pop,
	    push_native = arr.push,
	    push = arr.push,
	    slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function indexOf(list, elem) {
		var i = 0,
		    len = list.length;
		for (; i < len; i++) {
			if (list[i] === elem) {
				return i;
			}
		}
		return -1;
	},
	    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",


	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",


	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
	// Operator (capture 2)
	"*([*^$|!~]?=)" + whitespace +
	// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
	"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
	    pseudos = ":(" + identifier + ")(?:\\((" +
	// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
	// 1. quoted (capture 3; capture 4 or capture 5)
	"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
	// 2. simple (capture 6)
	"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
	// 3. anything else (capture 2)
	".*" + ")\\)|)",


	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp(whitespace + "+", "g"),
	    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
	    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
	    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
	    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
	    rpseudo = new RegExp(pseudos),
	    ridentifier = new RegExp("^" + identifier + "$"),
	    matchExpr = {
		"ID": new RegExp("^#(" + identifier + ")"),
		"CLASS": new RegExp("^\\.(" + identifier + ")"),
		"TAG": new RegExp("^(" + identifier + "|[*])"),
		"ATTR": new RegExp("^" + attributes),
		"PSEUDO": new RegExp("^" + pseudos),
		"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
		"bool": new RegExp("^(?:" + booleans + ")$", "i"),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
	},
	    rinputs = /^(?:input|select|textarea|button)$/i,
	    rheader = /^h\d$/i,
	    rnative = /^[^{]+\{\s*\[native \w/,


	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	    rsibling = /[+~]/,


	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
	    funescape = function funescape(_, escaped, escapedWhitespace) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ? escaped : high < 0 ?
		// BMP codepoint
		String.fromCharCode(high + 0x10000) :
		// Supplemental Plane codepoint (surrogate pair)
		String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
	},


	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	    fcssescape = function fcssescape(ch, asCodePoint) {
		if (asCodePoint) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if (ch === "\0") {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},


	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function unloadHandler() {
		setDocument();
	},
	    disabledAncestor = addCombinator(function (elem) {
		return elem.disabled === true && ("form" in elem || "label" in elem);
	}, { dir: "parentNode", next: "legend" });

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[preferredDoc.childNodes.length].nodeType;
	} catch (e) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function (target, els) {
				push_native.apply(target, slice.call(els));
			} :

			// Support: IE<9
			// Otherwise append directly
			function (target, els) {
				var j = target.length,
				    i = 0;
				// Can't trust NodeList.length
				while (target[j++] = els[i++]) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle(selector, context, results, seed) {
		var m,
		    i,
		    elem,
		    nid,
		    match,
		    groups,
		    newSelector,
		    newContext = context && context.ownerDocument,


		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if (!seed) {

			if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
				setDocument(context);
			}
			context = context || document;

			if (documentIsHTML) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

					// ID selector
					if (m = match[1]) {

						// Document context
						if (nodeType === 9) {
							if (elem = context.getElementById(m)) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if (elem.id === m) {
									results.push(elem);
									return results;
								}
							} else {
								return results;
							}

							// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

								results.push(elem);
								return results;
							}
						}

						// Type selector
					} else if (match[2]) {
						push.apply(results, context.getElementsByTagName(selector));
						return results;

						// Class selector
					} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

						push.apply(results, context.getElementsByClassName(m));
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

					if (nodeType !== 1) {
						newContext = context;
						newSelector = selector;

						// qSA looks outside Element context, which is not what we want
						// Thanks to Andrew Dupont for this workaround technique
						// Support: IE <=8
						// Exclude object elements
					} else if (context.nodeName.toLowerCase() !== "object") {

						// Capture the context ID, setting it first if necessary
						if (nid = context.getAttribute("id")) {
							nid = nid.replace(rcssescape, fcssescape);
						} else {
							context.setAttribute("id", nid = expando);
						}

						// Prefix every selector in the list
						groups = tokenize(selector);
						i = groups.length;
						while (i--) {
							groups[i] = "#" + nid + " " + toSelector(groups[i]);
						}
						newSelector = groups.join(",");

						// Expand context for sibling selectors
						newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
					}

					if (newSelector) {
						try {
							push.apply(results, newContext.querySelectorAll(newSelector));
							return results;
						} catch (qsaError) {} finally {
							if (nid === expando) {
								context.removeAttribute("id");
							}
						}
					}
				}
			}
		}

		// All others
		return select(selector.replace(rtrim, "$1"), context, results, seed);
	}

	/**
  * Create key-value caches of limited size
  * @returns {function(string, object)} Returns the Object data after storing it on itself with
  *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
  *	deleting the oldest entry
  */
	function createCache() {
		var keys = [];

		function cache(key, value) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if (keys.push(key + " ") > Expr.cacheLength) {
				// Only keep the most recent entries
				delete cache[keys.shift()];
			}
			return cache[key + " "] = value;
		}
		return cache;
	}

	/**
  * Mark a function for special use by Sizzle
  * @param {Function} fn The function to mark
  */
	function markFunction(fn) {
		fn[expando] = true;
		return fn;
	}

	/**
  * Support testing using an element
  * @param {Function} fn Passed the created element and returns a boolean result
  */
	function assert(fn) {
		var el = document.createElement("fieldset");

		try {
			return !!fn(el);
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if (el.parentNode) {
				el.parentNode.removeChild(el);
			}
			// release memory in IE
			el = null;
		}
	}

	/**
  * Adds the same handler for all of the specified attrs
  * @param {String} attrs Pipe-separated list of attributes
  * @param {Function} handler The method that will be applied
  */
	function addHandle(attrs, handler) {
		var arr = attrs.split("|"),
		    i = arr.length;

		while (i--) {
			Expr.attrHandle[arr[i]] = handler;
		}
	}

	/**
  * Checks document order of two siblings
  * @param {Element} a
  * @param {Element} b
  * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
  */
	function siblingCheck(a, b) {
		var cur = b && a,
		    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

		// Use IE sourceIndex if available on both nodes
		if (diff) {
			return diff;
		}

		// Check if b follows a
		if (cur) {
			while (cur = cur.nextSibling) {
				if (cur === b) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
  * Returns a function to use in pseudos for input types
  * @param {String} type
  */
	function createInputPseudo(type) {
		return function (elem) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
  * Returns a function to use in pseudos for buttons
  * @param {String} type
  */
	function createButtonPseudo(type) {
		return function (elem) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
  * Returns a function to use in pseudos for :enabled/:disabled
  * @param {Boolean} disabled true for :disabled; false for :enabled
  */
	function createDisabledPseudo(disabled) {

		// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function (elem) {

			// Only certain elements can match :enabled or :disabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
			if ("form" in elem) {

				// Check for inherited disabledness on relevant non-disabled elements:
				// * listed form-associated elements in a disabled fieldset
				//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
				// * option elements in a disabled optgroup
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
				// All such elements have a "form" property.
				if (elem.parentNode && elem.disabled === false) {

					// Option elements defer to a parent optgroup if present
					if ("label" in elem) {
						if ("label" in elem.parentNode) {
							return elem.parentNode.disabled === disabled;
						} else {
							return elem.disabled === disabled;
						}
					}

					// Support: IE 6 - 11
					// Use the isDisabled shortcut property to check for disabled fieldset ancestors
					return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;
				}

				return elem.disabled === disabled;

				// Try to winnow out elements that can't be disabled before trusting the disabled property.
				// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
				// even exist on them, let alone have a boolean value.
			} else if ("label" in elem) {
				return elem.disabled === disabled;
			}

			// Remaining elements are neither :enabled nor :disabled
			return false;
		};
	}

	/**
  * Returns a function to use in pseudos for positionals
  * @param {Function} fn
  */
	function createPositionalPseudo(fn) {
		return markFunction(function (argument) {
			argument = +argument;
			return markFunction(function (seed, matches) {
				var j,
				    matchIndexes = fn([], seed.length, argument),
				    i = matchIndexes.length;

				// Match elements found at the specified indexes
				while (i--) {
					if (seed[j = matchIndexes[i]]) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
  * Checks a node for validity as a Sizzle context
  * @param {Element|Object=} context
  * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
  */
	function testContext(context) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
  * Detects XML nodes
  * @param {Element|Object} elem An element or a document
  * @returns {Boolean} True iff elem is a non-HTML XML node
  */
	isXML = Sizzle.isXML = function (elem) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
  * Sets document-related variables once based on the current document
  * @param {Element|Object} [doc] An element or document object to use to set the document
  * @returns {Object} Returns the current document
  */
	setDocument = Sizzle.setDocument = function (node) {
		var hasCompare,
		    subWindow,
		    doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML(document);

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {

			// Support: IE 11, Edge
			if (subWindow.addEventListener) {
				subWindow.addEventListener("unload", unloadHandler, false);

				// Support: IE 9 - 10 only
			} else if (subWindow.attachEvent) {
				subWindow.attachEvent("onunload", unloadHandler);
			}
		}

		/* Attributes
  ---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function (el) {
			el.className = "i";
			return !el.getAttribute("className");
		});

		/* getElement(s)By*
  ---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function (el) {
			el.appendChild(document.createComment(""));
			return !el.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test(document.getElementsByClassName);

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function (el) {
			docElem.appendChild(el).id = expando;
			return !document.getElementsByName || !document.getElementsByName(expando).length;
		});

		// ID filter and find
		if (support.getById) {
			Expr.filter["ID"] = function (id) {
				var attrId = id.replace(runescape, funescape);
				return function (elem) {
					return elem.getAttribute("id") === attrId;
				};
			};
			Expr.find["ID"] = function (id, context) {
				if (typeof context.getElementById !== "undefined" && documentIsHTML) {
					var elem = context.getElementById(id);
					return elem ? [elem] : [];
				}
			};
		} else {
			Expr.filter["ID"] = function (id) {
				var attrId = id.replace(runescape, funescape);
				return function (elem) {
					var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};

			// Support: IE 6 - 7 only
			// getElementById is not reliable as a find shortcut
			Expr.find["ID"] = function (id, context) {
				if (typeof context.getElementById !== "undefined" && documentIsHTML) {
					var node,
					    i,
					    elems,
					    elem = context.getElementById(id);

					if (elem) {

						// Verify the id attribute
						node = elem.getAttributeNode("id");
						if (node && node.value === id) {
							return [elem];
						}

						// Fall back on getElementsByName
						elems = context.getElementsByName(id);
						i = 0;
						while (elem = elems[i++]) {
							node = elem.getAttributeNode("id");
							if (node && node.value === id) {
								return [elem];
							}
						}
					}

					return [];
				}
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
			if (typeof context.getElementsByTagName !== "undefined") {
				return context.getElementsByTagName(tag);

				// DocumentFragment nodes don't have gEBTN
			} else if (support.qsa) {
				return context.querySelectorAll(tag);
			}
		} : function (tag, context) {
			var elem,
			    tmp = [],
			    i = 0,

			// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
			results = context.getElementsByTagName(tag);

			// Filter out possible comments
			if (tag === "*") {
				while (elem = results[i++]) {
					if (elem.nodeType === 1) {
						tmp.push(elem);
					}
				}

				return tmp;
			}
			return results;
		};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
			if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
				return context.getElementsByClassName(className);
			}
		};

		/* QSA/matchesSelector
  ---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See https://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if (support.qsa = rnative.test(document.querySelectorAll)) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function (el) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// https://bugs.jquery.com/ticket/12359
				docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if (el.querySelectorAll("[msallowcapture^='']").length) {
					rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if (!el.querySelectorAll("[selected]").length) {
					rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if (!el.querySelectorAll(":checked").length) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibling-combinator selector` fails
				if (!el.querySelectorAll("a#" + expando + "+*").length) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function (el) {
				el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";

				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute("type", "hidden");
				el.appendChild(input).setAttribute("name", "D");

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if (el.querySelectorAll("[name=d]").length) {
					rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if (el.querySelectorAll(":enabled").length !== 2) {
					rbuggyQSA.push(":enabled", ":disabled");
				}

				// Support: IE9-11+
				// IE's :disabled selector does not pick up the children of disabled fieldsets
				docElem.appendChild(el).disabled = true;
				if (el.querySelectorAll(":disabled").length !== 2) {
					rbuggyQSA.push(":enabled", ":disabled");
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				el.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

			assert(function (el) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call(el, "*");

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call(el, "[s!='']:x");
				rbuggyMatches.push("!=", pseudos);
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
		rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

		/* Contains
  ---------------------------------------------------------------------- */
		hasCompare = rnative.test(docElem.compareDocumentPosition);

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
			    bup = b && b.parentNode;
			return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
		} : function (a, b) {
			if (b) {
				while (b = b.parentNode) {
					if (b === a) {
						return true;
					}
				}
			}
			return false;
		};

		/* Sorting
  ---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ? function (a, b) {

			// Flag for duplicate removal
			if (a === b) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if (compare) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

			// Otherwise we know they are disconnected
			1;

			// Disconnected nodes
			if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

				// Choose the first element that is related to our preferred document
				if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
					return -1;
				}
				if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
					return 1;
				}

				// Maintain original order
				return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
			}

			return compare & 4 ? -1 : 1;
		} : function (a, b) {
			// Exit early if the nodes are identical
			if (a === b) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
			    i = 0,
			    aup = a.parentNode,
			    bup = b.parentNode,
			    ap = [a],
			    bp = [b];

			// Parentless nodes are either documents or disconnected
			if (!aup || !bup) {
				return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

				// If the nodes are siblings, we can do a quick check
			} else if (aup === bup) {
				return siblingCheck(a, b);
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while (cur = cur.parentNode) {
				ap.unshift(cur);
			}
			cur = b;
			while (cur = cur.parentNode) {
				bp.unshift(cur);
			}

			// Walk down the tree looking for a discrepancy
			while (ap[i] === bp[i]) {
				i++;
			}

			return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck(ap[i], bp[i]) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
		};

		return document;
	};

	Sizzle.matches = function (expr, elements) {
		return Sizzle(expr, null, null, elements);
	};

	Sizzle.matchesSelector = function (elem, expr) {
		// Set document vars if needed
		if ((elem.ownerDocument || elem) !== document) {
			setDocument(elem);
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace(rattributeQuotes, "='$1']");

		if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

			try {
				var ret = matches.call(elem, expr);

				// IE 9's matchesSelector returns false on disconnected nodes
				if (ret || support.disconnectedMatch ||
				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle(expr, document, null, [elem]).length > 0;
	};

	Sizzle.contains = function (context, elem) {
		// Set document vars if needed
		if ((context.ownerDocument || context) !== document) {
			setDocument(context);
		}
		return contains(context, elem);
	};

	Sizzle.attr = function (elem, name) {
		// Set document vars if needed
		if ((elem.ownerDocument || elem) !== document) {
			setDocument(elem);
		}

		var fn = Expr.attrHandle[name.toLowerCase()],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

		return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
	};

	Sizzle.escape = function (sel) {
		return (sel + "").replace(rcssescape, fcssescape);
	};

	Sizzle.error = function (msg) {
		throw new Error("Syntax error, unrecognized expression: " + msg);
	};

	/**
  * Document sorting and removing duplicates
  * @param {ArrayLike} results
  */
	Sizzle.uniqueSort = function (results) {
		var elem,
		    duplicates = [],
		    j = 0,
		    i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice(0);
		results.sort(sortOrder);

		if (hasDuplicate) {
			while (elem = results[i++]) {
				if (elem === results[i]) {
					j = duplicates.push(i);
				}
			}
			while (j--) {
				results.splice(duplicates[j], 1);
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
  * Utility function for retrieving the text value of an array of DOM nodes
  * @param {Array|Element} elem
  */
	getText = Sizzle.getText = function (elem) {
		var node,
		    ret = "",
		    i = 0,
		    nodeType = elem.nodeType;

		if (!nodeType) {
			// If no nodeType, this is expected to be an array
			while (node = elem[i++]) {
				// Do not traverse comment nodes
				ret += getText(node);
			}
		} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if (typeof elem.textContent === "string") {
				return elem.textContent;
			} else {
				// Traverse its children
				for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
					ret += getText(elem);
				}
			}
		} else if (nodeType === 3 || nodeType === 4) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function ATTR(match) {
				match[1] = match[1].replace(runescape, funescape);

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

				if (match[2] === "~=") {
					match[3] = " " + match[3] + " ";
				}

				return match.slice(0, 4);
			},

			"CHILD": function CHILD(match) {
				/* matches from matchExpr["CHILD"]
    	1 type (only|nth|...)
    	2 what (child|of-type)
    	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
    	4 xn-component of xn+y argument ([+-]?\d*n|)
    	5 sign of xn-component
    	6 x of xn-component
    	7 sign of y-component
    	8 y of y-component
    */
				match[1] = match[1].toLowerCase();

				if (match[1].slice(0, 3) === "nth") {
					// nth-* requires argument
					if (!match[3]) {
						Sizzle.error(match[0]);
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
					match[5] = +(match[7] + match[8] || match[3] === "odd");

					// other types prohibit arguments
				} else if (match[3]) {
					Sizzle.error(match[0]);
				}

				return match;
			},

			"PSEUDO": function PSEUDO(match) {
				var excess,
				    unquoted = !match[6] && match[2];

				if (matchExpr["CHILD"].test(match[0])) {
					return null;
				}

				// Accept quoted arguments as-is
				if (match[3]) {
					match[2] = match[4] || match[5] || "";

					// Strip excess characters from unquoted arguments
				} else if (unquoted && rpseudo.test(unquoted) && (
				// Get excess from tokenize (recursively)
				excess = tokenize(unquoted, true)) && (
				// advance to the next closing parenthesis
				excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

					// excess is a negative index
					match[0] = match[0].slice(0, excess);
					match[2] = unquoted.slice(0, excess);
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice(0, 3);
			}
		},

		filter: {

			"TAG": function TAG(nodeNameSelector) {
				var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
				return nodeNameSelector === "*" ? function () {
					return true;
				} : function (elem) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
			},

			"CLASS": function CLASS(className) {
				var pattern = classCache[className + " "];

				return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
					return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
				});
			},

			"ATTR": function ATTR(name, operator, check) {
				return function (elem) {
					var result = Sizzle.attr(elem, name);

					if (result == null) {
						return operator === "!=";
					}
					if (!operator) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
				};
			},

			"CHILD": function CHILD(type, what, argument, first, last) {
				var simple = type.slice(0, 3) !== "nth",
				    forward = type.slice(-4) !== "last",
				    ofType = what === "of-type";

				return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function (elem) {
					return !!elem.parentNode;
				} : function (elem, context, xml) {
					var cache,
					    uniqueCache,
					    outerCache,
					    node,
					    nodeIndex,
					    start,
					    dir = simple !== forward ? "nextSibling" : "previousSibling",
					    parent = elem.parentNode,
					    name = ofType && elem.nodeName.toLowerCase(),
					    useCache = !xml && !ofType,
					    diff = false;

					if (parent) {

						// :(first|last|only)-(child|of-type)
						if (simple) {
							while (dir) {
								node = elem;
								while (node = node[dir]) {
									if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [forward ? parent.firstChild : parent.lastChild];

						// non-xml :nth-child(...) stores cache data on `parent`
						if (forward && useCache) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[expando] || (node[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

							cache = uniqueCache[type] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = nodeIndex && cache[2];
							node = nodeIndex && parent.childNodes[nodeIndex];

							while (node = ++nodeIndex && node && node[dir] || (

							// Fallback to seeking `elem` from the start
							diff = nodeIndex = 0) || start.pop()) {

								// When found, cache indexes on `parent` and break
								if (node.nodeType === 1 && ++diff && node === elem) {
									uniqueCache[type] = [dirruns, nodeIndex, diff];
									break;
								}
							}
						} else {
							// Use previously-cached element index if available
							if (useCache) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if (diff === false) {
								// Use the same loop as above to seek `elem` from the start
								while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

									if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

										// Cache the index of each encountered element
										if (useCache) {
											outerCache = node[expando] || (node[expando] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

											uniqueCache[type] = [dirruns, diff];
										}

										if (node === elem) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || diff % first === 0 && diff / first >= 0;
					}
				};
			},

			"PSEUDO": function PSEUDO(pseudo, argument) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
				    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if (fn[expando]) {
					return fn(argument);
				}

				// But maintain support for old signatures
				if (fn.length > 1) {
					args = [pseudo, pseudo, "", argument];
					return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
						var idx,
						    matched = fn(seed, argument),
						    i = matched.length;
						while (i--) {
							idx = indexOf(seed, matched[i]);
							seed[idx] = !(matches[idx] = matched[i]);
						}
					}) : function (elem) {
						return fn(elem, 0, args);
					};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function (selector) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
				    results = [],
				    matcher = compile(selector.replace(rtrim, "$1"));

				return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
					var elem,
					    unmatched = matcher(seed, null, xml, []),
					    i = seed.length;

					// Match elements unmatched by `matcher`
					while (i--) {
						if (elem = unmatched[i]) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) : function (elem, context, xml) {
					input[0] = elem;
					matcher(input, null, xml, results);
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
			}),

			"has": markFunction(function (selector) {
				return function (elem) {
					return Sizzle(selector, elem).length > 0;
				};
			}),

			"contains": markFunction(function (text) {
				text = text.replace(runescape, funescape);
				return function (elem) {
					return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction(function (lang) {
				// lang value must be a valid identifier
				if (!ridentifier.test(lang || "")) {
					Sizzle.error("unsupported lang: " + lang);
				}
				lang = lang.replace(runescape, funescape).toLowerCase();
				return function (elem) {
					var elemLang;
					do {
						if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
						}
					} while ((elem = elem.parentNode) && elem.nodeType === 1);
					return false;
				};
			}),

			// Miscellaneous
			"target": function target(elem) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice(1) === elem.id;
			},

			"root": function root(elem) {
				return elem === docElem;
			},

			"focus": function focus(elem) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": createDisabledPseudo(false),
			"disabled": createDisabledPseudo(true),

			"checked": function checked(elem) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
			},

			"selected": function selected(elem) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if (elem.parentNode) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function empty(elem) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
					if (elem.nodeType < 6) {
						return false;
					}
				}
				return true;
			},

			"parent": function parent(elem) {
				return !Expr.pseudos["empty"](elem);
			},

			// Element/input types
			"header": function header(elem) {
				return rheader.test(elem.nodeName);
			},

			"input": function input(elem) {
				return rinputs.test(elem.nodeName);
			},

			"button": function button(elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function text(elem) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
			},

			// Position-in-collection
			"first": createPositionalPseudo(function () {
				return [0];
			}),

			"last": createPositionalPseudo(function (matchIndexes, length) {
				return [length - 1];
			}),

			"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
				return [argument < 0 ? argument + length : argument];
			}),

			"even": createPositionalPseudo(function (matchIndexes, length) {
				var i = 0;
				for (; i < length; i += 2) {
					matchIndexes.push(i);
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function (matchIndexes, length) {
				var i = 1;
				for (; i < length; i += 2) {
					matchIndexes.push(i);
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
				var i = argument < 0 ? argument + length : argument;
				for (; --i >= 0;) {
					matchIndexes.push(i);
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
				var i = argument < 0 ? argument + length : argument;
				for (; ++i < length;) {
					matchIndexes.push(i);
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
		Expr.pseudos[i] = createInputPseudo(i);
	}
	for (i in { submit: true, reset: true }) {
		Expr.pseudos[i] = createButtonPseudo(i);
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function (selector, parseOnly) {
		var matched,
		    match,
		    tokens,
		    type,
		    soFar,
		    groups,
		    preFilters,
		    cached = tokenCache[selector + " "];

		if (cached) {
			return parseOnly ? 0 : cached.slice(0);
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while (soFar) {

			// Comma and first run
			if (!matched || (match = rcomma.exec(soFar))) {
				if (match) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice(match[0].length) || soFar;
				}
				groups.push(tokens = []);
			}

			matched = false;

			// Combinators
			if (match = rcombinators.exec(soFar)) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace(rtrim, " ")
				});
				soFar = soFar.slice(matched.length);
			}

			// Filters
			for (type in Expr.filter) {
				if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice(matched.length);
				}
			}

			if (!matched) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
		// Cache the tokens
		tokenCache(selector, groups).slice(0);
	};

	function toSelector(tokens) {
		var i = 0,
		    len = tokens.length,
		    selector = "";
		for (; i < len; i++) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator(matcher, combinator, base) {
		var dir = combinator.dir,
		    skip = combinator.next,
		    key = skip || dir,
		    checkNonElements = base && key === "parentNode",
		    doneName = done++;

		return combinator.first ?
		// Check against closest ancestor/preceding element
		function (elem, context, xml) {
			while (elem = elem[dir]) {
				if (elem.nodeType === 1 || checkNonElements) {
					return matcher(elem, context, xml);
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function (elem, context, xml) {
			var oldCache,
			    uniqueCache,
			    outerCache,
			    newCache = [dirruns, doneName];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if (xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						if (matcher(elem, context, xml)) {
							return true;
						}
					}
				}
			} else {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						outerCache = elem[expando] || (elem[expando] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

						if (skip && skip === elem.nodeName.toLowerCase()) {
							elem = elem[dir] || elem;
						} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

							// Assign to newCache so results back-propagate to previous elements
							return newCache[2] = oldCache[2];
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[key] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if (newCache[2] = matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
	}

	function elementMatcher(matchers) {
		return matchers.length > 1 ? function (elem, context, xml) {
			var i = matchers.length;
			while (i--) {
				if (!matchers[i](elem, context, xml)) {
					return false;
				}
			}
			return true;
		} : matchers[0];
	}

	function multipleContexts(selector, contexts, results) {
		var i = 0,
		    len = contexts.length;
		for (; i < len; i++) {
			Sizzle(selector, contexts[i], results);
		}
		return results;
	}

	function condense(unmatched, map, filter, context, xml) {
		var elem,
		    newUnmatched = [],
		    i = 0,
		    len = unmatched.length,
		    mapped = map != null;

		for (; i < len; i++) {
			if (elem = unmatched[i]) {
				if (!filter || filter(elem, context, xml)) {
					newUnmatched.push(elem);
					if (mapped) {
						map.push(i);
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
		if (postFilter && !postFilter[expando]) {
			postFilter = setMatcher(postFilter);
		}
		if (postFinder && !postFinder[expando]) {
			postFinder = setMatcher(postFinder, postSelector);
		}
		return markFunction(function (seed, results, context, xml) {
			var temp,
			    i,
			    elem,
			    preMap = [],
			    postMap = [],
			    preexisting = results.length,


			// Get initial elements from seed or context
			elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
			    matcherOut = matcher ?
			// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
			postFinder || (seed ? preFilter : preexisting || postFilter) ?

			// ...intermediate processing is necessary
			[] :

			// ...otherwise use results directly
			results : matcherIn;

			// Find primary matches
			if (matcher) {
				matcher(matcherIn, matcherOut, context, xml);
			}

			// Apply postFilter
			if (postFilter) {
				temp = condense(matcherOut, postMap);
				postFilter(temp, [], context, xml);

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while (i--) {
					if (elem = temp[i]) {
						matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
					}
				}
			}

			if (seed) {
				if (postFinder || preFilter) {
					if (postFinder) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while (i--) {
							if (elem = matcherOut[i]) {
								// Restore matcherIn since elem is not yet a final match
								temp.push(matcherIn[i] = elem);
							}
						}
						postFinder(null, matcherOut = [], temp, xml);
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while (i--) {
						if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

				// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
				if (postFinder) {
					postFinder(null, results, matcherOut, xml);
				} else {
					push.apply(results, matcherOut);
				}
			}
		});
	}

	function matcherFromTokens(tokens) {
		var checkContext,
		    matcher,
		    j,
		    len = tokens.length,
		    leadingRelative = Expr.relative[tokens[0].type],
		    implicitRelative = leadingRelative || Expr.relative[" "],
		    i = leadingRelative ? 1 : 0,


		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator(function (elem) {
			return elem === checkContext;
		}, implicitRelative, true),
		    matchAnyContext = addCombinator(function (elem) {
			return indexOf(checkContext, elem) > -1;
		}, implicitRelative, true),
		    matchers = [function (elem, context, xml) {
			var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		}];

		for (; i < len; i++) {
			if (matcher = Expr.relative[tokens[i].type]) {
				matchers = [addCombinator(elementMatcher(matchers), matcher)];
			} else {
				matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

				// Return special upon seeing a positional matcher
				if (matcher[expando]) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for (; j < len; j++) {
						if (Expr.relative[tokens[j].type]) {
							break;
						}
					}
					return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
				}
				matchers.push(matcher);
			}
		}

		return elementMatcher(matchers);
	}

	function matcherFromGroupMatchers(elementMatchers, setMatchers) {
		var bySet = setMatchers.length > 0,
		    byElement = elementMatchers.length > 0,
		    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
			var elem,
			    j,
			    matcher,
			    matchedCount = 0,
			    i = "0",
			    unmatched = seed && [],
			    setMatched = [],
			    contextBackup = outermostContext,

			// We must always have either seed elements or outermost context
			elems = seed || byElement && Expr.find["TAG"]("*", outermost),

			// Use integer dirruns iff this is the outermost matcher
			dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
			    len = elems.length;

			if (outermost) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for (; i !== len && (elem = elems[i]) != null; i++) {
				if (byElement && elem) {
					j = 0;
					if (!context && elem.ownerDocument !== document) {
						setDocument(elem);
						xml = !documentIsHTML;
					}
					while (matcher = elementMatchers[j++]) {
						if (matcher(elem, context || document, xml)) {
							results.push(elem);
							break;
						}
					}
					if (outermost) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if (bySet) {
					// They will have gone through all possible matchers
					if (elem = !matcher && elem) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if (seed) {
						unmatched.push(elem);
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if (bySet && i !== matchedCount) {
				j = 0;
				while (matcher = setMatchers[j++]) {
					matcher(unmatched, setMatched, context, xml);
				}

				if (seed) {
					// Reintegrate element matches to eliminate the need for sorting
					if (matchedCount > 0) {
						while (i--) {
							if (!(unmatched[i] || setMatched[i])) {
								setMatched[i] = pop.call(results);
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense(setMatched);
				}

				// Add matches to results
				push.apply(results, setMatched);

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

					Sizzle.uniqueSort(results);
				}
			}

			// Override manipulation of globals by nested matchers
			if (outermost) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

		return bySet ? markFunction(superMatcher) : superMatcher;
	}

	compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
		var i,
		    setMatchers = [],
		    elementMatchers = [],
		    cached = compilerCache[selector + " "];

		if (!cached) {
			// Generate a function of recursive functions that can be used to check each element
			if (!match) {
				match = tokenize(selector);
			}
			i = match.length;
			while (i--) {
				cached = matcherFromTokens(match[i]);
				if (cached[expando]) {
					setMatchers.push(cached);
				} else {
					elementMatchers.push(cached);
				}
			}

			// Cache the compiled function
			cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
  * A low-level selection function that works with Sizzle's compiled
  *  selector functions
  * @param {String|Function} selector A selector or a pre-compiled
  *  selector function built with Sizzle.compile
  * @param {Element} context
  * @param {Array} [results]
  * @param {Array} [seed] A set of elements to match against
  */
	select = Sizzle.select = function (selector, context, results, seed) {
		var i,
		    tokens,
		    token,
		    type,
		    find,
		    compiled = typeof selector === "function" && selector,
		    match = !seed && tokenize(selector = compiled.selector || selector);

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if (match.length === 1) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice(0);
			if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

				context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
				if (!context) {
					return results;

					// Precompiled matchers will still verify ancestry, so step up a level
				} else if (compiled) {
					context = context.parentNode;
				}

				selector = selector.slice(tokens.shift().value.length);
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
			while (i--) {
				token = tokens[i];

				// Abort if we hit a combinator
				if (Expr.relative[type = token.type]) {
					break;
				}
				if (find = Expr.find[type]) {
					// Search, expanding context for leading sibling combinators
					if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice(i, 1);
						selector = seed.length && toSelector(tokens);
						if (!selector) {
							push.apply(results, seed);
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function (el) {
		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if (!assert(function (el) {
		el.innerHTML = "<a href='#'></a>";
		return el.firstChild.getAttribute("href") === "#";
	})) {
		addHandle("type|href|height|width", function (elem, name, isXML) {
			if (!isXML) {
				return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if (!support.attributes || !assert(function (el) {
		el.innerHTML = "<input/>";
		el.firstChild.setAttribute("value", "");
		return el.firstChild.getAttribute("value") === "";
	})) {
		addHandle("value", function (elem, name, isXML) {
			if (!isXML && elem.nodeName.toLowerCase() === "input") {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if (!assert(function (el) {
		return el.getAttribute("disabled") == null;
	})) {
		addHandle(booleans, function (elem, name, isXML) {
			var val;
			if (!isXML) {
				return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
			}
		});
	}

	// EXPOSE
	var _sizzle = window.Sizzle;

	Sizzle.noConflict = function () {
		if (window.Sizzle === Sizzle) {
			window.Sizzle = _sizzle;
		}

		return Sizzle;
	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return Sizzle;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		// Sizzle requires that there be a global window in Common-JS like environments
	} else if (typeof module !== "undefined" && module.exports) {
		module.exports = Sizzle;
	} else {
		window.Sizzle = Sizzle;
	}
	// EXPOSE
})(window);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

  "use strict";

  function nodeName(elem, name) {

    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  };

  return nodeName;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	"use strict";

	// Match a standalone tag

	return (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i
	);
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(13), __webpack_require__(55), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, indexOf, rneedsContext) {

	"use strict";

	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		// Single element
		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return elem === qualifier !== not;
			});
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if (typeof qualifier !== "string") {
			return jQuery.grep(elements, function (elem) {
				return indexOf.call(qualifier, elem) > -1 !== not;
			});
		}

		// Simple selector that can be filtered directly, removing non-Elements
		if (risSimple.test(qualifier)) {
			return jQuery.filter(qualifier, elements, not);
		}

		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter(qualifier, elements);
		return jQuery.grep(elements, function (elem) {
			return indexOf.call(qualifier, elem) > -1 !== not && elem.nodeType === 1;
		});
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		if (elems.length === 1 && elem.nodeType === 1) {
			return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
		}

		return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
	};

	jQuery.fn.extend({
		find: function find(selector) {
			var i,
			    ret,
			    len = this.length,
			    self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			ret = this.pushStack([]);

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			return len > 1 ? jQuery.uniqueSort(ret) : ret;
		},
		filter: function filter(selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function not(selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function is(selector) {
			return !!winnow(this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
		}
	});
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {
	"use strict";

	return jQuery.expr.match.needsContext;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(10), __webpack_require__(17), __webpack_require__(20), __webpack_require__(3), __webpack_require__(23), __webpack_require__(9), __webpack_require__(57), __webpack_require__(21), __webpack_require__(58), __webpack_require__(19), __webpack_require__(59), __webpack_require__(24), __webpack_require__(11), __webpack_require__(22), __webpack_require__(60), __webpack_require__(7) // contains
], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, pnum, access, rmargin, document, rcssNum, rnumnonpx, cssExpand, getStyles, swap, curCSS, adjustCSS, addGetHookIf, support) {

	"use strict";

	var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    rcustomProp = /^--/,
	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	    cssPrefixes = ["Webkit", "Moz", "ms"],
	    emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
		    i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	// Return a property mapped along what jQuery.cssProps suggests or to
	// a vendor prefixed property.
	function finalPropName(name) {
		var ret = jQuery.cssProps[name];
		if (!ret) {
			ret = jQuery.cssProps[name] = vendorPropName(name) || name;
		}
		return ret;
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i,
		    val = 0;

		// If we already have the right measurement, avoid augmentation
		if (extra === (isBorderBox ? "border" : "content")) {
			i = 4;

			// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}

		for (; i < 4; i += 2) {

			// Both box models exclude margin, so add it if we want it
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {

				// border-box includes padding, so remove it if we want content
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra) {

		// Start with computed style
		var valueIsBorderBox,
		    styles = getStyles(elem),
		    val = curCSS(elem, name, styles),
		    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// Computed unit is not pixels. Stop here and return.
		if (rnumnonpx.test(val)) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

		// Fall back to offsetWidth/Height when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		if (val === "auto") {
			val = elem["offset" + name[0].toUpperCase() + name.slice(1)];
		}

		// Normalize "", auto, and prepare for extra
		val = parseFloat(val) || 0;

		// Use the active box-sizing model to add/subtract irrelevant styles
		return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function get(elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function style(elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret,
			    type,
			    hooks,
			    origName = jQuery.camelCase(name),
			    isCustomProp = rcustomProp.test(name),
			    style = elem.style;

			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value === "undefined" ? "undefined" : _typeof(value);

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

					if (isCustomProp) {
						style.setProperty(name, value);
					} else {
						style[name] = value;
					}
				}
			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function css(elem, name, extra, styles) {
			var val,
			    num,
			    hooks,
			    origName = jQuery.camelCase(name),
			    isCustomProp = rcustomProp.test(name);

			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}

			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function get(elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) && (

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, name, extra);
					}) : getWidthOrHeight(elem, name, extra);
				}
			},

			set: function set(elem, value, extra) {
				var matches,
				    styles = extra && getStyles(elem),
				    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

					elem.style[name] = value;
					value = jQuery.css(elem, name);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
		if (computed) {
			return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
				return elem.getBoundingClientRect().left;
			})) + "px";
		}
	});

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function expand(value) {
				var i = 0,
				    expanded = {},


				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function css(name, value) {
			return access(this, function (elem, name, value) {
				var styles,
				    len,
				    map = {},
				    i = 0;

				if (Array.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		}
	});

	return jQuery;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	"use strict";

	return ["Top", "Right", "Bottom", "Left"];
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	"use strict";

	// A method for quickly swapping in/out CSS properties to get correct calculations.

	return function (elem, options, callback, args) {
		var ret,
		    name,
		    old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, rcssNum) {

	"use strict";

	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted,
		    scale = 1,
		    maxIterations = 20,
		    currentValue = tween ? function () {
			return tween.cur();
		} : function () {
			return jQuery.css(elem, prop, "");
		},
		    initial = currentValue(),
		    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


		// Starting value computation is required for potential unit mismatches
		initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style(elem, prop, initialInUnit + unit);

				// Update scale, tolerating zero or NaN from tween.cur()
				// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
		}

		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}

	return adjustCSS;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(61), __webpack_require__(62)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, document) {

	"use strict";

	// The deferred used on DOM ready

	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function (fn) {

		readyList.then(fn)

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch(function (error) {
			jQuery.readyException(error);
		});

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Handle when the DOM is ready
		ready: function ready(wait) {

			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);
		}
	});

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout(jQuery.ready);
	} else {

		// Use the handy event callback
		document.addEventListener("DOMContentLoaded", completed);

		// A fallback to window.onload, that will always work
		window.addEventListener("load", completed);
	}
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {

	"use strict";

	jQuery.readyException = function (error) {
		window.setTimeout(function () {
			throw error;
		});
	};
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(12), __webpack_require__(63)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, slice) {

	"use strict";

	function Identity(v) {
		return v;
	}
	function Thrower(ex) {
		throw ex;
	}

	function adoptValue(value, resolve, reject, noValue) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if (value && jQuery.isFunction(method = value.promise)) {
				method.call(value).done(resolve).fail(reject);

				// Other thenables
			} else if (value && jQuery.isFunction(method = value.then)) {
				method.call(value, resolve, reject);

				// Other non-thenables
			} else {

				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply(undefined, [value].slice(noValue));
			}

			// For Promises/A+, convert exceptions into rejections
			// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
			// Deferred#then to conditionally suppress rejection.
		} catch (value) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply(undefined, [value]);
		}
	}

	jQuery.extend({

		Deferred: function Deferred(func) {
			var tuples = [

			// action, add listener, callbacks,
			// ... .then handlers, argument index, [final state]
			["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
			    _state = "pending",
			    _promise = {
				state: function state() {
					return _state;
				},
				always: function always() {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				"catch": function _catch(fn) {
					return _promise.then(null, fn);
				},

				// Keep pipe for back-compat
				pipe: function pipe() /* fnDone, fnFail, fnProgress */{
					var fns = arguments;

					return jQuery.Deferred(function (newDefer) {
						jQuery.each(tuples, function (i, tuple) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[tuple[1]](function () {
								var returned = fn && fn.apply(this, arguments);
								if (returned && jQuery.isFunction(returned.promise)) {
									returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
								}
							});
						});
						fns = null;
					}).promise();
				},
				then: function then(onFulfilled, onRejected, onProgress) {
					var maxDepth = 0;
					function resolve(depth, deferred, handler, special) {
						return function () {
							var that = this,
							    args = arguments,
							    mightThrow = function mightThrow() {
								var returned, then;

								// Support: Promises/A+ section 2.3.3.3.3
								// https://promisesaplus.com/#point-59
								// Ignore double-resolution attempts
								if (depth < maxDepth) {
									return;
								}

								returned = handler.apply(that, args);

								// Support: Promises/A+ section 2.3.1
								// https://promisesaplus.com/#point-48
								if (returned === deferred.promise()) {
									throw new TypeError("Thenable self-resolution");
								}

								// Support: Promises/A+ sections 2.3.3.1, 3.5
								// https://promisesaplus.com/#point-54
								// https://promisesaplus.com/#point-75
								// Retrieve `then` only once
								then = returned && (

								// Support: Promises/A+ section 2.3.4
								// https://promisesaplus.com/#point-64
								// Only check objects and functions for thenability
								(typeof returned === "undefined" ? "undefined" : _typeof(returned)) === "object" || typeof returned === "function") && returned.then;

								// Handle a returned thenable
								if (jQuery.isFunction(then)) {

									// Special processors (notify) just wait for resolution
									if (special) {
										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));

										// Normal processors (resolve) also hook into progress
									} else {

										// ...and disregard older resolution values
										maxDepth++;

										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
									}

									// Handle all other returned values
								} else {

									// Only substitute handlers pass on context
									// and multiple values (non-spec behavior)
									if (handler !== Identity) {
										that = undefined;
										args = [returned];
									}

									// Process the value(s)
									// Default process is resolve
									(special || deferred.resolveWith)(that, args);
								}
							},


							// Only normal processors (resolve) catch and reject exceptions
							process = special ? mightThrow : function () {
								try {
									mightThrow();
								} catch (e) {

									if (jQuery.Deferred.exceptionHook) {
										jQuery.Deferred.exceptionHook(e, process.stackTrace);
									}

									// Support: Promises/A+ section 2.3.3.3.4.1
									// https://promisesaplus.com/#point-61
									// Ignore post-resolution exceptions
									if (depth + 1 >= maxDepth) {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if (handler !== Thrower) {
											that = undefined;
											args = [e];
										}

										deferred.rejectWith(that, args);
									}
								}
							};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if (depth) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if (jQuery.Deferred.getStackHook) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout(process);
							}
						};
					}

					return jQuery.Deferred(function (newDefer) {

						// progress_handlers.add( ... )
						tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

						// fulfilled_handlers.add( ... )
						tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));

						// rejected_handlers.add( ... )
						tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function promise(obj) {
					return obj != null ? jQuery.extend(obj, _promise) : _promise;
				}
			},
			    deferred = {};

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
				    stateString = tuple[5];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				_promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						_state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[3 - i][2].disable,

					// progress_callbacks.lock
					tuples[0][2].lock);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add(tuple[3].fire);

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			_promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function when(singleValue) {
			var

			// count of uncompleted subordinates
			remaining = arguments.length,


			// count of unprocessed arguments
			i = remaining,


			// subordinate fulfillment data
			resolveContexts = Array(i),
			    resolveValues = slice.call(arguments),


			// the master Deferred
			master = jQuery.Deferred(),


			// subordinate callback factory
			updateFunc = function updateFunc(i) {
				return function (value) {
					resolveContexts[i] = this;
					resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
					if (! --remaining) {
						master.resolveWith(resolveContexts, resolveValues);
					}
				};
			};

			// Single- and empty arguments are adopted like Promise.resolve
			if (remaining <= 1) {
				adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {

					return master.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while (i--) {
				adoptValue(resolveValues[i], updateFunc(i), master.reject);
			}

			return master.promise();
		}
	});

	return jQuery;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(64)], __WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery, rnothtmlwhite) {

	"use strict";

	// Convert String-formatted options into Object-formatted ones

	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
  * Create a callback list using the following parameters:
  *
  *	options: an optional list of space-separated options that will change how
  *			the callback list behaves or a more traditional option object
  *
  * By default a callback list will act like an event callback list and can be
  * "fired" multiple times.
  *
  * Possible options:
  *
  *	once:			will ensure the callback list can only be fired once (like a Deferred)
  *
  *	memory:			will keep track of previous values and will call any callback added
  *					after the list has been fired right away with the latest "memorized"
  *					values (like a Deferred)
  *
  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
  *
  *	stopOnFalse:	interrupt callings when a callback returns false
  *
  */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

		var // Flag to know if list is currently firing
		firing,


		// Last fire value for non-forgettable lists
		memory,


		// Flag to know if list was already fired
		_fired,


		// Flag to prevent firing
		_locked,


		// Actual callback list
		list = [],


		// Queue of execution data for repeatable lists
		queue = [],


		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,


		// Fire callbacks
		fire = function fire() {

			// Enforce single-firing
			_locked = _locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			_fired = firing = true;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {

					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (_locked) {

				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},


		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function add() {
				if (list) {

					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, function (_, arg) {
							if (jQuery.isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length && jQuery.type(arg) !== "string") {

								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function remove() {
				jQuery.each(arguments, function (_, arg) {
					var index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function has(fn) {
				return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function empty() {
				if (list) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function disable() {
				_locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function disabled() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function lock() {
				_locked = queue = [];
				if (!memory && !firing) {
					list = memory = "";
				}
				return this;
			},
			locked: function locked() {
				return !!_locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function fireWith(context, args) {
				if (!_locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function fire() {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function fired() {
				return !!_fired;
			}
		};

		return self;
	};

	return jQuery;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	"use strict";

	// Only count HTML whitespace
	// Other whitespace should count in values
	// https://html.spec.whatwg.org/multipage/infrastructure.html#space-character

	return (/[^\x20\t\r\n\f]+/g
	);
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./book-read.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./book-read.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "/*\nBOOK LOADER\n*/\n\n#book-loader-container {\n\tposition: absolute;\n\ttop: 0px;\n\tleft: 0px;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: #fafafa;\n}\n\n#book-loader-container.hidden {\n\tdisplay: none;\n}\n\n#book-loader {\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 40%;\n\tz-index: 1;\n    border: 8px solid #f3f3f3; \n    border-radius: 50%;\n    width: 80px;\n    height: 80px;\n    margin: -40px 0 0 -40px;\n    -webkit-animation: spin 2s linear infinite;\n    animation: spin 2s linear infinite;\n}\n\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n}\n\n/*\nTEXT LOADER\n*/\n\n#text-loader-container {\n\tposition: absolute;\n\ttop: 0px;\n\tleft: 0px;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: #fafafa;\n}\n\n#text-loader-container.hidden {\n\tdisplay: none;\n}\n\n#text-loader {\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 40%;\n\tz-index: 1;\n    border: 8px solid #f3f3f3;\n    border-top: 8px solid gray;\n    border-bottom: 8px solid gray;\n    border-radius: 50%;\n    width: 80px;\n    height: 80px;\n    margin: -40px 0 0 -40px;\n    -webkit-animation: textSpin 2s linear infinite;\n    animation: textSpin 2s linear infinite;\n}\n\n@-webkit-keyframes textSpin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes textSpin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n}\n\n/*\nSIGNET\n*/\n#bookmark {\n\tvisibility: hidden;\n\twidth: 250px;\n\tmargin-left: -125px;\n\tpadding: 8px;\n\tbackground-color: #333;\n\tcolor: #fff;\n\ttext-align: center;\n\tposition: absolute;\n\tz-index: 1;\n\tleft: 50%;\n\ttop: 30px;\n\tfont-family: 'Verdana', sans-serif;\n}\n\n#bookmark.show {\n\tvisibility: visible;\n\t-webkit-animation: fadein 0.5s, fadeout 0.5s 2s;\n    animation: fadein 0.5s, fadeout 0.5s 2s;\n}\n\n@-webkit-keyframes fadein {\n    from {opacity: 0;}\n    to {opacity: 1;}\n}\n\n@keyframes fadein {\n    from {opacity: 0;}\n    to {opacity: 1;}\n}\n\n@-webkit-keyframes fadeout {\n    from {opacity: 1;}\n    to {opacity: 0;}\n}\n\n@keyframes fadeout {\n    from {opacity: 1;}\n    to {opacity: 0;}\n}\n\n/*\nBOOK NAVBAR BOTTOM\n*/\n#book-nav-bar-bottom {\n\tdisplay: none;\n\theight: 44px;\n\tposition: relative;\n}\n\n@media screen and (min-width: 768px) {\n\t#book-nav-bar-bottom {\n\t\tdisplay: block;\n\t}\n}\n\n#book-nav-bar-bottom-controls {\n\tposition: relative;\n\tdisplay: block;\n\theight: 44px;\n\twidth: 550px;\n\tmargin: auto;\n\ttext-align: center;\n}\n\n#book-nav-bar-bottom-controls #center {\n\twidth: 120px;\n\tmargin: auto;\n}\n\n#book-nav-bar-bottom-controls #center #backward-large {\n\tfloat: left;\n}\n\n#book-nav-bar-bottom-controls #center #forward-large {\n\tfloat: right;\n}\n\n#book-nav-bar-bottom-controls span, #book-nav-bar-bottom-controls button {\n\toutline: none;\n\theight: 100%;\n\tbackground-color: transparent;\n\tdisplay: inline-block;\n}\n\n#book-nav-bar-bottom-controls #open-toc-large {\n\tposition: absolute;\n\ttop: 0px;\n\tright: 0px;\n\tpadding-bottom: 10px;\n}\n\n#book-nav-bar-bottom-controls #open-options-medium {\n\tposition: absolute;\n\ttop: 0px;\n\tright: 56px;\n\tpadding-bottom: 10px;\n}\n\n#book-nav-bar-bottom-controls #home-large {\n\tposition: absolute;\n\ttop: 0px;\n\tleft: 0px;\n\tpadding-bottom: 10px;\n}\n\n#book-nav-bar-bottom-controls #add-bookmark-large {\n\tposition: absolute;\n\ttop: 0px;\n\tleft: 56px;\n\tpadding-bottom: 10px;\n}\n\n@media screen and (min-width: 1366px) {\n\t#book-nav-bar-bottom-controls #open-toc-large, \n\t#book-nav-bar-bottom-controls #home-large, \n\t#book-nav-bar-bottom-controls #open-options-medium, \n\t#book-nav-bar-bottom-controls #add-bookmark-large {\n\t\tdisplay: none;\n\t}\n}\n\n/*\nBOOK NAV-BAR-BOTTOM-SMALL\n*/\n\n#book-nav-bar-bottom-small {\n\tdisplay: block;\n\theight: 30px;\n\tposition: relative;\n\tmargin: auto;\n\tbackground-color: #333;\n}\n\n@media screen and (min-width: 768px) {\n\t#book-nav-bar-bottom-small {\n\t\tdisplay: none;\n\t}\n}\n\n#book-nav-bar-bottom-small .w3-btn {\n\tdisplay: inline-block;\n\tborder: none;\n\tbackground-color: transparent;\n\theight: 100%;\n\tpadding: 3px 0px 0px 0px;\n\tmargin: 0px;\n\toutline: none;\n\twidth: 24%;\n}\n\n/*\nBOOKCONTAINER\n*/\n#bookContainer {\n\tfont-family: 'Georgia', serif;\n\tposition: relative;\n\tcolor: #000;\n\topacity: 0.0;\n\tmargin: auto;\n\ttransition: opacity 0.8s;\n\t-webkit-transition: opacity 0.8s;\n\t-moz-transition: opacity 0.8s;\n\t-o-transition: opacity 0.8s;\n}\n\n#bookContainer.show {\n\topacity: 1.0;\n}\n\n/*\nTEXTCONTAINER\n*/\n[data-wb-text-container] {\n\tmargin: auto;\n\tbackground-color: #fafafa;\n}\n\n/*\nTOC-LARGE-DEVICE, TAB-OPTIONS, TAB-INFOS, HOME\n*/\n\n#toc-large-device, #tab-infos, #tab-options {\n  position: absolute;\n  top: 0px;\n  right: -40%;\n  width: 33%;\n  transition: right 0.5s;\n  -webkit-transition : right 0.5s;\n  -moz-transition : right 0.5s;\n  -o-transition: right 0.5s;\n  display: none;\n  background-color: #fafafa;\n}\n\n@media screen and (min-width: 1366px) {\n\n\t#toc-large-device, #tab-infos, #tab-options {\n\t\tdisplay: block\n\t}\n\n}\n\n#toc-large-device.open, #tab-infos.open, #tab-options.open {\n\tright: 0px;\n}\n\n\n\n#toc-large-device-container, #tab-infos-container, #tab-options-container {\n\twidth: 100%;\n\tbackground-color: #fafafa;\n\toverflow-y: auto;\n}\n\n\n#toc-large-device-container > div {\n\tbackground-color: #fafafa;\n\tposition: relative;\n\theight: 100%;\n\twidth: 100%;\n}\n\n#tab-infos-container p {\n\tmargin: 0px;\n\tmargin-top: 8px;\n}\n\n#tab-infos-container ul {\n\tmargin: 0px;\n\tpadding-left: 10px;\n\tlist-style-type: none;\n}\n\n#tab-infos-container .contrib-role {\n\ttext-transform: capitalize;\n}\n\n#tab-options-container {\n\ttext-align: center;\n}\n\n#tab-options-container #font-size-container-large,\n#tab-options-container #font-family-container-large {\n\twidth: 250px;\n\tmargin: auto;\n}\n\n#tab-options-container #font-family-container-large > div {\n\ttext-align : left;\n\tpadding-left: 35px;\n}\n\n#tab-options-container label {\n\twidth: 50%;\n\ttext-align : left;\n}\n\n.options-title {\n\tfont-variant: small-caps;\n\tletter-spacing: 1.5px;\n\tfont-size: 1.2em;\n}\n\n/*\nBOOK COMMANDS\n*/\n\n\n#book-commands {\n\tposition: fixed;\n\tleft: 32px;\n\twidth: 75px;\n\tdisplay: none;\n}\n\n@media screen and (min-width: 1366px) {\n\t#book-commands {\n\t\tdisplay: block;\n\t}\n}\n\n#close-toc-large-device, #close-tab-infos, #close-tab-options {\n    position: absolute;\n\tright: 100%;\n\ttop: 0px;\n\tmargin-right: 16px;\n\toutline: none;\n\tbackground-color: #fafafa;\n\tfont-size: 1.2em;\n\tfont-family: 'Verdana', serif;\n}\n\n#toggle-toc-large-device, #toggle-tab-options, #toggle-tab-infos, #tab-add-bookmark, #tab-home-link {\n    position: absolute;\n\tright: 0px;\n\twidth: 80px;\n\tmargin-right: 16px;\n\toutline: none;\n\tfont-size: 1em;\n}\n\n#toggle-toc-large-device {\n\ttop: 0px;\n}\n\n#toggle-tab-options {\n\ttop: 48px;\n}\n\n#toggle-tab-infos {\n\ttop: 96px;\n}\n\n#tab-add-bookmark {\n\ttop: 144px;\n}\n\n#tab-home-link {\n\ttop: 192px;\n}\n\n/*\ntoggle toc-large-device, swing-container, swing-bar\n*/\n/*\nif toc-large-device.open : swing-container to left\n*/\n#swing-container {\n\tmargin-right: 0px;\n\ttransition: margin-right 0.8s;\n\t-webkit-transition : margin-right 0.8s;\n\t-moz-transition : margin-right 0.8s;\n    -o-transition: margin-right 0.8s;\n\t\n}\n\n#swing-container.left {\n\t\tmargin-right: 0px;\n\t}\n\n@media screen and (min-width: 1366px) {\n\t#swing-container.left {\n\t\tmargin-right: 33%;\n\t}\n}\n\n/*\nif toc-large-device.open : swing-bar to left\n*/\n#swing-bar {\n\tmargin-right: 0px;\n\ttransition: margin-right 0.9s;\n\t-webkit-transition : margin-right 0.9s;\n\t-moz-transition : margin-right 0.9s;\n    -o-transition: margin-right 0.9s;\n}\n\n#swing-bar.left {\n\tmargin-right: 0px;\n}\n\n@media screen and (min-width: 1366px) {\n\t#swing-bar.left {\n\t\tmargin-right: 33%;\n\t}\n}\n\n/*\nTOC, OPTIONS (< 1366px)\n*/\n#toc, #options, #options-medium {\n\tposition: absolute;\n\ttop: -1000px;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 1000;\n\toverflow-y: auto;\n/*\n\ttransition: top 0.4s;\n\t-webkit-transition : top 0.4s;\n\t-moz-transition : top 0.4s;\n    -o-transition: top 0.4s;\n*/\n\tpadding: 0px;\n\tbackground-color: #fafafa;\n}\n\n#toc.open, #options.open, #options-medium.open {\n\ttop: 0px;\n}\n\n\n\n#toc > div, #options > div, #options-medium > div {\n\tposition: relative;\n\tbackground-color: #fafafa;\n}\n\n#close-toc, #close-options, #close-options-medium {\n\tbackground-color: transparent;\n\tline-height: 27px;\n\tfont-size: 2em;\n\tfont-family: 'Georgia', sans-serif;\n}\n\n#toc-title {\n\tmargin-bottom: 30px;\n\tmargin-top: 20px\n}\n\n#toc-title p {\n\tmargin: 8px;\n}\n/*\ntoc list\n*/\n#toc ul, #toc-large-device ul {\n\tpadding: 0px;\n}\n\n#toc li, #toc-large-device li {\n\tlist-style-type: none;\n\tpadding: .5em .5em;\n}\n\n#toc a.wb-link, #toc-large-device a.wb-link {\n\tdisplay: inline-block;\n\twidth: 100%;\n\tborder: none;\n\tcolor: gray;\n}\n\n#toc a.wb-link:hover, #toc-large-device a.wb-link:hover {\n\tdisplay: inline-block;\n\twidth: 100%;\n\tborder: none;\n\tcolor: #000;\n}\n\n#toc li.current a.wb-link, #toc-large-device li.current a.wb-link {\n\tcolor: #000;\n\toutline: none;\n\tfont-style: italic;\n}\n\n#toc [data-wb-element-page-number], #toc-large-device [data-wb-element-page-number] {\n\tfloat: right;\n}\n\n\n/*\noptions content\n*/\n#options > div, #options-medium > div {\n\ttext-align: center;\n}\n\n#options #font-size-container, #options-medium #font-size-container,\n#options #font-family-container, #options-medium #font-family-container {\n\twidth: 250px;\n\tmargin: auto;\n}\n\n#options #font-family-container > div, #options-medium #font-family-container > div {\n\ttext-align : left;\n\tpadding-left: 35px;\n}\n\n#options label {\n\twidth: 50%;\n}\n\n/*\nTOP\n*/\n#top {\n\tposition: absolute;\n\ttop: 0px;\n\tbox-sizing: border-box;\n\t-webkit-box-sizing: border-box;\n\t-moz-box-sizing: border-box;\n\tpadding-top: 12px;\n\ttext-align: center;\n\twidth: 100%;\n\theight: 30px;\n}\n\n#top .wb-current-section-title {\n\tdisplay: inline-block;\n\twidth: 80%;\n\twhite-space: nowrap;\n\tfont-size: 0.85em;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\t-o-text-overflow: ellipsis;\n\topacity: 1;\n\ttransition: opacity 0.4s;\n\t-webkit-transition: opacity 0.4s;\n\t-moz-transition: opacity 0.4s;\n\t-o-transition: opacity 0.4s;\n}\n\n/*\nBOTTOM\n*/\n#bottom {\n\tposition: absolute;\n\tbottom: 0px;\n\tdisplay: inline-block;\n\theight: 30px;\n\twidth: 100%;\n\ttext-align: center;\n\tbackground-color: transparent;\n}\n\n#bottom span {\n\tdisplay: inline-block;\n\tmin-width: 42px;\n\tmargin: 0px;\n\tmargin-top: 0px;\n\tfont-size: 1em;\n\tbackground-color: transparent;\n\tmin-width: 25px;\n\theight: 100%;\n\tpadding: 0px 16px 0px 16px;\n\topacity: 1;\n\ttransition: opacity 0.4s;\n\t-webkit-transition: opacity 0.4s;\n\t-moz-transition: opacity 0.4s;\n\t-o-transition: opacity 0.4s;\n}\n\n/*\nTEXT\n*/\n[data-wb-text] {\n\tfont-size: 14px;\n\tline-height: 1.5em;\n\ttext-align: justify;\n\ttext-justify: inter-word;\n\topacity: 1;\n\ttransition: opacity 0.4s;\n\t-webkit-transition: opacity 0.4s;\n\t-moz-transition: opacity 0.4s;\n\t-o-transition: opacity 0.4s;\n}\n\n@media screen and (min-width: 768px) {\n    [data-wb-text] {\n        font-size: 16px;\n        line-height: 1.5em;\n    }\n}\n\n[data-wb-text] p {\n\tmargin-bottom: 0px;\n\tmargin-top: 0px;\n\ttext-indent: 1.5em;\n}\n\n/*\nINSIDE TEXT\n*/\n/*\nTITLES\n*/\np.section-title, p.notes-title, p.wb-toc-title {\n\tfont-size: 1.25em;\n\ttext-align: left;\n\ttext-indent: 0px;\n}\n\np.notes-title {\n\tborder-bottom: 1px solid black;\n\tmargin-bottom: 0.5em;\n}\n\np.section-title {\n\tpadding-top: 3.5em;\n\tmargin-top: 0px;\n\tmargin-bottom: 1.5em;\n\ttext-indent: 0px;\n\tline-height: 2em;\n}\n\np.section-subtitle {\n\tfont-size: 1em;\n\ttext-indent: 0px;\n\tmargin-bottom: 1.5em;\n}\n\n#cover.wb-section {\n\ttext-align: center;\n}\n\n#cover-author, #cover-title, #cover-logo {\n\tmargin: 0px;\n\ttext-indent: 0px;\n}\n\np.note {\n\ttext-indent: 0px;\n}\n\n#fin {\n\ttext-align: center;\n\t\n}\n\n#fin p {\n\tpadding-top: 20%;\n\ttext-indent: 0px;\n}\n", ""]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function (window, document, exportName, undefined) {
    'use strict';

    var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
    var TEST_ELEMENT = document.createElement('div');

    var TYPE_FUNCTION = 'function';

    var round = Math.round;
    var abs = Math.abs;
    var now = Date.now;

    /**
     * set a timeout with a given scope
     * @param {Function} fn
     * @param {Number} timeout
     * @param {Object} context
     * @returns {number}
     */
    function setTimeoutContext(fn, timeout, context) {
        return setTimeout(bindFn(fn, context), timeout);
    }

    /**
     * if the argument is an array, we want to execute the fn on each entry
     * if it aint an array we don't want to do a thing.
     * this is used by all the methods that accept a single and array argument.
     * @param {*|Array} arg
     * @param {String} fn
     * @param {Object} [context]
     * @returns {Boolean}
     */
    function invokeArrayArg(arg, fn, context) {
        if (Array.isArray(arg)) {
            each(arg, context[fn], context);
            return true;
        }
        return false;
    }

    /**
     * walk objects and arrays
     * @param {Object} obj
     * @param {Function} iterator
     * @param {Object} context
     */
    function each(obj, iterator, context) {
        var i;

        if (!obj) {
            return;
        }

        if (obj.forEach) {
            obj.forEach(iterator, context);
        } else if (obj.length !== undefined) {
            i = 0;
            while (i < obj.length) {
                iterator.call(context, obj[i], i, obj);
                i++;
            }
        } else {
            for (i in obj) {
                obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
            }
        }
    }

    /**
     * wrap a method with a deprecation warning and stack trace
     * @param {Function} method
     * @param {String} name
     * @param {String} message
     * @returns {Function} A new function wrapping the supplied method.
     */
    function deprecate(method, name, message) {
        var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
        return function () {
            var e = new Error('get-stack-trace');
            var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

            var log = window.console && (window.console.warn || window.console.log);
            if (log) {
                log.call(window.console, deprecationMessage, stack);
            }
            return method.apply(this, arguments);
        };
    }

    /**
     * extend object.
     * means that properties in dest will be overwritten by the ones in src.
     * @param {Object} target
     * @param {...Object} objects_to_assign
     * @returns {Object} target
     */
    var assign;
    if (typeof Object.assign !== 'function') {
        assign = function assign(target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    } else {
        assign = Object.assign;
    }

    /**
     * extend object.
     * means that properties in dest will be overwritten by the ones in src.
     * @param {Object} dest
     * @param {Object} src
     * @param {Boolean} [merge=false]
     * @returns {Object} dest
     */
    var extend = deprecate(function extend(dest, src, merge) {
        var keys = Object.keys(src);
        var i = 0;
        while (i < keys.length) {
            if (!merge || merge && dest[keys[i]] === undefined) {
                dest[keys[i]] = src[keys[i]];
            }
            i++;
        }
        return dest;
    }, 'extend', 'Use `assign`.');

    /**
     * merge the values from src in the dest.
     * means that properties that exist in dest will not be overwritten by src
     * @param {Object} dest
     * @param {Object} src
     * @returns {Object} dest
     */
    var merge = deprecate(function merge(dest, src) {
        return extend(dest, src, true);
    }, 'merge', 'Use `assign`.');

    /**
     * simple class inheritance
     * @param {Function} child
     * @param {Function} base
     * @param {Object} [properties]
     */
    function inherit(child, base, properties) {
        var baseP = base.prototype,
            childP;

        childP = child.prototype = Object.create(baseP);
        childP.constructor = child;
        childP._super = baseP;

        if (properties) {
            assign(childP, properties);
        }
    }

    /**
     * simple function bind
     * @param {Function} fn
     * @param {Object} context
     * @returns {Function}
     */
    function bindFn(fn, context) {
        return function boundFn() {
            return fn.apply(context, arguments);
        };
    }

    /**
     * let a boolean value also be a function that must return a boolean
     * this first item in args will be used as the context
     * @param {Boolean|Function} val
     * @param {Array} [args]
     * @returns {Boolean}
     */
    function boolOrFn(val, args) {
        if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) == TYPE_FUNCTION) {
            return val.apply(args ? args[0] || undefined : undefined, args);
        }
        return val;
    }

    /**
     * use the val2 when val1 is undefined
     * @param {*} val1
     * @param {*} val2
     * @returns {*}
     */
    function ifUndefined(val1, val2) {
        return val1 === undefined ? val2 : val1;
    }

    /**
     * addEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */
    function addEventListeners(target, types, handler) {
        each(splitStr(types), function (type) {
            target.addEventListener(type, handler, false);
        });
    }

    /**
     * removeEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */
    function removeEventListeners(target, types, handler) {
        each(splitStr(types), function (type) {
            target.removeEventListener(type, handler, false);
        });
    }

    /**
     * find if a node is in the given parent
     * @method hasParent
     * @param {HTMLElement} node
     * @param {HTMLElement} parent
     * @return {Boolean} found
     */
    function hasParent(node, parent) {
        while (node) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    /**
     * small indexOf wrapper
     * @param {String} str
     * @param {String} find
     * @returns {Boolean} found
     */
    function inStr(str, find) {
        return str.indexOf(find) > -1;
    }

    /**
     * split string on whitespace
     * @param {String} str
     * @returns {Array} words
     */
    function splitStr(str) {
        return str.trim().split(/\s+/g);
    }

    /**
     * find if a array contains the object using indexOf or a simple polyFill
     * @param {Array} src
     * @param {String} find
     * @param {String} [findByKey]
     * @return {Boolean|Number} false when not found, or the index
     */
    function inArray(src, find, findByKey) {
        if (src.indexOf && !findByKey) {
            return src.indexOf(find);
        } else {
            var i = 0;
            while (i < src.length) {
                if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
                    return i;
                }
                i++;
            }
            return -1;
        }
    }

    /**
     * convert array-like objects to real arrays
     * @param {Object} obj
     * @returns {Array}
     */
    function toArray(obj) {
        return Array.prototype.slice.call(obj, 0);
    }

    /**
     * unique array with objects based on a key (like 'id') or just by the array's value
     * @param {Array} src [{id:1},{id:2},{id:1}]
     * @param {String} [key]
     * @param {Boolean} [sort=False]
     * @returns {Array} [{id:1},{id:2}]
     */
    function uniqueArray(src, key, sort) {
        var results = [];
        var values = [];
        var i = 0;

        while (i < src.length) {
            var val = key ? src[i][key] : src[i];
            if (inArray(values, val) < 0) {
                results.push(src[i]);
            }
            values[i] = val;
            i++;
        }

        if (sort) {
            if (!key) {
                results = results.sort();
            } else {
                results = results.sort(function sortUniqueArray(a, b) {
                    return a[key] > b[key];
                });
            }
        }

        return results;
    }

    /**
     * get the prefixed property
     * @param {Object} obj
     * @param {String} property
     * @returns {String|Undefined} prefixed
     */
    function prefixed(obj, property) {
        var prefix, prop;
        var camelProp = property[0].toUpperCase() + property.slice(1);

        var i = 0;
        while (i < VENDOR_PREFIXES.length) {
            prefix = VENDOR_PREFIXES[i];
            prop = prefix ? prefix + camelProp : property;

            if (prop in obj) {
                return prop;
            }
            i++;
        }
        return undefined;
    }

    /**
     * get a unique id
     * @returns {number} uniqueId
     */
    var _uniqueId = 1;
    function uniqueId() {
        return _uniqueId++;
    }

    /**
     * get the window object of an element
     * @param {HTMLElement} element
     * @returns {DocumentView|Window}
     */
    function getWindowForElement(element) {
        var doc = element.ownerDocument || element;
        return doc.defaultView || doc.parentWindow || window;
    }

    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

    var SUPPORT_TOUCH = 'ontouchstart' in window;
    var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

    var INPUT_TYPE_TOUCH = 'touch';
    var INPUT_TYPE_PEN = 'pen';
    var INPUT_TYPE_MOUSE = 'mouse';
    var INPUT_TYPE_KINECT = 'kinect';

    var COMPUTE_INTERVAL = 25;

    var INPUT_START = 1;
    var INPUT_MOVE = 2;
    var INPUT_END = 4;
    var INPUT_CANCEL = 8;

    var DIRECTION_NONE = 1;
    var DIRECTION_LEFT = 2;
    var DIRECTION_RIGHT = 4;
    var DIRECTION_UP = 8;
    var DIRECTION_DOWN = 16;

    var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
    var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
    var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

    var PROPS_XY = ['x', 'y'];
    var PROPS_CLIENT_XY = ['clientX', 'clientY'];

    /**
     * create new input type manager
     * @param {Manager} manager
     * @param {Function} callback
     * @returns {Input}
     * @constructor
     */
    function Input(manager, callback) {
        var self = this;
        this.manager = manager;
        this.callback = callback;
        this.element = manager.element;
        this.target = manager.options.inputTarget;

        // smaller wrapper around the handler, for the scope and the enabled state of the manager,
        // so when disabled the input events are completely bypassed.
        this.domHandler = function (ev) {
            if (boolOrFn(manager.options.enable, [manager])) {
                self.handler(ev);
            }
        };

        this.init();
    }

    Input.prototype = {
        /**
         * should handle the inputEvent data and trigger the callback
         * @virtual
         */
        handler: function handler() {},

        /**
         * bind the events
         */
        init: function init() {
            this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        },

        /**
         * unbind the events
         */
        destroy: function destroy() {
            this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        }
    };

    /**
     * create new input type manager
     * called by the Manager constructor
     * @param {Hammer} manager
     * @returns {Input}
     */
    function createInputInstance(manager) {
        var Type;
        var inputClass = manager.options.inputClass;

        if (inputClass) {
            Type = inputClass;
        } else if (SUPPORT_POINTER_EVENTS) {
            Type = PointerEventInput;
        } else if (SUPPORT_ONLY_TOUCH) {
            Type = TouchInput;
        } else if (!SUPPORT_TOUCH) {
            Type = MouseInput;
        } else {
            Type = TouchMouseInput;
        }
        return new Type(manager, inputHandler);
    }

    /**
     * handle input events
     * @param {Manager} manager
     * @param {String} eventType
     * @param {Object} input
     */
    function inputHandler(manager, eventType, input) {
        var pointersLen = input.pointers.length;
        var changedPointersLen = input.changedPointers.length;
        var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
        var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;

        input.isFirst = !!isFirst;
        input.isFinal = !!isFinal;

        if (isFirst) {
            manager.session = {};
        }

        // source event is the normalized value of the domEvents
        // like 'touchstart, mouseup, pointerdown'
        input.eventType = eventType;

        // compute scale, rotation etc
        computeInputData(manager, input);

        // emit secret event
        manager.emit('hammer.input', input);

        manager.recognize(input);
        manager.session.prevInput = input;
    }

    /**
     * extend the data with some usable properties like scale, rotate, velocity etc
     * @param {Object} manager
     * @param {Object} input
     */
    function computeInputData(manager, input) {
        var session = manager.session;
        var pointers = input.pointers;
        var pointersLength = pointers.length;

        // store the first input to calculate the distance and direction
        if (!session.firstInput) {
            session.firstInput = simpleCloneInputData(input);
        }

        // to compute scale and rotation we need to store the multiple touches
        if (pointersLength > 1 && !session.firstMultiple) {
            session.firstMultiple = simpleCloneInputData(input);
        } else if (pointersLength === 1) {
            session.firstMultiple = false;
        }

        var firstInput = session.firstInput;
        var firstMultiple = session.firstMultiple;
        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

        var center = input.center = getCenter(pointers);
        input.timeStamp = now();
        input.deltaTime = input.timeStamp - firstInput.timeStamp;

        input.angle = getAngle(offsetCenter, center);
        input.distance = getDistance(offsetCenter, center);

        computeDeltaXY(session, input);
        input.offsetDirection = getDirection(input.deltaX, input.deltaY);

        var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
        input.overallVelocityX = overallVelocity.x;
        input.overallVelocityY = overallVelocity.y;
        input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;

        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

        input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;

        computeIntervalInputData(session, input);

        // find the correct target
        var target = manager.element;
        if (hasParent(input.srcEvent.target, target)) {
            target = input.srcEvent.target;
        }
        input.target = target;
    }

    function computeDeltaXY(session, input) {
        var center = input.center;
        var offset = session.offsetDelta || {};
        var prevDelta = session.prevDelta || {};
        var prevInput = session.prevInput || {};

        if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
            prevDelta = session.prevDelta = {
                x: prevInput.deltaX || 0,
                y: prevInput.deltaY || 0
            };

            offset = session.offsetDelta = {
                x: center.x,
                y: center.y
            };
        }

        input.deltaX = prevDelta.x + (center.x - offset.x);
        input.deltaY = prevDelta.y + (center.y - offset.y);
    }

    /**
     * velocity is calculated every x ms
     * @param {Object} session
     * @param {Object} input
     */
    function computeIntervalInputData(session, input) {
        var last = session.lastInterval || input,
            deltaTime = input.timeStamp - last.timeStamp,
            velocity,
            velocityX,
            velocityY,
            direction;

        if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
            var deltaX = input.deltaX - last.deltaX;
            var deltaY = input.deltaY - last.deltaY;

            var v = getVelocity(deltaTime, deltaX, deltaY);
            velocityX = v.x;
            velocityY = v.y;
            velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
            direction = getDirection(deltaX, deltaY);

            session.lastInterval = input;
        } else {
            // use latest velocity info if it doesn't overtake a minimum period
            velocity = last.velocity;
            velocityX = last.velocityX;
            velocityY = last.velocityY;
            direction = last.direction;
        }

        input.velocity = velocity;
        input.velocityX = velocityX;
        input.velocityY = velocityY;
        input.direction = direction;
    }

    /**
     * create a simple clone from the input used for storage of firstInput and firstMultiple
     * @param {Object} input
     * @returns {Object} clonedInputData
     */
    function simpleCloneInputData(input) {
        // make a simple copy of the pointers because we will get a reference if we don't
        // we only need clientXY for the calculations
        var pointers = [];
        var i = 0;
        while (i < input.pointers.length) {
            pointers[i] = {
                clientX: round(input.pointers[i].clientX),
                clientY: round(input.pointers[i].clientY)
            };
            i++;
        }

        return {
            timeStamp: now(),
            pointers: pointers,
            center: getCenter(pointers),
            deltaX: input.deltaX,
            deltaY: input.deltaY
        };
    }

    /**
     * get the center of all the pointers
     * @param {Array} pointers
     * @return {Object} center contains `x` and `y` properties
     */
    function getCenter(pointers) {
        var pointersLength = pointers.length;

        // no need to loop when only one touch
        if (pointersLength === 1) {
            return {
                x: round(pointers[0].clientX),
                y: round(pointers[0].clientY)
            };
        }

        var x = 0,
            y = 0,
            i = 0;
        while (i < pointersLength) {
            x += pointers[i].clientX;
            y += pointers[i].clientY;
            i++;
        }

        return {
            x: round(x / pointersLength),
            y: round(y / pointersLength)
        };
    }

    /**
     * calculate the velocity between two points. unit is in px per ms.
     * @param {Number} deltaTime
     * @param {Number} x
     * @param {Number} y
     * @return {Object} velocity `x` and `y`
     */
    function getVelocity(deltaTime, x, y) {
        return {
            x: x / deltaTime || 0,
            y: y / deltaTime || 0
        };
    }

    /**
     * get the direction between two points
     * @param {Number} x
     * @param {Number} y
     * @return {Number} direction
     */
    function getDirection(x, y) {
        if (x === y) {
            return DIRECTION_NONE;
        }

        if (abs(x) >= abs(y)) {
            return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }
        return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
    }

    /**
     * calculate the absolute distance between two points
     * @param {Object} p1 {x, y}
     * @param {Object} p2 {x, y}
     * @param {Array} [props] containing x and y keys
     * @return {Number} distance
     */
    function getDistance(p1, p2, props) {
        if (!props) {
            props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];

        return Math.sqrt(x * x + y * y);
    }

    /**
     * calculate the angle between two coordinates
     * @param {Object} p1
     * @param {Object} p2
     * @param {Array} [props] containing x and y keys
     * @return {Number} angle
     */
    function getAngle(p1, p2, props) {
        if (!props) {
            props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];
        return Math.atan2(y, x) * 180 / Math.PI;
    }

    /**
     * calculate the rotation degrees between two pointersets
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} rotation
     */
    function getRotation(start, end) {
        return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
    }

    /**
     * calculate the scale factor between two pointersets
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} scale
     */
    function getScale(start, end) {
        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
    }

    var MOUSE_INPUT_MAP = {
        mousedown: INPUT_START,
        mousemove: INPUT_MOVE,
        mouseup: INPUT_END
    };

    var MOUSE_ELEMENT_EVENTS = 'mousedown';
    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

    /**
     * Mouse events input
     * @constructor
     * @extends Input
     */
    function MouseInput() {
        this.evEl = MOUSE_ELEMENT_EVENTS;
        this.evWin = MOUSE_WINDOW_EVENTS;

        this.pressed = false; // mousedown state

        Input.apply(this, arguments);
    }

    inherit(MouseInput, Input, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function MEhandler(ev) {
            var eventType = MOUSE_INPUT_MAP[ev.type];

            // on start we want to have the left mouse button down
            if (eventType & INPUT_START && ev.button === 0) {
                this.pressed = true;
            }

            if (eventType & INPUT_MOVE && ev.which !== 1) {
                eventType = INPUT_END;
            }

            // mouse must be down
            if (!this.pressed) {
                return;
            }

            if (eventType & INPUT_END) {
                this.pressed = false;
            }

            this.callback(this.manager, eventType, {
                pointers: [ev],
                changedPointers: [ev],
                pointerType: INPUT_TYPE_MOUSE,
                srcEvent: ev
            });
        }
    });

    var POINTER_INPUT_MAP = {
        pointerdown: INPUT_START,
        pointermove: INPUT_MOVE,
        pointerup: INPUT_END,
        pointercancel: INPUT_CANCEL,
        pointerout: INPUT_CANCEL
    };

    // in IE10 the pointer types is defined as an enum
    var IE10_POINTER_TYPE_ENUM = {
        2: INPUT_TYPE_TOUCH,
        3: INPUT_TYPE_PEN,
        4: INPUT_TYPE_MOUSE,
        5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
    };

    var POINTER_ELEMENT_EVENTS = 'pointerdown';
    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

    // IE10 has prefixed support, and case-sensitive
    if (window.MSPointerEvent && !window.PointerEvent) {
        POINTER_ELEMENT_EVENTS = 'MSPointerDown';
        POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
    }

    /**
     * Pointer events input
     * @constructor
     * @extends Input
     */
    function PointerEventInput() {
        this.evEl = POINTER_ELEMENT_EVENTS;
        this.evWin = POINTER_WINDOW_EVENTS;

        Input.apply(this, arguments);

        this.store = this.manager.session.pointerEvents = [];
    }

    inherit(PointerEventInput, Input, {
        /**
         * handle mouse events
         * @param {Object} ev
         */
        handler: function PEhandler(ev) {
            var store = this.store;
            var removePointer = false;

            var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
            var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
            var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

            var isTouch = pointerType == INPUT_TYPE_TOUCH;

            // get index of the event in the store
            var storeIndex = inArray(store, ev.pointerId, 'pointerId');

            // start and mouse must be down
            if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
                if (storeIndex < 0) {
                    store.push(ev);
                    storeIndex = store.length - 1;
                }
            } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
                removePointer = true;
            }

            // it not found, so the pointer hasn't been down (so it's probably a hover)
            if (storeIndex < 0) {
                return;
            }

            // update the event in the store
            store[storeIndex] = ev;

            this.callback(this.manager, eventType, {
                pointers: store,
                changedPointers: [ev],
                pointerType: pointerType,
                srcEvent: ev
            });

            if (removePointer) {
                // remove from the store
                store.splice(storeIndex, 1);
            }
        }
    });

    var SINGLE_TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };

    var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
    var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

    /**
     * Touch events input
     * @constructor
     * @extends Input
     */
    function SingleTouchInput() {
        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
        this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
        this.started = false;

        Input.apply(this, arguments);
    }

    inherit(SingleTouchInput, Input, {
        handler: function TEhandler(ev) {
            var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

            // should we handle the touch events?
            if (type === INPUT_START) {
                this.started = true;
            }

            if (!this.started) {
                return;
            }

            var touches = normalizeSingleTouches.call(this, ev, type);

            // when done, reset the started state
            if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
                this.started = false;
            }

            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    });

    /**
     * @this {TouchInput}
     * @param {Object} ev
     * @param {Number} type flag
     * @returns {undefined|Array} [all, changed]
     */
    function normalizeSingleTouches(ev, type) {
        var all = toArray(ev.touches);
        var changed = toArray(ev.changedTouches);

        if (type & (INPUT_END | INPUT_CANCEL)) {
            all = uniqueArray(all.concat(changed), 'identifier', true);
        }

        return [all, changed];
    }

    var TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };

    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

    /**
     * Multi-user touch events input
     * @constructor
     * @extends Input
     */
    function TouchInput() {
        this.evTarget = TOUCH_TARGET_EVENTS;
        this.targetIds = {};

        Input.apply(this, arguments);
    }

    inherit(TouchInput, Input, {
        handler: function MTEhandler(ev) {
            var type = TOUCH_INPUT_MAP[ev.type];
            var touches = getTouches.call(this, ev, type);
            if (!touches) {
                return;
            }

            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    });

    /**
     * @this {TouchInput}
     * @param {Object} ev
     * @param {Number} type flag
     * @returns {undefined|Array} [all, changed]
     */
    function getTouches(ev, type) {
        var allTouches = toArray(ev.touches);
        var targetIds = this.targetIds;

        // when there is only one touch, the process can be simplified
        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
            targetIds[allTouches[0].identifier] = true;
            return [allTouches, allTouches];
        }

        var i,
            targetTouches,
            changedTouches = toArray(ev.changedTouches),
            changedTargetTouches = [],
            target = this.target;

        // get target touches from touches
        targetTouches = allTouches.filter(function (touch) {
            return hasParent(touch.target, target);
        });

        // collect touches
        if (type === INPUT_START) {
            i = 0;
            while (i < targetTouches.length) {
                targetIds[targetTouches[i].identifier] = true;
                i++;
            }
        }

        // filter changed touches to only contain touches that exist in the collected target ids
        i = 0;
        while (i < changedTouches.length) {
            if (targetIds[changedTouches[i].identifier]) {
                changedTargetTouches.push(changedTouches[i]);
            }

            // cleanup removed touches
            if (type & (INPUT_END | INPUT_CANCEL)) {
                delete targetIds[changedTouches[i].identifier];
            }
            i++;
        }

        if (!changedTargetTouches.length) {
            return;
        }

        return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
    }

    /**
     * Combined touch and mouse input
     *
     * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
     * This because touch devices also emit mouse events while doing a touch.
     *
     * @constructor
     * @extends Input
     */

    var DEDUP_TIMEOUT = 2500;
    var DEDUP_DISTANCE = 25;

    function TouchMouseInput() {
        Input.apply(this, arguments);

        var handler = bindFn(this.handler, this);
        this.touch = new TouchInput(this.manager, handler);
        this.mouse = new MouseInput(this.manager, handler);

        this.primaryTouch = null;
        this.lastTouches = [];
    }

    inherit(TouchMouseInput, Input, {
        /**
         * handle mouse and touch events
         * @param {Hammer} manager
         * @param {String} inputEvent
         * @param {Object} inputData
         */
        handler: function TMEhandler(manager, inputEvent, inputData) {
            var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
                isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

            if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
                return;
            }

            // when we're in a touch event, record touches to  de-dupe synthetic mouse event
            if (isTouch) {
                recordTouches.call(this, inputEvent, inputData);
            } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
                return;
            }

            this.callback(manager, inputEvent, inputData);
        },

        /**
         * remove the event listeners
         */
        destroy: function destroy() {
            this.touch.destroy();
            this.mouse.destroy();
        }
    });

    function recordTouches(eventType, eventData) {
        if (eventType & INPUT_START) {
            this.primaryTouch = eventData.changedPointers[0].identifier;
            setLastTouch.call(this, eventData);
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            setLastTouch.call(this, eventData);
        }
    }

    function setLastTouch(eventData) {
        var touch = eventData.changedPointers[0];

        if (touch.identifier === this.primaryTouch) {
            var lastTouch = { x: touch.clientX, y: touch.clientY };
            this.lastTouches.push(lastTouch);
            var lts = this.lastTouches;
            var removeLastTouch = function removeLastTouch() {
                var i = lts.indexOf(lastTouch);
                if (i > -1) {
                    lts.splice(i, 1);
                }
            };
            setTimeout(removeLastTouch, DEDUP_TIMEOUT);
        }
    }

    function isSyntheticEvent(eventData) {
        var x = eventData.srcEvent.clientX,
            y = eventData.srcEvent.clientY;
        for (var i = 0; i < this.lastTouches.length; i++) {
            var t = this.lastTouches[i];
            var dx = Math.abs(x - t.x),
                dy = Math.abs(y - t.y);
            if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
                return true;
            }
        }
        return false;
    }

    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

    // magical touchAction value
    var TOUCH_ACTION_COMPUTE = 'compute';
    var TOUCH_ACTION_AUTO = 'auto';
    var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
    var TOUCH_ACTION_NONE = 'none';
    var TOUCH_ACTION_PAN_X = 'pan-x';
    var TOUCH_ACTION_PAN_Y = 'pan-y';
    var TOUCH_ACTION_MAP = getTouchActionProps();

    /**
     * Touch Action
     * sets the touchAction property or uses the js alternative
     * @param {Manager} manager
     * @param {String} value
     * @constructor
     */
    function TouchAction(manager, value) {
        this.manager = manager;
        this.set(value);
    }

    TouchAction.prototype = {
        /**
         * set the touchAction value on the element or enable the polyfill
         * @param {String} value
         */
        set: function set(value) {
            // find out the touch-action by the event handlers
            if (value == TOUCH_ACTION_COMPUTE) {
                value = this.compute();
            }

            if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
                this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
            }
            this.actions = value.toLowerCase().trim();
        },

        /**
         * just re-set the touchAction value
         */
        update: function update() {
            this.set(this.manager.options.touchAction);
        },

        /**
         * compute the value for the touchAction property based on the recognizer's settings
         * @returns {String} value
         */
        compute: function compute() {
            var actions = [];
            each(this.manager.recognizers, function (recognizer) {
                if (boolOrFn(recognizer.options.enable, [recognizer])) {
                    actions = actions.concat(recognizer.getTouchAction());
                }
            });
            return cleanTouchActions(actions.join(' '));
        },

        /**
         * this method is called on each input cycle and provides the preventing of the browser behavior
         * @param {Object} input
         */
        preventDefaults: function preventDefaults(input) {
            var srcEvent = input.srcEvent;
            var direction = input.offsetDirection;

            // if the touch action did prevented once this session
            if (this.manager.session.prevented) {
                srcEvent.preventDefault();
                return;
            }

            var actions = this.actions;
            var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

            if (hasNone) {
                //do not prevent defaults if this is a tap gesture

                var isTapPointer = input.pointers.length === 1;
                var isTapMovement = input.distance < 2;
                var isTapTouchTime = input.deltaTime < 250;

                if (isTapPointer && isTapMovement && isTapTouchTime) {
                    return;
                }
            }

            if (hasPanX && hasPanY) {
                // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
                return;
            }

            if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
                return this.preventSrc(srcEvent);
            }
        },

        /**
         * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
         * @param {Object} srcEvent
         */
        preventSrc: function preventSrc(srcEvent) {
            this.manager.session.prevented = true;
            srcEvent.preventDefault();
        }
    };

    /**
     * when the touchActions are collected they are not a valid value, so we need to clean things up. *
     * @param {String} actions
     * @returns {*}
     */
    function cleanTouchActions(actions) {
        // none
        if (inStr(actions, TOUCH_ACTION_NONE)) {
            return TOUCH_ACTION_NONE;
        }

        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

        // if both pan-x and pan-y are set (different recognizers
        // for different directions, e.g. horizontal pan but vertical swipe?)
        // we need none (as otherwise with pan-x pan-y combined none of these
        // recognizers will work, since the browser would handle all panning
        if (hasPanX && hasPanY) {
            return TOUCH_ACTION_NONE;
        }

        // pan-x OR pan-y
        if (hasPanX || hasPanY) {
            return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
        }

        // manipulation
        if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
            return TOUCH_ACTION_MANIPULATION;
        }

        return TOUCH_ACTION_AUTO;
    }

    function getTouchActionProps() {
        if (!NATIVE_TOUCH_ACTION) {
            return false;
        }
        var touchMap = {};
        var cssSupports = window.CSS && window.CSS.supports;
        ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {

            // If css.supports is not supported but there is native touch-action assume it supports
            // all values. This is the case for IE 10 and 11.
            touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
        });
        return touchMap;
    }

    /**
     * Recognizer flow explained; *
     * All recognizers have the initial state of POSSIBLE when a input session starts.
     * The definition of a input session is from the first input until the last input, with all it's movement in it. *
     * Example session for mouse-input: mousedown -> mousemove -> mouseup
     *
     * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
     * which determines with state it should be.
     *
     * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
     * POSSIBLE to give it another change on the next cycle.
     *
     *               Possible
     *                  |
     *            +-----+---------------+
     *            |                     |
     *      +-----+-----+               |
     *      |           |               |
     *   Failed      Cancelled          |
     *                          +-------+------+
     *                          |              |
     *                      Recognized       Began
     *                                         |
     *                                      Changed
     *                                         |
     *                                  Ended/Recognized
     */
    var STATE_POSSIBLE = 1;
    var STATE_BEGAN = 2;
    var STATE_CHANGED = 4;
    var STATE_ENDED = 8;
    var STATE_RECOGNIZED = STATE_ENDED;
    var STATE_CANCELLED = 16;
    var STATE_FAILED = 32;

    /**
     * Recognizer
     * Every recognizer needs to extend from this class.
     * @constructor
     * @param {Object} options
     */
    function Recognizer(options) {
        this.options = assign({}, this.defaults, options || {});

        this.id = uniqueId();

        this.manager = null;

        // default is enable true
        this.options.enable = ifUndefined(this.options.enable, true);

        this.state = STATE_POSSIBLE;

        this.simultaneous = {};
        this.requireFail = [];
    }

    Recognizer.prototype = {
        /**
         * @virtual
         * @type {Object}
         */
        defaults: {},

        /**
         * set options
         * @param {Object} options
         * @return {Recognizer}
         */
        set: function set(options) {
            assign(this.options, options);

            // also update the touchAction, in case something changed about the directions/enabled state
            this.manager && this.manager.touchAction.update();
            return this;
        },

        /**
         * recognize simultaneous with an other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        recognizeWith: function recognizeWith(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
                return this;
            }

            var simultaneous = this.simultaneous;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (!simultaneous[otherRecognizer.id]) {
                simultaneous[otherRecognizer.id] = otherRecognizer;
                otherRecognizer.recognizeWith(this);
            }
            return this;
        },

        /**
         * drop the simultaneous link. it doesnt remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
                return this;
            }

            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            delete this.simultaneous[otherRecognizer.id];
            return this;
        },

        /**
         * recognizer can only run when an other is failing
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        requireFailure: function requireFailure(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
                return this;
            }

            var requireFail = this.requireFail;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (inArray(requireFail, otherRecognizer) === -1) {
                requireFail.push(otherRecognizer);
                otherRecognizer.requireFailure(this);
            }
            return this;
        },

        /**
         * drop the requireFailure link. it does not remove the link on the other recognizer.
         * @param {Recognizer} otherRecognizer
         * @returns {Recognizer} this
         */
        dropRequireFailure: function dropRequireFailure(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
                return this;
            }

            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            var index = inArray(this.requireFail, otherRecognizer);
            if (index > -1) {
                this.requireFail.splice(index, 1);
            }
            return this;
        },

        /**
         * has require failures boolean
         * @returns {boolean}
         */
        hasRequireFailures: function hasRequireFailures() {
            return this.requireFail.length > 0;
        },

        /**
         * if the recognizer can recognize simultaneous with an other recognizer
         * @param {Recognizer} otherRecognizer
         * @returns {Boolean}
         */
        canRecognizeWith: function canRecognizeWith(otherRecognizer) {
            return !!this.simultaneous[otherRecognizer.id];
        },

        /**
         * You should use `tryEmit` instead of `emit` directly to check
         * that all the needed recognizers has failed before emitting.
         * @param {Object} input
         */
        emit: function emit(input) {
            var self = this;
            var state = this.state;

            function emit(event) {
                self.manager.emit(event, input);
            }

            // 'panstart' and 'panmove'
            if (state < STATE_ENDED) {
                emit(self.options.event + stateStr(state));
            }

            emit(self.options.event); // simple 'eventName' events

            if (input.additionalEvent) {
                // additional event(panleft, panright, pinchin, pinchout...)
                emit(input.additionalEvent);
            }

            // panend and pancancel
            if (state >= STATE_ENDED) {
                emit(self.options.event + stateStr(state));
            }
        },

        /**
         * Check that all the require failure recognizers has failed,
         * if true, it emits a gesture event,
         * otherwise, setup the state to FAILED.
         * @param {Object} input
         */
        tryEmit: function tryEmit(input) {
            if (this.canEmit()) {
                return this.emit(input);
            }
            // it's failing anyway
            this.state = STATE_FAILED;
        },

        /**
         * can we emit?
         * @returns {boolean}
         */
        canEmit: function canEmit() {
            var i = 0;
            while (i < this.requireFail.length) {
                if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                    return false;
                }
                i++;
            }
            return true;
        },

        /**
         * update the recognizer
         * @param {Object} inputData
         */
        recognize: function recognize(inputData) {
            // make a new copy of the inputData
            // so we can change the inputData without messing up the other recognizers
            var inputDataClone = assign({}, inputData);

            // is is enabled and allow recognizing?
            if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
                this.reset();
                this.state = STATE_FAILED;
                return;
            }

            // reset when we've reached the end
            if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
                this.state = STATE_POSSIBLE;
            }

            this.state = this.process(inputDataClone);

            // the recognizer has recognized a gesture
            // so trigger an event
            if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
                this.tryEmit(inputDataClone);
            }
        },

        /**
         * return the state of the recognizer
         * the actual recognizing happens in this method
         * @virtual
         * @param {Object} inputData
         * @returns {Const} STATE
         */
        process: function process(inputData) {}, // jshint ignore:line

        /**
         * return the preferred touch-action
         * @virtual
         * @returns {Array}
         */
        getTouchAction: function getTouchAction() {},

        /**
         * called when the gesture isn't allowed to recognize
         * like when another is being recognized or it is disabled
         * @virtual
         */
        reset: function reset() {}
    };

    /**
     * get a usable string, used as event postfix
     * @param {Const} state
     * @returns {String} state
     */
    function stateStr(state) {
        if (state & STATE_CANCELLED) {
            return 'cancel';
        } else if (state & STATE_ENDED) {
            return 'end';
        } else if (state & STATE_CHANGED) {
            return 'move';
        } else if (state & STATE_BEGAN) {
            return 'start';
        }
        return '';
    }

    /**
     * direction cons to string
     * @param {Const} direction
     * @returns {String}
     */
    function directionStr(direction) {
        if (direction == DIRECTION_DOWN) {
            return 'down';
        } else if (direction == DIRECTION_UP) {
            return 'up';
        } else if (direction == DIRECTION_LEFT) {
            return 'left';
        } else if (direction == DIRECTION_RIGHT) {
            return 'right';
        }
        return '';
    }

    /**
     * get a recognizer by name if it is bound to a manager
     * @param {Recognizer|String} otherRecognizer
     * @param {Recognizer} recognizer
     * @returns {Recognizer}
     */
    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
        var manager = recognizer.manager;
        if (manager) {
            return manager.get(otherRecognizer);
        }
        return otherRecognizer;
    }

    /**
     * This recognizer is just used as a base for the simple attribute recognizers.
     * @constructor
     * @extends Recognizer
     */
    function AttrRecognizer() {
        Recognizer.apply(this, arguments);
    }

    inherit(AttrRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof AttrRecognizer
         */
        defaults: {
            /**
             * @type {Number}
             * @default 1
             */
            pointers: 1
        },

        /**
         * Used to check if it the recognizer receives valid input, like input.distance > 10.
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {Boolean} recognized
         */
        attrTest: function attrTest(input) {
            var optionPointers = this.options.pointers;
            return optionPointers === 0 || input.pointers.length === optionPointers;
        },

        /**
         * Process the input and return the state for the recognizer
         * @memberof AttrRecognizer
         * @param {Object} input
         * @returns {*} State
         */
        process: function process(input) {
            var state = this.state;
            var eventType = input.eventType;

            var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
            var isValid = this.attrTest(input);

            // on cancel input and we've recognized before, return STATE_CANCELLED
            if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
                return state | STATE_CANCELLED;
            } else if (isRecognized || isValid) {
                if (eventType & INPUT_END) {
                    return state | STATE_ENDED;
                } else if (!(state & STATE_BEGAN)) {
                    return STATE_BEGAN;
                }
                return state | STATE_CHANGED;
            }
            return STATE_FAILED;
        }
    });

    /**
     * Pan
     * Recognized when the pointer is down and moved in the allowed direction.
     * @constructor
     * @extends AttrRecognizer
     */
    function PanRecognizer() {
        AttrRecognizer.apply(this, arguments);

        this.pX = null;
        this.pY = null;
    }

    inherit(PanRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PanRecognizer
         */
        defaults: {
            event: 'pan',
            threshold: 10,
            pointers: 1,
            direction: DIRECTION_ALL
        },

        getTouchAction: function getTouchAction() {
            var direction = this.options.direction;
            var actions = [];
            if (direction & DIRECTION_HORIZONTAL) {
                actions.push(TOUCH_ACTION_PAN_Y);
            }
            if (direction & DIRECTION_VERTICAL) {
                actions.push(TOUCH_ACTION_PAN_X);
            }
            return actions;
        },

        directionTest: function directionTest(input) {
            var options = this.options;
            var hasMoved = true;
            var distance = input.distance;
            var direction = input.direction;
            var x = input.deltaX;
            var y = input.deltaY;

            // lock to axis?
            if (!(direction & options.direction)) {
                if (options.direction & DIRECTION_HORIZONTAL) {
                    direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
                    hasMoved = x != this.pX;
                    distance = Math.abs(input.deltaX);
                } else {
                    direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
                    hasMoved = y != this.pY;
                    distance = Math.abs(input.deltaY);
                }
            }
            input.direction = direction;
            return hasMoved && distance > options.threshold && direction & options.direction;
        },

        attrTest: function attrTest(input) {
            return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
        },

        emit: function emit(input) {

            this.pX = input.deltaX;
            this.pY = input.deltaY;

            var direction = directionStr(input.direction);

            if (direction) {
                input.additionalEvent = this.options.event + direction;
            }
            this._super.emit.call(this, input);
        }
    });

    /**
     * Pinch
     * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
     * @constructor
     * @extends AttrRecognizer
     */
    function PinchRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(PinchRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
            event: 'pinch',
            threshold: 0,
            pointers: 2
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_NONE];
        },

        attrTest: function attrTest(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
        },

        emit: function emit(input) {
            if (input.scale !== 1) {
                var inOut = input.scale < 1 ? 'in' : 'out';
                input.additionalEvent = this.options.event + inOut;
            }
            this._super.emit.call(this, input);
        }
    });

    /**
     * Press
     * Recognized when the pointer is down for x ms without any movement.
     * @constructor
     * @extends Recognizer
     */
    function PressRecognizer() {
        Recognizer.apply(this, arguments);

        this._timer = null;
        this._input = null;
    }

    inherit(PressRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PressRecognizer
         */
        defaults: {
            event: 'press',
            pointers: 1,
            time: 251, // minimal time of the pointer to be pressed
            threshold: 9 // a minimal movement is ok, but keep it low
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_AUTO];
        },

        process: function process(input) {
            var options = this.options;
            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTime = input.deltaTime > options.time;

            this._input = input;

            // we only allow little movement
            // and we've reached an end event, so a tap is possible
            if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
                this.reset();
            } else if (input.eventType & INPUT_START) {
                this.reset();
                this._timer = setTimeoutContext(function () {
                    this.state = STATE_RECOGNIZED;
                    this.tryEmit();
                }, options.time, this);
            } else if (input.eventType & INPUT_END) {
                return STATE_RECOGNIZED;
            }
            return STATE_FAILED;
        },

        reset: function reset() {
            clearTimeout(this._timer);
        },

        emit: function emit(input) {
            if (this.state !== STATE_RECOGNIZED) {
                return;
            }

            if (input && input.eventType & INPUT_END) {
                this.manager.emit(this.options.event + 'up', input);
            } else {
                this._input.timeStamp = now();
                this.manager.emit(this.options.event, this._input);
            }
        }
    });

    /**
     * Rotate
     * Recognized when two or more pointer are moving in a circular motion.
     * @constructor
     * @extends AttrRecognizer
     */
    function RotateRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(RotateRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof RotateRecognizer
         */
        defaults: {
            event: 'rotate',
            threshold: 0,
            pointers: 2
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_NONE];
        },

        attrTest: function attrTest(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
        }
    });

    /**
     * Swipe
     * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
     * @constructor
     * @extends AttrRecognizer
     */
    function SwipeRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }

    inherit(SwipeRecognizer, AttrRecognizer, {
        /**
         * @namespace
         * @memberof SwipeRecognizer
         */
        defaults: {
            event: 'swipe',
            threshold: 10,
            velocity: 0.3,
            direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
            pointers: 1
        },

        getTouchAction: function getTouchAction() {
            return PanRecognizer.prototype.getTouchAction.call(this);
        },

        attrTest: function attrTest(input) {
            var direction = this.options.direction;
            var velocity;

            if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
                velocity = input.overallVelocity;
            } else if (direction & DIRECTION_HORIZONTAL) {
                velocity = input.overallVelocityX;
            } else if (direction & DIRECTION_VERTICAL) {
                velocity = input.overallVelocityY;
            }

            return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
        },

        emit: function emit(input) {
            var direction = directionStr(input.offsetDirection);
            if (direction) {
                this.manager.emit(this.options.event + direction, input);
            }

            this.manager.emit(this.options.event, input);
        }
    });

    /**
     * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
     * between the given interval and position. The delay option can be used to recognize multi-taps without firing
     * a single tap.
     *
     * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
     * multi-taps being recognized.
     * @constructor
     * @extends Recognizer
     */
    function TapRecognizer() {
        Recognizer.apply(this, arguments);

        // previous time and center,
        // used for tap counting
        this.pTime = false;
        this.pCenter = false;

        this._timer = null;
        this._input = null;
        this.count = 0;
    }

    inherit(TapRecognizer, Recognizer, {
        /**
         * @namespace
         * @memberof PinchRecognizer
         */
        defaults: {
            event: 'tap',
            pointers: 1,
            taps: 1,
            interval: 300, // max time between the multi-tap taps
            time: 250, // max time of the pointer to be down (like finger on the screen)
            threshold: 9, // a minimal movement is ok, but keep it low
            posThreshold: 10 // a multi-tap can be a bit off the initial position
        },

        getTouchAction: function getTouchAction() {
            return [TOUCH_ACTION_MANIPULATION];
        },

        process: function process(input) {
            var options = this.options;

            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTouchTime = input.deltaTime < options.time;

            this.reset();

            if (input.eventType & INPUT_START && this.count === 0) {
                return this.failTimeout();
            }

            // we only allow little movement
            // and we've reached an end event, so a tap is possible
            if (validMovement && validTouchTime && validPointers) {
                if (input.eventType != INPUT_END) {
                    return this.failTimeout();
                }

                var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
                var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

                this.pTime = input.timeStamp;
                this.pCenter = input.center;

                if (!validMultiTap || !validInterval) {
                    this.count = 1;
                } else {
                    this.count += 1;
                }

                this._input = input;

                // if tap count matches we have recognized it,
                // else it has began recognizing...
                var tapCount = this.count % options.taps;
                if (tapCount === 0) {
                    // no failing requirements, immediately trigger the tap event
                    // or wait as long as the multitap interval to trigger
                    if (!this.hasRequireFailures()) {
                        return STATE_RECOGNIZED;
                    } else {
                        this._timer = setTimeoutContext(function () {
                            this.state = STATE_RECOGNIZED;
                            this.tryEmit();
                        }, options.interval, this);
                        return STATE_BEGAN;
                    }
                }
            }
            return STATE_FAILED;
        },

        failTimeout: function failTimeout() {
            this._timer = setTimeoutContext(function () {
                this.state = STATE_FAILED;
            }, this.options.interval, this);
            return STATE_FAILED;
        },

        reset: function reset() {
            clearTimeout(this._timer);
        },

        emit: function emit() {
            if (this.state == STATE_RECOGNIZED) {
                this._input.tapCount = this.count;
                this.manager.emit(this.options.event, this._input);
            }
        }
    });

    /**
     * Simple way to create a manager with a default set of recognizers.
     * @param {HTMLElement} element
     * @param {Object} [options]
     * @constructor
     */
    function Hammer(element, options) {
        options = options || {};
        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
        return new Manager(element, options);
    }

    /**
     * @const {string}
     */
    Hammer.VERSION = '2.0.7';

    /**
     * default settings
     * @namespace
     */
    Hammer.defaults = {
        /**
         * set if DOM events are being triggered.
         * But this is slower and unused by simple implementations, so disabled by default.
         * @type {Boolean}
         * @default false
         */
        domEvents: false,

        /**
         * The value for the touchAction property/fallback.
         * When set to `compute` it will magically set the correct value based on the added recognizers.
         * @type {String}
         * @default compute
         */
        touchAction: TOUCH_ACTION_COMPUTE,

        /**
         * @type {Boolean}
         * @default true
         */
        enable: true,

        /**
         * EXPERIMENTAL FEATURE -- can be removed/changed
         * Change the parent input target element.
         * If Null, then it is being set the to main element.
         * @type {Null|EventTarget}
         * @default null
         */
        inputTarget: null,

        /**
         * force an input class
         * @type {Null|Function}
         * @default null
         */
        inputClass: null,

        /**
         * Default recognizer setup when calling `Hammer()`
         * When creating a new Manager these will be skipped.
         * @type {Array}
         */
        preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, { enable: false }], [PinchRecognizer, { enable: false }, ['rotate']], [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }], [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']], [TapRecognizer], [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']], [PressRecognizer]],

        /**
         * Some CSS properties can be used to improve the working of Hammer.
         * Add them to this method and they will be set when creating a new Manager.
         * @namespace
         */
        cssProps: {
            /**
             * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
             * @type {String}
             * @default 'none'
             */
            userSelect: 'none',

            /**
             * Disable the Windows Phone grippers when pressing an element.
             * @type {String}
             * @default 'none'
             */
            touchSelect: 'none',

            /**
             * Disables the default callout shown when you touch and hold a touch target.
             * On iOS, when you touch and hold a touch target such as a link, Safari displays
             * a callout containing information about the link. This property allows you to disable that callout.
             * @type {String}
             * @default 'none'
             */
            touchCallout: 'none',

            /**
             * Specifies whether zooming is enabled. Used by IE10>
             * @type {String}
             * @default 'none'
             */
            contentZooming: 'none',

            /**
             * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
             * @type {String}
             * @default 'none'
             */
            userDrag: 'none',

            /**
             * Overrides the highlight color shown when the user taps a link or a JavaScript
             * clickable element in iOS. This property obeys the alpha value, if specified.
             * @type {String}
             * @default 'rgba(0,0,0,0)'
             */
            tapHighlightColor: 'rgba(0,0,0,0)'
        }
    };

    var STOP = 1;
    var FORCED_STOP = 2;

    /**
     * Manager
     * @param {HTMLElement} element
     * @param {Object} [options]
     * @constructor
     */
    function Manager(element, options) {
        this.options = assign({}, Hammer.defaults, options || {});

        this.options.inputTarget = this.options.inputTarget || element;

        this.handlers = {};
        this.session = {};
        this.recognizers = [];
        this.oldCssProps = {};

        this.element = element;
        this.input = createInputInstance(this);
        this.touchAction = new TouchAction(this, this.options.touchAction);

        toggleCssProps(this, true);

        each(this.options.recognizers, function (item) {
            var recognizer = this.add(new item[0](item[1]));
            item[2] && recognizer.recognizeWith(item[2]);
            item[3] && recognizer.requireFailure(item[3]);
        }, this);
    }

    Manager.prototype = {
        /**
         * set options
         * @param {Object} options
         * @returns {Manager}
         */
        set: function set(options) {
            assign(this.options, options);

            // Options that need a little more setup
            if (options.touchAction) {
                this.touchAction.update();
            }
            if (options.inputTarget) {
                // Clean up existing event listeners and reinitialize
                this.input.destroy();
                this.input.target = options.inputTarget;
                this.input.init();
            }
            return this;
        },

        /**
         * stop recognizing for this session.
         * This session will be discarded, when a new [input]start event is fired.
         * When forced, the recognizer cycle is stopped immediately.
         * @param {Boolean} [force]
         */
        stop: function stop(force) {
            this.session.stopped = force ? FORCED_STOP : STOP;
        },

        /**
         * run the recognizers!
         * called by the inputHandler function on every movement of the pointers (touches)
         * it walks through all the recognizers and tries to detect the gesture that is being made
         * @param {Object} inputData
         */
        recognize: function recognize(inputData) {
            var session = this.session;
            if (session.stopped) {
                return;
            }

            // run the touch-action polyfill
            this.touchAction.preventDefaults(inputData);

            var recognizer;
            var recognizers = this.recognizers;

            // this holds the recognizer that is being recognized.
            // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
            // if no recognizer is detecting a thing, it is set to `null`
            var curRecognizer = session.curRecognizer;

            // reset when the last recognizer is recognized
            // or when we're in a new session
            if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
                curRecognizer = session.curRecognizer = null;
            }

            var i = 0;
            while (i < recognizers.length) {
                recognizer = recognizers[i];

                // find out if we are allowed try to recognize the input for this one.
                // 1.   allow if the session is NOT forced stopped (see the .stop() method)
                // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
                //      that is being recognized.
                // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
                //      this can be setup with the `recognizeWith()` method on the recognizer.
                if (session.stopped !== FORCED_STOP && ( // 1
                !curRecognizer || recognizer == curRecognizer || // 2
                recognizer.canRecognizeWith(curRecognizer))) {
                    // 3
                    recognizer.recognize(inputData);
                } else {
                    recognizer.reset();
                }

                // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
                // current active recognizer. but only if we don't already have an active recognizer
                if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                    curRecognizer = session.curRecognizer = recognizer;
                }
                i++;
            }
        },

        /**
         * get a recognizer by its event name.
         * @param {Recognizer|String} recognizer
         * @returns {Recognizer|Null}
         */
        get: function get(recognizer) {
            if (recognizer instanceof Recognizer) {
                return recognizer;
            }

            var recognizers = this.recognizers;
            for (var i = 0; i < recognizers.length; i++) {
                if (recognizers[i].options.event == recognizer) {
                    return recognizers[i];
                }
            }
            return null;
        },

        /**
         * add a recognizer to the manager
         * existing recognizers with the same event name will be removed
         * @param {Recognizer} recognizer
         * @returns {Recognizer|Manager}
         */
        add: function add(recognizer) {
            if (invokeArrayArg(recognizer, 'add', this)) {
                return this;
            }

            // remove existing
            var existing = this.get(recognizer.options.event);
            if (existing) {
                this.remove(existing);
            }

            this.recognizers.push(recognizer);
            recognizer.manager = this;

            this.touchAction.update();
            return recognizer;
        },

        /**
         * remove a recognizer by name or instance
         * @param {Recognizer|String} recognizer
         * @returns {Manager}
         */
        remove: function remove(recognizer) {
            if (invokeArrayArg(recognizer, 'remove', this)) {
                return this;
            }

            recognizer = this.get(recognizer);

            // let's make sure this recognizer exists
            if (recognizer) {
                var recognizers = this.recognizers;
                var index = inArray(recognizers, recognizer);

                if (index !== -1) {
                    recognizers.splice(index, 1);
                    this.touchAction.update();
                }
            }

            return this;
        },

        /**
         * bind event
         * @param {String} events
         * @param {Function} handler
         * @returns {EventEmitter} this
         */
        on: function on(events, handler) {
            if (events === undefined) {
                return;
            }
            if (handler === undefined) {
                return;
            }

            var handlers = this.handlers;
            each(splitStr(events), function (event) {
                handlers[event] = handlers[event] || [];
                handlers[event].push(handler);
            });
            return this;
        },

        /**
         * unbind event, leave emit blank to remove all handlers
         * @param {String} events
         * @param {Function} [handler]
         * @returns {EventEmitter} this
         */
        off: function off(events, handler) {
            if (events === undefined) {
                return;
            }

            var handlers = this.handlers;
            each(splitStr(events), function (event) {
                if (!handler) {
                    delete handlers[event];
                } else {
                    handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
                }
            });
            return this;
        },

        /**
         * emit event to the listeners
         * @param {String} event
         * @param {Object} data
         */
        emit: function emit(event, data) {
            // we also want to trigger dom events
            if (this.options.domEvents) {
                triggerDomEvent(event, data);
            }

            // no handlers, so skip it all
            var handlers = this.handlers[event] && this.handlers[event].slice();
            if (!handlers || !handlers.length) {
                return;
            }

            data.type = event;
            data.preventDefault = function () {
                data.srcEvent.preventDefault();
            };

            var i = 0;
            while (i < handlers.length) {
                handlers[i](data);
                i++;
            }
        },

        /**
         * destroy the manager and unbinds all events
         * it doesn't unbind dom events, that is the user own responsibility
         */
        destroy: function destroy() {
            this.element && toggleCssProps(this, false);

            this.handlers = {};
            this.session = {};
            this.input.destroy();
            this.element = null;
        }
    };

    /**
     * add/remove the css properties as defined in manager.options.cssProps
     * @param {Manager} manager
     * @param {Boolean} add
     */
    function toggleCssProps(manager, add) {
        var element = manager.element;
        if (!element.style) {
            return;
        }
        var prop;
        each(manager.options.cssProps, function (value, name) {
            prop = prefixed(element.style, name);
            if (add) {
                manager.oldCssProps[prop] = element.style[prop];
                element.style[prop] = value;
            } else {
                element.style[prop] = manager.oldCssProps[prop] || '';
            }
        });
        if (!add) {
            manager.oldCssProps = {};
        }
    }

    /**
     * trigger dom event
     * @param {String} event
     * @param {Object} data
     */
    function triggerDomEvent(event, data) {
        var gestureEvent = document.createEvent('Event');
        gestureEvent.initEvent(event, true, true);
        gestureEvent.gesture = data;
        data.target.dispatchEvent(gestureEvent);
    }

    assign(Hammer, {
        INPUT_START: INPUT_START,
        INPUT_MOVE: INPUT_MOVE,
        INPUT_END: INPUT_END,
        INPUT_CANCEL: INPUT_CANCEL,

        STATE_POSSIBLE: STATE_POSSIBLE,
        STATE_BEGAN: STATE_BEGAN,
        STATE_CHANGED: STATE_CHANGED,
        STATE_ENDED: STATE_ENDED,
        STATE_RECOGNIZED: STATE_RECOGNIZED,
        STATE_CANCELLED: STATE_CANCELLED,
        STATE_FAILED: STATE_FAILED,

        DIRECTION_NONE: DIRECTION_NONE,
        DIRECTION_LEFT: DIRECTION_LEFT,
        DIRECTION_RIGHT: DIRECTION_RIGHT,
        DIRECTION_UP: DIRECTION_UP,
        DIRECTION_DOWN: DIRECTION_DOWN,
        DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
        DIRECTION_VERTICAL: DIRECTION_VERTICAL,
        DIRECTION_ALL: DIRECTION_ALL,

        Manager: Manager,
        Input: Input,
        TouchAction: TouchAction,

        TouchInput: TouchInput,
        MouseInput: MouseInput,
        PointerEventInput: PointerEventInput,
        TouchMouseInput: TouchMouseInput,
        SingleTouchInput: SingleTouchInput,

        Recognizer: Recognizer,
        AttrRecognizer: AttrRecognizer,
        Tap: TapRecognizer,
        Pan: PanRecognizer,
        Swipe: SwipeRecognizer,
        Pinch: PinchRecognizer,
        Rotate: RotateRecognizer,
        Press: PressRecognizer,

        on: addEventListeners,
        off: removeEventListeners,
        each: each,
        merge: merge,
        extend: extend,
        assign: assign,
        inherit: inherit,
        bindFn: bindFn,
        prefixed: prefixed
    });

    // this prevents errors when Hammer is loaded in the presence of an AMD
    //  style loader but by script tag, not by the loader.
    var freeGlobal = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}; // jshint ignore:line
    freeGlobal.Hammer = Hammer;

    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return Hammer;
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module != 'undefined' && module.exports) {
        module.exports = Hammer;
    } else {
        window[exportName] = Hammer;
    }
})(window, document, 'Hammer');

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="book">\n	<!--\n		STARTBOOK-CONTAINER\n	-->\n	<div id="bookContainer">\n		<!--\n			TOC-LARGE-DEVICE (outside textContainer) : width >= 1366\n		-->\n		<%- include src/components/book-read/tabs-large-device.ejs -%>\n		<!--\n			START SWING-CONTAINER : margin-left: 33% WHEN TOC-LARGE OPEN\n		-->\n		<div id="swing-container">\n			<!--\n				START TEXT-CONTAINER\n			-->\n			<div data-wb-text-container class="w3-card-2">\n				<!--\n					BOOKMARK\n				-->\n				<div id="bookmark">\n					<p>signet</p>\n				</div>\n				<!--\n					TOC (inside textContainer) : width < 1366\n				-->\n				<div id="toc">\n					<div data-wb-toc class="w3-container">\n						<button id="close-toc" type="button" class="w3-button w3-text-gray w3-hover-none w3-display-topright">&times;</button>\n						<div id="toc-title" class="toc-content w3-padding-16 w3-border-bottom">\n							<p class="w3-center"><%- book.authorDisplay %></p>\n							<p class="w3-center text-uppercase"><%- book.title %></p>\n						</div>\n					</div>\n				</div>\n				<!--\n					OPTIONS-MODAL (inside textContainer) : width >= 1366\n				-->\n				<%- include src/components/book-read/options-modal.ejs -%>\n				<!--\n					TOP (inside textContainer)\n				-->\n				<div id="top">\n					<span id="current-section-title" class="wb-current-section-title"></span>\n				</div>\n				<!--\n					TEXT\n				-->\n				<div data-wb-text style="background-color: <%- book.styles.color %>; background-image: url(<%- book.styles.image %>)"></div>\n				<!--\n					BOTTOM (inside textContainer) : pagination\n				-->\n				<div id="bottom">\n					<span id="currentByTotal" class="wb-currentByTotal-pages"></span>\n				</div>\n				<div id="text-loader-container" class="hidden">\n					<div id="text-loader"></div>\n				</div>\n			<!--\n				END TEXT-CONTAINER\n			-->\n			</div>\n		<!--\n			END SWING-CONTAINER : margin-left: 33% WHEN TOC-LARGE OPEN\n		-->\n		</div>\n		<!--\n			NAVBAR-BOTTOM-SMALL (outside textContainer) : width < 768\n		-->\n		<div id="book-nav-bar-bottom-small" class="w3-bar">\n			<a id="home" href="/#/books/" class="home w3-btn w3-text-gray"><i class="material-icons">arrow_back</i></a>\n			<button id="add-bookmark" class="add-bookmark w3-btn w3-ripple w3-text-gray"><i class="material-icons">bookmark_border</i></button>\n			<button id="open-options" class="w3-btn w3-text-gray"><i class="material-icons">settings</i></button>\n			<button id="open-toc" class="open-toc w3-btn w3-text-gray"><i class="material-icons">toc</i></button>\n		</div>\n		<!--\n			NAVBAR-BOTTOM (outside textContainer) : width >= 768 && < 1366\n		-->\n		<div id="book-nav-bar-bottom">\n			<div class="w3-bar w3-large">\n				<div id="swing-bar">\n					<div id="book-nav-bar-bottom-controls">\n						<button id="home-large" class="home w3-btn w3-hover-none w3-text-gray"><i class="material-icons">arrow_back</i></button>\n						<button id="add-bookmark-large" class="add-bookmark w3-btn w3-ripple w3-hover-none w3-text-gray"><i class="material-icons">bookmark_border</i></button>\n						<div id="center">\n							<span id="backward-large" class="w3-button w3-hover-none">&lt;</span>\n							<span id="forward-large" class="w3-button w3-hover-none">&gt;</span>\n						</div>\n						<button id="open-options-medium" class="w3-btn w3-hover-none w3-text-gray"><i class="material-icons">settings</i></button>\n						<button id="open-toc-large" class="open-toc w3-btn w3-hover-none w3-text-gray"><i class="material-icons">toc</i></button>\n					</div>\n				</div>\n			</div>\n		</div>\n	<!--\n		END BOOK-CONTAINER\n	-->\n	</div>\n	<div id="book-loader-container" class="hidden">\n		<div id="book-loader" style="border-top: 8px solid <%= book.styles.color %>; border-bottom: 8px solid <%= book.styles.color %>"></div>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="book">\n	<!--\n		STARTBOOK-CONTAINER\n	-->\n	<div id="bookContainer">\n		<!--\n			TOC-LARGE-DEVICE (outside textContainer) : width >= 1366\n		-->\n		' + function() {
                    var buf = [];
                    buf.push('\n<div id="toc-large-device" class="w3-card-2" >\n	<button id="close-toc-large-device" type="button" class="w3-btn w3-card-2 w3-white" >&times;</button>\n	<div id="toc-large-device-container" class="toc-content w3-container">\n		<div class="w3-padding-16 w3-container w3-border-bottom">\n			<p class="w3-center">', (__stack.lineno = 6, book.authorDisplay), '</p>\n			<p class="w3-center text-uppercase">', (__stack.lineno = 7, book.title), '</p>\n		</div>\n		<div data-wb-toc ></div>\n	</div>\n</div>\n\n<div id="tab-options" class="w3-card-2">\n	<button id="close-tab-options" type="button" class="w3-btn w3-card-2 w3-white" >&times;</button>\n	<div id="tab-options-container" class="w3-container">\n		<div class="w3-padding-16 w3-border-bottom">\n			<p class="w3-center options-title">Options</p>\n		</div>\n		<div id="font-family-container-large" class="w3-padding-16 w3-border-bottom">\n			<p><b>Police de&nbsp;caractère</b></p>\n			<div class="w3-row">\n				<div class="w3-col s6">\n					<p><label><input type="radio" name="fontFamily" value="', (__stack.lineno = 23, book.styles.font), '">&ensp;', (__stack.lineno = 23, book.styles.font), "</label></p>\n					");
                    __stack.lineno = 24;
                    if (book.styles.font !== "Noto Serif") {
                        buf.push('\n						<p><label><input type="radio" name="fontFamily" value="Noto Serif">&ensp;Noto Serif</label></p>\n					');
                        __stack.lineno = 26;
                    }
                    buf.push('\n				</div>\n				<div class="w3-col s6">\n					');
                    __stack.lineno = 29;
                    if (book.styles.font !== "Vollkorn") {
                        buf.push('\n						<p><label><input type="radio" name="fontFamily" value="VollKorn">&ensp;Vollkorn</label></p>\n					');
                        __stack.lineno = 31;
                    }
                    buf.push('\n				</div>\n			</div>\n		</div>\n		<div id="font-size-container-large" class="w3-padding-16">\n			<p><b>Taille de la police</b></p>\n			<div class="w3-row">\n				<div class="w3-col s6">\n					<p><label><input type="radio" name="fontSize" value="14">&ensp;14 px</label></p>\n					<p><label><input type="radio" name="fontSize" value="16">&ensp;16 px</label></p>\n					<p><label><input type="radio" name="fontSize" value="18">&ensp;18 px</label></p>\n				</div>\n				<div class="w3-col s6">\n					<p><label><input type="radio" name="fontSize" value="15">&ensp;15 px</label></p>\n					<p><label><input type="radio" name="fontSize" value="17">&ensp;17 px</label></p>\n					<p><label><input type="radio" name="fontSize" value="19">&ensp;19 px</label></p>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n	\n<div id="tab-infos" class="w3-card-2">\n	<button id="close-tab-infos" type="button" class="w3-btn w3-card-2 w3-white" >&times;</button>\n	<div id="tab-infos-container">\n		  <div class="w3-container w3-padding-16">\n			  <p><b>Titre : </b>', (__stack.lineno = 57, book.title), "</p>\n			  ");
                    __stack.lineno = 58;
                    if (book.subtitle1) {
                        buf.push("\n				<p><b>Sous-titre : </b>", (__stack.lineno = 59, book.subtitle1), "</p>\n			  ");
                        __stack.lineno = 60;
                    }
                    buf.push("\n			  ");
                    __stack.lineno = 61;
                    if (book.subtitle2) {
                        buf.push("\n				<p><b>Sous-sous-titre : </b>", (__stack.lineno = 62, book.subtitle2), "</p>\n			  ");
                        __stack.lineno = 63;
                    }
                    buf.push("\n			  <p><b>Année de parution : </b>", (__stack.lineno = 64, book.year), "</p>\n			  ");
                    __stack.lineno = 65;
                    if (book.authors.length > 1) {
                        buf.push("\n					<p>\n						<span><b>Auteurs :</b></span>\n						<br>\n						<ul>\n						");
                        __stack.lineno = 70;
                        for (var j = 0; j < book.authors.length; j++) {
                            buf.push("\n							<li>\n								", (__stack.lineno = 72, book.authors[j].name), " (", (__stack.lineno = 72, book.authors[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 72, book.authors[j].death), ")\n							</li>\n						");
                            __stack.lineno = 74;
                        }
                        buf.push("\n						</ul>\n					</p>\n			  ");
                        __stack.lineno = 77;
                    } else if (book.authors.length === 1) {
                        buf.push("\n					<p><b>Auteur : </b>", (__stack.lineno = 78, book.authors[0].name), " (", (__stack.lineno = 78, book.authors[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 78, book.authors[0].death), ")</p>\n			  ");
                        __stack.lineno = 79;
                    }
                    buf.push("\n			  ");
                    __stack.lineno = 80;
                    if (book.contribs.length > 1) {
                        buf.push("\n					<p>\n						<span><b>Contributions :</b></span>\n						<br>\n						<ul>\n						");
                        __stack.lineno = 85;
                        for (var j = 0; j < book.contribs.length; j++) {
                            buf.push('\n							<li>\n								<span class="contrib-role">', (__stack.lineno = 87, book.contribs[j].role), " : </span>\n								", (__stack.lineno = 88, book.contribs[j].name), " (", (__stack.lineno = 88, book.contribs[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 88, book.contribs[j].death), ")\n							</li>\n						");
                            __stack.lineno = 90;
                        }
                        buf.push("\n						</ul>\n					</p>\n			  ");
                        __stack.lineno = 93;
                    } else if (book.contribs.length === 1) {
                        buf.push('\n					<p>\n						<span><b>Contribution : </b></span>\n						<br>\n						<ul>\n							<li>\n								<span class="contrib-role">', (__stack.lineno = 99, book.contribs[0].role), " : </span>\n								", (__stack.lineno = 100, book.contribs[0].name), " (", (__stack.lineno = 100, book.contribs[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 100, book.contribs[0].death), ")\n							</li>\n						</ul>\n					</p>\n			  ");
                        __stack.lineno = 104;
                    }
                    buf.push('\n			  <p class="book-source"><b>Source : </b>\n				  <ul>\n					  <li>&Eacute;diteur : ', (__stack.lineno = 107, book.source.publisher), "</li>\n					  <li>Année de publication : ", (__stack.lineno = 108, book.source.year), "</li>\n				  </ul>\n			  </p>\n			  ");
                    __stack.lineno = 111;
                    if (book.description) {
                        buf.push("\n			  <div>", (__stack.lineno = 112, book.description), "</div>\n			  ");
                        __stack.lineno = 113;
                    }
                    buf.push('\n		  </div>\n	</div>\n</div>\n\n<div id="book-commands">\n	<button id="toggle-toc-large-device" type="button" class="w3-btn w3-card-2 w3-white" >Table</button>\n	<button id="toggle-tab-options" type="button" class="w3-btn w3-card-2 w3-white" >Options</button>\n	<button id="toggle-tab-infos" type="button" class="w3-btn w3-card-2 w3-white" >Infos</button>\n	<button id="tab-add-bookmark" type="button" class="add-bookmark w3-btn w3-ripple w3-card-2 w3-white" >Signet</button>\n	<button id="tab-home-link" type="button" class="home w3-btn w3-card-2 w3-white" >Retour</button>\n</div>\n	\n\n');
                    return buf.join("");
                }() + '		<!--\n			START SWING-CONTAINER : margin-left: 33% WHEN TOC-LARGE OPEN\n		-->\n		<div id="swing-container">\n			<!--\n				START TEXT-CONTAINER\n			-->\n			<div data-wb-text-container class="w3-card-2">\n				<!--\n					BOOKMARK\n				-->\n				<div id="bookmark">\n					<p>signet</p>\n				</div>\n				<!--\n					TOC (inside textContainer) : width < 1366\n				-->\n				<div id="toc">\n					<div data-wb-toc class="w3-container">\n						<button id="close-toc" type="button" class="w3-button w3-text-gray w3-hover-none w3-display-topright">&times;</button>\n						<div id="toc-title" class="toc-content w3-padding-16 w3-border-bottom">\n							<p class="w3-center">', (__stack.lineno = 30, book.authorDisplay), '</p>\n							<p class="w3-center text-uppercase">', (__stack.lineno = 31, book.title), "</p>\n						</div>\n					</div>\n				</div>\n				<!--\n					OPTIONS-MODAL (inside textContainer) : width >= 1366\n				-->\n				" + function() {
                    var buf = [];
                    buf.push('<div id="options">\n	<div class="w3-container">\n		<button id="close-options" type="button" class="w3-button w3-text-gray w3-hover-none w3-display-topright">&times;</button>\n		<div class="w3-padding-16 w3-border-bottom options-title">\n			<p class="w3-center">Options</p>\n		</div>\n		<div id="font-family-container" class="w3-padding-16 w3-border-bottom">\n			<p><b>Police de&nbsp;caractère</b></p>\n			<div class="w3-row">\n				<div class="w3-col s6">\n					<p><label><input type="radio" name="fontFamily" value="', (__stack.lineno = 11, book.styles.font), '">&ensp;', (__stack.lineno = 11, book.styles.font), "</label></p>\n					");
                    __stack.lineno = 12;
                    if (book.styles.font !== "Noto Serif") {
                        buf.push('\n						<p><label><input type="radio" name="fontFamily" value="Noto Serif">&ensp;Noto Serif</label></p>\n					');
                        __stack.lineno = 14;
                    }
                    buf.push('\n				</div>\n				<div class="w3-col s6">\n					');
                    __stack.lineno = 17;
                    if (book.styles.font !== "Vollkorn") {
                        buf.push('\n						<p><label><input type="radio" name="fontFamily" value="VollKorn">&ensp;Vollkorn</label></p>\n					');
                        __stack.lineno = 19;
                    }
                    buf.push('\n				</div>\n			</div>\n		</div>\n		<div id="font-size-container" class="w3-padding-16">\n			<p><b>Taille de la police</b></p>\n			<div>\n				<div class="w3-row">\n					<div class="w3-col s6">\n						<p><label><input type="radio" name="fontSize" value="13">&ensp;13 px</label></p>\n						<p><label><input type="radio" name="fontSize" value="15">&ensp;15 px</label></p>\n					</div>\n					<div class="w3-col s6">\n						<p><label><input type="radio" name="fontSize" value="14">&ensp;14 px</label></p>\n						<p><label><input type="radio" name="fontSize" value="16">&ensp;16 px</label></p>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n\n<div id="options-medium">\n	<div class="w3-container">\n		<button id="close-options-medium" type="button" class="w3-button w3-text-gray w3-hover-none w3-display-topright">&times;</button>\n		<div class="w3-padding-16 w3-border-bottom options-title">\n			<p class="w3-center">Options</p>\n		</div>\n		<div id="font-family-container" class="w3-padding-16 w3-border-bottom">\n			<p><b>Police de&nbsp;caractère</b></p>\n			<div class="w3-row">\n				<div class="w3-col s6">\n					<p><label><input type="radio" name="fontFamily" value="', (__stack.lineno = 51, book.styles.font), '">&ensp;', (__stack.lineno = 51, book.styles.font), "</label></p>\n					");
                    __stack.lineno = 52;
                    if (book.styles.font !== "Noto Serif") {
                        buf.push('\n						<p><label><input type="radio" name="fontFamily" value="Noto Serif">&ensp;Noto Serif</label></p>\n					');
                        __stack.lineno = 54;
                    }
                    buf.push('\n				</div>\n				<div class="w3-col s6">\n					');
                    __stack.lineno = 57;
                    if (book.styles.font !== "Vollkorn") {
                        buf.push('\n						<p><label><input type="radio" name="fontFamily" value="VollKorn">&ensp;Vollkorn</label></p>\n					');
                        __stack.lineno = 59;
                    }
                    buf.push('\n				</div>\n			</div>\n		</div>\n		<div id="font-size-container" class="w3-padding-16">\n			<p><b>Taille de la police</b></p>\n			<div>\n				<div class="w3-row">\n				<div class="w3-col s6">\n					<p><label><input type="radio" name="fontSize" value="14">&ensp;14 px</label></p>\n					<p><label><input type="radio" name="fontSize" value="16">&ensp;16 px</label></p>\n					<p><label><input type="radio" name="fontSize" value="18">&ensp;18 px</label></p>\n				</div>\n				<div class="w3-col s6">\n					<p><label><input type="radio" name="fontSize" value="15">&ensp;15 px</label></p>\n					<p><label><input type="radio" name="fontSize" value="17">&ensp;17 px</label></p>\n					<p><label><input type="radio" name="fontSize" value="19">&ensp;19 px</label></p>\n				</div>\n			</div>\n			</div>\n		</div>\n	</div>\n</div>\n');
                    return buf.join("");
                }() + '				<!--\n					TOP (inside textContainer)\n				-->\n				<div id="top">\n					<span id="current-section-title" class="wb-current-section-title"></span>\n				</div>\n				<!--\n					TEXT\n				-->\n				<div data-wb-text style="background-color: ', (__stack.lineno = 47, book.styles.color), "; background-image: url(", (__stack.lineno = 47, book.styles.image), ')"></div>\n				<!--\n					BOTTOM (inside textContainer) : pagination\n				-->\n				<div id="bottom">\n					<span id="currentByTotal" class="wb-currentByTotal-pages"></span>\n				</div>\n				<div id="text-loader-container" class="hidden">\n					<div id="text-loader"></div>\n				</div>\n			<!--\n				END TEXT-CONTAINER\n			-->\n			</div>\n		<!--\n			END SWING-CONTAINER : margin-left: 33% WHEN TOC-LARGE OPEN\n		-->\n		</div>\n		<!--\n			NAVBAR-BOTTOM-SMALL (outside textContainer) : width < 768\n		-->\n		<div id="book-nav-bar-bottom-small" class="w3-bar">\n			<a id="home" href="/#/books/" class="home w3-btn w3-text-gray"><i class="material-icons">arrow_back</i></a>\n			<button id="add-bookmark" class="add-bookmark w3-btn w3-ripple w3-text-gray"><i class="material-icons">bookmark_border</i></button>\n			<button id="open-options" class="w3-btn w3-text-gray"><i class="material-icons">settings</i></button>\n			<button id="open-toc" class="open-toc w3-btn w3-text-gray"><i class="material-icons">toc</i></button>\n		</div>\n		<!--\n			NAVBAR-BOTTOM (outside textContainer) : width >= 768 && < 1366\n		-->\n		<div id="book-nav-bar-bottom">\n			<div class="w3-bar w3-large">\n				<div id="swing-bar">\n					<div id="book-nav-bar-bottom-controls">\n						<button id="home-large" class="home w3-btn w3-hover-none w3-text-gray"><i class="material-icons">arrow_back</i></button>\n						<button id="add-bookmark-large" class="add-bookmark w3-btn w3-ripple w3-hover-none w3-text-gray"><i class="material-icons">bookmark_border</i></button>\n						<div id="center">\n							<span id="backward-large" class="w3-button w3-hover-none">&lt;</span>\n							<span id="forward-large" class="w3-button w3-hover-none">&gt;</span>\n						</div>\n						<button id="open-options-medium" class="w3-btn w3-hover-none w3-text-gray"><i class="material-icons">settings</i></button>\n						<button id="open-toc-large" class="open-toc w3-btn w3-hover-none w3-text-gray"><i class="material-icons">toc</i></button>\n					</div>\n				</div>\n			</div>\n		</div>\n	<!--\n		END BOOK-CONTAINER\n	-->\n	</div>\n	<div id="book-loader-container" class="hidden">\n		<div id="book-loader" style="border-top: 8px solid ', escape((__stack.lineno = 98, book.styles.color)), "; border-bottom: 8px solid ", escape((__stack.lineno = 98, book.styles.color)), '"></div>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dataStore = __webpack_require__(2);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _authors = __webpack_require__(70);

var _authors2 = _interopRequireDefault(_authors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authorsTemplate = __webpack_require__(72);
//authors.js
var authors = function authors(container) {
	'use strict';

	var c = container;

	var search = location.hash.replace(/#\/authors\?q\=/, '');

	//get authors from dataStore
	var as = _dataStore2.default.getData('authors');
	//get searched authors
	var sas = as.filter(function (a) {
		return a.nameAlpha.split("")[0].toUpperCase() === search;
	});
	//get books
	var bs = _dataStore2.default.getData('books');

	//go to book/read
	var readBk = function readBk(event) {
		var b = _dataStore2.default.getData('books', event.currentTarget.id);
		var path = b.path.replace(/^\/books\/[^\/]+/, '');
		location.hash = '#' + path + "/read";
	};
	//open infos
	var openInfos = function openInfos(event) {
		var id = event.target.id.replace('open-', '');
		document.getElementById(id).style.display = 'block';
	};
	//close infos
	var closeInfos = function closeInfos(event) {
		var id = event.target.id.replace('close-', '');
		document.getElementById(id).style.display = 'none';
	};
	//insert template in container
	c.innerHTML = authorsTemplate({ authors: sas, books: bs });
	var root = document.querySelector('#authors-container');
	//scroll after read
	if (_dataStore2.default.getData('location').prevLocation !== undefined && _dataStore2.default.getData('location').prevLocation.match(/\/read$/)) {
		var id = _dataStore2.default.getData('book');
		var el = document.getElementById(id);
		el.scrollIntoView(true);
		var html = document.getElementsByTagName("html")[0];
		html.scrollTop = html.scrollTop - 30;
	}
	//get active letter link
	var ls = root.querySelectorAll('#letters a');
	for (var i = 0; i < ls.length; i++) {
		if (ls[i].innerHTML === search) {
			_utils2.default.removeClass('#' + ls[i].id, 'w3-text-gray');
			_utils2.default.addClass('#' + ls[i].id, 'w3-text-black');
		} else {
			_utils2.default.removeClass('#' + ls[i].id, 'w3-text-black');
			_utils2.default.addClass('#' + ls[i].id, 'w3-text-gray');
		}
	}
	//link to book/read
	var bks = root.querySelectorAll('.book');
	for (var _i = 0; _i < bks.length; _i++) {
		bks[_i].addEventListener('click', readBk, false);
	}
	//modal (infos)
	//open
	var openInfosBtns = root.querySelectorAll('.open-infos-btn');
	for (var _i2 = 0; _i2 < openInfosBtns.length; _i2++) {
		openInfosBtns[_i2].addEventListener('click', openInfos, false);
	}
	//close
	var closeInfosBtns = root.querySelectorAll('.close-infos-btn');
	for (var _i3 = 0; _i3 < closeInfosBtns.length; _i3++) {
		closeInfosBtns[_i3].addEventListener('click', closeInfos, false);
	}
};

exports.default = authors;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./authors.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./authors.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "#authors-container {\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n}\n\n#authors-container #top-page-header {\n\ttext-align: center;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tfont-size: 1em;\n\tfont-variant: small-caps;\n\tletter-spacing: 1px;\n\tline-height: 25px;\n\twidth: 90px;\n\tmargin: auto;\n\tmargin-top: 32px;\n\tdisplay: block;\n}\n\n@media only screen and (min-width: 768px) {\n\t#authors-container #top-page-header {\n\t\tdisplay: none;\n\t}\n}\n\n#authors-container #letters {\n\ttext-align: center;\n\tline-height: 25px;\n\twidth: 320px;\n\tmargin: auto;\n}\n\n@media only screen and (min-width: 410px) {\n\t#authors-container #letters {\n\t\twidth: 410px;\n\t}\n}\n\n@media only screen and (min-width: 768px) {\n\t#authors-container #letters {\n\t\twidth: 100%;\n\t}\n}\n\n#authors-container .author {\n\tpadding-top: 8px;\n}\n\n#authors-container .author-name {\n\tmax-width: 568px;\n\tfont-size: 1.2em;\n\tfont-variant: small-caps;\n\tletter-spacing: 1.5px;\n\tmargin-bottom: 0px;\n\tmargin-top: 0px;\n\tmargin-left: 17px;\n\tmargin-right: 17px;\n\ttext-align: center;\n}\n\n#authors-container #booksList {\n\tmax-width: 568px;\n\tmargin: auto;\n}\n\n@media only screen and (min-width: 600px) {\n\t#authors-container #booksList {\n\t\tmargin: 0px;\n\t}\n\t\n\t#authors-container .author-name {\n\t\tmax-width: 852px;\n\t\ttext-align: left;\n\t}\n}\n\n@media only screen and (min-width: 853px) {\n\t#authors-container #booksList {\n\t\tmax-width: 852px;\n\t\tmargin: 0px;\n\t}\n\t\n\t#authors-container .author-name {\n\t\tmax-width: 1136px;\n\t}\n}\n\n@media only screen and (min-width: 1137px) {\n\t#authors-container #booksList {\n\t\tmax-width: 1136px;\n\t\tmargin: 0px;\n\t}\n\t\n\t#authors-container .author-name {\n\t\tmax-width: 1136px;\n\t}\n}\n\n#authors-container .w3-col {\n\twidth: 100%;\n\theight: 408px;\n}\n\n@media only screen and (min-width: 600px) {\n\t#authors-container .w3-col {\n\t\twidth: 284px;\n\t}\n}\n\n#authors-container #paper {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#authors-container .book {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#authors-container .book .logo .span2 {\n\tfont-variant: small-caps;\n\tfont-style: normal;\n}\n\n#authors-container #book-btn {\n\twidth: 238px;\n\theight: 40px;\n\tmargin: auto;\n\tmargin-top: 8px;\n}\n\n#authors-container #book-btn button {\n\tfont-family: \"Times New Roman\", Georgia, serif;\n\tfont-size: 1em;\n\tletter-spacing: 1.5px;\n\tbackground-color: transparent;\n}\n\n/*\nMODAL (INFOS)\n*/\n#authors-container .w3-modal {\n\tfont-family: \"Verdana\", serif;\n}\n\n#authors-container .w3-modal #footer {\n\tpadding-top: 16px;\n}\n\n#authors-container .w3-modal .close-infos-btn {\n\tfont-size: 1.1em;\n\tfont-family: \"Verdana\", serif;\n\tletter-spacing: 1px;\n}\n\n#authors-container .w3-modal p {\n\tmargin: 0px;\n\tmargin-top: 8px;\n}\n\n#authors-container .w3-modal ul {\n\tmargin: 0px;\n\tpadding-left: 10px;\n\tlist-style-type: none;\n}\n\n#authors-container .w3-modal .contrib-role {\n\ttext-transform: capitalize;\n}\n\n\n", ""]);

// exports


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="authors-container" class="w3-content" style="max-width: 1136px">\n	<div id="top-page-header" class="w3-light-gray">auteurs</div>\n	<div id="letters" class="w3-container w3-padding-32">\n		<%- include src/components/authors/authors-letters.ejs -%>\n	</div>\n	<div id="authorsList" class="w3-padding-48 w3-animate-opacity">\n		<% for(var i=0; i<authors.length; i++) {%>\n			<% if(authors[i].visible) { %>\n			<div class="author">\n				<p class="author-name w3-border-bottom"><%- authors[i].name %></p>\n				<div id="booksList" class="w3-padding-16">\n					<div class=\'w3-row\'>\n						<% var works = authors[i].books.concat(authors[i].contribs)	%>\n						<% for(var j=0; j<works.length; j++) {\n							if(works[j].role) {\n									var b = works[j].book;\n								} else {\n									var b = works[j];\n								}\n							\n							if(b.visible) {\n							for(var k=0; k<books.length; k++) {\n								if(books[k].id===b.id) {\n									var book = books[k];\n									break;\n								}\n							}%>\n							\n							<!-- MODAL (INFOS) -->\n							<%- include src/components/authors/infos-modal.ejs -%>\n							\n							<div class="w3-col" style="text-align: center">\n								<div id="paper" style="background-color: <%- book.styles.color %>; background-image: url(<%- book.styles.image %>)">\n									<div id="<%= book.id %>" class="book" style="<%= book.styles.cover %>">\n										<p class="book-author" style="<%=book.styles.author %>"><%- book.authorDisplay %></p>\n										<p class="title" style="<%= book.styles.title %>">\n											<%- book.title %>\n										</p>\n										<% if(book.subtitle1) {%>\n										<p class="subtitle1" style="<%= book.styles.subtitle1 %>">\n											<%- book.subtitle1 %></a>\n										</p>\n										<% } %>\n										<% if(book.subtitle2) {%>\n										<p class="subtitle1" style="<%= book.styles.subtitle2 %>">\n											<%- book.subtitle2 %></a>\n										</p>\n										<% } %>\n										<p class="logo" style="<%=book.styles.logo %>">\n											<span class="span1">L&rsquo;Intermédiaire</span><br/>\n											<span class="span2">éditions</span>\n										</p>\n								   </div>\n							   </div>\n							   <div id="book-btn" >\n									<button id="open-infos-<%= book.id %>" class="open-infos-btn align-right w3-btn w3-ripple w3-hover-none">+ d\'infos</button>\n							   </div>\n							</div>\n						   <% } %>\n						<% } %>\n					</div>\n				</div>\n			</div>\n			<% } %>\n		<% } %>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="authors-container" class="w3-content" style="max-width: 1136px">\n	<div id="top-page-header" class="w3-light-gray">auteurs</div>\n	<div id="letters" class="w3-container w3-padding-32">\n		' + function() {
                    var buf = [];
                    buf.push('<a id="a" href="#/authors?q=A" class="w3-text-gray w3-hover-none w3-hover-text-black">A</a>&emsp;\n<a id="b" href="#/authors?q=B" class="w3-text-gray w3-hover-none w3-hover-text-black">B</a>&emsp;\n<a id="c" href="#/authors?q=C" class="w3-text-gray w3-hover-none w3-hover-text-black">C</a>&emsp;\n<a id="d" href="#/authors?q=D" class="w3-text-gray w3-hover-none w3-hover-text-black">D</a>&emsp;\n<a id="e" href="#/authors?q=E" class="w3-text-gray w3-hover-none w3-hover-text-black">E</a>&emsp;\n<a id="f" href="#/authors?q=F" class="w3-text-gray w3-hover-none w3-hover-text-black">F</a>&emsp;\n<a id="g" href="#/authors?q=G" class="w3-text-gray w3-hover-none w3-hover-text-black">G</a>&emsp;\n<a id="h" href="#/authors?q=H" class="w3-text-gray w3-hover-none w3-hover-text-black">H</a>&emsp;\n<a id="i" href="#/authors?q=I" class="w3-text-gray w3-hover-none w3-hover-text-black">I</a>&emsp;\n<a id="j" href="#/authors?q=J" class="w3-text-gray w3-hover-none w3-hover-text-black">J</a>&emsp;\n<a id="k" href="#/authors?q=K" class="w3-text-gray w3-hover-none w3-hover-text-black">K</a>&emsp;\n<a id="l" href="#/authors?q=L" class="w3-text-gray w3-hover-none w3-hover-text-black">L</a>&emsp;\n<a id="m" href="#/authors?q=M" class="w3-text-gray w3-hover-none w3-hover-text-black">M</a>&emsp;\n<a id="n" href="#/authors?q=N" class="w3-text-gray w3-hover-none w3-hover-text-black">N</a>&emsp;\n<a id="o" href="#/authors?q=O" class="w3-text-gray w3-hover-none w3-hover-text-black">O</a>&emsp;\n<a id="p" href="#/authors?q=P" class="w3-text-gray w3-hover-none w3-hover-text-black">P</a>&emsp;\n<a id="q" href="#/authors?q=Q" class="w3-text-gray w3-hover-none w3-hover-text-black">Q</a>&emsp;\n<a id="r" href="#/authors?q=R" class="w3-text-gray w3-hover-none w3-hover-text-black">R</a>&emsp;\n<a id="s" href="#/authors?q=S" class="w3-text-gray w3-hover-none w3-hover-text-black">S</a>&emsp;\n<a id="t" href="#/authors?q=T" class="w3-text-gray w3-hover-none w3-hover-text-black">T</a>&emsp;\n<a id="u" href="#/authors?q=U" class="w3-text-gray w3-hover-none w3-hover-text-black">U</a>&emsp;\n<a id="v" href="#/authors?q=V" class="w3-text-gray w3-hover-none w3-hover-text-black">V</a>&emsp;\n<a id="w" href="#/authors?q=W" class="w3-text-gray w3-hover-none w3-hover-text-black">W</a>&emsp;\n<a id="x" href="#/authors?q=X" class="w3-text-gray w3-hover-none w3-hover-text-black">X</a>&emsp;\n<a id="y" href="#/authors?q=Y" class="w3-text-gray w3-hover-none w3-hover-text-black">Y</a>&emsp;\n<a id="z" href="#/authors?q=Z" class="w3-text-gray w3-hover-none w3-hover-text-black">Z</a>&emsp;\n');
                    return buf.join("");
                }() + '	</div>\n	<div id="authorsList" class="w3-padding-48 w3-animate-opacity">\n		');
                __stack.lineno = 6;
                for (var i = 0; i < authors.length; i++) {
                    buf.push("\n			");
                    __stack.lineno = 7;
                    if (authors[i].visible) {
                        buf.push('\n			<div class="author">\n				<p class="author-name w3-border-bottom">', (__stack.lineno = 9, authors[i].name), '</p>\n				<div id="booksList" class="w3-padding-16">\n					<div class=\'w3-row\'>\n						');
                        __stack.lineno = 12;
                        var works = authors[i].books.concat(authors[i].contribs);
                        buf.push("\n						");
                        __stack.lineno = 13;
                        for (var j = 0; j < works.length; j++) {
                            if (works[j].role) {
                                var b = works[j].book;
                            } else {
                                var b = works[j];
                            }
                            if (b.visible) {
                                for (var k = 0; k < books.length; k++) {
                                    if (books[k].id === b.id) {
                                        var book = books[k];
                                        break;
                                    }
                                }
                                buf.push("\n							\n							<!-- MODAL (INFOS) -->\n							" + function() {
                                    var buf = [];
                                    buf.push('<div id="infos-', escape((__stack.lineno = 1, book.id)), '" class="w3-modal" style="background-color: rgba(0,0,0,0.1)">\n	<div class="w3-modal-content w3-card w3-animate-top" style="max-width: 500px">\n		<div class="w3-container w3-padding-16">\n			  <p><b>Titre : </b>', (__stack.lineno = 4, book.title), "</p>\n			  ");
                                    __stack.lineno = 5;
                                    if (book.subtitle1) {
                                        buf.push("\n				<p><b>Sous-titre : </b>", (__stack.lineno = 6, book.subtitle1), "</p>\n			  ");
                                        __stack.lineno = 7;
                                    }
                                    buf.push("\n			  ");
                                    __stack.lineno = 8;
                                    if (book.subtitle2) {
                                        buf.push("\n				<p><b>Sous-sous-titre : </b>", (__stack.lineno = 9, book.subtitle2), "</p>\n			  ");
                                        __stack.lineno = 10;
                                    }
                                    buf.push("\n			  <p><b>Année de parution : </b>", (__stack.lineno = 11, book.year), "</p>\n			  ");
                                    __stack.lineno = 12;
                                    if (book.authors.length > 1) {
                                        buf.push("\n					<p>\n						<span><b>Auteurs :</b></span>\n						<br>\n						<ul>\n						");
                                        __stack.lineno = 17;
                                        for (var j = 0; j < book.authors.length; j++) {
                                            buf.push("\n							<li>\n								", (__stack.lineno = 19, book.authors[j].name), " (", (__stack.lineno = 19, book.authors[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 19, book.authors[j].death), ")\n							</li>\n						");
                                            __stack.lineno = 21;
                                        }
                                        buf.push("\n						</ul>\n					</p>\n			  ");
                                        __stack.lineno = 24;
                                    } else if (book.authors.length === 1) {
                                        buf.push("\n					<p><b>Auteur : </b>", (__stack.lineno = 25, book.authors[0].name), " (", (__stack.lineno = 25, book.authors[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 25, book.authors[0].death), ")</p>\n			  ");
                                        __stack.lineno = 26;
                                    }
                                    buf.push("\n			  ");
                                    __stack.lineno = 27;
                                    if (book.contribs.length > 1) {
                                        buf.push("\n					<p>\n						<span><b>Contributions :</b></span>\n						<br>\n						<ul>\n						");
                                        __stack.lineno = 32;
                                        for (var j = 0; j < book.contribs.length; j++) {
                                            buf.push('\n							<li>\n								<span class="contrib-role">', (__stack.lineno = 34, book.contribs[j].role), " : </span>\n								", (__stack.lineno = 35, book.contribs[j].name), " (", (__stack.lineno = 35, book.contribs[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 35, book.contribs[j].death), ")\n							</li>\n						");
                                            __stack.lineno = 37;
                                        }
                                        buf.push("\n						</ul>\n					</p>\n			  ");
                                        __stack.lineno = 40;
                                    } else if (book.contribs.length === 1) {
                                        buf.push('\n					<p>\n						<span><b>Contribution : </b></span>\n						<br>\n						<ul>\n							<li>\n								<span class="contrib-role">', (__stack.lineno = 46, book.contribs[0].role), " : </span>\n								", (__stack.lineno = 47, book.contribs[0].name), " (", (__stack.lineno = 47, book.contribs[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 47, book.contribs[0].death), ")\n							</li>\n						</ul>\n					</p>\n			  ");
                                        __stack.lineno = 51;
                                    }
                                    buf.push('\n			  <p class="book-source"><b>Source : </b>\n				  <ul>\n					  <li>&Eacute;diteur : ', (__stack.lineno = 54, book.source.publisher), "</li>\n					  <li>Année de parution : ", (__stack.lineno = 55, book.source.year), "</li>\n				  </ul>\n			  </p>\n			  ");
                                    __stack.lineno = 58;
                                    if (book.description) {
                                        buf.push("\n			  <div>", (__stack.lineno = 59, book.description), "</div>\n			  ");
                                        __stack.lineno = 60;
                                    }
                                    buf.push('\n		</div>\n		<div id=footer class="w3-container w3-border-bottom">\n			<button id="close-infos-', escape((__stack.lineno = 63, book.id)), '" class="close-infos-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-bottomright">Fermer</button>\n		</div>\n	</div>\n</div>\n');
                                    return buf.join("");
                                }() + '							\n							<div class="w3-col" style="text-align: center">\n								<div id="paper" style="background-color: ', (__stack.lineno = 31, book.styles.color), "; background-image: url(", (__stack.lineno = 31, book.styles.image), ')">\n									<div id="', escape((__stack.lineno = 32, book.id)), '" class="book" style="', escape((__stack.lineno = 32, book.styles.cover)), '">\n										<p class="book-author" style="', escape((__stack.lineno = 33, book.styles.author)), '">', (__stack.lineno = 33, book.authorDisplay), '</p>\n										<p class="title" style="', escape((__stack.lineno = 34, book.styles.title)), '">\n											', (__stack.lineno = 35, book.title), "\n										</p>\n										");
                                __stack.lineno = 37;
                                if (book.subtitle1) {
                                    buf.push('\n										<p class="subtitle1" style="', escape((__stack.lineno = 38, book.styles.subtitle1)), '">\n											', (__stack.lineno = 39, book.subtitle1), "</a>\n										</p>\n										");
                                    __stack.lineno = 41;
                                }
                                buf.push("\n										");
                                __stack.lineno = 42;
                                if (book.subtitle2) {
                                    buf.push('\n										<p class="subtitle1" style="', escape((__stack.lineno = 43, book.styles.subtitle2)), '">\n											', (__stack.lineno = 44, book.subtitle2), "</a>\n										</p>\n										");
                                    __stack.lineno = 46;
                                }
                                buf.push('\n										<p class="logo" style="', escape((__stack.lineno = 47, book.styles.logo)), '">\n											<span class="span1">L&rsquo;Intermédiaire</span><br/>\n											<span class="span2">éditions</span>\n										</p>\n								   </div>\n							   </div>\n							   <div id="book-btn" >\n									<button id="open-infos-', escape((__stack.lineno = 54, book.id)), '" class="open-infos-btn align-right w3-btn w3-ripple w3-hover-none">+ d\'infos</button>\n							   </div>\n							</div>\n						   ');
                                __stack.lineno = 57;
                            }
                            buf.push("\n						");
                            __stack.lineno = 58;
                        }
                        buf.push("\n					</div>\n				</div>\n			</div>\n			");
                        __stack.lineno = 62;
                    }
                    buf.push("\n		");
                    __stack.lineno = 63;
                }
                buf.push("\n	</div>\n</div>\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(2);

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminLoginTemplate = __webpack_require__(74);
//home.js
var adminLogin = function adminLogin(container) {
	'use strict';

	var viewContainer = container;
	//Insert template
	viewContainer.innerHTML = adminLoginTemplate();
	//rootElement
	var root = document.querySelector('#adminLogin');
	//form
	var form = root.querySelector('#adminLoginForm');
	var inputs = form.querySelectorAll('input');

	//clear errors on input
	function onInput(event) {
		_utils2.default.setHTML('#form-error', "");
		if (event.target.name === 'email') {
			_utils2.default.setHTML('#email .error', "");
		} else if (event.target.name === 'password') {
			_utils2.default.setHTML('#password .error', "");
		}
	}

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('input', onInput, false);
	}

	//submit
	function onSubmit(event) {
		event.preventDefault();
		_utils2.default.bind(form, {});
		var user = {};
		user.email = form.querySelector('[name=email]').value;
		user.password = form.querySelector('[name=password]').value;
		var options = { method: 'POST', url: '/users/login', data: JSON.stringify(user) };
		_utils2.default.ajax(options).then(function (res) {
			var response = JSON.parse(res);
			if (response.errors) {
				_utils2.default.bind(form, response.errors);
			} else {
				_dataStore2.default.setData('currentUser', response.user);
				if (response.user.admin === true) {
					_utils2.default.removeClass('#admin-item', 'hidden');
					_utils2.default.removeClass('#menu-admin-item', 'hidden');
					location.hash = '#/admin/';
				} else {
					_utils2.default.setHTML('#form-error', "Vous n'avez pas le droit d'accéder à l'espace administration.");
				}
			}
		});
	}

	form.addEventListener('submit', onSubmit, false);
};

exports.default = adminLogin;

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminLogin" class="content">\n	<div class="w3-container w3-padding-24">\n		<h3 class="w3-container">Espace administration&ensp;&ndash;&ensp;connexion</h3>\n		<form id="adminLoginForm" class="w3-container">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="email">\n				<label>Identifiant : </label>\n				<input type="text" name="email" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ email }}"></span>\n			</p>\n			\n			<p id="password">\n				<label>Mot de passe : </label>\n				<input type="password" name="password" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password }}"></span>\n			</p>\n			\n			<p>\n				<button type="submit" id="loginButton" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminLogin" class="content">\n	<div class="w3-container w3-padding-24">\n		<h3 class="w3-container">Espace administration&ensp;&ndash;&ensp;connexion</h3>\n		<form id="adminLoginForm" class="w3-container">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="email">\n				<label>Identifiant : </label>\n				<input type="text" name="email" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ email }}"></span>\n			</p>\n			\n			<p id="password">\n				<label>Mot de passe : </label>\n				<input type="password" name="password" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password }}"></span>\n			</p>\n			\n			<p>\n				<button type="submit" id="loginButton" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _adminHome = __webpack_require__(76);

var _adminHome2 = _interopRequireDefault(_adminHome);

var _adminUsers = __webpack_require__(78);

var _adminUsers2 = _interopRequireDefault(_adminUsers);

var _adminUser = __webpack_require__(80);

var _adminUser2 = _interopRequireDefault(_adminUser);

var _adminNew = __webpack_require__(82);

var _adminNew2 = _interopRequireDefault(_adminNew);

var _adminEdit = __webpack_require__(84);

var _adminEdit2 = _interopRequireDefault(_adminEdit);

var _adminEditPassword = __webpack_require__(86);

var _adminEditPassword2 = _interopRequireDefault(_adminEditPassword);

var _adminBooks = __webpack_require__(88);

var _adminBooks2 = _interopRequireDefault(_adminBooks);

var _adminBook = __webpack_require__(90);

var _adminBook2 = _interopRequireDefault(_adminBook);

var _adminBooksNew = __webpack_require__(92);

var _adminBooksNew2 = _interopRequireDefault(_adminBooksNew);

var _adminBookEdit = __webpack_require__(99);

var _adminBookEdit2 = _interopRequireDefault(_adminBookEdit);

var _adminAuthors = __webpack_require__(106);

var _adminAuthors2 = _interopRequireDefault(_adminAuthors);

var _adminAuthor = __webpack_require__(108);

var _adminAuthor2 = _interopRequireDefault(_adminAuthor);

var _adminAuthorsNew = __webpack_require__(110);

var _adminAuthorsNew2 = _interopRequireDefault(_adminAuthorsNew);

var _adminAuthorEdit = __webpack_require__(112);

var _adminAuthorEdit2 = _interopRequireDefault(_adminAuthorEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//admin authorsNew

//admin authors

//admin booksNew

//admin books

//admin edit

//admin user

//CONTROLLERS
//admin home
var adminRouter = function adminRouter(oldhash, newhash, data) {

	var user = data;
	var adminContainer = document.querySelector('#admin-container');

	var routes = function routes(container) {

		if (newhash === '#/admin/') {
			//ADMIN HOME
			(0, _adminHome2.default)(container, user);
		} else if (newhash === '#/admin/new') {
			//ADMIN NEW
			(0, _adminNew2.default)(container);
		} else if (newhash === '#/admin/edit/') {
			//ADMIN EDIT
			(0, _adminEdit2.default)(container, user);
		} else if (newhash === '#/admin/edit/password') {
			//ADMIN EDIT PASSWORD
			(0, _adminEditPassword2.default)(container, user);
		} else if (newhash === '#/admin/users/') {
			//ADMIN USERS
			(0, _adminUsers2.default)(container);
		} else if (newhash.match(/#\/admin\/users\/[^\/]+$/)) {
			//ADMIN USER
			(0, _adminUser2.default)(container);
		} else if (newhash === '#/admin/books/') {
			//ADMIN BOOKS
			(0, _adminBooks2.default)(container);
		} else if (newhash === '#/admin/books/new') {
			//ADMIN BOOKS NEW
			(0, _adminBooksNew2.default)(container);
		} else if (newhash.match(/#\/admin\/books\/[^\/]+\/edit$/)) {
			//ADMIN BOOK EDIT
			(0, _adminBookEdit2.default)(container);
		} else if (newhash.match(/#\/admin\/books\/[^\/]+$/)) {
			//ADMIN BOOK
			(0, _adminBook2.default)(container);
		} else if (newhash === '#/admin/authors/') {
			//ADMIN AUTHORS
			(0, _adminAuthors2.default)(container);
		} else if (newhash === '#/admin/authors/new') {
			//ADMIN AUTHORS NEW
			(0, _adminAuthorsNew2.default)(container);
		} else if (newhash.match(/#\/admin\/authors\/[^\/]+\/edit$/)) {
			//ADMIN AUTHORS EDIT
			(0, _adminAuthorEdit2.default)(container);
		} else if (newhash.match(/#\/admin\/authors\/[^\/]+$/)) {
			//ADMIN AUTHOR
			(0, _adminAuthor2.default)(adminContainer);
		} else {
			//FALLBACK
			location.hash = '#/admin/';
		}
	};

	return routes(adminContainer);
};
//admin authorEdit

//admin author

//admin booksEdit

//admin book

//admin edit password

//admin new

//admin users
//UTILS
exports.default = adminRouter;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(2);

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminHomeTemplate = __webpack_require__(77);
//home.js
var adminHome = function adminHome(container, data) {
	'use strict';

	var c = container;
	//User
	if (!data) {
		return;
	}
	var user = data;
	//insert template in container
	c.innerHTML = adminHomeTemplate({ user: user });
	var root = document.querySelector("#adminHome");

	function logout() {
		var options = { method: 'GET', url: '/users/logout' };
		_utils2.default.ajax(options).then(function (response) {
			_dataStore2.default.setData('currentUser', JSON.parse(response).user);
			_utils2.default.addClass('#admin-item', 'hidden');
			_utils2.default.addClass('#menu-admin-item', 'hidden');
			location.hash = '#/';
		});
	}

	root.querySelector('#logout-btn').addEventListener('click', logout, false);
};

exports.default = adminHome;

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminHome" class="content">\n	<h4 class="w3-container w3-padding-16">Accueil</h4>\n	<div class="w3-container">\n		<div class="w3-border-bottom">\n			<p><%= user.name %></p>\n			<p><%= user.email %></p></p>\n		</div>\n		<div  class="w3-border-bottom">\n			<p><a id="update-user-btn" href="/#/admin/edit/" class="w3-text-gray w3-hover-none w3-hover-text-black">Modifier profil</a></p>\n			<p><a id="update-password-btn" href="/#/admin/edit/password" class="w3-text-gray w3-hover-none w3-hover-text-black">Modifier mot de passe</a></p>\n		</div>\n		<p><a id="new-btn" href="/#/admin/new" class="w3-text-gray w3-hover-none w3-hover-text-black">Nouveau compte administrateur</a></p>\n		<p><button id="logout-btn" type="button" class="w3-button w3-text-gray w3-hover-none w3-hover-text-black" style="padding-left:0px;padding-right:0px">Déconnexion</button></p>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminHome" class="content">\n	<h4 class="w3-container w3-padding-16">Accueil</h4>\n	<div class="w3-container">\n		<div class="w3-border-bottom">\n			<p>', escape((__stack.lineno = 5, user.name)), "</p>\n			<p>", escape((__stack.lineno = 6, user.email)), '</p></p>\n		</div>\n		<div  class="w3-border-bottom">\n			<p><a id="update-user-btn" href="/#/admin/edit/" class="w3-text-gray w3-hover-none w3-hover-text-black">Modifier profil</a></p>\n			<p><a id="update-password-btn" href="/#/admin/edit/password" class="w3-text-gray w3-hover-none w3-hover-text-black">Modifier mot de passe</a></p>\n		</div>\n		<p><a id="new-btn" href="/#/admin/new" class="w3-text-gray w3-hover-none w3-hover-text-black">Nouveau compte administrateur</a></p>\n		<p><button id="logout-btn" type="button" class="w3-button w3-text-gray w3-hover-none w3-hover-text-black" style="padding-left:0px;padding-right:0px">Déconnexion</button></p>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminUsersTemplate = __webpack_require__(79);
//home.js
var adminUsers = function adminUsers(container) {
	'use strict';

	var adminContainer = container;

	//ajax get users
	var options = { method: 'GET', url: '/users/' };
	_utils2.default.ajax(options).then(function (res) {
		var response = JSON.parse(res);
		if (response.error) {
			//insert template in container
			adminContainer.innerHTML = adminUsersTemplate({ users: [], error: response.error });
		} else {
			//insert template in container
			adminContainer.innerHTML = adminUsersTemplate({ users: response.users, error: '' });
		}
	});
};

exports.default = adminUsers;

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminUsers" class="content">\n	<h4 class="w3-container w3-padding-16 align-left">Utilisateurs</h4>\n	<div style="clear:both">\n		<span class="error"><%= error %></span>\n		<ul id="users-list" class=\'w3-ul\'>\n			<% for(var i=0; i<users.length; i++) {%>\n			<li>\n				<p id=\'<%= users[i].id %>\'>\n					<a href=\'/#/admin/users/<%= users[i].id %>\' class=\'w3-text-gray w3-hover-none w3-hover-text-black\'><%= users[i].email %></a>\n				</p>\n			</li>\n			<% } %>\n		</ul>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminUsers" class="content">\n	<h4 class="w3-container w3-padding-16 align-left">Utilisateurs</h4>\n	<div style="clear:both">\n		<span class="error">', escape((__stack.lineno = 4, error)), "</span>\n		<ul id=\"users-list\" class='w3-ul'>\n			");
                __stack.lineno = 6;
                for (var i = 0; i < users.length; i++) {
                    buf.push("\n			<li>\n				<p id='", escape((__stack.lineno = 8, users[i].id)), "'>\n					<a href='/#/admin/users/", escape((__stack.lineno = 9, users[i].id)), "' class='w3-text-gray w3-hover-none w3-hover-text-black'>", escape((__stack.lineno = 9, users[i].email)), "</a>\n				</p>\n			</li>\n			");
                    __stack.lineno = 12;
                }
                buf.push("\n		</ul>\n	</div>\n</div>\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminUserTemplate = __webpack_require__(81);
//home.js
var adminUser = function adminUser(container) {
	'use strict';

	var adminContainer = container;

	var id = location.hash.replace(/^#\/admin\/users\//, '');
	//ajax get user
	var options = { method: 'GET', url: '/users/' + id };
	_utils2.default.ajax(options).then(function (res) {
		var response = JSON.parse(res);
		if (response.error) {
			//insert template in container
			adminContainer.innerHTML = adminUserTemplate({ user: {}, error: response.error });
		} else {
			//insert template in container
			adminContainer.innerHTML = adminUserTemplate({ user: response.user, error: '' });

			var root = document.querySelector('#adminUser');
			var modal = root.querySelector('#modal');
			var div = root.querySelector('#user');

			//Open modal
			var openModalBtn = div.querySelector('#open-modal-btn');
			openModalBtn.addEventListener('click', function () {
				modal.style.display = 'block';
			}, false);

			//Close modal
			var closeModalBtn = modal.querySelector('#close-modal-btn');
			closeModalBtn.addEventListener('click', function () {
				modal.style.display = 'none';
			}, false);

			//Delete User
			var deleteUser = function deleteUser(event) {
				var options = { method: 'DELETE', url: '/users/' + id };
				_utils2.default.ajax(options).then(function (res) {
					var response = JSON.parse(res);
					if (response.error) {
						_utils2.default.bind(div, response);
						modal.style.display = 'none';
					} else {
						location.hash = '#/admin/users/';
					}
				});
			};

			var deleteBtn = modal.querySelector('#delete-btn');
			deleteBtn.addEventListener('click', deleteUser, false);
		}
	});
};

exports.default = adminUser;

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminUser" class="content">\n<!--\n	MODAL\n-->\n	<div id="modal" class="w3-modal w3-card-4">\n		<div class="w3-modal-content w3-animate-top">\n			<header class="w3-container w3-black"> \n				<span id="close-modal-btn" class="w3-button w3-display-topright">&times;</span>\n				<h4>Supprimer un utilisateur</h4>\n			</header>\n			<div  class="w3-container">\n				<p>Voulez-vous vraiment supprimer cet utilisateur ?</p>\n				<p><%= user.email %></p>\n				<p class="w3-right"><button type="button" id="delete-btn" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black">Supprimer</button></p>\n			</div>\n			\n		</div>\n	</div>\n<!--\n	MAIN\n-->\n	<h4 class="w3-container align-left w3-padding-16">Utilisateur</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/users/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div id="user" class="w3-container">\n		<span class="error"><%= error %></span>\n		<span class="error" id="modal-error" data-utils-bind="{{ error }}"></span>\n		<div class="w3-border-bottom">\n			<p><b>Nom : </b><%= user.name %></p>\n			<p><b>Email : </b><%= user.email %></p>\n			<p><b>Admin : </b><%= user.admin %></p>\n			<p><b>Créé le : </b><%= user.created_at %></p>\n			<p><b>Mis à jour le : </b><%= user.updated_at %></p>\n		</div>\n		<p><button type="button" id="open-modal-btn" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black w3-right">Supprimer</button></p>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminUser" class="content">\n<!--\n	MODAL\n-->\n	<div id="modal" class="w3-modal w3-card-4">\n		<div class="w3-modal-content w3-animate-top">\n			<header class="w3-container w3-black"> \n				<span id="close-modal-btn" class="w3-button w3-display-topright">&times;</span>\n				<h4>Supprimer un utilisateur</h4>\n			</header>\n			<div  class="w3-container">\n				<p>Voulez-vous vraiment supprimer cet utilisateur ?</p>\n				<p>', escape((__stack.lineno = 13, user.email)), '</p>\n				<p class="w3-right"><button type="button" id="delete-btn" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black">Supprimer</button></p>\n			</div>\n			\n		</div>\n	</div>\n<!--\n	MAIN\n-->\n	<h4 class="w3-container align-left w3-padding-16">Utilisateur</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/users/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div id="user" class="w3-container">\n		<span class="error">', escape((__stack.lineno = 25, error)), '</span>\n		<span class="error" id="modal-error" data-utils-bind="{{ error }}"></span>\n		<div class="w3-border-bottom">\n			<p><b>Nom : </b>', escape((__stack.lineno = 28, user.name)), "</p>\n			<p><b>Email : </b>", escape((__stack.lineno = 29, user.email)), "</p>\n			<p><b>Admin : </b>", escape((__stack.lineno = 30, user.admin)), "</p>\n			<p><b>Créé le : </b>", escape((__stack.lineno = 31, user.created_at)), "</p>\n			<p><b>Mis à jour le : </b>", escape((__stack.lineno = 32, user.updated_at)), '</p>\n		</div>\n		<p><button type="button" id="open-modal-btn" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black w3-right">Supprimer</button></p>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminNewTemplate = __webpack_require__(83);
//home.js
var adminNew = function adminNew(container) {
	'use strict';

	var adminContainer = container;

	//insert template in container
	adminContainer.innerHTML = adminNewTemplate();

	//rootElement
	var root = document.querySelector('#adminNew');
	//form
	var form = root.querySelector('#adminRegisterForm');
	var inputs = form.querySelectorAll('input');

	//clear errors on input
	function onInput(event) {
		_utils2.default.setHTML('#form-error', "");
		if (event.target.name === 'name') {
			_utils2.default.setHTML('#name .error', "");
		} else if (event.target.name === 'email') {
			_utils2.default.setHTML('#email .error', "");
		} else if (event.target.name === 'password') {
			_utils2.default.setHTML('#password .error', "");
		} else if (event.target.name === 'password_confirm') {
			_utils2.default.setHTML('#password_confirm .error', "");
		}
	}

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('input', onInput, false);
	}

	//submit
	function onSubmit(event) {
		event.preventDefault();
		_utils2.default.bind(form, {});
		var user = {};
		user.name = form.querySelector('[name=name]').value;
		user.email = form.querySelector('[name=email]').value;
		user.password = form.querySelector('[name=password]').value;
		user.password_confirm = form.querySelector('[name=password_confirm]').value;
		var options = { method: 'POST', url: '/users/admin/new', data: JSON.stringify(user) };
		_utils2.default.ajax(options).then(function (res) {
			var response = JSON.parse(res);
			if (response.errors) {
				_utils2.default.bind(form, response.errors);
			} else {
				location.hash = '#/admin/users/';
			}
		});
	}

	form.addEventListener('submit', onSubmit, false);
};

exports.default = adminNew;

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminNew" class="content">\n	<h4 class="w3-container align-left w3-padding-16">Nouveau compte administrateur</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminRegisterForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="name">\n				<label>Nom : </label>\n				<input type="text" name="name" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ name }}"></span>\n			</p>\n			\n			<p id="email">\n				<label>Email : </label>\n				<input type="text" name="email" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ email }}"></span>\n			</p>\n			\n			<p id="password">\n				<label>Mot de passe : </label>\n				<input type="password" name="password" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password }}"></span>\n			</p>\n			\n			<p id="password_confirm">\n				<label>Confirmation : </label>\n				<input type="password" name="password_confirm" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password_confirm }}"></span>\n			</p>\n			\n			<p>\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminNew" class="content">\n	<h4 class="w3-container align-left w3-padding-16">Nouveau compte administrateur</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminRegisterForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="name">\n				<label>Nom : </label>\n				<input type="text" name="name" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ name }}"></span>\n			</p>\n			\n			<p id="email">\n				<label>Email : </label>\n				<input type="text" name="email" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ email }}"></span>\n			</p>\n			\n			<p id="password">\n				<label>Mot de passe : </label>\n				<input type="password" name="password" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password }}"></span>\n			</p>\n			\n			<p id="password_confirm">\n				<label>Confirmation : </label>\n				<input type="password" name="password_confirm" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password_confirm }}"></span>\n			</p>\n			\n			<p>\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminEditTemplate = __webpack_require__(85);
//home.js
var adminEdit = function adminEdit(container, user) {
	'use strict';

	var adminContainer = container;

	//insert template in container
	adminContainer.innerHTML = adminEditTemplate();

	//rootElement
	var root = document.querySelector('#adminEdit');
	//form
	var form = root.querySelector('#adminEditForm');
	var inputs = form.querySelectorAll('input');
	var data = user;
	form.querySelector('[name=name]').value = data.name;
	form.querySelector('[name=email]').value = data.email;

	//clear errors on input
	function onInput(event) {
		_utils2.default.setHTML('#form-error', "");
		if (event.target.name === 'name') {
			_utils2.default.setHTML('#name .error', "");
		} else if (event.target.name === 'email') {
			_utils2.default.setHTML('#email .error', "");
		} else if (event.target.name === 'password') {
			_utils2.default.setHTML('#password .error', "");
		}
	}

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('input', onInput, false);
	}

	//submit
	function onSubmit(event) {
		event.preventDefault();
		_utils2.default.bind(form, {});
		var user = {};
		user.name = form.querySelector('[name=name]').value;
		user.email = form.querySelector('[name=email]').value;
		user.password = form.querySelector('[name=password]').value;
		var options = { method: 'PUT', url: '/users/' + data.id, data: JSON.stringify(user) };
		_utils2.default.ajax(options).then(function (res) {
			var response = JSON.parse(res);
			if (response.errors) {
				_utils2.default.bind(form, response.errors);
			} else {
				location.hash = '#/admin/';
			}
		});
	}

	form.addEventListener('submit', onSubmit, false);
};

exports.default = adminEdit;

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminEdit" class="content">\n	<h4 class="w3-container align-left w3-padding-16">Modifier votre profil</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminEditForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="name">\n				<label>Nom : </label>\n				<input type="text" name="name" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ name }}"></span>\n			</p>\n			\n			<p id="email">\n				<label>Email : </label>\n				<input type="text" name="email" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ email }}"></span>\n			</p>\n			\n			<p id="password">\n				<label>Mot de passe : </label>\n				<input type="password" name="password" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password }}"></span>\n			</p>\n			\n			<p>\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminEdit" class="content">\n	<h4 class="w3-container align-left w3-padding-16">Modifier votre profil</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminEditForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="name">\n				<label>Nom : </label>\n				<input type="text" name="name" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ name }}"></span>\n			</p>\n			\n			<p id="email">\n				<label>Email : </label>\n				<input type="text" name="email" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ email }}"></span>\n			</p>\n			\n			<p id="password">\n				<label>Mot de passe : </label>\n				<input type="password" name="password" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password }}"></span>\n			</p>\n			\n			<p>\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminEditPasswordTemplate = __webpack_require__(87);
//home.js
var adminEditPassword = function adminEditPassword(container, user) {
	'use strict';

	var adminContainer = container;
	var data = user;

	//insert template in container
	adminContainer.innerHTML = adminEditPasswordTemplate();

	//rootElement
	var root = document.querySelector('#adminEditPassword');
	//form
	var form = root.querySelector('#adminEditPasswordForm');
	var inputs = form.querySelectorAll('input');

	//clear errors on input
	function onInput(event) {
		_utils2.default.setHTML('#form-error', "");
		if (event.target.name === 'password') {
			_utils2.default.setHTML('#password .error', "");
		} else if (event.target.name === 'password_new') {
			_utils2.default.setHTML('#password_new .error', "");
		} else if (event.target.name === 'password_new_confirm') {
			_utils2.default.setHTML('#password_new_confirm .error', "");
		}
	}

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('input', onInput, false);
	}

	//submit
	function onSubmit(event) {
		event.preventDefault();
		_utils2.default.bind(form, {});
		var user = {};
		user.password = form.querySelector('[name=password]').value;
		user.password_new = form.querySelector('[name=password_new]').value;
		user.password_new_confirm = form.querySelector('[name=password_new_confirm]').value;
		var options = { method: 'PUT', url: '/users/password/' + data.id, data: JSON.stringify(user) };
		_utils2.default.ajax(options).then(function (res) {
			var response = JSON.parse(res);
			if (response.errors) {
				_utils2.default.bind(form, response.errors);
			} else {
				form.querySelector('[name=password]').value = "";
				form.querySelector('[name=password_new]').value = "";
				form.querySelector('[name=password_new_confirm]').value = "";
				_utils2.default.bind(form, { message: 'Votre mot de passe a été changé.' });
				_utils2.default.addClass('#form-error', 'hidden');
				_utils2.default.removeClass('#form-succes', 'hidden');
			}
		});
	}

	form.addEventListener('submit', onSubmit, false);
};

exports.default = adminEditPassword;

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminEditPassword" class="content">\n	<h4 class="w3-container align-left w3-padding-16">Modifier votre mot de passe</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminEditPasswordForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			<span class="success hidden" id="form-success" data-utils-bind="{{ message }}"></span>\n			\n			<p id="password">\n				<label>Mot de passe actuel : </label>\n				<input type="password" name="password" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password }}"></span>\n			</p>\n			\n			<p id="password_new">\n				<label>Nouveau mot de passe : </label>\n				<input type="password" name="password_new" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password_new }}"></span>\n			</p>\n			\n			<p id="password_new_confirm">\n				<label>Confirmation : </label>\n				<input type="password" name="password_new_confirm" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password_new_confirm }}"></span>\n			</p>\n			\n			<p>\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminEditPassword" class="content">\n	<h4 class="w3-container align-left w3-padding-16">Modifier votre mot de passe</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminEditPasswordForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			<span class="success hidden" id="form-success" data-utils-bind="{{ message }}"></span>\n			\n			<p id="password">\n				<label>Mot de passe actuel : </label>\n				<input type="password" name="password" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password }}"></span>\n			</p>\n			\n			<p id="password_new">\n				<label>Nouveau mot de passe : </label>\n				<input type="password" name="password_new" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password_new }}"></span>\n			</p>\n			\n			<p id="password_new_confirm">\n				<label>Confirmation : </label>\n				<input type="password" name="password_new_confirm" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ password_new_confirm }}"></span>\n			</p>\n			\n			<p>\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminBooksTemplate = __webpack_require__(89);
//home.js
var adminBooks = function adminBooks(container) {
	'use strict';

	var adminContainer = container;

	//ajax get books
	var options = { method: 'GET', url: '/books/' };
	_utils2.default.ajax(options).then(function (res) {
		var response = JSON.parse(res);
		if (response.error) {
			//insert template in container
			adminContainer.innerHTML = adminBooksTemplate({ books: [], error: response.error });
		} else {
			//insert template in container
			adminContainer.innerHTML = adminBooksTemplate({ books: response.books, error: '' });
		}
	});
};

exports.default = adminBooks;

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminBooks" class="content">\n	<h4 class="w3-container w3-padding-16 align-left">Ouvrages</h4>\n	<p class="w3-padding-16 align-right"><a href="/#/admin/books/new" class="w3-text-gray w3-hover-none w3-hover-text-black">Ajouter</a></p>\n	<div style="clear:both">\n		<span class="error"><%= error %></span>\n		<ul id="books-list" class=\'w3-ul\'>\n			<% for(var i=0; i<books.length; i++) {%>\n			<li>\n				<p>\n					<a href=\'/#/admin/books/<%= books[i].id %>\' class=\'w3-text-gray w3-hover-none w3-hover-text-black\'>\n						<%- books[i].title %>&ensp;\n						(<%- books[i].authorDisplay %>)\n					</a>\n				</p>\n			</li>\n			<% } %>\n		</ul>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminBooks" class="content">\n	<h4 class="w3-container w3-padding-16 align-left">Ouvrages</h4>\n	<p class="w3-padding-16 align-right"><a href="/#/admin/books/new" class="w3-text-gray w3-hover-none w3-hover-text-black">Ajouter</a></p>\n	<div style="clear:both">\n		<span class="error">', escape((__stack.lineno = 5, error)), "</span>\n		<ul id=\"books-list\" class='w3-ul'>\n			");
                __stack.lineno = 7;
                for (var i = 0; i < books.length; i++) {
                    buf.push("\n			<li>\n				<p>\n					<a href='/#/admin/books/", escape((__stack.lineno = 10, books[i].id)), "' class='w3-text-gray w3-hover-none w3-hover-text-black'>\n						", (__stack.lineno = 11, books[i].title), "&ensp;\n						(", (__stack.lineno = 12, books[i].authorDisplay), ")\n					</a>\n				</p>\n			</li>\n			");
                    __stack.lineno = 16;
                }
                buf.push("\n		</ul>\n	</div>\n</div>\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminBookTemplate = __webpack_require__(91);
//home.js
var adminBook = function adminBook(container) {
	'use strict';

	var id = location.hash.replace(/^#\/admin\/books\//, '');
	var c = container;

	//ajax get book
	var options = { method: 'GET', url: '/books/' + id };
	_utils2.default.ajax(options).then(function (res) {
		var response = JSON.parse(res);
		if (response.error) {
			//insert template in container
			c.innerHTML = adminBookTemplate({ book: {}, error: response.error });
		} else {
			//insert template in container
			c.innerHTML = adminBookTemplate({ book: response.book, error: '' });

			var root = document.querySelector('#adminBook');
			var modal = root.querySelector('#modal');
			var div = root.querySelector('#book');

			var openModalBtn = div.querySelector('#open-modal-btn');
			openModalBtn.addEventListener('click', function () {
				modal.style.display = 'block';
			}, false);

			var closeModalBtn = modal.querySelector('#close-modal-btn');
			closeModalBtn.addEventListener('click', function () {
				modal.style.display = 'none';
			}, false);

			var deleteBook = function deleteBook(event) {
				var options = { method: 'DELETE', url: '/books/' + id };
				_utils2.default.ajax(options).then(function (res) {
					var response = JSON.parse(res);
					if (response.error) {
						_utils2.default.bind(div, response, 'error');
						modal.style.display = 'none';
					} else {
						location.hash = '#/admin/books/';
					}
				});
			};

			var deleteBtn = modal.querySelector('#delete-btn');
			deleteBtn.addEventListener('click', deleteBook, false);
		}
	});
};

exports.default = adminBook;

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminBook" class="content">\n<!--\n	MODAL\n-->\n	<div id="modal" class="w3-modal w3-card-4">\n		<div class="w3-modal-content w3-animate-top">\n			<header class="w3-container w3-black"> \n				<span id="close-modal-btn" class="w3-button w3-display-topright">&times;</span>\n				<h4>Supprimer un ouvrage</h4>\n			</header>\n			<div  class="w3-container">\n				<p>Voulez-vous vraiment supprimer cet ouvrage ?</p>\n				<p><%- book.title %></p>\n				<p class="w3-right"><button type="button" id="delete-btn" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black">Supprimer</button></p>\n			</div>\n			\n		</div>\n	</div>\n\n<!--\n	MAIN\n-->\n	<h4 class="w3-container align-left w3-padding-16">Ouvrage</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/books/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div id="book" class="w3-container">\n		<span class="error"><%= error %></span>\n		<span class="error" id="modal-error" data-utils-bind="{{ error }}"></span>\n		<div class="w3-border-bottom">\n			<p><b>Titre : </b><span><%- book.title %></span></p>\n			<p><b>Sous-titre1 : </b><span><%- book.subtitle1 %></span></p>\n			<p><b>Sous-titre2 : </b><span><%- book.subtitle2 %></span></p>\n			<p><b>Auteur (libellé) : </b><span><%- book.authorDisplay %></span></p>\n			<p>\n				<% if (book.authors.length===1) { %>\n					<span><b>Auteur :</b></span>\n				<% } else { %>\n					<span><b>Auteurs :</b></span>\n				<% } %>\n			</p>\n			<ul id="authors-list" class=\'w3-ul\'>\n				<% for(var i=0; i<book.authors.length; i++) {%>\n				<li>\n					<a href=\'/#/admin/authors/<%= book.authors[i].id %>\' class="w3-text-gray w3-hover-none w3-hover-text-black">\n						<%= book.authors[i].name %>\n					</a>\n				</li>\n				<% } %>\n			</ul>\n			<p>\n				<% if (book.contribs.length===1) { %>\n					<span><b>Contributeur :</b></span>\n				<% } else { %>\n					<span><b>Contributeurs :</b></span>\n				<% } %>\n			</p>\n			<ul id="contribs-list" class=\'w3-ul\'>\n				<% for(var i=0; i<book.contribs.length; i++) {%>\n				<li>\n					<a href=\'/#/admin/authors/<%= book.contribs[i].id %>\' class="w3-text-gray w3-hover-none w3-hover-text-black">\n						<%= book.contribs[i].name %> (<%= book.contribs[i].role %>)\n					</a>\n				</li>\n				<% } %>\n			</ul>\n			<p><b>Année de publication : </b><span><%= book.year %></span></p>\n			<p><b>Langue : </b><span><%= book.language %></span></p>\n			<p><b>Source :</b></p>\n			<ul class=\'w3-ul\'>\n				<li><b>&Eacute;diteur : </b><span><%- book.source.publisher %></span></li>\n				<li><b>Année : </b><span><%= book.source.year %></span></li>\n				<li><b>Origine : </b><span><%= book.source.origin %></span></li>\n			</ul>\n			<p><b>Styles :</b></p>\n			<ul class=\'w3-ul\'>\n				<li><b>Couleur : </b><span><%= book.styles.color %></span></li>\n				<li><b>Image : </b><span><%= book.styles.image %></span></li>\n				<li><b>Police : </b><span><%= book.styles.font %></span></li>\n				<li><b>Couverture : </b><span><%= book.styles.cover %></span></li>\n				<li><b>Auteur : </b><span><%= book.styles.author %></span></li>\n				<li><b>Titre : </b><span><%= book.styles.title %></span></li>\n				<li><b>Sous-titre1 : </b><span><%= book.styles.subtitle1 %></span></li>\n				<li><b>Sous-titre2 : </b><span><%= book.styles.subtitle2 %></span></li>\n				<li><b>Logo : </b><span><%= book.styles.logo %></span></li>\n			</ul>\n			<p><b>Collection : </b><span><%= book.collection %></span></p>\n			<p><b>Description :</b></p>\n			<div><%= book.description %></div>\n			<p><b>Path : </b><span><%= book.path %></span></p>\n			<p><b>Visible : </b><span><% if(book.visible===true) {%>oui<%} else {%>non<%}%></span></p>\n			<p><b>Créé le : </b><span><%= book.created_at %></span></p>\n			<p><b>Mis à jour le : </b><span><%= book.updated_at %></span></p>\n		</div>\n		<p>\n			<a href="#/admin/books/<%= book.id %>/edit" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black w3-left">Modifier</a>\n			<button type="button" id="open-modal-btn" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black w3-right">Supprimer</button>\n		</p>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminBook" class="content">\n<!--\n	MODAL\n-->\n	<div id="modal" class="w3-modal w3-card-4">\n		<div class="w3-modal-content w3-animate-top">\n			<header class="w3-container w3-black"> \n				<span id="close-modal-btn" class="w3-button w3-display-topright">&times;</span>\n				<h4>Supprimer un ouvrage</h4>\n			</header>\n			<div  class="w3-container">\n				<p>Voulez-vous vraiment supprimer cet ouvrage ?</p>\n				<p>', (__stack.lineno = 13, book.title), '</p>\n				<p class="w3-right"><button type="button" id="delete-btn" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black">Supprimer</button></p>\n			</div>\n			\n		</div>\n	</div>\n\n<!--\n	MAIN\n-->\n	<h4 class="w3-container align-left w3-padding-16">Ouvrage</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/books/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div id="book" class="w3-container">\n		<span class="error">', escape((__stack.lineno = 26, error)), '</span>\n		<span class="error" id="modal-error" data-utils-bind="{{ error }}"></span>\n		<div class="w3-border-bottom">\n			<p><b>Titre : </b><span>', (__stack.lineno = 29, book.title), "</span></p>\n			<p><b>Sous-titre1 : </b><span>", (__stack.lineno = 30, book.subtitle1), "</span></p>\n			<p><b>Sous-titre2 : </b><span>", (__stack.lineno = 31, book.subtitle2), "</span></p>\n			<p><b>Auteur (libellé) : </b><span>", (__stack.lineno = 32, book.authorDisplay), "</span></p>\n			<p>\n				");
                __stack.lineno = 34;
                if (book.authors.length === 1) {
                    buf.push("\n					<span><b>Auteur :</b></span>\n				");
                    __stack.lineno = 36;
                } else {
                    buf.push("\n					<span><b>Auteurs :</b></span>\n				");
                    __stack.lineno = 38;
                }
                buf.push("\n			</p>\n			<ul id=\"authors-list\" class='w3-ul'>\n				");
                __stack.lineno = 41;
                for (var i = 0; i < book.authors.length; i++) {
                    buf.push("\n				<li>\n					<a href='/#/admin/authors/", escape((__stack.lineno = 43, book.authors[i].id)), '\' class="w3-text-gray w3-hover-none w3-hover-text-black">\n						', escape((__stack.lineno = 44, book.authors[i].name)), "\n					</a>\n				</li>\n				");
                    __stack.lineno = 47;
                }
                buf.push("\n			</ul>\n			<p>\n				");
                __stack.lineno = 50;
                if (book.contribs.length === 1) {
                    buf.push("\n					<span><b>Contributeur :</b></span>\n				");
                    __stack.lineno = 52;
                } else {
                    buf.push("\n					<span><b>Contributeurs :</b></span>\n				");
                    __stack.lineno = 54;
                }
                buf.push("\n			</p>\n			<ul id=\"contribs-list\" class='w3-ul'>\n				");
                __stack.lineno = 57;
                for (var i = 0; i < book.contribs.length; i++) {
                    buf.push("\n				<li>\n					<a href='/#/admin/authors/", escape((__stack.lineno = 59, book.contribs[i].id)), '\' class="w3-text-gray w3-hover-none w3-hover-text-black">\n						', escape((__stack.lineno = 60, book.contribs[i].name)), " (", escape((__stack.lineno = 60, book.contribs[i].role)), ")\n					</a>\n				</li>\n				");
                    __stack.lineno = 63;
                }
                buf.push("\n			</ul>\n			<p><b>Année de publication : </b><span>", escape((__stack.lineno = 65, book.year)), "</span></p>\n			<p><b>Langue : </b><span>", escape((__stack.lineno = 66, book.language)), "</span></p>\n			<p><b>Source :</b></p>\n			<ul class='w3-ul'>\n				<li><b>&Eacute;diteur : </b><span>", (__stack.lineno = 69, book.source.publisher), "</span></li>\n				<li><b>Année : </b><span>", escape((__stack.lineno = 70, book.source.year)), "</span></li>\n				<li><b>Origine : </b><span>", escape((__stack.lineno = 71, book.source.origin)), "</span></li>\n			</ul>\n			<p><b>Styles :</b></p>\n			<ul class='w3-ul'>\n				<li><b>Couleur : </b><span>", escape((__stack.lineno = 75, book.styles.color)), "</span></li>\n				<li><b>Image : </b><span>", escape((__stack.lineno = 76, book.styles.image)), "</span></li>\n				<li><b>Police : </b><span>", escape((__stack.lineno = 77, book.styles.font)), "</span></li>\n				<li><b>Couverture : </b><span>", escape((__stack.lineno = 78, book.styles.cover)), "</span></li>\n				<li><b>Auteur : </b><span>", escape((__stack.lineno = 79, book.styles.author)), "</span></li>\n				<li><b>Titre : </b><span>", escape((__stack.lineno = 80, book.styles.title)), "</span></li>\n				<li><b>Sous-titre1 : </b><span>", escape((__stack.lineno = 81, book.styles.subtitle1)), "</span></li>\n				<li><b>Sous-titre2 : </b><span>", escape((__stack.lineno = 82, book.styles.subtitle2)), "</span></li>\n				<li><b>Logo : </b><span>", escape((__stack.lineno = 83, book.styles.logo)), "</span></li>\n			</ul>\n			<p><b>Collection : </b><span>", escape((__stack.lineno = 85, book.collection)), "</span></p>\n			<p><b>Description :</b></p>\n			<div>", escape((__stack.lineno = 87, book.description)), "</div>\n			<p><b>Path : </b><span>", escape((__stack.lineno = 88, book.path)), "</span></p>\n			<p><b>Visible : </b><span>");
                __stack.lineno = 89;
                if (book.visible === true) {
                    buf.push("oui");
                    __stack.lineno = 89;
                } else {
                    buf.push("non");
                    __stack.lineno = 89;
                }
                buf.push("</span></p>\n			<p><b>Créé le : </b><span>", escape((__stack.lineno = 90, book.created_at)), "</span></p>\n			<p><b>Mis à jour le : </b><span>", escape((__stack.lineno = 91, book.updated_at)), '</span></p>\n		</div>\n		<p>\n			<a href="#/admin/books/', escape((__stack.lineno = 94, book.id)), '/edit" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black w3-left">Modifier</a>\n			<button type="button" id="open-modal-btn" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black w3-right">Supprimer</button>\n		</p>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(2);

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminBooksNewTemplate = __webpack_require__(93);
var modalHeaderTemplate = __webpack_require__(94);
var searchAuthorsResultsTemplate = __webpack_require__(95);
var selectedAuthorsTemplate = __webpack_require__(96);
var selectedContribsTemplate = __webpack_require__(97);
var selectedContribRoleTemplate = __webpack_require__(98);
//home.js
var adminBooksNew = function adminBooksNew(container) {
	'use strict';

	//INSERT TEMPLATE IN CONTAINER

	var c = container;
	c.innerHTML = adminBooksNewTemplate();

	//ELEMENTS
	//rootElement
	var root = document.querySelector('#adminBooksNew');
	//form
	var form = root.querySelector('#adminBooksNewForm');
	var inputs = form.querySelectorAll('input');
	//modal
	var modal = root.querySelector('#modal');
	var searchInput = modal.querySelector('input');
	var results = modal.querySelector('#results');
	//authors, contribs containers
	var authorsContainer = root.querySelector('#authorsContainer');
	var contribsContainer = root.querySelector('#contribsContainer');

	//SCOPE VARIABLES
	var authType = '';
	var selectedAuthorsDisplay = [],
	    selectedAuthors = [];
	var selectedContribsDisplay = [],
	    selectedContribs = [];
	var json = ""; //search : string json to compare with response

	//CLEAR ERRORS ON INPUT
	function onInput(event) {
		_utils2.default.setHTML('#form-error', "");
		if (event.target.name === 'title') {
			_utils2.default.setHTML('#title .error', "");
		} else if (event.target.name === 'authorDisplay') {
			_utils2.default.setHTML('#authorDisplay .error', "");
		} else if (event.target.name === 'year') {
			_utils2.default.setHTML('#year .error', "");
		} else if (event.target.name === 'language') {
			_utils2.default.setHTML('#language .error', "");
		} else if (event.target.name === 'path') {
			_utils2.default.setHTML('#path .error', "");
		}
	}

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('input', onInput, false);
	}

	//SUBMIT
	function onSubmit(event) {
		event.preventDefault();
		_utils2.default.bind(form, {});
		var book = {};
		book.source = {};
		book.styles = {};
		book.title = form.querySelector('[name=title]').value;
		book.subtitle1 = form.querySelector('[name=subtitle1]').value;
		book.subtitle2 = form.querySelector('[name=subtitle2]').value;
		book.authorDisplay = form.querySelector('[name=authorDisplay]').value;
		book.year = form.querySelector('[name=year]').value;
		book.language = form.querySelector('[name=language]').value;
		book.categories = form.querySelector('[name=categories]').value;
		book.collection = form.querySelector('[name=collection]').value;
		book.source.publisher = form.querySelector('[name=source-publisher]').value;
		book.source.year = form.querySelector('[name=source-year]').value;
		book.source.origin = form.querySelector('[name=source-origin]').value;
		book.styles.color = form.querySelector('[name=styles-color').value;
		book.styles.image = form.querySelector('[name=styles-image').value;
		book.styles.font = form.querySelector('[name=styles-font').value;
		book.styles.cover = form.querySelector('[name=styles-cover').value;
		book.styles.author = form.querySelector('[name=styles-author').value;
		book.styles.title = form.querySelector('[name=styles-title').value;
		book.styles.subtitle1 = form.querySelector('[name=styles-subtitle1').value;
		book.styles.subtitle2 = form.querySelector('[name=styles-subtitle2').value;
		book.styles.logo = form.querySelector('[name=styles-logo').value;
		book.description = form.querySelector('[name=description]').value;
		book.path = form.querySelector('[name=path]').value;
		book.visible = form.querySelector('[name=visible]').checked ? true : false;
		book.authors = selectedAuthors;
		book.contribs = selectedContribs;
		var options = { method: 'POST', url: '/books/', data: JSON.stringify(book) };
		_utils2.default.ajax(options).then(function (res) {
			var response = JSON.parse(res);
			if (response.errors) {
				_utils2.default.bind(form, response.errors);
			} else {
				location.hash = '#/admin/books/';
			}
		});
	}

	form.addEventListener('submit', onSubmit, false);

	//SEARCH MODAL
	//open modal
	var openModal = function openModal(event) {
		event.preventDefault();
		authType = event.target.id;
		document.querySelector('#modal h4').innerHTML = modalHeaderTemplate({ authType: authType });
		_utils2.default.removeClass('#search', 'hidden');
		modal.style.display = 'block';
	};

	var openModalBtns = root.querySelectorAll('.open-modal-btn');
	for (var _i = 0; _i < openModalBtns.length; _i++) {
		openModalBtns[_i].addEventListener('click', openModal, false);
	}

	//close modal
	var closeModal = function closeModal() {
		modal.style.display = 'none';
		searchInput.value = '';
		results.innerHTML = '';
	};

	var closeModalBtn = modal.querySelector('#close-modal-btn');
	closeModalBtn.addEventListener('click', closeModal, false);

	//search
	function onkeyup(event) {
		var string = event.target.value;
		var options = { method: "GET", url: '/authors/search?q=' + string };
		_utils2.default.ajax(options).then(function (res) {
			var response = JSON.parse(res);
			if (response.error) {
				_utils2.default.bind(modal, response, 'error');
			} else {
				if (res !== json) {
					//compare JSON string
					json = res;
					results.innerHTML = searchAuthorsResultsTemplate({ authors: response.authors });
				}

				var addBtns = modal.querySelectorAll('.add-btn');
				for (var _i2 = 0; _i2 < addBtns.length; _i2++) {
					addBtns[_i2].addEventListener('click', addAuth, false);
				}
			}
		}).catch(function (err) {
			console.log(err);
		});
	}

	searchInput.addEventListener('keyup', onkeyup, false);

	//ADD SELECTED AUTHORS/CONTRIBS
	function addAuth(event) {
		var id = event.target.parentElement.id;
		var name = event.target.parentElement.firstElementChild.innerHTML;

		if (authType === 'auteur') {
			selectedAuthors.push(id);
			selectedAuthorsDisplay.push({ id: id, name: name });
			_utils2.default.setHTML('#authors .error', "");
			authorsContainer.innerHTML = selectedAuthorsTemplate({ selectedAuthors: selectedAuthorsDisplay });
			closeModal();
			var deleteBtns = authorsContainer.querySelectorAll('.delete-btn');
			for (var _i3 = 0; _i3 < deleteBtns.length; _i3++) {
				deleteBtns[_i3].addEventListener('click', deleteAuth, false);
			}
		} else if (authType === 'contributeur') {
			_utils2.default.addClass('#search', 'hidden');
			results.innerHTML = selectedContribRoleTemplate({ selectedContrib: { id: id, name: name } });
			results.querySelector('#add-contrib-role-btn').addEventListener('click', function (event) {
				var role = results.querySelector('[name=contrib-role]').value;
				selectedContribs.push({ id: id, role: role });
				selectedContribsDisplay.push({ id: id, name: name, role: role });
				contribsContainer.innerHTML = selectedContribsTemplate({ selectedContribs: selectedContribsDisplay });
				closeModal();
				var deleteBtns = contribsContainer.querySelectorAll('.delete-btn');
				for (var _i4 = 0; _i4 < deleteBtns.length; _i4++) {
					deleteBtns[_i4].addEventListener('click', deleteAuth, false);
				}
			}, false);
		}
	}

	//DELETE SELECTED AUTHORS/CONTRIBS
	function deleteAuth(event) {
		var index = event.target.parentElement.id;
		authType = event.target.id;
		if (authType === 'auteur') {
			selectedAuthors.splice(index, 1);
			selectedAuthorsDisplay.splice(index, 1);
			authorsContainer.innerHTML = selectedAuthorsTemplate({ selectedAuthors: selectedAuthorsDisplay });
			var deleteBtns = authorsContainer.querySelectorAll('.delete-btn');
			for (var _i5 = 0; _i5 < deleteBtns.length; _i5++) {
				deleteBtns[_i5].addEventListener('click', deleteAuth, false);
			}
		} else if (authType === 'contributeur') {
			selectedContribs.splice(index, 1);
			selectedContribsDisplay.splice(index, 1);
			contribsContainer.innerHTML = selectedContribsTemplate({ selectedContribs: selectedContribsDisplay });
			var _deleteBtns = contribsContainer.querySelectorAll('.delete-btn');
			for (var _i6 = 0; _i6 < _deleteBtns.length; _i6++) {
				_deleteBtns[_i6].addEventListener('click', deleteAuth, false);
			}
		}
	}
};

exports.default = adminBooksNew;

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminBooksNew" class="content">\n<!--\n	MODAL\n-->\n	<div id="modal" class="w3-modal w3-card-4">\n		<div class="w3-modal-content w3-animate-top">\n			<header class="w3-container w3-black"> \n				<span id="close-modal-btn" class="w3-button w3-display-topright">&times;</span>\n				<h4>Rechercher un auteur</h4>\n			</header>\n			<div class="w3-container">\n				<p id="search">\n				<input type="text" name="search" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ error }}"></span>\n				</p>\n				<div id="results" style="min-height:150px"></div>\n			</div>\n			\n		</div>\n	</div>\n<!--\n	MAIN\n-->\n	<h4 class="w3-container align-left w3-padding-16">Ajouter un ouvrage</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/books/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminBooksNewForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="title">\n				<label>Titre * : </label>\n				<input type="text" name="title" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ title }}"></span>\n			</p>\n			\n			<p id="subtitle1">\n				<label>Sous-titre 1 : </label>\n				<input type="text" name="subtitle1" class="w3-input w3-border">\n			</p>\n			\n			<p id="subtitle2">\n				<label>Sous-titre 2 : </label>\n				<input type="text" name="subtitle2" class="w3-input w3-border">\n			</p>\n			\n			<p id="authorDisplay">\n				<label>Auteur (libellé) * : </label>\n				<input type="text" name="authorDisplay" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ authorDisplay }}"></span>\n			</p>\n			\n			<div id="authors" class="w3-margin-bottom w3-border-bottom">\n				<div class="w3-margin-bottom" style="min-height:100px">\n					<p>\n						<label class="align-left">Auteurs * : </label>\n						<a href="/#/authors" id="auteur" class="align-right w3-text-gray w3-hover-none w3-hover-text-black open-modal-btn">Rechercher</a>\n					</p>\n					\n					<ul id="authorsContainer" class="w3-ul w3-padding-32"></ul>\n					<span class="error" data-utils-bind="{{ authors }}"></span>\n				</div>\n				\n			</div>\n			\n			<div id="contribs" class="w3-margin-bottom w3-border-bottom">\n				<div class="w3-margin-bottom" style="min-height:100px">\n					<p>\n						<label class="align-left">Contributeurs : </label>\n						<a href="/#/contribs" id="contributeur" class="align-right w3-text-gray w3-hover-none w3-hover-text-black open-modal-btn">Rechercher</a>\n					</p>\n					\n					<ul id="contribsContainer" class="w3-ul w3-padding-32"></ul>\n				</div>\n				\n			</div>\n			\n			<p id="year">\n				<label>Année de publication * : </label>\n				<input type="text" name="year" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ year }}"></span>\n			</p>\n			\n			<p id="language">\n				<label>Langue * : </label>\n				<input type="text" name="language" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ language }}"></span>\n			</p>\n			\n			<p id="categories">\n				<label>Catégories : </label>\n				<input type="text" name="categories" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ categories }}"></span>\n			</p>\n			\n			<p id="collection">\n				<label>Collection : </label>\n				<input type="text" name="collection" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ collection }}"></span>\n			</p>\n			\n			<p id="source-publisher">\n				<label>Source - éditeur : </label>\n				<input type="text" name="source-publisher" class="w3-input w3-border">\n			</p>\n			\n			<p id="source-year">\n				<label>Source - année de publication : </label>\n				<input type="text" name="source-year" class="w3-input w3-border">\n			</p>\n			\n			<p id="source-origin">\n				<label>Source - origine : </label>\n				<input type="text" name="source-origin" class="w3-input w3-border">\n			</p>\n			\n			<p id="styles-color">\n				<label>Styles - couleur : </label>\n				<input type="text" name="styles-color" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-image">\n				<label>Styles - image : </label>\n				<input type="text" name="styles-image" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-font">\n				<label>Styles - police : </label>\n				<input type="text" name="styles-font" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-cover">\n				<label>Styles - couverture : </label>\n				<input type="text" name="styles-cover" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-author">\n				<label>Styles - auteur : </label>\n				<input type="text" name="styles-author" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-title">\n				<label>Styles - titre : </label>\n				<input type="text" name="styles-title" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-subtitle1">\n				<label>Styles - sous-titre1 : </label>\n				<input type="text" name="styles-subtitle1" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-subtitle2">\n				<label>Styles - sous-titre2 : </label>\n				<input type="text" name="styles-subtitle2" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-subtitle2">\n				<label>Styles - sous-titre2 : </label>\n				<input type="text" name="styles-subtitle2" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-logo">\n				<label>Styles - logo : </label>\n				<input type="text" name="styles-logo" class="w3-input w3-border" >\n			</p>\n			\n			<p id="description">\n				<label>Description : </label>\n				<textarea type="text" name="description" class="w3-input w3-border"></textarea>\n			</p>\n			\n			<p id="path">\n				<label>Path * : </label>\n				<input type="text" name="path" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ path }}"></span>\n			</p>\n			\n			<p id="visible">\n				<label><input type="checkbox" name="visible" > Visible</label>\n			</p>\n			\n			<p class="w3-padding-24">\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminBooksNew" class="content">\n<!--\n	MODAL\n-->\n	<div id="modal" class="w3-modal w3-card-4">\n		<div class="w3-modal-content w3-animate-top">\n			<header class="w3-container w3-black"> \n				<span id="close-modal-btn" class="w3-button w3-display-topright">&times;</span>\n				<h4>Rechercher un auteur</h4>\n			</header>\n			<div class="w3-container">\n				<p id="search">\n				<input type="text" name="search" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ error }}"></span>\n				</p>\n				<div id="results" style="min-height:150px"></div>\n			</div>\n			\n		</div>\n	</div>\n<!--\n	MAIN\n-->\n	<h4 class="w3-container align-left w3-padding-16">Ajouter un ouvrage</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/books/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminBooksNewForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="title">\n				<label>Titre * : </label>\n				<input type="text" name="title" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ title }}"></span>\n			</p>\n			\n			<p id="subtitle1">\n				<label>Sous-titre 1 : </label>\n				<input type="text" name="subtitle1" class="w3-input w3-border">\n			</p>\n			\n			<p id="subtitle2">\n				<label>Sous-titre 2 : </label>\n				<input type="text" name="subtitle2" class="w3-input w3-border">\n			</p>\n			\n			<p id="authorDisplay">\n				<label>Auteur (libellé) * : </label>\n				<input type="text" name="authorDisplay" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ authorDisplay }}"></span>\n			</p>\n			\n			<div id="authors" class="w3-margin-bottom w3-border-bottom">\n				<div class="w3-margin-bottom" style="min-height:100px">\n					<p>\n						<label class="align-left">Auteurs * : </label>\n						<a href="/#/authors" id="auteur" class="align-right w3-text-gray w3-hover-none w3-hover-text-black open-modal-btn">Rechercher</a>\n					</p>\n					\n					<ul id="authorsContainer" class="w3-ul w3-padding-32"></ul>\n					<span class="error" data-utils-bind="{{ authors }}"></span>\n				</div>\n				\n			</div>\n			\n			<div id="contribs" class="w3-margin-bottom w3-border-bottom">\n				<div class="w3-margin-bottom" style="min-height:100px">\n					<p>\n						<label class="align-left">Contributeurs : </label>\n						<a href="/#/contribs" id="contributeur" class="align-right w3-text-gray w3-hover-none w3-hover-text-black open-modal-btn">Rechercher</a>\n					</p>\n					\n					<ul id="contribsContainer" class="w3-ul w3-padding-32"></ul>\n				</div>\n				\n			</div>\n			\n			<p id="year">\n				<label>Année de publication * : </label>\n				<input type="text" name="year" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ year }}"></span>\n			</p>\n			\n			<p id="language">\n				<label>Langue * : </label>\n				<input type="text" name="language" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ language }}"></span>\n			</p>\n			\n			<p id="categories">\n				<label>Catégories : </label>\n				<input type="text" name="categories" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ categories }}"></span>\n			</p>\n			\n			<p id="collection">\n				<label>Collection : </label>\n				<input type="text" name="collection" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ collection }}"></span>\n			</p>\n			\n			<p id="source-publisher">\n				<label>Source - éditeur : </label>\n				<input type="text" name="source-publisher" class="w3-input w3-border">\n			</p>\n			\n			<p id="source-year">\n				<label>Source - année de publication : </label>\n				<input type="text" name="source-year" class="w3-input w3-border">\n			</p>\n			\n			<p id="source-origin">\n				<label>Source - origine : </label>\n				<input type="text" name="source-origin" class="w3-input w3-border">\n			</p>\n			\n			<p id="styles-color">\n				<label>Styles - couleur : </label>\n				<input type="text" name="styles-color" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-image">\n				<label>Styles - image : </label>\n				<input type="text" name="styles-image" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-font">\n				<label>Styles - police : </label>\n				<input type="text" name="styles-font" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-cover">\n				<label>Styles - couverture : </label>\n				<input type="text" name="styles-cover" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-author">\n				<label>Styles - auteur : </label>\n				<input type="text" name="styles-author" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-title">\n				<label>Styles - titre : </label>\n				<input type="text" name="styles-title" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-subtitle1">\n				<label>Styles - sous-titre1 : </label>\n				<input type="text" name="styles-subtitle1" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-subtitle2">\n				<label>Styles - sous-titre2 : </label>\n				<input type="text" name="styles-subtitle2" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-subtitle2">\n				<label>Styles - sous-titre2 : </label>\n				<input type="text" name="styles-subtitle2" class="w3-input w3-border" >\n			</p>\n			\n			<p id="styles-logo">\n				<label>Styles - logo : </label>\n				<input type="text" name="styles-logo" class="w3-input w3-border" >\n			</p>\n			\n			<p id="description">\n				<label>Description : </label>\n				<textarea type="text" name="description" class="w3-input w3-border"></textarea>\n			</p>\n			\n			<p id="path">\n				<label>Path * : </label>\n				<input type="text" name="path" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ path }}"></span>\n			</p>\n			\n			<p id="visible">\n				<label><input type="checkbox" name="visible" > Visible</label>\n			</p>\n			\n			<p class="w3-padding-24">\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: "<span>Rechercher un <%= authType %></span>\n",
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push("<span>Rechercher un ", escape((__stack.lineno = 1, authType)), "</span>\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<ul class="w3-ul">\n<% for(var i=0; i<authors.length; i++) {%>\n<li class="w3-display-container">\n	<p id="<%= authors[i].id %>" >\n		<span><%- authors[i].name %></span> \n		<button type="button" class="add-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-right">Ajouter</button>\n	</p>\n</li>\n<% } %>\n</ul>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<ul class="w3-ul">\n');
                __stack.lineno = 2;
                for (var i = 0; i < authors.length; i++) {
                    buf.push('\n<li class="w3-display-container">\n	<p id="', escape((__stack.lineno = 4, authors[i].id)), '" >\n		<span>', (__stack.lineno = 5, authors[i].name), '</span> \n		<button type="button" class="add-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-right">Ajouter</button>\n	</p>\n</li>\n');
                    __stack.lineno = 9;
                }
                buf.push("\n</ul>\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<% for(var i=0; i<selectedAuthors.length; i++) {%>\n<li class="w3-display-container">\n	<p data-key="<%= selectedAuthors[i].id %>" id="<%= i %>" >\n		<span><%- selectedAuthors[i].name %></span>\n		<button type="button" id="auteur" class="delete-btn w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Supprimer</button>\n	</p>\n</li>\n<% } %>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push("");
                __stack.lineno = 1;
                for (var i = 0; i < selectedAuthors.length; i++) {
                    buf.push('\n<li class="w3-display-container">\n	<p data-key="', escape((__stack.lineno = 3, selectedAuthors[i].id)), '" id="', escape((__stack.lineno = 3, i)), '" >\n		<span>', (__stack.lineno = 4, selectedAuthors[i].name), '</span>\n		<button type="button" id="auteur" class="delete-btn w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Supprimer</button>\n	</p>\n</li>\n');
                    __stack.lineno = 8;
                }
                buf.push("\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<% for(var i=0; i<selectedContribs.length; i++) {%>\n<li class="w3-display-container">\n	<p data-key="<%= selectedContribs[i].id %>" id="<%= i %>" >\n		<span><%- selectedContribs[i].name %> </span>\n		<span>(<%= selectedContribs[i].role %>)</span>\n		<button type="button" id="contributeur" class="delete-btn w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Supprimer</button>\n	</p>\n</li>\n<% } %>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push("");
                __stack.lineno = 1;
                for (var i = 0; i < selectedContribs.length; i++) {
                    buf.push('\n<li class="w3-display-container">\n	<p data-key="', escape((__stack.lineno = 3, selectedContribs[i].id)), '" id="', escape((__stack.lineno = 3, i)), '" >\n		<span>', (__stack.lineno = 4, selectedContribs[i].name), " </span>\n		<span>(", escape((__stack.lineno = 5, selectedContribs[i].role)), ')</span>\n		<button type="button" id="contributeur" class="delete-btn w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Supprimer</button>\n	</p>\n</li>\n');
                    __stack.lineno = 9;
                }
                buf.push("\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<p id="<%= selectedContrib.id %>"><%= selectedContrib.name %></p>\n<p>\n	<label>function : </label>\n	<input type="text" name="contrib-role" class="w3-input w3-border">\n</p>\n<p class="w3-display-container w3-padding-16">\n	<button type="button" id="add-contrib-role-btn" class="w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Ajouter</button>\n</p>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<p id="', escape((__stack.lineno = 1, selectedContrib.id)), '">', escape((__stack.lineno = 1, selectedContrib.name)), '</p>\n<p>\n	<label>function : </label>\n	<input type="text" name="contrib-role" class="w3-input w3-border">\n</p>\n<p class="w3-display-container w3-padding-16">\n	<button type="button" id="add-contrib-role-btn" class="w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Ajouter</button>\n</p>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(2);

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminBookEditTemplate = __webpack_require__(100);
var modalHeaderTemplate = __webpack_require__(101);
var searchAuthorsResultsTemplate = __webpack_require__(102);
var selectedAuthorsTemplate = __webpack_require__(103);
var selectedContribsTemplate = __webpack_require__(104);
var selectedContribRoleTemplate = __webpack_require__(105);
//home.js
var adminBooksNew = function adminBooksNew(container) {
	'use strict';

	var id = location.hash.replace(/(#\/admin\/books\/|\/edit)/g, '');
	var c = container;

	var options = { method: 'GET', url: '/books/' + id };
	_utils2.default.ajax(options).then(function (res) {
		var response = JSON.parse(res);
		if (response.error) {
			console.log(response.error);
		} else {

			//CLEAR ERRORS ON INPUT
			var onInput = function onInput(event) {
				_utils2.default.setHTML('#form-error', "");
				if (event.target.name === 'title') {
					_utils2.default.setHTML('#title .error', "");
				} else if (event.target.name === 'authorDisplay') {
					_utils2.default.setHTML('#authorDisplay .error', "");
				} else if (event.target.name === 'year') {
					_utils2.default.setHTML('#year .error', "");
				} else if (event.target.name === 'language') {
					_utils2.default.setHTML('#language .error', "");
				} else if (event.target.name === 'path') {
					_utils2.default.setHTML('#path .error', "");
				}
			};

			//SUBMIT
			var onSubmit = function onSubmit(event) {
				event.preventDefault();
				_utils2.default.bind(form, {});
				var book = {};
				book.source = {};
				book.styles = {};
				book.title = form.querySelector('[name=title]').value;
				book.subtitle1 = form.querySelector('[name=subtitle1]').value;
				book.subtitle2 = form.querySelector('[name=subtitle2]').value;
				book.authorDisplay = form.querySelector('[name=authorDisplay]').value;
				book.year = form.querySelector('[name=year]').value;
				book.language = form.querySelector('[name=language]').value;
				book.categories = form.querySelector('[name=categories]').value;
				book.collection = form.querySelector('[name=collection]').value;
				book.source.publisher = form.querySelector('[name=source-publisher]').value;
				book.source.year = form.querySelector('[name=source-year]').value;
				book.source.origin = form.querySelector('[name=source-origin]').value;
				book.styles.color = form.querySelector('[name=styles-color').value;
				book.styles.image = form.querySelector('[name=styles-image').value;
				book.styles.font = form.querySelector('[name=styles-font').value;
				book.styles.cover = form.querySelector('[name=styles-cover').value;
				book.styles.author = form.querySelector('[name=styles-author').value;
				book.styles.title = form.querySelector('[name=styles-title').value;
				book.styles.subtitle1 = form.querySelector('[name=styles-subtitle1').value;
				book.styles.subtitle2 = form.querySelector('[name=styles-subtitle2').value;
				book.styles.logo = form.querySelector('[name=styles-logo').value;
				book.description = form.querySelector('[name=description]').value;
				book.path = form.querySelector('[name=path]').value;
				book.visible = form.querySelector('[name=visible]').checked ? true : false;
				book.authors = selectedAuthors;
				book.contribs = selectedContribs;
				var options = { method: 'PUT', url: '/books/' + id, data: JSON.stringify(book) };
				_utils2.default.ajax(options).then(function (res) {
					var response = JSON.parse(res);
					if (response.errors) {
						_utils2.default.bind(form, response.errors);
					} else {
						location.hash = '#/admin/books/' + id;
					}
				});
			};

			//search
			var onkeyup = function onkeyup(event) {
				var string = event.target.value;
				var options = { method: "GET", url: '/authors/search?q=' + string };
				_utils2.default.ajax(options).then(function (res) {
					var response = JSON.parse(res);
					if (response.error) {
						_utils2.default.bind(modal, response, 'error');
					} else {
						if (res !== json) {
							//compare JSON string
							json = res;
							results.innerHTML = searchAuthorsResultsTemplate({ authors: response.authors });
						}

						var addBtns = modal.querySelectorAll('.add-btn');
						for (var _i5 = 0; _i5 < addBtns.length; _i5++) {
							addBtns[_i5].addEventListener('click', addAuth, false);
						}
					}
				}).catch(function (err) {
					console.log(err);
				});
			};

			//ADD SELECTED AUTHORS/CONTRIBS
			var addAuth = function addAuth(event) {
				var id = event.target.parentElement.id;
				var name = event.target.parentElement.firstElementChild.innerHTML;

				if (authType === 'auteur') {
					selectedAuthors.push(id);
					selectedAuthorsDisplay.push({ id: id, name: name });
					_utils2.default.setHTML('#authors .error', "");
					authorsContainer.innerHTML = selectedAuthorsTemplate({ selectedAuthors: selectedAuthorsDisplay });
					closeModal();
					var _deleteBtns = authorsContainer.querySelectorAll('.delete-btn');
					for (var _i6 = 0; _i6 < _deleteBtns.length; _i6++) {
						_deleteBtns[_i6].addEventListener('click', deleteAuth, false);
					}
				} else if (authType === 'contributeur') {
					_utils2.default.addClass('#search', 'hidden');
					results.innerHTML = selectedContribRoleTemplate({ selectedContrib: { id: id, name: name } });
					results.querySelector('#add-contrib-role-btn').addEventListener('click', function (event) {
						var role = results.querySelector('[name=contrib-role]').value;
						selectedContribs.push({ id: id, role: role });
						selectedContribsDisplay.push({ id: id, name: name, role: role });
						contribsContainer.innerHTML = selectedContribsTemplate({ selectedContribs: selectedContribsDisplay });
						closeModal();
						var deleteBtns = contribsContainer.querySelectorAll('.delete-btn');
						for (var _i7 = 0; _i7 < deleteBtns.length; _i7++) {
							deleteBtns[_i7].addEventListener('click', deleteAuth, false);
						}
					}, false);
				}
			};

			//DELETE SELECTED AUTHORS/CONTRIBS


			var deleteAuth = function deleteAuth(event) {
				var index = event.target.parentElement.id;
				console.log(index);
				authType = event.target.id;
				if (authType === 'auteur') {
					selectedAuthors.splice(index, 1);
					selectedAuthorsDisplay.splice(index, 1);
					authorsContainer.innerHTML = selectedAuthorsTemplate({ selectedAuthors: selectedAuthorsDisplay });
					var _deleteBtns2 = authorsContainer.querySelectorAll('.delete-btn');
					for (var _i8 = 0; _i8 < _deleteBtns2.length; _i8++) {
						_deleteBtns2[_i8].addEventListener('click', deleteAuth, false);
					}
				} else if (authType === 'contributeur') {
					selectedContribs.splice(index, 1);
					selectedContribsDisplay.splice(index, 1);
					contribsContainer.innerHTML = selectedContribsTemplate({ selectedContribs: selectedContribsDisplay });
					var _deleteBtns3 = contribsContainer.querySelectorAll('.delete-btn');
					for (var _i9 = 0; _i9 < _deleteBtns3.length; _i9++) {
						_deleteBtns3[_i9].addEventListener('click', deleteAuth, false);
					}
				}
			};

			var book = response.book;
			//SCOPE VARIABLES
			var authType = '';
			var json = ""; //search : string json to compare with response
			var selectedAuthorsDisplay = [],
			    selectedAuthors = [];
			var selectedContribsDisplay = [],
			    selectedContribs = [];
			//init authors
			for (var i = 0; i < book.authors.length; i++) {
				selectedAuthors.push(book.authors[i].id);
				selectedAuthorsDisplay.push(book.authors[i]);
			}
			//init contribs
			for (var _i = 0; _i < book.contribs.length; _i++) {
				selectedContribs.push(book.contribs[_i]);
				selectedContribsDisplay.push(book.contribs[_i]);
			}
			//insert template in container
			c.innerHTML = adminBookEditTemplate({ book: book, selectedAuthors: selectedAuthorsDisplay, selectedContribs: selectedContribsDisplay });
			//ELEMENTS
			//rootElement
			var root = document.querySelector('#adminBookEdit');
			//form
			var form = root.querySelector('#adminBookEditForm');
			var inputs = form.querySelectorAll('input');
			//modal
			var modal = root.querySelector('#modal');
			var searchInput = modal.querySelector('input');
			var results = modal.querySelector('#results');
			//authors, contribs containers
			var authorsContainer = root.querySelector('#authorsContainer');
			var contribsContainer = root.querySelector('#contribsContainer');
			//attach deleAuth to form
			var deleteBtns = form.querySelectorAll('.delete-btn');
			for (var _i2 = 0; _i2 < deleteBtns.length; _i2++) {
				deleteBtns[_i2].addEventListener('click', deleteAuth, false);
			}

			for (var _i3 = 0; _i3 < inputs.length; _i3++) {
				inputs[_i3].addEventListener('input', onInput, false);
			}

			form.addEventListener('submit', onSubmit, false);

			//SEARCH MODAL
			//open modal
			var openModal = function openModal(event) {
				event.preventDefault();
				authType = event.target.id;
				document.querySelector('#modal h4').innerHTML = modalHeaderTemplate({ authType: authType });
				_utils2.default.removeClass('#search', 'hidden');
				modal.style.display = 'block';
			};

			var openModalBtns = root.querySelectorAll('.open-modal-btn');
			for (var _i4 = 0; _i4 < openModalBtns.length; _i4++) {
				openModalBtns[_i4].addEventListener('click', openModal, false);
			}

			//close modal
			var closeModal = function closeModal() {
				modal.style.display = 'none';
				searchInput.value = '';
				results.innerHTML = '';
			};

			var closeModalBtn = modal.querySelector('#close-modal-btn');
			closeModalBtn.addEventListener('click', closeModal, false);

			searchInput.addEventListener('keyup', onkeyup, false);
		}
	});
};

exports.default = adminBooksNew;

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminBookEdit" class="content">\n<!--\n	MODAL\n-->\n	<div id="modal" class="w3-modal w3-card-4">\n		<div class="w3-modal-content w3-animate-top">\n			<header class="w3-container w3-black"> \n				<span id="close-modal-btn" class="w3-button w3-display-topright">&times;</span>\n				<h4>Rechercher un auteur</h4>\n			</header>\n			<div class="w3-container">\n				<p id="search">\n				<input type="text" name="search" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ error }}"></span>\n				</p>\n				<div id="results" style="min-height:150px"></div>\n			</div>\n			\n		</div>\n	</div>\n<!--\n	MAIN\n-->\n	<h4 class="w3-container align-left w3-padding-16">Modifier un ouvrage</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/books/<%= book.id %>" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminBookEditForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="title">\n				<label>Titre * : </label>\n				<input type="text" name="title" class="w3-input w3-border" value="<%= book.title %>" >\n				<span class="error" data-utils-bind="{{ title }}"></span>\n			</p>\n			\n			<p id="subtitle1">\n				<label>Sous-titre 1 : </label>\n				<input type="text" name="subtitle1" class="w3-input w3-border" value="<%= book.subtitle1 %>" >\n			</p>\n			\n			<p id="subtitle2">\n				<label>Sous-titre 2 : </label>\n				<input type="text" name="subtitle2" class="w3-input w3-border" value="<%= book.subtitle2 %>" >\n			</p>\n			\n			<p id="authorDisplay">\n				<label>Auteur (libellé) * : </label>\n				<input type="text" name="authorDisplay" class="w3-input w3-border" value="<%= book.authorDisplay %>" >\n				<span class="error" data-utils-bind="{{ authorDisplay }}"></span>\n			</p>\n			\n			<div id="authors" class="w3-margin-bottom w3-border-bottom">\n				<div class="w3-margin-bottom" style="min-height:100px">\n					<p>\n						<label class="align-left">Auteurs * : </label>\n						<a href="/#/authors" id="auteur" class="align-right w3-text-gray w3-hover-none w3-hover-text-black open-modal-btn">Rechercher</a>\n					</p>\n					\n					<ul id="authorsContainer" class="w3-ul w3-padding-32">\n						<% for(var i=0; i<selectedAuthors.length; i++) {%>\n						<li class="w3-display-container">\n							<p data-key="<%= selectedAuthors[i].id %>" id="<%= i %>" >\n								<span><%= selectedAuthors[i].name %></span>\n								<button type="button" id="auteur" class="delete-btn w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Supprimer</button>\n							</p>\n						</li>\n						<% } %>\n					</ul>\n					<span class="error" data-utils-bind="{{ authors }}"></span>\n				</div>\n				\n			</div>\n			\n			<div id="contribs" class="w3-margin-bottom w3-border-bottom">\n				<div class="w3-margin-bottom" style="min-height:100px">\n					<p>\n						<label class="align-left">Contributeurs : </label>\n						<a href="/#/contribs" id="contributeur" class="align-right w3-text-gray w3-hover-none w3-hover-text-black open-modal-btn">Rechercher</a>\n					</p>\n					\n					<ul id="contribsContainer" class="w3-ul w3-padding-32">\n						<% for(var i=0; i<selectedContribs.length; i++) {%>\n						<li class="w3-display-container">\n							<p data-key="<%= selectedContribs[i].id %>" id="<%= i %>" >\n								<span><%= selectedContribs[i].name %> </span>\n								<span>(<%= selectedContribs[i].role %>)</span>\n								<button type="button" id="contributeur" class="delete-btn w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Supprimer</button>\n							</p>\n						</li>\n						<% } %>\n					</ul>\n				</div>\n				\n			</div>\n			\n			<p id="year">\n				<label>Année de publication * : </label>\n				<input type="text" name="year" class="w3-input w3-border" value="<%= book.year %>" >\n				<span class="error" data-utils-bind="{{ year }}"></span>\n			</p>\n			\n			<p id="language">\n				<label>Langue * : </label>\n				<input type="text" name="language" class="w3-input w3-border" value="<%= book.language %>" >\n				<span class="error" data-utils-bind="{{ language }}"></span>\n			</p>\n			\n			<p id="categories">\n				<label>Catégories : </label>\n				<input type="text" name="categories" class="w3-input w3-border" value="<%= book.categories %>" >\n				<span class="error" data-utils-bind="{{ categories }}"></span>\n			</p>\n			\n			<p id="collection">\n				<label>Collection : </label>\n				<input type="text" name="collection" class="w3-input w3-border" value="<%= book.collection %>" >\n				<span class="error" data-utils-bind="{{ collection }}"></span>\n			</p>\n			\n			<p id="source-publisher">\n				<label>Source - éditeur : </label>\n				<input type="text" name="source-publisher" class="w3-input w3-border" value="<%= book.source.publisher %>" >\n			</p>\n			\n			<p id="source-year">\n				<label>Source - année de publication : </label>\n				<input type="text" name="source-year" class="w3-input w3-border" value="<%= book.source.year %>" >\n			</p>\n			\n			<p id="source-origin">\n				<label>Source - origine : </label>\n				<input type="text" name="source-origin" class="w3-input w3-border" value="<%= book.source.origin %>" >\n			</p>\n			\n			<p id="styles-color">\n				<label>Styles - couleur : </label>\n				<input type="text" name="styles-color" class="w3-input w3-border" value="<%= book.styles.color %>" >\n			</p>\n			\n			<p id="styles-image">\n				<label>Styles - image : </label>\n				<input type="text" name="styles-image" class="w3-input w3-border" value="<%= book.styles.image %>" >\n			</p>\n			\n			<p id="styles-font">\n				<label>Styles - police : </label>\n				<input type="text" name="styles-font" class="w3-input w3-border" value="<%= book.styles.font %>" >\n			</p>\n			\n			<p id="styles-cover">\n				<label>Styles - couverture : </label>\n				<input type="text" name="styles-cover" class="w3-input w3-border" value="<%= book.styles.cover %>" >\n			</p>\n			\n			<p id="styles-author">\n				<label>Styles - auteur : </label>\n				<input type="text" name="styles-author" class="w3-input w3-border" value="<%= book.styles.author %>" >\n			</p>\n			\n			<p id="styles-title">\n				<label>Styles - titre : </label>\n				<input type="text" name="styles-title" class="w3-input w3-border" value="<%= book.styles.title %>" >\n			</p>\n			\n			<p id="styles-subtitle1">\n				<label>Styles - sous-titre1 : </label>\n				<input type="text" name="styles-subtitle1" class="w3-input w3-border" value="<%= book.styles.subtitle1 %>" >\n			</p>\n			\n			<p id="styles-subtitle2">\n				<label>Styles - sous-titre2 : </label>\n				<input type="text" name="styles-subtitle2" class="w3-input w3-border" value="<%= book.styles.subtitle2 %>" >\n			</p>\n			\n			<p id="styles-logo">\n				<label>Styles - logo : </label>\n				<input type="text" name="styles-logo" class="w3-input w3-border" value="<%= book.styles.logo %>" >\n			</p>\n			\n			<p id="description">\n				<label>Description : </label>\n				<textarea type="text" name="description" class="w3-input w3-border" value="<%= book.description %>" ></textarea>\n			</p>\n			\n			<p id="path">\n				<label>Path * : </label>\n				<input type="text" name="path" class="w3-input w3-border" value="<%= book.path %>" >\n				<span class="error" data-utils-bind="{{ path }}"></span>\n			</p>\n			\n			<p id="visible">\n				<label><input type="checkbox" name="visible" <% if(book.visible) {%> checked <%}%> > Visible</label>\n			</p>\n			\n			<p class="w3-padding-24">\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminBookEdit" class="content">\n<!--\n	MODAL\n-->\n	<div id="modal" class="w3-modal w3-card-4">\n		<div class="w3-modal-content w3-animate-top">\n			<header class="w3-container w3-black"> \n				<span id="close-modal-btn" class="w3-button w3-display-topright">&times;</span>\n				<h4>Rechercher un auteur</h4>\n			</header>\n			<div class="w3-container">\n				<p id="search">\n				<input type="text" name="search" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ error }}"></span>\n				</p>\n				<div id="results" style="min-height:150px"></div>\n			</div>\n			\n		</div>\n	</div>\n<!--\n	MAIN\n-->\n	<h4 class="w3-container align-left w3-padding-16">Modifier un ouvrage</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/books/', escape((__stack.lineno = 25, book.id)), '" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminBookEditForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="title">\n				<label>Titre * : </label>\n				<input type="text" name="title" class="w3-input w3-border" value="', escape((__stack.lineno = 33, book.title)), '" >\n				<span class="error" data-utils-bind="{{ title }}"></span>\n			</p>\n			\n			<p id="subtitle1">\n				<label>Sous-titre 1 : </label>\n				<input type="text" name="subtitle1" class="w3-input w3-border" value="', escape((__stack.lineno = 39, book.subtitle1)), '" >\n			</p>\n			\n			<p id="subtitle2">\n				<label>Sous-titre 2 : </label>\n				<input type="text" name="subtitle2" class="w3-input w3-border" value="', escape((__stack.lineno = 44, book.subtitle2)), '" >\n			</p>\n			\n			<p id="authorDisplay">\n				<label>Auteur (libellé) * : </label>\n				<input type="text" name="authorDisplay" class="w3-input w3-border" value="', escape((__stack.lineno = 49, book.authorDisplay)), '" >\n				<span class="error" data-utils-bind="{{ authorDisplay }}"></span>\n			</p>\n			\n			<div id="authors" class="w3-margin-bottom w3-border-bottom">\n				<div class="w3-margin-bottom" style="min-height:100px">\n					<p>\n						<label class="align-left">Auteurs * : </label>\n						<a href="/#/authors" id="auteur" class="align-right w3-text-gray w3-hover-none w3-hover-text-black open-modal-btn">Rechercher</a>\n					</p>\n					\n					<ul id="authorsContainer" class="w3-ul w3-padding-32">\n						');
                __stack.lineno = 61;
                for (var i = 0; i < selectedAuthors.length; i++) {
                    buf.push('\n						<li class="w3-display-container">\n							<p data-key="', escape((__stack.lineno = 63, selectedAuthors[i].id)), '" id="', escape((__stack.lineno = 63, i)), '" >\n								<span>', escape((__stack.lineno = 64, selectedAuthors[i].name)), '</span>\n								<button type="button" id="auteur" class="delete-btn w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Supprimer</button>\n							</p>\n						</li>\n						');
                    __stack.lineno = 68;
                }
                buf.push('\n					</ul>\n					<span class="error" data-utils-bind="{{ authors }}"></span>\n				</div>\n				\n			</div>\n			\n			<div id="contribs" class="w3-margin-bottom w3-border-bottom">\n				<div class="w3-margin-bottom" style="min-height:100px">\n					<p>\n						<label class="align-left">Contributeurs : </label>\n						<a href="/#/contribs" id="contributeur" class="align-right w3-text-gray w3-hover-none w3-hover-text-black open-modal-btn">Rechercher</a>\n					</p>\n					\n					<ul id="contribsContainer" class="w3-ul w3-padding-32">\n						');
                __stack.lineno = 83;
                for (var i = 0; i < selectedContribs.length; i++) {
                    buf.push('\n						<li class="w3-display-container">\n							<p data-key="', escape((__stack.lineno = 85, selectedContribs[i].id)), '" id="', escape((__stack.lineno = 85, i)), '" >\n								<span>', escape((__stack.lineno = 86, selectedContribs[i].name)), " </span>\n								<span>(", escape((__stack.lineno = 87, selectedContribs[i].role)), ')</span>\n								<button type="button" id="contributeur" class="delete-btn w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Supprimer</button>\n							</p>\n						</li>\n						');
                    __stack.lineno = 91;
                }
                buf.push('\n					</ul>\n				</div>\n				\n			</div>\n			\n			<p id="year">\n				<label>Année de publication * : </label>\n				<input type="text" name="year" class="w3-input w3-border" value="', escape((__stack.lineno = 99, book.year)), '" >\n				<span class="error" data-utils-bind="{{ year }}"></span>\n			</p>\n			\n			<p id="language">\n				<label>Langue * : </label>\n				<input type="text" name="language" class="w3-input w3-border" value="', escape((__stack.lineno = 105, book.language)), '" >\n				<span class="error" data-utils-bind="{{ language }}"></span>\n			</p>\n			\n			<p id="categories">\n				<label>Catégories : </label>\n				<input type="text" name="categories" class="w3-input w3-border" value="', escape((__stack.lineno = 111, book.categories)), '" >\n				<span class="error" data-utils-bind="{{ categories }}"></span>\n			</p>\n			\n			<p id="collection">\n				<label>Collection : </label>\n				<input type="text" name="collection" class="w3-input w3-border" value="', escape((__stack.lineno = 117, book.collection)), '" >\n				<span class="error" data-utils-bind="{{ collection }}"></span>\n			</p>\n			\n			<p id="source-publisher">\n				<label>Source - éditeur : </label>\n				<input type="text" name="source-publisher" class="w3-input w3-border" value="', escape((__stack.lineno = 123, book.source.publisher)), '" >\n			</p>\n			\n			<p id="source-year">\n				<label>Source - année de publication : </label>\n				<input type="text" name="source-year" class="w3-input w3-border" value="', escape((__stack.lineno = 128, book.source.year)), '" >\n			</p>\n			\n			<p id="source-origin">\n				<label>Source - origine : </label>\n				<input type="text" name="source-origin" class="w3-input w3-border" value="', escape((__stack.lineno = 133, book.source.origin)), '" >\n			</p>\n			\n			<p id="styles-color">\n				<label>Styles - couleur : </label>\n				<input type="text" name="styles-color" class="w3-input w3-border" value="', escape((__stack.lineno = 138, book.styles.color)), '" >\n			</p>\n			\n			<p id="styles-image">\n				<label>Styles - image : </label>\n				<input type="text" name="styles-image" class="w3-input w3-border" value="', escape((__stack.lineno = 143, book.styles.image)), '" >\n			</p>\n			\n			<p id="styles-font">\n				<label>Styles - police : </label>\n				<input type="text" name="styles-font" class="w3-input w3-border" value="', escape((__stack.lineno = 148, book.styles.font)), '" >\n			</p>\n			\n			<p id="styles-cover">\n				<label>Styles - couverture : </label>\n				<input type="text" name="styles-cover" class="w3-input w3-border" value="', escape((__stack.lineno = 153, book.styles.cover)), '" >\n			</p>\n			\n			<p id="styles-author">\n				<label>Styles - auteur : </label>\n				<input type="text" name="styles-author" class="w3-input w3-border" value="', escape((__stack.lineno = 158, book.styles.author)), '" >\n			</p>\n			\n			<p id="styles-title">\n				<label>Styles - titre : </label>\n				<input type="text" name="styles-title" class="w3-input w3-border" value="', escape((__stack.lineno = 163, book.styles.title)), '" >\n			</p>\n			\n			<p id="styles-subtitle1">\n				<label>Styles - sous-titre1 : </label>\n				<input type="text" name="styles-subtitle1" class="w3-input w3-border" value="', escape((__stack.lineno = 168, book.styles.subtitle1)), '" >\n			</p>\n			\n			<p id="styles-subtitle2">\n				<label>Styles - sous-titre2 : </label>\n				<input type="text" name="styles-subtitle2" class="w3-input w3-border" value="', escape((__stack.lineno = 173, book.styles.subtitle2)), '" >\n			</p>\n			\n			<p id="styles-logo">\n				<label>Styles - logo : </label>\n				<input type="text" name="styles-logo" class="w3-input w3-border" value="', escape((__stack.lineno = 178, book.styles.logo)), '" >\n			</p>\n			\n			<p id="description">\n				<label>Description : </label>\n				<textarea type="text" name="description" class="w3-input w3-border" value="', escape((__stack.lineno = 183, book.description)), '" ></textarea>\n			</p>\n			\n			<p id="path">\n				<label>Path * : </label>\n				<input type="text" name="path" class="w3-input w3-border" value="', escape((__stack.lineno = 188, book.path)), '" >\n				<span class="error" data-utils-bind="{{ path }}"></span>\n			</p>\n			\n			<p id="visible">\n				<label><input type="checkbox" name="visible" ');
                __stack.lineno = 193;
                if (book.visible) {
                    buf.push(" checked ");
                    __stack.lineno = 193;
                }
                buf.push(' > Visible</label>\n			</p>\n			\n			<p class="w3-padding-24">\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: "<span>Rechercher un <%= authType %></span>\n",
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push("<span>Rechercher un ", escape((__stack.lineno = 1, authType)), "</span>\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<ul class="w3-ul">\n<% for(var i=0; i<authors.length; i++) {%>\n<li class="w3-display-container">\n	<p id="<%= authors[i].id %>" >\n		<span><%= authors[i].name %></span> \n		<button type="button" class="add-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-right">Ajouter</button>\n	</p>\n</li>\n<% } %>\n</ul>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<ul class="w3-ul">\n');
                __stack.lineno = 2;
                for (var i = 0; i < authors.length; i++) {
                    buf.push('\n<li class="w3-display-container">\n	<p id="', escape((__stack.lineno = 4, authors[i].id)), '" >\n		<span>', escape((__stack.lineno = 5, authors[i].name)), '</span> \n		<button type="button" class="add-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-right">Ajouter</button>\n	</p>\n</li>\n');
                    __stack.lineno = 9;
                }
                buf.push("\n</ul>\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<% for(var i=0; i<selectedAuthors.length; i++) {%>\n<li class="w3-display-container">\n	<p data-key="<%= selectedAuthors[i].id %>" id="<%= i %>" >\n		<span><%= selectedAuthors[i].name %></span>\n		<button type="button" id="auteur" class="delete-btn w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Supprimer</button>\n	</p>\n</li>\n<% } %>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push("");
                __stack.lineno = 1;
                for (var i = 0; i < selectedAuthors.length; i++) {
                    buf.push('\n<li class="w3-display-container">\n	<p data-key="', escape((__stack.lineno = 3, selectedAuthors[i].id)), '" id="', escape((__stack.lineno = 3, i)), '" >\n		<span>', escape((__stack.lineno = 4, selectedAuthors[i].name)), '</span>\n		<button type="button" id="auteur" class="delete-btn w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Supprimer</button>\n	</p>\n</li>\n');
                    __stack.lineno = 8;
                }
                buf.push("\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<% for(var i=0; i<selectedContribs.length; i++) {%>\n<li class="w3-display-container">\n	<p data-key="<%= selectedContribs[i].id %>" id="<%= i %>" >\n		<span><%= selectedContribs[i].name %> </span>\n		<span>(<%= selectedContribs[i].role %>)</span>\n		<button type="button" id="contributeur" class="delete-btn w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Supprimer</button>\n	</p>\n</li>\n<% } %>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push("");
                __stack.lineno = 1;
                for (var i = 0; i < selectedContribs.length; i++) {
                    buf.push('\n<li class="w3-display-container">\n	<p data-key="', escape((__stack.lineno = 3, selectedContribs[i].id)), '" id="', escape((__stack.lineno = 3, i)), '" >\n		<span>', escape((__stack.lineno = 4, selectedContribs[i].name)), " </span>\n		<span>(", escape((__stack.lineno = 5, selectedContribs[i].role)), ')</span>\n		<button type="button" id="contributeur" class="delete-btn w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Supprimer</button>\n	</p>\n</li>\n');
                    __stack.lineno = 9;
                }
                buf.push("\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<p id="<%= selectedContrib.id %>"><%= selectedContrib.name %></p>\n<p>\n	<label>function : </label>\n	<input type="text" name="contrib-role" class="w3-input w3-border">\n</p>\n<p class="w3-display-container w3-padding-16">\n	<button type="button" id="add-contrib-role-btn" class="w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Ajouter</button>\n</p>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<p id="', escape((__stack.lineno = 1, selectedContrib.id)), '">', escape((__stack.lineno = 1, selectedContrib.name)), '</p>\n<p>\n	<label>function : </label>\n	<input type="text" name="contrib-role" class="w3-input w3-border">\n</p>\n<p class="w3-display-container w3-padding-16">\n	<button type="button" id="add-contrib-role-btn" class="w3-text-gray w3-hover-none w3-hover-text-black w3-button w3-display-right">Ajouter</button>\n</p>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminAuthorsTemplate = __webpack_require__(107);
//home.js
var adminAuthors = function adminAuthors(container) {
	'use strict';

	var adminContainer = container;

	//ajax get authors
	var options = { method: 'GET', url: '/authors/' };
	_utils2.default.ajax(options).then(function (res) {
		var response = JSON.parse(res);
		if (response.error) {
			//insert template in container
			adminContainer.innerHTML = adminAuthorsTemplate({ authors: [], error: response.error });
		} else {
			//insert template in container
			adminContainer.innerHTML = adminAuthorsTemplate({ authors: response.authors, error: '' });
		}
	});
};

exports.default = adminAuthors;

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminAuthors" class="content">\n	<h4 class="w3-container w3-padding-16 align-left">Auteurs</h4>\n	<p class="w3-padding-16 align-right"><a href="/#/admin/authors/new" class="w3-text-gray w3-hover-none w3-hover-text-black">Ajouter</a></p>\n	<div style="clear:both">\n		<span class="error"><%= error %></span>\n		<ul id="authors-list" class="w3-ul">\n			<% for(var i=0; i<authors.length; i++) {%>\n			<li>\n				<p>\n					<a href="/#/admin/authors/<%= authors[i].id %>" class=\'w3-text-gray w3-hover-none w3-hover-text-black\'>\n						<%- authors[i].name %> (<%= authors[i].birth %>&thinsp;&ndash;&thinsp;<%= authors[i].death %>)\n					</a>\n				</p>\n			</li>\n			<% } %>\n		</ul>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminAuthors" class="content">\n	<h4 class="w3-container w3-padding-16 align-left">Auteurs</h4>\n	<p class="w3-padding-16 align-right"><a href="/#/admin/authors/new" class="w3-text-gray w3-hover-none w3-hover-text-black">Ajouter</a></p>\n	<div style="clear:both">\n		<span class="error">', escape((__stack.lineno = 5, error)), '</span>\n		<ul id="authors-list" class="w3-ul">\n			');
                __stack.lineno = 7;
                for (var i = 0; i < authors.length; i++) {
                    buf.push('\n			<li>\n				<p>\n					<a href="/#/admin/authors/', escape((__stack.lineno = 10, authors[i].id)), "\" class='w3-text-gray w3-hover-none w3-hover-text-black'>\n						", (__stack.lineno = 11, authors[i].name), " (", escape((__stack.lineno = 11, authors[i].birth)), "&thinsp;&ndash;&thinsp;", escape((__stack.lineno = 11, authors[i].death)), ")\n					</a>\n				</p>\n			</li>\n			");
                    __stack.lineno = 15;
                }
                buf.push("\n		</ul>\n	</div>\n</div>\n");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminAuthorTemplate = __webpack_require__(109);
//home.js
var adminAuthor = function adminAuthor(container) {
	'use strict';

	var id = location.hash.replace(/^#\/admin\/authors\//, '');
	var c = container;

	//ajax get author
	var options = { method: 'GET', url: '/authors/' + id };
	_utils2.default.ajax(options).then(function (res) {
		var response = JSON.parse(res);
		if (response.error) {
			//insert template in container
			c.innerHTML = adminAuthorTemplate({ author: {}, error: response.error });
		} else {
			//insert template in container
			c.innerHTML = adminAuthorTemplate({ author: response.author, error: '' });

			var root = document.querySelector('#adminAuthor');
			var modal = root.querySelector('#modal');
			var div = root.querySelector('#author');

			var openModalBtn = div.querySelector('#open-modal-btn');
			openModalBtn.addEventListener('click', function () {
				modal.style.display = 'block';
			}, false);

			var closeModalBtn = modal.querySelector('#close-modal-btn');
			closeModalBtn.addEventListener('click', function () {
				modal.style.display = 'none';
			}, false);

			var deleteAuthor = function deleteAuthor(event) {
				var options = { method: 'DELETE', url: '/authors/' + id };
				_utils2.default.ajax(options).then(function (res) {
					var response = JSON.parse(res);
					if (response.error) {
						_utils2.default.bind(div, response, 'error');
						modal.style.display = 'none';
					} else {
						location.hash = '#/admin/authors/';
					}
				});
			};

			var deleteBtn = modal.querySelector('#delete-btn');
			deleteBtn.addEventListener('click', deleteAuthor, false);
		}
	});
};

exports.default = adminAuthor;

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminAuthor" class="content">\n<!--\n	MODAL\n-->\n	<div id="modal" class="w3-modal w3-card-4">\n		<div class="w3-modal-content w3-animate-top">\n			<header class="w3-container w3-black"> \n				<span id="close-modal-btn" class="w3-button w3-display-topright">&times;</span>\n				<h4>Supprimer un auteur</h4>\n			</header>\n			<div  class="w3-container">\n				<p>Voulez-vous vraiment supprimer cet auteur ?</p>\n				<p><%= author.name %></p>\n				<p class="w3-right"><button type="button" id="delete-btn" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black">Supprimer</button></p>\n			</div>\n			\n		</div>\n	</div>\n\n<!--\n	MAIN\n-->\n	\n	<h4 class="w3-container align-left w3-padding-16">Auteur</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/authors/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div id="author" class="w3-container">\n		<span class="error"><%= error %></span>\n		<span class="error" id="modal-error" data-utils-bind="{{ error }}"></span>\n		<div class="w3-border-bottom">\n			<p><b>Nom : </b><span><%- author.name %></span></p>\n			<p><b>Nom alphabétique : </b><span><%= author.nameAlpha %></p>\n			<p><b>Date de naissance : </b><span><%= author.birth %></p>\n			<p><b>Date de décès : </b><span><%= author.death %></p>\n			<p><b>Description : </b></p>\n			<div><%= author.description %></div>\n			<p><b>Visible : </b><span><% if(author.visible===true) {%>oui<%} else {%>non<%}%></span></p>\n			<p><b>Créé le : </b><span></span><%= author.created_at %></p>\n			<p><b>Mis à jour le : </b><span><%= author.updated_at %></p>\n			<% if(author.books.length > 0) { %>\n			<p>\n				<span><b>Œuvres :</b></span>\n			</p>\n			<ul id="books-list" class=\'w3-ul\'>\n				<% for(var i=0; i<author.books.length; i++) { %>\n				<li>\n					<a href=\'/#/admin/books/<%= author.books[i].id %>\' class="w3-text-gray w3-hover-none w3-hover-text-black">\n						<%- author.books[i].title %> (<%= author.books[i].year %>)\n					</a>\n				</li>\n				<% } %>\n			</ul>\n			<% } %>\n			<% if(author.contribs.length > 0) { %>\n			<p>\n				<span><b>Contributions :</b></span>\n			</p>\n			<ul id="books-list" class=\'w3-ul w3-margin-bottom\'>\n				<% for(var i=0; i<author.contribs.length; i++) {%>\n				<li>\n					<a href=\'/#/admin/books/<%= author.contribs[i].book.id %>\' class="w3-text-gray w3-hover-none w3-hover-text-black">\n						<%- author.contribs[i].book.title %> (<%= author.contribs[i].role %>)\n					</a>\n				</li>\n				<% } %>\n			</ul>\n			<% } %>\n		</div>\n		<p>\n			<a href="#/admin/authors/<%= author.id %>/edit" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black w3-left">Modifier</a>\n			<button type="button" id="open-modal-btn" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black w3-right">Supprimer</button>\n		</p>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminAuthor" class="content">\n<!--\n	MODAL\n-->\n	<div id="modal" class="w3-modal w3-card-4">\n		<div class="w3-modal-content w3-animate-top">\n			<header class="w3-container w3-black"> \n				<span id="close-modal-btn" class="w3-button w3-display-topright">&times;</span>\n				<h4>Supprimer un auteur</h4>\n			</header>\n			<div  class="w3-container">\n				<p>Voulez-vous vraiment supprimer cet auteur ?</p>\n				<p>', escape((__stack.lineno = 13, author.name)), '</p>\n				<p class="w3-right"><button type="button" id="delete-btn" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black">Supprimer</button></p>\n			</div>\n			\n		</div>\n	</div>\n\n<!--\n	MAIN\n-->\n	\n	<h4 class="w3-container align-left w3-padding-16">Auteur</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/authors/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div id="author" class="w3-container">\n		<span class="error">', escape((__stack.lineno = 27, error)), '</span>\n		<span class="error" id="modal-error" data-utils-bind="{{ error }}"></span>\n		<div class="w3-border-bottom">\n			<p><b>Nom : </b><span>', (__stack.lineno = 30, author.name), "</span></p>\n			<p><b>Nom alphabétique : </b><span>", escape((__stack.lineno = 31, author.nameAlpha)), "</p>\n			<p><b>Date de naissance : </b><span>", escape((__stack.lineno = 32, author.birth)), "</p>\n			<p><b>Date de décès : </b><span>", escape((__stack.lineno = 33, author.death)), "</p>\n			<p><b>Description : </b></p>\n			<div>", escape((__stack.lineno = 35, author.description)), "</div>\n			<p><b>Visible : </b><span>");
                __stack.lineno = 36;
                if (author.visible === true) {
                    buf.push("oui");
                    __stack.lineno = 36;
                } else {
                    buf.push("non");
                    __stack.lineno = 36;
                }
                buf.push("</span></p>\n			<p><b>Créé le : </b><span></span>", escape((__stack.lineno = 37, author.created_at)), "</p>\n			<p><b>Mis à jour le : </b><span>", escape((__stack.lineno = 38, author.updated_at)), "</p>\n			");
                __stack.lineno = 39;
                if (author.books.length > 0) {
                    buf.push("\n			<p>\n				<span><b>Œuvres :</b></span>\n			</p>\n			<ul id=\"books-list\" class='w3-ul'>\n				");
                    __stack.lineno = 44;
                    for (var i = 0; i < author.books.length; i++) {
                        buf.push("\n				<li>\n					<a href='/#/admin/books/", escape((__stack.lineno = 46, author.books[i].id)), '\' class="w3-text-gray w3-hover-none w3-hover-text-black">\n						', (__stack.lineno = 47, author.books[i].title), " (", escape((__stack.lineno = 47, author.books[i].year)), ")\n					</a>\n				</li>\n				");
                        __stack.lineno = 50;
                    }
                    buf.push("\n			</ul>\n			");
                    __stack.lineno = 52;
                }
                buf.push("\n			");
                __stack.lineno = 53;
                if (author.contribs.length > 0) {
                    buf.push("\n			<p>\n				<span><b>Contributions :</b></span>\n			</p>\n			<ul id=\"books-list\" class='w3-ul w3-margin-bottom'>\n				");
                    __stack.lineno = 58;
                    for (var i = 0; i < author.contribs.length; i++) {
                        buf.push("\n				<li>\n					<a href='/#/admin/books/", escape((__stack.lineno = 60, author.contribs[i].book.id)), '\' class="w3-text-gray w3-hover-none w3-hover-text-black">\n						', (__stack.lineno = 61, author.contribs[i].book.title), " (", escape((__stack.lineno = 61, author.contribs[i].role)), ")\n					</a>\n				</li>\n				");
                        __stack.lineno = 64;
                    }
                    buf.push("\n			</ul>\n			");
                    __stack.lineno = 66;
                }
                buf.push('\n		</div>\n		<p>\n			<a href="#/admin/authors/', escape((__stack.lineno = 69, author.id)), '/edit" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black w3-left">Modifier</a>\n			<button type="button" id="open-modal-btn" class="w3-button w3-border w3-text-gray w3-hover-none w3-hover-text-black w3-right">Supprimer</button>\n		</p>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(2);

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminAuthorsNewTemplate = __webpack_require__(111);
//home.js
var adminAuthorsNew = function adminAuthorsNew(container) {
	'use strict';

	var c = container;

	//insert template in container
	c.innerHTML = adminAuthorsNewTemplate();

	//rootElement
	var root = document.querySelector('#adminAuthorsNew');
	//form
	var form = root.querySelector('#adminAuthorsNewForm');
	var inputs = form.querySelectorAll('input');

	//clear errors on input
	function onInput(event) {
		_utils2.default.setHTML('#form-error', "");
		if (event.target.name === 'name') {
			_utils2.default.setHTML('#name .error', "");
		} else if (event.target.name === 'nameAlpha') {
			_utils2.default.setHTML('#nameAlpha .error', "");
		} else if (event.target.name === 'birth') {
			_utils2.default.setHTML('#birth .error', "");
		} else if (event.target.name === 'death') {
			_utils2.default.setHTML('#death .error', "");
		}
	}

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('input', onInput, false);
	}

	//submit
	function onSubmit(event) {
		event.preventDefault();
		_utils2.default.bind(form, {});
		var author = {};
		author.name = form.querySelector('[name=name]').value;
		author.nameAlpha = form.querySelector('[name=nameAlpha]').value;
		author.birth = form.querySelector('[name=birth]').value;
		author.death = form.querySelector('[name=death]').value;
		author.description = form.querySelector('[name=description]').value;
		author.visible = form.querySelector('[name=visible]').checked ? true : false;
		var options = { method: 'POST', url: '/authors/', data: JSON.stringify(author) };
		_utils2.default.ajax(options).then(function (res) {
			var response = JSON.parse(res);
			if (response.errors) {
				_utils2.default.bind(form, response.errors);
			} else {
				_dataStore2.default.pushData('authors', response.author);
				location.hash = '#/admin/authors/';
			}
		});
	}

	form.addEventListener('submit', onSubmit, false);
};

exports.default = adminAuthorsNew;

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminAuthorsNew" class="content">\n	<h4 class="w3-container align-left w3-padding-16">Ajouter un auteur</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/authors/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminAuthorsNewForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="name">\n				<label>Nom * : </label>\n				<input type="text" name="name" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ name }}"></span>\n			</p>\n			\n			<p id="nameAlpha">\n				<label>Nom alphabétique * : </label>\n				<input type="text" name="nameAlpha" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ nameAlpha }}"></span>\n			</p>\n			\n			<p id="birth">\n				<label>Année naissance * : </label>\n				<input type="text" name="birth" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ birth }}"></span>\n			</p>\n			\n			<p id="death">\n				<label>Année décès : </label>\n				<input type="text" name="death" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ death }}"></span>\n			</p>\n			\n			<p id="description">\n				<label>Description : </label>\n				<textarea type="text" name="description" class="w3-input w3-border"></textarea>\n				<span class="error" data-utils-bind="{{ description }}"></span>\n			</p>\n			\n			<p id="visible">\n				<label><input type="checkbox" name="visible" > Visible</label>\n			</p>\n			\n			<p class="w3-padding-24">\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminAuthorsNew" class="content">\n	<h4 class="w3-container align-left w3-padding-16">Ajouter un auteur</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/authors/" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminAuthorsNewForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="name">\n				<label>Nom * : </label>\n				<input type="text" name="name" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ name }}"></span>\n			</p>\n			\n			<p id="nameAlpha">\n				<label>Nom alphabétique * : </label>\n				<input type="text" name="nameAlpha" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ nameAlpha }}"></span>\n			</p>\n			\n			<p id="birth">\n				<label>Année naissance * : </label>\n				<input type="text" name="birth" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ birth }}"></span>\n			</p>\n			\n			<p id="death">\n				<label>Année décès : </label>\n				<input type="text" name="death" class="w3-input w3-border">\n				<span class="error" data-utils-bind="{{ death }}"></span>\n			</p>\n			\n			<p id="description">\n				<label>Description : </label>\n				<textarea type="text" name="description" class="w3-input w3-border"></textarea>\n				<span class="error" data-utils-bind="{{ description }}"></span>\n			</p>\n			\n			<p id="visible">\n				<label><input type="checkbox" name="visible" > Visible</label>\n			</p>\n			\n			<p class="w3-padding-24">\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminAuthorEditTemplate = __webpack_require__(113);
//home.js
var adminAuthorEdit = function adminAuthorEdit(container) {
	'use strict';

	var id = location.hash.replace(/(#\/admin\/authors\/|\/edit)/g, '');
	var c = container;

	//AJAX
	var options = { method: 'GET', url: '/authors/' + id };
	_utils2.default.ajax(options).then(function (res) {
		var response = JSON.parse(res);
		if (response.error) {
			console.log(error);
		} else {

			//clear errors on input
			var onInput = function onInput(event) {
				_utils2.default.setHTML('#form-error', "");
				if (event.target.name === 'name') {
					_utils2.default.setHTML('#name .error', "");
				} else if (event.target.name === 'nameAlpha') {
					_utils2.default.setHTML('#nameAlpha .error', "");
				} else if (event.target.name === 'birth') {
					_utils2.default.setHTML('#birth .error', "");
				} else if (event.target.name === 'death') {
					_utils2.default.setHTML('#death .error', "");
				}
			};

			//submit
			var onSubmit = function onSubmit(event) {
				event.preventDefault();
				_utils2.default.bind(form, {}, 'error');
				var author = {};
				author.name = form.querySelector('[name=name]').value;
				author.nameAlpha = form.querySelector('[name=nameAlpha]').value;
				author.birth = form.querySelector('[name=birth]').value;
				author.death = form.querySelector('[name=death]').value;
				author.description = form.querySelector('[name=description]').value;
				author.visible = form.querySelector('[name=visible]').checked ? true : false;
				var options = { method: 'PUT', url: '/authors/' + id, data: JSON.stringify(author) };
				_utils2.default.ajax(options).then(function (res) {
					var response = JSON.parse(res);
					if (response.errors) {
						_utils2.default.bind(form, response.errors, 'error');
					} else {
						location.hash = '#/admin/authors/' + id;
					}
				});
			};

			//insert template in container
			c.innerHTML = adminAuthorEditTemplate({ author: response.author });

			//rootElement
			var root = document.querySelector('#adminAuthorEdit');
			//form
			var form = root.querySelector('#adminAuthorEditForm');
			var inputs = form.querySelectorAll('input');

			for (var i = 0; i < inputs.length; i++) {
				inputs[i].addEventListener('input', onInput, false);
			}

			form.addEventListener('submit', onSubmit, false);
		}
	});
};

exports.default = adminAuthorEdit;

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="adminAuthorEdit" class="content">\n	<h4 class="w3-container align-left w3-padding-16">Modifier un auteur</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/authors/<%= author.id %>" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminAuthorEditForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="name">\n				<label>Nom : </label>\n				<input type="text" name="name" class="w3-input w3-border author" value="<%= author.name %>" >\n				<span class="error" data-utils-bind="{{ name }}"></span>\n			</p>\n			\n			<p id="nameAlpha">\n				<label>Nom alphabétique : </label>\n				<input type="text" name="nameAlpha" class="w3-input w3-border author" value="<%= author.nameAlpha %>" >\n				<span class="error" data-utils-bind="{{ nameAlpha }}"></span>\n			</p>\n			\n			<p id="birth">\n				<label>Date de naissance : </label>\n				<input type="text" name="birth" class="w3-input w3-border author" value="<%= author.birth %>" >\n				<span class="error" data-utils-bind="{{ birth }}"></span>\n			</p>\n			\n			<p id="death">\n				<label>Date de décès : </label>\n				<input type="text" name="death" class="w3-input w3-border author" value="<%= author.death %>" >\n				<span class="error" data-utils-bind="{{ death }}"></span>\n			</p>\n			\n			<p id="description">\n				<label>Description : </label>\n				<textarea type="text" name="description" class="w3-input w3-border author" value="<%= author.description %>" ></textarea>\n				<span class="error" data-utils-bind="{{ description }}"></span>\n			</p>\n			\n			<p id="visible">\n				<label><input type="checkbox" name="visible" <% if(author.visible) {%> checked <%}%> > Visible</label>\n			</p>\n			\n			<p class="w3-padding-24">\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="adminAuthorEdit" class="content">\n	<h4 class="w3-container align-left w3-padding-16">Modifier un auteur</h4>\n	<p class="align-right w3-padding-16"><a href="/#/admin/authors/', escape((__stack.lineno = 3, author.id)), '" class="w3-text-gray w3-hover-none w3-hover-text-black">Retour</a></p>\n	<div class="w3-container">\n		<form id="adminAuthorEditForm">\n			\n			<span class="error" id="form-error" data-utils-bind="{{ form }}"></span>\n			\n			<p id="name">\n				<label>Nom : </label>\n				<input type="text" name="name" class="w3-input w3-border author" value="', escape((__stack.lineno = 11, author.name)), '" >\n				<span class="error" data-utils-bind="{{ name }}"></span>\n			</p>\n			\n			<p id="nameAlpha">\n				<label>Nom alphabétique : </label>\n				<input type="text" name="nameAlpha" class="w3-input w3-border author" value="', escape((__stack.lineno = 17, author.nameAlpha)), '" >\n				<span class="error" data-utils-bind="{{ nameAlpha }}"></span>\n			</p>\n			\n			<p id="birth">\n				<label>Date de naissance : </label>\n				<input type="text" name="birth" class="w3-input w3-border author" value="', escape((__stack.lineno = 23, author.birth)), '" >\n				<span class="error" data-utils-bind="{{ birth }}"></span>\n			</p>\n			\n			<p id="death">\n				<label>Date de décès : </label>\n				<input type="text" name="death" class="w3-input w3-border author" value="', escape((__stack.lineno = 29, author.death)), '" >\n				<span class="error" data-utils-bind="{{ death }}"></span>\n			</p>\n			\n			<p id="description">\n				<label>Description : </label>\n				<textarea type="text" name="description" class="w3-input w3-border author" value="', escape((__stack.lineno = 35, author.description)), '" ></textarea>\n				<span class="error" data-utils-bind="{{ description }}"></span>\n			</p>\n			\n			<p id="visible">\n				<label><input type="checkbox" name="visible" ');
                __stack.lineno = 40;
                if (author.visible) {
                    buf.push(" checked ");
                    __stack.lineno = 40;
                }
                buf.push(' > Visible</label>\n			</p>\n			\n			<p class="w3-padding-24">\n				<button type="submit" class="w3-btn w3-border">Valider</button>\n			</p>\n			\n		</form>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="admin" class="content">\n	<div class="w3-container w3-padding-24">\n		<h3 class="w3-container">Espace administration</h3>\n		<nav id="admin-nav-bar-top" class=\'w3-bar w3-white w3-border-top w3-border-bottom\'>\n			<a id="admin-home" href="/#/admin/" class="w3-bar-item w3-button w3-text-gray w3-hover-none w3-hover-text-black">Accueil</a>\n			<a id="admin-users" href="/#/admin/users/" class="w3-bar-item w3-button w3-text-gray w3-hover-none w3-hover-text-black">Utilisateurs</a>\n			<a id="admin-books" href="/#/admin/books/" class="w3-bar-item w3-button w3-text-gray w3-hover-none w3-hover-text-black">Ouvrages</a>\n			<a id="admin-authors" href="/#/admin/authors/" class="w3-bar-item w3-button w3-text-gray w3-hover-none w3-hover-text-black">Auteurs</a>\n		</nav>\n		<div id="admin-container"></div>\n	</div>\n</div>\n',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push('<div id="admin" class="content">\n	<div class="w3-container w3-padding-24">\n		<h3 class="w3-container">Espace administration</h3>\n		<nav id="admin-nav-bar-top" class=\'w3-bar w3-white w3-border-top w3-border-bottom\'>\n			<a id="admin-home" href="/#/admin/" class="w3-bar-item w3-button w3-text-gray w3-hover-none w3-hover-text-black">Accueil</a>\n			<a id="admin-users" href="/#/admin/users/" class="w3-bar-item w3-button w3-text-gray w3-hover-none w3-hover-text-black">Utilisateurs</a>\n			<a id="admin-books" href="/#/admin/books/" class="w3-bar-item w3-button w3-text-gray w3-hover-none w3-hover-text-black">Ouvrages</a>\n			<a id="admin-authors" href="/#/admin/authors/" class="w3-bar-item w3-button w3-text-gray w3-hover-none w3-hover-text-black">Auteurs</a>\n		</nav>\n		<div id="admin-container"></div>\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ })
/******/ ]);