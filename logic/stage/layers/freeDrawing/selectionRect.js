import {stage} from "../../main";
import {setStageDragAndDrop} from "../layerFunctions";
import Konva from "konva";
import {getRelativePointerPosition} from "./main";

export function createRect(layer) {
  let start = {x: 0, y: 0};

  let selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false
  });
  layer.add(selectionRectangle);

  let x1, y1, x2, y2;
  stage.on('mousedown touchstart', (e) => {
    // do nothing if we mousedown on eny shape

    setStageDragAndDrop(false, false);

    x1 = getRelativePointerPosition(stage).x;
    y1 = getRelativePointerPosition(stage).y;
    x2 = getRelativePointerPosition(stage).x;
    y2 = getRelativePointerPosition(stage).y;

    start = getRelativePointerPosition(stage);

    selectionRectangle.visible(true);
    selectionRectangle.width(0);
    selectionRectangle.height(0);
    selectionRectangle.moveToTop();
    layer.draw();
  });

  stage.on('mousemove touchmove', () => {
    // no nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    x2 = getRelativePointerPosition(stage).x;
    y2 = getRelativePointerPosition(stage).y;

    selectionRectangle.setAttrs({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    });
    layer.batchDraw();
  });

  stage.on('mouseup touchend', () => {
    // no nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }

    let newRect = new Konva.Rect({
      x: start.x,
      y: start.y,
      width: getRelativePointerPosition(stage).x - start.x,
      height: getRelativePointerPosition(stage).y - start.y,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4
    });
    console.log(newRect)
    layer.add(newRect);

    //setStageDragAndDrop(true, true);
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      selectionRectangle.visible(false);
      layer.batchDraw();
    });

    layer.batchDraw();
  });
}
