const localFileSystem = require("uxp").storage.localFileSystem;
/**
 * retrun a folder<promise>
 */
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
 *
 * @param folder
 */
export async function getSubFolder(folder): Promise<any[]> {
  const entries = await folder.getEntries();
  return entries.filter(entry => entry.isFolder);
}
