import * as compressAndExport from "./action/compressAndExport";
import { getDataFolder, getPluginFolder } from "./module/floder";
/**
 * use obesever to listen event when fetch panel
 */

/**
 * init main panel
 */
async function initPanel(path: string) {
  let res = await fetch(path).then(response => {
    return response.text();
  });
  document.querySelector(`#main`).innerHTML = res;
}

initPanel("./panel/main.html");

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
