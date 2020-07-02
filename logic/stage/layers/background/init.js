import Konva from "konva";
import {addSnapToGridListener} from "../layerFunctions";
import {draw} from "./main";
import {drawingObjects} from "../../main";
import {addTransformerClickListener} from "../transformer";

let out = [];

export function init() {

  let drawings = drawingObjects.BackgroundLayer;

  for (let drawing of drawings) {
    if (drawing.type == 'rect') {
      loadRect(drawing);
    } else if (drawing.type == 'img') {
      loadImage(drawing);
    }
  }

  //create Rects
  //addObjects();
  loadImage("https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340");

  for (let object of out) {
    addTransformerClickListener(object);
  }

  //if snapToGrid == true -> object will snap to grid
  addSnapToGridListener(out);

  draw(out);
  //return out;
}

function loadImage(drawing) {
  let imageObj = new Image();
  imageObj.onload = function () {
    let image = new Konva.Image({
      x: drawing.pos.x,
      y: drawing.pos.y,
      width: drawing.pos.width,
      height: drawing.pos.height,
      image: imageObj
    });
    image.snapToGrid = drawing.snapToGrid;

    addSnapToGridListener([image]);
    addTransformerClickListener(image);

    out.push(image)
    draw(out);
  };
  imageObj.src = drawing.src;
}

function loadRect(drawing) {
  let rect = new Konva.Rect({
    x: drawing.pos.x,
    y: drawing.pos.y,
    width: drawing.pos.width,
    height: drawing.pos.height,
    fill: drawing.color,
    draggable: drawing.draggable,
    rotation: drawing.rotation
  });

  rect.snapToGrid = drawing.snapToGrid;

  out.push(rect);
}
