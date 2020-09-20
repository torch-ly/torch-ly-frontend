import {stage, store} from '@/logic/stage/main';
import {getRelativePointerPosition} from '@/logic/stage/layers/layerFunctions';
import Konva from 'konva';

import {layer} from '@/logic/stage/layers/mouseTools/main';
import {removeDrawing} from "@/plugins/backendComunication/drawing";

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
      destroyIntersectingLines(object);
    } else if (object instanceof Konva.Circle) {
      destroyIntersectingCircle(object);
    }
  }
}

function destroyIntersectingLines(object) {
  for (let i = 0; i < object.points().length - 2; i += 2) {
    if (eraserRect.intersects({
      x: object.points()[i],
      y: object.points()[i + 1]
    })) {
      if (object.objectID != null) {
        object.points([]);
        removeDrawing(object.objectID);
      }
    }
  }
}

function destroyIntersectingCircle(object) {
  let pos = getRelativePointerPosition(stage);

  let distance = Math.sqrt(Math.pow(object.x() - pos.x, 2) + Math.pow(object.y() - pos.y, 2));

  if (Math.abs(distance - object.radius()) < (eraserRect.width() * 3 / 4)) {
    removeDrawing(object.objectID);
  }
}

export function removeEraser() {
  try {
    eraserRect.destroy();
    layer.batchDraw();
  } catch (e) {
  }
}
