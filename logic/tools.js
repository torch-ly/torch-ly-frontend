import {stage, store} from "@/logic/stage/main";
import tools from "@/enums/tools/tools";
import {addFogOfWarListener, destroyCurrentlyDrawing} from "@/logic/stage/layers/fogofwar/main";
import penTool from "@/logic/stage/layers/drawing/penTool";
import eraserTool, {removeEraser} from "@/logic/stage/layers/drawing/eraserTool";
import {startLineMeasure as startMeasure} from "@/logic/stage/layers/measure/lineMeasure";
import {createCircle, createRect} from "@/logic/stage/layers/drawing/drawShapes";
import {enableZoom} from "@/logic/stage/functions/zoom";
import drawTools from "@/enums/tools/drawTools";
import measureTools from "@/enums/tools/measureTools";

export function initDrawingStoreWatch() {
  store.watch((state, getters) => state.manu.currentTool, (newState, oldState) => {
    shutDownOldTool(oldState);
    toolChanged(newState);
  });

  store.watch((state, getters) => state.manu.drawTool, (newState, oldState) => {
    shutDownOldTool(oldState);
    drawToolChanged(newState);
  });

  store.watch((state, getters) => state.manu.measureTool, (newState, oldState) => {
    shutDownOldTool(oldState);
    measureToolChanged(newState);
  });
}

function shutDownOldTool(oldtool) {
  switch (oldtool) {
    case tools.fogOfWar:
      destroyCurrentlyDrawing();
  }
}

function drawToolChanged(tool) {
  stopAllTools();

  switch (tool) {
    case drawTools.pen:
      penTool();
      break;
    case drawTools.eraser:
      eraserTool();
      break;
    case drawTools.circle:
      createCircle();
      break;
    case drawTools.rectangle:
      createRect();
      break;
  }
}

function measureToolChanged(tool) {
  stopAllTools();

  switch (tool) {
    case measureTools.line:
      startMeasure();
      break;
    case measureTools.circle:
      break;
    case measureTools.cone:
      break;
  }
}

function toolChanged(tool) {
  stopAllTools();

  switch (tool) {
    case tools.move:
      startMoveTool();
      break;
    case tools.fogOfWar:
      addFogOfWarListener();
      break;
    case tools.monsters:
      startMoveTool();
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
