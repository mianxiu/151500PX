"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const { deleteAllEmptyLayers,cropToMargin } = require('./module/main')
var main_1 = require("./module/main");
//todos
function doSomething() {
    //  document.getElementById("layers").innerHTML = `${showLayerNames()}`
    //  console.log(fff())
    // deleteAllEmptyLayers()
    //cropToMargin(20)
    main_1.cropToMargin(10);
    console.log('fuck UUUU~~^^1~~');
}
document.getElementById("btnPopulate").addEventListener("click", doSomething);