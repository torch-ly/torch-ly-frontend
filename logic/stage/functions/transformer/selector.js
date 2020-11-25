import {stage} from "@/logic/stage/main";
import {setNodesToTransformer, transformerLayer as layer} from "@/logic/stage/functions/transformer/transformer";
import {getRelativePointerPosition} from "@/logic/stage/functions/layerFunctions";
import {manageTransformerLayer} from "@/logic/stage/layers/layerManager";
import Konva, {Transformer} from "konva";

let selectionRectangle;

export function addSelectionRect() {
  manageTransformerLayer();

  selectionRectangle = new Konva.Rect({
    fill: "rgba(0,0,255,0.5)",
    visible: false,
    id: "selectionRect"
  });

  let x1, y1, x2, y2;
  stage.on("mousedown", (e) => {
    // do nothing if we mousedown on eny shape
    if (e.evt.button !== 2) {
      return;
    }

    layer.add(selectionRectangle);

    x1 = getRelativePointerPosition(stage).x;
    y1 = getRelativePointerPosition(stage).y;
    x2 = getRelativePointerPosition(stage).x;
    y2 = getRelativePointerPosition(stage).y;

    selectionRectangle.visible(true);
    selectionRectangle.width(0);
    selectionRectangle.height(0);
    layer.draw();
  });

  stage.on("mousemove", () => {
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

  stage.on("mouseup", () => {
    // no nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      selectionRectangle.visible(false);
      selectionRectangle.remove();
      layer.batchDraw();
    });

    let shapes = layer.children.filter((obj) => !(obj instanceof Transformer) && obj.id() != "selectionRect");
    let box = selectionRectangle.getClientRect();
    let selected = shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect())
    );

    setNodesToTransformer(selected);

    layer.batchDraw();
  });
}
