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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css?family=VT323&display=swap);\"]);\n// Module\nexports.push([module.i, \"/* SASS Variables */\\n/* Universal selectors */\\nbody {\\n  margin: 0;\\n  padding: 0;\\n  background-color: #111;\\n  color: #33ff00;\\n  font-family: \\\"VT323\\\", Arial, Helvetica, sans-serif;\\n  font-size: 1rem;\\n}\\n\\nh1, h2, h3 {\\n  font-weight: normal;\\n}\\n\\nh3 {\\n  margin: 20px 0px;\\n  font-size: 28pt;\\n}\\n\\n/* Scrollbar Stylings */\\n/* width */\\n::-webkit-scrollbar {\\n  width: 10px;\\n}\\n\\n/* Track */\\n::-webkit-scrollbar-track {\\n  background: #111;\\n}\\n\\n/* Handle */\\n::-webkit-scrollbar-thumb {\\n  background: #33ff00;\\n}\\n\\n/* Handle on hover */\\n::-webkit-scrollbar-thumb:hover {\\n  background: rgba(51, 255, 0, 0.5);\\n}\\n\\n/* Login handlebar stylings */\\n#login {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  width: 100vw;\\n  height: 100vh;\\n}\\n\\n#loginDiv {\\n  border: 2px solid #33ff00;\\n  border-radius: 20px;\\n  padding: 1% 5%;\\n  text-align: center;\\n  position: relative;\\n}\\n#loginDiv h1 {\\n  font-size: 60pt;\\n}\\n#loginDiv p {\\n  position: absolute;\\n  top: -20px;\\n  right: 10px;\\n  font-size: 21pt;\\n}\\n#loginDiv a {\\n  color: #33ff00;\\n}\\n\\n#loginForm {\\n  text-align: center;\\n}\\n#loginForm input[name=username] {\\n  text-align: center;\\n  display: block;\\n  background-color: #111;\\n  border-radius: 40px;\\n  color: #33ff00;\\n  border: 2px solid #33ff00;\\n  font-family: \\\"VT323\\\", Arial, Helvetica, sans-serif;\\n  font-size: 42pt;\\n  width: 80%;\\n  margin: 0px auto 30px auto;\\n}\\n#loginForm input[name=pass] {\\n  text-align: center;\\n  display: block;\\n  background-color: #111;\\n  border-radius: 40px;\\n  color: #33ff00;\\n  border: 2px solid #33ff00;\\n  font-family: \\\"VT323\\\", Arial, Helvetica, sans-serif;\\n  font-size: 42pt;\\n  width: 80%;\\n  margin: 0px auto 30px auto;\\n}\\n#loginForm input[name=pass2] {\\n  text-align: center;\\n  display: block;\\n  background-color: #111;\\n  border-radius: 40px;\\n  color: #33ff00;\\n  border: 2px solid #33ff00;\\n  font-family: \\\"VT323\\\", Arial, Helvetica, sans-serif;\\n  font-size: 42pt;\\n  width: 80%;\\n  margin: 0px auto 30px auto;\\n}\\n#loginForm input[type=image]:hover {\\n  opacity: 0.5;\\n}\\n\\n/* Taken from: https://css-tricks.com/almanac/selectors/p/placeholder/ */\\n::-webkit-input-placeholder { /* Chrome/Opera/Safari */\\n  color: rgba(51, 255, 0, 0.5);\\n}\\n\\n::-moz-placeholder { /* Firefox 19+ */\\n  color: rgba(51, 255, 0, 0.5);\\n}\\n\\n:-ms-input-placeholder { /* IE 10+ */\\n  color: rgba(51, 255, 0, 0.5);\\n}\\n\\n:-moz-placeholder { /* Firefox 18- */\\n  color: rgba(51, 255, 0, 0.5);\\n}\\n\\n/* Level-Select Handlebars Stylings */\\n#levelGrid {\\n  width: 80%;\\n  margin: 100px auto 0px auto;\\n  display: grid;\\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\\n}\\n#levelGrid a {\\n  color: #33ff00;\\n}\\n#levelGrid a :hover {\\n  cursor: pointer;\\n}\\n\\n.levelSelect {\\n  margin: 0px 10% 70px 20%;\\n  border: 4px solid #33ff00;\\n  border-radius: 20px;\\n  text-align: center;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  position: relative;\\n  padding: 35% 0%;\\n}\\n\\n/* Nav bar stylings, under Level-Select */\\nnav {\\n  position: fixed;\\n  width: 100vw;\\n  top: 0px;\\n  left: 0px;\\n  font-size: 1rem;\\n  display: flex;\\n  justify-content: space-between;\\n  background-color: #111;\\n  box-shadow: 0px 0px 10px #111, 0px 0px 3px #111;\\n  transition: 0.2s;\\n}\\nnav h2, nav a {\\n  font-size: 36pt;\\n  margin: 1% 0% 0 4%;\\n}\\nnav div {\\n  font-size: 36pt;\\n  margin: 1% 0 0 4%;\\n  width: 600px;\\n}\\nnav img {\\n  margin: 1% 4% 0 0%;\\n  width: 55px;\\n  height: 55px;\\n  border-radius: 40px;\\n  border: 4px solid #33ff00;\\n}\\n\\n/* High score stylings, under Level-Select */\\n.highscore {\\n  display: flex;\\n  position: absolute;\\n  right: 10px;\\n  top: 5px;\\n}\\n.highscore h5 {\\n  font-weight: normal;\\n  font-size: 1.1rem;\\n  margin: 0;\\n  padding-right: 3%;\\n}\\n.highscore img {\\n  padding-top: 2px;\\n  width: 20px;\\n}\\n\\n/* Exclusive stylings, under Level-Select */\\n.exclusive {\\n  position: absolute;\\n  top: 5px;\\n  left: 10px;\\n}\\n.exclusive img {\\n  width: 20px;\\n}\\n\\n.levelText {\\n  position: absolute;\\n  top: 50%;\\n  transform: translate(0, -50%);\\n}\\n.levelText h3 {\\n  margin-bottom: 10px;\\n  font-size: 3rem;\\n}\\n.levelText h4 {\\n  margin-top: 5px;\\n  font-size: 2rem;\\n  font-weight: normal;\\n  width: 99%;\\n  margin: 5px auto 0px auto;\\n}\\n\\n#levelContainer {\\n  transition: 0.5s;\\n  margin-left: 0px;\\n}\\n\\n/* Profile Stylings, under Level-Select */\\n#profile {\\n  width: 0px;\\n  height: 100vh;\\n  position: fixed;\\n  top: 0px;\\n  border-right: 4px solid #33ff00;\\n  background-color: #111;\\n  z-index: 3;\\n  transition: 0.1s;\\n  overflow: scroll;\\n}\\n#profile h1 {\\n  margin-bottom: 0px;\\n}\\n#profile img {\\n  width: 50%;\\n  text-align: center;\\n  margin: auto;\\n}\\n\\n#profileContent {\\n  padding-top: 15%;\\n  width: 90%;\\n  margin: auto;\\n  text-align: center;\\n}\\n#profileContent h1 {\\n  font-size: 42pt;\\n}\\n#profileContent button {\\n  text-align: center;\\n  display: block;\\n  background-color: #111;\\n  border-radius: 40px;\\n  color: #33ff00;\\n  border: 2px solid #33ff00;\\n  font-family: \\\"VT323\\\", Arial, Helvetica, sans-serif;\\n  font-size: 21pt;\\n  width: 70%;\\n  margin: 0px auto 30px auto;\\n}\\n#profileContent button:hover {\\n  background-color: rgba(51, 255, 0, 0.5);\\n  border-color: black;\\n  color: black;\\n  cursor: pointer;\\n}\\n\\n#subscription {\\n  width: 80%;\\n  margin: auto;\\n  border: 2px solid #33ff00;\\n  border-radius: 20px;\\n  padding: 0px;\\n}\\n\\n/* Change username, change password, change picture */\\n#buttons {\\n  margin: 40px 0px;\\n}\\n#buttons a {\\n  text-decoration: none;\\n  color: #33ff00;\\n}\\n#buttons form {\\n  width: 80%;\\n  margin: auto;\\n}\\n#buttons form input {\\n  width: 100%;\\n  background-color: #111;\\n  color: #33ff00;\\n  border-radius: 20px;\\n  border: 2px solid #33ff00;\\n  font-size: 3rem;\\n  margin-bottom: 10px;\\n  font-family: \\\"VT323\\\", Arial, Helvetica, sans-serif;\\n}\\n#buttons form #fileSelect {\\n  color: #33ff00;\\n  font-size: 1rem;\\n}\\n\\n/* Tutorial Handlebars Stylings */\\n#tutorial {\\n  width: 100vw;\\n  height: 100vh;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  font-size: 2rem;\\n}\\n#tutorial h1 {\\n  width: 40%;\\n  margin: auto;\\n  text-align: center;\\n}\\n\\n/* Example exercise under tutorial */\\n#example {\\n  display: none;\\n}\\n#example h1 {\\n  text-align: center;\\n  font-size: 6rem;\\n}\\n#example h2 {\\n  text-align: center;\\n  font-size: 4rem;\\n}\\n\\n#coverDiv {\\n  width: 600px;\\n  height: 400px;\\n  border-radius: 5px;\\n  border: 3px solid #33ff00;\\n  text-align: center;\\n  margin: auto;\\n  position: relative;\\n}\\n#coverDiv a {\\n  position: absolute;\\n  top: 50%;\\n  left: 50%;\\n  transform: translate(-50%, -50%);\\n  background-color: #111;\\n  color: #33ff00;\\n  font-family: \\\"VT323\\\", Arial, Helvetica, sans-serif;\\n  font-size: 2rem;\\n  padding: 20px;\\n  border-radius: 60px;\\n  border: 2px solid #33ff00;\\n  text-decoration: none;\\n}\\n#coverDiv a :hover {\\n  background-color: #33ff00;\\n  color: black;\\n  cursor: pointer;\\n}\\n\\n#cover {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 600px;\\n  height: 400px;\\n  background-color: #33ff00;\\n}\\n\\n#hint {\\n  width: 600px;\\n  margin: auto;\\n}\\n#hint p {\\n  font-size: 2rem;\\n}\\n\\n#home {\\n  text-decoration: none;\\n  color: #33ff00;\\n}\\n\\n#home:hover {\\n  text-decoration: underline;\\n}\\n\\n#home:visited {\\n  text-decoration: none;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/scss/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/js/tutorial.js":
/*!****************************!*\
  !*** ./src/js/tutorial.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./src/scss/style.scss\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/*Taken from: https://www.w3schools.com/howto/howto_js_typewriter.asp*/\nvar i = 0;\nvar tutorialText = [\"Welcome to Hyper Hacker\", \"The goal is simple. Click the green button to win.\", \"In order to click the green button, you have to access it first.\", \"You must manipulate elements of the page in order to access the button.\", \"The faster you get to the button, the better your score.\", \"Let's try an example.\"];\nvar tutorialIndex = -1;\nfunction runTypeWriter() {\n  document.querySelector(\"#text\").innerHTML = \"\";\n  if (tutorialIndex == tutorialText.length - 1) {\n    loadTutorial();\n  } else {\n    tutorialIndex++;\n    i = 0;\n    setTimeout(typeWriter, 200);\n  }\n}\nfunction typeWriter() {\n  if (i < tutorialText[tutorialIndex].length) {\n    document.querySelector(\"#text\").innerHTML += tutorialText[tutorialIndex].charAt(i);\n    i++;\n    setTimeout(typeWriter, 40);\n  }\n}\nfunction loadTutorial() {\n  document.querySelector(\"#example\").style.display = 'block';\n  document.querySelector(\"#tutorial\").style.display = \"none\";\n}\nfunction init() {\n  runTypeWriter();\n  var finish = document.querySelector(\"#finish-link\");\n  var _csrf = document.querySelector(\"#_csrf\");\n  finish.onclick = function (e) {\n    e.preventDefault();\n    fetch(\"/tutorial?_csrf=\".concat(_csrf.value), {\n      method: 'POST'\n    }).then(function (res) {\n      if (res.status === 200) {\n        window.location.href = '/level-select';\n      }\n    })[\"catch\"](function (err) {\n      console.log(err);\n    });\n  };\n}\ndocument.onkeypress = runTypeWriter;\nwindow.onload = init;\n\n//# sourceURL=webpack:///./src/js/tutorial.js?");

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/scss/style.scss?");

/***/ }),

/***/ 16:
/*!**********************************!*\
  !*** multi ./src/js/tutorial.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/dansinger/Documents/hyper-hacker/src/js/tutorial.js */\"./src/js/tutorial.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/tutorial.js?");

/***/ })

/******/ });