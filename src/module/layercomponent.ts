/**
 * batchPlay index is bottom to top
 * js index is top to bottom
 */

import * as batchPlayConfig from "./batchplayconfig";
import * as names from "./names";
import { createText, ISizeUnit } from "./text";
const app = require("photoshop").app;
const batchPlay = require("photoshop").action.batchPlay;

/**
 * app.documents 0
 */
export const activeDocument = () => {
  return app.documents.filter(e => e._id === app.activeDocument._id)[0];
};

export interface IBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 * if have nothing,is empty layer
 * @param bounds rectangle size of something in layer,base document left-top point, {left,top,right,bottom}
 */
export async function isEmptyLayer(bounds: IBounds): Promise<boolean> {
  let zero = bounds.left + bounds.top + bounds.right + bounds.bottom;
  return zero === 0 ? true : false;
}

interface IELementSize {
  width: number;
  height: number;
}

/**
 * get element rectangle size
 * @param layer layer
 */
export async function getElementSize(layer: any): Promise<IELementSize> {
  let layerBounds: IBounds = layer.bounds;

  let boundsLeft: number = layerBounds.left;
  let boundsTop: number = layerBounds.top;
  let boundsRight: number = layerBounds.right;
  let boundsBottom: number = layerBounds.bottom;

  let elementWidth: number = boundsRight - boundsLeft;
  let elementHeight: number = boundsBottom - boundsTop;

  let elementSize: IELementSize = {
    width: 0,
    height: 0,
  };

  return (elementSize = { width: elementWidth, height: elementHeight });
}

/**
 * decide element is vertcal or horizontal
 * @param elementSize
 */
export async function isVertical(elementSize: IELementSize): Promise<boolean | null> {
  if (elementSize.height > elementSize.width) {
    return true;
  } else if (elementSize.height < elementSize.width) {
    return false;
  }
  return null;
}

export async function deleteTarget() {
  await batchPlay([{ _obj: "delete", _target: batchPlayConfig._targetSelectLayers }], batchPlayConfig.defaultOptions());
}

/**
 * delete all empty layer
 */
export async function deleteAllEmptyLayers() {
  // layer lock is can't delete
  // use bounds to find empty layer

  let layers = activeDocument().layers;

  layers.map(async layer => {
    if (isEmptyLayer(layer.bounds)) {
      // if unuse selected,sometime it can't set false
      if (layer.locked) {
        layer.selected = await true;
        layer.locked = await false;
      }

      await layer.delete();
    }
  });
}

/**
 * deleteAllUnVisibleLayers
 * @param excludeLayer string[name,...]
 */
export async function deleteAllUnVisibleLayers(excludeLayer?: string[]) {
  let layers = activeDocument().layers;

  await layers.map(async layer => {
    if (layer.visible === false) {
      layer.selected = await true;
    } else {
      layer.selected = await false;
    }
  });

  for (let i = 0; i < excludeLayer.length; i++) {
    const nameRegxp = new RegExp(excludeLayer[i], "g");

    let j = 0;
    while (j < layers.length) {
      if (nameRegxp.test(layers[j].name) === true && layers[j].selected === true) {
        layers[j].selected = false;
        break;
      }
      j++;
    }
  }

  await deleteTarget();
}

/**
 * todo
 */
export async function deleteAllLayersExcludeTarget() {
  let layer = activeDocument().activeLayers[0].name === names.__DO_ACTION__ ? activeDocument().activeLayers[0] : null;
  if (layer !== null) {
  }
}

/**
 * ctrl + j
 */
export async function copyToLayer() {
  await batchPlay(
    [
      {
        _obj: "copyToLayer",
        _isCommand: true,
        _options: {
          dialogOptions: "dontDisplay",
        },
      },
    ],
    {
      synchronousExecution: false,
      modalBehavior: "fail",
    }
  );
}

/**
 * crop document size to active layer bounds, now only for a layer
 * @param margin maring to document boundary
 */
export async function cropToMargin(margin: number) {
  let layerBounds: IBounds =
    activeDocument().activeLayers.length === 1 ? activeDocument().activeLayers[0].bounds : null;

  let cropBounds: IBounds = { left: 0, top: 0, right: 0, bottom: 0 };

  cropBounds = {
    left: layerBounds.left - margin,
    top: layerBounds.top - margin,
    right: layerBounds.right + margin,
    bottom: layerBounds.bottom + margin,
  };

  activeDocument().crop(cropBounds, 0);
}

/**
 * crop document size to base active layer bounds's square, now only for a layer
 * @param margin
 */
export async function cropToSquare(margin: number) {
  //todo
  //something
  let layer = activeDocument().activeLayers.length === 1 ? activeDocument().activeLayers[0] : null;
  let layerBounds: IBounds = layer !== null ? layer.bounds : null;
  let layerSize: IELementSize = await getElementSize(layer);

  layerBounds = (await isVertical(layerSize))
    ? {
        left: layerBounds.left - (layerSize.height - layerSize.width) / 2,
        top: layerBounds.top,
        right: layerBounds.right + (layerSize.height - layerSize.width) / 2,
        bottom: layerBounds.bottom,
      }
    : {
        left: layerBounds.left,
        top: layerBounds.top - (layerSize.width - layerSize.height) / 2,
        right: layerBounds.right,
        bottom: layerBounds.bottom + (layerSize.width - layerSize.height) / 2,
      };

  let cropBounds: IBounds = {
    left: layerBounds.left - margin,
    top: layerBounds.top - margin,
    right: layerBounds.right + margin,
    bottom: layerBounds.bottom + margin,
  };
  console.log(layerBounds);
  activeDocument().crop(cropBounds);
}

/**
 * crop document size to base active layer bounds's to size ( width,height ) ,
 * now only for a layer
 * @param width
 * @param height
 */
export async function cropToSize(width: number, height: number) {
  let layer = activeDocument().activeLayers.length === 1 ? activeDocument().activeLayers[0] : null;
  let layerBounds: IBounds = layer !== null ? layer.bounds : null;
  let layerSize: IELementSize = await getElementSize(layer);

  let marginLeft = (width - layerSize.width) / 2;
  let marginTop = (height - layerSize.height) / 2;

  let cropBounds: IBounds = {
    left: layerBounds.left - marginLeft,
    top: layerBounds.top - marginTop,
    right: layerBounds.right + marginLeft,
    bottom: layerBounds.bottom + marginTop,
  };

  activeDocument().crop(cropBounds);
}

/**
 *  select a layer or group by name, if has multiply same type ( layer or group ), select the first base bottom to top index
 * ! js array.find don't use async, if done, it may be not work.
 * @param selectName
 * @param onlyGroup
 */
export async function selectLayerByName(
  selectName: string,
  onlyGroup: boolean = false,
  makeVisible: boolean = false,
  regexpMode: boolean = false
): Promise<void | undefined> {
  let select = async select => {
    await batchPlay(
      [
        {
          _obj: "select",
          _target: [{ _ref: "layer", _name: select }],
          makeVisible: makeVisible,
        },
      ],
      batchPlayConfig.defaultOptions()
    );
  };

  let layers = await activeDocument().layers;
  let i = layers.length - 1;
  let selectNameRegexp = new RegExp(selectName, "g");

  while (i >= 0) {
    let l = layers[i];
    // must be use await
    let isName: boolean = (await selectNameRegexp.test(l.name)) === true ? await true : await false;

    if (onlyGroup === true) {
      if (l.isGroupLayer === true && isName === true) {
        select(l.name);
        console.log(`selectLayerByName: `, l.name);
      }
    } else {
      if (l.isGroupLayer === undefined && isName === true) {
        select(l.name);
        console.log(`selectLayerByName: `, l.name);
      }
    }
    i--;
  }

  let r = activeDocument().activeLayers;

  if (r[0].name !== selectName || r.length > 0) return undefined;
}

/**
 * select all layer on select layer,if toBottom = true,
 * @param excludeTarget
 * @param toBottom
 */
export async function selectAllLayersOnTarget(
  excludeTarget: boolean = false,
  toBottom: boolean = false,
  ignoreHideLayer: boolean = false
) {
  let d = activeDocument().layers;
  let a = activeDocument().activeLayers;
  let topLayerName = toBottom === true ? d[d.length - 1].name : d[0].name;

  /**
   * select layer
   */
  await batchPlay(
    [
      {
        _obj: "select",
        _target: [{ _ref: "layer", _name: topLayerName }],
        selectionModifier: batchPlayConfig.selectionModifier.addToSelectionContinuous,
      },
    ],
    batchPlayConfig.defaultOptions()
  );

  /**
   * need fix
   */
  if (excludeTarget === true) {
    a.map(async e => {
      e.selected = await false;
    });

    let b = await activeDocument().activeLayers;
    let i = b.length - a.length - 1;
    while (i > 0) {
      const element = b[i];
      if (element.parent === null) break;

      if (element.parent !== null) {
        element.selected = await false;
      } else {
        element.selected = await true;
      }
      i--;
    }
  }

  if (ignoreHideLayer === true) {
    await activeDocument().activeLayers.map(async e => {
      if (e.visible === false && e.parent === null) {
        e.selected = await false;
      }
    });
  }
}

/**
 * use batchplay to move layer to document layers top index
 */
export async function moveLayerToDocTop() {
  await batchPlay(
    [
      {
        _obj: "move",
        _target: batchPlayConfig._targetSelectLayers,
        to: { _ref: "layer", _index: activeDocument().layers.length + 2 },
        adjustment: false,
      },
    ],
    batchPlayConfig.defaultOptions()
  );
}

/**
 * todo
 */
export async function moveLayerToParentTop() {}

/**
 * convert select layers to merge smart object
 */
export async function convertToSmartObject() {
  await batchPlay(
    [
      {
        _obj: "newPlacedLayer",
      },
    ],
    batchPlayConfig.defaultOptions()
  );
}

export async function mergeLayers() {}
export async function mergeLayerNew() {
  await batchPlay([{ _obj: "mergeLayersNew" }], batchPlayConfig.defaultOptions());
}

/**
 * ctrl+shift+e
 */
export async function mergeVisible() {
  await batchPlay(
    [
      {
        _obj: "mergeVisible",
        _isCommand: true,
        _options: {
          dialogOptions: "dontDisplay",
        },
      },
    ],
    batchPlayConfig.defaultOptions()
  );
}

/**
 * ctrl + e
 */
export async function rasterizeTargetLayer() {
  await batchPlay(
    [
      {
        _obj: "rasterizeLayer",
        _target: batchPlayConfig._targetSelectLayers,
      },
    ],
    batchPlayConfig.defaultOptions("")
  );
}

/**
 * set layers to a name
 */
export async function setLayerName(name: string, histortyName: string = "") {
  await batchPlay(
    [
      {
        _obj: "set",
        _target: batchPlayConfig._targetSelectLayers,
        to: { _obj: "layer", name: name },
      },
    ],
    batchPlayConfig.defaultOptions(histortyName)
  );
}

/**
 * create layer
 * @param layerName
 */
export async function createLayer(layerName?: string) {
  let name = layerName !== "" ? layerName : "";
  await batchPlay(
    [
      {
        _obj: "make",
        _target: [
          {
            _ref: "layer",
          },
        ],
        using: {
          _obj: layerName,
          name: layerName,
        },
        _isCommand: true,
        _options: {
          dialogOptions: "dontDisplay",
        },
      },
    ],
    {
      synchronousExecution: false,
      modalBehavior: "fail",
    }
  );
}
/**
 * create white background layer under bottom
 */
export async function createBGLayer() {
  let backgroundLayer = activeDocument().backgroundLayer;
  if (backgroundLayer === null) {
    await batchPlay([{ _obj: "make", _target: [{ _ref: "backgroundLayer" }] }], batchPlayConfig.defaultOptions());
  }
}

/**
 * fill use RGB, defult is white
 * @param red 0-255
 * @param grain
 * @param blue
 */
export async function fillWhite(red: number = 255, grain: number = 255, blue: number = 255) {
  await batchPlay(
    [
      {
        _obj: "fill",
        using: { _enum: "fillContents", _value: "color" },
        color: { _obj: "RGBColor", red: red, grain: red, blue: blue },
        opacity: { _unit: "percentUnit", _value: 100 },
        mode: { _enum: "blendMode", _value: "normal" },
      },
    ],
    batchPlayConfig.defaultOptions()
  );
}

/**
 * hide layers
 */
export async function hideLayers() {
  await batchPlay(
    [
      {
        _obj: "hide",
        null: batchPlayConfig._targetSelectLayers,
      },
    ],
    batchPlayConfig.defaultOptions()
  );
}

export async function inverse() {
  await batchPlay([{ _obj: "inverse" }], batchPlayConfig.defaultOptions());
}

export async function deSelect() {
  await batchPlay(
    [
      {
        _obj: "set",
        _target: batchPlayConfig._targetChannelSelection,
        to: {
          _enum: "ordinal",
          _value: "none",
        },
      },
    ],
    batchPlayConfig.defaultOptions()
  );
}

export async function getChannalSelection() {
  await batchPlay(
    [
      {
        _obj: "set",
        _target: batchPlayConfig._targetChannelSelection,
        to: {
          _ref: [
            {
              _ref: "channel",
              _enum: "channel",
              _value: "mask",
            },
          ],
        },
      },
    ],
    batchPlayConfig.defaultOptions()
  );
}

/**
 * ctrl+\
 */
export async function selectChannel() {
  await batchPlay(
    [
      {
        _obj: "select",
        _target: [
          {
            _ref: "channel",
            _enum: "ordinal",
            _value: "targetEnum",
          },
        ],
      },
    ],
    batchPlayConfig.defaultOptions()
  );
}

/**
 * todo
 * levels
 * middle handle is gamma
 * default change gamma to 0.01
 */
export async function levels() {
  await batchPlay(
    [
      {
        _obj: "levels",
        presetKind: { _enum: "presetKindType", _value: "presetKindCustom" },
        adjustment: [
          {
            _obj: "levelsAdjustment",
            channel: {
              _ref: "channel",
              _enum: "ordinal",
              _value: "targetEnum",
            },
            gamma: 0.01,
          },
        ],
      },
    ],
    batchPlayConfig.defaultOptions()
  );
}

/**
 * transform
 * @param horizontal 0 / -0
 * @param vertical 0 / -0
 * @param width
 * @param height
 * @param angle
 */
export async function transform(horizontal: number, vertical: number, width: number, height: number, angle: number) {
  await batchPlay(
    [
      {
        _obj: "transform",
        _target: [
          {
            _ref: "path",
            _enum: "ordinal",
            _value: "targetEnum",
          },
        ],
        freeTransformCenterState: {
          _enum: "quadCenterState",
          _value: "QCSAverage",
        },
        offset: {
          _obj: "offset",
          horizontal: {
            _unit: "pixelsUnit",
            _value: horizontal,
          },
          vertical: {
            _unit: "pixelsUnit",
            _value: vertical,
          },
        },
        width: {
          _unit: "percentUnit",
          _value: width,
        },
        height: {
          _unit: "percentUnit",
          _value: height,
        },
        angle: {
          _unit: "angleUnit",
          _value: angle,
        },
        linked: true,
        _isCommand: true,
        _options: {
          dialogOptions: "dontDisplay",
        },
      },
    ],
    {
      synchronousExecution: false,
      modalBehavior: "fail",
    }
  );
}

export async function createVectorNoOutline(bounds: IBounds, colorHex: string) {
  let rgb: RGBColor = await hex2rgb(colorHex);

  await batchPlay(
    [
      {
        _obj: "make",
        _target: [
          {
            _ref: "contentLayer",
          },
        ],
        using: {
          _obj: "contentLayer",
          type: {
            _obj: "solidColorLayer",
            color: {
              _obj: "RGBColor",
              red: rgb.r,
              grain: rgb.g,
              blue: rgb.b,
            },
          },
          shape: {
            _obj: "rectangle",
            unitValueQuadVersion: 1,
            top: {
              _unit: "pixelsUnit",
              _value: bounds.top,
            },
            left: {
              _unit: "pixelsUnit",
              _value: bounds.left,
            },
            bottom: {
              _unit: "pixelsUnit",
              _value: bounds.bottom,
            },
            right: {
              _unit: "pixelsUnit",
              _value: bounds.right,
            },
            topRight: {
              _unit: "pixelsUnit",
              _value: 0,
            },
            topLeft: {
              _unit: "pixelsUnit",
              _value: 0,
            },
            bottomLeft: {
              _unit: "pixelsUnit",
              _value: 0,
            },
            bottomRight: {
              _unit: "pixelsUnit",
              _value: 0,
            },
          },
          strokeStyle: {
            _obj: "strokeStyle",
            strokeStyleVersion: 2,
            strokeEnabled: true,
            fillEnabled: true,
            strokeStyleLineWidth: {
              _unit: "pixelsUnit",
              _value: 0,
            },
            strokeStyleLineDashOffset: {
              _unit: "pixelsUnit",
              _value: 0,
            },
            strokeStyleMiterLimit: 100,
            strokeStyleLineCapType: {
              _enum: "strokeStyleLineCapType",
              _value: "strokeStyleButtCap",
            },
            strokeStyleLineJoinType: {
              _enum: "strokeStyleLineJoinType",
              _value: "strokeStyleMiterJoin",
            },
            strokeStyleLineAlignment: {
              _enum: "strokeStyleLineAlignment",
              _value: "strokeStyleAlignCenter",
            },
            strokeStyleScaleLock: false,
            strokeStyleStrokeAdjust: false,
            strokeStyleLineDashSet: [],
            strokeStyleBlendMode: {
              _enum: "blendMode",
              _value: "normal",
            },
            strokeStyleOpacity: {
              _unit: "percentUnit",
              _value: 100,
            },
            strokeStyleContent: {
              _obj: "solidColorLayer",
              color: {
                _obj: "RGBColor",
                red: rgb.r,
                grain: rgb.g,
                blue: rgb.b,
              },
            },
            strokeStyleResolution: 300,
          },
        },
        layerID: 281,
        _isCommand: true,
        _options: {
          dialogOptions: "dontDisplay",
        },
      },
    ],
    {
      synchronousExecution: false,
      modalBehavior: "fail",
    }
  );
}

/**
 * create selection
 * @param bounds
 */
export async function createSelection(bounds: IBounds) {
  await batchPlay(
    [
      {
        _obj: "addTo",
        _target: [
          {
            _ref: "channel",
            _property: "selection",
          },
        ],
        to: {
          _obj: "rectangle",
          top: {
            _unit: "pixelsUnit",
            _value: bounds.top,
          },
          left: {
            _unit: "pixelsUnit",
            _value: bounds.left,
          },
          bottom: {
            _unit: "pixelsUnit",
            _value: bounds.bottom,
          },
          right: {
            _unit: "pixelsUnit",
            _value: bounds.right,
          },
        },
        _isCommand: true,
        _options: {
          dialogOptions: "dontDisplay",
        },
      },
    ],
    {
      synchronousExecution: false,
      modalBehavior: "fail",
    }
  );
}

/**
 *
 */
interface ISize {
  width: number;
  height: number;
}

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export async function hex2rgb(hex: string): Promise<RGBColor> {
  if (/[0-9a-f]{6}/gi.test(hex) === true) {
    let rgbString = hex.replace(
      /([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/gi,
      function (match, p1, p2, p3, offset, string) {
        // p1 is nondigits, p2 digits, and p3 non-alphanumerics
        return [p1, p2, p3].join(" - ");
      }
    );
    let h = rgbString.split(`-`);
    console.log(h);
    return {
      r: parseInt(h[0], 16),
      g: parseInt(h[1], 16),
      b: parseInt(h[2], 16),
    };
  }
}

/**
 *
 * @param length
 * @param width
 * @param height
 * @param unit in|cm|mm
 */
export async function createSizeRuler(
  sizeString: ISizeUnit[],
  selectionSize: ISize,
  baseBounds: IBounds,
  colorHex: string,
  margin: number,
  canvasExportSize: ISize,
  convasMargin: number
) {
  let vTopRulerBounds: IBounds = {
    left: baseBounds.right + margin,
    right: baseBounds.right + (selectionSize.width + margin),
    top: baseBounds.top,
    bottom: baseBounds.top + selectionSize.height,
  };
  let vBottomRulerBounds: IBounds = {
    left: baseBounds.right + margin,
    right: baseBounds.right + (selectionSize.width + margin),
    top: baseBounds.bottom - selectionSize.height,
    bottom: baseBounds.bottom,
  };

  let hLeftRulerBounds: IBounds = {
    left: baseBounds.left,
    right: baseBounds.left + selectionSize.height,
    top: baseBounds.bottom + margin,
    bottom: baseBounds.bottom + (selectionSize.width + margin),
  };
  let hRightRulerBounds: IBounds = {
    left: baseBounds.right - selectionSize.height,
    right: baseBounds.right,
    top: baseBounds.bottom + margin,
    bottom: baseBounds.bottom + (selectionSize.width + margin),
  };

  /**
   * line
   */
  let vLineBounds: IBounds = {
    left: baseBounds.right + selectionSize.width / 2,
    right: baseBounds.right + (selectionSize.height + selectionSize.width / 2),
    top: baseBounds.top,
    bottom: baseBounds.top + (baseBounds.bottom - baseBounds.top) / 4,
  };

  let vBottomLineBounds: IBounds = {
    left: baseBounds.right + selectionSize.width / 2,
    right: baseBounds.right + (selectionSize.height + selectionSize.width / 2),
    top: baseBounds.bottom - (baseBounds.bottom - baseBounds.top) / 4,
    bottom: baseBounds.bottom,
  };

  let hLeftLineBounds: IBounds = {
    left: baseBounds.left + selectionSize.height,
    right: baseBounds.left + (baseBounds.right - baseBounds.left) / 4,
    top: baseBounds.bottom + selectionSize.width / 2,
    bottom: baseBounds.bottom + selectionSize.height + selectionSize.width / 2,
  };

  let hRightLineBounds: IBounds = {
    left: baseBounds.right - selectionSize.height,
    right: baseBounds.right - (baseBounds.right - baseBounds.left) / 4,
    top: baseBounds.bottom + selectionSize.width / 2,
    bottom: baseBounds.bottom + selectionSize.height + selectionSize.width / 2,
  };

  /**
   * create left
   */

  await createVectorNoOutline(vTopRulerBounds, `ff0000`);
  await createVectorNoOutline(vBottomRulerBounds, `ff0000`);
  await createVectorNoOutline(hLeftRulerBounds, `ff0000`);
  await createVectorNoOutline(hRightRulerBounds, `ff0000`);

  /**
   * create line
   */

  await createVectorNoOutline(vLineBounds, `ff0000`);
  await createVectorNoOutline(vBottomLineBounds, `ff0000`);
  await createVectorNoOutline(hLeftLineBounds, `ff0000`);
  await createVectorNoOutline(hRightLineBounds, `ff0000`);

  //await createSelection(leftTopRulerBounds);

  //await createLayer(`RULER`);
  await createText(
    {
      horizotal: (vLineBounds.left / canvasExportSize.width) * 100,
      vertical: 50,
    },

    `${sizeString[0].num}${sizeString[0].unit}`,
    72,
    `horizontal`,
    `left`
  );

  await createText(
    {
      horizotal: 50,
      vertical: ((hRightLineBounds.top + selectionSize.width / 4) / canvasExportSize.height) * 100,
    },

    `${sizeString[1].num}${sizeString[1].unit}`,
    72
  );
}


export async function convertToSrgbProfile(flatten:boolean){
  await batchPlay(
    [
       {
          "_obj": "convertToProfile",
          "_target": [
             {
                "_ref": "document",
                "_enum": "ordinal",
                "_value": "targetEnum"
             }
          ],
          "to": "sRGB IEC61966-2.1",
          "intent": {
             "_enum": "intent",
             "_value": "image"
          },
          "mapBlack": true,
          "dither": true,
          "flatten": flatten,
          "shadowMode": -1,
          "_isCommand": true,
          "_options": {
             "dialogOptions": "dontDisplay"
          }
       }
    ],{
       "synchronousExecution": false,
       "modalBehavior": "fail"
    });
    
}