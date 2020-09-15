import {stage, store} from "../../main";
import tools from '@/enums/tools';
import {startDraw as startMeasure} from '@/logic/stage/layers/mouseTools/measure';
import penTool from '@/logic/stage/layers/mouseTools/penTool';
import eraserTool from '@/logic/stage/layers/mouseTools/eraserTool';
import {addFogOfWarListener} from '~/logic/stage/layers/fogofwar/main';
import {destroyCurrentlyDrawing} from "../fogofwar/main";
import {enableZoom} from "@/logic/stage/layers/zoom";

export let layer

export function initDrawingStoreWatch() {
  store.watch((state, getters) => state.manu.currentTool, (newState, oldState) => {
    shutDownOldTool(oldState);
    toolChanged(newState);
  });
}

function shutDownOldTool(oldtool){
  switch(oldtool){
    case tools.fogOfWar:
      destroyCurrentlyDrawing();
  }
}

function toolChanged (tool) {
  stopAllTools();

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
    case tools.fogOfWar:
      addFogOfWarListener();
      break;
  }
}

function startMoveTool() {
  stage.draggable(true);
}

export function setDrawLayer(pLayer) {
  layer = pLayer;
}



export function stopAllTools() {
  stage.draggable(false);

  stage.off('mousedown');
  stage.off('mousemove');
  stage.off('mouseup');
  stage.off('touchstart');
  stage.off('touchmove');
  stage.off('touchend');

  // Enable zoom zo prevent default zoom
  enableZoom();
}

export function clearDrawing() {
  layer.destroyChildren();
  draw(layer);
  layer.batchDraw();
}
