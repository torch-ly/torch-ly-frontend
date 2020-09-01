import {Image as KonvaImage, Transformer} from "konva";
import {stage, store} from "../main";
import {getRelativePointerPosition} from "./layerFunctions";
import {setMoveObjectByArrow} from "./objectFunctions";
import {manageTransformerLayer} from "./layerManager";

let transformer;
let transformerLayer;
let selectionLayer;
let transformerNodes = [];

export function createTransformer() {
  transformer = new Konva.Transformer({
    nodes: [],
    visible: true,
    rotationSnaps: [0, 90, 180, 270],
    rotationSnapTolerance: 10,
    name: "transformer"
  });
}

export function setNodesToTransformer(nodes) {
  clearTransformerNodes();
  transformer.nodes(nodes);

  for (let object of transformer.nodes()) {
    transformerNodes.push(object.id())

    object.draggable(true);
    object.moveToTop();
  }

  transformer.moveToTop();
  setMoveObjectByArrow(nodes[0]);
}

export function clearTransformerNodes() {
  for (let object of transformer.nodes())
    object.draggable(false);

  transformer.nodes([]);
  transformerNodes = [];
  setMoveObjectByArrow(null);
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
    manageTransformerLayer();
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

    selectionRect.visible(false);
    selectionLayer.batchDraw();

    let shapes = Array.from(transformerLayer.children).filter(object =>
      !(object instanceof Transformer)
    );
    let box = selectionRect.getClientRect();
    let selected = shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    clearTransformerNodes();
    setNodesToTransformer(selected);
    transformerLayer.batchDraw();
    selectionLayer.batchDraw();
  })
}

export function selectToken(characterSelection) {
  manageTransformerLayer();
  for (let character of transformerLayer.children.filter(char => char instanceof KonvaImage)) {
    if (character.characterID == characterSelection.id) {
      setNodesToTransformer([character]);
    }
  }
  transformerLayer.batchDraw();
}

export function addDeletionKeyListener() {
  window.addEventListener("keyup", (e) => {
    if (e.key != "Delete" && e.key != "Backspace")
      return;

    for (let object of transformer.nodes()) {
      object.removeElement();
      object.destroy();
    }
    clearTransformerNodes();
    stage.batchDraw();
  })
}
