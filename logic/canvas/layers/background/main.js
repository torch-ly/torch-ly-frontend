import {images} from "./images";
import {onAllLoaded} from "../../images";
import {ctx} from "../../main";

function draw() {
  for (let image of images) {
    ctx.drawImage(image.img,image.x,image.y);
  }
}

function init() {
  let out = images.map((image) => image.img);
  console.log("1" ,out)
  return onAllLoaded(out);
}

export let backgroundLayer = {
  draw: draw,
  init: init
}
