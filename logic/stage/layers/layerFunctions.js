import {blockSnapSize} from "./grid/main";
import {stage} from "../main";
import Konva from "konva";

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

export function disableAll(objects) {
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

export function removeTransformer(objects) {
  for (let object of objects) {
    object.draggable = false;
    object.attrs.draggable = false;
    console.log(object)
    object.stopDrag();
  }
}

export function addTransformerClickListener(toListen) {
  stage.on('click', function (e) {
    if (e.target == stage) {
      disableAll(toListen);
    } else {
      for (let object of toListen) {
        if (e.target == object) {
          disableAll(toListen);
          object.tr.visible(true);
          try {
            object.draggable(true);
          } catch (e) {

          }
          object.moveToTop();
          object.tr.moveToTop();
        }
      }
    }
    stage.batchDraw();
  });
}

export function setStageDragAndDrop(enable) {
  enable ? stage.draggable(true) : stage.draggable(false);

  for (let layer of stage.children) {
    setLayerDragAndDrop(layer, enable);
  }
}

export function setLayerDragAndDrop(layer, enable) {
  if (layer != stage.children[1]) {
    return;
  }
  for (let object of layer.children) {
    if (enable) {
      try {
        object.draggable(true);
      } catch (e) {
      }
    } else {
      if (object.tr != null) {
        object.tr.visible(false);
      }
      try {
        object.draggable(false);
      } catch (e) {
      }
    }
  }
  stage.batchDraw();
}
