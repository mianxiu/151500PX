"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFolder = exports.getPluginFolder = exports.createExportFolderOnRoot = exports.createSubPathFolder = exports.createSubFolder = exports.getAllSubFoldersPath = exports.getSubFolders = exports.getFiles = exports.getFolderName = exports.isExitSubFolder = exports.pickFolder = void 0;
var names = require("../module/names");
var localFileSystem = require("uxp").storage.localFileSystem;
function pickFolder() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, localFileSystem.getFolder()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.pickFolder = pickFolder;
function isExitSubFolder(parentFolderSymbol, folderName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parentFolderSymbol
                        .getEntry(folderName)
                        .then(function (done) {
                        return true;
                    })
                        .catch(function (error) {
                        return false;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.isExitSubFolder = isExitSubFolder;
/**
 * return symbol name
 * @param folderSymbol
 */
function getFolderName(folderSymbol) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, folderSymbol.nativePath.replace(new RegExp(".*([\\/|\\\\].*)"), "$1")];
        });
    });
}
exports.getFolderName = getFolderName;
/**
 *  return files obj array
 * @param folderSymbol
 * @param filterFilenameExtension user [matchName|...] likes PSD|TIFF... or other Regex text,RegExp(`.*\\.\(${filterFilenameExtension}\)`, "i");
 *
 */
function getFiles(folderSymbol, filterFilenameExtension) {
    if (filterFilenameExtension === void 0) { filterFilenameExtension = ".*"; }
    return __awaiter(this, void 0, void 0, function () {
        var entries, nameExtensionRegexp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, folderSymbol.getEntries()];
                case 1:
                    entries = _a.sent();
                    nameExtensionRegexp = RegExp(".*\\.(" + filterFilenameExtension + ")", "i");
                    return [2 /*return*/, entries.filter(function (entry) { return nameExtensionRegexp.test(entry.name) && entry.isFile; })];
            }
        });
    });
}
exports.getFiles = getFiles;
/**
 * return sub folder promise
 * @param folderSymbol
 */
function getSubFolders(folderSymbol) {
    return __awaiter(this, void 0, void 0, function () {
        var entries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, folderSymbol.getEntries()];
                case 1:
                    entries = _a.sent();
                    return [2 /*return*/, entries.filter(function (entry) { return entry.isFolder; })];
            }
        });
    });
}
exports.getSubFolders = getSubFolders;
/**
 * loop get all sub folder,return folderSymbol array [left,left-sub,right,right-sub]
 * @param pickFolderSymbol
 */
function getAllSubFoldersPath(pickFolderSymbol) {
    return __awaiter(this, void 0, void 0, function () {
        var subFolderTreePath, pickFolderName, isEmptySubFolder, loopFolder, _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    subFolderTreePath = [];
                    pickFolderName = pickFolderSymbol.nativePath.replace(/.*[\\|\/](.*)/gm, "$1");
                    return [4 /*yield*/, getSubFolders(pickFolderSymbol)];
                case 1: return [4 /*yield*/, (_b.sent()).length];
                case 2:
                    isEmptySubFolder = (_b.sent()) < 1 ? true : false;
                    if (isEmptySubFolder === true)
                        return [2 /*return*/, (subFolderTreePath = [
                                {
                                    pickFloderSymbol: pickFolderSymbol,
                                    pickFolderName: pickFolderName,
                                    relativePath: "/",
                                    folderName: pickFolderName,
                                    folderSymbol: pickFolderSymbol,
                                },
                            ])];
                    loopFolder = function (subFolders) { return __awaiter(_this, void 0, void 0, function () {
                        var i, element, relativePath, _a, _b, _c, _d, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    i = 0;
                                    _f.label = 1;
                                case 1:
                                    if (!(i < subFolders.length)) return [3 /*break*/, 7];
                                    element = subFolders[i];
                                    _b = (_a = element.nativePath).replace;
                                    _c = RegExp.bind;
                                    _d = ".*\\";
                                    return [4 /*yield*/, getFolderName(pickFolderSymbol)];
                                case 2:
                                    relativePath = _b.apply(_a, [new (_c.apply(RegExp, [void 0, _d + (_f.sent()) + "([\\\\|\\/].*)"]))(), "$1"]);
                                    //.split(/\\|\//gm);
                                    // let parentName = element.nativePath.replace(/.*[\\|\/](.+?)[\\|\/]/, "$1/").replace(/(.*)\/.*/gm, "$1");
                                    return [4 /*yield*/, subFolderTreePath.push({
                                            pickFloderSymbol: pickFolderSymbol,
                                            pickFolderName: pickFolderName,
                                            relativePath: relativePath,
                                            folderName: element.name,
                                            folderSymbol: element,
                                        })];
                                case 3:
                                    //.split(/\\|\//gm);
                                    // let parentName = element.nativePath.replace(/.*[\\|\/](.+?)[\\|\/]/, "$1/").replace(/(.*)\/.*/gm, "$1");
                                    _f.sent();
                                    if (element.name !== pickFolderName + " " + names.__EXPORT__) {
                                    }
                                    _e = loopFolder;
                                    return [4 /*yield*/, getSubFolders(element)];
                                case 4: return [4 /*yield*/, _e.apply(void 0, [_f.sent()])];
                                case 5:
                                    _f.sent();
                                    _f.label = 6;
                                case 6:
                                    i++;
                                    return [3 /*break*/, 1];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); };
                    _a = loopFolder;
                    return [4 /*yield*/, getSubFolders(pickFolderSymbol)];
                case 3: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 4:
                    _b.sent();
                    return [2 /*return*/, subFolderTreePath];
            }
        });
    });
}
exports.getAllSubFoldersPath = getAllSubFoldersPath;
/**
 * create a sub folder in parent folder,and return sub folder symbol
 * @param parentSymbol
 * @param subFolderName
 */
function createSubFolder(parentSymbol, subFolderName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parentSymbol.getEntry(subFolderName).catch(function (onRejected) {
                        return parentSymbol.createFolder(subFolderName);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.createSubFolder = createSubFolder;
/**
 * create sub folder in parentSymbol folder, use path， return the last foldersymbol
 * if path is /|\, return parent symbol
 * @param parentSymbol
 * @param path c:\...\... or c/.../...
 */
function createSubPathFolder(parentSymbol, path) {
    return __awaiter(this, void 0, void 0, function () {
        var paths, f, element;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paths = path
                        .replace(new RegExp(".*" + parentSymbol.nativePath.replace(/.*[\\|\/](.*)/gm, "$1") + "[\\\\|\\/]"), "")
                        .split(/\\|\//gm);
                    if (!(paths.length > 0)) return [3 /*break*/, 5];
                    f = 0;
                    _a.label = 1;
                case 1:
                    if (!(f < paths.length)) return [3 /*break*/, 4];
                    element = paths[f];
                    return [4 /*yield*/, createSubFolder(parentSymbol, element)];
                case 2:
                    parentSymbol = _a.sent();
                    _a.label = 3;
                case 3:
                    f++;
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, parentSymbol];
                case 6: return [2 /*return*/, _a.sent()];
                case 7: return [4 /*yield*/, parentSymbol];
                case 8: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.createSubPathFolder = createSubPathFolder;
/**
 *
 * @param folderTreePaths
 * @param doWithEntry get entry callback do something
 */
function createExportFolderOnRoot(folderTreePaths, ignoreEmptyFolder, doWithEntry) {
    if (ignoreEmptyFolder === void 0) { ignoreEmptyFolder = false; }
    return __awaiter(this, void 0, void 0, function () {
        var pickFolderSymbol, exportRootFolderName, exportRootFolder, i, element, sourceFiles, j, entryPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(12346);
                    console.log(folderTreePaths);
                    return [4 /*yield*/, folderTreePaths[0].pickFloderSymbol];
                case 1:
                    pickFolderSymbol = _a.sent();
                    return [4 /*yield*/, folderTreePaths[0].pickFolderName + " " + names.__EXPORT__];
                case 2:
                    exportRootFolderName = _a.sent();
                    return [4 /*yield*/, createSubFolder(pickFolderSymbol, exportRootFolderName)];
                case 3:
                    exportRootFolder = _a.sent();
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < folderTreePaths.length)) return [3 /*break*/, 14];
                    element = folderTreePaths[i];
                    console.log(element);
                    return [4 /*yield*/, getFiles(element.folderSymbol, "PSD|PSB")];
                case 5:
                    sourceFiles = _a.sent();
                    if (!(ignoreEmptyFolder === false)) return [3 /*break*/, 7];
                    return [4 /*yield*/, createSubPathFolder(exportRootFolder, element.relativePath)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7:
                    if (!(ignoreEmptyFolder === true && sourceFiles.length > 0)) return [3 /*break*/, 9];
                    return [4 /*yield*/, createSubPathFolder(exportRootFolder, element.relativePath)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    if (!(sourceFiles.length > 0)) return [3 /*break*/, 13];
                    j = 0;
                    _a.label = 10;
                case 10:
                    if (!(j < sourceFiles.length)) return [3 /*break*/, 13];
                    entryPath = {
                        entrySymbol: sourceFiles[j],
                        exportRoot: exportRootFolderName,
                        relateivePath: element.relativePath,
                    };
                    return [4 /*yield*/, doWithEntry(entryPath)];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12:
                    j++;
                    return [3 /*break*/, 10];
                case 13:
                    i++;
                    return [3 /*break*/, 4];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.createExportFolderOnRoot = createExportFolderOnRoot;
/**
 * @todo set pen or other preset to program
 */
function getPluginFolder() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = console).log;
                    return [4 /*yield*/, localFileSystem.getPluginFolder()];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getPluginFolder = getPluginFolder;
/**
 * @ set data
 */
function getDataFolder() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = console).log;
                    return [4 /*yield*/, localFileSystem.getDataFolder()];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getDataFolder = getDataFolder;
