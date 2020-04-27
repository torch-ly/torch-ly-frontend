import {backgroundLayer} from "./background/main";
import {gridLayer} from "./grid/main";
import {canvas as screen, ctx} from "../main";

let layers = [backgroundLayer]

export function draw() {
  //ctx.clearRect(0, 0, screen.width, screen.height);
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
