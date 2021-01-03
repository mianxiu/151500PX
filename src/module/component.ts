/**
 * batchPlay index is bottom to top
 * js index is top to bottom
 */

import * as batchPlayConfig from "./batchplayconfig";

const app = require("photoshop").app;
const fs = require("uxp").storage.localFileSystem;
const batchPlay = require("photoshop").action.batchPlay;

const doc = app.activeDocument;

function showLayerNames() {
  const allLayers = app.activeDocument.layers;
  // const allLayerNames = allLayers.map(layer => layer.name);
  // const sortedNames = allLayerNames.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);

  console.log(allLayers[0]);
  return allLayers[0].bounds.right;
}

async function useFolder(): Promise<string> {
  let userFolder = await fs.getFolder();
  return userFolder.name;
}

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
function getElementSize(layer: any): IELementSize {
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
function isVertical(elementSize: IELementSize): boolean | null {
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

  layers.map(async (layer) => {
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
      ? layers.find((layer) => layer.name === name && layer.isGroupLayer === true)
      : layers.find((layer) => layer.name === name && layer.isGroupLayer === undefined);

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
 * select all layer on select layer
 */
export async function selectAllLayersOnTarget() {
  let topLayerName = await doc.layers[0].name;
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

export async function moveLayerToParentTop() {}