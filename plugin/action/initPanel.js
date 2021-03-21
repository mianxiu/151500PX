"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ttest = exports.shortcutsListener = exports.initPanel = void 0;
var compressAndExport = require("./compressAndExport");
var mainPanel = require("./mainpanel");
var app = require("photoshop").app;
var uxpPanel = "#uxp-panel";
var panelMode = {
    main: "main",
    compressExport: "compress-export",
    dupliceVector: "duplice-vector",
};
/**
 * inin when plugin load
 */
function initPanel() {
    upgradeNav();
    upGradePanel();
}
exports.initPanel = initPanel;
function shortcutsListener() {
    /** not support */
}
exports.shortcutsListener = shortcutsListener;
/**
 * @summary initEvent = "false"
 * need add attribute for node
 *
 * @param initEventListener
 */
function initClikcListeners(initEventListener) {
    var listener = [].concat(initEventListener);
    var intervalEvent = setInterval(function () {
        if (document.querySelector("#uxp-panel").innerHTML !== "") {
            for (var i = 0; i < listener.length; i++) {
                var el = listener[i];
                var node = document.querySelector(el.selector);
                var initAttr = node !== null ? node.getAttribute("initEvent") : null;
                if (initAttr === "false") {
                    console.log(el.selector, "initEventListener", true);
                    document.querySelector(el.selector).addEventListener("click", el.listener);
                    node.setAttribute("initEvent", "true");
                }
            }
            clearInterval(intervalEvent);
        }
    }, 1);
}
/**
 * init tab menu
 */
function upgradeNav() {
    var navNode = document.querySelector("#nav");
    var menu = document.querySelector("#sp-menu");
    var menuImg = document.querySelector("#sp-menu>img");
    var navTypeAttr = navNode !== null ? navNode.getAttribute("type") : null;
    console.log(navTypeAttr);
    var menuFunc = function () {
        console.log(1234);
        var navTypeAttr = navNode !== null ? navNode.getAttribute("type") : null;
        /**
         * upgrade icon
         */
        switch (navTypeAttr) {
            case "back":
                menuImg.src = "./icons/svg/general_menu.svg";
                navNode.setAttribute("type", "menu");
                upgradeMain();
                break;
            default:
                break;
        }
    };
    if (navNode.getAttribute("init") === "false") {
        menu.addEventListener("click", menuFunc);
        navNode.setAttribute("init", "true");
    }
    /**
     * upgrade icon
     */
    var upgradeIcons = function () {
        switch (navTypeAttr) {
            case "menu":
                break;
            case "back":
                menuImg.src = "./icons/svg/general_back.svg";
                break;
            default:
                break;
        }
    };
    upgradeIcons();
}
/**
 * insertHtmlFromPath
 */
function insertHtmlFromPath(path) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(path).then(function (response) {
                        return response.text();
                    })];
                case 1:
                    res = _a.sent();
                    document.querySelector(uxpPanel).innerHTML = res;
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * init panel and addEventListener
 */
function upGradePanel() {
    return __awaiter(this, void 0, void 0, function () {
        var panel;
        return __generator(this, function (_a) {
            panel = document.querySelector(uxpPanel).getAttribute("panel");
            switch (panel) {
                case panelMode.main:
                    upgradeMain();
                    break;
                case panelMode.compressExport:
                    upgradeCompressExport();
                    break;
                case panelMode.dupliceVector:
                    upgradeDupliceVector();
                    break;
                default:
                    break;
            }
            return [2 /*return*/];
        });
    });
}
/**
 * add listener for main panel
 */
function upgradeMain() {
    return __awaiter(this, void 0, void 0, function () {
        var initBlackMetal, initBlackMetalFunc, initWhiteMetal, initWhiteMetalFunc, compressExport, compressExportFunc;
        return __generator(this, function (_a) {
            insertHtmlFromPath("./panel/main.html");
            initBlackMetal = "#init-black-metal";
            initBlackMetalFunc = function () {
                mainPanel.fff();
                console.log("initblackmetal");
            };
            initWhiteMetal = "#init-white-metal";
            initWhiteMetalFunc = function () { };
            compressExport = "#compress-export";
            compressExportFunc = function () {
                document.querySelector("#nav").setAttribute("type", "back");
                document.querySelector(uxpPanel).setAttribute("panel", panelMode.compressExport);
                upgradeNav();
                upGradePanel();
                compressAndExport.fuck();
            };
            /**
             *
             */
            initClikcListeners([
                { selector: initBlackMetal, listener: initBlackMetalFunc },
                { selector: initWhiteMetal, listener: initWhiteMetalFunc },
                { selector: compressExport, listener: compressExportFunc },
            ]);
            return [2 /*return*/];
        });
    });
}
/**
 *
 */
function upgradeCompressExport() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            upgradeNav();
            insertHtmlFromPath("./panel/compressAndexport.html");
            return [2 /*return*/];
        });
    });
}
function upgradeDupliceVector() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
var Ttest = function () {
    console.log("onclick");
};
exports.Ttest = Ttest;
