import {init} from "./layers/layerManager";
import {enableZoom} from "./layers/zoom";

export let stage = null;
export let stageWidth = 0;
export let stageHeight = 0;

export function main(pStage, width, height) {
  stage = pStage;
  stageWidth = width;
  stageHeight = height;
  init();
  enableZoom();
}
