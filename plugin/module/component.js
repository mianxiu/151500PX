"use strict";
/**
 * batchPlay index is bottom to top
 * js index is top to bottom
 */
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
exports.fillWhite = exports.createBGLayer = exports.setLayerName = exports.rasterizeTargetLayer = exports.mergeLayerNew = exports.mergeLayers = exports.convertToSmartObject = exports.moveLayerToParentTop = exports.moveLayerToDocTop = exports.selectAllLayersOnTarget = exports.selectLayerByName = exports.cropToSize = exports.cropToSquare = exports.cropToMargin = exports.deleteAllLayersExcludeTarget = exports.deleteAllEmptyLayers = exports.isVertical = exports.getElementSize = exports.isEmptyLayer = exports.activeDocument = void 0;
var batchPlayConfig = require("./batchplayconfig");
var names = require("./names");
var app = require("photoshop").app;
var batchPlay = require("photoshop").action.batchPlay;
/**
 * app.documents 0
 */
var activeDocument = function () {
    return app.documents.filter(function (e) { return e._id === app.activeDocument._id; })[0];
};
exports.activeDocument = activeDocument;
/**
 * if have nothing,is empty layer
 * @param bounds rectangle size of something in layer,base document left-top point, {left,top,right,bottom}
 */
function isEmptyLayer(bounds) {
    return __awaiter(this, void 0, void 0, function () {
        var zero;
        return __generator(this, function (_a) {
            zero = bounds.left + bounds.top + bounds.right + bounds.bottom;
            return [2 /*return*/, zero === 0 ? true : false];
        });
    });
}
exports.isEmptyLayer = isEmptyLayer;
/**
 * get element rectangle size
 * @param layer layer
 */
function getElementSize(layer) {
    return __awaiter(this, void 0, void 0, function () {
        var layerBounds, boundsLeft, boundsTop, boundsRight, boundsBottom, elementWidth, elementHeight, elementSize;
        return __generator(this, function (_a) {
            layerBounds = layer.bounds;
            boundsLeft = layerBounds.left;
            boundsTop = layerBounds.top;
            boundsRight = layerBounds.right;
            boundsBottom = layerBounds.bottom;
            elementWidth = boundsRight - boundsLeft;
            elementHeight = boundsBottom - boundsTop;
            elementSize = {
                width: 0,
                height: 0,
            };
            return [2 /*return*/, (elementSize = { width: elementWidth, height: elementHeight })];
        });
    });
}
exports.getElementSize = getElementSize;
/**
 * decide element is vertcal or horizontal
 * @param elementSize
 */
function isVertical(elementSize) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (elementSize.height > elementSize.width) {
                return [2 /*return*/, true];
            }
            else if (elementSize.height < elementSize.width) {
                return [2 /*return*/, false];
            }
            return [2 /*return*/, null];
        });
    });
}
exports.isVertical = isVertical;
/**
 * delete all empty layer
 */
function deleteAllEmptyLayers() {
    return __awaiter(this, void 0, void 0, function () {
        var layers;
        var _this = this;
        return __generator(this, function (_a) {
            layers = exports.activeDocument().layers;
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
            return [2 /*return*/];
        });
    });
}
exports.deleteAllEmptyLayers = deleteAllEmptyLayers;
function deleteAllLayersExcludeTarget() {
    return __awaiter(this, void 0, void 0, function () {
        var layer;
        return __generator(this, function (_a) {
            layer = exports.activeDocument().activeLayers[0].name === names.__DO_ACTION__ ? exports.activeDocument().activeLayers[0] : null;
            if (layer !== null) {
            }
            return [2 /*return*/];
        });
    });
}
exports.deleteAllLayersExcludeTarget = deleteAllLayersExcludeTarget;
/**
 * crop document size to active layer bounds, now only for a layer
 * @param margin maring to document boundary
 */
function cropToMargin(margin) {
    return __awaiter(this, void 0, void 0, function () {
        var layerBounds, cropBounds;
        return __generator(this, function (_a) {
            layerBounds = exports.activeDocument().activeLayers.length === 1 ? exports.activeDocument().activeLayers[0].bounds : null;
            cropBounds = { left: 0, top: 0, right: 0, bottom: 0 };
            cropBounds = {
                left: layerBounds.left - margin,
                top: layerBounds.top - margin,
                right: layerBounds.right + margin,
                bottom: layerBounds.bottom + margin,
            };
            exports.activeDocument().crop(cropBounds, 0);
            return [2 /*return*/];
        });
    });
}
exports.cropToMargin = cropToMargin;
/**
 * crop document size to base active layer bounds's square, now only for a layer
 * @param margin
 */
function cropToSquare(margin) {
    return __awaiter(this, void 0, void 0, function () {
        var layer, layerBounds, layerSize, cropBounds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    layer = exports.activeDocument().activeLayers.length === 1 ? exports.activeDocument().activeLayers[0] : null;
                    layerBounds = layer !== null ? layer.bounds : null;
                    return [4 /*yield*/, getElementSize(layer)];
                case 1:
                    layerSize = _a.sent();
                    layerBounds = isVertical(layerSize)
                        ? {
                            left: layerBounds.left - (layerSize.height - layerSize.width) / 2,
                            top: layerBounds.top,
                            right: layerBounds.right + (layerSize.height - layerSize.width) / 2,
                            bottom: layerBounds.bottom,
                        }
                        : {
                            left: layerBounds.left,
                            top: layerBounds.top - (layerSize.width - layerSize.height) / 2,
                            right: layerBounds.right,
                            bottom: layerBounds.bottom + (layerSize.width - layerSize.height) / 2,
                        };
                    cropBounds = {
                        left: layerBounds.left - margin,
                        top: layerBounds.top - margin,
                        right: layerBounds.right + margin,
                        bottom: layerBounds.bottom + margin,
                    };
                    exports.activeDocument().crop(cropBounds);
                    return [2 /*return*/];
            }
        });
    });
}
exports.cropToSquare = cropToSquare;
/**
 * crop document size to base active layer bounds's to size ( width,height ) ,
 * now only for a layer
 * @param width
 * @param height
 */
function cropToSize(width, height) {
    return __awaiter(this, void 0, void 0, function () {
        var layer, layerBounds, layerSize, marginLeft, marginTop, cropBounds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    layer = exports.activeDocument().activeLayers.length === 1 ? exports.activeDocument().activeLayers[0] : null;
                    layerBounds = layer !== null ? layer.bounds : null;
                    return [4 /*yield*/, getElementSize(layer)];
                case 1:
                    layerSize = _a.sent();
                    marginLeft = (width - layerSize.width) / 2;
                    marginTop = (height - layerSize.height) / 2;
                    cropBounds = {
                        left: layerBounds.left - marginLeft,
                        top: layerBounds.top - marginTop,
                        right: layerBounds.right + marginLeft,
                        bottom: layerBounds.bottom + marginTop,
                    };
                    exports.activeDocument().crop(cropBounds);
                    return [2 /*return*/];
            }
        });
    });
}
exports.cropToSize = cropToSize;
/**
 *  select a layer or group by name, if has multiply same type ( layer or group ), select the first base bottom to top index
 * @param name
 * @param isGroup
 */
function selectLayerByName(name, isGroup) {
    if (isGroup === void 0) { isGroup = false; }
    return __awaiter(this, void 0, void 0, function () {
        var nameIndex, layers, layer, _a, _b;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    nameIndex = names.__DO_ACTION__;
                    return [4 /*yield*/, exports.activeDocument().layers];
                case 1:
                    layers = _c.sent();
                    return [4 /*yield*/, isGroup];
                case 2:
                    if (!((_c.sent()) === true)) return [3 /*break*/, 4];
                    return [4 /*yield*/, layers.find(function (layer) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, layer.name];
                                case 1: return [2 /*return*/, (_a.sent()) === name && layer.isGroupLayer === true];
                            }
                        }); }); })];
                case 3:
                    _a = _c.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, layers.find(function (layer) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, layer.name];
                            case 1: return [2 /*return*/, (_a.sent()) === name && layer.isGroupLayer === undefined];
                        }
                    }); }); })];
                case 5:
                    _a = _c.sent();
                    _c.label = 6;
                case 6:
                    layer = _a;
                    _b = layer;
                    return [4 /*yield*/, "" + nameIndex + name];
                case 7:
                    _b.name = _c.sent();
                    return [4 /*yield*/, batchPlay([
                            {
                                _obj: "select",
                                _target: [{ _ref: "layer", _name: "MAIN" }],
                            },
                        ], batchPlayConfig.defaultOptions)];
                case 8:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.selectLayerByName = selectLayerByName;
/**
 * select all layer on select layer,if toBottom = true,
 * @param excludeTarget
 * @param toBottom
 */
function selectAllLayersOnTarget(excludeTarget, toBottom) {
    if (excludeTarget === void 0) { excludeTarget = false; }
    if (toBottom === void 0) { toBottom = false; }
    return __awaiter(this, void 0, void 0, function () {
        var d, topLayerName, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    d = exports.activeDocument().layers;
                    if (!(toBottom === true)) return [3 /*break*/, 2];
                    return [4 /*yield*/, d[d.length - 1].name];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, d[0].name];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    topLayerName = _a;
                    if (excludeTarget === true) {
                    }
                    return [4 /*yield*/, batchPlay([
                            {
                                _obj: "select",
                                _target: [{ _ref: "layer", _name: topLayerName }],
                                selectionModifier: batchPlayConfig.selectionModifier.addToSelectionContinuous,
                            },
                        ], batchPlayConfig.defaultOptions)];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.selectAllLayersOnTarget = selectAllLayersOnTarget;
/**
 * use batchplay to move layer to document layers top index
 */
function moveLayerToDocTop() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, batchPlay([
                        {
                            _obj: "move",
                            _target: batchPlayConfig._targetSeletLayers,
                            to: { _ref: "layer", _index: exports.activeDocument().layers.length + 2 },
                            adjustment: false,
                        },
                    ], batchPlayConfig.defaultOptions)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.moveLayerToDocTop = moveLayerToDocTop;
/**
 * todo
 */
function moveLayerToParentTop() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
exports.moveLayerToParentTop = moveLayerToParentTop;
/**
 * convert select layers to merge smart object
 */
function convertToSmartObject() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, batchPlay([
                        {
                            _obj: "newPlacedLayer",
                        },
                    ], batchPlayConfig.defaultOptions)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.convertToSmartObject = convertToSmartObject;
function mergeLayers() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
exports.mergeLayers = mergeLayers;
function mergeLayerNew() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, batchPlay([{ _obj: "mergeLayersNew" }], batchPlayConfig.defaultOptions)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mergeLayerNew = mergeLayerNew;
/**
 * ctrl + e
 */
function rasterizeTargetLayer() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, batchPlay([
                        {
                            _obj: "rasterizeLayer",
                            _target: batchPlayConfig._targetSeletLayers,
                        },
                    ], batchPlayConfig.defaultOptions)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.rasterizeTargetLayer = rasterizeTargetLayer;
/**
 * set layers to a name
 */
function setLayerName(name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, batchPlay([
                        {
                            _obj: "set",
                            _target: batchPlayConfig._targetSeletLayers,
                            to: { _obj: "layer", name: name },
                        },
                    ], batchPlayConfig.defaultOptions)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.setLayerName = setLayerName;
/**
 * create white background layer under bottom
 */
function createBGLayer() {
    return __awaiter(this, void 0, void 0, function () {
        var backgroundLayer, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    backgroundLayer = exports.activeDocument().backgroundLayer;
                    if (!(backgroundLayer === null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, batchPlay([{ _obj: "make", _target: [{ _ref: "backgroundLayer" }] }], batchPlayConfig.defaultOptions)];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 2:
                    _a = backgroundLayer;
                    return [4 /*yield*/, true];
                case 3:
                    _a.selected = _b.sent();
                    return [4 /*yield*/, selectLayerByName(backgroundLayer.name)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createBGLayer = createBGLayer;
function fillWhite() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, batchPlay([
                        {
                            _obj: "fill",
                            using: { _enum: "fillContents", _value: "color" },
                            color: { _obj: "RGBColor", red: 255, grain: 255, blue: 255 },
                            opacity: { _unit: "percentUnit", _value: 100 },
                            mode: { _enum: "blendMode", _value: "normal" },
                        },
                    ], batchPlayConfig.defaultOptions)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.fillWhite = fillWhite;
