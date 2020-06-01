import Konva from "konva";
import {addSnapToGridListener} from "../layerFunctions";
import {stage} from "../../main";
import {blockSnapSize} from "../grid/main";
import {draw} from "./main";
import {addTransformerClickListener} from "../transformer";

let out = [];

export function init() {
  let tokens = [{
    size: 1,
    imgSrc: "https://5e.tools/img/MM/Aarakocra.png?v=1.105.3"
  }]

  for (let token of tokens) {
    loadImage(token.imgSrc, {x: token.size * blockSnapSize, y: token.size * blockSnapSize});
  }
}

function loadImage(src, imageSize) {
  let imageObj = new Image(imageSize.x, imageSize.y);
  imageObj.onload = function () {
    let image = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObj
    });
    image.snapToGrid = true;
    image.hasMenu = true;
    image.name('draggable');
    /*
        addOldTransformer([image]);
        addTransformerClickListener([image]);*/
    addTransformerClickListener(image);

    addSnapToGridListener([image]);

    out.push(image)
    draw(out);
    stage.batchDraw();
  };
  imageObj.src = src;
}
