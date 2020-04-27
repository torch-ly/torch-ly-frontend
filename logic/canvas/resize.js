import {moveAndZoom} from "./moveAndZoom";

export function resizeCanvasListener(self, screen) {
  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas(self, screen);
}

function resizeCanvas(self, screen) {

  screen.width = window.innerWidth;
  screen.height = window.innerHeight;

  /**
   * Your drawings need to be inside this function otherwise they will be reset when
   * you resize the browser window and the canvas goes will be cleared.
   */
  moveAndZoom(self.screenContext, screen)
}
