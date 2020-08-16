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
  layer.destroyChildren();
  manageTransformerLayer();
  layer.batchDraw();
}
