import {init} from "./init";
import {stage, store} from "../../main";
import {Image as KonvaImage} from "konva";

export let layer;

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
