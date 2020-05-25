import Konva from "konva";
import {addSnapToGrid, addTransformer, addTransformerClickListener} from "../layerFunctions";

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
    draggable: false
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
    draggable: false
  });

  rect2.snapToGrid = true;

  out.push(rect1, rect2);
}
