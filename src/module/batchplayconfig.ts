export var defaultOptions = {
  synchronousExecution: false,
  modalBehavior: "fail",
};

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
export var _targetSeletLayers: ITarget[] = [
  {
    _ref: _ref.layer,
    _enum: "ordinal",
    _value: "targetEnum",
  },
];

/**
 * selection modifier
 */
export var selectionModifier = {
  addToSelection: { _enum: "selectionModifierType", _value: "addToSelection" },
  addToSelectionContinuous: { _enum: "selectionModifierType", _value: "addToSelectionContinuous" },
};
