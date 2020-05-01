import {images} from "./images";
import {onAllLoaded} from "../../images";
import {ctx} from "../../main";
import {absPos} from "../../moveAndZoom";

function draw(evt) {
  for (let image of images) {
    if (!image.selected) {
      ctx.drawImage(image.img, image.x, image.y);
    } else {
      image.selected = false;
      ctx.drawImage(image.img, evt.clientX, evt.clientY)
    }
  }
}

function init() {
  let out = images.map((image) => image.img);
  return onAllLoaded(out);
}

function mouseMove() {
  let topPicture = null;
  for (let image of images) {
    if (absPos.x > image.x && absPos.y > image.y
      && absPos.x < image.x + image.img.width && absPos.y < image.y + image.img.height) {
      topPicture = image;
    }
  }
  return topPicture;
}

export let backgroundLayer = {
  draw: draw,
  init: init,
  mouseMove: mouseMove
}
