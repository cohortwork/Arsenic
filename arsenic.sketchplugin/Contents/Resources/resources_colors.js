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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/colors.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/colors.js":
/*!*****************************!*\
  !*** ./resources/colors.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener("contextmenu", function (e) {//e.preventDefault();
});
document.getElementById("openCohort").addEventListener("click", function (e) {
  e.preventDefault();
  window.postMessage("openExternalLink", e.target.href);
});
document.getElementById("openArsenic").addEventListener("click", function (event) {
  var target = event.target.closest("a");

  if (target && target.getAttribute("target") === "_blank") {
    event.preventDefault();
    window.postMessage("openExternalLink", target.href);
  }
}); // call the plugin from the webview

document.getElementById("updateColors").addEventListener("click", function () {
  return fetchSelectedColors();
});
document.getElementById("selected-color-hex").addEventListener("change", function (e) {
  return changeColor("#" + e.target.value);
});
document.getElementById("select-base-color").addEventListener("input", function (e) {
  return changeColor(e.target.value);
});
$("#color-list-ul").on("click", "li span.color-preview-block", function () {
  // $("span.color-preview-block").click(function () {
  var id = $(this).prop("id");
  doEnableColor(id);
}); // $("#color-list-ul").on("click", "li span.color-revert-icon", function () {

$("#color-list-ul").on("click", "li span.color-revert-icon", function () {
  // $("span.color-revert-icon").click(function () {
  console.log(this, "this in Li");
  var id = $(this).prop("id");
  var colorName = id.split("-");
  window.postMessage("doResetColor", colorName[0]);
}); // Color checkbox events

var getColorCheckbox = document.getElementsByName("select-color-checkbox");
getColorCheckbox.forEach(function (colorCheckBox, i) {
  colorCheckBox.addEventListener("change", function (e) {
    if ($("#" + e.target.id).is(":checked")) {
      $("#" + e.target.id).prop("checked", true);
    } else {
      $("#" + e.target.id).prop("checked", false);
    }
  });
});
document.getElementById("select-all-colors").addEventListener("click", function (e) {
  if ($("#select-all-colors").is(":checked")) {
    $('[name="select-color-checkbox"]').prop("checked", true);
  } else {
    $('[name="select-color-checkbox"]').prop("checked", false);
  }
}); //on check box checked toggle for Advanced Options

$("#advanced-option").change(function () {
  if ($(this).is(":checked")) {
    $("#body-inner-wrapper").addClass("toggle-advanced");
  } else {
    $("#body-inner-wrapper").removeClass("toggle-advanced");
  }
});

var fetchSelectedColors = function fetchSelectedColors() {
  var arsenicColors = $('[name="arsenicColors"]');
  var minLuminence = $("#minLuminence").val();
  var maxLuminence = $("#maxLuminence").val(); // arsenicColors.forEach(function (baseColors) {

  for (var i = 0; i < arsenicColors.length; i++) {
    var targetInput = arsenicColors[i];
    var inputId = targetInput.id.replace("-color", "");

    if ($("#" + inputId + "-checkbox").is(":checked")) {
      window.postMessage("doUpdateColors", inputId, targetInput.value, minLuminence, maxLuminence);
      $("#" + inputId + "-revert").css("display", "none");
      $("#" + inputId + "-color-revert").val(false);
    }
  }

  window.postMessage("setMessage", "colors");
};

var doEnableColor = function doEnableColor(id) {
  var inputId = id.replace("-color-preview", "");
  var colorValue = $("#" + inputId + "-color").val();
  $("#which-color").val(inputId);
  document.getElementById("select-base-color").value = colorValue; //$("#select-base-color").val(colorValue);

  addHexinInput(colorValue);
  $(".color-picker-icon").css("display", "none"); //$(".color-revert-icon").css("display", "none");

  $("#" + inputId + "-icon").css("display", "block");

  if ($("#" + inputId + "-color-revert").val() === "true" || $("#" + inputId + "-color-revert").val() === true) {
    $("#" + inputId + "-revert").css("display", "block");
  }

  $("#" + inputId + "-checkbox").prop("checked", true);
  if (colorValue === "#ffffff") $(".select-base-color-block").css("border", "1px solid #000000");else $(".select-base-color-block").css("border", "none");
};

var changeColor = function changeColor(colorCode) {
  var id = $("#which-color").val();
  $("#" + id + "-color").val(colorCode);
  $("#" + id + "-color-preview").css("background", colorCode);
  $("#select-base-color").val(colorCode);
  addHexinInput(colorCode);
  $("#" + id + "-revert").css("display", "block");
  $("#" + id + "-color-revert").val(true);

  if (colorCode === "#ffffff") {
    $(".select-base-color-block").css("border", "1px solid #000000");
    $("#" + id + "-color-preview").css("border", "1px solid #000000");
    $("#" + id + "-preview-title").css("color", "#000000");
    $("#" + id + "-color-picker-icon").removeClass("text-white");
    $("#" + id + "-color-picker-icon").addClass("text-dark");
    $("#" + id + "-revert").removeClass("text-white");
    $("#" + id + "-revert").addClass("text-dark");
  } else {
    $(".select-base-color-block").css("border", "none");
    $("#" + id + "-color-preview").css("border", "none");
    $("#" + id + "-preview-title").css("color", "#ffffff");
    $("#" + id + "-color-picker-icon").removeClass("text-dark");
    $("#" + id + "-color-picker-icon").addClass("text-white");
    $("#" + id + "-revert").removeClass("text-dark");
    $("#" + id + "-revert").addClass("text-white");
  }
};

var addHexinInput = function addHexinInput(hexCode) {
  var trimmedHex = hexCode.replace("#", "");
  $("#selected-color-hex").val(trimmedHex);
};

window.enableSubmitButton = function (btnId) {//console.log(btnId + "btnId name");
  //$("#updateColors").prop("disabled", false);
}; // call the webview from the plugin


window.setOpenDocumentName = function (documentName) {
  $("#select-stylesheets").append("<option value=\"".concat(documentName, "\"> \n  ").concat(documentName, " \n</option>"));
}; // call the webview from the plugin


window.setInitialColors = function (colorObj) {
  var isRevert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var colorCode = colorObj.value.slice(0, -2);

  if (isRevert) {
    $("#" + colorObj.name + "-color-preview").css("background", colorCode);
    $("#" + colorObj.name + "-color").val(colorCode);
    $("#" + colorObj.name + "-color-revert").val(colorObj.isColorChanged);

    if (colorObj.isPrimary || isRevert) {
      $("#select-base-color").val(colorCode);
      addHexinInput(colorCode);
      $("#which-color").val(colorObj.name);
      $("#" + colorObj.name + "-icon").css("display", "block");
    }

    if (colorObj.isColorChanged) $("#" + colorObj.name + "-revert").css("display", "block");else $("#" + colorObj.name + "-revert").css("display", "none");

    if (colorCode === "#ffffff") {
      $(".select-base-color-block").css("border", "1px solid rgba(0, 0, 0, 0.2)");
      $("#" + colorObj.name + "-color-preview").css("border", "1px solid rgba(0, 0, 0, 0.2)");
      $("#" + colorObj.name + "-preview-title").css("color", "rgba(0, 0, 0, 0.5)");
      $("#" + colorObj.name + "-color-picker-icon").removeClass("text-white");
      $("#" + colorObj.name + "-color-picker-icon").addClass("text-dark");
      $("#" + colorObj.name + "-revert").removeClass("text-white");
      $("#" + colorObj.name + "-revert").addClass("text-dark");
    } else {
      $(".select-base-color-block").css("border", "none"); // $("#" + colorObj.name + "-color-preview").css("border", "none");

      $("#" + colorObj.name + "-preview-title").css("color", "#ffffff");
      $("#" + colorObj.name + "-color-picker-icon").removeClass("text-dark");
      $("#" + colorObj.name + "-color-picker-icon").addClass("text-white");
      $("#" + colorObj.name + "-revert").removeClass("text-white");
      $("#" + colorObj.name + "-revert").addClass("text-dark");
    }
  } else {
    addHTMLdataForColors(colorObj);

    if (colorObj.isPrimary) {
      $("#select-base-color").val(colorCode);
      addHexinInput(colorCode);
      $("#which-color").val(colorObj.name);
    }

    if (colorCode === "#ffffff") $(".select-base-color-block").css("border", "1px solid rgba(0, 0, 0, 0.2)");else $(".select-base-color-block").css("border", "none");
  }
};

var addHTMLdataForColors = function addHTMLdataForColors(colorObj) {
  var colorCode = colorObj.value.slice(0, -2);
  var isColorIconEnabled = colorObj.isPrimary ? "block" : "none";
  var isColorChanged = colorObj.isColorChanged ? "block" : "none";
  var selectColorPreviewBorder = colorCode === "#ffffff" ? "1px solid rgba(0, 0, 0, 0.2)" : "none";
  var previewTitleColor = colorCode === "#ffffff" ? "rgba(0, 0, 0, 0.5)" : "#ffffff";
  var colorPickerIconClass = colorCode === "#ffffff" ? "text-dark" : "text-white";
  var isChecked = colorObj.isPrimary ? "checked" : "";
  var addHTMLContent = '<li class="color-shades-list-item"><!-- Checkbox - Select Color --> <span class="color-shades-checkbox"><label for="' + colorObj.name + '-checkbox"><input type="checkbox" name="select-color-checkbox" id="' + colorObj.name + '-checkbox" ' + isChecked + ' /><span class="checkbox-style"></span></label></span><!-- Preview & Options --><span class="color-preview-block" id="' + colorObj.name + '-color-preview" style="background: ' + colorCode + "; border: " + selectColorPreviewBorder + '"><!-- Color Name --><span class="color-preview-title" id="' + colorObj.name + '-preview-title" style="color: ' + previewTitleColor + '">' + colorObj.name + '</span><!-- Option - Revert Color --><span title="Revert Edited Color" class="color-revert-icon ' + colorPickerIconClass + '" id="' + colorObj.name + '-revert" style="display: ' + isColorChanged + '"><!-- Icon - Revert Color --><svg width="13" height="15" xmlns="http://www.w3.org/2000/svg"><g><title>Revert</title><path id="svg_1" fill="none" d="m0,0l48,0l0,48l-48,0l0,-48z" /><path fill="currentcolor" stroke="null" id="svg_2" d="m6.5,3.444313l0,-2.703792l-3.37974,3.37974l3.37974,3.37974l0,-2.703792c2.240767,0 4.055687,1.81492 4.055687,4.055687s-1.81492,4.055687 -4.055687,4.055687s-4.055687,-1.81492 -4.055687,-4.055687l-1.351896,0c0,2.98769 2.419893,5.407583 5.407583,5.407583s5.407583,-2.419893 5.407583,-5.407583s-2.419893,-5.407583 -5.407583,-5.407583z"/></g></svg></span><!-- Option - Color Picker --><span class="color-picker-icon" id="' + colorObj.name + '-icon" style="display: ' + isColorIconEnabled + '"><!-- Icon - Color Picker --><svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" id="' + colorObj.name + '-color-picker-icon" class="icon ' + colorPickerIconClass + '"><path fill="currentcolor" d="M14.4103719.627690393C13.6242281-.20906288 12.3495849-.209305076 11.562921.627413597L11.0194828 1.20581272C10.72756.895144197 10.2547294.895144197 9.96283905 1.20581272 9.67088366 1.51623905 9.67088366 2.02004175 9.96283905 2.33046808L10.138903 2.51796254 4.26832743 8.7666591 4.2678073 8.7666591 2.23003607 10.9357337C2.06808064 11.1081082 1.9726043 11.338679 1.96233174 11.5821899L1.95745552 11.6978905C1.95745552 11.6984441 1.95745552 11.6989285 1.95745552 11.6994821L1.8752425 13.6614097C1.87186165 13.7525101 1.90394716 13.8408079 1.96428223 13.9052667 2.02120394 13.9661271 2.09902836 14 2.17981103 14 2.18419963 14 2.18855572 14 2.19346444 13.9997232L3.17078843 13.9536713 3.17130856 13.9536713 3.76679222 13.9254728 4.03719472 13.9128094C4.33636691 13.8985544 4.62052035 13.7654503 4.8326358 13.5399656L12.6637758 5.20526778 12.8102574 5.36113833C12.9562188 5.5164207 13.1474316 5.59409648 13.3385793 5.59409648 13.5297595 5.59409648 13.7210048 5.5164207 13.8669337 5.36113833 14.1588566 5.0506774 14.1588566 4.54687471 13.8669337 4.23648298L14.4103394 3.65804925C15.1965481 2.82133058 15.1965481 1.46468586 14.4103719.627690393zM8.75529259 7.86544704L6.00510601 8.41765438 10.4911609 3.64279089 11.6072296 4.83010586 8.75529259 7.86544704zM2.34400439 14C1.04964153 14 0 14.4475932 0 15.0001713 0 15.5524558 1.04964153 16 2.34400439 16 3.63836725 16 4.6875 15.5525047 4.6875 15.0001713 4.6875 14.4475442 3.63836725 14 2.34400439 14z"/></svg></span><!-- Color Preview Input --><input type="hidden" name="arsenicColors" id="' + colorObj.name + '-color" class="color-preview-input" value="' + colorCode + '" /><!-- Reverted Color Preview Input --><input type="hidden" name="isColorReverted" id="' + colorObj.name + '-color-revert" value="' + colorObj.isColorChanged + '"/></span></li>';
  $("#color-list-ul").append(addHTMLContent);
}; // ion range slider start


var saveResult = function saveResult(data) {
  $("#minLuminence").val(data.from);
  $("#maxLuminence").val(data.to);
};

$(".js-range-slider").ionRangeSlider({
  type: "double",
  min: 0,
  max: 100,
  hide_min_max: true,
  from: 20,
  to: 80,
  postfix: "%",
  onFinish: saveResult
});

(function () {
  var parent = document.querySelector(".range-slider");
  if (!parent) return;
  var rangeS = parent.querySelectorAll("input[type=range]"),
      numberS = parent.querySelectorAll("input[type=number]");
  rangeS.forEach(function (el) {
    el.oninput = function () {
      var slide1 = parseFloat(rangeS[0].value),
          slide2 = parseFloat(rangeS[1].value);

      if (slide1 > slide2) {
        var _ref = [slide2, slide1];
        slide1 = _ref[0];
        slide2 = _ref[1];
      }

      numberS[0].value = slide1;
      numberS[1].value = slide2;
    };
  });
  numberS.forEach(function (el) {
    el.oninput = function () {
      var number1 = parseFloat(numberS[0].value),
          number2 = parseFloat(numberS[1].value);

      if (number1 > number2) {
        var tmp = number1;
        numberS[0].value = number2;
        numberS[1].value = tmp;
      }

      rangeS[0].value = number1;
      rangeS[1].value = number2;
    };
  });
})(); // ion range slider end

/***/ })

/******/ });
//# sourceMappingURL=resources_colors.js.map