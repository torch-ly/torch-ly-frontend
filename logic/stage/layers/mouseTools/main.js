import {stage, store} from "../../main";
import {getRelativePointerPosition} from "../layerFunctions";
import Konva from "konva";
import {createCircle, createRect} from "./drawShapes";
import tools from '@/enums/tools';
import { startDraw as startMeasure } from '@/logic/stage/layers/mouseTools/measure';
import penTool from '@/logic/stage/layers/mouseTools/penTool';
import eraserTool from '@/logic/stage/layers/mouseTools/eraserTool';

export let layer

export function initDrawingStoreWatch() {
  store.watch((state, getters) => state.manu.currentTool, (newState, oldState) => {
    toolChanged(newState)
  });
}

function toolChanged (tool) {
  stopAllTools();

  stage.on('mousedown', () => {
    createCircle(layer);
    createRect(layer);

    switch(tool) {
      case tools.move:
        startMoveTool();
        break;
      case tools.pen:
        penTool();
        break;
      case tools.eraser:
        eraserTool();
        break;
      case tools.measure:
        startMeasure();
        break;
    }
  });
}

function startMoveTool() {
  stage.draggable(true);
}

export function draw(pLayer) {
  layer = pLayer;
}



export function stopAllTools() {
  stage.draggable(false);

  stage.off('mousedown');
  stage.off('mousemove');
  stage.off('mouseup');
}

export function clearDrawing() {
  layer.destroyChildren();
  draw(layer);
  layer.batchDraw();
}
