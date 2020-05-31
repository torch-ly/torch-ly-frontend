export const state = () => ({
  drawing: false,
  move: true,
  layer: "Background",
  erase: false,
  freeDrawing: {
    color: "#000000",
    strokeWidth: 3,
    drawingObject: ""
  }
})

export const mutations = {
  setDrawing(state) {
    state.drawing = true;
    state.move = false;
  },
  setErase(state) {
    state.erase = !state.erase;
  },
  setLayer(state, layer) {
    state.drawing = false;
    state.layer = layer;
    state.move = true;
  },
  setHand(state) {
    state.move = true;
    state.drawing = false
  }
}
