import Konva, {Image as KonvaImage, Rect} from "konva";
import {addSnapToGridListener} from "../layerFunctions";
import {clearLayer, draw} from "./main";
import {addTransformerClickListener} from "../transformer";
import {setBackgroundLayer} from "../../../../plugins/backendComunication";
import {layer as backgroundLayer} from "@/logic/stage/layers/background/main";

let backgroundObjects = [];
export let backgroundChanged = false;

export function init() {

  clearLayer();

  for (let drawing of backgroundObjects) {
    if (drawing.type === 'rect') {
      loadRect(drawing);
    } else if (drawing.type === 'img') {
      loadImage(drawing);
    }
  }
}

export function updateJSON() {
  let oldBackgroundObjects = {
    ...backgroundObjects
  };

  backgroundObjects = [];

  for (let object of backgroundLayer.children) {

    let rotation = object.rotation();
    object.rotation(0);

    if (object instanceof Rect) {
      backgroundObjects.push({
        "pos": {
          "x": object.x(),
          "y": object.y(),
          "width": object.width() * object.getTransform().getMatrix()[0],
          "height": object.height() * object.getTransform().getMatrix()[3]
        },
        "snapToGrid": object.snapToGrid,
        "type": "rect",
        "color": object.fill(),
        "rotation": rotation
      });

    } else if (object instanceof KonvaImage) {

      backgroundObjects.push({
        "pos": {
          "x": object.x(),
          "y": object.y(),
          "width": object.width() * object.getTransform().getMatrix()[0],
          "height": object.height() * object.getTransform().getMatrix()[3]
        },
        "snapToGrid": object.snapToGrid,
        "type": "img",
        "src": object.image().src,
        "rotation": rotation
      });

    }
  }
  if (!backgroundChanged)
    backgroundChanged = (oldBackgroundObjects != backgroundObjects);
}

export function loadObject(object, snapToGrid) {
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
  backgroundChanged = false;
  clearLayer();
  backgroundObjects = data;
  init();
}

export function saveBackgroundLayer() {
  updateJSON();
  setBackgroundLayer(backgroundObjects);
}
