import {stage, store} from "../../main";
import {getRelativePointerPosition} from "../layerFunctions";
import {blockSnapSize} from "../grid/main";
import {endPen} from "../freeDrawing/main";

let arrow;
let start = {x: 0, y: 0};
let layer;
let lengthSoFar = 0;

let circle = new Konva.Circle({
  x: 0,
  y: 0,
  visible: true,
  radius: 20,
  fill: '#4a5568'
});

export function draw(pLayer) {
  layer = pLayer;
}

export function startDraw() {
  endPen();

  stage.on("mousedown", (e) => {
    if (!store.state.manu.measure)
      return;

    stage.draggable(false);

    lengthSoFar = length();

    lengthSoFar = arrow == null ? 0 : lengthSoFar;

    start = calculateSnapToGrid(getRelativePointerPosition(stage));

    arrow = new Konva.Arrow({
      points: [start.x, start.y, start.x, start.y],
      pointerLength: 20,
      pointerWidth: 20,
      fill: '#4a5568',
      stroke: '#4a5568',
      strokeWidth: 4,
    });
    arrow.currentlyDrawing = true;
    layer.add(arrow);
    layer.add(circle)
  })

  stage.on("mousemove", (e) => {
    if (!store.state.manu.measure || arrow == null)
      return;

    length();

    if (arrow.currentlyDrawing) {

      if (store.state.manu.measureDetails.length === 0) {
        arrow.visible(false);
        circle.setAttrs({
          x: calculateSnapToGrid(getRelativePointerPosition(stage)).x,
          y: calculateSnapToGrid(getRelativePointerPosition(stage)).y,
          visible: true
        })
      } else {
        arrow.points([start.x, start.y, calculateSnapToGrid(getRelativePointerPosition(stage)).x, calculateSnapToGrid(getRelativePointerPosition(stage)).y]);
        arrow.visible(true);
        circle.visible(false);
      }
    }

    layer.batchDraw();
  })

  stage.on("mouseup", (e) => {
    if (e.evt.button === 2)
      return true;

    arrow = null;
    layer.removeChildren();
    layer.batchDraw();
  })
}

function calculateSnapToGrid(pos) {
  return {
    x: Math.floor(pos.x / blockSnapSize) * blockSnapSize + blockSnapSize / 2,
    y: Math.floor(pos.y / blockSnapSize) * blockSnapSize + blockSnapSize / 2
  };
}

function length() {
  let eins = Math.abs((calculateSnapToGrid(start).x - calculateSnapToGrid(getRelativePointerPosition(stage)).x) / blockSnapSize);
  let zwei = Math.abs((calculateSnapToGrid(start).y - calculateSnapToGrid(getRelativePointerPosition(stage)).y) / blockSnapSize);

  let length = lengthSoFar + Math.max(eins, zwei);
  store.commit("manu/setMeasureLength", length);
  return length;
}
