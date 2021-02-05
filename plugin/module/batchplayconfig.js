"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiffConfig = exports.selectionModifier = exports._targetSeletLayers = exports._ref = exports.defaultOptions = void 0;
/**
 *
 * @param histortyName set '' can suspend create history when use bathplay
 */
function defaultOptions(histortyName) {
    if (histortyName === void 0) { histortyName = ""; }
    return {
        synchronousExecution: false,
        modalBehavior: "fail",
        historyStateInfo: {
            name: histortyName,
            target: {
                _ref: "document",
                _enum: "ordinal",
                _value: "targetEnum",
            },
        },
    };
}
exports.defaultOptions = defaultOptions;
exports._ref = {
    layer: "layer",
    path: "path",
};
/**
 * target all seleted layers
 */
exports._targetSeletLayers = [
    {
        _ref: exports._ref.layer,
        _enum: "ordinal",
        _value: "targetEnum",
    },
];
/**
 * selection modifier
 */
exports.selectionModifier = {
    addToSelection: { _enum: "selectionModifierType", _value: "addToSelection" },
    addToSelectionContinuous: { _enum: "selectionModifierType", _value: "addToSelectionContinuous" },
};
exports.TiffConfig = {
    _obj: "TIFF",
    byteOrder: { _enum: "platform", _value: "IBMPC" },
    layerCompression: { _enum: "encoding", _value: "RLE" },
};
