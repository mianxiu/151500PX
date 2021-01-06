"use strict";
var compressAndExport = require("./action/compressAndExport");
//todos
function doSomething() {
    //  document.getElementById("layers").innerHTML = `${showLayerNames()}`
    //component.selectAllLayersOnTarget();
    console.log("123");
    //component.selectLayerByName("MAIN", true);
    //component.cropToSize(400, 400);
    compressAndExport.mergeMainToSmartObject();
}
document.getElementById("btnPopulate").addEventListener("click", doSomething);
