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
var layerComponent = require("../module/layercomponent");
var names = require("../module/names");
var folder = require("../module/floder");
var save = require("../module/save");
var app = require("photoshop").app;
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
function mergeMainToSmartObject() {
    return __awaiter(this, void 0, void 0, function () {
        var acitveDocumet, layerSize, _a, _b, layerBounds;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    acitveDocumet = layerComponent.activeDocument();
                    // select layer by name has problem
                    return [4 /*yield*/, layerComponent.selectLayerByName("MAIN", true)];
                case 1:
                    // select layer by name has problem
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectChannel()];
                case 2:
                    _c.sent();
                    /**对于正常的mask会有锯齿 */
                    //await layerComponent.levels();
                    return [4 /*yield*/, layerComponent.deSelect()];
                case 3:
                    /**对于正常的mask会有锯齿 */
                    //await layerComponent.levels();
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectAllLayersOnTarget(true, true)];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.hideLayers()];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectLayerByName("MAIN", true)];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.selectAllLayersOnTarget(false, false, true)];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.mergeVisible()];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.convertToSmartObject()];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.rasterizeTargetLayer()];
                case 10:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.mergeLayerNew()];
                case 11:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.convertToSmartObject()];
                case 12:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.setLayerName(names.__DO_ACTION__)];
                case 13:
                    _c.sent();
                    _b = (_a = layerComponent).getElementSize;
                    return [4 /*yield*/, acitveDocumet.activeLayers[0]];
                case 14: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                case 15:
                    layerSize = _c.sent();
                    layerBounds = layerComponent.activeDocument().activeLayers[0].bounds;
                    if (!((layerBounds.bottom >= 0 || layerBounds.left >= 0 || layerBounds.right >= 0 || layerBounds.top >= 0) &&
                        acitveDocumet.height === acitveDocumet.width)) return [3 /*break*/, 17];
                    console.log(names.__MAIN_DETAIL__ + " MODE");
                    return [4 /*yield*/, acitveDocumet.resizeImage(fuckingExportSize, fuckingExportSize)];
                case 16:
                    _c.sent();
                    return [3 /*break*/, 22];
                case 17:
                    if (!(layerSize.height > fuckingExportSize || layerSize.width > fuckingExportSize)) return [3 /*break*/, 20];
                    console.log(names.__MAIN__ + " SIZE > " + fuckingExportSize);
                    return [4 /*yield*/, layerComponent.cropToSquare(fuckingMargin)];
                case 18:
                    _c.sent();
                    return [4 /*yield*/, acitveDocumet.resizeImage(fuckingExportSize, fuckingExportSize)];
                case 19:
                    _c.sent();
                    return [3 /*break*/, 22];
                case 20:
                    if (!(layerSize.height < fuckingExportSize && layerSize.width < fuckingExportSize)) return [3 /*break*/, 22];
                    console.log(names.__MAIN__ + " SIZE < " + fuckingExportSize);
                    return [4 /*yield*/, layerComponent.cropToSize(fuckingExportSize, fuckingExportSize)];
                case 21:
                    _c.sent();
                    _c.label = 22;
                case 22: return [4 /*yield*/, layerComponent.deleteAllUnVisibleLayers()];
                case 23:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.createBGLayer()];
                case 24:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.fillWhite()];
                case 25:
                    _c.sent();
                    /**
                     * re reasterize smart layer can zip file
                     */
                    return [4 /*yield*/, layerComponent.selectLayerByName(names.__DO_ACTION__)];
                case 26:
                    /**
                     * re reasterize smart layer can zip file
                     */
                    _c.sent();
                    return [4 /*yield*/, layerComponent.rasterizeTargetLayer()];
                case 27:
                    _c.sent();
                    return [4 /*yield*/, layerComponent.convertToSmartObject()];
                case 28:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mergeMainToSmartObject = mergeMainToSmartObject;
/**
 * todo
 * pick folder and compress to 1500x1500, export jpg and tif
 */
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
                    if (!(pickFolder !== null)) return [3 /*break*/, 8];
                    _c = (_b = folder).createExportFolderOnRoot;
                    return [4 /*yield*/, folder.getAllSubFoldersPath(pickFolder)];
                case 6: return [4 /*yield*/, _c.apply(_b, [_d.sent(), true, function (entryPath) { return __awaiter(_this, void 0, void 0, function () {
                            var jpegFolderSymbol, tiffFolderSymbol;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(app.documents.length < 2)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, app.open(entryPath.entrySymbol)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: 
                                    /**
                                     * do something
                                     */
                                    return [4 /*yield*/, mergeMainToSmartObject()];
                                    case 3:
                                        /**
                                         * do something
                                         */
                                        _a.sent();
                                        return [4 /*yield*/, folder.createSubPathFolder(pickFolder, "" + entryPath.exportRoot + entryPath.relateivePath)];
                                    case 4:
                                        jpegFolderSymbol = _a.sent();
                                        return [4 /*yield*/, save.saveToJPEG(jpegFolderSymbol, entryPath.entrySymbol.name)];
                                    case 5:
                                        _a.sent();
                                        return [4 /*yield*/, folder.createSubPathFolder(pickFolder, "" + entryPath.exportRoot + entryPath.relateivePath + entryPath.relateivePath.replace(/.*([\\|\/]).*/gm, "$1TIFF"))];
                                    case 6:
                                        tiffFolderSymbol = _a.sent();
                                        return [4 /*yield*/, save.saveToTiff(tiffFolderSymbol, entryPath.entrySymbol.name)];
                                    case 7:
                                        _a.sent();
                                        return [4 /*yield*/, app.activeDocument.close()];
                                    case 8:
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
exports.fuck = fuck;
