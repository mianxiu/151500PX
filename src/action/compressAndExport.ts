import * as batchPlayConfig from "../module/batchplayconfig";
import * as component from "../module/component";
import * as names from "../module/names";
import * as folder from "../module/floder";
import * as secureStorage from "../module/securestorage";

const app = require("photoshop").app;

const fuckingExportSize: number = 1500;
const fuckingMargin: number = 20;
// todo 可能是batchplayer 线程堵塞的问题

/**
 *
 */
export async function mergeMainToSmartObject() {
  await component.selectLayerByName(`MAIN`, true);
  await component.mergeLayerNew();
  await component.selectAllLayersOnTarget();
  await component.convertToSmartObject();
  await component.rasterizeTargetLayer();
  await component.mergeLayerNew();
  await component.convertToSmartObject();
  await component.setLayerName(names.__DO_ACTION__);
  let layerSize = await component.getElementSize(app.activeDocument.activeLayers[0]);
  console.log(layerSize.width, layerSize.height);
  if (layerSize.height < fuckingExportSize && layerSize.width < fuckingExportSize) {
    await component.cropToSize(fuckingExportSize, fuckingExportSize);
  } else {
    await component.cropToSquare(fuckingMargin);
  }
  await component.createBGLayer();
  await component.selectAllLayersOnTarget();
  app.activeDocument.layers[0].selected = await false; // unselected --DO-ACTION--
  await component.mergeLayerNew();
  await component.fillWhite();
}

export async function ffff() {
  //await folder.createFolder(`1oo`);
  let pickfolder = await folder.pickFolder();
  let allSubFolders = await folder.getAllSubFolders(pickfolder);
  console.log(allSubFolders);
  await folder.createExportFolderOnRoot(allSubFolders);

  //await folder.createAllSubFolderOnRoot(await folder.getAllSubFolders(pickfolder));
}
