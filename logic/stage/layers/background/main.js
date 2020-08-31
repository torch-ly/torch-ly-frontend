import {init} from "./init";
import {manageTransformerLayer} from "../layerManager";

let layer;

export function draw(drawable) {
  layer.add(drawable);
  layer.batchDraw();
}

export function updateDraw(){
  layer.batchDraw();
}

export function setLayer(pLayer) {
  layer = pLayer;
  init();
}

export function clearLayer(){
  layer.clear();
  for (let children of layer.children) {
    children.remove();
  }
  manageTransformerLayer();
  layer.batchDraw();
}
