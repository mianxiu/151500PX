var _a = require('./module/main'), deleteAllEmptyLayers = _a.deleteAllEmptyLayers, cropToMargin = _a.cropToMargin;
function doSomething() {
    //  document.getElementById("layers").innerHTML = `${showLayerNames()}`
    //  console.log(fff())
    // deleteAllEmptyLayers()
    cropToMargin(20);
}
document.getElementById("btnPopulate").addEventListener("click", doSomething);
