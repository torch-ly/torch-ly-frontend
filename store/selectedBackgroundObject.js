import {updateBackgroundObject} from "../logic/stage/layers/background/init";

export const state = () => ({
  x: 0,
  y: 0,
  snapToGrid: false,
  rotation: 0,
  hash: ""
})

export const mutations = {
  setDisplay(store, data) {
    store.x = data.object.x();
    store.y = data.object.y();
    store.snapToGrid = data.object.snapToGrid;
    store.rotation = data.object.rotation();
    store.hash = data.hash;
  },

  updateObject(store, data){
    updateBackgroundObject(store.hash, {x: parseInt(data.x), y: parseInt(data.y), snapToGrid: (data.snapToGrid.toString().toLowerCase() === "true"), rotation: parseFloat(data.rotation)})
  }
}
