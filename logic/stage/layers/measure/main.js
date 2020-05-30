import {stage, store} from "../../main";
import {getRelativePointerPosition} from "../layerFunctions";

let arrow;

export function draw(layer) {

  let start = {x: 0, y: 0};

  stage.on("mousedown", (e) => {
    if (!store.state.manu.measure)
      return;

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
    if (!store.state.manu.measure || arrow == null)
      return;

    if (arrow.currentlyDrawing) {
      arrow.points([start.x, start.y, getRelativePointerPosition(stage).x, getRelativePointerPosition(stage).y])
    }
    layer.batchDraw();
  })

  stage.on("mouseup", (e) => {
    if (e.evt.button === 2)
      return true;

    arrow = null;
    layer.destroyChildren();
    layer.batchDraw();
  })
}
