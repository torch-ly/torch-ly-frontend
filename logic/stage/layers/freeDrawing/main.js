import {stage, store} from "../../main";
import {setLayerDragAndDrop} from "../layerFunctions";
import Konva from "konva";

let layer;
let currentDrawColor = "#000000";
let eraser;
let paintObject;

export function draw(pLayer) {
  layer = pLayer;

  eraser = new Konva.Rect({
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    visible: true
  });

  layer.add(eraser);

  /* ---- Init ---- */
  useHand();
}

export function useHand() {
  endPen();
  // Make stage draggable
  stage.draggable(true);
}

export function usePen() {
  endHand();

  for (let layer of stage.children) {
    setLayerDragAndDrop(layer, false);
  }

  paintObject = new Konva.Rect({
    x: stage.getPointerPosition().x - 15,
    y: stage.getPointerPosition().y - 15,
    width: 31,
    height: 31,
    stroke: "black",
    strokeWidth: "1",
    draggable: false,
  });

  paintObject.visible(false);

  layer.add(paintObject);

  let isDrawing = false; // currently drawing a line
  let currentLine; // currently drawn line

  stage.batchDraw();

  stage.on('mousedown', () => {
    // Start drawing
    isDrawing = true;

    // Create new line object
    let pos = getRelativePointerPosition(stage);

    currentLine = new Konva.Line({
      stroke: currentDrawColor,
      strokeWidth: store.state.manu.erase ? 30 : 3,
      points: [pos.x, pos.y],
      globalCompositeOperation: store.state.manu.erase ? 'destination-out' : 'source-over',
    });

    layer.add(currentLine);

    paintObject.moveToTop();

    stage.batchDraw();
  });

  stage.on('mousemove', () => {
    if (eraser != null) {
      eraser.x = stage.getPointerPosition().x;
      eraser.y = stage.getPointerPosition().y;
    }

    paintObject.x(stage.getPointerPosition().x - 15);
    paintObject.y(stage.getPointerPosition().y - 15);

    paintObject.visible(store.state.manu.erase);

    stage.batchDraw();

    if (!isDrawing)
      return;

    // If drawing, add new point to the current line object
    let pos = getRelativePointerPosition(stage);
    let newPoints = currentLine.points().concat([pos.x, pos.y]);

    currentLine.points(newPoints);

    layer.batchDraw();
  });

  stage.on('mouseup', () => {
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
  stage.draw();
  stage.draggable(false);
}

export function endPen() {
  for (let layer of stage.children) {
    setLayerDragAndDrop(layer, true);
  }
  stage.off('mousedown');
  stage.off('mousemove');
  stage.off('mouseup');
}

export function setColor(rgb) {
  currentDrawColor = rgb;
}
