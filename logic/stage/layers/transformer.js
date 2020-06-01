import Konva from "konva";
import {stage, store} from "../main";

let transformer;
let transformerLayer;

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
  for (let object of nodes) {
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
    } else if (e.target == object) {
      setNodesToTransformer([object]);
    }
    transformerLayer.batchDraw();
  })
}


