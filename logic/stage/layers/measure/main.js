import {stage} from "../../main";
import {getRelativePointerPosition} from "../layerFunctions";

let arrow;

export function draw(layer) {

  let start = {x: 0, y: 0};

  stage.on("mousedown", (e) => {/*
    start = getRelativePointerPosition(stage);
    console.log(stage.getPointerPosition(), getRelativePointerPosition(stage));*/

    start = getRelativePointerPosition(stage);

    console.log("234")
    arrow = new Konva.Arrow({
      points: [start.x, start.y, start.x, start.y],
      pointerLength: 20,
      pointerWidth: 20,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 4,
    });
    arrow.currentlyDrawing = true;
    layer.add(arrow);
  })

  stage.on("mousemove", (e) => {
    if (arrow != null && arrow.currentlyDrawing) {
      arrow.points([start.x, start.y, getRelativePointerPosition(stage).x, getRelativePointerPosition(stage).y])
    }
    layer.batchDraw();
    console.log(stage.getPointerPosition(), getRelativePointerPosition(stage));
  })
}
