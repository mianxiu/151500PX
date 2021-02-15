"use strict";
var compressAndExport = require("./action/compressAndExport");
var initPanel = require("./action/initPanel");
var floder_1 = require("./module/floder");
/**
 * use obesever to listen event when fetch panel
 */
initPanel.initPanel();
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
//document.getElementById("btnPopulate").addEventListener("click", doSomething);
