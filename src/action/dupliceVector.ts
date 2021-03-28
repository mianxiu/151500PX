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
  PickB: any,
  spacing: number,
  scale: number,
  step: number,
  degree: number
) {}
