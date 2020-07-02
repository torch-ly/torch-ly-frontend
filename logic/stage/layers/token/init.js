import Konva from "konva";
import {addSnapToGridListener} from "../layerFunctions";
import {drawingObjects} from "../../main";
import {blockSnapSize} from "../grid/main";
import {draw} from "./main";
import {addTransformerClickListener} from "../transformer";

let out = [];

export function init() {

  let tokens = drawingObjects.TokenLayer;

  for (let token of tokens) {
    loadImage(token);
  }
}

function loadImage(token) {
  let imageObj = new Image(token.size * blockSnapSize, token.size * blockSnapSize);
  imageObj.onload = function () {
    let image = new Konva.Image({
      x: token.pos.x,
      y: token.pos.y,
      image: imageObj,
      rotation: token.rotation
    });
    image.snapToGrid = token.snapToGrid;

    addTransformerClickListener(image);

    addSnapToGridListener([image]);

    out.push(image)
    draw(out);
  };
  imageObj.src = token.src;
}
