
const app = require("photoshop").app;
const fs = require("uxp").storage.localFileSystem;
const batchPlay = require("photoshop").action.batchPlay


const doc = app.activeDocument

function showLayerNames() {
  const allLayers = app.activeDocument.layers;
  // const allLayerNames = allLayers.map(layer => layer.name);
  // const sortedNames = allLayerNames.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);

  console.log(allLayers[0])
  return allLayers[0].bounds.right
}

async function useFolder(): Promise<string> {
  let userFolder = await fs.getFolder()
  return userFolder.name

}


interface IBounds {
  left: number,
  top: number,
  right: number,
  bottom: number
}

/**
 * if have nothing,is empty layer
 * @param bounds rectangle size of something in layer,base document left-top point, {left,top,right,bottom}
 */
function isEmptyLayer(bounds: IBounds): boolean {
  let zero = bounds.left + bounds.top + bounds.right + bounds.bottom
  return zero === 0 ? true : false
}



interface IELementSize {
  width: number,
  height: number
}

/**
 * get element rectangle size
 * @param layer layer
 */
function getElementSize(layer: any): IELementSize {
  let layerBounds: IBounds = layer.bounds

  let boundsLeft: number = layerBounds.left
  let boundsTop: number = layerBounds.top
  let boundsRight: number = layerBounds.right
  let boundsBottom: number = layerBounds.bottom

  let elementWidth: number = boundsRight - boundsLeft
  let elementHeight: number = boundsBottom - boundsTop

  let elementSize: IELementSize = {
    width: 0,
    height: 0
  }

  return elementSize = { width: elementWidth, height: elementHeight }

}


/**
 * decide element is vertcal or horizontal
 * @param elementSize 
 */
function isVertical(elementSize: IELementSize): boolean | null {

  if (elementSize.height > elementSize.width) { return true }
  else if (elementSize.height < elementSize.width) { return false }
  return null

}


/**
 * delete all empty layer
 */
export function deleteAllEmptyLayers(): void {

  // layer lock is can't delete
  // use bounds to find empty layer

  let layers = doc.layers

  layers.map(async layer => {

    if (isEmptyLayer(layer.bounds)) {

      // if unuse selected,sometime it can't set false
      if (layer.locked) {
        layer.selected = await true
        layer.locked = await false
      }

      await layer.delete()
    }
  })

}

/**
 * 
 * @param margin maring to document boundary
 */
function cropToMargin(margin: number): void {
  let layerBounds: IBounds = doc.activeLayers.length === 1 ? doc.activeLayers[0].bounds : null

  console.log(doc.activeLayers[0])

  let cropBounds: IBounds = { left: 0, top: 0, right: 0, bottom: 0 }

  cropBounds = {
    left: layerBounds.left - margin,
    top: layerBounds.top - margin,
    right: layerBounds.right + margin,
    bottom: layerBounds.bottom + margin
  }

  doc.crop(cropBounds, 0)
}



export function cropToSquare(margin: number) {
  //todo
  //something
}


module.exports = {
  // showLayerNames,
  // useFolder,
  deleteAllEmptyLayers,
  cropToMargin
}

export { cropToMargin }