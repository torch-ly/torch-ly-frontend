import {init} from "./layers/layerManager";

export let stage = null;

export function main(pStage) {
  stage = pStage;
  init();
}
