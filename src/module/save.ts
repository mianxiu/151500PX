import * as batchPlayConfig from "./batchplayconfig";
import * as layername from "./names";
const app = require("photoshop").app;
const batchPlay = require("photoshop").action.batchPlay;
const localFileSystem = require("uxp").storage.localFileSystem;

/**
 * batchPlay need localFileSystem.createSessionToken to save
 * @param parentFolderSymbol
 * @param fileName
 */
export async function saveToTiff(parentFolderSymbol: any, fileName: string) {
  let exportFileName = fileName.replace(/(.*)\..*/, "$1.tif");
  let fileToken = await localFileSystem.createSessionToken(await parentFolderSymbol.createFile(exportFileName));

  await batchPlay(
    [
      {
        _obj: "save",
        as: batchPlayConfig.TiffConfig,
        in: { _path: fileToken, _kind: "local" },
        saveStage: { _enum: "saveStageType", _value: "saveBegin" },
      },
    ],
    batchPlayConfig.defaultOptions()
  );
}

/**
 * save to jpeg
 * @param parentFolderSymbol
 * @param fileName
 * @param extendedQuality
 */
export async function saveToJPEG(parentFolderSymbol: any, fileName: string, extendedQuality: number = 12) {
  let exportFileName = fileName.replace(/(.*)\..*/, "$1.jpg");
  let fileToken = await localFileSystem.createSessionToken(await parentFolderSymbol.createFile(exportFileName));
  await batchPlay(
    [
      {
        _obj: "save",
        as: {
          _obj: "JPEG",
          extendedQuality: extendedQuality,
          matteColor: {
            _enum: "matteColor",
            _value: "none",
          },
        },
        in: { _path: fileToken, _kind: "local" },
        saveStage: { _enum: "saveStageType", _value: "saveBegin" },
      },
    ],
    batchPlayConfig.defaultOptions()
  );
}
