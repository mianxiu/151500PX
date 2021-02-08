import * as compressAndExport from "./action/compressAndExport";
import { getDataFolder, getPluginFolder } from "./module/floder";
//todos
// 删除不可见图层

function doSomething() {
  //  document.getElementById("layers").innerHTML = `${showLayerNames()}`
  //component.selectAllLayersOnTarget();
  //component.selectLayerByName("MAIN", true);
  //component.cropToSize(400, 400);

  //compressAndExport.mergeMainToSmartObject();
  //compressAndExport.fuck();
  getPluginFolder();
  getDataFolder();
}

document.getElementById("btnPopulate").addEventListener("click", doSomething);
