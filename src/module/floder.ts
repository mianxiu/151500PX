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
export async function getSubFolder(folder): Promise<any[]> {
  const entries = await folder.getEntries();
  return entries.filter(entry => entry.isFolder);
}

export async function createFolder(path: string) {
  let aa = await pickFolder();
  aa.createFolder(path);
}

export async function createSubFolder(parentPath: string, subFolderNamer) {}

interface IFloderTreePath {
  rootPath: string;
  nativePath: string;
  folderName: string;
  folderSymbol: any;
}
export async function getAllSubFolder(pickFolder) {
  let allSubFolder: IFloderTreePath[] = [];

  let loopFolder = async subFolders => {
    subFolders.forEach(async subFolder => {
      let folderTree: IFloderTreePath = await {
        rootPath: pickFolder.nativePath,
        nativePath: subFolder.nativePath,
        folderName: subFolder.name,
        folderSymbol: subFolder,
      };
      await allSubFolder.push(folderTree);

      if (subFolders.length > 0) {
        console.log(subFolders.length);
        await loopFolder(await getSubFolder(subFolder));
      }
    });
  };

  loopFolder(await getSubFolder(pickFolder));

  console.log(await allSubFolder);
}
