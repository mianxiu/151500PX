import * as compressAndExport from "./action/compressAndExport";
import * as initPanel from "./action/initPanel";
import { getDataFolder, getPluginFolder } from "./module/floder";

/**
 * use obesever to listen event when fetch panel
 */
initPanel.init();

function doSomething() {
  //  document.getElementById("layers").innerHTML = `${showLayerNames()}`
  //component.selectAllLayersOnTarget();
  //component.selectLayerByName("MAIN", true);
  //component.cropToSize(400, 400);

  compressAndExport.mergeMainToSmartObject();
  //compressAndExport.fuck();
  getPluginFolder();
  getDataFolder();
}

//document.getElementById("btnPopulate").addEventListener("click", doSomething);
