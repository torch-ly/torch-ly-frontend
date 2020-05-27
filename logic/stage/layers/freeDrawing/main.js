import {stage} from "../../main";
import {enableZoom} from "../zoom";
import {setLayerDragAndDrop} from "../layerFunctions";

let layer;
let currentDrawColor = "#000000";

export function draw(pLayer) {
  layer = pLayer;

  /* ---- Init ---- */
  useHand();
}

export function useHand() {
  endPen();
  // Make stage draggable
  stage.draggable(true);
  enableZoom();
}

export function usePen() {
  endHand();
  for (let layer of stage.children) {
    setLayerDragAndDrop(layer, false);
    for (let object of layer.children) {
      if (object.tr != null) {
        object.tr.visible(false);
      }
    }
  }
  stage.batchDraw();

  let isDrawing = false;
  let currentLine;
  stage.on('mousedown', (evt) => {
    // Start drawing
    isDrawing = true;
    // Create new line object
    let pos = getRelativePointerPosition(stage);
    currentLine = new Konva.Line({
      stroke: currentDrawColor,
      strokeWidth: 3,
      points: [pos.x, pos.y]
    });
    layer.add(currentLine);
  });

  stage.on('mousemove', (evt) => {
    if (!isDrawing) {
      return;
    }

    // If drawing, add new point to the current line object
    let pos = getRelativePointerPosition(stage);
    let newPoints = currentLine.points().concat([pos.x, pos.y]);
    currentLine.points(newPoints);
    layer.batchDraw();
  });

  stage.on('mouseup', (evt) => {
    // End drawing
    isDrawing = false;
  });
}

function getRelativePointerPosition(node) {
  // the function will return pointer position relative to the passed node
  let transform = node.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();

  // get pointer (say mouse or touch) position
  let pos = node.getStage().getPointerPosition();

  // now we find relative point
  return transform.point(pos);
}

export function endHand() {
  stage.draggable(false);
  stage.off('wheel');
}

export function endPen() {
  stage.off('mousedown');
  stage.off('mousemove');
  stage.off('mouseup');
}

export function setColor(rgb) {
  currentDrawColor = rgb;
}
