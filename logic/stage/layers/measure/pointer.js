import {layer} from "@/logic/stage/layers/measure/main";
import {stage} from "@/logic/stage/main";
import {pointToPos} from "@/plugins/backendComunication/pointer";
import {getRelativePointerPosition} from "@/logic/stage/functions/layerFunctions";
import Konva from "konva";

export function pointTo(x, y, color) {
  let pointer = new Konva.Circle({
    x: x,
    y: y,
    radius: 0,
    strokeWidth: 4,
    stroke: color,
    listening: false
  });
  layer.add(pointer);
  layer.batchDraw();

  let scale = 1;

  let anim = new Konva.Animation(function () {

    if (scale >= 100) {
      anim.stop();
      pointer.destroy();
    }

    pointer.radius(scale);
    scale++;
  }, layer);

  anim.start();
}

export function enablePointer() {
  stage.on("dblclick", () => pointToPos(parseInt(getRelativePointerPosition(stage).x), parseInt(getRelativePointerPosition(stage).y), "green"));
}
