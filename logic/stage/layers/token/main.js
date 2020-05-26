//TODO diplicate code

import {init} from "./init";

let layer;

export function draw(drawables) {
  layer.clear();
  for (let drawable of drawables) {
    layer.add(drawable);
    if (drawable.tr != null) {
      layer.add(drawable.tr);
    }
  }
}

export function setLayer(pLayer) {
  layer = pLayer;
  init();
}
