import Konva from "konva";
import {stage} from "../../main";
import {blockSnapSize} from "../grid/main";

let out = [];

export function init() {

  //create Rects
  addObjects();

  //adds invisible Transformer to all objekts in out
  addTransformer(out);

  //adds clicklistener to enable transformer
  addTransformerClickListener(out);

  //if snapToGrid == true -> object will snap to grid
  addSnapToGrid(out);

  return out;
}

function addObjects() {
  let rect1 = new Konva.Rect({
    x: 50,
    y: 20,
    width: 120,
    height: 600,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
    draggable: false,
    snapToGrid: true,
    tr: null
  });
  rect1.snapToGrid = true;

  let rect2 = new Konva.Rect({
    x: 80,
    y: 20,
    width: 120,
    height: 600,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    draggable: false,
    snapToGrid: true,
    tr: null
  });

  rect2.snapToGrid = true;

  out.push(rect1, rect2);
}

function addTransformer(toAdd) {
  for (let object of toAdd) {
    let tr = new Konva.Transformer({
      nodes: [object],
      visible: false,
      rotationSnaps: [0, 90, 180, 270]
    });
    object.tr = tr;
  }
}

function addTransformerClickListener(toListen) {
  stage.on('click', function (e) {
    //TODO solve double click problem
    // tr.forceUpdate() ??
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
          object.tr.visible(true);
          object.draggable(true);
        }
      }
    }
  });
}

function addSnapToGrid(objects) {
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
