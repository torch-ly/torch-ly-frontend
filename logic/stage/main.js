import {init} from "./layers/layerManager";
import {enableZoom} from "./layers/zoom";
import {moveTokenByArrows} from "./layers/objectFunctions";
import {initDrawingStoreWatch} from "@/logic/tools";

export let stage = null;
export let stageWidth = 0;
export let stageHeight = 0;

export let store = {};

export default function (context) {
  store = context.store;
  initDrawingStoreWatch()
}

export function main(pStage, width, height) {
  Konva.hitOnDragEnabled = true;

  stage = pStage;
  stageWidth = width;
  stageHeight = height;

  init();
  enableZoom();
  resize();
  moveTokenByArrows();

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
