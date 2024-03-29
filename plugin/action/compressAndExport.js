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
exports.exportFuckingWork = exports.drawRuler = exports.mergeMainToSmartObjectUnCompress = exports.mergeMainToSmartObjectCompress = void 0;
var layerComponent = require("../module/layercomponent");
var names = require("../module/names");
var folder = require("../module/floder");
var save = require("../module/save");
var text = require("../module/text");
var app = require('photoshop').app;
var fuckingExportSize = 1500;
var fuckingMargin = 20;
// 2021/1/18 解决，是app.activeDocument 获取错误
/**
 * 2021/1/20
 * 想要裁剪透明图层到主体和完美应用各种效果，需要拼合可见图层/图像
 * 2021/1/22
 * 细节图命名为--MAIN--DETAIL--
 * 不保留margin/直接缩放，通过判断大小
 *
 */
function mergeMainToSmartObjectCompress() {
    return __awaiter(this, void 0, void 0, function () {
        var activeDocument, layerSize, _a, _b, layerBounds;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    activeDocument = layerComponent.activeDocument();
                    // select layer by name has problem
                    return [4 /*yield*/, layerComponent.selectLayerByName("MAIN", true)];
                case 1:
                    // select layer by name has problem
                    _c.sent();
                    return [4 /*yield*/, drawRuler()];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectLayerByName("MAIN", true)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectChannel()
                        /**对于正常的mask会有锯齿 */
                        //await layerComponent.levels();
                    ];
                case 4:
                    _c.sent();
                    /**对于正常的mask会有锯齿 */
                    //await layerComponent.levels();
                    return [4 /*yield*/, layerComponent.deSelect()];
                case 5:
                    /**对于正常的mask会有锯齿 */
                    //await layerComponent.levels();
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectAllLayersOnTarget(true, true)];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.hideLayers()];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectLayerByName("MAIN", true)];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectAllLayersOnTarget(false, false, true)];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.mergeVisible()];
                case 10:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.convertToSmartObject()];
                case 11:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.rasterizeTargetLayer()];
                case 12:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.mergeLayerNew()];
                case 13:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.convertToSmartObject()];
                case 14:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.setLayerName(names.__DO_ACTION__)];
                case 15:
                    _c.sent();
                    _b = (_a = layerComponent).getElementSize;
                    return [4 /*yield*/, activeDocument.activeLayers[0]];
                case 16: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                case 17:
                    layerSize = _c.sent();
                    layerBounds = layerComponent.activeDocument()
                        .activeLayers[0].bounds;
                    if (!((layerBounds.bottom >= activeDocument.height ||
                        layerBounds.left <= 0 ||
                        layerBounds.right >= activeDocument.width ||
                        layerBounds.top <= 0) &&
                        Math.abs(activeDocument.height - activeDocument.width) <= 1)) return [3 /*break*/, 19];
                    console.log(layerBounds);
                    console.log(names.__MAIN_DETAIL__ + " MODE");
                    return [4 /*yield*/, activeDocument.resizeImage(fuckingExportSize, fuckingExportSize)];
                case 18:
                    _c.sent();
                    return [3 /*break*/, 29];
                case 19:
                    if (!(layerBounds.bottom >= activeDocument.height ||
                        layerBounds.left <= 0 ||
                        layerBounds.right >= activeDocument.width ||
                        layerBounds.top <= 0)) return [3 /*break*/, 24];
                    console.log("fix resize rectangle detail image");
                    console.log(layerBounds);
                    console.log(layerSize);
                    console.log(activeDocument.width + "-" + activeDocument.height);
                    if (!(activeDocument.height > activeDocument.width)) return [3 /*break*/, 21];
                    return [4 /*yield*/, activeDocument.resizeImage(fuckingExportSize, activeDocument.height * (fuckingExportSize / activeDocument.width))];
                case 20:
                    _c.sent();
                    return [3 /*break*/, 23];
                case 21: return [4 /*yield*/, activeDocument.resizeImage(activeDocument.width * (fuckingExportSize / activeDocument.height), fuckingExportSize)];
                case 22:
                    _c.sent();
                    _c.label = 23;
                case 23: return [3 /*break*/, 29];
                case 24:
                    if (!(layerSize.height >= fuckingExportSize ||
                        layerSize.width >= fuckingExportSize)) return [3 /*break*/, 27];
                    // console.log(layerBounds)
                    // console.log(layerSize)
                    // console.log(`${activeDocument.width}-${activeDocument.height}`)
                    console.log(names.__MAIN__ + " SIZE > " + fuckingExportSize);
                    return [4 /*yield*/, layerComponent.cropToSquare(fuckingMargin)];
                case 25:
                    _c.sent();
                    return [4 /*yield*/, activeDocument.resizeImage(fuckingExportSize, fuckingExportSize)];
                case 26:
                    _c.sent();
                    return [3 /*break*/, 29];
                case 27:
                    if (!(layerSize.height < fuckingExportSize &&
                        layerSize.width < fuckingExportSize)) return [3 /*break*/, 29];
                    // console.log(layerBounds)
                    // console.log(layerSize)
                    // console.log(`${activeDocument.width}-${activeDocument.height}`)
                    console.log(names.__MAIN__ + " SIZE < " + fuckingExportSize);
                    return [4 /*yield*/, layerComponent.cropToSize(fuckingExportSize, fuckingExportSize)];
                case 28:
                    _c.sent();
                    _c.label = 29;
                case 29: 
                /**
                 * save SIZE layer, if it has, drawRuler
                 */
                return [4 /*yield*/, layerComponent.deleteAllUnVisibleLayers(["^" + names.__SIZE__])];
                case 30:
                    /**
                     * save SIZE layer, if it has, drawRuler
                     */
                    _c.sent();
                    return [4 /*yield*/, layerComponent.convertToSrgbProfile(true)];
                case 31:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.createBGLayer()];
                case 32:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.fillWhite()
                        /**
                         * re reasterize smart layer can zip file
                         */
                    ];
                case 33:
                    _c.sent();
                    /**
                     * re reasterize smart layer can zip file
                     */
                    return [4 /*yield*/, layerComponent.selectLayerByName(names.__DO_ACTION__)];
                case 34:
                    /**
                     * re reasterize smart layer can zip file
                     */
                    _c.sent();
                    return [4 /*yield*/, layerComponent.rasterizeTargetLayer()];
                case 35:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.convertToSmartObject()];
                case 36:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mergeMainToSmartObjectCompress = mergeMainToSmartObjectCompress;
function mergeMainToSmartObjectUnCompress() {
    return __awaiter(this, void 0, void 0, function () {
        var activeDocument, layerSize, _a, _b, layerBounds;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    activeDocument = layerComponent.activeDocument();
                    // select layer by name has problem
                    return [4 /*yield*/, layerComponent.selectLayerByName("MAIN", true)
                        /**对于正常的mask会有锯齿 */
                        //await layerComponent.levels();
                    ];
                case 1:
                    // select layer by name has problem
                    _c.sent();
                    /**对于正常的mask会有锯齿 */
                    //await layerComponent.levels();
                    return [4 /*yield*/, layerComponent.deSelect()];
                case 2:
                    /**对于正常的mask会有锯齿 */
                    //await layerComponent.levels();
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectAllLayersOnTarget(true, true)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.hideLayers()];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectLayerByName("MAIN", true)];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectAllLayersOnTarget(false, false, true)];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.convertToSrgbProfile(false)];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.convertToSmartObject()];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.setLayerName(names.__DO_ACTION__)];
                case 9:
                    _c.sent();
                    _b = (_a = layerComponent).getElementSize;
                    return [4 /*yield*/, activeDocument.activeLayers[0]];
                case 10: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                case 11:
                    layerSize = _c.sent();
                    layerBounds = layerComponent.activeDocument()
                        .activeLayers[0].bounds;
                    if (!((layerBounds.bottom >= activeDocument.height ||
                        layerBounds.left <= 0 ||
                        layerBounds.right >= activeDocument.width ||
                        layerBounds.top <= 0) &&
                        Math.abs(activeDocument.height - activeDocument.width) <= 1)) return [3 /*break*/, 13];
                    console.log(names.__MAIN_DETAIL__ + " MODE");
                    return [4 /*yield*/, activeDocument.resizeImage(fuckingExportSize, fuckingExportSize)];
                case 12:
                    _c.sent();
                    return [3 /*break*/, 23];
                case 13:
                    if (!(layerBounds.bottom >= activeDocument.height ||
                        layerBounds.left <= 0 ||
                        layerBounds.right >= activeDocument.width ||
                        layerBounds.top <= 0)) return [3 /*break*/, 18];
                    if (!(activeDocument.height > activeDocument.width)) return [3 /*break*/, 15];
                    return [4 /*yield*/, activeDocument.resizeImage(fuckingExportSize, activeDocument.height * (fuckingExportSize / activeDocument.width))];
                case 14:
                    _c.sent();
                    return [3 /*break*/, 17];
                case 15: return [4 /*yield*/, activeDocument.resizeImage(activeDocument.width * (fuckingExportSize / activeDocument.height), fuckingExportSize)];
                case 16:
                    _c.sent();
                    _c.label = 17;
                case 17: return [3 /*break*/, 23];
                case 18:
                    if (!(layerSize.height > fuckingExportSize ||
                        layerSize.width > fuckingExportSize)) return [3 /*break*/, 21];
                    console.log(names.__MAIN__ + " SIZE > " + fuckingExportSize);
                    return [4 /*yield*/, layerComponent.cropToSquare(fuckingMargin)];
                case 19:
                    _c.sent();
                    return [4 /*yield*/, activeDocument.resizeImage(fuckingExportSize, fuckingExportSize)];
                case 20:
                    _c.sent();
                    return [3 /*break*/, 23];
                case 21:
                    if (!(layerSize.height < fuckingExportSize &&
                        layerSize.width < fuckingExportSize)) return [3 /*break*/, 23];
                    console.log(names.__MAIN__ + " SIZE < " + fuckingExportSize);
                    return [4 /*yield*/, layerComponent.cropToSize(fuckingExportSize, fuckingExportSize)];
                case 22:
                    _c.sent();
                    _c.label = 23;
                case 23: return [4 /*yield*/, layerComponent.deleteAllUnVisibleLayers(["^" + names.__SIZE__])];
                case 24:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.createBGLayer()];
                case 25:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.fillWhite()];
                case 26:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectLayerByName(names.__DO_ACTION__)];
                case 27:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mergeMainToSmartObjectUnCompress = mergeMainToSmartObjectUnCompress;
function drawRuler() {
    return __awaiter(this, void 0, void 0, function () {
        var acitveDocumet, sizeSelect, layerName, size, layerBounds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, layerComponent.activeDocument()];
                case 1:
                    acitveDocumet = _a.sent();
                    return [4 /*yield*/, layerComponent.selectLayerByName("^" + names.__SIZE__ + ".*", false, false, true)];
                case 2:
                    sizeSelect = _a.sent();
                    return [4 /*yield*/, acitveDocumet.activeLayers[0].name];
                case 3:
                    layerName = _a.sent();
                    return [4 /*yield*/, text.convertSizeString(layerName, "in", "")];
                case 4:
                    size = _a.sent();
                    console.log(size);
                    if (size === undefined) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, layerComponent.activeDocument()];
                case 5:
                    acitveDocumet = _a.sent();
                    return [4 /*yield*/, layerComponent.selectLayerByName(names.__DO_ACTION__)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, layerComponent.activeDocument()
                            .activeLayers[0].bounds];
                case 7:
                    layerBounds = _a.sent();
                    return [4 /*yield*/, layerComponent.createSizeRuler(size, { width: 116, height: 18 }, layerBounds, "000000", 10, { width: acitveDocumet.width, height: acitveDocumet.height }, fuckingMargin)];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.drawRuler = drawRuler;
/**
 * todo
 * pick folder and compress to 1500x1500, export jpg and tif
 */
function exportFuckingWork(compress) {
    if (compress === void 0) { compress = true; }
    return __awaiter(this, void 0, void 0, function () {
        var pickTips, pickFolder, _a, _b, _c;
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
                    pickTips = compress === true
                        ? 'please pick folder'
                        : 'pick folder (un compress mode)';
                    return [4 /*yield*/, app.createDocument({
                            name: pickTips,
                            width: 1,
                            height: 1,
                            resolution: 1,
                            mode: 'RGBColorMode',
                            fill: 'transparent',
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
                    if (!(pickFolder !== null)) return [3 /*break*/, 8];
                    _c = (_b = folder).createExportFolderOnRoot;
                    return [4 /*yield*/, folder.getAllSubFoldersPath(pickFolder)];
                case 6: return [4 /*yield*/, _c.apply(_b, [_d.sent(), true, function (entryPath) { return __awaiter(_this, void 0, void 0, function () {
                            var jpegFolderSymbol, tiffFolderSymbol;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(app.documents.length < 2)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, app.open(entryPath.entrySymbol)
                                            /**
                                             * do something
                                             */
                                        ];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        if (!(compress === false)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, mergeMainToSmartObjectUnCompress()];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 6];
                                    case 4: return [4 /*yield*/, mergeMainToSmartObjectCompress()];
                                    case 5:
                                        _a.sent();
                                        _a.label = 6;
                                    case 6: return [4 /*yield*/, folder.createSubPathFolder(pickFolder, "" + entryPath.exportRoot + entryPath.relateivePath)];
                                    case 7:
                                        jpegFolderSymbol = _a.sent();
                                        return [4 /*yield*/, save.saveToJPEG(jpegFolderSymbol, entryPath.entrySymbol.name)
                                            /**
                                             * export tif
                                             */
                                        ];
                                    case 8:
                                        _a.sent();
                                        return [4 /*yield*/, folder.createSubPathFolder(pickFolder, "" + entryPath.exportRoot + entryPath.relateivePath + entryPath.relateivePath.replace(/.*([\\|\/]).*/gm, '$1TIFF'))];
                                    case 9:
                                        tiffFolderSymbol = _a.sent();
                                        return [4 /*yield*/, save.saveToTiff(tiffFolderSymbol, entryPath.entrySymbol.name)];
                                    case 10:
                                        _a.sent();
                                        return [4 /*yield*/, app.activeDocument.close()];
                                    case 11:
                                        _a.sent();
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
exports.exportFuckingWork = exportFuckingWork;
