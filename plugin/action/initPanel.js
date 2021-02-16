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
exports.initPanel = void 0;
var app = require("photoshop").app;
var uxpPanel = "#uxp-panel";
var panelMode = {
    main: "main",
    compressExport: "compress-export",
    dupliceVector: "duplice-vector",
};
/**
 * if node Attribute initEvent === `false`
 * add listener fo nodes
 * @param selector
 * @param listener
 */
function initEventListeners(initEventListener) {
    var listener = [].concat(initEventListener);
    var intervalEvent = setInterval(function () {
        for (var i = 0; i < listener.length; i++) {
            var element = listener[i];
            var node = document.querySelector(element.selector);
            var initAttr = node !== null ? node.getAttribute("initEvent") : null;
            if (initAttr === "false") {
                console.log(element.selector, true);
                document.querySelector(element.selector).addEventListener("click", element.listener);
                node.setAttribute("initEvent", "true");
            }
            if (i >= listener.length) {
                clearInterval(intervalEvent);
            }
        }
    }, 1);
}
/**
 * init tab menu
 */
function initTab() { }
/**
 * init main panel
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
function initPanel() {
    return __awaiter(this, void 0, void 0, function () {
        var panel;
        return __generator(this, function (_a) {
            console.log(app.currentTool);
            panel = document.querySelector(uxpPanel).getAttribute("panel");
            console.log(panel);
            switch (panel) {
                case panelMode.main:
                    initMain();
                    break;
                case panelMode.compressExport:
                    initCompressExport();
                    break;
                case panelMode.dupliceVector:
                    initDupliceVector();
                    break;
                default:
                    break;
            }
            return [2 /*return*/];
        });
    });
}
exports.initPanel = initPanel;
/**
 * add listener for main panel
 */
function initMain() {
    return __awaiter(this, void 0, void 0, function () {
        var initTip, initBlackMetal, initWhiteMetal, compressExport, initTipFunc, initBlackMetalFunc, initWhiteMetalFunc, compressExportFunc, events;
        return __generator(this, function (_a) {
            insertHtmlFromPath("./panel/main.html");
            initTip = "#init-tip";
            initBlackMetal = "#init-black-metal";
            initWhiteMetal = "#init-white-metal";
            compressExport = "#compress-export";
            initTipFunc = function () { };
            initBlackMetalFunc = function () { };
            initWhiteMetalFunc = function () { };
            compressExportFunc = function () {
                console.log(123);
                document.querySelector(uxpPanel).setAttribute("panel", panelMode.compressExport);
                initPanel();
            };
            events = [
                { selector: initTip, listener: initTipFunc },
                { selector: initBlackMetal, listener: initBlackMetalFunc },
                { selector: initWhiteMetal, listener: initWhiteMetalFunc },
                { selector: compressExport, listener: compressExportFunc },
            ];
            initEventListeners(events);
            return [2 /*return*/];
        });
    });
}
/**
 *
 */
function initCompressExport() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            insertHtmlFromPath("./panel/compressAndexport.html");
            return [2 /*return*/];
        });
    });
}
function initDupliceVector() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
