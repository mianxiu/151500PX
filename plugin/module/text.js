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
exports.createText = void 0;
function createText(textString, fontSize) {
    if (fontSize === void 0) { fontSize = 12; }
    return __awaiter(this, void 0, void 0, function () {
        var batchPlay, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    batchPlay = require("photoshop").action.batchPlay;
                    return [4 /*yield*/, batchPlay([
                            {
                                _obj: "make",
                                _target: [
                                    {
                                        _ref: "textLayer",
                                    },
                                ],
                                using: {
                                    _obj: "textLayer",
                                    textKey: textString,
                                    warp: {
                                        _obj: "warp",
                                        warpStyle: {
                                            _enum: "warpStyle",
                                            _value: "warpNone",
                                        },
                                        warpValue: 0,
                                        warpPerspective: 0,
                                        warpPerspectiveOther: 0,
                                        warpRotate: {
                                            _enum: "orientation",
                                            _value: "horizontal",
                                        },
                                    },
                                    textClickPoint: {
                                        _obj: "paint",
                                        horizontal: {
                                            _unit: "percentUnit",
                                            _value: 77.49721782932112,
                                        },
                                        vertical: {
                                            _unit: "percentUnit",
                                            _value: 29.138981173864877,
                                        },
                                    },
                                    textGridding: {
                                        _enum: "textGridding",
                                        _value: "none",
                                    },
                                    orientation: {
                                        _enum: "orientation",
                                        _value: "horizontal",
                                    },
                                    antiAlias: {
                                        _enum: "antiAliasType",
                                        _value: "antiAliasSharp",
                                    },
                                    bounds: {
                                        _obj: "bounds",
                                        left: {
                                            _unit: "pointsUnit",
                                            _value: 0,
                                        },
                                        top: {
                                            _unit: "pointsUnit",
                                            _value: -10.56005859375,
                                        },
                                        right: {
                                            _unit: "pointsUnit",
                                            _value: 20.23187255859375,
                                        },
                                        bottom: {
                                            _unit: "pointsUnit",
                                            _value: 3.39605712890625,
                                        },
                                    },
                                    boundingBox: {
                                        _obj: "boundingBox",
                                        left: {
                                            _unit: "pointsUnit",
                                            _value: 0.74983154296875,
                                        },
                                        top: {
                                            _unit: "pointsUnit",
                                            _value: -9.12,
                                        },
                                        right: {
                                            _unit: "pointsUnit",
                                            _value: 19.70395751953125,
                                        },
                                        bottom: {
                                            _unit: "pointsUnit",
                                            _value: 0.27600219726562497,
                                        },
                                    },
                                    textShape: [
                                        {
                                            _obj: "textShape",
                                            char: {
                                                _enum: "char",
                                                _value: "paint",
                                            },
                                            orientation: {
                                                _enum: "orientation",
                                                _value: "horizontal",
                                            },
                                            transform: {
                                                _obj: "transform",
                                                xx: 1,
                                                xy: 0,
                                                yx: 0,
                                                yy: 1,
                                                tx: 0,
                                                ty: 0,
                                            },
                                            rowCount: 1,
                                            columnCount: 1,
                                            rowMajorOrder: true,
                                            rowGutter: {
                                                _unit: "pointsUnit",
                                                _value: 0,
                                            },
                                            columnGutter: {
                                                _unit: "pointsUnit",
                                                _value: 0,
                                            },
                                            spacing: {
                                                _unit: "pointsUnit",
                                                _value: 0,
                                            },
                                            frameBaselineAlignment: {
                                                _enum: "frameBaselineAlignment",
                                                _value: "alignByAscent",
                                            },
                                            firstBaselineMinimum: {
                                                _unit: "pointsUnit",
                                                _value: 0,
                                            },
                                            base: {
                                                _obj: "paint",
                                                horizontal: 0,
                                                vertical: 0,
                                            },
                                        },
                                    ],
                                    textStyleRange: [
                                        {
                                            _obj: "textStyleRange",
                                            from: 0,
                                            to: 4,
                                            textStyle: {
                                                _obj: "textStyle",
                                                styleSheetHasParent: true,
                                                fontPostScriptName: "AdobeHeitiStd-Regular",
                                                fontName: "Adobe Heiti Std",
                                                fontStyleName: "R",
                                                fontScript: 25,
                                                fontTechnology: 2,
                                                fontAvailable: true,
                                                size: {
                                                    _unit: "pointsUnit",
                                                    _value: fontSize,
                                                },
                                                impliedFontSize: {
                                                    _unit: "pointsUnit",
                                                    _value: fontSize,
                                                },
                                                horizontalScale: 100,
                                                verticalScale: 100,
                                                syntheticBold: false,
                                                syntheticItalic: false,
                                                autoLeading: true,
                                                tracking: 0,
                                                baselineShift: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                impliedBaselineShift: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                fontCaps: {
                                                    _enum: "fontCaps",
                                                    _value: "normal",
                                                },
                                                digitSet: {
                                                    _enum: "digitSet",
                                                    _value: "arabicDigits",
                                                },
                                                kashidas: {
                                                    _enum: "kashidas",
                                                    _value: "kashidaDefault",
                                                },
                                                diacXOffset: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                diacYOffset: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                markYDistFromBaseline: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                baseline: {
                                                    _enum: "baseline",
                                                    _value: "normal",
                                                },
                                                otbaseline: {
                                                    _enum: "otbaseline",
                                                    _value: "normal",
                                                },
                                                strikethrough: {
                                                    _enum: "strikethrough",
                                                    _value: "strikethroughOff",
                                                },
                                                underline: {
                                                    _enum: "underline",
                                                    _value: "underlineOff",
                                                },
                                                ligature: true,
                                                altligature: false,
                                                contextualLigatures: true,
                                                fractions: false,
                                                ordinals: false,
                                                swash: false,
                                                titling: false,
                                                connectionForms: true,
                                                stylisticAlternates: false,
                                                stylisticSets: 0,
                                                ornaments: false,
                                                justificationAlternates: false,
                                                figureStyle: {
                                                    _enum: "figureStyle",
                                                    _value: "normal",
                                                },
                                                proportionalMetrics: false,
                                                kana: false,
                                                italics: false,
                                                baselineDirection: {
                                                    _enum: "baselineDirection",
                                                    _value: "rotated",
                                                },
                                                textLanguage: {
                                                    _enum: "textLanguage",
                                                    _value: "englishLanguage",
                                                },
                                                japaneseAlternate: {
                                                    _enum: "japaneseAlternate",
                                                    _value: "defaultForm",
                                                },
                                                mojiZume: 0,
                                                gridAlignment: {
                                                    _enum: "gridAlignment",
                                                    _value: "roman",
                                                },
                                                noBreak: false,
                                                color: {
                                                    _obj: "RGBColor",
                                                    red: 0,
                                                    grain: 0,
                                                    blue: 0,
                                                },
                                                strokeColor: {
                                                    _obj: "RGBColor",
                                                    red: 0,
                                                    grain: 0,
                                                    blue: 0,
                                                },
                                                baseParentStyle: {
                                                    _obj: "textStyle",
                                                    fontPostScriptName: "AdobeHeitiStd-Regular",
                                                    fontName: "Adobe Heiti Std",
                                                    fontStyleName: "R",
                                                    fontScript: 25,
                                                    fontTechnology: 2,
                                                    fontAvailable: true,
                                                    size: {
                                                        _unit: "pointsUnit",
                                                        _value: 12,
                                                    },
                                                    impliedFontSize: {
                                                        _unit: "pointsUnit",
                                                        _value: 12,
                                                    },
                                                    horizontalScale: 100,
                                                    verticalScale: 100,
                                                    syntheticBold: false,
                                                    syntheticItalic: false,
                                                    autoLeading: true,
                                                    tracking: 0,
                                                    baselineShift: {
                                                        _unit: "pointsUnit",
                                                        _value: 0,
                                                    },
                                                    impliedBaselineShift: {
                                                        _unit: "pointsUnit",
                                                        _value: 0,
                                                    },
                                                    characterRotation: 0,
                                                    autoKern: {
                                                        _enum: "autoKern",
                                                        _value: "metricsKern",
                                                    },
                                                    fontCaps: {
                                                        _enum: "fontCaps",
                                                        _value: "normal",
                                                    },
                                                    digitSet: {
                                                        _enum: "digitSet",
                                                        _value: "defaultDigits",
                                                    },
                                                    dirOverride: {
                                                        _enum: "dirOverride",
                                                        _value: "dirOverrideDefault",
                                                    },
                                                    kashidas: {
                                                        _enum: "kashidas",
                                                        _value: "kashidaDefault",
                                                    },
                                                    diacVPos: {
                                                        _enum: "diacVPos",
                                                        _value: "diacVPosOpenType",
                                                    },
                                                    diacXOffset: {
                                                        _unit: "pointsUnit",
                                                        _value: 0,
                                                    },
                                                    diacYOffset: {
                                                        _unit: "pointsUnit",
                                                        _value: 0,
                                                    },
                                                    markYDistFromBaseline: {
                                                        _unit: "pointsUnit",
                                                        _value: 100,
                                                    },
                                                    baseline: {
                                                        _enum: "baseline",
                                                        _value: "normal",
                                                    },
                                                    otbaseline: {
                                                        _enum: "otbaseline",
                                                        _value: "normal",
                                                    },
                                                    strikethrough: {
                                                        _enum: "strikethrough",
                                                        _value: "strikethroughOff",
                                                    },
                                                    underline: {
                                                        _enum: "underline",
                                                        _value: "underlineOff",
                                                    },
                                                    underlineOffset: {
                                                        _unit: "pointsUnit",
                                                        _value: 0,
                                                    },
                                                    ligature: true,
                                                    altligature: false,
                                                    contextualLigatures: false,
                                                    alternateLigatures: false,
                                                    oldStyle: false,
                                                    fractions: false,
                                                    ordinals: false,
                                                    swash: false,
                                                    titling: false,
                                                    connectionForms: false,
                                                    stylisticAlternates: false,
                                                    stylisticSets: 0,
                                                    ornaments: false,
                                                    justificationAlternates: false,
                                                    figureStyle: {
                                                        _enum: "figureStyle",
                                                        _value: "normal",
                                                    },
                                                    proportionalMetrics: false,
                                                    kana: false,
                                                    italics: false,
                                                    ruby: false,
                                                    baselineDirection: {
                                                        _enum: "baselineDirection",
                                                        _value: "rotated",
                                                    },
                                                    textLanguage: {
                                                        _enum: "textLanguage",
                                                        _value: "englishLanguage",
                                                    },
                                                    japaneseAlternate: {
                                                        _enum: "japaneseAlternate",
                                                        _value: "defaultForm",
                                                    },
                                                    mojiZume: 0,
                                                    gridAlignment: {
                                                        _enum: "gridAlignment",
                                                        _value: "roman",
                                                    },
                                                    enableWariChu: false,
                                                    wariChuCount: 2,
                                                    wariChuLineGap: 0,
                                                    wariChuScale: 0.5,
                                                    wariChuWidow: 2,
                                                    wariChuOrphan: 2,
                                                    wariChuJustification: {
                                                        _enum: "wariChuJustification",
                                                        _value: "wariChuAutoJustify",
                                                    },
                                                    tcyUpDown: 0,
                                                    tcyLeftRight: 0,
                                                    leftAki: -1,
                                                    rightAki: -1,
                                                    jiDori: 0,
                                                    noBreak: false,
                                                    color: {
                                                        _obj: "RGBColor",
                                                        red: 0,
                                                        grain: 0,
                                                        blue: 0,
                                                    },
                                                    strokeColor: {
                                                        _obj: "RGBColor",
                                                        red: 0,
                                                        grain: 0,
                                                        blue: 0,
                                                    },
                                                    fill: true,
                                                    stroke: false,
                                                    fillFirst: true,
                                                    fillOverPrint: false,
                                                    strokeOverPrint: false,
                                                    lineCap: {
                                                        _enum: "lineCap",
                                                        _value: "buttCap",
                                                    },
                                                    lineJoin: {
                                                        _enum: "lineJoin",
                                                        _value: "miterJoin",
                                                    },
                                                    lineWidth: {
                                                        _unit: "pointsUnit",
                                                        _value: 1,
                                                    },
                                                    miterLimit: {
                                                        _unit: "pointsUnit",
                                                        _value: 4,
                                                    },
                                                    lineDashoffset: 0,
                                                },
                                            },
                                        },
                                    ],
                                    paragraphStyleRange: [
                                        {
                                            _obj: "paragraphStyleRange",
                                            from: 0,
                                            to: 4,
                                            paragraphStyle: {
                                                _obj: "paragraphStyle",
                                                styleSheetHasParent: true,
                                                align: {
                                                    _enum: "alignmentType",
                                                    _value: "left",
                                                },
                                                firstLineIndent: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                impliedFirstLineIndent: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                startIndent: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                impliedStartIndent: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                endIndent: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                impliedEndIndent: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                spaceBefore: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                impliedSpaceBefore: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                spaceAfter: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                impliedSpaceAfter: {
                                                    _unit: "pointsUnit",
                                                    _value: 0,
                                                },
                                                dropCapMultiplier: 1,
                                                autoLeadingPercentage: 1.2000000476837158,
                                                leadingType: {
                                                    _enum: "leadingType",
                                                    _value: "leadingBelow",
                                                },
                                                directionType: {
                                                    _enum: "directionType",
                                                    _value: "dirLeftToRight",
                                                },
                                                kashidaWidthType: {
                                                    _enum: "kashidaWidthType",
                                                    _value: "kashidaWidthMedium",
                                                },
                                                justificationMethodType: {
                                                    _enum: "justificationMethodType",
                                                    _value: "justifMethodAutomatic",
                                                },
                                                hyphenate: false,
                                                hyphenateWordSize: 6,
                                                hyphenatePreLength: 2,
                                                hyphenatePostLength: 2,
                                                hyphenateLimit: 0,
                                                hyphenationZone: 36,
                                                hyphenateCapitalized: true,
                                                hyphenationPreference: 0.5,
                                                justificationWordMinimum: 0.800000011920929,
                                                justificationWordDesired: 1,
                                                justificationWordMaximum: 1.3300000429153442,
                                                justificationLetterMinimum: 0,
                                                justificationLetterDesired: 0,
                                                justificationLetterMaximum: 0,
                                                justificationGlyphMinimum: 1,
                                                justificationGlyphDesired: 1,
                                                justificationGlyphMaximum: 1,
                                                singleWordJustification: {
                                                    _enum: "alignmentType",
                                                    _value: "justifyAll",
                                                },
                                                hangingRoman: false,
                                                autoTCY: 0,
                                                keepTogether: true,
                                                burasagari: {
                                                    _enum: "burasagari",
                                                    _value: "burasagariNone",
                                                },
                                                preferredKinsokuOrder: {
                                                    _enum: "preferredKinsokuOrder",
                                                    _value: "pushIn",
                                                },
                                                kurikaeshiMojiShori: false,
                                                textEveryLineComposer: false,
                                                defaultTabWidth: 36,
                                                defaultStyle: {
                                                    _obj: "textStyle",
                                                    fontPostScriptName: "MyriadPro-Regular",
                                                    fontName: "Myriad Pro",
                                                    fontStyleName: "Regular",
                                                    fontScript: 0,
                                                    fontTechnology: 0,
                                                    fontAvailable: true,
                                                    size: {
                                                        _unit: "pointsUnit",
                                                        _value: 12,
                                                    },
                                                    horizontalScale: 100,
                                                    verticalScale: 100,
                                                    syntheticBold: false,
                                                    syntheticItalic: false,
                                                    autoLeading: true,
                                                    tracking: 0,
                                                    baselineShift: {
                                                        _unit: "pointsUnit",
                                                        _value: 0,
                                                    },
                                                    characterRotation: 0,
                                                    autoKern: {
                                                        _enum: "autoKern",
                                                        _value: "metricsKern",
                                                    },
                                                    fontCaps: {
                                                        _enum: "fontCaps",
                                                        _value: "normal",
                                                    },
                                                    digitSet: {
                                                        _enum: "digitSet",
                                                        _value: "arabicDigits",
                                                    },
                                                    kashidas: {
                                                        _enum: "kashidas",
                                                        _value: "kashidaDefault",
                                                    },
                                                    diacVPos: {
                                                        _enum: "diacVPos",
                                                        _value: "diacVPosOpenType",
                                                    },
                                                    diacXOffset: {
                                                        _unit: "pointsUnit",
                                                        _value: 0,
                                                    },
                                                    diacYOffset: {
                                                        _unit: "pointsUnit",
                                                        _value: 0,
                                                    },
                                                    markYDistFromBaseline: {
                                                        _unit: "pointsUnit",
                                                        _value: 0,
                                                    },
                                                    baseline: {
                                                        _enum: "baseline",
                                                        _value: "normal",
                                                    },
                                                    strikethrough: {
                                                        _enum: "strikethrough",
                                                        _value: "strikethroughOff",
                                                    },
                                                    underline: {
                                                        _enum: "underline",
                                                        _value: "underlineOff",
                                                    },
                                                    ligature: true,
                                                    altligature: false,
                                                    contextualLigatures: true,
                                                    alternateLigatures: false,
                                                    oldStyle: false,
                                                    fractions: false,
                                                    ordinals: false,
                                                    swash: false,
                                                    titling: false,
                                                    connectionForms: false,
                                                    stylisticAlternates: false,
                                                    stylisticSets: 0,
                                                    ornaments: false,
                                                    figureStyle: {
                                                        _enum: "figureStyle",
                                                        _value: "normal",
                                                    },
                                                    textLanguage: {
                                                        _enum: "textLanguage",
                                                        _value: "englishLanguage",
                                                    },
                                                    color: {
                                                        _obj: "RGBColor",
                                                        red: 0,
                                                        grain: 0,
                                                        blue: 0,
                                                    },
                                                    strokeColor: {
                                                        _obj: "RGBColor",
                                                        red: 0,
                                                        grain: 0,
                                                        blue: 0,
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                    kerningRange: [],
                                },
                            },
                        ], {
                            synchronousExecution: false,
                            modalBehavior: "fail",
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createText = createText;