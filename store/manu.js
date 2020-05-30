export const state = () => ({
  drawing: false,
  move: true,
  layer: "Background",
  erase: false,
  measure: false
})

export const mutations = {
  setDrawing(state) {
    state.drawing = true;
    state.move = false;
    state.measure = false;
  },
  setErase(state) {
    state.erase = !state.erase;
  },
  setLayer(state, layer) {
    state.drawing = false;
    state.layer = layer;
    state.move = true;
    state.measure = false;
  },
  setHand(state) {
    state.move = true;
    state.drawing = false;
    state.measure = false;
  },
  setMeasure(state) {
    state.move = false;
    state.drawing = false;
    state.measure = true;
  }
}
