import {backgroundLayer} from "./background/main";
import {gridLayer} from "./grid/main";

let layers = [backgroundLayer, gridLayer]
let event = null;

export function draw() {
  layers.map((item) => item.draw(event));
}

export function init() {
  let promise = Promise.all(layers.map((layer) => layer.init()));
  promise.then(() => {
    console.log("init Successful")
    draw();
  })
}

export function mouseMove(evt) {
  // check if any mouseMove function returns true
  /*if (layers.map((item) => item.mouseMove(coordinates)).some((item) => item)) {
    draw();
  }*/
  event = evt;
  if (evt.button == 0) {
    let topPicture = null;

    for (let layer of layers) {
      if (layer.mouseMove() != null) {
        topPicture = layer.mouseMove();
      }
    }
    if (topPicture != null) {
      topPicture.selected = true;
    }
  } else if (evt.button == 2) {
    //TODO relese picture
  }
}
