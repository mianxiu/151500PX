/**
 * batchPlay index is bottom to top
 * js index is top to bottom
 */

import * as batchPlayConfig from "./batchplayconfig";
import * as names from "./names";
const app = require("photoshop").app;
const batchPlay = require("photoshop").action.batchPlay;

/**
 * app.documents 0
 */
export const activeDocument = () => {
  return app.documents.filter(e => e._id === app.activeDocument._id)[0];
};

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
export async function isVertical(
  elementSize: IELementSize
): Promise<boolean | null> {
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

export async function deleteAllUnVisibleLayers() {
  let layers = activeDocument().layers;

  layers.map(async layer => {
    if (layer.visible === false) await layer.delete();
  });
}

export async function deleteAllLayersExcludeTarget() {
  let layer =
    activeDocument().activeLayers[0].name === names.__DO_ACTION__
      ? activeDocument().activeLayers[0]
      : null;
  if (layer !== null) {
  }
}

/**
 * crop document size to active layer bounds, now only for a layer
 * @param margin maring to document boundary
 */
export async function cropToMargin(margin: number) {
  let layerBounds: IBounds =
    activeDocument().activeLayers.length === 1
      ? activeDocument().activeLayers[0].bounds
      : null;

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
  let layer =
    activeDocument().activeLayers.length === 1
      ? activeDocument().activeLayers[0]
      : null;
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
  console.log(await isVertical(layerSize));
  console.log(cropBounds);
  activeDocument().crop(cropBounds);
}

/**
 * crop document size to base active layer bounds's to size ( width,height ) ,
 * now only for a layer
 * @param width
 * @param height
 */
export async function cropToSize(width: number, height: number) {
  let layer =
    activeDocument().activeLayers.length === 1
      ? activeDocument().activeLayers[0]
      : null;
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
 * @param name
 * @param isGroup
 */
export async function selectLayerByName(
  name: string,
  isGroup: boolean = false
) {
  let nameIndex: string = names.__DO_ACTION__;
  let layers = await activeDocument().layers;
  let layer =
    isGroup === true
      ? await layers.find(
          async layer =>
            (await layer.name) === name && layer.isGroupLayer === true
        )
      : await layers.find(
          async layer =>
            (await layer.name) === name && layer.isGroupLayer === undefined
        );

  // 2021/1/22 todo
  console.log(layer);
  //layer.name = await `${nameIndex}`;

  await batchPlay(
    [
      {
        _obj: "select",
        _target: [{ _ref: "layer", _name: name }],
        makeVisible: false,
      },
    ],
    batchPlayConfig.defaultOptions
  );

  // layer.name = name;
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
  let topLayerName =
    toBottom === true ? await d[d.length - 1].name : await d[0].name;

  /**
   * select layer
   */
  await batchPlay(
    [
      {
        _obj: "select",
        _target: [{ _ref: "layer", _name: topLayerName }],
        selectionModifier:
          batchPlayConfig.selectionModifier.addToSelectionContinuous,
      },
    ],
    batchPlayConfig.defaultOptions
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
        console.log(element, i);
        element.selected = await true;
      }
      i--;
    }

    console.log(b);
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
        _target: batchPlayConfig._targetSeletLayers,
        to: { _ref: "layer", _index: activeDocument().layers.length + 2 },
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
    {
      synchronousExecution: false,
      modalBehavior: "fail",
    }
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
          name: "123",
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

export async function hideLayers() {
  await batchPlay(
    [
      {
        _obj: "hide",
        null: batchPlayConfig._targetSeletLayers,
      },
    ],
    batchPlayConfig.defaultOptions
  );
}
