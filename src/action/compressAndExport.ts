import * as batchPlayConfig from "../module/batchplayconfig";
import * as layerComponent from "../module/layercomponent";
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
  let acitveDocumet = layerComponent.activeDocument();
  // select layer by name has problem
  await layerComponent.selectLayerByName(`MAIN`, true);
  await layerComponent.selectChannel();
  await layerComponent.levels();
  await layerComponent.deSelect();
  await layerComponent.selectAllLayersOnTarget(true, true);
  await layerComponent.hideLayers();
  await layerComponent.selectLayerByName(`MAIN`, true);
  await layerComponent.selectAllLayersOnTarget(true, false, true);
  await layerComponent.mergeVisible();
  await layerComponent.convertToSmartObject();
  await layerComponent.rasterizeTargetLayer();
  await layerComponent.mergeLayerNew();
  await layerComponent.convertToSmartObject();
  await layerComponent.setLayerName(names.__DO_ACTION__);
  let layerSize = await layerComponent.getElementSize(await acitveDocumet.activeLayers[0]);
  let layerBounds: layerComponent.IBounds = layerComponent.activeDocument().activeLayers[0].bounds;
  /**
   * todo detatil is `MIAN-DETAIL--`
   */
  if (layerBounds.bottom === 0 || layerBounds.left === 0 || layerBounds.right === 0 || layerBounds.top === 0) {
    console.log(`${names.__MAIN_DETAIL__} MODE`);
    await acitveDocumet.resizeImage(fuckingExportSize, fuckingExportSize);
  } else if (layerSize.height > fuckingExportSize || layerSize.width > fuckingExportSize) {
    console.log(`${names.__MAIN__} SIZE > ${fuckingExportSize}`);
    await layerComponent.cropToSquare(fuckingMargin);
    await acitveDocumet.resizeImage(fuckingExportSize, fuckingExportSize);
  } else if (layerSize.height < fuckingExportSize && layerSize.width < fuckingExportSize) {
    console.log(`${names.__MAIN__} SIZE < ${fuckingExportSize}`);
    await layerComponent.cropToSize(fuckingExportSize, fuckingExportSize);
  }
  await layerComponent.deleteAllUnVisibleLayers();
  await layerComponent.createBGLayer();
  await layerComponent.fillWhite();
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

  if (pickFolder !== null) {
    await folder.createExportFolderOnRoot(await folder.getAllSubFoldersPath(pickFolder), true, async entryPath => {
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
