export const state = () => ({
  drawing: false,
  move: true,
  layer: "Background"
})

export const mutations = {
  setDrawing(state) {
    state.drawing = true;
    state.move = false;
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
