import {Image as KonvaImage} from "konva";
import {stage, store} from "../main";
import {setMoveObjectByArrow} from "./objectFunctions";
import {manageTransformerLayer} from "./layerManager";

let transformer;
let transformerLayer;
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
