import {stage} from "../main";
import {updateGrid} from "@/logic/stage/layers/grid/main";

export function enableZoom() {
  stage.on('wheel', (e) => {
    let scaleBy = 0.95;
    e.evt.preventDefault();
    let oldScale = stage.scaleX();

    let pointer = stage.getPointerPosition();

    let mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    let newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({
      x: newScale,
      y: newScale
    });

    let newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);

    updateGrid();
    stage.batchDraw();
  });
}
