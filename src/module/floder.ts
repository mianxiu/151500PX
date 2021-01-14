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
  return await parentFolderSymbol
    .getEntry(folderName)
    .then(done => {
      return true;
    })
    .catch(error => {
      return false;
    });
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
  pickFolderName: string;
  parentNames: string[];
  folderName: string;
  folderSymbol: any;
}

/**
 * loop get all sub folder,return folderSymbol array [left,left-sub,right,right-sub]
 * @param pickFolder
 */
export async function getAllSubFolders(pickFolder, filterPSD: boolean = false) {
  let allSubFolder: IFloderTreePath[] = [];
  let pickFolderName = pickFolder.nativePath.replace(/.*[\\|\/](.*)/gm, "$1");
  let loopFolder = async subFolders => {
    /**
     * for loop is left-leftSub-right-rightSub
     * foreach loop is left-right-leftSub-rightSub
     */
    for (let i = 0; i < subFolders.length; i++) {
      let element = subFolders[i];
      let parentNames: string[] = element.nativePath
        .replace(new RegExp(`.*${pickFolderName}[\\\\|\\/]`), "")
        .split(/\\|\//gm);

      console.log(parentNames);
      if (element.name !== `${pickFolderName} ${names.__EXPORT__}`) {
        await allSubFolder.push({
          pickFloderSymbol: pickFolder,
          pickFolderName: pickFolderName,
          parentNames: parentNames,
          folderName: element.name,
          folderSymbol: element,
        });
      }

      await loopFolder(await getSubFolders(element));
    }
  };

  await loopFolder(await getSubFolders(pickFolder));
  return allSubFolder;
}

export async function createFolder(path: string) {
  let aa = await pickFolder();
  aa.createFolder(path);
}

/**
 * create a sub folder in parent folder,and return sub folder symbol
 * @param parentSymbol
 * @param subFolderName
 */
export async function createSubFolder(parentSymbol: any, subFolderName: string) {
  return await parentSymbol.getEntry(subFolderName).catch(onRejected => {
    return parentSymbol.createFolder(subFolderName);
  });
}

/**
 *
 * @param folderTreePaths
 */
export async function createExportFolderOnRoot(
  folderTreePaths: IFloderTreePath[],
  filterPSD: boolean = false,
  getSourceFileAndDoExport?: (entry) => void
) {
  if (folderTreePaths.length < 1) {
    return console.log(names.folderError.subFolderIsEmpty);
  }
  // create export root folder
  let pickFloderSymbol = folderTreePaths[0].pickFloderSymbol;
  let exportRootFolderName = `${folderTreePaths[0].pickFolderName} ${names.__EXPORT__}`;

  // create root export folder
  let exportRootFolder = await createSubFolder(pickFloderSymbol, exportRootFolderName);

  console.log(exportRootFolder);

  for (let f = 0; f < folderTreePaths.length; f++) {
    let folderPath = folderTreePaths[f];
    let folderSubPath = folderTreePaths[f + 1];
  }

  folderTreePaths.forEach(async folderPath => {
    // create folder
    // e.getEntry.foreach(e=>{doSomething(e)})
  });
}
