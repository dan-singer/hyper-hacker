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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const handleError = (message) => {\r\n  $(\"#errorMessage\").text(message);\r\n  $(\"#domoMessage\").animate({width:'toggle'},350);\r\n}\r\n\r\nconst sendAjax = (action, data) => {\r\n  $.ajax({\r\n    cache: false,\r\n    type: \"POST\",\r\n    url: action,\r\n    data: data,\r\n    dataType: \"json\",\r\n    success: (result, status, xhr) => {\r\n      $(\"#domoMessage\").animate({width:'hide'},350);\r\n\r\n      window.location = result.redirect;\r\n    },\r\n    error: (xhr, status, error) => {\r\n      const messageObj = JSON.parse(xhr.responseText);\r\n\r\n      handleError(messageObj.error);\r\n    }\r\n  });        \r\n}\r\n\r\n$(document).ready(() => {\r\n  $(\"#signupForm\").on(\"submit\", (e) => {\r\n    e.preventDefault();\r\n\r\n    $(\"#domoMessage\").animate({width:'hide'},350);\r\n\r\n    if($(\"#user\").val() == '' || $(\"#pass\").val() == '' || $(\"#pass2\").val() == '') {\r\n      handleError(\"RAWR! All fields are required\");\r\n      return false;\r\n    }\r\n\r\n    if($(\"#pass\").val() !== $(\"#pass2\").val()) {\r\n      handleError(\"RAWR! Passwords do not match\");\r\n      return false;           \r\n    }\r\n\r\n    sendAjax($(\"#signupForm\").attr(\"action\"), $(\"#signupForm\").serialize());\r\n\r\n    return false;\r\n  });\r\n\r\n  $(\"#loginForm\").on(\"submit\", (e) => {\r\n    e.preventDefault();\r\n\r\n    $(\"#domoMessage\").animate({width:'hide'},350);\r\n\r\n    if($(\"#user\").val() == '' || $(\"#pass\").val() == '') {\r\n      handleError(\"RAWR! Username or password is empty\");\r\n      return false;\r\n    }\r\n\r\n    sendAjax($(\"#loginForm\").attr(\"action\"), $(\"#loginForm\").serialize());\r\n\r\n    return false;\r\n  });\r\n  \r\n  $(\"#domoForm\").on(\"submit\", (e) => {\r\n    e.preventDefault();\r\n\r\n    $(\"#domoMessage\").animate({width:'hide'},350);\r\n\r\n    if($(\"#domoName\").val() == '' || $(\"#domoAge\").val() == '') {\r\n      handleError(\"RAWR! All fields are required\");\r\n      return false;\r\n    }\r\n\r\n    sendAjax($(\"#domoForm\").attr(\"action\"), $(\"#domoForm\").serialize());\r\n\r\n    return false;\r\n  });\r\n});\n\n//# sourceURL=webpack:///./src/client.js?");

/***/ })

/******/ });