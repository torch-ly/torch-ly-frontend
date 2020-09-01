import hotkeys from 'hotkeys-js';
import {store} from "~/logic/stage/main";
import {saveBackgroundLayer} from "~/logic/stage/layers/background/init";

// toggle layer
hotkeys('command+b,ctrl+b', () => {
  toggleLayer()
});

export function toggleLayer() {
  store.commit("manu/setHand");

  if (store.state.manu.layer === "Background") {
    store.commit("manu/setLayer", "Token");
  } else {
    store.commit("manu/setLayer", "Background");
  }
}

// Open Monster search
hotkeys('command+m,ctrl+m', () => {
  store.commit("manu/setMonsters");
});

// Save Background Layer
hotkeys('command+s,ctrl+s', (event) => {
  if (store.state.manu.layer !== "Background")
    return;

  saveBackgroundLayer();
  event.preventDefault();
});
