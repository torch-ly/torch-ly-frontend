import {resizeCanvasListener} from "./resize";
import {moveAndZoom} from "./moveAndZoom";

export function main(self, screen) {
  resizeCanvasListener(self, screen)
  moveAndZoom(self.screenContext, screen)
}
