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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
			xmlhttp.setRequestHeader("Accept", "text/json");
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
/* 2 */
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
/* 3 */
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

var	fixUrls = __webpack_require__(9);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _router = __webpack_require__(5);

var _router2 = _interopRequireDefault(_router);

var _dataStore = __webpack_require__(1);

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
			//if small device
			if (window.innerWidth < 768) {
				_utils2.default.addClass("#nav-bar-top", "hidden");
				_utils2.default.addClass('body', 'book'); //body background
			}
			_utils2.default.addClass('body', 'book'); //body background
			_utils2.default.addClass("#top-links", "hidden");
			_utils2.default.addClass("#menu-open", "hidden");
			_utils2.default.addClass('#search-open', 'hidden');
		} else {
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

		//HOME-LINK
		root.querySelector('#home-link').addEventListener('click', function (event) {
			event.preventDefault();
			if (location.hash.match(/#\/[^\/]+\/read$/)) {
				var prevLocation = _dataStore2.default.getData('location').prevLocation;
				location.hash = prevLocation ? prevLocation : '#/';
			} else {
				location.hash = '#/';
			}
		}, false);
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
			_utils2.default.addClass('#screen', 'hidden');
		}).catch(function (error) {
			console.log(error);
		});
	};

	window.addEventListener('DOMContentLoaded', function (e) {
		init();
		getData();

		window.addEventListener('hashchange', function () {
			if (location.hash.match(/#\/[^\/]+\/read$/)) {
				if (window.innerWidth < 768) {
					_utils2.default.addClass("#nav-bar-top", "hidden");
				}
				_utils2.default.addClass('body', 'book');
				_utils2.default.addClass("#top-links", "hidden");
				_utils2.default.addClass("#menu-open", "hidden");
				_utils2.default.addClass('#search-open', 'hidden');
			} else {
				_utils2.default.removeClass("#nav-bar-top", "hidden");
				_utils2.default.removeClass('body', 'book');
				_utils2.default.setHTML("#top-title", "");
				_utils2.default.removeClass('#search-open', 'hidden');
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
			if (location.hash.match(/#\/[^\/]+\/read$/)) {
				if (window.innerWidth < 768) {
					_utils2.default.addClass("#nav-bar-top", "hidden");
				} else {
					_utils2.default.removeClass("#nav-bar-top", "hidden");
				}
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
	}, false);
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(1);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _home = __webpack_require__(6);

var _home2 = _interopRequireDefault(_home);

var _search = __webpack_require__(11);

var _search2 = _interopRequireDefault(_search);

var _booksNext = __webpack_require__(15);

var _booksNext2 = _interopRequireDefault(_booksNext);

var _bookRead = __webpack_require__(19);

var _bookRead2 = _interopRequireDefault(_bookRead);

var _authors = __webpack_require__(27);

var _authors2 = _interopRequireDefault(_authors);

var _adminLogin = __webpack_require__(31);

var _adminLogin2 = _interopRequireDefault(_adminLogin);

var _adminRouter = __webpack_require__(33);

var _adminRouter2 = _interopRequireDefault(_adminRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//admin (template - no controller)

//authors (controller)

//books-next(controller)

//home(controller)
var adminTemplate = __webpack_require__(72);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dataStore = __webpack_require__(1);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _home = __webpack_require__(7);

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var homeTemplate = __webpack_require__(10);
//home.js
var home = function home(container) {
	'use strict';

	var c = container;

	//Get books from dataStore
	var bs = _dataStore2.default.getData('books');
	//get last four visible books reverse order
	var lBs = bs.filter(function (b) {
		return b.visible;
	}).reverse().slice(0, 5);

	//go to book/read
	var readBk = function readBk(event) {
		var bk = _dataStore2.default.getData('books', event.currentTarget.id);
		location.hash = '#' + bk.path + "/read";
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "#home-container #top-page-header {\n\ttext-align: center;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tfont-size: 1em;\n\tfont-variant: small-caps;\n\tletter-spacing: 1px;\n\tline-height: 25px;\n\twidth: 170px;\n\tmargin: auto;\n\tmargin-top: 16px;\n\tdisplay: block;\n}\n\n@media only screen and (min-width: 768px) {\n\t#home-container #top-page-header {\n\t\tdisplay: none;\n\t}\n}\n\n#home-container #booksList {\n\tmax-width: 568px;\n\tmargin: auto;\n}\n\n@media only screen and (min-width: 853px) {\n\t#home-container #booksList {\n\t\tmax-width: 852px;\n\t}\n}\n\n@media only screen and (min-width: 1137px) {\n\t#home-container #booksList {\n\t\tmax-width: 1136px;\n\t}\n}\n\n#home-container .w3-col {\n\twidth: 100%;\n\theight: 408px;\n\t\n}\n\n@media only screen and (min-width: 600px) {\n\t#home-container .w3-col {\n\t\twidth: 284px;\n\t}\n}\n\n#home-container #paper {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#home-container .book {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#home-container #book-btn {\n\twidth: 238px;\n\theight: 40px;\n\tmargin: auto;\n\tmargin-top: 8px;\n}\n\n#home-container #book-btn button {\n\tfont-family: \"Times New Roman\", Georgia, serif;\n\tfont-size: 1em;\n\tletter-spacing: 1.5px;\n}\n\n/*\nMODAL (INFOS)\n*/\n#home-container .w3-modal {\n\tfont-family: \"Times New Roman\", Georgia, serif;\n}\n\n#home-container .w3-modal #footer {\n\tpadding-top: 16px;\n}\n\n#home-container .w3-modal .close-infos-btn {\n\tfont-size: 1.1em;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tletter-spacing: 1px;\n}\n\n#home-container .w3-modal p {\n\tmargin: 0px;\n\tmargin-top: 8px;\n}\n\n#home-container .w3-modal ul {\n\tmargin: 0px;\n\tpadding-left: 10px;\n\tlist-style-type: none;\n}\n\n#home-container .w3-modal .contrib-role {\n\ttext-transform: capitalize;\n}\n\n\n\n", ""]);

// exports


/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="home-container" class="w3-content" style="max-width: 1136px">\n\n	<div id="top-page-header" class="w3-light-gray">nouvelles parutions</div>\n	<div id="booksList" class="w3-padding-64 w3-animate-opacity">\n		<div class=\'w3-row\'>\n			<% for(var i=0; i<books.length; i++) {%>\n				\n				<!-- MODAL (INFOS) -->\n				<div id="infos-<%= books[i].id %>" class="w3-modal" style="background-color: rgba(0,0,0,0.1)">\n					<div class="w3-modal-content w3-card" style="max-width: 500px">\n						<div class="w3-container w3-padding-16 ">\n							  <p><b>Titre : </b><%- books[i].title %></p>\n							  <% if(books[i].subtitle1) {%>\n								<p><b>Sous-titre : </b><%- books[i].subtitle1 %></p>\n							  <%}%>\n							  <% if(books[i].subtitle2) {%>\n								<p><b>Sous-sous-titre : </b><%- books[i].subtitle2 %></p>\n							  <%}%>\n							  <p><b>Année de parution : </b><%- books[i].year %></p>\n							  <% if(books[i].authors.length > 1) {%>\n									<p>\n										<span><b>Auteurs :</b></span>\n										<br>\n										<ul>\n										<% for(var j=0; j<books[i].authors.length; j++) {%>\n											<li>\n												<%- books[i].authors[j].name %> (<%- books[i].authors[j].birth %>&nbsp;&ndash; <%- books[i].authors[j].death %>)\n											</li>\n										<%}%>\n										</ul>\n								    </p>\n							  <%} else if(books[i].authors.length === 1) {%>\n									<p><b>Auteur : </b><%- books[i].authors[0].name %> (<%- books[i].authors[0].birth %>&nbsp;&ndash; <%- books[i].authors[0].death %>)</p>\n							  <%}%>\n							  <% if(books[i].contribs.length > 1) {%>\n									<p>\n										<span><b>Contributions :</b></span>\n										<br>\n										<ul>\n										<% for(var j=0; j<books[i].contribs.length; j++) {%>\n											<li>\n												<span class="contrib-role"><%- books[i].contribs[j].role %> : </span>\n												<%- books[i].contribs[j].name %> (<%- books[i].contribs[j].birth %>&nbsp;&ndash; <%- books[i].contribs[j].death %>)\n											</li>\n										<%}%>\n										</ul>\n								    </p>\n							  <%} else if(books[i].contribs.length === 1) {%>\n									<p>\n										<span><b>Contribution : </b></span>\n										<br>\n										<ul>\n											<li>\n												<span class="contrib-role"><%- books[i].contribs[0].role %> : </span>\n												<%- books[i].contribs[0].name %> (<%- books[i].contribs[0].birth %>&nbsp;&ndash; <%- books[i].contribs[0].death %>)\n											</li>\n										</ul>\n									</p>\n							  <%}%>\n							  <p class="book-source"><b>Source : </b>\n								  <ul>\n									  <li>&Eacute;diteur : <%- books[i].source.publisher %></li>\n									  <li>Année de publication : <%- books[i].source.year %></li>\n								  </ul>\n							  </p>\n							  <% if(books[i].description) {%>\n							  <div><%- books[i].description %></div>\n							  <%}%>\n						</div>\n						<div id=footer class="w3-container w3-border-bottom">\n							<button id="close-infos-<%= books[i].id %>" \n									class="close-infos-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-bottomright"\n									>Fermer</button>\n						</div>\n					</div>\n				</div>\n				\n				<div class="w3-col" style="text-align: center">\n					<div id="paper" style="background-image=<%= books[i].styles.image %>">\n					<div id="<%= books[i].id %>" class="book w3-card-4 w3-display-container" style="<%= books[i].styles.cover %>">\n						<p class="author" style="<%=books[i].styles.author %>"><%= books[i].authorDisplay %></p>\n						<p class="title" style="<%=books[i].styles.title %>">\n							<%- books[i].title %>\n						</p>\n						<% if(books[i].subtitle1) {%>\n						<p class="subtitle1" style="<%=books[i].styles.subtitle1 %>">\n							<%- books[i].subtitle1 %></a>\n						</p>\n						<% } %>\n						<% if(books[i].subtitle2) {%>\n						<p class="subtitle1" style="<%=books[i].styles.subtitle2 %>">\n							<%- books[i].subtitle2 %></a>\n						</p>\n						<% } %>\n						<p class="logo w3-display-bottommiddle" style="<%=books[i].styles.logo %>">liber</p>\n				   </div>\n				   </div>\n				   <div id="book-btn" >\n						<button id="open-infos-<%= books[i].id %>" \n						        class="open-infos-btn align-right w3-button" >+ d\'infos</button>\n				   </div>\n				</div>\n				\n			<% } %>\n		</div>\n	</div>\n</div>\n',
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
                buf.push('<div id="home-container" class="w3-content" style="max-width: 1136px">\n\n	<div id="top-page-header" class="w3-light-gray">nouvelles parutions</div>\n	<div id="booksList" class="w3-padding-64 w3-animate-opacity">\n		<div class=\'w3-row\'>\n			');
                __stack.lineno = 6;
                for (var i = 0; i < books.length; i++) {
                    buf.push('\n				\n				<!-- MODAL (INFOS) -->\n				<div id="infos-', escape((__stack.lineno = 9, books[i].id)), '" class="w3-modal" style="background-color: rgba(0,0,0,0.1)">\n					<div class="w3-modal-content w3-card" style="max-width: 500px">\n						<div class="w3-container w3-padding-16 ">\n							  <p><b>Titre : </b>', (__stack.lineno = 12, books[i].title), "</p>\n							  ");
                    __stack.lineno = 13;
                    if (books[i].subtitle1) {
                        buf.push("\n								<p><b>Sous-titre : </b>", (__stack.lineno = 14, books[i].subtitle1), "</p>\n							  ");
                        __stack.lineno = 15;
                    }
                    buf.push("\n							  ");
                    __stack.lineno = 16;
                    if (books[i].subtitle2) {
                        buf.push("\n								<p><b>Sous-sous-titre : </b>", (__stack.lineno = 17, books[i].subtitle2), "</p>\n							  ");
                        __stack.lineno = 18;
                    }
                    buf.push("\n							  <p><b>Année de parution : </b>", (__stack.lineno = 19, books[i].year), "</p>\n							  ");
                    __stack.lineno = 20;
                    if (books[i].authors.length > 1) {
                        buf.push("\n									<p>\n										<span><b>Auteurs :</b></span>\n										<br>\n										<ul>\n										");
                        __stack.lineno = 25;
                        for (var j = 0; j < books[i].authors.length; j++) {
                            buf.push("\n											<li>\n												", (__stack.lineno = 27, books[i].authors[j].name), " (", (__stack.lineno = 27, books[i].authors[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 27, books[i].authors[j].death), ")\n											</li>\n										");
                            __stack.lineno = 29;
                        }
                        buf.push("\n										</ul>\n								    </p>\n							  ");
                        __stack.lineno = 32;
                    } else if (books[i].authors.length === 1) {
                        buf.push("\n									<p><b>Auteur : </b>", (__stack.lineno = 33, books[i].authors[0].name), " (", (__stack.lineno = 33, books[i].authors[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 33, books[i].authors[0].death), ")</p>\n							  ");
                        __stack.lineno = 34;
                    }
                    buf.push("\n							  ");
                    __stack.lineno = 35;
                    if (books[i].contribs.length > 1) {
                        buf.push("\n									<p>\n										<span><b>Contributions :</b></span>\n										<br>\n										<ul>\n										");
                        __stack.lineno = 40;
                        for (var j = 0; j < books[i].contribs.length; j++) {
                            buf.push('\n											<li>\n												<span class="contrib-role">', (__stack.lineno = 42, books[i].contribs[j].role), " : </span>\n												", (__stack.lineno = 43, books[i].contribs[j].name), " (", (__stack.lineno = 43, books[i].contribs[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 43, books[i].contribs[j].death), ")\n											</li>\n										");
                            __stack.lineno = 45;
                        }
                        buf.push("\n										</ul>\n								    </p>\n							  ");
                        __stack.lineno = 48;
                    } else if (books[i].contribs.length === 1) {
                        buf.push('\n									<p>\n										<span><b>Contribution : </b></span>\n										<br>\n										<ul>\n											<li>\n												<span class="contrib-role">', (__stack.lineno = 54, books[i].contribs[0].role), " : </span>\n												", (__stack.lineno = 55, books[i].contribs[0].name), " (", (__stack.lineno = 55, books[i].contribs[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 55, books[i].contribs[0].death), ")\n											</li>\n										</ul>\n									</p>\n							  ");
                        __stack.lineno = 59;
                    }
                    buf.push('\n							  <p class="book-source"><b>Source : </b>\n								  <ul>\n									  <li>&Eacute;diteur : ', (__stack.lineno = 62, books[i].source.publisher), "</li>\n									  <li>Année de publication : ", (__stack.lineno = 63, books[i].source.year), "</li>\n								  </ul>\n							  </p>\n							  ");
                    __stack.lineno = 66;
                    if (books[i].description) {
                        buf.push("\n							  <div>", (__stack.lineno = 67, books[i].description), "</div>\n							  ");
                        __stack.lineno = 68;
                    }
                    buf.push('\n						</div>\n						<div id=footer class="w3-container w3-border-bottom">\n							<button id="close-infos-', escape((__stack.lineno = 71, books[i].id)), '" \n									class="close-infos-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-bottomright"\n									>Fermer</button>\n						</div>\n					</div>\n				</div>\n				\n				<div class="w3-col" style="text-align: center">\n					<div id="paper" style="background-image=', escape((__stack.lineno = 79, books[i].styles.image)), '">\n					<div id="', escape((__stack.lineno = 80, books[i].id)), '" class="book w3-card-4 w3-display-container" style="', escape((__stack.lineno = 80, books[i].styles.cover)), '">\n						<p class="author" style="', escape((__stack.lineno = 81, books[i].styles.author)), '">', escape((__stack.lineno = 81, books[i].authorDisplay)), '</p>\n						<p class="title" style="', escape((__stack.lineno = 82, books[i].styles.title)), '">\n							', (__stack.lineno = 83, books[i].title), "\n						</p>\n						");
                    __stack.lineno = 85;
                    if (books[i].subtitle1) {
                        buf.push('\n						<p class="subtitle1" style="', escape((__stack.lineno = 86, books[i].styles.subtitle1)), '">\n							', (__stack.lineno = 87, books[i].subtitle1), "</a>\n						</p>\n						");
                        __stack.lineno = 89;
                    }
                    buf.push("\n						");
                    __stack.lineno = 90;
                    if (books[i].subtitle2) {
                        buf.push('\n						<p class="subtitle1" style="', escape((__stack.lineno = 91, books[i].styles.subtitle2)), '">\n							', (__stack.lineno = 92, books[i].subtitle2), "</a>\n						</p>\n						");
                        __stack.lineno = 94;
                    }
                    buf.push('\n						<p class="logo w3-display-bottommiddle" style="', escape((__stack.lineno = 95, books[i].styles.logo)), '">liber</p>\n				   </div>\n				   </div>\n				   <div id="book-btn" >\n						<button id="open-infos-', escape((__stack.lineno = 99, books[i].id)), '" \n						        class="open-infos-btn align-right w3-button" >+ d\'infos</button>\n				   </div>\n				</div>\n				\n			');
                    __stack.lineno = 104;
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dataStore = __webpack_require__(1);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _search = __webpack_require__(12);

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchTemplate = __webpack_require__(14);

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
			sbs.push(ba[0]);
		};

		for (var j = 0; j < a.contribs.length; j++) {
			_loop(j);
		}

		var _loop2 = function _loop2(j) {
			var ab = a.books[j];
			var ba = bs.filter(function (b) {
				return b.id === ab.id;
			});
			sbs.push(ba[0]);
		};

		for (var j = 0; j < a.books.length; j++) {
			_loop2(j);
		}
	}

	if (sbs.length === 0) {
		nores = 'Aucun résultat.';
		c.innerHTML = searchTemplate({ books: [], nores: nores });
		return;
	}

	//go to book/read
	var readBk = function readBk(event) {
		var bk = _dataStore2.default.getData('books', event.currentTarget.id);
		location.hash = '#' + bk.path + "/read";
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "#search-container #top-page-header {\n\ttext-align: center;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tfont-size: 1em;\n\tfont-variant: small-caps;\n\tletter-spacing: 1px;\n\tline-height: 25px;\n\twidth: 98px;\n\tmargin: auto;\n\tmargin-top: 16px;\n\tdisplay: block;\n}\n\n@media only screen and (min-width: 768px) {\n\t#search-container #top-page-header {\n\t\tdisplay: none;\n\t}\n}\n\n#search-container #booksList {\n\tmax-width: 568px;\n\tmargin: auto;\n}\n\n@media only screen and (min-width: 853px) {\n\t#search-container #booksList {\n\t\tmax-width: 852px;\n\t}\n}\n\n@media only screen and (min-width: 1137px) {\n\t#search-container #booksList {\n\t\tmax-width: 1136px;\n\t}\n}\n\n#search-container .w3-col {\n\twidth: 100%;\n\theight: 408px;\n}\n\n@media only screen and (min-width: 600px) {\n\t#search-container .w3-col {\n\t\twidth: 284px;\n\t}\n}\n\n#search-container #paper {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#search-container .book {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#search-container #book-btn {\n\twidth: 238px;\n\theight: 40px;\n\tmargin: auto;\n\tmargin-top: 8px;\n}\n\n#search-container #book-btn button {\n\tfont-family: \"Times New Roman\", Georgia, serif;\n\tfont-size: 1em;\n\tletter-spacing: 1.5px;\n}\n\n/*\nMODAL (INFOS)\n*/\n#search-container .w3-modal {\n\tfont-family: \"Times New Roman\", Georgia, serif;\n}\n\n#search-container .w3-modal #footer {\n\tpadding-top: 16px;\n}\n\n#search-container .w3-modal .close-infos-btn {\n\tfont-size: 1.1em;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tletter-spacing: 1px;\n}\n\n#search-container .w3-modal p {\n\tmargin: 0px;\n\tmargin-top: 8px;\n}\n\n#search-container .w3-modal ul {\n\tmargin: 0px;\n\tpadding-left: 10px;\n\tlist-style-type: none;\n}\n\n#search-container .w3-modal .contrib-role {\n\ttext-transform: capitalize;\n}\n\n#nores {\n\ttext-align: center;\n}\n\n#nores p {\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tfont-size: 1.2em;\n\tfont-variant: small-caps;\n\tletter-spacing: 1px;\n}\n\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="search-container" class="w3-content" style="max-width: 1136px">\n	<div id="top-page-header" class="w3-light-gray">recherche</div>\n	<% if(nores!==\'\') {%>\n		<div id="nores" class="w3-padding-32 w3-animate-opacity">\n			<p><%= nores %></p>\n		</div<\n	<%}%>\n	<div id="booksList" class="w3-padding-64 w3-animate-opacity">\n		<div class=\'w3-row\'>\n			<% for(var i=0; i<books.length; i++) {%>\n				\n				<!-- MODAL (INFOS) -->\n				<div id="infos-<%= books[i].id %>" class="w3-modal" style="background-color: rgba(0,0,0,0.1)">\n					<div class="w3-modal-content w3-card" style="max-width: 500px">\n						<div class="w3-container w3-padding-16 ">\n							  <p><b>Titre : </b><%- books[i].title %></p>\n							  <% if(books[i].subtitle1) {%>\n								<p><b>Sous-titre : </b><%- books[i].subtitle1 %></p>\n							  <%}%>\n							  <% if(books[i].subtitle2) {%>\n								<p><b>Sous-sous-titre : </b><%- books[i].subtitle2 %></p>\n							  <%}%>\n							  <p><b>Année de parution : </b><%- books[i].year %></p>\n							  <% if(books[i].authors.length > 1) {%>\n									<p>\n										<span><b>Auteurs :</b></span>\n										<br>\n										<ul>\n										<% for(var j=0; j<books[i].authors.length; j++) {%>\n											<li>\n												<%- books[i].authors[j].name %> (<%- books[i].authors[j].birth %>&nbsp;&ndash; <%- books[i].authors[j].death %>)\n											</li>\n										<%}%>\n										</ul>\n								    </p>\n							  <%} else if(books[i].authors.length === 1) {%>\n									<p><b>Auteur : </b><%- books[i].authors[0].name %> (<%- books[i].authors[0].birth %>&nbsp;&ndash; <%- books[i].authors[0].death %>)</p>\n							  <%}%>\n							  <% if(books[i].contribs.length > 1) {%>\n									<p>\n										<span><b>Contributions :</b></span>\n										<br>\n										<ul>\n										<% for(var j=0; j<books[i].contribs.length; j++) {%>\n											<li>\n												<span class="contrib-role"><%- books[i].contribs[j].role %> : </span>\n												<%- books[i].contribs[j].name %> (<%- books[i].contribs[j].birth %>&nbsp;&ndash; <%- books[i].contribs[j].death %>)\n											</li>\n										<%}%>\n										</ul>\n								    </p>\n							  <%} else if(books[i].contribs.length === 1) {%>\n									<p>\n										<span><b>Contribution : </b></span>\n										<br>\n										<ul>\n											<li>\n												<span class="contrib-role"><%- books[i].contribs[0].role %> : </span>\n												<%- books[i].contribs[0].name %> (<%- books[i].contribs[0].birth %>&nbsp;&ndash; <%- books[i].contribs[0].death %>)\n											</li>\n										</ul>\n									</p>\n							  <%}%>\n							  <p class="book-source"><b>Source : </b>\n								  <ul>\n									  <li>&Eacute;diteur : <%- books[i].source.publisher %></li>\n									  <li>Année de publication : <%- books[i].source.year %></li>\n								  </ul>\n							  </p>\n							  <% if(books[i].description) {%>\n							  <div><%- books[i].description %></div>\n							  <%}%>\n						</div>\n						<div id=footer class="w3-container w3-border-bottom">\n							<button id="close-infos-<%= books[i].id %>" \n									class="close-infos-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-bottomright"\n									>Fermer</button>\n						</div>\n					</div>\n				</div>\n				\n				<div class="w3-col" style="text-align: center">\n					<div id="paper" style="background-image=<%= books[i].styles.image %>">\n					<div id="<%= books[i].id %>" class="book w3-card-4 w3-display-container" style="<%=books[i].styles.cover %>">\n						<p class="author" style="<%=books[i].styles.author %>"><%= books[i].authorDisplay %></p>\n						<p class="title" style="<%=books[i].styles.title %>">\n							<%- books[i].title %>\n						</p>\n						<% if(books[i].subtitle1) {%>\n						<p class="subtitle1" style="<%=books[i].styles.subtitle1 %>">\n							<%- books[i].subtitle1 %></a>\n						</p>\n						<% } %>\n						<% if(books[i].subtitle2) {%>\n						<p class="subtitle1" style="<%=books[i].styles.subtitle2 %>">\n							<%- books[i].subtitle2 %></a>\n						</p>\n						<% } %>\n						<p class="logo w3-display-bottommiddle" style="<%=books[i].styles.logo %>">liber</p>\n				   </div>\n				   </div>\n				   <div id="book-btn" >\n						<button id="open-infos-<%= books[i].id %>" \n						        class="open-infos-btn align-right w3-button" >+ d\'infos</button>\n				   </div>\n				</div>\n				\n			<% } %>\n		</div>\n	\n	</div>\n</div>\n',
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
                    buf.push('\n				\n				<!-- MODAL (INFOS) -->\n				<div id="infos-', escape((__stack.lineno = 13, books[i].id)), '" class="w3-modal" style="background-color: rgba(0,0,0,0.1)">\n					<div class="w3-modal-content w3-card" style="max-width: 500px">\n						<div class="w3-container w3-padding-16 ">\n							  <p><b>Titre : </b>', (__stack.lineno = 16, books[i].title), "</p>\n							  ");
                    __stack.lineno = 17;
                    if (books[i].subtitle1) {
                        buf.push("\n								<p><b>Sous-titre : </b>", (__stack.lineno = 18, books[i].subtitle1), "</p>\n							  ");
                        __stack.lineno = 19;
                    }
                    buf.push("\n							  ");
                    __stack.lineno = 20;
                    if (books[i].subtitle2) {
                        buf.push("\n								<p><b>Sous-sous-titre : </b>", (__stack.lineno = 21, books[i].subtitle2), "</p>\n							  ");
                        __stack.lineno = 22;
                    }
                    buf.push("\n							  <p><b>Année de parution : </b>", (__stack.lineno = 23, books[i].year), "</p>\n							  ");
                    __stack.lineno = 24;
                    if (books[i].authors.length > 1) {
                        buf.push("\n									<p>\n										<span><b>Auteurs :</b></span>\n										<br>\n										<ul>\n										");
                        __stack.lineno = 29;
                        for (var j = 0; j < books[i].authors.length; j++) {
                            buf.push("\n											<li>\n												", (__stack.lineno = 31, books[i].authors[j].name), " (", (__stack.lineno = 31, books[i].authors[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 31, books[i].authors[j].death), ")\n											</li>\n										");
                            __stack.lineno = 33;
                        }
                        buf.push("\n										</ul>\n								    </p>\n							  ");
                        __stack.lineno = 36;
                    } else if (books[i].authors.length === 1) {
                        buf.push("\n									<p><b>Auteur : </b>", (__stack.lineno = 37, books[i].authors[0].name), " (", (__stack.lineno = 37, books[i].authors[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 37, books[i].authors[0].death), ")</p>\n							  ");
                        __stack.lineno = 38;
                    }
                    buf.push("\n							  ");
                    __stack.lineno = 39;
                    if (books[i].contribs.length > 1) {
                        buf.push("\n									<p>\n										<span><b>Contributions :</b></span>\n										<br>\n										<ul>\n										");
                        __stack.lineno = 44;
                        for (var j = 0; j < books[i].contribs.length; j++) {
                            buf.push('\n											<li>\n												<span class="contrib-role">', (__stack.lineno = 46, books[i].contribs[j].role), " : </span>\n												", (__stack.lineno = 47, books[i].contribs[j].name), " (", (__stack.lineno = 47, books[i].contribs[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 47, books[i].contribs[j].death), ")\n											</li>\n										");
                            __stack.lineno = 49;
                        }
                        buf.push("\n										</ul>\n								    </p>\n							  ");
                        __stack.lineno = 52;
                    } else if (books[i].contribs.length === 1) {
                        buf.push('\n									<p>\n										<span><b>Contribution : </b></span>\n										<br>\n										<ul>\n											<li>\n												<span class="contrib-role">', (__stack.lineno = 58, books[i].contribs[0].role), " : </span>\n												", (__stack.lineno = 59, books[i].contribs[0].name), " (", (__stack.lineno = 59, books[i].contribs[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 59, books[i].contribs[0].death), ")\n											</li>\n										</ul>\n									</p>\n							  ");
                        __stack.lineno = 63;
                    }
                    buf.push('\n							  <p class="book-source"><b>Source : </b>\n								  <ul>\n									  <li>&Eacute;diteur : ', (__stack.lineno = 66, books[i].source.publisher), "</li>\n									  <li>Année de publication : ", (__stack.lineno = 67, books[i].source.year), "</li>\n								  </ul>\n							  </p>\n							  ");
                    __stack.lineno = 70;
                    if (books[i].description) {
                        buf.push("\n							  <div>", (__stack.lineno = 71, books[i].description), "</div>\n							  ");
                        __stack.lineno = 72;
                    }
                    buf.push('\n						</div>\n						<div id=footer class="w3-container w3-border-bottom">\n							<button id="close-infos-', escape((__stack.lineno = 75, books[i].id)), '" \n									class="close-infos-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-bottomright"\n									>Fermer</button>\n						</div>\n					</div>\n				</div>\n				\n				<div class="w3-col" style="text-align: center">\n					<div id="paper" style="background-image=', escape((__stack.lineno = 83, books[i].styles.image)), '">\n					<div id="', escape((__stack.lineno = 84, books[i].id)), '" class="book w3-card-4 w3-display-container" style="', escape((__stack.lineno = 84, books[i].styles.cover)), '">\n						<p class="author" style="', escape((__stack.lineno = 85, books[i].styles.author)), '">', escape((__stack.lineno = 85, books[i].authorDisplay)), '</p>\n						<p class="title" style="', escape((__stack.lineno = 86, books[i].styles.title)), '">\n							', (__stack.lineno = 87, books[i].title), "\n						</p>\n						");
                    __stack.lineno = 89;
                    if (books[i].subtitle1) {
                        buf.push('\n						<p class="subtitle1" style="', escape((__stack.lineno = 90, books[i].styles.subtitle1)), '">\n							', (__stack.lineno = 91, books[i].subtitle1), "</a>\n						</p>\n						");
                        __stack.lineno = 93;
                    }
                    buf.push("\n						");
                    __stack.lineno = 94;
                    if (books[i].subtitle2) {
                        buf.push('\n						<p class="subtitle1" style="', escape((__stack.lineno = 95, books[i].styles.subtitle2)), '">\n							', (__stack.lineno = 96, books[i].subtitle2), "</a>\n						</p>\n						");
                        __stack.lineno = 98;
                    }
                    buf.push('\n						<p class="logo w3-display-bottommiddle" style="', escape((__stack.lineno = 99, books[i].styles.logo)), '">liber</p>\n				   </div>\n				   </div>\n				   <div id="book-btn" >\n						<button id="open-infos-', escape((__stack.lineno = 103, books[i].id)), '" \n						        class="open-infos-btn align-right w3-button" >+ d\'infos</button>\n				   </div>\n				</div>\n				\n			');
                    __stack.lineno = 108;
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dataStore = __webpack_require__(1);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _booksNext = __webpack_require__(16);

var _booksNext2 = _interopRequireDefault(_booksNext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var booksNextTemplate = __webpack_require__(18);
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "#books-next-container #top-page-header {\n\ttext-align: center;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tfont-size: 1em;\n\tfont-variant: small-caps;\n\tletter-spacing: 1px;\n\tline-height: 25px;\n\twidth: 172px;\n\tmargin: auto;\n\tmargin-top: 16px;\n\tdisplay: block;\n}\n\n@media only screen and (min-width: 768px) {\n\t#books-next-container #top-page-header {\n\t\tdisplay: none;\n\t}\n}\n\n#books-next-container #booksList {\n\tmax-width: 568px;\n\tmargin: auto;\n}\n\n@media only screen and (min-width: 853px) {\n\t#books-next-container #booksList {\n\t\tmax-width: 852px;\n\t}\n}\n\n@media only screen and (min-width: 1137px) {\n\t#books-next-container #booksList {\n\t\tmax-width: 1136px;\n\t}\n}\n\n#books-next-container .w3-col {\n\twidth: 100%;\n\theight: 408px;\n}\n\n@media only screen and (min-width: 600px) {\n\t#books-next-container .w3-col {\n\t\twidth: 284px;\n\t}\n}\n\n#books-next-container #paper {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#books-next-container .book {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#books-next-container #book-btn {\n\twidth: 238px;\n\theight: 40px;\n\tmargin: auto;\n\tmargin-top: 8px;\n}\n\n#books-next-container #book-btn button {\n\tfont-family: \"Times New Roman\", Georgia, serif;\n\tfont-size: 1em;\n\tletter-spacing: 1.5px;\n}\n\n/*\nMODAL (INFOS)\n*/\n#books-next-container .w3-modal {\n\tfont-family: \"Times New Roman\", Georgia, serif;\n}\n\n#books-next-container .w3-modal #footer {\n\tpadding-top: 16px;\n}\n\n#books-next-container .w3-modal .close-infos-btn {\n\tfont-size: 1.1em;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tletter-spacing: 1px;\n}\n\n#books-next-container .w3-modal p {\n\tmargin: 0px;\n\tmargin-top: 8px;\n}\n\n#books-next-container .w3-modal ul {\n\tmargin: 0px;\n\tpadding-left: 10px;\n\tlist-style-type: none;\n}\n\n#books-next-container .w3-modal .contrib-role {\n\ttext-transform: capitalize;\n}\n\n\n\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="books-next-container" class="w3-content" style="max-width: 1200px">\n	<div id="top-page-header" class="w3-light-gray">prochaines parutions</div>\n	<div id="booksList" class="w3-padding-64 w3-animate-opacity">\n		<div class=\'w3-row\'>\n			<% for(var i=0; i<books.length; i++) {%>\n				\n				<!-- MODAL (INFOS) -->\n				<div id="infos-<%= books[i].id %>" class="w3-modal" style="background-color: rgba(0,0,0,0.1)">\n					<div class="w3-modal-content w3-card" style="max-width: 500px">\n						<div class="w3-container w3-padding-16">\n							  <p><b>Titre : </b><%- books[i].title %></p>\n							  <% if(books[i].subtitle1) {%>\n								<p><b>Sous-titre : </b><%- books[i].subtitle1 %></p>\n							  <%}%>\n							  <% if(books[i].subtitle2) {%>\n								<p><b>Sous-sous-titre : </b><%- books[i].subtitle2 %></p>\n							  <%}%>\n							  <p><b>Année de parution : </b><%- books[i].year %></p>\n							  <% if(books[i].authors.length > 1) {%>\n									<p>\n										<span><b>Auteurs :</b></span>\n										<br>\n										<ul>\n										<% for(var j=0; j<books[i].authors.length; j++) {%>\n											<li>\n												<%- books[i].authors[j].name %> (<%- books[i].authors[j].birth %>&nbsp;&ndash; <%- books[i].authors[j].death %>)\n											</li>\n										<%}%>\n										</ul>\n								    </p>\n							  <%} else if(books[i].authors.length === 1) {%>\n									<p><b>Auteur : </b><%- books[i].authors[0].name %> (<%- books[i].authors[0].birth %>&nbsp;&ndash; <%- books[i].authors[0].death %>)</p>\n							  <%}%>\n							  <% if(books[i].contribs.length > 1) {%>\n									<p>\n										<span><b>Contributions :</b></span>\n										<br>\n										<ul>\n										<% for(var j=0; j<books[i].contribs.length; j++) {%>\n											<li>\n												<span class="contrib-role"><%- books[i].contribs[j].role %> : </span>\n												<%- books[i].contribs[j].name %> (<%- books[i].contribs[j].birth %>&nbsp;&ndash; <%- books[i].contribs[j].death %>)\n											</li>\n										<%}%>\n										</ul>\n								    </p>\n							  <%} else if(books[i].contribs.length === 1) {%>\n									<p>\n										<span><b>Contribution : </b></span>\n										<br>\n										<ul>\n											<li>\n												<span class="contrib-role"><%- books[i].contribs[0].role %> : </span>\n												<%- books[i].contribs[0].name %> (<%- books[i].contribs[0].birth %>&nbsp;&ndash; <%- books[i].contribs[0].death %>)\n											</li>\n										</ul>\n									</p>\n							  <%}%>\n							  <p class="book-source"><b>Source : </b>\n								  <ul>\n									  <li>&Eacute;diteur : <%- books[i].source.publisher %></li>\n									  <li>Année de publication : <%- books[i].source.year %></li>\n								  </ul>\n							  </p>\n							  <% if(books[i].description) {%>\n							  <div><%- books[i].description %></div>\n							  <%}%>\n						</div>\n						<div id=footer class="w3-container w3-border-bottom">\n							<button id="close-infos-<%= books[i].id %>" class="close-infos-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-bottomright">Fermer</button>\n						</div>\n					</div>\n				</div>\n\n				\n				<div class="w3-col" style="text-align: center">\n					<div id="paper" style="background-image=<%= books[i].styles.image %>">\n					<div class="book w3-card-4 w3-display-container" style="<%=books[i].styles.cover %>">\n						<p class="author" style="<%=books[i].styles.author %>"><%= books[i].authorDisplay %></p>\n						<p class="title" style="<%=books[i].styles.title %>">\n							<span><%- books[i].title %></span>\n						</p>\n						<% if(books[i].subtitle1) {%>\n						<p class="subtitle1" style="<%=books[i].styles.subtitle1 %>">\n							<%- books[i].subtitle1 %></a>\n						</p>\n						<% } %>\n						<% if(books[i].subtitle2) {%>\n						<p class="subtitle1" style="<%=books[i].styles.subtitle2 %>">\n							<%- books[i].subtitle2 %></a>\n						</p>\n						<% } %>\n						<p class="logo w3-display-bottommiddle" style="<%=books[i].styles.logo %>">liber</p>\n				   </div>\n				   </div>\n				   <div id="book-btn" >\n						<button id="open-infos-<%= books[i].id %>" class="open-infos-btn align-right w3-button">+ d\'infos</button>\n				   </div>\n				</div>\n				\n			<% } %>\n		</div>\n	</div>\n</div>\n',
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
                buf.push('<div id="books-next-container" class="w3-content" style="max-width: 1200px">\n	<div id="top-page-header" class="w3-light-gray">prochaines parutions</div>\n	<div id="booksList" class="w3-padding-64 w3-animate-opacity">\n		<div class=\'w3-row\'>\n			');
                __stack.lineno = 5;
                for (var i = 0; i < books.length; i++) {
                    buf.push('\n				\n				<!-- MODAL (INFOS) -->\n				<div id="infos-', escape((__stack.lineno = 8, books[i].id)), '" class="w3-modal" style="background-color: rgba(0,0,0,0.1)">\n					<div class="w3-modal-content w3-card" style="max-width: 500px">\n						<div class="w3-container w3-padding-16">\n							  <p><b>Titre : </b>', (__stack.lineno = 11, books[i].title), "</p>\n							  ");
                    __stack.lineno = 12;
                    if (books[i].subtitle1) {
                        buf.push("\n								<p><b>Sous-titre : </b>", (__stack.lineno = 13, books[i].subtitle1), "</p>\n							  ");
                        __stack.lineno = 14;
                    }
                    buf.push("\n							  ");
                    __stack.lineno = 15;
                    if (books[i].subtitle2) {
                        buf.push("\n								<p><b>Sous-sous-titre : </b>", (__stack.lineno = 16, books[i].subtitle2), "</p>\n							  ");
                        __stack.lineno = 17;
                    }
                    buf.push("\n							  <p><b>Année de parution : </b>", (__stack.lineno = 18, books[i].year), "</p>\n							  ");
                    __stack.lineno = 19;
                    if (books[i].authors.length > 1) {
                        buf.push("\n									<p>\n										<span><b>Auteurs :</b></span>\n										<br>\n										<ul>\n										");
                        __stack.lineno = 24;
                        for (var j = 0; j < books[i].authors.length; j++) {
                            buf.push("\n											<li>\n												", (__stack.lineno = 26, books[i].authors[j].name), " (", (__stack.lineno = 26, books[i].authors[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 26, books[i].authors[j].death), ")\n											</li>\n										");
                            __stack.lineno = 28;
                        }
                        buf.push("\n										</ul>\n								    </p>\n							  ");
                        __stack.lineno = 31;
                    } else if (books[i].authors.length === 1) {
                        buf.push("\n									<p><b>Auteur : </b>", (__stack.lineno = 32, books[i].authors[0].name), " (", (__stack.lineno = 32, books[i].authors[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 32, books[i].authors[0].death), ")</p>\n							  ");
                        __stack.lineno = 33;
                    }
                    buf.push("\n							  ");
                    __stack.lineno = 34;
                    if (books[i].contribs.length > 1) {
                        buf.push("\n									<p>\n										<span><b>Contributions :</b></span>\n										<br>\n										<ul>\n										");
                        __stack.lineno = 39;
                        for (var j = 0; j < books[i].contribs.length; j++) {
                            buf.push('\n											<li>\n												<span class="contrib-role">', (__stack.lineno = 41, books[i].contribs[j].role), " : </span>\n												", (__stack.lineno = 42, books[i].contribs[j].name), " (", (__stack.lineno = 42, books[i].contribs[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 42, books[i].contribs[j].death), ")\n											</li>\n										");
                            __stack.lineno = 44;
                        }
                        buf.push("\n										</ul>\n								    </p>\n							  ");
                        __stack.lineno = 47;
                    } else if (books[i].contribs.length === 1) {
                        buf.push('\n									<p>\n										<span><b>Contribution : </b></span>\n										<br>\n										<ul>\n											<li>\n												<span class="contrib-role">', (__stack.lineno = 53, books[i].contribs[0].role), " : </span>\n												", (__stack.lineno = 54, books[i].contribs[0].name), " (", (__stack.lineno = 54, books[i].contribs[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 54, books[i].contribs[0].death), ")\n											</li>\n										</ul>\n									</p>\n							  ");
                        __stack.lineno = 58;
                    }
                    buf.push('\n							  <p class="book-source"><b>Source : </b>\n								  <ul>\n									  <li>&Eacute;diteur : ', (__stack.lineno = 61, books[i].source.publisher), "</li>\n									  <li>Année de publication : ", (__stack.lineno = 62, books[i].source.year), "</li>\n								  </ul>\n							  </p>\n							  ");
                    __stack.lineno = 65;
                    if (books[i].description) {
                        buf.push("\n							  <div>", (__stack.lineno = 66, books[i].description), "</div>\n							  ");
                        __stack.lineno = 67;
                    }
                    buf.push('\n						</div>\n						<div id=footer class="w3-container w3-border-bottom">\n							<button id="close-infos-', escape((__stack.lineno = 70, books[i].id)), '" class="close-infos-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-bottomright">Fermer</button>\n						</div>\n					</div>\n				</div>\n\n				\n				<div class="w3-col" style="text-align: center">\n					<div id="paper" style="background-image=', escape((__stack.lineno = 77, books[i].styles.image)), '">\n					<div class="book w3-card-4 w3-display-container" style="', escape((__stack.lineno = 78, books[i].styles.cover)), '">\n						<p class="author" style="', escape((__stack.lineno = 79, books[i].styles.author)), '">', escape((__stack.lineno = 79, books[i].authorDisplay)), '</p>\n						<p class="title" style="', escape((__stack.lineno = 80, books[i].styles.title)), '">\n							<span>', (__stack.lineno = 81, books[i].title), "</span>\n						</p>\n						");
                    __stack.lineno = 83;
                    if (books[i].subtitle1) {
                        buf.push('\n						<p class="subtitle1" style="', escape((__stack.lineno = 84, books[i].styles.subtitle1)), '">\n							', (__stack.lineno = 85, books[i].subtitle1), "</a>\n						</p>\n						");
                        __stack.lineno = 87;
                    }
                    buf.push("\n						");
                    __stack.lineno = 88;
                    if (books[i].subtitle2) {
                        buf.push('\n						<p class="subtitle1" style="', escape((__stack.lineno = 89, books[i].styles.subtitle2)), '">\n							', (__stack.lineno = 90, books[i].subtitle2), "</a>\n						</p>\n						");
                        __stack.lineno = 92;
                    }
                    buf.push('\n						<p class="logo w3-display-bottommiddle" style="', escape((__stack.lineno = 93, books[i].styles.logo)), '">liber</p>\n				   </div>\n				   </div>\n				   <div id="book-btn" >\n						<button id="open-infos-', escape((__stack.lineno = 97, books[i].id)), '" class="open-infos-btn align-right w3-button">+ d\'infos</button>\n				   </div>\n				</div>\n				\n			');
                    __stack.lineno = 101;
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(1);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _WebBook = __webpack_require__(20);

var _WebBook2 = _interopRequireDefault(_WebBook);

var _bookRead = __webpack_require__(23);

var _bookRead2 = _interopRequireDefault(_bookRead);

var _hammerjs = __webpack_require__(25);

var _hammerjs2 = _interopRequireDefault(_hammerjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookReadTemplate = __webpack_require__(26);
//book.js
var book = function book(container) {
	'use strict';

	var c = container;

	var init = function init() {
		//DIMENSIONS
		var h = void 0,
		    w = void 0,
		    marginY = void 0,
		    marginX = void 0,
		    fontSize = void 0,
		    lineHeight = void 0,
		    top = void 0;

		//width (responsive)
		if (window.innerWidth >= 768) {
			//max-height: 720
			if (window.innerHeight > 876) {
				//748 + navBars height *2 (2*44) + textContainer minimum top * 2 (2*20)
				h = 748;
				top = (window.innerHeight - 748 - 88) / 2;
				textContainer.style.top = top - 15 + 'px';
				tocLargeDevice.style.marginTop = top - 15 + 'px';
				bookNavBarBottom.style.marginTop = top - 15 + 'px';
			} else {
				h = window.innerHeight - 88 - 40; //navBars height *2 (2*44) + textContainer top * 2 (2*20)
				textContainer.style.top = '15px';
				tocLargeDevice.style.marginTop = '15px';
				bookNavBarBottom.style.marginTop = '15px';
			}
			w = 550;
			fontSize = 15;
		} else {
			h = window.innerHeight;
			w = window.innerWidth;
			fontSize = 14;
			textContainer.style.top = '0px';
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

		//new Book
		var book = new _WebBook2.default(bookContainer, {
			height: h,
			maxWidth: w,
			marginY: marginY,
			marginX: marginX
		});

		if (window.innerWidth >= 1366) {
			//Toc-large height
			bookContainer.querySelector("#toc-large-device div").style.maxHeight = h - 30 + "px";
		}

		//on resize
		window.addEventListener('resize', function (event) {
			if (window.innerWidth >= 768) {
				//max-height: 720
				if (window.innerHeight >= 876) {
					//748 + navBars height *2 (2*44) + textContainer minimum top * 2 (2*20)
					h = 748;
					top = (window.innerHeight - 748 - 88) / 2;
					textContainer.style.top = top - 15 + 'px';
					tocLargeDevice.style.marginTop = top - 15 + 'px';
					bookNavBarBottom.style.marginTop = top - 15 + 'px';
				} else {
					h = window.innerHeight - 88 - 40; //navBars height *2 (2*44) + textContainer top * 2 (2*20)
					textContainer.style.top = '15px';
					tocLargeDevice.style.marginTop = '15px';
					bookNavBarBottom.style.marginTop = '15px';
				}
				w = 550;
				fontSize = 15;
			} else {
				h = window.innerHeight;
				w = window.innerWidth;
				fontSize = 14;
				textContainer.style.top = '0px';
			}

			if (window.innerWidth >= 1366) {
				//Toc-large height
				bookContainer.querySelector("#toc-large-device div").style.maxHeight = h - 30 + "px";
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
			if (event.which === 39 || event.which === 34) {
				book.forward();
			} else if (event.which === 37 || event.which === 33) {
				book.backward();
			} else if (event.which === 36) {
				book.toFirstPage();
			} else if (event.which === 35) {
				book.toLastPage();
			}
		}, false);

		//BUTTONS
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
		var openToc = bookContainer.querySelectorAll('.open-toc');

		for (var i = 0; i < openToc.length; i++) {
			openToc[i].addEventListener('click', function (event) {
				toc.className = toc.className === "open" ? "" : "open";
			}, false);
		}

		toc.querySelector("#close-toc").addEventListener('click', function () {
			toc.className = "";
		}, false);

		//Close toc on click
		var tocLinks = toc.querySelectorAll('a');
		for (var _i = 0; _i < tocLinks.length; _i++) {
			tocLinks[_i].addEventListener('click', function () {
				toc.className = "";
			}, false);
		}

		//TOC-LARGE-DEVICE
		var tocLarge = bookContainer.querySelector('#toc-large-device');
		var swingContainer = bookContainer.querySelector('#swing-container');
		var swingBar = bookContainer.querySelector('#swing-bar');
		//Toggle toc-large-device, swing-container, swing-bar
		bookContainer.querySelector('#toggle-toc-large-device').addEventListener('click', function (event) {
			if (!tocLarge.className.match(/open/)) {
				_utils2.default.addClass('#toc-large-device', 'open');
				_utils2.default.addClass('#swing-container', 'left');
				_utils2.default.addClass('#swing-bar', 'left');
			} else {
				_utils2.default.removeClass('#toc-large-device', 'open');
				_utils2.default.removeClass('#swing-container', 'left');
				_utils2.default.removeClass('#swing-bar', 'left');
			}
		}, false);

		//HOME LINK
		bookContainer.querySelector('#home').addEventListener('click', function (event) {
			event.preventDefault();
			var prevLocation = _dataStore2.default.getData('location').prevLocation;
			location.hash = prevLocation ? prevLocation : '#/';
		}, false);

		//end loader
		bookContainer.className = 'show';
	};

	//GET BOOK
	var books = _dataStore2.default.getData('books');
	var book = void 0;
	var loc = location.hash.replace(/(#|\/read)/g, '');
	for (var i = 0; i < books.length; i++) {
		if (books[i].path === loc) {
			book = books[i];
			break;
		}
	}

	//GET TEMPLATE ET PASS BOOK METADATA
	//pass metadata to nav-bar-top
	_utils2.default.bind(document.body, book);
	//insert template in container
	c.innerHTML = bookReadTemplate({ book: book });

	//BOOK CONTAINER
	var bookContainer = document.querySelector('#bookContainer');

	//GET TEXT CONTENT
	var textContainer = bookContainer.querySelector('[data-wb-text-container]');
	var tocLargeDevice = bookContainer.querySelector('#toc-large-device');
	var bookNavBarBottom = bookContainer.querySelector('#book-nav-bar-bottom');
	var text = bookContainer.querySelector('[data-wb-text]');
	var options = { method: 'GET', url: '/books' + book.path + '.html' };

	_utils2.default.ajax(options).then(function (content) {
		var div = document.createElement('div');
		div.innerHTML = content;
		text.appendChild(div);
		init();
	});
};

exports.default = book;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(21);

var _jquery2 = _interopRequireDefault(_jquery);

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
		this._lastBreak = document.createElement("div");
		this._lastBreak.className = "wb-text-break";
		this._text.appendChild(this._lastBreak);
		//this._lastElement is used as landmark
		this._lastElement = document.createElement("div");
		this._lastElement.innerHTML = "&nbsp;"; //not empty (for mozColumns)
		this._lastElement.className = "wb-section wb-no-toc";
		this._lastElement.id = "last";
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
		//elements : select all elements but .text-breaks (for bookmarks)
		this._elements = this._text.querySelectorAll(':not(.wb-text-break)');
		this._elements_all = this._text.querySelectorAll('*');
		//toc
		this._tocs = this._bookContainer.querySelectorAll('[data-wb-toc]');
		//setToc before querying this.elPageNumbers
		this.getToc();
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

				this.col = true;
				var cs = this._textContainer.style;
				var ts = this._text.style;
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
					this._lastElement.style.width = "0px";
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

				//Go to bookmark
				if (this._bookmark) {
					this.goToBookmark();
					this._position = Math.round((0, _jquery2.default)(this._text).position().left);
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
			var cs = this._container.style;
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
				ts.webkitColumns = "auto 1";
				ts.mozColumns = "auto 1";
				ts.columns = "auto 1";
			}

			//Sections (for mozColumns)
			for (var i = 0; i < this._sections.length; i++) {
				this._sections[i].style.minHeight = "0";
			}
			//manual breaks
			for (var _i2 = 0; _i2 < this._breaks.length; _i2++) {
				this._breaks[_i2].style.marginBottom = "0";
			}
			//last element
			this._lastElement.style.marginBottom = "0px";

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
			var _this = this;

			var links = this._bookContainer.querySelectorAll('.wb-link');
			for (var i = 0; i < links.length; i++) {
				links[i].addEventListener('click', function (e) {
					if (_this.col === true) {
						e.preventDefault();
						var href = e.currentTarget.getAttribute('href');
						var id = href.replace(/^#/, "");
						_this.goToPage(_this.elementPageNumber(id));
					}
				}, false);
			}
		}
	}, {
		key: 'forward',
		value: function forward() {
			if (Math.round((0, _jquery2.default)(this._lastElement).position().left) + this._position > this._containerWidth + this.getMarginX()) {
				this._position = Math.round((0, _jquery2.default)(this._text).position().left);
				this._position -= this._containerWidth;
				this._text.style.left = this._position + "px";
				this.refresh();
			}
		}
	}, {
		key: 'backward',
		value: function backward() {
			if (this._position < 0) {
				this._position = Math.round((0, _jquery2.default)(this._text).position().left);
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
			if (Math.round((0, _jquery2.default)(this._lastElement).position().left) + this._position > this._containerWidth + this.getMarginX()) {
				this._position = this._containerWidth + this.getMarginX() - Math.round((0, _jquery2.default)(this._lastElement).position().left);
				this._text.style.left = this._position + "px";
				this.refresh();
			}
		}
	}, {
		key: 'getPageStart',
		value: function getPageStart() {
			var index = void 0,
			    startIndex = void 0;
			for (var i = 0; i < this._sections.length - 1; i++) {
				if (this._sections[i].className.match(/wb-no-page/)) {
					index = i;
				} else {
					if (index !== undefined && startIndex === undefined) {
						startIndex = i;
						var el = this._sections[startIndex];
						var elPosition = Math.round((0, _jquery2.default)(el).position().left) - this.getMarginX();
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
			var totalPages = Math.floor(Math.round((0, _jquery2.default)(this._lastElement).position().left) / this._containerWidth);
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
			this._position = Math.round((0, _jquery2.default)(this._text).position().left);
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
			var elPosition = Math.round((0, _jquery2.default)(el).offset().left - (0, _jquery2.default)(this._text).offset().left) - this.getMarginX();
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
		key: 'getToc',
		value: function getToc() {
			if (this._tocs.length === 0) {
				return;
			}

			for (var i = 0; i < this._tocs.length; i++) {
				var toc = this._tocs[i];
				if (toc.getAttribute('data-wb-toc')) {
					var tocTitle = document.createElement('p');
					tocTitle.setAttribute('class', 'wb-toc-title');
					tocTitle.innerHTML = toc.getAttribute('data-wb-toc');
					toc.appendChild(tocTitle);
				}
				var list = document.createElement('ul');
				list.setAttribute('class', 'wb-toc-list');
				for (var j = 0; j < this._sections.length; j++) {
					var section = this._sections[j];
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
				toc.appendChild(list);
			}
		}
	}, {
		key: 'getTocCurrentSection',
		value: function getTocCurrentSection() {
			var position = -this._position;
			this._tocSections.push(this._lastElement);
			if (this._sections[0].className.match(/wb-no-toc/)) {
				this._tocSections.unshift(this._sections[0]);
			}
			for (var i = 0; i < this._tocs.length; i++) {
				var toc = this._tocs[i];
				for (var _i3 = 1; _i3 < this._tocSections.length; _i3++) {
					if (Math.round((0, _jquery2.default)(this._tocSections[_i3]).position().left) - this._containerWidth >= position) {
						var id = this._tocSections[_i3 - 1].id;
						var links = toc.querySelectorAll('a');
						for (var j = 0; j < links.length; j++) {
							var link = links[j];
							if (link.getAttribute('href').replace(/^#/, '') === id) {
								if (!link.parentElement.className.match(/current/)) {
									link.parentElement.className += ' current';
								}
							} else {
								if (link.parentElement.className.match(/current/)) {
									link.parentElement.className = link.parentElement.className.replace(/ current/, '');
								}
							}
						}

						break;
					}
				}
			}
			this._tocSections.pop(this._lastElement);
			if (this._sections[0].className.match(/wb-no-toc/)) {
				this._tocSections.shift(this._sections[0]);
			}
		}
	}, {
		key: 'insertBookmark',
		value: function insertBookmark() {
			var elPosition = void 0;
			var position = Math.abs(this._position);
			for (var i = 0; i < this._elements_all.length; i++) {

				var _elPosition = Math.round((0, _jquery2.default)(this._elements_all[i]).position().left) - this.getMarginX();
				_elPosition = _elPosition % this._containerWidth !== 0 ? _elPosition - _elPosition % this._containerWidth : _elPosition; //always at a page beginning
				if (_elPosition === position) {
					this._bookmark = i;
					break;
				} else if (_elPosition > position) {
					this._bookmark = i - 1;
					break;
				}
			}
		}
	}, {
		key: 'goToBookmark',
		value: function goToBookmark() {
			var element = this._elements_all[this._bookmark];
			//position : offsetLeft of element relative to text
			var position = Math.round((0, _jquery2.default)(element).position().left) - this.getMarginX();
			position = position % this._containerWidth !== 0 ? position - position % this._containerWidth : position; //always at a page beginning
			//text position = -position
			this._text.style.left = -position + "px";
			this._position = Math.round((0, _jquery2.default)(this._text).position().left);
			this.refresh();
		}
	}, {
		key: 'refresh',
		value: function refresh() {
			this.insertBookmark();

			if (this.col === false) {

				for (var i = 0; i < this._currentPages.length; i++) {
					this._currentPages[i].innerHTML = "";
				}

				for (var _i4 = 0; _i4 < this._totalPages.length; _i4++) {
					this._totalPages[_i4].innerHTML = "";
				}

				for (var _i5 = 0; _i5 < this._currentTotalPages.length; _i5++) {
					this._currentTotalPages[_i5].innerHTML = "";
				}

				for (var _i6 = 0; _i6 < this._elPageNumbers.length; _i6++) {
					this._elPageNumbers[_i6].innerHTML = "";
				}

				for (var _i7 = 0; _i7 < this._sectionTitles.length; _i7++) {
					this._sectionTitles[_i7].innerHTML = "";
				}
			} else {

				this.getPageStart();

				if (this._tocs.length !== 0) {
					this.getTocCurrentSection();
				}

				for (var _i8 = 0; _i8 < this._currentPages.length; _i8++) {
					if (this._currentPages[_i8].innerHTML != this.getPageNumber()) {
						this._currentPages[_i8].innerHTML = this.getPageNumber();
					}
				}

				for (var _i9 = 0; _i9 < this._totalPages.length; _i9++) {
					if (this._totalPages[_i9].innerHTML != this.getPageNumber()) {
						this._totalPages[_i9].innerHTML = this.getPageNumber();
					}
				}

				for (var _i10 = 0; _i10 < this._currentTotalPages.length; _i10++) {
					if (this.getPageNumber() < 1) {
						this._currentTotalPages[_i10].innerHTML = "";
					} else if (this._currentTotalPages[_i10].innerHTML !== this.getPageNumber() + "/" + this.getTotalPages()) {
						this._currentTotalPages[_i10].innerHTML = this.getPageNumber() + "/" + this.getTotalPages();
					}
				}

				for (var _i11 = 0; _i11 < this._elPageNumbers.length; _i11++) {
					var id = this._elPageNumbers[_i11].getAttribute('data-wb-element-page-number');
					var pageNumber = this.elementPageNumber(id);
					if (pageNumber < 1) {
						this._elPageNumbers[_i11].innerHTML = "";
					} else if (this._elPageNumbers[_i11].innerHTML != pageNumber) {
						this._elPageNumbers[_i11].innerHTML = pageNumber;
					}
				}

				for (var _i12 = 0; _i12 < this._sectionTitles.length; _i12++) {
					if (this._sectionTitles[_i12].innerHTML != this.getSectionTitle()) {
						this._sectionTitles[_i12].innerHTML = this.getSectionTitle();
					}
				}
			}
		}
	}]);

	return WebBook;
}();

exports.default = WebBook;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
(function (global, factory) {

	"use strict";

	if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("jQuery requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";

	var arr = [];

	var document = window.document;

	var getProto = Object.getPrototypeOf;

	var _slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call(Object);

	var support = {};

	function DOMEval(code, doc) {
		doc = doc || document;

		var script = doc.createElement("script");

		script.text = code;
		doc.head.appendChild(script).parentNode.removeChild(script);
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module


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
	var Sizzle =
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
	function (window) {

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

		return Sizzle;
	}(window);

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;

	var dir = function dir(elem, _dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[_dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};

	var _siblings = function _siblings(n, elem) {
		var matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}

		return matched;
	};

	var rneedsContext = jQuery.expr.match.needsContext;

	function nodeName(elem, name) {

		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	};
	var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

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

	// Initialize a jQuery object


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

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

	jQuery.fn.extend({
		has: function has(target) {
			var targets = jQuery(target, this),
			    l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function closest(selectors, context) {
			var cur,
			    i = 0,
			    l = this.length,
			    matched = [],
			    targets = typeof selectors !== "string" && jQuery(selectors);

			// Positional selectors never match, since there's no _selection_ context
			if (!rneedsContext.test(selectors)) {
				for (; i < l; i++) {
					for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

						// Always skip document fragments
						if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

							matched.push(cur);
							break;
						}
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function index(elem) {

			// No argument, return index in parent
			if (!elem) {
				return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem);
		},

		add: function add(selector, context) {
			return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
		},

		addBack: function addBack(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent: function parent(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function parents(elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function parentsUntil(elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function next(elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function prev(elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function nextAll(elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function prevAll(elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function nextUntil(elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function prevUntil(elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function siblings(elem) {
			return _siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function children(elem) {
			return _siblings(elem.firstChild);
		},
		contents: function contents(elem) {
			if (nodeName(elem, "iframe")) {
				return elem.contentDocument;
			}

			// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
			// Treat the template element as a regular one in browsers that
			// don't support it.
			if (nodeName(elem, "template")) {
				elem = elem.content || elem;
			}

			return jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

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
			    resolveValues = _slice.call(arguments),


			// the master Deferred
			master = jQuery.Deferred(),


			// subordinate callback factory
			updateFunc = function updateFunc(i) {
				return function (value) {
					resolveContexts[i] = this;
					resolveValues[i] = arguments.length > 1 ? _slice.call(arguments) : value;
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

	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function (error, stack) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
			window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
		}
	};

	jQuery.readyException = function (error) {
		window.setTimeout(function () {
			throw error;
		});
	};

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
	var acceptData = function acceptData(owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function cache(owner) {

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value: value,
							configurable: true
						});
					}
				}
			}

			return value;
		},
		set: function set(owner, data, value) {
			var prop,
			    cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if (typeof data === "string") {
				cache[jQuery.camelCase(data)] = value;

				// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[jQuery.camelCase(prop)] = data[prop];
				}
			}
			return cache;
		},
		get: function get(owner, key) {
			return key === undefined ? this.cache(owner) :

			// Always use camelCase key (gh-2257)
			owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
		},
		access: function access(owner, key, value) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined || key && typeof key === "string" && value === undefined) {

				return this.get(owner, key);
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function remove(owner, key) {
			var i,
			    cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key !== undefined) {

				// Support array or space separated string of keys
				if (Array.isArray(key)) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map(jQuery.camelCase);
				} else {
					key = jQuery.camelCase(key);

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
				}

				i = key.length;

				while (i--) {
					delete cache[key[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function hasData(owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function getData(data) {
		if (data === "true") {
			return true;
		}

		if (data === "false") {
			return false;
		}

		if (data === "null") {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if (data === +data + "") {
			return +data;
		}

		if (rbrace.test(data)) {
			return JSON.parse(data);
		}

		return data;
	}

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = getData(data);
				} catch (e) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function hasData(elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function data(elem, name, _data) {
			return dataUser.access(elem, name, _data);
		},

		removeData: function removeData(elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function _data(elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function _removeData(elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function data(key, value) {
			var i,
			    name,
			    data,
			    elem = this[0],
			    attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get(elem, key);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, key);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function () {

					// We always store the camelCased key
					dataUser.set(this, key, value);
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function removeData(key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});

	jQuery.extend({
		queue: function queue(elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || Array.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function dequeue(elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
			    startLength = queue.length,
			    fn = queue.shift(),
			    hooks = jQuery._queueHooks(elem, type),
			    next = function next() {
				jQuery.dequeue(elem, type);
			};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function _queueHooks(elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function () {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function queue(type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ? this : this.each(function () {
				var queue = jQuery.queue(this, type, data);

				// Ensure a hooks for this queue
				jQuery._queueHooks(this, type);

				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type);
				}
			});
		},
		dequeue: function dequeue(type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function clearQueue(type) {
			return this.queue(type || "fx", []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function promise(type, obj) {
			var tmp,
			    count = 1,
			    defer = jQuery.Deferred(),
			    elements = this,
			    i = this.length,
			    resolve = function resolve() {
				if (! --count) {
					defer.resolveWith(elements, [elements]);
				}
			};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHiddenWithinTree = function isHiddenWithinTree(elem, el) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" || elem.style.display === "" &&

		// Otherwise, check computed style
		// Support: Firefox <=43 - 45
		// Disconnected elements can have computed display: none, so first confirm that elem is
		// in the document.
		jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
	};

	var swap = function swap(elem, options, callback, args) {
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

	var defaultDisplayMap = {};

	function getDefaultDisplay(elem) {
		var temp,
		    doc = elem.ownerDocument,
		    nodeName = elem.nodeName,
		    display = defaultDisplayMap[nodeName];

		if (display) {
			return display;
		}

		temp = doc.body.appendChild(doc.createElement(nodeName));
		display = jQuery.css(temp, "display");

		temp.parentNode.removeChild(temp);

		if (display === "none") {
			display = "block";
		}
		defaultDisplayMap[nodeName] = display;

		return display;
	}

	function showHide(elements, show) {
		var display,
		    elem,
		    values = [],
		    index = 0,
		    length = elements.length;

		// Determine new display value for elements that need to change
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}

			display = elem.style.display;
			if (show) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if (display === "none") {
					values[index] = dataPriv.get(elem, "display") || null;
					if (!values[index]) {
						elem.style.display = "";
					}
				}
				if (elem.style.display === "" && isHiddenWithinTree(elem)) {
					values[index] = getDefaultDisplay(elem);
				}
			} else {
				if (display !== "none") {
					values[index] = "none";

					// Remember what we're overwriting
					dataPriv.set(elem, "display", display);
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for (index = 0; index < length; index++) {
			if (values[index] != null) {
				elements[index].style.display = values[index];
			}
		}

		return elements;
	}

	jQuery.fn.extend({
		show: function show() {
			return showHide(this, true);
		},
		hide: function hide() {
			return showHide(this);
		},
		toggle: function toggle(state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHiddenWithinTree(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});
	var rcheckableType = /^(?:checkbox|radio)$/i;

	var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;

	var rscriptType = /^$|\/(?:java|ecma)script/i;

	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE <=9 only
		option: [1, "<select multiple='multiple'>", "</select>"],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		_default: [0, "", ""]
	};

	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;

		if (typeof context.getElementsByTagName !== "undefined") {
			ret = context.getElementsByTagName(tag || "*");
		} else if (typeof context.querySelectorAll !== "undefined") {
			ret = context.querySelectorAll(tag || "*");
		} else {
			ret = [];
		}

		if (tag === undefined || tag && nodeName(context, tag)) {
			return jQuery.merge([context], ret);
		}

		return ret;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
		}
	}

	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem,
		    tmp,
		    tag,
		    wrap,
		    contains,
		    j,
		    fragment = context.createDocumentFragment(),
		    nodes = [],
		    i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (jQuery.type(elem) === "object") {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem));

					// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild(context.createElement("div"));

					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, tmp.childNodes);

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while (elem = nodes[i++]) {

			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while (elem = tmp[j++]) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		return fragment;
	}

	(function () {
		var fragment = document.createDocumentFragment(),
		    div = fragment.appendChild(document.createElement("div")),
		    input = document.createElement("input");

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();
	var documentElement = document.documentElement;

	var rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function _on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				_on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function fn(event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
  * Helper functions for managing events -- not part of the public interface.
  * Props to Dean Edwards' addEvent library for many of the ideas.
  */
	jQuery.event = {

		global: {},

		add: function add(elem, types, handler, data, selector) {

			var handleObjIn,
			    eventHandle,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if (selector) {
				jQuery.find.matchesSelector(documentElement, selector);
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function remove(elem, types, handler, selector, mappedTypes) {

			var j,
			    origCount,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function dispatch(nativeEvent) {

			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix(nativeEvent);

			var i,
			    j,
			    ret,
			    matched,
			    handleObj,
			    handlerQueue,
			    args = new Array(arguments.length),
			    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
			    special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;

			for (i = 1; i < arguments.length; i++) {
				args[i] = arguments[i];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function handlers(event, _handlers) {
			var i,
			    handleObj,
			    sel,
			    matchedHandlers,
			    matchedSelectors,
			    handlerQueue = [],
			    delegateCount = _handlers.delegateCount,
			    cur = event.target;

			// Find delegate handlers
			if (delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!(event.type === "click" && event.button >= 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
						matchedHandlers = [];
						matchedSelectors = {};
						for (i = 0; i < delegateCount; i++) {
							handleObj = _handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matchedSelectors[sel] === undefined) {
								matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
							}
							if (matchedSelectors[sel]) {
								matchedHandlers.push(handleObj);
							}
						}
						if (matchedHandlers.length) {
							handlerQueue.push({ elem: cur, handlers: matchedHandlers });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if (delegateCount < _handlers.length) {
				handlerQueue.push({ elem: cur, handlers: _handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		addProp: function addProp(name, hook) {
			Object.defineProperty(jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: jQuery.isFunction(hook) ? function () {
					if (this.originalEvent) {
						return hook(this.originalEvent);
					}
				} : function () {
					if (this.originalEvent) {
						return this.originalEvent[name];
					}
				},

				set: function set(value) {
					Object.defineProperty(this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					});
				}
			});
		},

		fix: function fix(originalEvent) {
			return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function trigger() {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function trigger() {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function trigger() {
					if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function _default(event) {
					return nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function postDispatch(event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

			// Support: Android <=2.3 only
			src.returnValue === false ? returnTrue : returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function preventDefault() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation: function stopPropagation() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function stopImmediatePropagation() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each({
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function which(event) {
			var button = event.button;

			// Add which for key events
			if (event.which == null && rkeyEvent.test(event.type)) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
				if (button & 1) {
					return 1;
				}

				if (button & 2) {
					return 3;
				}

				if (button & 4) {
					return 2;
				}

				return 0;
			}

			return event.which;
		}
	}, jQuery.event.addProp);

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function handle(event) {
				var ret,
				    target = this,
				    related = event.relatedTarget,
				    handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({

		on: function on(types, selector, data, fn) {
			return _on(this, types, selector, data, fn);
		},
		one: function one(types, selector, data, fn) {
			return _on(this, types, selector, data, fn, 1);
		},
		off: function off(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this;
			}
			if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});

	var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,


	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,


	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rscriptTypeMasked = /^true\/(.*)/,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget(elem, content) {
		if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

			return jQuery(">tbody", elem)[0] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);

		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment,
		    first,
		    scripts,
		    hasScripts,
		    node,
		    doc,
		    i = 0,
		    l = collection.length,
		    iNoClone = l - 1,
		    value = args[0],
		    isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src) {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								DOMEval(node.textContent.replace(rcleanScript, ""), doc);
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function _remove(elem, selector, keepData) {
		var node,
		    nodes = selector ? jQuery.filter(selector, elem) : elem,
		    i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function htmlPrefilter(html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
			var i,
			    l,
			    srcElements,
			    destElements,
			    clone = elem.cloneNode(true),
			    inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function cleanData(elems) {
			var data,
			    elem,
			    type,
			    special = jQuery.event.special,
			    i = 0;

			for (; (elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if (data = elem[dataPriv.expando]) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({
		detach: function detach(selector) {
			return _remove(this, selector, true);
		},

		remove: function remove(selector) {
			return _remove(this, selector);
		},

		text: function text(value) {
			return access(this, function (value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
			}, null, value, arguments.length);
		},

		append: function append() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function prepend() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function before() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function after() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function empty() {
			var elem,
			    i = 0;

			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function clone(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function html(value) {
			return access(this, function (value) {
				var elem = this[0] || {},
				    i = 0,
				    l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function replaceWith() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
			    ret = [],
			    insert = jQuery(selector),
			    last = insert.length - 1,
			    i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});
	var rmargin = /^margin/;

	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function getStyles(elem) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};

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

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function init(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function cur() {
			var hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
		},
		run: function run(percent) {
			var eased,
			    hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function get(tween) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function set(tween) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function set(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function linear(p) {
			return p;
		},
		swing: function swing(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};

	var fxNow,
	    inProgress,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rrun = /queueHooks$/;

	function schedule() {
		if (inProgress) {
			if (document.hidden === false && window.requestAnimationFrame) {
				window.requestAnimationFrame(schedule);
			} else {
				window.setTimeout(schedule, jQuery.fx.interval);
			}

			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return fxNow = jQuery.now();
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
		    i = 0,
		    attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
		    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
		    index = 0,
		    length = collection.length;
		for (; index < length; index++) {
			if (tween = collection[index].call(animation, prop, value)) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		var prop,
		    value,
		    toggle,
		    hooks,
		    oldfire,
		    propTween,
		    restoreDisplay,
		    display,
		    isBox = "width" in props || "height" in props,
		    anim = this,
		    orig = {},
		    style = elem.style,
		    hidden = elem.nodeType && isHiddenWithinTree(elem),
		    dataShow = dataPriv.get(elem, "fxshow");

		// Queue-skipping animations hijack the fx hooks
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Detect show/hide animations
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.test(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;

						// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject(props);
		if (!propTween && jQuery.isEmptyObject(orig)) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if (isBox && elem.nodeType === 1) {

			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if (restoreDisplay == null) {
				restoreDisplay = dataPriv.get(elem, "display");
			}
			display = jQuery.css(elem, "display");
			if (display === "none") {
				if (restoreDisplay) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide([elem], true);
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css(elem, "display");
					showHide([elem]);
				}
			}

			// Animate inline elements as inline-block
			if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
				if (jQuery.css(elem, "float") === "none") {

					// Restore the original display value at the end of pure show/hide animations
					if (!propTween) {
						anim.done(function () {
							style.display = restoreDisplay;
						});
						if (restoreDisplay == null) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// Implement show/hide animations
		propTween = false;
		for (prop in orig) {

			// General show/hide setup for this element animation
			if (!propTween) {
				if (dataShow) {
					if ("hidden" in dataShow) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if (toggle) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if (hidden) {
					showHide([elem], true);
				}

				/* eslint-disable no-loop-func */

				anim.done(function () {

					/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if (!hidden) {
						showHide([elem]);
					}
					dataPriv.remove(elem, "fxshow");
					for (prop in orig) {
						jQuery.style(elem, prop, orig[prop]);
					}
				});
			}

			// Per-property setup
			propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
			if (!(prop in dataShow)) {
				dataShow[prop] = propTween.start;
				if (hidden) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (Array.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
		    stopped,
		    index = 0,
		    length = Animation.prefilters.length,
		    deferred = jQuery.Deferred().always(function () {

			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		    tick = function tick() {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
			    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


			// Support: Android 2.3 only
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			temp = remaining / animation.duration || 0,
			    percent = 1 - temp,
			    index = 0,
			    length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			// If there's more to do, yield
			if (percent < 1 && length) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if (!length) {
				deferred.notifyWith(elem, [animation, 1, 0]);
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith(elem, [animation]);
			return false;
		},
		    animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function createTween(prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function stop(gotoEnd) {
				var index = 0,


				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(elem, [animation, 1, 0]);
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		    props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		// Attach callbacks from options
		animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);

		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));

		return animation;
	}

	jQuery.Animation = jQuery.extend(Animation, {

		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function tweener(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnothtmlwhite);
			}

			var prop,
			    index = 0,
			    length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function prefilter(callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		// Go to the end state if fx are off
		if (jQuery.fx.off) {
			opt.duration = 0;
		} else {
			if (typeof opt.duration !== "number") {
				if (opt.duration in jQuery.fx.speeds) {
					opt.duration = jQuery.fx.speeds[opt.duration];
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function fadeTo(speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHiddenWithinTree).css("opacity", 0).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
		},
		animate: function animate(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
			    optall = jQuery.speed(speed, easing, callback),
			    doAnimation = function doAnimation() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, "finish")) {
					anim.stop(true);
				}
			};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function stop(type, clearQueue, gotoEnd) {
			var stopQueue = function stopQueue(hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
				    index = type != null && type + "queueHooks",
				    timers = jQuery.timers,
				    data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function finish(type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
				    data = dataPriv.get(this),
				    queue = data[type + "queue"],
				    hooks = data[type + "queueHooks"],
				    timers = jQuery.timers,
				    length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
		    i = 0,
		    timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Run the timer and safely remove it when done (allowing for external removal)
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		jQuery.fx.start();
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (inProgress) {
			return;
		}

		inProgress = true;
		schedule();
	};

	jQuery.fx.stop = function () {
		inProgress = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};

	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function (next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};

	(function () {
		var input = document.createElement("input"),
		    select = document.createElement("select"),
		    opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();

	var boolHook,
	    attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function attr(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function removeAttr(name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function attr(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function set(elem, value) {
					if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function removeAttr(elem, value) {
			var name,
			    i = 0,


			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match(rnothtmlwhite);

			if (attrNames && elem.nodeType === 1) {
				while (name = attrNames[i++]) {
					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function set(elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};

	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret,
			    handle,
			    lowercaseName = name.toLowerCase();

			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[lowercaseName];
				attrHandle[lowercaseName] = ret;
				ret = getter(elem, name, isXML) != null ? lowercaseName : null;
				attrHandle[lowercaseName] = handle;
			}
			return ret;
		};
	});

	var rfocusable = /^(?:input|select|textarea|button)$/i,
	    rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function prop(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function removeProp(name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function prop(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return elem[name] = value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function get(elem) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					if (tabindex) {
						return parseInt(tabindex, 10);
					}

					if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function get(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function set(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});

	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse(value) {
		var tokens = value.match(rnothtmlwhite) || [];
		return tokens.join(" ");
	}

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	jQuery.fn.extend({
		addClass: function addClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnothtmlwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass: function removeClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (!arguments.length) {
				return this.attr("class", "");
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnothtmlwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {

							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass: function toggleClass(value, stateVal) {
			var type = typeof value === "undefined" ? "undefined" : _typeof(value);

			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
				});
			}

			return this.each(function () {
				var className, i, self, classNames;

				if (type === "string") {

					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = value.match(rnothtmlwhite) || [];

					while (className = classNames[i++]) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
					className = getClass(this);
					if (className) {

						// Store className if set
						dataPriv.set(this, "__className__", className);
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if (this.setAttribute) {
						this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
					}
				}
			});
		},

		hasClass: function hasClass(selector) {
			var className,
			    elem,
			    i = 0;

			className = " " + selector + " ";
			while (elem = this[i++]) {
				if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
					return true;
				}
			}

			return false;
		}
	});

	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function val(value) {
			var hooks,
			    ret,
			    isFunction,
			    elem = this[0];

			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret;
					}

					ret = elem.value;

					// Handle most common string cases
					if (typeof ret === "string") {
						return ret.replace(rreturn, "");
					}

					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function (i) {
				var val;

				if (this.nodeType !== 1) {
					return;
				}

				if (isFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (Array.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function get(elem) {

					var val = jQuery.find.attr(elem, "value");
					return val != null ? val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse(jQuery.text(elem));
				}
			},
			select: {
				get: function get(elem) {
					var value,
					    option,
					    i,
					    options = elem.options,
					    index = elem.selectedIndex,
					    one = elem.type === "select-one",
					    values = one ? null : [],
					    max = one ? index + 1 : options.length;

					if (index < 0) {
						i = max;
					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) &&

						// Don't return options that are disabled or in a disabled optgroup
						!option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function set(elem, value) {
					var optionSet,
					    option,
					    options = elem.options,
					    values = jQuery.makeArray(value),
					    i = options.length;

					while (i--) {
						option = options[i];

						/* eslint-disable no-cond-assign */

						if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function set(elem, value) {
				if (Array.isArray(value)) {
					return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});

	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger: function trigger(event, data, elem, onlyHandlers) {

			var i,
			    cur,
			    tmp,
			    bubbleType,
			    ontype,
			    handle,
			    special,
			    eventPath = [elem || document],
			    type = hasOwn.call(event, "type") ? event.type : event,
			    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] : jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

				event.type = i > 1 ? bubbleType : special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function simulate(type, elem, event) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true
			});

			jQuery.event.trigger(e, null, elem);
		}

	});

	jQuery.fn.extend({

		trigger: function trigger(type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function triggerHandler(type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});

	jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover: function hover(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});

	support.focusin = "onfocusin" in window;

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function handler(event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup: function setup() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function teardown() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = /\?/;

	// Cross-browser xml parsing
	jQuery.parseXML = function (data) {
		var xml;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = new window.DOMParser().parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};

	var rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	    rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (Array.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);
				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
		    s = [],
		    add = function add(key, valueOrFunction) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;

			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
		};

		// If an array was passed in, assume that it is an array of form elements.
		if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&");
	};

	jQuery.fn.extend({
		serialize: function serialize() {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function serializeArray() {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function () {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
			}).map(function (i, elem) {
				var val = jQuery(this).val();

				if (val == null) {
					return null;
				}

				if (Array.isArray(val)) {
					return jQuery.map(val, function (val) {
						return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
					});
				}

				return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});

	var r20 = /%20/g,
	    rhash = /#.*$/,
	    rantiCache = /([?&])_=[^&]*/,
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	    rnoContent = /^(?:GET|HEAD)$/,
	    rprotocol = /^\/\//,


	/* Prefilters
  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  * 2) These are called:
  *    - BEFORE asking for a transport
  *    - AFTER param serialization (s.data is a string if s.processData is true)
  * 3) key is the dataType
  * 4) the catchall symbol "*" can be used
  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  */
	prefilters = {},


	/* Transports bindings
  * 1) key is the dataType
  * 2) the catchall symbol "*" can be used
  * 3) selection will start with transport dataType and THEN go to "*" if needed
  */
	transports = {},


	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*"),


	// Anchor tag for parsing the document origin
	originAnchor = document.createElement("a");
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {

		// dataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {

			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
			    i = 0,
			    dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

			if (jQuery.isFunction(func)) {

				// For each dataType in the dataTypeExpression
				while (dataType = dataTypes[i++]) {

					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

		var inspected = {},
		    seekingTransport = structure === transports;

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key,
		    deep,
		    flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
  * - finds the right dataType (mediates between content-type and expected dataType)
  * - returns the corresponding response
  */
	function ajaxHandleResponses(s, jqXHR, responses) {

		var ct,
		    type,
		    finalDataType,
		    firstDataType,
		    contents = s.contents,
		    dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {

			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
  * Also sets the responseXXX fields on the jqXHR instance
  */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2,
		    current,
		    conv,
		    tmp,
		    prev,
		    converters = {},


		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {

			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current) {

				// There's only work to do if current dataType is non-auto
				if (current === "*") {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {

					// Seek a direct converter
					conv = converters[prev + " " + current] || converters["* " + current];

					// If none found, seek a pair
					if (!conv) {
						for (conv2 in converters) {

							// If conv2 outputs current
							tmp = conv2.split(" ");
							if (tmp[1] === current) {

								// If prev can be converted to accepted input
								conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
								if (conv) {

									// Condense equivalence converters
									if (conv === true) {
										conv = converters[conv2];

										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if (conv !== true) {

						// Unless errors are allowed to bubble, catch and return them
						if (conv && s.throws) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
   timeout: 0,
   data: null,
   dataType: null,
   username: null,
   password: null,
   cache: null,
   throws: false,
   traditional: false,
   headers: {},
   */

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function ajaxSetup(target, settings) {
			return settings ?

			// Building a settings object
			ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

			// Extending ajaxSettings
			ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function ajax(url, options) {

			// If url is an object, simulate pre-1.5 signature
			if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,


			// URL without anti-cache param
			cacheURL,


			// Response headers
			responseHeadersString,
			    responseHeaders,


			// timeout handle
			timeoutTimer,


			// Url cleanup var
			urlAnchor,


			// Request state (becomes false upon send and true upon completion)
			completed,


			// To know if global events are to be dispatched
			fireGlobals,


			// Loop variable
			i,


			// uncached part of the url
			uncached,


			// Create the final options object
			s = jQuery.ajaxSetup({}, options),


			// Callbacks context
			callbackContext = s.context || s,


			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


			// Deferreds
			deferred = jQuery.Deferred(),
			    completeDeferred = jQuery.Callbacks("once memory"),


			// Status-dependent callbacks
			_statusCode = s.statusCode || {},


			// Headers (they are sent all at once)
			requestHeaders = {},
			    requestHeadersNames = {},


			// Default abort message
			strAbort = "canceled",


			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function getResponseHeader(key) {
					var match;
					if (completed) {
						if (!responseHeaders) {
							responseHeaders = {};
							while (match = rheaders.exec(responseHeadersString)) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}
						match = responseHeaders[key.toLowerCase()];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function getAllResponseHeaders() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function setRequestHeader(name, value) {
					if (completed == null) {
						name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
						requestHeaders[name] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function overrideMimeType(type) {
					if (completed == null) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function statusCode(map) {
					var code;
					if (map) {
						if (completed) {

							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for (code in map) {
								_statusCode[code] = [_statusCode[code], map[code]];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function abort(statusText) {
					var finalText = statusText || strAbort;
					if (transport) {
						transport.abort(finalText);
					}
					done(0, finalText);
					return this;
				}
			};

			// Attach deferreds
			deferred.promise(jqXHR);

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");

				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (completed) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace(rhash, "");

			// More options handling for requests with no content
			if (!s.hasContent) {

				// Remember the hash so we can put it back
				uncached = s.url.slice(cacheURL.length);

				// If data is available, append data to url
				if (s.data) {
					cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if (s.cache === false) {
					cacheURL = cacheURL.replace(rantiCache, "$1");
					uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

				// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
				s.data = s.data.replace(r20, "+");
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add(s.complete);
			jqXHR.done(s.success);
			jqXHR.fail(s.error);

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (completed) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try {
					completed = false;
					transport.send(requestHeaders, done);
				} catch (e) {

					// Rethrow post-completion exceptions
					if (completed) {
						throw e;
					}

					// Propagate others as results
					done(-1, e);
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess,
				    success,
				    error,
				    response,
				    modified,
				    statusText = nativeStatusText;

				// Ignore repeat invocations
				if (completed) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";

						// if not modified
					} else if (status === 304) {
						statusText = "notmodified";

						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(_statusCode);
				_statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

					// Handle the global AJAX counter
					if (! --jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function getJSON(url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function getScript(url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		});
	};

	jQuery.fn.extend({
		wrapAll: function wrapAll(html) {
			var wrap;

			if (this[0]) {
				if (jQuery.isFunction(html)) {
					html = html.call(this[0]);
				}

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					var elem = this;

					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append(this);
			}

			return this;
		},

		wrapInner: function wrapInner(html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				var self = jQuery(this),
				    contents = self.contents();

				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},

		wrap: function wrap(html) {
			var isFunction = jQuery.isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},

		unwrap: function unwrap(selector) {
			this.parent(selector).not("body").each(function () {
				jQuery(this).replaceWith(this.childNodes);
			});
			return this;
		}
	});

	jQuery.expr.pseudos.hidden = function (elem) {
		return !jQuery.expr.pseudos.visible(elem);
	};
	jQuery.expr.pseudos.visible = function (elem) {
		return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
	};

	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};

	var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	    xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function (options) {
		var _callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function send(headers, complete) {
					var i,
					    xhr = options.xhr();

					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					_callback = function callback(type) {
						return function () {
							if (_callback) {
								_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status, xhr.statusText);
									}
								} else {
									complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
								}
							}
						};
					};

					// Listen to events
					xhr.onload = _callback();
					errorCallback = xhr.onerror = _callback("error");

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function () {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function () {
									if (_callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					_callback = _callback("abort");

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (_callback) {
							throw e;
						}
					}
				},

				abort: function abort() {
					if (_callback) {
						_callback();
					}
				}
			};
		}
	});

	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter(function (s) {
		if (s.crossDomain) {
			s.contents.script = false;
		}
	});

	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function textScript(text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function (s) {

		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			var script, _callback2;
			return {
				send: function send(_, complete) {
					script = jQuery("<script>").prop({
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", _callback2 = function callback(evt) {
						script.remove();
						_callback2 = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type);
						}
					});

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function abort() {
					if (_callback2) {
						_callback2();
					}
				}
			};
		}
	});

	var oldCallbacks = [],
	    rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function jsonpCallback() {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

		var callbackName,
		    overwritten,
		    responseContainer,
		    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = "json";

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function () {

				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
					window[callbackName] = overwritten;
				}

				// Save back as free
				if (s[callbackName]) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});

	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = function () {
		var body = document.implementation.createHTMLDocument("").body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	}();

	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (typeof data !== "string") {
			return [];
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if (!context) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if (support.createHTMLDocument) {
				context = document.implementation.createHTMLDocument("");

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement("base");
				base.href = document.location.href;
				context.head.appendChild(base);
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec(data);
		scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};

	/**
  * Load a url into a page
  */
	jQuery.fn.load = function (url, params, callback) {
		var selector,
		    type,
		    response,
		    self = this,
		    off = url.indexOf(" ");

		if (off > -1) {
			selector = stripAndCollapse(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (jQuery.isFunction(params)) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function (responseText) {

				// Save response for use in complete callback
				response = arguments;

				self.html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function (jqXHR, status) {
				self.each(function () {
					callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}

		return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});

	jQuery.expr.pseudos.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};

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

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function (margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function (elem, type, value) {
					var doc;

					if (jQuery.isWindow(elem)) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}

					return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable);
			};
		});
	});

	jQuery.fn.extend({

		bind: function bind(types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function unbind(types, fn) {
			return this.off(types, null, fn);
		},

		delegate: function delegate(selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function undelegate(selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		}
	});

	jQuery.holdReady = function (hold) {
		if (hold) {
			jQuery.readyWait++;
		} else {
			jQuery.ready(true);
		}
	};
	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,


	// Map over the $ in case of overwrite
	_$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)(module)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/*\nBOOK NAVBAR BOTTOM\n*/\n#book-nav-bar-bottom {\n\tdisplay: none;\n\theight: 44px;\n\tposition: relative;\n}\n\n@media screen and (min-width: 768px) {\n\t#book-nav-bar-bottom {\n\t\tdisplay: block;\n\t}\n}\n\n#book-nav-bar-bottom-controls {\n\tdisplay: block;\n\tposition: relative;\n\twidth: 550px;\n\tmargin: auto;\n\theight: 44px;\n\ttext-align: center;\n}\n\n#nav-bar-bottom-controls > span {\n\toutline: none;\n\theight: 100%;\n\tbackground-color: transparent;\n}\n\n#book-nav-bar-bottom-controls #open-toc-large span {\n\tdisplay: inline-block;\n\tpadding-bottom: 10px;\n}\n\n/*\nBOOKCONTAINER\n*/\n#bookContainer {\n\tposition: relative;\n\tcolor: #000;\n\topacity: 0.0;\n\tmargin: auto;\n\ttransition: opacity 0.8s;\n\t-webkit-transition: opacity 0.8s;\n\t-moz-transition: opacity 0.8s;\n\t-o-transition: opacity 0.8s;\n}\n\n#bookContainer.show {\n\topacity: 1.0;\n}\n\n/*\nTEXTCONTAINER\n*/\n[data-wb-text-container] {\n\tmargin: auto;\n\tbackground-color: #fafafa;\n}\n\n/*\nTOC-LARGE-DEVICE\n*/\n\n#toc-large-device {\n  position: absolute;\n  left: -33%;\n  width: 33%;\n  transition: left 0.4s;\n  -webkit-transition : left 0.4s;\n  -moz-transition : left 0.4s;\n  -o-transition: left 0.4s;\n  display: none;\n}\n\n@media screen and (min-width: 1366px) {\n\n\t#toc-large-device {\n\t\tdisplay: inline-block\n\t}\n\n}\n\n#toc-large-device.open {\n\tleft: 0px;\n}\n\n#toc-large-device-container {\n\twidth: 100%;\n\tbackground-color: #fafafa;\n\tz-index: 1000;\n\toverflow-y: auto;\n}\n\n#toc-large-device-container > div {\n\tbackground-color: #fafafa;\n\tposition: relative;\n\theight: 100%;\n\twidth: 100%;\n}\n\n/*\ntoggle toc-large-device, swing-container, swing-bar\n*/\n\n#toggle-toc-large-device {\n    position: absolute;\n\tleft: 100%;\n\ttop: 0px;\n\tmargin-left: 8px;\n\toutline: none;\n\tbackground-color: #fafafa;\n\tfont-size: 1.5em;\n}\n\n/*\nif toc-large-device.open : swing-container to left\n*/\n#swing-container {\n\tmargin-left: 0px;\n\ttransition: margin-left 0.6s;\n\t-webkit-transition : margin-left 0.6s;\n\t-moz-transition : margin-left 0.6s;\n    -o-transition: margin-left 0.6s;\n\t\n}\n\n#swing-container.left {\n\t\tmargin-left: 0px;\n\t}\n\n@media screen and (min-width: 1366px) {\n\t#swing-container.left {\n\t\tmargin-left: 33%;\n\t}\n}\n\n/*\nif toc-large-device.open : swing-bar to left\n*/\n#swing-bar {\n\tmargin-left: 0px;\n\ttransition: margin-left 0.9s;\n\t-webkit-transition : margin-left 0.9s;\n\t-moz-transition : margin-left 0.9s;\n    -o-transition: margin-left 0.9s;\n}\n\n#swing-bar.left {\n\tmargin-left: 0px;\n}\n\n@media screen and (min-width: 1366px) {\n\t#swing-bar.left {\n\t\tmargin-left: 33%;\n\t}\n}\n\n/*\nTOC\n*/\n#toc {\n\tposition: absolute;\n\ttop: -1000px;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 1000;\n\toverflow-y: auto;\n/*\n\ttransition: top 0.4s;\n\t-webkit-transition : top 0.4s;\n\t-moz-transition : top 0.4s;\n    -o-transition: top 0.4s;\n*/\n\tpadding: 0px;\n\tbackground-color: #fafafa;\n}\n\n#toc.open {\n\ttop: 0px;\n}\n\n#toc > div {\n\tposition: relative;\n\tbackground-color: #fafafa;\n}\n\n#open-toc {\n\tfloat: right;\n\tfont-size: 1.4em;\n}\n\n#open-toc-large {\n\tposition: absolute;\n\ttop: 0px;\n\tright: 0px;\n\tdisplay: inline-block;\n}\n\n@media screen and (min-width: 1366px) {\n\t#open-toc-large {\n\t\tdisplay: none;\n\t}\n}\n\n#close-toc {\n\tbackground-color: transparent;\n\tline-height: 27px;\n\tfont-size: 2em;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n}\n\n#toc-title {\n\tmargin-bottom: 30px;\n\tmargin-top: 20px\n}\n\n#toc-title p {\n\tmargin: 8px;\n}\n/*\ntoc list\n*/\n#toc ul, #toc-large-device ul {\n\tpadding: 0px;\n}\n\n#toc li, #toc-large-device li {\n\tlist-style-type: none;\n\tpadding: .5em .5em;\n}\n\n#toc a.wb-link, #toc-large-device a.wb-link {\n\tdisplay: inline-block;\n\twidth: 100%;\n\tborder: none;\n\tcolor: gray;\n}\n\n#toc a.wb-link:hover, #toc-large-device a.wb-link:hover {\n\tdisplay: inline-block;\n\twidth: 100%;\n\tborder: none;\n\tcolor: #000;\n}\n\n#toc li.current a.wb-link, #toc-large-device li.current a.wb-link {\n\tcolor: #000;\n\toutline: none;\n\tfont-style: italic;\n}\n\n#toc [data-wb-element-page-number], #toc-large-device [data-wb-element-page-number] {\n\tfloat: right;\n}\n\n/*\nTOP\n*/\n#top {\n\tposition: absolute;\n\ttop: 0px;\n\tbox-sizing: border-box;\n\t-webkit-box-sizing: border-box;\n\t-moz-box-sizing: border-box;\n\tpadding-top: 8px;\n\ttext-align: center;\n\twidth: 100%;\n\theight: 30px;\n}\n\n#top .wb-current-section-title {\n\tdisplay: inline-block;\n\twidth: 80%;\n\twhite-space: nowrap;\n\tfont-size: 0.8em;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\t-o-text-overflow: ellipsis;\n}\n\n/*\nBOTTOM\n*/\n#bottom {\n\tposition: absolute;\n\tbottom: 0px;\n\tdisplay: inline-block;\n\theight: 30px;\n\twidth: 100%;\n\ttext-align: center;\n\tz-index: 500;\n\tbackground-color: #fafafa;\n\tcolor: #000;\n}\n\n#bottom-large {\n\tposition: absolute;\n\tbottom: -9999px;\n\tdisplay: inline-block;\n\theight: 30px;\n\twidth: 100%;\n\ttext-align: center;\n\tz-index: 500;\n}\n\n@media screen and (min-width: 768px) {\n\t\t\n\t#bottom {\n\t\tbottom: -9999px\n\t}\n\t\n\t#bottom-large {\n\t\tbottom: 5px;\n\t}\n}\n\n#bottom button, #bottom a, #bottom span {\n\tdisplay: inline-block;\n\tborder: none;\n\tbackground-color: transparent;\n\tmargin-right: 10px;\n\tmargin-left: 10px;\n\tmin-width: 25px;\n\theight: 100%;\n\tpadding: 0;\n\tfont-size: 1.2em;\n}\n\n#bottom button.open-toc {\n\tfont-size: 1.5em;\n}\n\n#bottom a#home {\n\tfloat: left;\n\ttext-decoration: none;\n\tmargin-top: 6px;\n\tfont-size: 0.9em;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tletter-spacing: 1px;\n}\n\n#bottom span {\n\tdisplay: inline-block;\n\tmin-width: 42px;\n\tmargin: 0px;\n\tmargin-top: 0px;\n\tfont-size: 1em;\n}\n\n/*\nTEXT\n*/\n[data-wb-text] {\n\tfont-size: 14px;\n\tline-height: 1.5em;\n\ttext-align: justify;\n\ttext-justify: inter-word;\n}\n\n@media screen and (min-width: 768px) {\n    [data-wb-text] {\n        font-size: 15px;\n        line-height: 1.5em;\n    }\n}\n\n[data-wb-text] p {\n\tmargin-bottom: 0px;\n\tmargin-top: 0px;\n\ttext-indent: 1.5em;\n}\n\n[data-wb-text] a.wb-link {\n\tborder-bottom: 1px dotted black;\n}\n\n/*\nINSIDE TEXT\n*/\n/*\nTITLES\n*/\n.section-title, .note-title, .wb-toc-title {\n\tfont-size: 1.25em;\n\ttext-align: left;\n\ttext-indent: 0px;\n}\n\np.section-subtitle {\n\tfont-size: 1em;\n\ttext-indent: 0px;\n\tmargin-bottom: 1.5em;\n}\n\np.section-title {\n\tpadding-top: 3.5em;\n\tmargin-top: 0px;\n\tmargin-bottom: 1.5em;\n\ttext-indent: 0px;\n\tline-height: 2em;\n}\n\n#titre.wb-section {\n\ttext-align: center;\n\tline-height: 1.8em;\n}\n\n#cover-author, #cover-title, #cover-logo {\n\tmargin: 0px;\n\ttext-indent: 0px;\n}\n\n#fin {\n\ttext-align: center;\n\t\n}\n\n#fin p {\n\tpadding-top: 20%;\n\ttext-indent: 0px;\n}\n", ""]);

// exports


/***/ }),
/* 25 */
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
/* 26 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="book">\n	<!--\n		STARTBOOK-CONTAINER\n	-->\n	<div id="bookContainer" style="font-family: <%= book.styles.font %>">\n		<!--\n			TOC-LARGE-DEVICE (outside textContainer) : width >= 1366\n		-->\n		<div id="toc-large-device" class="w3-card-4">\n			<button id="toggle-toc-large-device" type="button" class="w3-btn w3-card-4 w3-white">&colone;</button>\n			<div id="toc-large-device-container" class="toc-content">\n				<p class="w3-center"><%- book.authorDisplay %></p>\n				<p class="w3-center text-uppercase"><%- book.title %></p>\n				<div data-wb-toc class="w3-container"></div>\n			</div>\n		</div>\n		<!--\n			START SWING-CONTAINER : margin-left: 33% WHEN TOC-LARGE OPEN\n		-->\n		<div id="swing-container">\n			<!--\n				START TEXT-CONTAINER\n			-->\n			<div data-wb-text-container class="w3-card-4">\n				<!--\n					TOC (inside textContainer) : width < 1366\n				-->\n				<div id="toc">\n					<div data-wb-toc class="w3-container">\n						<button id="close-toc" type="button" class="w3-button w3-text-black w3-hover-none w3-display-topright">&times;</button>\n						<div id="toc-title" class="toc-content">\n							<p class="w3-center"><%- book.authorDisplay %></p>\n							<p class="w3-center text-uppercase"><%- book.title %></p>\n						</div>\n					</div>\n				</div>\n				<!--\n					TOP (inside textContainer)\n				-->\n				<div id="top">\n					<span class="wb-current-section-title"></span>\n				</div>\n				<!--\n					TEXT\n				-->\n				<div data-wb-text style="background-image: url(<%- book.styles.image %>)"></div>\n				<!--\n					BOTTOM (inside textContainer) : width < 768\n				-->\n				<div id="bottom">\n					<a id="home" href="/#/books/" class="w3-btn w3-text-gray">liber</a>\n					<span class="wb-currentByTotal-pages"></span>\n					<button type="button" id="open-toc" class="open-toc w3-btn w3-text-gray">&colone;</button>\n				</div>\n				<!--\n					BOTTOM-LARGE (inside textContainer) : width >= 768\n				-->\n				<div id="bottom-large">\n					<span class="wb-currentByTotal-pages"></span>\n				</div>\n			<!--\n				END TEXT-CONTAINER\n			-->\n			</div>\n		<!--\n			END SWING-CONTAINER : margin-left: 33% WHEN TOC-LARGE OPEN\n		-->\n		</div>\n		<!--\n			NAVBAR-BOTTOM (outside textContainer) : width >= 768\n		-->\n		<div id="book-nav-bar-bottom">\n			<div class="w3-bar w3-large">\n				<div id="swing-bar">\n					<div id="book-nav-bar-bottom-controls">\n						<span id="backward-large" class="w3-button w3-hover-none w3-margin-right">&lt;</span>\n						<span id="forward-large" class="w3-button w3-hover-none w3-margin-left">&gt;</span>\n						<span id="open-toc-large" class="open-toc w3-button w3-hover-none"><span>&colone;</span></span>\n					</div>\n				</div>\n			</div>\n		</div>\n	<!--\n		END BOOK-CONTAINER\n	-->\n	</div>\n</div>\n',
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
                buf.push('<div id="book">\n	<!--\n		STARTBOOK-CONTAINER\n	-->\n	<div id="bookContainer" style="font-family: ', escape((__stack.lineno = 5, book.styles.font)), '">\n		<!--\n			TOC-LARGE-DEVICE (outside textContainer) : width >= 1366\n		-->\n		<div id="toc-large-device" class="w3-card-4">\n			<button id="toggle-toc-large-device" type="button" class="w3-btn w3-card-4 w3-white">&colone;</button>\n			<div id="toc-large-device-container" class="toc-content">\n				<p class="w3-center">', (__stack.lineno = 12, book.authorDisplay), '</p>\n				<p class="w3-center text-uppercase">', (__stack.lineno = 13, book.title), '</p>\n				<div data-wb-toc class="w3-container"></div>\n			</div>\n		</div>\n		<!--\n			START SWING-CONTAINER : margin-left: 33% WHEN TOC-LARGE OPEN\n		-->\n		<div id="swing-container">\n			<!--\n				START TEXT-CONTAINER\n			-->\n			<div data-wb-text-container class="w3-card-4">\n				<!--\n					TOC (inside textContainer) : width < 1366\n				-->\n				<div id="toc">\n					<div data-wb-toc class="w3-container">\n						<button id="close-toc" type="button" class="w3-button w3-text-black w3-hover-none w3-display-topright">&times;</button>\n						<div id="toc-title" class="toc-content">\n							<p class="w3-center">', (__stack.lineno = 32, book.authorDisplay), '</p>\n							<p class="w3-center text-uppercase">', (__stack.lineno = 33, book.title), '</p>\n						</div>\n					</div>\n				</div>\n				<!--\n					TOP (inside textContainer)\n				-->\n				<div id="top">\n					<span class="wb-current-section-title"></span>\n				</div>\n				<!--\n					TEXT\n				-->\n				<div data-wb-text style="background-image: url(', (__stack.lineno = 46, book.styles.image), ')"></div>\n				<!--\n					BOTTOM (inside textContainer) : width < 768\n				-->\n				<div id="bottom">\n					<a id="home" href="/#/books/" class="w3-btn w3-text-gray">liber</a>\n					<span class="wb-currentByTotal-pages"></span>\n					<button type="button" id="open-toc" class="open-toc w3-btn w3-text-gray">&colone;</button>\n				</div>\n				<!--\n					BOTTOM-LARGE (inside textContainer) : width >= 768\n				-->\n				<div id="bottom-large">\n					<span class="wb-currentByTotal-pages"></span>\n				</div>\n			<!--\n				END TEXT-CONTAINER\n			-->\n			</div>\n		<!--\n			END SWING-CONTAINER : margin-left: 33% WHEN TOC-LARGE OPEN\n		-->\n		</div>\n		<!--\n			NAVBAR-BOTTOM (outside textContainer) : width >= 768\n		-->\n		<div id="book-nav-bar-bottom">\n			<div class="w3-bar w3-large">\n				<div id="swing-bar">\n					<div id="book-nav-bar-bottom-controls">\n						<span id="backward-large" class="w3-button w3-hover-none w3-margin-right">&lt;</span>\n						<span id="forward-large" class="w3-button w3-hover-none w3-margin-left">&gt;</span>\n						<span id="open-toc-large" class="open-toc w3-button w3-hover-none"><span>&colone;</span></span>\n					</div>\n				</div>\n			</div>\n		</div>\n	<!--\n		END BOOK-CONTAINER\n	-->\n	</div>\n</div>\n');
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dataStore = __webpack_require__(1);

var _dataStore2 = _interopRequireDefault(_dataStore);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _authors = __webpack_require__(28);

var _authors2 = _interopRequireDefault(_authors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authorsTemplate = __webpack_require__(30);
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
		location.hash = '#' + b.path + "/read";
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
var update = __webpack_require__(3)(content, options);
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "#authors-container {\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n}\n\n#authors-container #top-page-header {\n\ttext-align: center;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tfont-size: 1em;\n\tfont-variant: small-caps;\n\tletter-spacing: 1px;\n\tline-height: 25px;\n\twidth: 90px;\n\tmargin: auto;\n\tmargin-top: 16px;\n\tdisplay: block;\n}\n\n@media only screen and (min-width: 768px) {\n\t#authors-container #top-page-header {\n\t\tdisplay: none;\n\t}\n}\n\n#authors-container #letters {\n\ttext-align: center;\n\tline-height: 25px;\n\twidth: 320px;\n\tmargin: auto;\n}\n\n@media only screen and (min-width: 410px) {\n\t#authors-container #letters {\n\t\twidth: 410px;\n\t}\n}\n\n@media only screen and (min-width: 768px) {\n\t#authors-container #letters {\n\t\twidth: 100%;\n\t}\n}\n\n#authors-container .author {\n\tpadding-top: 8px;\n}\n\n#authors-container .author-name {\n\tmax-width: 568px;\n\tfont-size: 1.2em;\n\tfont-variant: small-caps;\n\tletter-spacing: 1.5px;\n\tmargin-bottom: 0px;\n\tmargin-top: 0px;\n\tmargin-left: 17px;\n\tmargin-right: 17px;\n\ttext-align: center;\n}\n\n#authors-container #booksList {\n\tmax-width: 568px;\n\tmargin: auto;\n}\n\n@media only screen and (min-width: 600px) {\n\t#authors-container #booksList {\n\t\tmargin: 0px;\n\t}\n\t\n\t#authors-container .author-name {\n\t\tmax-width: 852px;\n\t\ttext-align: left;\n\t}\n}\n\n@media only screen and (min-width: 853px) {\n\t#authors-container #booksList {\n\t\tmax-width: 852px;\n\t\tmargin: 0px;\n\t}\n\t\n\t#authors-container .author-name {\n\t\tmax-width: 1136px;\n\t}\n}\n\n@media only screen and (min-width: 1137px) {\n\t#authors-container #booksList {\n\t\tmax-width: 1136px;\n\t\tmargin: 0px;\n\t}\n\t\n\t#authors-container .author-name {\n\t\tmax-width: 1136px;\n\t}\n}\n\n#authors-container .w3-col {\n\twidth: 100%;\n\theight: 408px;\n}\n\n@media only screen and (min-width: 600px) {\n\t#authors-container .w3-col {\n\t\twidth: 284px;\n\t}\n}\n\n#authors-container #paper {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#authors-container .book {\n\twidth: 250px;\n\theight: 340px;\n\tmargin:auto;\n}\n\n#authors-container #book-btn {\n\twidth: 238px;\n\theight: 40px;\n\tmargin: auto;\n\tmargin-top: 8px;\n}\n\n#authors-container #book-btn button {\n\tfont-family: \"Times New Roman\", Georgia, serif;\n\tfont-size: 1em;\n\tletter-spacing: 1.5px;\n}\n\n/*\nMODAL (INFOS)\n*/\n#authors-container .w3-modal {\n\tfont-family: \"Times New Roman\", Georgia, serif;\n}\n\n#authors-container .w3-modal #footer {\n\tpadding-top: 16px;\n}\n\n#authors-container .w3-modal .close-infos-btn {\n\tfont-size: 1.1em;\n\tfont-family: \"Times New Roman\", Georgia, sans-serif;\n\tletter-spacing: 1px;\n}\n\n#authors-container .w3-modal p {\n\tmargin: 0px;\n\tmargin-top: 8px;\n}\n\n#authors-container .w3-modal ul {\n\tmargin: 0px;\n\tpadding-left: 10px;\n\tlist-style-type: none;\n}\n\n#authors-container .w3-modal .contrib-role {\n\ttext-transform: capitalize;\n}\n\n\n", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div id="authors-container" class="w3-content" style="max-width: 1136px">\n	<div id="top-page-header" class="w3-light-gray">auteurs</div>\n	<div id="letters" class="w3-container w3-padding-32">\n		<%- include src/components/authors/authors-letters.ejs -%>\n	</div>\n	<div id="authorsList" class="w3-padding-48 w3-animate-opacity">\n		<% for(var i=0; i<authors.length; i++) {%>\n			<% if(authors[i].visible) { %>\n			<div class="author">\n				<p class="author-name w3-border-bottom"><%- authors[i].name %></p>\n				<div id="booksList" class="w3-padding-16">\n					<div class=\'w3-row\'>\n						<% var works = authors[i].books.concat(authors[i].contribs)	%>\n						<% for(var j=0; j<works.length; j++) {\n							if(works[j].role) {\n									var b = works[j].book;\n								} else {\n									var b = works[j];\n								}\n							\n							if(b.visible) {\n							for(var k=0; k<books.length; k++) {\n								if(books[k].id===b.id) {\n									var book = books[k];\n									break;\n								}\n							}%>\n							\n							<!-- MODAL (INFOS) -->\n							<div id="infos-<%= book.id %>" class="w3-modal" style="background-color: rgba(0,0,0,0.1)">\n								<div class="w3-modal-content w3-card" style="max-width: 500px">\n									<div class="w3-container w3-padding-16">\n										  <p><b>Titre : </b><%- book.title %></p>\n										  <% if(book.subtitle1) {%>\n											<p><b>Sous-titre : </b><%- book.subtitle1 %></p>\n										  <%}%>\n										  <% if(book.subtitle2) {%>\n											<p><b>Sous-sous-titre : </b><%- book.subtitle2 %></p>\n										  <%}%>\n										  <p><b>Année de parution : </b><%- book.year %></p>\n										  <% if(book.authors.length > 1) {%>\n												<p>\n													<span><b>Auteurs :</b></span>\n													<br>\n													<ul>\n													<% for(var j=0; j<book.authors.length; j++) {%>\n														<li>\n															<%- book.authors[j].name %> (<%- book.authors[j].birth %>&nbsp;&ndash; <%- book.authors[j].death %>)\n														</li>\n													<%}%>\n													</ul>\n												</p>\n										  <%} else if(book.authors.length === 1) {%>\n												<p><b>Auteur : </b><%- book.authors[0].name %> (<%- book.authors[0].birth %>&nbsp;&ndash; <%- book.authors[0].death %>)</p>\n										  <%}%>\n										  <% if(book.contribs.length > 1) {%>\n												<p>\n													<span><b>Contributions :</b></span>\n													<br>\n													<ul>\n													<% for(var j=0; j<book.contribs.length; j++) {%>\n														<li>\n															<span class="contrib-role"><%- book.contribs[j].role %> : </span>\n															<%- book.contribs[j].name %> (<%- book.contribs[j].birth %>&nbsp;&ndash; <%- book.contribs[j].death %>)\n														</li>\n													<%}%>\n													</ul>\n												</p>\n										  <%} else if(book.contribs.length === 1) {%>\n												<p>\n													<span><b>Contribution : </b></span>\n													<br>\n													<ul>\n														<li>\n															<span class="contrib-role"><%- book.contribs[0].role %> : </span>\n															<%- book.contribs[0].name %> (<%- book.contribs[0].birth %>&nbsp;&ndash; <%- book.contribs[0].death %>)\n														</li>\n													</ul>\n												</p>\n										  <%}%>\n										  <p class="book-source"><b>Source : </b>\n											  <ul>\n												  <li>&Eacute;diteur : <%- book.source.publisher %></li>\n												  <li>Année de publication : <%- book.source.year %></li>\n											  </ul>\n										  </p>\n										  <% if(book.description) {%>\n										  <div><%- book.description %></div>\n										  <%}%>\n									</div>\n									<div id=footer class="w3-container w3-border-bottom">\n										<button id="close-infos-<%= book.id %>" class="close-infos-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-bottomright">Fermer</button>\n									</div>\n								</div>\n							</div>\n							\n							<div class="w3-col" style="text-align: center">\n								<div id="paper" style="background-image=<%= book.styles.image %>">\n								<div id="<%= book.id %>" class="book w3-card-4 w3-display-container" style="<%= book.styles.cover %>">\n									<p class="book-author" style="<%=book.styles.author %>"><%= book.authorDisplay %></p>\n									<p class="title" style="<%= book.styles.title %>">\n										<%- book.title %>\n									</p>\n									<% if(book.subtitle1) {%>\n									<p class="subtitle1" style="<%=book.styles.subtitle1 %>">\n										<%- book.subtitle1 %></a>\n									</p>\n									<% } %>\n									<% if(book.subtitle2) {%>\n									<p class="subtitle1" style="<%=book.styles.subtitle2 %>">\n										<%- book.subtitle2 %></a>\n									</p>\n									<% } %>\n									<p class="logo w3-display-bottommiddle" style="<%=book.styles.logo %>">liber</p>\n							   </div>\n							   </div>\n							   <div id="book-btn" >\n									<button id="open-infos-<%= book.id %>" class="open-infos-btn align-right w3-button">+ d\'infos</button>\n							   </div>\n							</div>\n						   <% } %>\n						<% } %>\n					</div>\n				</div>\n			</div>\n			<% } %>\n		<% } %>\n	</div>\n</div>\n',
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
                                buf.push('\n							\n							<!-- MODAL (INFOS) -->\n							<div id="infos-', escape((__stack.lineno = 29, book.id)), '" class="w3-modal" style="background-color: rgba(0,0,0,0.1)">\n								<div class="w3-modal-content w3-card" style="max-width: 500px">\n									<div class="w3-container w3-padding-16">\n										  <p><b>Titre : </b>', (__stack.lineno = 32, book.title), "</p>\n										  ");
                                __stack.lineno = 33;
                                if (book.subtitle1) {
                                    buf.push("\n											<p><b>Sous-titre : </b>", (__stack.lineno = 34, book.subtitle1), "</p>\n										  ");
                                    __stack.lineno = 35;
                                }
                                buf.push("\n										  ");
                                __stack.lineno = 36;
                                if (book.subtitle2) {
                                    buf.push("\n											<p><b>Sous-sous-titre : </b>", (__stack.lineno = 37, book.subtitle2), "</p>\n										  ");
                                    __stack.lineno = 38;
                                }
                                buf.push("\n										  <p><b>Année de parution : </b>", (__stack.lineno = 39, book.year), "</p>\n										  ");
                                __stack.lineno = 40;
                                if (book.authors.length > 1) {
                                    buf.push("\n												<p>\n													<span><b>Auteurs :</b></span>\n													<br>\n													<ul>\n													");
                                    __stack.lineno = 45;
                                    for (var j = 0; j < book.authors.length; j++) {
                                        buf.push("\n														<li>\n															", (__stack.lineno = 47, book.authors[j].name), " (", (__stack.lineno = 47, book.authors[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 47, book.authors[j].death), ")\n														</li>\n													");
                                        __stack.lineno = 49;
                                    }
                                    buf.push("\n													</ul>\n												</p>\n										  ");
                                    __stack.lineno = 52;
                                } else if (book.authors.length === 1) {
                                    buf.push("\n												<p><b>Auteur : </b>", (__stack.lineno = 53, book.authors[0].name), " (", (__stack.lineno = 53, book.authors[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 53, book.authors[0].death), ")</p>\n										  ");
                                    __stack.lineno = 54;
                                }
                                buf.push("\n										  ");
                                __stack.lineno = 55;
                                if (book.contribs.length > 1) {
                                    buf.push("\n												<p>\n													<span><b>Contributions :</b></span>\n													<br>\n													<ul>\n													");
                                    __stack.lineno = 60;
                                    for (var j = 0; j < book.contribs.length; j++) {
                                        buf.push('\n														<li>\n															<span class="contrib-role">', (__stack.lineno = 62, book.contribs[j].role), " : </span>\n															", (__stack.lineno = 63, book.contribs[j].name), " (", (__stack.lineno = 63, book.contribs[j].birth), "&nbsp;&ndash; ", (__stack.lineno = 63, book.contribs[j].death), ")\n														</li>\n													");
                                        __stack.lineno = 65;
                                    }
                                    buf.push("\n													</ul>\n												</p>\n										  ");
                                    __stack.lineno = 68;
                                } else if (book.contribs.length === 1) {
                                    buf.push('\n												<p>\n													<span><b>Contribution : </b></span>\n													<br>\n													<ul>\n														<li>\n															<span class="contrib-role">', (__stack.lineno = 74, book.contribs[0].role), " : </span>\n															", (__stack.lineno = 75, book.contribs[0].name), " (", (__stack.lineno = 75, book.contribs[0].birth), "&nbsp;&ndash; ", (__stack.lineno = 75, book.contribs[0].death), ")\n														</li>\n													</ul>\n												</p>\n										  ");
                                    __stack.lineno = 79;
                                }
                                buf.push('\n										  <p class="book-source"><b>Source : </b>\n											  <ul>\n												  <li>&Eacute;diteur : ', (__stack.lineno = 82, book.source.publisher), "</li>\n												  <li>Année de publication : ", (__stack.lineno = 83, book.source.year), "</li>\n											  </ul>\n										  </p>\n										  ");
                                __stack.lineno = 86;
                                if (book.description) {
                                    buf.push("\n										  <div>", (__stack.lineno = 87, book.description), "</div>\n										  ");
                                    __stack.lineno = 88;
                                }
                                buf.push('\n									</div>\n									<div id=footer class="w3-container w3-border-bottom">\n										<button id="close-infos-', escape((__stack.lineno = 91, book.id)), '" class="close-infos-btn w3-button w3-text-gray w3-hover-none w3-hover-text-black w3-display-bottomright">Fermer</button>\n									</div>\n								</div>\n							</div>\n							\n							<div class="w3-col" style="text-align: center">\n								<div id="paper" style="background-image=', escape((__stack.lineno = 97, book.styles.image)), '">\n								<div id="', escape((__stack.lineno = 98, book.id)), '" class="book w3-card-4 w3-display-container" style="', escape((__stack.lineno = 98, book.styles.cover)), '">\n									<p class="book-author" style="', escape((__stack.lineno = 99, book.styles.author)), '">', escape((__stack.lineno = 99, book.authorDisplay)), '</p>\n									<p class="title" style="', escape((__stack.lineno = 100, book.styles.title)), '">\n										', (__stack.lineno = 101, book.title), "\n									</p>\n									");
                                __stack.lineno = 103;
                                if (book.subtitle1) {
                                    buf.push('\n									<p class="subtitle1" style="', escape((__stack.lineno = 104, book.styles.subtitle1)), '">\n										', (__stack.lineno = 105, book.subtitle1), "</a>\n									</p>\n									");
                                    __stack.lineno = 107;
                                }
                                buf.push("\n									");
                                __stack.lineno = 108;
                                if (book.subtitle2) {
                                    buf.push('\n									<p class="subtitle1" style="', escape((__stack.lineno = 109, book.styles.subtitle2)), '">\n										', (__stack.lineno = 110, book.subtitle2), "</a>\n									</p>\n									");
                                    __stack.lineno = 112;
                                }
                                buf.push('\n									<p class="logo w3-display-bottommiddle" style="', escape((__stack.lineno = 113, book.styles.logo)), '">liber</p>\n							   </div>\n							   </div>\n							   <div id="book-btn" >\n									<button id="open-infos-', escape((__stack.lineno = 117, book.id)), '" class="open-infos-btn align-right w3-button">+ d\'infos</button>\n							   </div>\n							</div>\n						   ');
                                __stack.lineno = 120;
                            }
                            buf.push("\n						");
                            __stack.lineno = 121;
                        }
                        buf.push("\n					</div>\n				</div>\n			</div>\n			");
                        __stack.lineno = 125;
                    }
                    buf.push("\n		");
                    __stack.lineno = 126;
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(1);

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminLoginTemplate = __webpack_require__(32);
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
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _adminHome = __webpack_require__(34);

var _adminHome2 = _interopRequireDefault(_adminHome);

var _adminUsers = __webpack_require__(36);

var _adminUsers2 = _interopRequireDefault(_adminUsers);

var _adminUser = __webpack_require__(38);

var _adminUser2 = _interopRequireDefault(_adminUser);

var _adminNew = __webpack_require__(40);

var _adminNew2 = _interopRequireDefault(_adminNew);

var _adminEdit = __webpack_require__(42);

var _adminEdit2 = _interopRequireDefault(_adminEdit);

var _adminEditPassword = __webpack_require__(44);

var _adminEditPassword2 = _interopRequireDefault(_adminEditPassword);

var _adminBooks = __webpack_require__(46);

var _adminBooks2 = _interopRequireDefault(_adminBooks);

var _adminBook = __webpack_require__(48);

var _adminBook2 = _interopRequireDefault(_adminBook);

var _adminBooksNew = __webpack_require__(50);

var _adminBooksNew2 = _interopRequireDefault(_adminBooksNew);

var _adminBookEdit = __webpack_require__(57);

var _adminBookEdit2 = _interopRequireDefault(_adminBookEdit);

var _adminAuthors = __webpack_require__(64);

var _adminAuthors2 = _interopRequireDefault(_adminAuthors);

var _adminAuthor = __webpack_require__(66);

var _adminAuthor2 = _interopRequireDefault(_adminAuthor);

var _adminAuthorsNew = __webpack_require__(68);

var _adminAuthorsNew2 = _interopRequireDefault(_adminAuthorsNew);

var _adminAuthorEdit = __webpack_require__(70);

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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(1);

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminHomeTemplate = __webpack_require__(35);
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
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminUsersTemplate = __webpack_require__(37);
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
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminUserTemplate = __webpack_require__(39);
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
/* 39 */
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminNewTemplate = __webpack_require__(41);
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
/* 41 */
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminEditTemplate = __webpack_require__(43);
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
/* 43 */
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminEditPasswordTemplate = __webpack_require__(45);
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
/* 45 */
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminBooksTemplate = __webpack_require__(47);
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
/* 47 */
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminBookTemplate = __webpack_require__(49);
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
/* 49 */
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(1);

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminBooksNewTemplate = __webpack_require__(51);
var modalHeaderTemplate = __webpack_require__(52);
var searchAuthorsResultsTemplate = __webpack_require__(53);
var selectedAuthorsTemplate = __webpack_require__(54);
var selectedContribsTemplate = __webpack_require__(55);
var selectedContribRoleTemplate = __webpack_require__(56);
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
/* 51 */
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
/* 52 */
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
/* 53 */
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
/* 54 */
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
/* 55 */
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
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(1);

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminBookEditTemplate = __webpack_require__(58);
var modalHeaderTemplate = __webpack_require__(59);
var searchAuthorsResultsTemplate = __webpack_require__(60);
var selectedAuthorsTemplate = __webpack_require__(61);
var selectedContribsTemplate = __webpack_require__(62);
var selectedContribRoleTemplate = __webpack_require__(63);
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
/* 58 */
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
/* 59 */
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
/* 60 */
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
/* 61 */
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
/* 62 */
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
/* 63 */
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminAuthorsTemplate = __webpack_require__(65);
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
/* 65 */
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminAuthorTemplate = __webpack_require__(67);
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
/* 67 */
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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dataStore = __webpack_require__(1);

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminAuthorsNewTemplate = __webpack_require__(69);
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
/* 69 */
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminAuthorEditTemplate = __webpack_require__(71);
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
/* 71 */
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
/* 72 */
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