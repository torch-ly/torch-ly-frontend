import {init} from "./layers/layerManager";
import {enableZoom} from "./layers/zoom";

export let stage = null;
export let stageWidth = 0;
export let stageHeight = 0;

export let store = {};

export default function (context) {
  store = context.store;
}

export function main(pStage, width, height) {
  stage = pStage;
  stageWidth = width;
  stageHeight = height;
  init();
  enableZoom();
  resize();
}

function resize() {
  window.addEventListener("resize", () => {
    stage.width(window.innerWidth);
    stage.height(window.innerHeight);
    stageWidth = window.innerWidth;
    stageHeight = window.innerHeight;
    stage.draw();
  });
}
