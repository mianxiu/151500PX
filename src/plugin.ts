import * as compressAndExport from "./action/compressAndExport";
import * as initMain from "./action/initMain";
import { getDataFolder, getPluginFolder } from "./module/floder";
const app = require("photoshop").app;

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

  // app.eventNotifier = (event, descriptor) => {
  //   console.log(event, JSON.stringify(descriptor, null, " "));
  // };
  console.log(app.currentTool);
}

initPanel("./panel/main.html");

initMain.jk();

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
