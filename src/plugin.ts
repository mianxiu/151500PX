import * as compressAndExport from "./action/compressAndExport";
//todos

function doSomething() {
  //  document.getElementById("layers").innerHTML = `${showLayerNames()}`
  //component.selectAllLayersOnTarget();
  //component.selectLayerByName("MAIN", true);
  //component.cropToSize(400, 400);
  //compressAndExport.mergeMainToSmartObject();
  compressAndExport.mergeMainToSmartObject();
  //compressAndExport.fuck();
}

document.getElementById("btnPopulate").addEventListener("click", doSomething);
