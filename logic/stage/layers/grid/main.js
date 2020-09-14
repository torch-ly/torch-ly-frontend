import {stage} from "@/logic/stage/main";
import Konva from "konva";

export let blockSnapSize = 120;
let layer;
let grid;

export function draw(pLayer) {
  layer = pLayer;
  layer.listening(false);

  grid = new Konva.Rect({
    x: 0,
    y: 0,
    width: blockSnapSize,
    height: blockSnapSize,
    stroke: "lightgray",
    strokeWidth: 0.5,
    listening: false
  });
  grid.cache();

  checkShapes();
  layer.batchDraw();

  stage.on('dragend', () => {
    updateGrid();
  });
}

function checkShapes() {
  let transform = stage.getAbsoluteTransform().copy().invert();
  let topLeftCorner = transform.point({
    x: 0,
    y: 0
  });

  let startX = Math.floor((topLeftCorner.x - stage.width() * 0.2 * Math.pow(stage.scaleX(), -1)) / blockSnapSize) * blockSnapSize;
  let endX = Math.floor((topLeftCorner.x + stage.width() * 1.2 * Math.pow(stage.scaleX(), -1)) / blockSnapSize) * blockSnapSize;

  let startY = Math.floor((topLeftCorner.y - stage.height() * 0.2 * Math.pow(stage.scaleY(), -1)) / blockSnapSize) * blockSnapSize;
  let endY = Math.floor((topLeftCorner.y + stage.height() * 1.2 * Math.pow(stage.scaleY(), -1)) / blockSnapSize) * blockSnapSize;

  if (Math.pow(stage.scaleX(), -1) > 3) {
    return;
  }


  let clone;
  for (let x = startX; x < endX; x += blockSnapSize) {
    for (let y = startY; y < endY; y += blockSnapSize) {
      clone = grid.clone({
        x,
        y
      });
      clone.perfectDrawEnabled(false);
      clone.shadowForStrokeEnabled(false);
      clone.transformsEnabled('position');
      layer.add(clone);
    }
  }
}

export function updateGrid() {
  layer.destroyChildren();
  checkShapes();
  layer.batchDraw();
}
