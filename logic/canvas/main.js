import {resizeCanvasListener} from "./resize";
import {moveAndZoom} from "./moveAndZoom";
import {init} from "./layers/layerManager";

export let canvas = null;
export let ctx = null;

export function main(self, pcanvas, pctx) {
  canvas = pcanvas;
  ctx = pctx

  init();
  resizeCanvasListener(self)
  moveAndZoom(self.screenContext)
}
