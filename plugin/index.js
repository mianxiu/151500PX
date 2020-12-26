const { fff, showLayerNames, deleteAllEmptyLayers } = require("./module/main.js");
function doSomething() {
    //  document.getElementById("layers").innerHTML = `${showLayerNames()}`
    //  console.log(fff())
    deleteAllEmptyLayers();
}
document.getElementById("btnPopulate").addEventListener("click", doSomething);
