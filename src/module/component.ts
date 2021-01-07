/**
 * batchPlay index is bottom to top
 * js index is top to bottom
 */

import * as batchPlayConfig from "./batchplayconfig";
import * as layername from "./layername";
const app = require("photoshop").app;
const batchPlay = require("photoshop").action.batchPlay;

/**
 * app.activeDocument
 */
const doc = app.activeDocument;

interface IBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 * if have nothing,is empty layer
 * @param bounds rectangle size of something in layer,base document left-top point, {left,top,right,bottom}
 */
function isEmptyLayer(bounds: IBounds): boolean {
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
export function getElementSize(layer: any): IELementSize {
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
export function isVertical(elementSize: IELementSize): boolean | null {
  if (elementSize.height > elementSize.width) {
    return true;
  } else if (elementSize.height < elementSize.width) {
    return false;
  }
  return null;
}

/**
 * delete all empty layer
 */
export function deleteAllEmptyLayers(): void {
  // layer lock is can't delete
  // use bounds to find empty layer

  let layers = doc.layers;

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

export async function deleteAllLayersExcludeTarget() {
  let layer = doc.activeLayers[0].name === layername.__DO_ACTION__ ? doc.activeLayers[0] : null;
  if (layer !== null) {
  }
}

/**
 * crop document size to active layer bounds, now only for a layer
 * @param margin maring to document boundary
 */
export function cropToMargin(margin: number): void {
  let layerBounds: IBounds = doc.activeLayers.length === 1 ? doc.activeLayers[0].bounds : null;

  let cropBounds: IBounds = { left: 0, top: 0, right: 0, bottom: 0 };

  cropBounds = {
    left: layerBounds.left - margin,
    top: layerBounds.top - margin,
    right: layerBounds.right + margin,
    bottom: layerBounds.bottom + margin,
  };

  doc.crop(cropBounds, 0);
}

/**
 * crop document size to base active layer bounds's square, now only for a layer
 * @param margin
 */
export function cropToSquare(margin: number) {
  //todo
  //something
  let layer = doc.activeLayers.length === 1 ? doc.activeLayers[0] : null;
  let layerBounds: IBounds = layer !== null ? layer.bounds : null;
  let layerSize: IELementSize = getElementSize(layer);

  layerBounds = isVertical(layerSize)
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

  doc.crop(cropBounds);
}

/**
 * crop document size to base active layer bounds's to size ( width,height ) ,
 * now only for a layer
 * @param width
 * @param height
 */
export function cropToSize(width: number, height: number) {
  let layer = doc.activeLayers.length === 1 ? doc.activeLayers[0] : null;
  let layerBounds: IBounds = layer !== null ? layer.bounds : null;
  let layerSize: IELementSize = getElementSize(layer);

  let marginLeft = (width - layerSize.width) / 2;
  let marginTop = (height - layerSize.height) / 2;

  let cropBounds: IBounds = {
    left: layerBounds.left - marginLeft,
    top: layerBounds.top - marginTop,
    right: layerBounds.right + marginLeft,
    bottom: layerBounds.bottom + marginTop,
  };

  doc.crop(cropBounds);
}

/**
 *  select a layer or group by name, if has multiply same type ( layer or group ), select the first base bottom to top index
 * @param name
 * @param isGroup
 */
export async function selectLayerByName(name: string, isGroup: boolean = false) {
  let nameIndex: string = `--DO-ACTIVE-`;
  let layers = doc.layers;
  let layer =
    isGroup === true
      ? layers.find(layer => layer.name === name && layer.isGroupLayer === true)
      : layers.find(layer => layer.name === name && layer.isGroupLayer === undefined);

  layer.name = `${nameIndex}${name}`;

  await batchPlay(
    [
      {
        _obj: "select",
        _target: [{ _ref: "layer", _name: `${nameIndex}${name}` }],
      },
    ],
    batchPlayConfig.defaultOptions
  );

  layer.name = name;
}

/**
 * select all layer on select layer,if toBottom = true,
 * @param excludeTarget
 * @param toBottom
 */
export async function selectAllLayersOnTarget(
  excludeTarget: boolean = false,
  toBottom: boolean = false
) {
  let topLayerName =
    toBottom === true ? await doc.layers[doc.layer.length - 1].name : await doc.layers[0].name;
  if (excludeTarget === true) {
  }
  await batchPlay(
    [
      {
        _obj: "select",
        _target: [{ _ref: "layer", _name: topLayerName }],
        selectionModifier: batchPlayConfig.selectionModifier.addToSelectionContinuous,
      },
    ],
    batchPlayConfig.defaultOptions
  );
}

/**
 * use batchplay to move layer to document layers top index
 */
export async function moveLayerToDocTop() {
  await batchPlay(
    [
      {
        _obj: "move",
        _target: batchPlayConfig._targetSeletLayers,
        to: { _ref: "layer", _index: doc.layers.length + 2 },
        adjustment: false,
      },
    ],
    batchPlayConfig.defaultOptions
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
    batchPlayConfig.defaultOptions
  );
}

export async function mergeLayers() {}
export async function mergeLayerNew() {
  await batchPlay([{ _obj: "mergeLayersNew" }], batchPlayConfig.defaultOptions);
}

/**
 * ctrl + e
 */
export async function rasterizeTargetLayer() {
  await batchPlay(
    [
      {
        _obj: "rasterizeLayer",
        _target: batchPlayConfig._targetSeletLayers,
      },
    ],
    batchPlayConfig.defaultOptions
  );
}

/**
 * set layers to a name
 */
export async function setLayerName(name: string) {
  await batchPlay(
    [
      {
        _obj: "set",
        _target: batchPlayConfig._targetSeletLayers,
        to: { _obj: "layer", name: name },
      },
    ],
    batchPlayConfig.defaultOptions
  );
}

/**
 * create white background layer under bottom
 */
export async function createBGLayer() {
  let backgroundLayer = doc.backgroundLayer;
  console.log(backgroundLayer.name);
  if (backgroundLayer === null) {
    await batchPlay(
      [{ _obj: "make", _target: [{ _ref: "backgroundLayer" }] }],
      batchPlayConfig.defaultOptions
    );
  } else {
    backgroundLayer.selected = await true;
    await selectLayerByName(backgroundLayer.name);
  }
}

export async function fillWhite() {
  await batchPlay(
    [
      {
        _obj: "fill",
        using: { _enum: "fillContents", _value: "color" },
        color: { _obj: "RGBColor", red: 255, grain: 255, blue: 255 },
        opacity: { _unit: "percentUnit", _value: 100 },
        mode: { _enum: "blendMode", _value: "normal" },
      },
    ],
    batchPlayConfig.defaultOptions
  );
}
