import {stage} from "../../main";
import {enableZoom} from "../zoom";
import {getRelativePointerPosition} from "../layerFunctions";

let layer;

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
  let isDrawing = false;
  let currentLine;
  stage.on('mousedown', (evt) => {
    // Start drawing
    isDrawing = true;
    // Create new line object
    let pos = getRelativePointerPosition(stage);
    currentLine = new Konva.Line({
      stroke: 'black',
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

export function endHand() {
  stage.draggable(false);
  stage.off('wheel');
}

export function endPen() {
  stage.off('mousedown');
  stage.off('mousemove');
  stage.off('mouseup');
}
