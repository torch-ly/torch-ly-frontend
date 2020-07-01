export const state = () => ({
  move: true,
  layer: "Background",

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
  },
  setMeasureLength(state, length) {
    state.measureDetails.length = length;
  },
  setDrawingStrokeWidth(state, width) {
    state.freeDrawing.strokeWidth = width;
  }

}
