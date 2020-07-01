import {init} from "./init";

let layer;

export function draw(drawables) {
  layer.clear();
  for (let drawable of drawables) {
    layer.add(drawable);
  }
}

export function setLayer(pLayer) {
  layer = pLayer;
  init();
}
