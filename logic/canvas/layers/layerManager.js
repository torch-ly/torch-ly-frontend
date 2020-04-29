import {backgroundLayer} from "./background/main";
import {gridLayer} from "./grid/main";

let layers = [backgroundLayer, gridLayer]

export function draw() {
  for (let layer of layers) {
    layer.draw();
  }
}

export function init() {
  let promise = Promise.all(layers.map((layer) => layer.init()));
  promise.then(() => {
    console.log("init Successful")
    draw();
  })
}
