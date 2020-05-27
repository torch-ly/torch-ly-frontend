export const state = () => ({
  drawing: true
})

export const mutations = {
  setDrawing(state, drawing) {
    state.drawing = drawing;
  }
}
