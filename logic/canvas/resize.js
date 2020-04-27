import {moveAndZoom} from "./moveAndZoom";
import {canvas} from "./main";

export function resizeCanvasListener(self) {
  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas(self, canvas);
}

function resizeCanvas(self) {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  moveAndZoom(self.screenContext, canvas)
}
