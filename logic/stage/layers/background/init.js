import Konva, {Image as KonvaImage, Rect} from "konva";
import {addSnapToGridListener, snapToGrid} from "../layerFunctions";
import {clearLayer, draw, updateDraw} from "./main";
import {addTransformerClickListener} from "../transformer";
import {setBackgroundLayer} from "../../../../plugins/backendComunication";
import {layer as backgroundLayer} from "@/logic/stage/layers/background/main";

let out = new Map();

let backgroundObject = [];

export function init() {

  clearLayer();

  for (let drawing of backgroundObject) {
    if (drawing.type === 'rect') {
      loadRect(drawing);
    } else if (drawing.type === 'img') {
      loadImage(drawing);
    }
  }
}

export function updateBackgroundObject(hash, data){
  let object = out.get(hash);
  if(object === undefined)
    return
  object.x(data.x);
  object.y(data.y);
  object.snapToGrid = data.snapToGrid;
  object.rotation(data.rotation);
  if(data.snapToGrid)
    snapToGrid(object);
  updateDraw();
  object.fire('click');
}

export function updateJSON() {
  let newJSON = [];

  for (let object of backgroundLayer.children) {

    if (object instanceof Rect) {
      newJSON.push({
        "pos": {
          "x": object.x(),
          "y": object.y(),
          "width": object.width() * object.getTransform().getMatrix()[0],
          "height": object.height() * object.getTransform().getMatrix()[3]
        },
        "snapToGrid": object.snapToGrid,
        "type": "rect",
        "color": object.fill(),
        "rotation": object.rotation()
      });

    } else if (object instanceof KonvaImage) {

      newJSON.push({
        "pos": {
          "x": object.x(),
          "y": object.y(),
          "width": object.width() * object.getTransform().getMatrix()[0],
          "height": object.height() * object.getTransform().getMatrix()[3]
        },
        "snapToGrid": object.snapToGrid,
        "type": "img",
        "src": object.image().src,
        "rotation": object.rotation()
      });

    }
  }
  backgroundObject = newJSON;
}

export function loadObject(object, snapToGrid) {
  let hash;

  do {
    hash = Math.floor(Math.random() * 10000);
  } while (out[hash] !== undefined);

  out.set(hash, object);

  object.snapToGrid = snapToGrid;

  addTransformerClickListener(object);
  addSnapToGridListener([object]);

  object.removeElement = () => {
    object.destroy();
  }

  draw(object);
}

export function loadImage(drawing) {
  let imageObj = new Image(drawing.pos.width, drawing.pos.height);
  imageObj.onload = function () {
    let image = new Konva.Image({
      x: drawing.pos.x,
      y: drawing.pos.y,
      width: drawing.pos.width,
      height: drawing.pos.height,
      image: imageObj,
      rotation: drawing.rotation
    });

    loadObject(image, drawing.snapToGrid);
  };
  imageObj.src = drawing.src;
}

export function loadRect(drawing) {
  let rect = new Konva.Rect({
    x: drawing.pos.x,
    y: drawing.pos.y,
    width: drawing.pos.width,
    height: drawing.pos.height,
    fill: drawing.color,
    rotation: drawing.rotation
  });

  loadObject(rect, drawing.snapToGrid);
}

export function setBackgroundObjects(data) {
  clearLayer();
  backgroundObject = data;
  init();
}

export function saveBackgroundLayer() {
  updateJSON();
  setBackgroundLayer(backgroundObject);
}
