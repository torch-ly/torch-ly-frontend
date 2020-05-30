import Konva from "konva";
import {addSnapToGridListener, addTransformer, addTransformerClickListener} from "../layerFunctions";
import {draw} from "./main";
import {stage} from "../../main";

let out = [];

export function init() {

  //create Rects
  addObjects();
  loadImage("https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340");

  //adds invisible Transformer to all objekts in out
  addTransformer(out);

  //adds clicklistener to enable transformer
  addTransformerClickListener(out);

  //if snapToGrid == true -> object will snap to grid
  addSnapToGridListener(out);

  draw(out);
  //return out;
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
    tr: null
  });

  rect1.snapToGrid = true;
  rect1.hasMenu = true;
  rect1.name('draggable');

  let rect2 = new Konva.Rect({
    x: 80,
    y: 20,
    width: 120,
    height: 600,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    draggable: false,
    tr: null
  });
  rect2.snapToGrid = true;
  rect2.hasMenu = true;
  rect2.name('draggable');

  out.push(rect1, rect2);
}

function loadImage(src) {
  let imageObj = new Image();
  imageObj.onload = function () {
    let image = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObj
    });
    image.snapToGrid = true;
    image.hasMenu = true;
    image.name('draggable');

    addTransformer([image]);
    addTransformerClickListener([image]);
    addSnapToGridListener([image]);

    out.push(image)
    draw(out);
    stage.batchDraw();
  };
  imageObj.src = src;
}
