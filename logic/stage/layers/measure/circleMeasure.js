import {blockSnapSize} from "@/logic/stage/layers/grid/main";
import {getRelativePointerPosition} from "@/logic/stage/functions/layerFunctions";
import {stage} from "@/logic/stage/main";
import {layer} from "@/logic/stage/layers/measure/main";

export function startCircleMeasure() {
  let measureCircle = new Konva.Circle({
    radius: blockSnapSize * 3,
    x: getRelativePointerPosition(stage).x,
    y: getRelativePointerPosition(stage).y,
    strokeWidth: 2,
    stroke: "black",
  })


  layer.add(measureCircle);
  layer.batchDraw();
}
