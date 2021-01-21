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

export async function isExitSubFolder(
  parentFolderSymbol: any,
  folderName: string
) {
  return await parentFolderSymbol
    .getEntry(folderName)
    .then((done) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
}

/**
 * return symbol name
 * @param folderSymbol
 */
export async function getFolderName(folderSymbol: any): Promise<string> {
  return folderSymbol.nativePath.replace(new RegExp(`.*([\\/|\\\\].*)`), "$1");
}
/**
 *  return files obj array
 * @param folderSymbol
 * @param filterFilenameExtension  PSD/TIFF... or other
 */
export async function getFiles(
  folderSymbol,
  filterFilenameExtension: string = `.*`
): Promise<any[]> {
  const entries = await folderSymbol.getEntries();
  const nameExtensionRegexp: RegExp = RegExp(
    `.*\\.${filterFilenameExtension}`,
    "i"
  );

  return entries.filter(
    (entry) => nameExtensionRegexp.test(entry.name) && entry.isFile
  );
}

/**
 * return sub folder promise
 * @param folderSymbol
 */
export async function getSubFolders(folderSymbol): Promise<any[]> {
  const entries = await folderSymbol.getEntries();
  return entries.filter((entry) => entry.isFolder);
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
export async function getAllSubFoldersPath(pickFolderSymbol) {
  let subFolderTreePath: IFloderTreePath[] = [];
  let pickFolderName = pickFolderSymbol.nativePath.replace(
    /.*[\\|\/](.*)/gm,
    "$1"
  );

  let isEmptySubFolder: boolean =
    (await (await getSubFolders(pickFolderSymbol)).length) < 1 ? true : false;
  if (isEmptySubFolder === true)
    return (subFolderTreePath = [
      {
        pickFloderSymbol: pickFolderSymbol,
        pickFolderName: pickFolderName,
        relativePath: "/",
        folderName: pickFolderName,
        folderSymbol: pickFolderSymbol,
      },
    ]);

  let loopFolder = async (subFolders) => {
    /**
     * for loop is left-leftSub-right-rightSub
     * foreach loop is left-right-leftSub-rightSub
     */
    for (let i = 0; i < subFolders.length; i++) {
      let element = subFolders[i];

      // relativepath is path string, like \a\b\c on pickfolder
      let relativePath: string = element.nativePath.replace(
        new RegExp(
          `.*\\${await getFolderName(pickFolderSymbol)}([\\\\|\\/].*)`
        ),
        "$1"
      );
      //.split(/\\|\//gm);

      // let parentName = element.nativePath.replace(/.*[\\|\/](.+?)[\\|\/]/, "$1/").replace(/(.*)\/.*/gm, "$1");
      await subFolderTreePath.push({
        pickFloderSymbol: pickFolderSymbol,
        pickFolderName: pickFolderName,
        relativePath: relativePath,
        folderName: element.name,
        folderSymbol: element,
      });

      if (element.name !== `${pickFolderName} ${names.__EXPORT__}`) {
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
export async function createSubFolder(
  parentSymbol: any,
  subFolderName: string
) {
  return await parentSymbol.getEntry(subFolderName).catch((onRejected) => {
    return parentSymbol.createFolder(subFolderName);
  });
}

/**
 * create sub folder in parentSymbol folder, use path， return the last foldersymbol
 * if path is /|\, return parent symbol
 * @param parentSymbol
 * @param path c:\...\... or c/.../...
 */
export async function createSubPathFolder(parentSymbol: any, path: string) {
  let paths: string[] = path
    .replace(
      new RegExp(
        `.*${parentSymbol.nativePath.replace(
          /.*[\\|\/](.*)/gm,
          "$1"
        )}[\\\\|\\/]`
      ),
      ""
    )
    .split(/\\|\//gm);

  if (paths.length > 0) {
    for (let f = 0; f < paths.length; f++) {
      const element = paths[f];
      parentSymbol = await createSubFolder(parentSymbol, element);
    }
  } else {
    return await parentSymbol;
  }
  return await parentSymbol;
}

interface IEntryPath {
  /**
   * entry symbol
   */
  entrySymbol: any;
  /**
   * under pickfolder,like pickFolder/exportRoot/sub/sub
   */
  exportRoot: string;
  /**
   * relateive path on pick folder, like pikcFolder/a/b/c/file.psd
   */
  relateivePath: string; // reed
}

/**
 *
 * @param folderTreePaths
 * @param doWithEntry get entry callback do something
 */
export async function createExportFolderOnRoot(
  folderTreePaths: IFloderTreePath[],
  ignoreEmptyFolder: boolean = false,
  doWithEntry?: (entry: IEntryPath) => void
) {
  console.log(12346);
  console.log(folderTreePaths);
  /**
   *  create source folder and get root files and do something
   */
  let pickFolderSymbol = await folderTreePaths[0].pickFloderSymbol;

  let exportRootFolderName = await `${folderTreePaths[0].pickFolderName} ${names.__EXPORT__}`;
  let exportRootFolder = await createSubFolder(
    pickFolderSymbol,
    exportRootFolderName
  );

  let sourceRootFiles = await getFiles(pickFolderSymbol, `PSD`);

  // for (let r = 0; r < sourceRootFiles.length; r++) {
  //   const rootEntry = sourceRootFiles[r];
  //   await doWithEntry({
  //     entrySymbol: rootEntry,
  //     exportRoot: exportRootFolderName,
  //     relateivePath: "/",
  //   });
  // }

  /**
   * loop create sub folder files and do something
   */
  for (let i = 0; i < folderTreePaths.length; i++) {
    const element = folderTreePaths[i];

    console.log(element);

    let sourceFiles = await getFiles(element.folderSymbol, `PSD`);
    if (ignoreEmptyFolder === false) {
      await createSubPathFolder(exportRootFolder, element.relativePath);
    } else if (ignoreEmptyFolder === true && sourceFiles.length > 0) {
      await createSubPathFolder(exportRootFolder, element.relativePath);
    }

    if (sourceFiles.length > 0)
      for (let j = 0; j < sourceFiles.length; j++) {
        let entryPath: IEntryPath = {
          entrySymbol: sourceFiles[j],
          exportRoot: exportRootFolderName,
          relateivePath: element.relativePath,
        };
        await doWithEntry(entryPath);
      }
  }
}
