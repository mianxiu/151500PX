"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectionModifier = exports._targetSeletLayers = exports._ref = exports.defaultOptions = void 0;
exports.defaultOptions = {
    "synchronousExecution": false,
    "modalBehavior": "fail"
};
exports._ref = {
    layer: "layer",
    path: "path"
};
/**
 * target all seleted layers
 */
exports._targetSeletLayers = [{
        _ref: exports._ref.layer,
        _enum: "ordinal",
        _value: "targetEnum"
    }];
/**
 * selection modifier
 */
exports.selectionModifier = {
    addToSelection: { _enum: "selectionModifierType", _value: "addToSelection" },
    addToSelectionContinuous: { _enum: "selectionModifierType", _value: "addToSelectionContinuous" },
};
