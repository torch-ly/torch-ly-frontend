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
    //TODO Fix scaleToGrid
    //addScaleToGrid(object);
  }
}

export let activeScaleToGridTransformerObject;

function addScaleToGrid(object) {
  object.tr.on("mousedown", function () {
    activeScaleToGridTransformerObject = object;
  })
  stage.on("mouseup", function () {
    if (activeScaleToGridTransformerObject != null) {
      console.log("End", activeScaleToGridTransformerObject);
      scaleToGrid(activeScaleToGridTransformerObject);
      activeScaleToGridTransformerObject = null;
    }
  })
}

function scaleToGrid(object) {
  snapToGrid(object);
  let newScale = {
    x: 0,
    y: 0
  }
  if (Math.abs(object.attrs.scaleX - Math.round(object.attrs.scaleX)) < 0.25) {
    newScale.x = Math.round(object.attrs.width / blockSnapSize) * Math.round(object.attrs.scaleX);
  } else if (Math.round(object.attrs.scaleX) < object.attrs.scaleX) {
    newScale.x = Math.round(object.attrs.width / blockSnapSize) * (Math.round(object.attrs.scaleX) + 0.5);
  } else {
    newScale.x = Math.round(object.attrs.width / blockSnapSize) * (Math.round(object.attrs.scaleX) - 0.5);
  }

  object.attrs.scaleX = newScale.x;
  stage.batchDraw();
}

export function addTransformerClickListener(toListen) {
  //TODO fix error "object is not a funktion" if active layer != background
  stage.on('click', function (e) {
    function disableAll() {
      for (let object of toListen) {
        object.tr.visible(false);
        object.draggable(false);
      }
    }

    if (e.target == stage) {
      disableAll();
    } else {
      for (let object of toListen) {
        if (e.target == object) {
          disableAll();
          object.tr.visible(true);
          object.draggable(true);
        }
      }
    }
    stage.batchDraw();
  });
}

export function setLayerDragAndDrop(layer, enable) {
  for (let object of layer.children) {
    if (enable) {
      if (object.draggableIfEnabled != null) {
        object.draggable = object.draggableIfEnabled;
      }
      if (object.hasMenuIfEnabled != null) {
        object.hasMenu = object.hasMenuIfEnabled;
      }
    } else {
      object.draggableIfEnabled = object.draggable;
      object.draggable = false;

      object.hasMenuIfEnabled = object.hasMenu;
      object.hasMenu = false;
    }
  }
}

export function getRelativePointerPosition(node) {
  // the function will return pointer position relative to the passed node
  let transform = node.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();

  // get pointer (say mouse or touch) position
  let pos = node.getStage().getPointerPosition();

  // now we find relative point
  return transform.point(pos);
}
