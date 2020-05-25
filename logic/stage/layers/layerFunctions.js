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

export function snapToGrid(object) {
  object.position({
    x: Math.round(object.x() / blockSnapSize) * blockSnapSize,
    y: Math.round(object.y() / blockSnapSize) * blockSnapSize
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

export function addTransformerClickListener(toListen) {
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

export function addImageToLayer(layer, src) {
  let imageObject = new Image();
  imageObject.onload = function () {
    let yoda = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObject
    });

    layer.add(yoda);
    layer.batchDraw();
  };
  imageObject.src = src;
}
