var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const app = require("photoshop").app;
const fs = require("uxp").storage.localFileSystem;
const doc = app.activeDocument;
function showLayerNames() {
    const allLayers = app.activeDocument.layers;
    // const allLayerNames = allLayers.map(layer => layer.name);
    // const sortedNames = allLayerNames.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    console.log(allLayers[0]);
    return allLayers[0].bounds.right;
}
function fff() {
    return __awaiter(this, void 0, void 0, function* () {
        let userFolder = yield fs.getFolder();
        return userFolder.name;
    });
}
function isEmptyLayer(bounds) {
    let zero = bounds.left + bounds.top + bounds.right + bounds.bottom;
    return zero === 0 ? true : false;
}
function deleteAllEmptyLayers() {
    // layer lock is can't delete
    // use bounds to find empty layer
    let layers = doc.layers;
    layers.map(layer => isEmptyLayer(layer.bounds) === true ? console.log(layer.bounds) : console.log(layer));
}
module.exports = {
    showLayerNames,
    fff,
    deleteAllEmptyLayers
};
