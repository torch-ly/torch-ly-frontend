import {init} from "./layers/layerManager";
import {enableZoom} from "./layers/zoom";

export let stage = null;

export function main(pStage) {
  stage = pStage;
  init();
  enableZoom();
}
