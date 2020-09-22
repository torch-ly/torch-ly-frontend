export let layer

export function setDrawLayer(pLayer) {
  layer = pLayer;
}

export function clearDrawing() {
  layer.destroyChildren();
  layer.batchDraw();
}
