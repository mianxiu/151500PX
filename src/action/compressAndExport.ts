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
 * 2021/1/20
 * 想要裁剪透明图层到主体和完美应用各种效果，需要拼合可见图层/图像
 * 2021/1/22
 * 细节图命名为--MAIN--DETAIL--
 * 不保留margin/直接缩放，通过判断大小
 *
 */
export async function mergeMainToSmartObject() {
  let acitveDocumet = component.activeDocument();
  // select layer by name has problem
  await component.selectLayerByName(`MAIN`, true);
  await component.selectAllLayersOnTarget(true, true);
  await component.hideLayers();
  await component.selectLayerByName(`MAIN`, true);
  await component.selectAllLayersOnTarget(true, false, true);

  await component.mergeVisible();

  await component.convertToSmartObject();
  await component.rasterizeTargetLayer();
  await component.mergeLayerNew();
  await component.convertToSmartObject();
  await component.setLayerName(names.__DO_ACTION__);

  let layerSize = await component.getElementSize(await acitveDocumet.activeLayers[0]);
  let layerBounds: component.IBounds = component.activeDocument().activeLayers[0].bounds;
  if (layerBounds.bottom === 0 || layerBounds.left === 0 || layerBounds.right === 0 || layerBounds.top === 0) {
    console.log(`${names.__MAIN_DETAIL__} MODE`);
    await acitveDocumet.resizeImage(fuckingExportSize, fuckingExportSize);
  } else if (layerSize.height > fuckingExportSize || layerSize.width > fuckingExportSize) {
    console.log(`${names.__MAIN__} SIZE > ${fuckingExportSize}`);
    await component.cropToSquare(fuckingMargin);
    await acitveDocumet.resizeImage(fuckingExportSize, fuckingExportSize);
  } else if (layerSize.height < fuckingExportSize && layerSize.width < fuckingExportSize) {
    console.log(`${names.__MAIN__} SIZE < ${fuckingExportSize}`);
    await component.cropToSize(fuckingExportSize, fuckingExportSize);
  }

  await component.deleteAllUnVisibleLayers();
  await component.createBGLayer();
  await component.fillWhite();
}

export async function fuck() {
  app.documents.map(async d => await d.close());
  // 有文档的时候不会重复打开
  if (app.documents.length < 1)
    await app.createDocument({
      name: "please pick folder",
      width: 1,
      height: 1,
      resolution: 1,
      mode: "RGBColorMode",
      fill: "transparent",
    });

  let pickFolder = app.documents.length === 1 ? await folder.pickFolder() : null;

  console.log(pickFolder);

  if (pickFolder !== null) {
    console.log(`do create`);
    await folder.createExportFolderOnRoot(await folder.getAllSubFoldersPath(pickFolder), true, async entryPath => {
      console.log(await folder.getAllSubFoldersPath(pickFolder));
      if (app.documents.length < 2) await app.open(entryPath.entrySymbol);
      // do something
      await mergeMainToSmartObject();
      /**
       * export jpeg
       */
      let jpegFolderSymbol = await folder.createSubPathFolder(
        pickFolder,
        `${entryPath.exportRoot}${entryPath.relateivePath}`
      );
      await save.saveToJPEG(jpegFolderSymbol, entryPath.entrySymbol.name);

      /**
       * export tif
       */
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
