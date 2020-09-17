import {createCircle, createRect} from '@/logic/stage/layers/mouseTools/drawShapes';
import {stage, store} from '@/logic/stage/main';
import {getRelativePointerPosition} from '@/logic/stage/layers/layerFunctions';
import Konva from 'konva';

import {layer} from '@/logic/stage/layers/mouseTools/main';

export default function () {
  createCircle(layer);
  createRect(layer);

  let isDrawing = false; // currently drawing a line
  let currentLine; // currently drawn line

  stage.batchDraw();

  stage.on('mousedown touchstart', (e) => {
    try {
      if (e.evt.touches[0].touchType == "direct") {
        return;
      }
    } catch (e) {
    }

    isDrawing = true;

    // Create new line object
    let pos = getRelativePointerPosition(stage);

    currentLine = new Konva.Line({
      stroke: store.state.manu.freeDrawing.color,
      strokeWidth: parseInt(store.state.manu.erase ? store.state.manu.freeDrawing.strokeWidth * 10 : store.state.manu.freeDrawing.strokeWidth),
      points: [pos.x, pos.y],
      globalCompositeOperation: 'source-over',
      listening: false
    });

    layer.add(currentLine);

    stage.batchDraw();
  });

  stage.on('mousemove touchmove', () => {
    stage.batchDraw();

    if (!isDrawing)
      return;

    // If drawing, add new point to the current line object
    let pos = getRelativePointerPosition(stage);
    let newPoints = currentLine.points().concat([pos.x, pos.y]);

    currentLine.points(newPoints);

    layer.batchDraw();
  });

  stage.on('mouseup touchend', () => {
    // End drawing
    isDrawing = false;
  });

  stage.on('mousedown touchstart', (e) => {
    if (e.evt.touches[0].touchType == "direct") {
      stage.draggable(true);
    }
  });

  stage.on('mouseup touchend', () => {
    stage.draggable(false);
  });
}
