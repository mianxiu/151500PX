import * as names from "../module/names";
const localFileSystem = require("uxp").storage.localFileSystem;

//(4.4.1) Always invoke a picker once per document session when accessing a user file (excludes temporary and plugin data).
//(4.4.2) Your plugin can cache access to a file for the lifetime of the document session.
//(4.4.3) Never ask for access to the root folder of the user’s storage volume.
//(4.4.4) Avoid asking for access to the user’s “Documents” folder (and other similar files.)
//(4.4.5) Never ask for permission to access files in another plugin’s folder.

/**
 * retrun a folder<promise>
 */
interface IFolder {
  id: number;
  isEntry: boolean;
  isFile: boolean;
  isFolder: boolean;
  name: string;
  nativePath: string;
  provider: string;
  url: string;
}

export async function pickFolder() {
  return await localFileSystem.getFolder();
}

export async function isExitSubFolder(parentFolderSymbol: any, folderName: string) {
  return (await parentFolderSymbol.getEntries().filter(entry => entry.name === folderName && entry.isFolder).length) > 0
    ? true
    : false;
}

/**
 *  return files obj array
 * @param folder
 * @param filterFilenameExtension  PSD/TIFF... or other
 */
export async function getFiles(folder, filterFilenameExtension: string = `.*`): Promise<any[]> {
  const entries = await folder.getEntries();
  const nameExtensionRegexp: RegExp = RegExp(`.*\\.${filterFilenameExtension}`, "i");

  return entries.filter(entry => nameExtensionRegexp.test(entry.name) && entry.isFile);
}

export async function getSubFolderByName(parentFolderSymbol: any, folderName: string): Promise<any | null> {
  let subFolderSymbols = await parentFolderSymbol
    .getEntries()
    .filter(entry => entry.name === folderName && entry.isFolder);
  return subFolderSymbols.length > 0 ? subFolderSymbols[0] : null;
}

/**
 * return sub folder promise
 * @param folder
 */
export async function getSubFolders(folder): Promise<any[]> {
  const entries = await folder.getEntries();
  return entries.filter(entry => entry.isFolder);
}

interface IFloderTreePath {
  pickFloderSymbol: IFolder | any;
  nativePath: string;
  folderName: string;
  folderSymbol: any;
}

/**
 * loop get all sub folder
 * @param pickFolder
 */
export async function getAllSubFolders(pickFolder) {
  let allSubFolder: IFloderTreePath[] = [];

  let loopFolder = async subFolders => {
    subFolders.forEach(async subFolder => {
      let folderTree: IFloderTreePath = await {
        pickFloderSymbol: pickFolder,
        nativePath: subFolder.nativePath,
        folderName: subFolder.name,
        folderSymbol: subFolder,
      };
      await allSubFolder.push(folderTree);

      if (subFolders.length > 0) {
        await loopFolder(await getSubFolders(subFolder));
      }
    });
  };

  loopFolder(await getSubFolders(pickFolder));
  return allSubFolder;
}

export async function createFolder(path: string) {
  let aa = await pickFolder();
  aa.createFolder(path);
}

export async function createSubFolder(parentPath: string, subFolderNamer) {}

/**
 *
 * @param folderTreePaths
 */
export async function createAllSubFolderOnRoot(folderTreePaths: IFloderTreePath[]) {
  if (folderTreePaths.length < 1) {
    return console.log(names.folderError.subFolderIsEmpty);
  }

  let pickFLoder = await folderTreePaths[0].pickFloderSymbol;
  let exportFoloderName = pickFLoder.nativePath.replace(/.*[\\|\/](.*)/gm, `$1 EXPORT`);

  console.log(exportFoloderName);
  let exportFolder = isExitSubFolder(pickFLoder, exportFoloderName)
    ? await pickFLoder.createFolder(exportFoloderName)
    : await getSubFolderByName(pickFLoder, exportFoloderName);

  folderTreePaths.forEach(folderTree => {});
}
