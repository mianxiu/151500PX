import * as layerComponent from "../module/layercomponent";
import * as names from "../module/names";
import * as folder from "../module/floder";
import * as save from "../module/save";

const app = require("photoshop").app;

async function isSameLayerKind(layerA: any, layerB: any): Promise<boolean> {
  return layerA.kind === layerB ? true : false;
}

export async function dupliceBaseSpacing(
  pickA: any,
  pickB: any,
  spacing: number = 3,
  scale: number = 100,
  step: number = 3,
  degree: number = 3
) {
  let activeLayer = layerComponent.activeDocument().layer;

  let boundsA = pickA.boundsNoEffects;
  let boundsB = pickB.boundsNoEffects;

  let index = 0;
  while (index < step) {
    console.log(`duplice vector begin loop`, index);

    let rad = (degree * Math.PI) / 180;
    let x = Math.cos(rad) * spacing;
    let y = Math.sin(rad) * spacing;
    console.log(x, y);
    await layerComponent.copyToLayer();
    await layerComponent.transform(x, y, 100, 100, degree);
    index++;
    // let nextLeft = boundsA.left + x;
    // let nextRight = boundsB.right + x;
    // let nextTop = 0;
    // let nextBottom = 0;
  }
}
