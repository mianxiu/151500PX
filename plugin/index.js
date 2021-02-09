"use strict";
var compressAndExport = require("./action/compressAndExport");
var floder_1 = require("./module/floder");
//todos
// 删除不可见图层
function doSomething() {
    //  document.getElementById("layers").innerHTML = `${showLayerNames()}`
    //component.selectAllLayersOnTarget();
    //component.selectLayerByName("MAIN", true);
    //component.cropToSize(400, 400);
    compressAndExport.mergeMainToSmartObject();
    //compressAndExport.fuck();
    floder_1.getPluginFolder();
    floder_1.getDataFolder();
}
document.getElementById("btnPopulate").addEventListener("click", doSomething);
