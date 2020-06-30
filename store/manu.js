export const state = () => ({
  drawing: false,
  move: true,
  layer: "Background",
  erase: false,
  freeDrawing: {
    color: "#000000",
    strokeWidth: 3,
    drawingObject: "",
    snapToGrid: false
  }
})

export const mutations = {
  setDrawing(state) {
    state.drawing = true;
    state.move = false;
  },
  setErase(state) {
    state.erase = !state.erase;
    state.freeDrawing.drawingObject = "";
  },
  setDrawingColor(state, color) {
    state.freeDrawing.color = color;
  },
  setLayer(state, layer) {
    state.drawing = false;
    state.layer = layer;
    state.move = true;
  },
  setHand(state) {
    state.move = true;
    state.drawing = false
  },
  setDrawingObject(state, object) {
    state.erase = false;
    state.freeDrawing.drawingObject = object;
  },
  setDrawingObjectSnapToGrid(state) {
    state.freeDrawing.snapToGrid = !state.freeDrawing.snapToGrid;
  }

}
