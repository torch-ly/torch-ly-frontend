//TODO diplicate code

import {init} from "./init";

let layer;

export function draw(drawables) {
  layer.clear();
  for (let children of layer.children) {
    children.remove();
  }

  console.log(layer)
  drawables.forEach(drawable => layer.add(drawable));
  layer.draw();
}

export function setLayer(pLayer) {
  layer = pLayer;
  init();
  layer.clearBeforeDraw(true);
}
