import { privateDecrypt } from "crypto";

const app = require("photoshop").app;
const fs = require("uxp").storage.localFileSystem;


const doc = app.activeDocument

// function showLayerNames() {
//   const allLayers = app.activeDocument.layers;
//   // const allLayerNames = allLayers.map(layer => layer.name);
//   // const sortedNames = allLayerNames.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);

//   console.log(allLayers[0])
//   return allLayers[0].bounds.right
// }

// async function fff():Promise<string> {
//   let userFolder = await fs.getFolder()
//   return userFolder.name

// }


interface IBounds {
  left: number,
  top: number,
  right: number,
  bottom: number
}

function isEmptyLayer(bounds: IBounds): boolean {

  let zero = bounds.left + bounds.top + bounds.right + bounds.bottom

  return zero === 0 ? true : false

}

 function deleteAllEmptyLayers() {

  // layer lock is can't delete
  // use bounds to find empty layer

  let layers = doc.layers

  layers.map(layer => isEmptyLayer(layer.bounds) === true ? console.log(layer.bounds) : console.log(layer))


}


module.exports = {
  // showLayerNames,
  // fff,
    deleteAllEmptyLayers
}
