import {stage} from "../../main";
import {getRelativePointerPosition} from "../layerFunctions";

export function draw(layer) {
  let start = null;

  stage.on("mousedown", (e) => {
    start = getRelativePointerPosition(stage);
    console.log(stage.getPointerPosition(), getRelativePointerPosition(stage));
  })

  stage.on("mousemove", (e) => {
    layer.clear();
    if (start != null) {
      layer.add(new Konva.Arrow({
        x: start.x,
        y: start.y,
        points: [0, 0, getRelativePointerPosition(stage).x, getRelativePointerPosition(stage).y],
        pointerLength: 20,
        pointerWidth: 20,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4,
      }));
    }
  })

  stage.on("mouseup", () => {
    start = null;
  })
}
