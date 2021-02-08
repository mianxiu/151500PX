/**
 *
 * @param histortyName set '' can suspend create history when use bathplay
 */
export function defaultOptions(histortyName: string = "") {
  return {
    synchronousExecution: false,
    modalBehavior: "fail",
    // historyStateInfo: {
    //   name: histortyName,
    //   target: {
    //     _ref: "document",
    //     _enum: "ordinal",
    //     _value: "targetEnum",
    //   },
    // },
  };
}
interface ITarget {
  _ref: string;
  _enum: string;
  _value: string;
}

export var _ref = {
  layer: "layer",
  path: "path",
};

/**
 * target all seleted layers
 */
export var _targetSelectLayers: ITarget[] = [
  {
    _ref: _ref.layer,
    _enum: "ordinal",
    _value: "targetEnum",
  },
];

export const _targetChannelSelection = [
  {
    _ref: "channel",
    _property: "selection",
  },
];

/**
 * selection modifier
 */
export var selectionModifier = {
  addToSelection: { _enum: "selectionModifierType", _value: "addToSelection" },
  addToSelectionContinuous: { _enum: "selectionModifierType", _value: "addToSelectionContinuous" },
};

export var TiffConfig = {
  _obj: "TIFF",
  byteOrder: { _enum: "platform", _value: "IBMPC" },
  layerCompression: { _enum: "encoding", _value: "RLE" },
};
