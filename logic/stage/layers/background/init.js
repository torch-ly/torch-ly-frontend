import Konva, {Image, Rect} from "konva";
import {addSnapToGridListener} from "../layerFunctions";
import {draw} from "./main";
import {drawingObjects, store} from "../../main";
import {addTransformerClickListener} from "../transformer";

let out = [];

export function init() {

  let drawings = store.state.background.layer; //TODO remove drawing.json and variable

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

export function updateJSON() {
  let newJSON = [];
  for (let object of out) {
    if (object instanceof Rect) {
      newJSON.push({
        "pos": {
          "x": object.x(),
          "y": object.y(),
          "width": object.width(),
          "height": object.height()
        },
        "draggable": object.draggable(),
        "snapToGrid": object.snapToGrid,
        "type": "rect",
        "color": object.fill(),
        "rotation": object.rotation()
      });
    } else if (object instanceof Image) {
      newJSON.push({
        "pos": {
          "x": object.x(),
          "y": object.y(),
          "width": object.width(),
          "height": object.height()
        },
        "draggable": object.draggable(),
        "snapToGrid": object.snapToGrid,
        "type": "img",
        "src": object.image().src,
        "rotation": 100
      })
    }
  }

  drawingObjects.BackgroundLayer = newJSON;
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
