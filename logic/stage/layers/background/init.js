import Konva from "konva";
import {addSnapToGridListener, snapToGrid} from "../layerFunctions";
import {draw, updateDraw} from "./main";
import {drawingObjects} from "../../main";
import {addTransformerClickListener} from "../transformer";
import {store} from "../../main";

let out = new Map();

export let backgroundObject = [];

export function init() {

  for (let drawing of drawings) {
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
  for (let object of out) {
    if (object instanceof Rect) {
      newJSON.push({
        "pos": {
          "x": object.x(),
          "y": object.y(),
          "width": object.width(),
          "height": object.height()
        },
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
        "snapToGrid": object.snapToGrid,
        "type": "img",
        "src": object.image().src,
        "rotation": 100
      })
    }
  }

  backgroundObject.BackgroundLayer = newJSON;
}

function loadObject(object, snapToGrid){
  let hash;
  do{
    hash = Math.floor(Math.random()*10000);
  }while(out[hash] !== undefined);

  out.set(hash, object);

  let updatesidebar = (e) => {
    setTimeout(() => {
      store.commit("selectedBackgroundObject/setDisplay", {object: object, hash: hash});
    }, 10);
  };

  object.on("click", updatesidebar)
  object.on("mouseup", updatesidebar)

  object.snapToGrid = snapToGrid;

  addTransformerClickListener(object);
  addSnapToGridListener([object]);

  draw(object);
}

function loadImage(drawing) {
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

function loadRect(drawing) {
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
  backgroundObject = JSON.parse(data);
  init();
}

