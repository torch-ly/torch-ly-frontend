import {init} from "./init";
import {stage} from "../../main";

let layer;

export function draw(drawables) {
  layer.clear();
  for (let children of layer.children) {
    children.remove();
  }

  //manageTransformerLayer();

  drawables.forEach(drawable => layer.add(drawable));
  stage.draw();
}

export function setLayer(pLayer) {
  layer = pLayer;
  init();
  layer.clearBeforeDraw(true);
}
