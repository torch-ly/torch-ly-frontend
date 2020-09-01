import hotkeys from 'hotkeys-js';
import {store} from "~/logic/stage/main";
import {saveBackgroundLayer} from "~/logic/stage/layers/background/init";

// Set Layer to background layer
hotkeys('command+b,ctrl+b', () => {
  store.commit("manu/setHand");
  store.commit("manu/setLayer", "Background")
});


// Set Layer to token layer
hotkeys('command+t,ctrl+t', () => {
  store.commit("manu/setHand");
  store.commit("manu/setLayer", "Token")
});

// Open Monster search
hotkeys('command+m,ctrl+m', () => {
  store.commit("manu/setMonsters");
});

// Save Background Layer
hotkeys('command+s,ctrl+s', (event) => {
  if (store.state.manu.layer !== "Background")
    return;

  saveBackgroundLayer();
  event.preventDefault()
});
