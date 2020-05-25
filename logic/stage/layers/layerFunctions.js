import {blockSnapSize} from "./grid/main";
import {stage} from "../main";
import Konva from "konva";

export function addSnapToGrid(objects) {
  for (let object of objects) {
    object.on('dragend', (e) => {
      console.log("1", object, object.snapToGrid)
      if (object.snapToGrid) {
        console.log("2")
        object.position({
          x: Math.round(object.x() / blockSnapSize) * blockSnapSize,
          y: Math.round(object.y() / blockSnapSize) * blockSnapSize
        });
        stage.batchDraw();
      }
    });
  }
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
