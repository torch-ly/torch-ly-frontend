import {stage} from "../logic/stage/main";

export const state = () => ({
  move: true,
  layer: "Token",

  fogOfWar: false,

  monsters: false,

  drawing: false,
  erase: false,
  freeDrawing: {
    color: "#000000",
    strokeWidth: 3,
    drawingObject: "",
    snapToGrid: false
  },
  measure: false,
  measureDetails: {
    length: 0,
    unitEnding: "ft",
    boxSize: "5"
  }
})

export const mutations = {
  setDrawing(state) {
    state.drawing = true;
    state.move = false;
    state.measure = false;
    state.monsters = false;
    state.fogOfWar = false;

    stage.draggable(false);
    stage.draw();
  },
  setErase(state) {
    state.erase = !state.erase;
    state.freeDrawing.drawingObject = "";
  },
  setDrawingColor(state, color) {
    state.freeDrawing.color = color;
  },
  setLayer(state, layer) {
    state.layer = layer;
  },
  setHand(state) {
    state.move = true;
    state.drawing = false;
    state.measure = false;
    state.monsters = false;
    state.fogOfWar = false;

    stage.draggable(true);
    stage.draw();
  },
  setDrawingObject(state, object) {
    state.erase = false;
    state.freeDrawing.drawingObject = object;
  },
  setDrawingObjectSnapToGrid(state) {
    state.freeDrawing.snapToGrid = !state.freeDrawing.snapToGrid;
  },
  setMeasure(state) {
    state.move = false;
    state.drawing = false;
    state.measure = true;
    state.monsters = false;
    state.fogOfWar = false;

    stage.draggable(false);
    stage.draw();
  },
  setMeasureLength(state, length) {
    state.measureDetails.length = length;
  },
  setMeasureDetails(state, detail) {
    state.measureDetails.unitEnding = detail.unitEnding;
    state.measureDetails.boxSize = detail.boxSize
  },
  setDrawingStrokeWidth(state, width) {
    state.freeDrawing.strokeWidth = width;
  },
  setFogOfWar(state) {
    state.move = false;
    state.drawing = false;
    state.measure = false;
    state.monsters = false;
    state.fogOfWar = true;

    stage.draggable(true);
    stage.draw();
  },
  setMonsters(state) {
    state.move = false;
    state.drawing = false;
    state.measure = false;
    state.monsters = true;
    state.fogOfWar = false;

    stage.draggable(true);
    stage.draw();

  }
}
