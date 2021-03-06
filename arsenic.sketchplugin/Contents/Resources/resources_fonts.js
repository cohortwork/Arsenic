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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/fonts.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/fonts.js":
/*!****************************!*\
  !*** ./resources/fonts.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var fontList = []; // Font Related Js

document.getElementById("font-listing").addEventListener("click", function (e) {
  var target = e.target;
  if (target.tagName != "LI") return;
  var listAllLi = document.querySelectorAll(".fontfamily-list-item");
  [].forEach.call(listAllLi, function (el) {
    el.classList.remove("selected");
  });
  target.classList.add("selected");
}); // Typography checkbox events

var getTypographyCheckbox = document.getElementsByName("select-typography-checkbox");
getTypographyCheckbox.forEach(function (typographyCheckBox, i) {
  typographyCheckBox.addEventListener("change", function (e) {
    if ($("#" + e.target.id).is(":checked")) {
      $("#" + e.target.id).prop("checked", true);
    } else {
      $("#" + e.target.id).prop("checked", false);
    }
  });
});
document.getElementById("select-all-typography").addEventListener("click", function (e) {
  if ($("#select-all-typography").is(":checked")) {
    $('[name="select-typography-checkbox"]').prop("checked", true);
  } else {
    $('[name="select-typography-checkbox"]').prop("checked", false);
  }
});
document.getElementById("updateFonts").addEventListener("click", function () {
  return fetchSelectedFonts();
}); // call the webview from the plugin

window.setInitialFonts = function (fontsName) {
  var cont = document.getElementById("font-listing");
  createFontOption(fontsName, cont);
  fontList.push(fontsName);
};

var fetchSelectedFonts = function fetchSelectedFonts() {
  var selectedFontType = $("li.selected").text();
  var arsenicFontLayers = $('[name="select-typography-checkbox"]');

  if (selectedFontType && arsenicFontLayers) {
    for (var i = 0; i < arsenicFontLayers.length; i++) {
      var targetInput = arsenicFontLayers[i];
      var fontName = targetInput.id;

      if ($("#" + fontName).is(":checked")) {
        window.postMessage("doUpdateFonts", fontName, selectedFontType);
      }
    }

    window.postMessage("setMessage", "fonts");
  }
};

document.getElementById("search-system-font").oninput = ("change", function (e) {
  var value = e.target.value; // Prevent white space

  if (value.trim().length > 0) {
    // Filter fonts from local array based on search value
    var filteredFonts = fontList === null || fontList === void 0 ? void 0 : fontList.filter(function (font) {
      return font.toLowerCase().includes(value.toLowerCase());
    });
    removeExistingFont();

    for (var i = 0; i < filteredFonts.length; i++) {
      createFontOption(filteredFonts[i], document.getElementById("font-listing"));
    }
  } else {
    removeExistingFont();
    window.postMessage("getFonts");
  }
});

var removeExistingFont = function removeExistingFont() {
  var cont = document.getElementById("font-listing");

  while (cont.firstChild) {
    cont.removeChild(cont.firstChild);
  }
};

var createFontOption = function createFontOption(fontsName, cont) {
  var li = document.createElement("li"); // create li element.

  li.className = "fontfamily-list-item";
  li.innerHTML = fontsName; // assigning text to li using array value.

  cont.appendChild(li); // append li to ul.
};

/***/ })

/******/ });
//# sourceMappingURL=resources_fonts.js.map