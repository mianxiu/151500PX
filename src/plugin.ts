import * as component from "./module/component";
//todos

function doSomething() {
  //  document.getElementById("layers").innerHTML = `${showLayerNames()}`

  //component.selectAllLayersOnTarget();
  console.log("123");
  //component.selectLayerByName("MAIN", true);
  //component.cropToSize(400, 400);
  component.convertToSmartObject();
}

document.getElementById("btnPopulate").addEventListener("click", doSomething);
