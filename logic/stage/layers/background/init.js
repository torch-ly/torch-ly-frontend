import Konva from "konva";
import {stage} from "../../main";

export function init() {
  let out = [];

  let rect1 = new Konva.Rect({
    x: 50,
    y: 20,
    width: 100,
    height: 500,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
    draggable: true
  });
  let rect2 = new Konva.Rect({
    x: 80,
    y: 20,
    width: 100,
    height: 500,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    draggable: false,
    tr: null
  });

  out.push(rect1, rect2);

  for (let object of out) {
    let tr = new Konva.Transformer({
      nodes: [object],
      visible: false,
      rotationSnaps: [0, 90, 180, 270]
    });
    object.tr = tr;
  }

  //TODO snap to grid: https://codepen.io/pierrebleroux/pen/gGpvxJ?editors=1010

  stage.on('click', function (e) {
    //TODO solve double click problem
    // tr.forceUpdate() ??
    function disableAll() {
      for (let object of out) {
        object.tr.visible(false);
        object.draggable(false);
      }
    }

    if (e.target == stage) {
      disableAll();
    } else {
      for (let object of out) {
        if (e.target == object) {
          object.tr.visible(true);
          object.draggable(true);
        }
      }
    }
  })

  return out;
}
