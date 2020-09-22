import {stage, store} from "@/logic/stage/main";
import tools from "@/enums/tools";
import {addFogOfWarListener, destroyCurrentlyDrawing} from "@/logic/stage/layers/fogofwar/main";
import penTool from "@/logic/stage/layers/drawing/penTool";
import eraserTool, {removeEraser} from "@/logic/stage/layers/drawing/eraserTool";
import {startDraw as startMeasure} from "@/logic/stage/layers/measure/lineMeasure";
import {createCircle, createRect} from "@/logic/stage/layers/drawing/drawShapes";
import {enableZoom} from "@/logic/stage/functions/zoom";

export function initDrawingStoreWatch() {
  store.watch((state, getters) => state.manu.currentTool, (newState, oldState) => {
    shutDownOldTool(oldState);
    toolChanged(newState);
  });
}

function shutDownOldTool(oldtool) {
  switch (oldtool) {
    case tools.fogOfWar:
      destroyCurrentlyDrawing();
  }
}

function toolChanged(tool) {
  stopAllTools();

  switch (tool) {
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
    case tools.monsters:
      startMoveTool();
      break;
    case tools.circle:
      createCircle();
      break;
    case tools.rectangle:
      createRect();
      break;
  }
}

function startMoveTool() {
  stage.draggable(true);
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

  // Remove Eraser Rectangle
  removeEraser();
}
