export const state = () => ({
  layers: null
})

export const mutations = {
  setLayers(state, layers) {
    console.log(layers)
    state.layers = layers;
  }
}

