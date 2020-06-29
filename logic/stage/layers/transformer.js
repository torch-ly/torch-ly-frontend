import Konva, {Transformer} from "konva";
import {stage, store} from "../main";
import {getRelativePointerPosition} from "./layerFunctions";

let transformer;
let transformerLayer;
let selectionLayer;

export function createTransformer() {
  transformer = new Konva.Transformer({
    nodes: [],
    visible: true,
    rotationSnaps: [0, 90, 180, 270],
    name: "transformer"
  });
}

export function setNodesToTransformer(nodes) {
  transformer.nodes(nodes);
  for (let object of transformer.nodes()) {
    object.draggable(true);
  }
  transformer.moveToTop();
}

export function clearTransformerNodes() {
  for (let object of transformer.nodes()) {
    object.draggable(false);
  }
  transformer.nodes([]);
}

export function addTransformerToLayer(layer) {
  layer.add(transformer);
  transformerLayer = layer;
}

export function addTransformerClickListener(object) {
  stage.on('click', (e) => {
    if (!store.state.manu.move) {
      return;
    }
    if (e.target == stage) {
      clearTransformerNodes();
    } else if (e.target == object && Array.from(transformerLayer.children).includes(object)) { //is this object the target && is the object in the current layer of selection
      setNodesToTransformer([object]);
    }
    transformerLayer.batchDraw();
  })
}

export function setSelectionLayer(layer) {
  selectionLayer = layer;
}

export function addSelectionListener() {
  let selectionRect = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false
  });
  selectionLayer.add(selectionRect);

  console.log("2", 2)

  let x1, y1, x2, y2;
  stage.on('mousedown', (e) => {
    if (e.target !== stage || e.evt.button !== 2) {
      return;
    }
    x1 = getRelativePointerPosition(stage).x;
    y1 = getRelativePointerPosition(stage).y;
    x2 = getRelativePointerPosition(stage).x;
    y2 = getRelativePointerPosition(stage).y;

    selectionRect.visible(true);
    selectionRect.width(0);
    selectionRect.height(0);
    selectionLayer.draw();
  });

  stage.on('mousemove', () => {
    if (!selectionRect.visible()) {
      return;
    }
    x2 = getRelativePointerPosition(stage).x;
    y2 = getRelativePointerPosition(stage).y;

    selectionRect.setAttrs({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    });
    selectionLayer.batchDraw();
  })

  stage.on('mouseup', () => {
    if (!selectionRect.visible()) {
      return;
    }
    // update visibility in timeout, so we can check it in click event
    selectionRect.visible(false);
    selectionLayer.batchDraw();

    let objectsInLayer = Array.from(transformerLayer.children);
    let objectsInSelection = [];

    for (let object of objectsInLayer) {
      console.log(object, haveIntersection(object, selectionRect))
      if (object instanceof Transformer) {
        continue;
      }
      if (haveIntersection(object, selectionRect)) {
        objectsInSelection.push(object);
      }
    }
    console.log(objectsInLayer, objectsInSelection)
    clearTransformerNodes();
    setNodesToTransformer(objectsInSelection);
    transformerLayer.batchDraw();
    selectionLayer.batchDraw();
  })
}

function haveIntersection(r1, r2) {
  console.log(r2.x(), r2.y(), r2.width(), r2.height())
  return !(
    r2.x() > r1.x() + r1.width() ||
    r2.x() + r2.width() < r1.x() ||
    r2.y() > r1.y() + r1.height() ||
    r2.y() + r2.height() < r1.y()
  );
}

