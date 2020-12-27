"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require("photoshop").app;
var fs = require("uxp").storage.localFileSystem;
var doc = app.activeDocument;
function isEmptyLayer(bounds) {
    var zero = bounds.left + bounds.top + bounds.right + bounds.bottom;
    return zero === 0 ? true : false;
}
function deleteAllEmptyLayers() {
    // layer lock is can't delete
    // use bounds to find empty layer
    var layers = doc.layers;
    layers.map(function (layer) { return isEmptyLayer(layer.bounds) === true ? console.log(layer.bounds) : console.log(layer); });
}
module.exports = {
    // showLayerNames,
    // useFolder,
    deleteAllEmptyLayers: deleteAllEmptyLayers
};
