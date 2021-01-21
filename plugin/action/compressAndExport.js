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
exports.fuck = exports.mergeMainToSmartObject = void 0;
var component = require("../module/component");
var names = require("../module/names");
var folder = require("../module/floder");
var save = require("../module/save");
var app = require("photoshop").app;
var fuckingExportSize = 1500;
var fuckingMargin = 20;
// 2021/1/18 解决，是app.activeDocument 获取错误
/**
 * TODO 2021/1/20
 * 想要裁剪透明图层到主体和完美应用各种效果，需要拼合可见图层/图像
 *
 */
function mergeMainToSmartObject() {
    return __awaiter(this, void 0, void 0, function () {
        var acitveDocumet, layerSize, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    acitveDocumet = component.activeDocument();
                    // select layer by name has problem
                    return [4 /*yield*/, component.selectLayerByName("MAIN", true)];
                case 1:
                    // select layer by name has problem
                    _d.sent();
                    return [4 /*yield*/, component.mergeLayerNew()];
                case 2:
                    _d.sent();
                    return [4 /*yield*/, component.selectAllLayersOnTarget(true, true)];
                case 3:
                    _d.sent();
                    return [4 /*yield*/, component.hideLayers()];
                case 4:
                    _d.sent();
                    return [4 /*yield*/, component.selectLayerByName("MAIN", true)];
                case 5:
                    _d.sent();
                    return [4 /*yield*/, component.selectAllLayersOnTarget()];
                case 6:
                    _d.sent();
                    return [4 /*yield*/, component.mergeLayerNew()];
                case 7:
                    _d.sent();
                    return [4 /*yield*/, component.createLayer('123')];
                case 8:
                    _d.sent();
                    return [4 /*yield*/, component.selectLayerByName(names.__DO_ACTION__)];
                case 9:
                    _d.sent();
                    return [4 /*yield*/, component.selectAllLayersOnTarget()];
                case 10:
                    _d.sent();
                    return [4 /*yield*/, component.mergeVisible()];
                case 11:
                    _d.sent();
                    return [4 /*yield*/, component.selectAllLayersOnTarget()];
                case 12:
                    _d.sent();
                    return [4 /*yield*/, component.convertToSmartObject()];
                case 13:
                    _d.sent();
                    return [4 /*yield*/, component.rasterizeTargetLayer()];
                case 14:
                    _d.sent();
                    return [4 /*yield*/, component.mergeLayerNew()];
                case 15:
                    _d.sent();
                    return [4 /*yield*/, component.convertToSmartObject()];
                case 16:
                    _d.sent();
                    return [4 /*yield*/, component.setLayerName(names.__DO_ACTION__)];
                case 17:
                    _d.sent();
                    _b = (_a = component).getElementSize;
                    return [4 /*yield*/, acitveDocumet.activeLayers[0]];
                case 18: return [4 /*yield*/, _b.apply(_a, [_d.sent()])];
                case 19:
                    layerSize = _d.sent();
                    console.log(layerSize.width, layerSize.height);
                    if (!(layerSize.height < fuckingExportSize && layerSize.width < fuckingExportSize)) return [3 /*break*/, 21];
                    return [4 /*yield*/, component.cropToSize(fuckingExportSize, fuckingExportSize)];
                case 20:
                    _d.sent();
                    return [3 /*break*/, 24];
                case 21: return [4 /*yield*/, component.cropToSquare(fuckingMargin)];
                case 22:
                    _d.sent();
                    return [4 /*yield*/, acitveDocumet.resizeImage(fuckingExportSize, fuckingExportSize)];
                case 23:
                    _d.sent();
                    _d.label = 24;
                case 24: return [4 /*yield*/, component.createBGLayer()];
                case 25:
                    _d.sent();
                    return [4 /*yield*/, component.selectAllLayersOnTarget()];
                case 26:
                    _d.sent();
                    _c = acitveDocumet.layers[0];
                    return [4 /*yield*/, false];
                case 27:
                    _c.selected = _d.sent(); // unselected --DO-ACTION--
                    return [4 /*yield*/, component.mergeLayerNew()];
                case 28:
                    _d.sent();
                    return [4 /*yield*/, component.fillWhite()];
                case 29:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mergeMainToSmartObject = mergeMainToSmartObject;
function fuck() {
    return __awaiter(this, void 0, void 0, function () {
        var pickFolder, _a, _b, _c;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    app.documents.map(function (d) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, d.close()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    if (!(app.documents.length < 1)) return [3 /*break*/, 2];
                    return [4 /*yield*/, app.createDocument({
                            name: "please pick folder",
                            width: 1,
                            height: 1,
                            resolution: 1,
                            mode: "RGBColorMode",
                            fill: "transparent",
                        })];
                case 1:
                    _d.sent();
                    _d.label = 2;
                case 2:
                    if (!(app.documents.length === 1)) return [3 /*break*/, 4];
                    return [4 /*yield*/, folder.pickFolder()];
                case 3:
                    _a = _d.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = null;
                    _d.label = 5;
                case 5:
                    pickFolder = _a;
                    console.log(pickFolder);
                    if (!(pickFolder !== null)) return [3 /*break*/, 8];
                    console.log("do create");
                    _c = (_b = folder).createExportFolderOnRoot;
                    return [4 /*yield*/, folder.getAllSubFoldersPath(pickFolder)];
                case 6: return [4 /*yield*/, _c.apply(_b, [_d.sent(), true, function (entryPath) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, jpegFolderSymbol, tiffFolderSymbol;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _b = (_a = console).log;
                                        return [4 /*yield*/, folder.getAllSubFoldersPath(pickFolder)];
                                    case 1:
                                        _b.apply(_a, [_c.sent()]);
                                        if (!(app.documents.length < 2)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, app.open(entryPath.entrySymbol)];
                                    case 2:
                                        _c.sent();
                                        _c.label = 3;
                                    case 3: 
                                    // do something
                                    return [4 /*yield*/, mergeMainToSmartObject()];
                                    case 4:
                                        // do something
                                        _c.sent();
                                        return [4 /*yield*/, folder.createSubPathFolder(pickFolder, "" + entryPath.exportRoot + entryPath.relateivePath)];
                                    case 5:
                                        jpegFolderSymbol = _c.sent();
                                        return [4 /*yield*/, save.saveToJPEG(jpegFolderSymbol, entryPath.entrySymbol.name)];
                                    case 6:
                                        _c.sent();
                                        return [4 /*yield*/, folder.createSubPathFolder(pickFolder, "" + entryPath.exportRoot + entryPath.relateivePath + entryPath.relateivePath.replace(/.*([\\|\/]).*/gm, "$1TIFF"))];
                                    case 7:
                                        tiffFolderSymbol = _c.sent();
                                        return [4 /*yield*/, save.saveToTiff(tiffFolderSymbol, entryPath.entrySymbol.name)];
                                    case 8:
                                        _c.sent();
                                        return [4 /*yield*/, app.activeDocument.close()];
                                    case 9:
                                        _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }])];
                case 7:
                    _d.sent();
                    _d.label = 8;
                case 8:
                    app.documents.map(function (d) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, d.close()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    return [2 /*return*/];
            }
        });
    });
}
exports.fuck = fuck;
