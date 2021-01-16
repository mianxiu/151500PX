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
  console.log("pick folder");
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
 * @param folderSymbol
 * @param filterFilenameExtension  PSD/TIFF... or other
 */
export async function getFiles(folderSymbol, filterFilenameExtension: string = `.*`): Promise<any[]> {
  const entries = await folderSymbol.getEntries();
  const nameExtensionRegexp: RegExp = RegExp(`.*\\.${filterFilenameExtension}`, "i");

  return entries.filter(entry => nameExtensionRegexp.test(entry.name) && entry.isFile);
}

/**
 * return sub folder promise
 * @param folderSymbol
 */
export async function getSubFolders(folderSymbol): Promise<any[]> {
  const entries = await folderSymbol.getEntries();
  return entries.filter(entry => entry.isFolder);
}

interface IFloderTreePath {
  pickFloderSymbol: IFolder | any;
  pickFolderName: string;
  relativePath: string;
  folderName: string;
  folderSymbol: any;
}

/**
 * loop get all sub folder,return folderSymbol array [left,left-sub,right,right-sub]
 * @param pickFolderSymbol
 */
export async function getAllSubFolders(pickFolderSymbol) {
  let subFolderTreePath: IFloderTreePath[] = [];
  let pickFolderName = pickFolderSymbol.nativePath.replace(/.*[\\|\/](.*)/gm, "$1");
  let loopFolder = async subFolders => {
    /**
     * for loop is left-leftSub-right-rightSub
     * foreach loop is left-right-leftSub-rightSub
     */
    for (let i = 0; i < subFolders.length; i++) {
      let element = subFolders[i];
      let parentNames: string = element.nativePath.replace(new RegExp(`.*${pickFolderName}[\\\\|\\/]`), "");
      //.split(/\\|\//gm);

      // let parentName = element.nativePath.replace(/.*[\\|\/](.+?)[\\|\/]/, "$1/").replace(/(.*)\/.*/gm, "$1");

      if (element.name !== `${pickFolderName} ${names.__EXPORT__}`) {
        await subFolderTreePath.push({
          pickFloderSymbol: pickFolderSymbol,
          pickFolderName: pickFolderName,
          relativePath: parentNames,
          folderName: element.name,
          folderSymbol: element,
        });
      }

      await loopFolder(await getSubFolders(element));
    }
  };

  await loopFolder(await getSubFolders(pickFolderSymbol));
  return subFolderTreePath;
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
 * create sub folder in parentSymbol folder, use path， return the last foldersymbol
 * @param parentSymbol
 * @param path c:\...\... or c/.../...
 */
export async function createSubPathFolder(parentSymbol: any, path: string) {
  let paths: string[] = path
    .replace(new RegExp(`.*${parentSymbol.nativePath.replace(/.*[\\|\/](.*)/gm, "$1")}[\\\\|\\/]`), "")
    .split(/\\|\//gm);

  if (paths.length > 0) {
    for (let f = 0; f < paths.length; f++) {
      const element = paths[f];
      parentSymbol = await createSubFolder(parentSymbol, element);
    }
  }
}

/**
 *
 * @param folderTreePaths
 * @param doWithEntry (entry only use psd)
 */
export async function createExportFolderOnRoot(folderTreePaths: IFloderTreePath[], doWithEntry?: (entry) => void) {
  console.log(123);

  let exportRootFolder = await createSubFolder(
    folderTreePaths[0].pickFloderSymbol,
    `${folderTreePaths[0].pickFolderName} ${names.__EXPORT__}`
  );
  for (let i = 0; i < folderTreePaths.length; i++) {
    const element = folderTreePaths[i];
    await createSubPathFolder(exportRootFolder, element.relativePath);

    //let soureFiles = await getFiles(element.folderSymbol, `PSD`);
    // if (soureFiles.length > 0) for (let j = 0; j < soureFiles.length; j++) await doWithEntry(soureFiles[j]);
  }
}
