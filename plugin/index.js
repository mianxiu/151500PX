var deleteAllEmptyLayers = require('./module/main').deleteAllEmptyLayers;
function doSomething() {
    //  document.getElementById("layers").innerHTML = `${showLayerNames()}`
    //  console.log(fff())
    deleteAllEmptyLayers();
}
document.getElementById("btnPopulate").addEventListener("click", doSomething);
