export const secureStorage = require("uxp").storage.secureStorage;

/**
 * key: exportPickPath
 * @param path
 */
export async function setExportPickPathItem(path: string) {
  secureStorage.setItem("exportPickPath", path);
}

export async function getItem(key: string) {
  secureStorage.getItem(key);
}
