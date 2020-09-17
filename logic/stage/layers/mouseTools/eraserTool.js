import {stage, store} from '@/logic/stage/main';
import {getRelativePointerPosition} from '@/logic/stage/layers/layerFunctions';
import Konva from 'konva';

import {layer} from '@/logic/stage/layers/mouseTools/main';

let eraserRect;

export default function () {
  let isDrawing = false; // currently drawing a line
  let currentLine; // currently drawn line

  stage.batchDraw();

  eraserRect = new Konva.Rect({
    visible: true,
    width: store.state.manu.freeDrawing.strokeWidth * 10,
    height: store.state.manu.freeDrawing.strokeWidth * 10,
    stroke: 'black'
  });

  layer.add(eraserRect);

  stage.on('mousedown', () => {
    destroyIntersectingObjects();
    // Start drawing
    isDrawing = true;

    let pos = getRelativePointerPosition(stage);
    eraserRect.position({
      x: pos.x - eraserRect.width() / 2,
      y: pos.y - eraserRect.height() / 2
    });

    stage.batchDraw();
  });

  stage.on('mousemove', () => {
    let pos = getRelativePointerPosition(stage);
    eraserRect.position({
      x: pos.x - eraserRect.width() / 2,
      y: pos.y - eraserRect.height() / 2
    });

    layer.batchDraw();
    if (!isDrawing)
      return;

    destroyIntersectingObjects();

  });

  stage.on('mouseup', () => {
    // End drawing
    isDrawing = false;
  });
}

function destroyIntersectingObjects() {
  //let lines = layer.children.filter(child => (child instanceof Konva.Line && !(child instanceof Konva.Arrow)));

  for (let object of layer.children) {
    if (object instanceof Konva.Line) {
      destroyIntersectingLines(object.points(), object);
    }
  }
}

function destroyIntersectingLines(points, object) {
  for (let i = 0; i < points.length - 2; i += 2) {
    if (eraserRect.intersects({
      x: points[i],
      y: points[i + 1]
    })) {
      object.destroy();
    }
  }
}

export function removeEraser() {
  try {
    eraserRect.destroy();
    layer.batchDraw();
  } catch (e) {
  }
}
