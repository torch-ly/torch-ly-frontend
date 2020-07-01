import Konva from "konva";
import {addSnapToGridListener} from "../layerFunctions";
import {draw} from "./main";
import {stage} from "../../main";
import {addTransformerClickListener} from "../transformer";

let out = [];

export function init() {

  //create Rects
  addObjects();
  loadImage("https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340");

  for (let object of out) {
    addTransformerClickListener(object);
  }

  //if snapToGrid == true -> object will snap to grid
  addSnapToGridListener(out);

  draw(out);
  //return out;
}

function addObjects() {
  let rect1 = new Konva.Rect({
    x: 100,
    y: 250,
    width: 120,
    height: 600,
    fill: 'green',
    draggable: false,
    tr: null
  });

  rect1.snapToGrid = true;
  rect1.hasMenu = true;

  out.push(rect1);
}

function loadImage(src) {
  let imageObj = new Image();
  imageObj.onload = function () {
    let image = new Konva.Image({
      x: 700,
      y: 200,
      width: 300,
      height: 400,
      image: imageObj
    });
    image.snapToGrid = true;
    image.hasMenu = true;

    addSnapToGridListener([image]);
    addTransformerClickListener(image);

    out.push(image)
    draw(out);
    stage.batchDraw();
  };
  imageObj.src = src;
}
