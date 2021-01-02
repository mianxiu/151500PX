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
exports.moveLayerToDocTop = exports.seletAllLayersOnTarget = exports.cropToSquare = exports.cropToMargin = exports.deleteAllEmptyLayers = void 0;
var batchPlayConfig = require("./batchplayconfig");
var app = require("photoshop").app;
var fs = require("uxp").storage.localFileSystem;
var batchPlay = require("photoshop").action.batchPlay;
var doc = app.activeDocument;
function showLayerNames() {
    var allLayers = app.activeDocument.layers;
    // const allLayerNames = allLayers.map(layer => layer.name);
    // const sortedNames = allLayerNames.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    console.log(allLayers[0]);
    return allLayers[0].bounds.right;
}
function useFolder() {
    return __awaiter(this, void 0, void 0, function () {
        var userFolder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.getFolder()];
                case 1:
                    userFolder = _a.sent();
                    return [2 /*return*/, userFolder.name];
            }
        });
    });
}
/**
 * if have nothing,is empty layer
 * @param bounds rectangle size of something in layer,base document left-top point, {left,top,right,bottom}
 */
function isEmptyLayer(bounds) {
    var zero = bounds.left + bounds.top + bounds.right + bounds.bottom;
    return zero === 0 ? true : false;
}
/**
 * get element rectangle size
 * @param layer layer
 */
function getElementSize(layer) {
    var layerBounds = layer.bounds;
    var boundsLeft = layerBounds.left;
    var boundsTop = layerBounds.top;
    var boundsRight = layerBounds.right;
    var boundsBottom = layerBounds.bottom;
    var elementWidth = boundsRight - boundsLeft;
    var elementHeight = boundsBottom - boundsTop;
    var elementSize = {
        width: 0,
        height: 0
    };
    return elementSize = { width: elementWidth, height: elementHeight };
}
/**
 * decide element is vertcal or horizontal
 * @param elementSize
 */
function isVertical(elementSize) {
    if (elementSize.height > elementSize.width) {
        return true;
    }
    else if (elementSize.height < elementSize.width) {
        return false;
    }
    return null;
}
/**
 * delete all empty layer
 */
function deleteAllEmptyLayers() {
    // layer lock is can't delete
    // use bounds to find empty layer
    var _this = this;
    var layers = doc.layers;
    layers.map(function (layer) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!isEmptyLayer(layer.bounds)) return [3 /*break*/, 5];
                    if (!layer.locked) return [3 /*break*/, 3];
                    _a = layer;
                    return [4 /*yield*/, true];
                case 1:
                    _a.selected = _c.sent();
                    _b = layer;
                    return [4 /*yield*/, false];
                case 2:
                    _b.locked = _c.sent();
                    _c.label = 3;
                case 3: return [4 /*yield*/, layer.delete()];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
}
exports.deleteAllEmptyLayers = deleteAllEmptyLayers;
/**
 * crop document size to layer bounds, now only for a layer
 * @param margin maring to document boundary
 */
function cropToMargin(margin) {
    var layerBounds = doc.activeLayers.length === 1 ? doc.activeLayers[0].bounds : null;
    var cropBounds = { left: 0, top: 0, right: 0, bottom: 0 };
    cropBounds = {
        left: layerBounds.left - margin,
        top: layerBounds.top - margin,
        right: layerBounds.right + margin,
        bottom: layerBounds.bottom + margin
    };
    doc.crop(cropBounds, 0);
}
exports.cropToMargin = cropToMargin;
/**
 * crop document size to base layer bounds's square, now only for a layer
 * @param margin
 */
function cropToSquare(margin) {
    //todo
    //something
    var layer = doc.activeLayers.length === 1 ? doc.activeLayers[0] : null;
    var layerBounds = layer !== null ? layer.bounds : null;
    var layerSize = getElementSize(layer);
    layerBounds = isVertical(layerSize) ?
        {
            left: layerBounds.left - (layerSize.height - layerSize.width) / 2,
            top: layerBounds.top,
            right: layerBounds.right + (layerSize.height - layerSize.width) / 2,
            bottom: layerBounds.bottom
        } :
        {
            left: layerBounds.left,
            top: layerBounds.top - (layerSize.width - layerSize.height) / 2,
            right: layerBounds.right,
            bottom: layerBounds.bottom + (layerSize.width - layerSize.height) / 2
        };
    var cropBounds = {
        left: layerBounds.left - margin,
        top: layerBounds.top - margin, right: layerBounds.right + margin,
        bottom: layerBounds.bottom + margin
    };
    doc.crop(cropBounds);
}
exports.cropToSquare = cropToSquare;
function seletAllLayersOnTarget() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, batchPlay([
                        {
                            _obj: "move",
                            _target: [{ _ref: "layer", _name: doc.layers[0].name }],
                            selectionModifier: batchPlayConfig.selectionModifier.addToSelection
                        }
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.seletAllLayersOnTarget = seletAllLayersOnTarget;
/**
 * use batchplay to move layer to document layers top index
 */
function moveLayerToDocTop() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, batchPlay([{
                            "_obj": "move",
                            "_target": batchPlayConfig._targetSeletLayers,
                            "to": {
                                "_ref": "layer",
                                "_index": doc.layers.length + 2
                            },
                            "adjustment": false,
                        }], batchPlayConfig.defaultOptions)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.moveLayerToDocTop = moveLayerToDocTop;
