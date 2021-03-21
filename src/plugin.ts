import * as compressAndExport from "./action/compressAndExport";
import * as initPanel from "./action/initPanel";
import { getDataFolder, getPluginFolder } from "./module/floder";

/**
 * use obesever to listen event when fetch panel
 */
initPanel.initPanel();
initPanel.shortcutsListener();
