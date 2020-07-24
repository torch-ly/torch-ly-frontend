import {init} from "./layers/layerManager";
import {enableZoom} from "./layers/zoom";
import {moveTokenByArrows} from "./layers/objectFunctions";

export let stage = null;
export let stageWidth = 0;
export let stageHeight = 0;

export let store = {};

export let drawingObjects = {};

export default function (context) {
  store = context.store;
}

export function main(pStage, width, height) {
  stage = pStage;
  stageWidth = width;
  stageHeight = height;

  drawingObjects = require('./drawing.json');

  init();
  enableZoom();
  resize();
  moveTokenByArrows();

  /*setInterval(function () {
    //updateJSON();
    //console.log(drawingObjects)
    //let fs = require('./drawing.json');
    //fs.writeFile('drawing.json', drawingObjects, 'utf8')
  }, 5000)*/

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
