import hotkeys from 'hotkeys-js';
import {store} from "~/logic/stage/main";
import {saveBackgroundLayer} from "~/logic/stage/layers/background/init";

// Set Layer to background layer
hotkeys('command+b,ctrl+b', function(event, handler){
  store.commit("manu/setHand");
  store.commit("manu/setLayer", "Background")
});


// Set Layer to token layer
hotkeys('command+t,ctrl+t', function(event, handler){
  store.commit("manu/setHand");
  store.commit("manu/setLayer", "Token")
});

// Open Monster search
hotkeys('command+m,ctrl+m', function(event, handler){
  store.commit("manu/setMonsters");
});

// Save Background Layer
hotkeys('command+s,ctrl+s', function (event, handler){
  if (store.state.manu.layer !== "Background")
    return;

  saveBackgroundLayer();
})
