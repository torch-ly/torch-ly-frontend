import {Image as KonvaImage} from "konva";
import {stage, store} from "../../main";
import {setMoveObjectByArrow} from "../objectFunctions";
import {manageTransformerLayer} from "../../layers/layerManager";
import tools from '@/enums/tools/tools';
import {setCharacterAttrs} from "@/plugins/backendComunication/characters";
import {blockSnapSize} from "@/logic/stage/layers/grid/main";

export let transformer;
export let transformerLayer;
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

  if (nodes.length === 1) {
    if (nodes[0].characterID != null) {
      store.commit('character/setSelectedCharacter', nodes[0].characterID);
      for (let condition of nodes[0].conditions) {
        condition.moveToTop();
      }
    }

    setMoveObjectByArrow(nodes[0]);
  }
  transformer.forceUpdate();
}

export function clearTransformerNodes() {
  for (let object of transformer.nodes())
    object.draggable(false);

  transformer.nodes([]);
  transformerNodes = [];
  setMoveObjectByArrow(null);

  store.commit('character/setSelectedCharacter', '');

  stage.batchDraw();
}

export function addTransformerToLayer(layer) {
  layer.add(transformer);
  transformerLayer = layer;
}

export function addTransformerClickListener(object) {
  stage.on('click tap', (e) => {
    if (store.state.manu.currentTool !== tools.move || e.evt.button === 2) {
      return;
    }
    manageTransformerLayer();

    if (!Array.from(transformerLayer.children).includes(e.target)) {
      clearTransformerNodes();
    } else if (Array.from(transformerLayer.children).includes(object) && store.state.manu.currentTool == tools.DEFAULT) { //is this object the target && is the object in the current layer of selection

      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
      const isSelected = transformer.nodes().indexOf(e.target) >= 0;

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        setNodesToTransformer([e.target])
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = transformer.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        setNodesToTransformer(nodes)
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = transformer.nodes().concat([e.target]);
        setNodesToTransformer(nodes)
      }
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

export function deleteSelectedDrawingObjects() {
  for (let object of transformer.nodes()) {
    object.removeElement();
    object.destroy();
  }
  clearTransformerNodes();
  stage.batchDraw();
}

export function addTransformationListener(object) {
  object.on("transformend", () => {
    let pastRot = object.rotation();
    object.rotation(0);

    let width = object.width() * object.getTransform().getMatrix()[0];

    setCharacterAttrs(object.characterID, pastRot, Math.round(width / blockSnapSize))
  });
}
