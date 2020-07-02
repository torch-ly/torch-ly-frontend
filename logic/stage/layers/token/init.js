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

function updateJSON() {
  let newJSON = [];
  for (let object of out) {
    newJSON.push({
      "size": object.width / blockSnapSize,
      "src": object.image().src,
      "pos": {
        "x": object.x(),
        "y": object.y()
      },
      "rotation": object.rotation(),
      "snapToGrid": object.snapToGrid,
      "controllingPlayer": null
    })
  }

  drawingObjects.TokenLayer = newJSON;
}

/*let tokens = out;
    console.log(tokens);
    //tokens = ["Hallo", "ich", "bin", "ein", "Test"];
    let list = document.getElementById("tokenList");
    list.innerHTML = '';
    for (let token of tokens) {
      let tag = document.createElement("li");
      let img = document.createElement("IMG");
      img.setAttribute("src", token.attrs.image.src);
      img.setAttribute("width", "100");
      img.setAttribute("height", "100");

      tag.appendChild(img);
      list.appendChild(tag);
    }*/
