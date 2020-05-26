import Konva from "konva";
import {addSnapToGridListener, addTransformer, addTransformerClickListener} from "../layerFunctions";
import {draw} from "../background/main";
import {stage} from "../../main";

export function init() {

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

    addTransformer([image]);
    addTransformerClickListener([image]);
    addSnapToGridListener([image]);

    out.push(image)
    draw(out);
    stage.batchDraw();
  };
  imageObj.src = src;
}
