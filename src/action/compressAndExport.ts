import * as batchPlayConfig from "../module/batchplayconfig";
import * as component from "../module/component";
import * as name from "../module/name";

const app = require("photoshop").app;

export async function mergeMainToSmartObject() {
  await component.deleteAllEmptyLayers();
  await component.selectLayerByName(`MAIN`);
  await component.selectAllLayersOnTarget();
  await component.convertToSmartObject();
  await component.rasterizeTargetLayer();
  await component.convertToSmartObject();
  await component.setLayerName(name.__DO_ACTION__);
}
