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
    width: store.state.manu.freeDrawing.strokeWidth * 20,
    height: store.state.manu.freeDrawing.strokeWidth * 20,
    stroke: 'black'
  });

  layer.add(eraserRect);

  stage.on('mousedown', () => {
    destroyIntersectingLines();
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

    destroyIntersectingLines();

  });

  stage.on('mouseup', () => {
    // End drawing
    isDrawing = false;
  });
}

function destroyIntersectingLines() {
  let lines = layer.children.filter(child => (child instanceof Konva.Line && !(child instanceof Konva.Arrow)));

  for (let line of lines) {
    for (let i = 0; i < line.points().length - 2; i += 2) {
      if (eraserRect.intersects({
        x: line.points()[i],
        y: line.points()[i + 1]
      })) {
        line.destroy();
      }
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
