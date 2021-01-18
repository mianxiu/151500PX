import * as batchPlayConfig from "../module/batchplayconfig";
import * as component from "../module/component";
import * as names from "../module/names";
import * as folder from "../module/floder";
import * as secureStorage from "../module/securestorage";
import * as save from "../module/save";

const app = require("photoshop").app;

const fuckingExportSize: number = 1500;
const fuckingMargin: number = 20;
// 2021/1/18 解决，是app.activeDocument 获取错误

/**
 *
 */
export async function mergeMainToSmartObject() {
  let acitveDocumet = component.activeDocument();
  // select layer by name has problem
  await component.selectLayerByName(`MAIN`, true);
  await component.mergeLayerNew();
  await component.selectAllLayersOnTarget();
  await component.convertToSmartObject();
  await component.rasterizeTargetLayer();
  await component.mergeLayerNew();
  await component.convertToSmartObject();
  await component.setLayerName(names.__DO_ACTION__);
  let layerSize = await component.getElementSize(await acitveDocumet.activeLayers[0]);
  console.log(layerSize.width, layerSize.height);
  if (layerSize.height < fuckingExportSize && layerSize.width < fuckingExportSize) {
    await component.cropToSize(fuckingExportSize, fuckingExportSize);
  } else {
    await component.cropToSquare(fuckingMargin);
    await acitveDocumet.resizeImage(fuckingExportSize, fuckingExportSize);
  }
  await component.createBGLayer();
  await component.selectAllLayersOnTarget();
  acitveDocumet.layers[0].selected = await false; // unselected --DO-ACTION--
  await component.mergeLayerNew();
  await component.fillWhite();
}

export async function fuck() {
  app.documents.map(async d => await d.close());
  // 有文档的时候不会重复打开
  if (app.documents.length < 1)
    await app.createDocument({
      title: "please pick folder",
      width: 1,
      height: 1,
      resolution: 1,
      mode: "RGBColorMode",
      fill: "transparent",
    });

  let pickFolder = app.documents.length === 1 ? await folder.pickFolder() : null;

  if (pickFolder !== null) {
    await folder.createExportFolderOnRoot(await folder.getAllSubFoldersPath(pickFolder), async entryPath => {
      if (app.documents.length < 2) await app.open(entryPath.entrySymbol);
      // do something
      await mergeMainToSmartObject();
      // export jpeg
      let jpegFolderSymbol = await folder.createSubPathFolder(
        pickFolder,
        `${entryPath.exportRoot}${entryPath.relateivePath}`
      );

      await save.saveToJPEG(jpegFolderSymbol, entryPath.entrySymbol.name);

      // export tif
      let tiffFolderSymbol = await folder.createSubPathFolder(
        pickFolder,
        `${entryPath.exportRoot}${entryPath.relateivePath}${entryPath.relateivePath.replace(
          /.*([\\|\/]).*/gm,
          "$1TIFF"
        )}`
      );
      await save.saveToTiff(tiffFolderSymbol, entryPath.entrySymbol.name);
      await app.activeDocument.close();
    });
  }

  app.documents.map(async d => await d.close());
}
