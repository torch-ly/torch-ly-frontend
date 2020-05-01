import {images} from "../background/images";
import {onAllLoaded} from "../../images";
import {ctx} from "../../main";

function draw() {
  for (let image of images) {
    ctx.drawImage(image.img,image.x,image.y);
  }
}

function init() {
  let out = images.map((image) => image.img);
  return onAllLoaded(out);
}

function mouseMove() {
  return null;
}

export let backgroundLayer = {
  draw: draw,
  init: init,
  mouseMove: mouseMove
}
