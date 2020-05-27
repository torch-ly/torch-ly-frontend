export const state = () => ({
  drawing: false
})

export const mutations = {
  setDrawing(state, drawing) {
    state.drawing = drawing;
  }
}
