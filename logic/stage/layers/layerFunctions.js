import {blockSnapSize} from "./grid/main";
import {stage} from "../main";
import Konva from "konva";
import {store} from "../main";

export function addSnapToGridListener(objects) {
  for (let object of objects) {
    object.on('dragend', (e) => {
      if (object.snapToGrid) {
        snapToGrid(object);
      }
    });
  }
}

//TODO Array To VarArgs
export function snapToGrid(object) {
  let x = object.hasOwnProperty("attrs") ? object.attrs.x : object.x();
  let y = object.hasOwnProperty("attrs") ? object.attrs.y : object.y();

  object.position({
    x: Math.round(x / blockSnapSize) * blockSnapSize,
    y: Math.round(y / blockSnapSize) * blockSnapSize
  });
  stage.batchDraw();
}

export function addTransformer(toAdd) {
  for (let object of toAdd) {
    let tr = new Konva.Transformer({
      nodes: [object],
      visible: false,
      rotationSnaps: [0, 90, 180, 270]
    });
    object.tr = tr;
  }
}

function disableAll(objects) {
  for (let object of objects) {
    try {
      if (object.hasOwnProperty("tr")) {
        object.tr.visible(false);
      }
      object.draggable(false);
    } catch (e) {
    }
  }
}

export function addTransformerClickListener(toListen) {
  stage.on('click', function (e) {

    // return if not im move mode as no dragging should be disabled
    if (!store.state.manu.move)
      return;

    disableAll(toListen);

    for (let object of toListen) {

      if (e.target !== object)
        continue;

      object.tr.visible(true);
      try {
        object.draggable(true);
      } catch (e) { }

      object.moveToTop();
      object.tr.moveToTop();
    }

    stage.batchDraw();
  });
}

export function setStageDragAndDrop(enable) {
  stage.draggable(enable);

  for (let layer of stage.children) {
    setLayerDragAndDrop(layer, enable);
  }
}


export function setLayerDragAndDrop(layer, enable) {
  for (let object of layer.children) {
    try {
      object.draggable(enable);
      if (enable)
        object.tr.visible(true);
      if (object.tr != null) {
        object.tr.visible(false);
      }
    } catch (e) { }
  }

  stage.batchDraw();
}
