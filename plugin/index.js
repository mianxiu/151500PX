"use strict";
var main = require("./module/main");
//todos
function doSomething() {
    //  document.getElementById("layers").innerHTML = `${showLayerNames()}`
    //  console.log(fff())
    // deleteAllEmptyLayers()
    //cropToMargin(20)
    main.seletAllLayersOnTarget();
    main.moveLayerToDocTop();
}
document.getElementById("btnPopulate").addEventListener("click", doSomething);
