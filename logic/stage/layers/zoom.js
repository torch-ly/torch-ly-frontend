import {stage} from "../main";

export function enableZoom() {
  stage.on('wheel', (e) => {
    let scaleBy = 0.99;
    e.evt.preventDefault();
    let oldScale = stage.scaleX();

    let newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });
    stage.batchDraw();
  });
}
