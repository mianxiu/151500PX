import * as batchPlayConfig from "../module/batchplayconfig";
import * as component from "../module/component";
import * as name from "../module/layername";

const app = require("photoshop").app;

const fuckingExportSize: number = 1500;
const fuckingMargin: number = 20;

export async function mergeMainToSmartObject() {
  await component.selectLayerByName(`MAIN`);
  await component.selectAllLayersOnTarget();
  await component.convertToSmartObject();
  await component.rasterizeTargetLayer();
  await component.convertToSmartObject();
  await component.setLayerName(name.__DO_ACTION__);
  let layerSize = await component.getElementSize(app.activeDocument.activeLayers[0]);
  console.log(layerSize);
  if (layerSize.height < fuckingExportSize && layerSize.width < fuckingExportSize) {
    await component.cropToSize(fuckingExportSize, fuckingExportSize);
  } else {
    await component.cropToSquare(fuckingMargin);
  }
}
