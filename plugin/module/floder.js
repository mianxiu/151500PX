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
exports.createExportFolderOnRoot = exports.createSubPathFolder = exports.createSubFolder = exports.getAllSubFolders = exports.getSubFolders = exports.getFiles = exports.isExitSubFolder = exports.pickFolder = void 0;
var names = require("../module/names");
var localFileSystem = require("uxp").storage.localFileSystem;
function pickFolder() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("pick folder");
                    return [4 /*yield*/, localFileSystem.getFolder()];
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
 *  return files obj array
 * @param folderSymbol
 * @param filterFilenameExtension  PSD/TIFF... or other
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
                    nameExtensionRegexp = RegExp(".*\\." + filterFilenameExtension, "i");
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
function getAllSubFolders(pickFolderSymbol) {
    return __awaiter(this, void 0, void 0, function () {
        var subFolderTreePath, pickFolderName, loopFolder, _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    subFolderTreePath = [];
                    pickFolderName = pickFolderSymbol.nativePath.replace(/.*[\\|\/](.*)/gm, "$1");
                    loopFolder = function (subFolders) { return __awaiter(_this, void 0, void 0, function () {
                        var i, element, parentNames, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    i = 0;
                                    _b.label = 1;
                                case 1:
                                    if (!(i < subFolders.length)) return [3 /*break*/, 7];
                                    element = subFolders[i];
                                    parentNames = element.nativePath.replace(new RegExp(".*" + pickFolderName + "[\\\\|\\/]"), "");
                                    if (!(element.name !== pickFolderName + " " + names.__EXPORT__)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, subFolderTreePath.push({
                                            pickFloderSymbol: pickFolderSymbol,
                                            pickFolderName: pickFolderName,
                                            relativePath: parentNames,
                                            folderName: element.name,
                                            folderSymbol: element,
                                        })];
                                case 2:
                                    _b.sent();
                                    _b.label = 3;
                                case 3:
                                    _a = loopFolder;
                                    return [4 /*yield*/, getSubFolders(element)];
                                case 4: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                                case 5:
                                    _b.sent();
                                    _b.label = 6;
                                case 6:
                                    i++;
                                    return [3 /*break*/, 1];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); };
                    _a = loopFolder;
                    return [4 /*yield*/, getSubFolders(pickFolderSymbol)];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 2:
                    _b.sent();
                    return [2 /*return*/, subFolderTreePath];
            }
        });
    });
}
exports.getAllSubFolders = getAllSubFolders;
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
                    if (!(paths.length > 0)) return [3 /*break*/, 4];
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
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createSubPathFolder = createSubPathFolder;
/**
 *
 * @param folderTreePaths
 * @param doWithEntry (entry only use psd)
 */
function createExportFolderOnRoot(folderTreePaths, doWithEntry) {
    return __awaiter(this, void 0, void 0, function () {
        var exportRootFolder, i, element;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(123);
                    return [4 /*yield*/, createSubFolder(folderTreePaths[0].pickFloderSymbol, folderTreePaths[0].pickFolderName + " " + names.__EXPORT__)];
                case 1:
                    exportRootFolder = _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < folderTreePaths.length)) return [3 /*break*/, 5];
                    element = folderTreePaths[i];
                    return [4 /*yield*/, createSubPathFolder(exportRootFolder, element.relativePath)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createExportFolderOnRoot = createExportFolderOnRoot;
