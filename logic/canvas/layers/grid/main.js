import {canvas, ctx} from "../../main";

function draw() {
  let horizontalMin = -1000;
  let horizontalMax = canvas.width + 1000;
  let verticalMin = -1000;
  let verticalMax = canvas.height + 1000;
  let pixelPerSquare = 100;

  for (let i = horizontalMin; i < horizontalMax; i += pixelPerSquare) {
    ctx.beginPath();
    ctx.moveTo(i, verticalMin);
    ctx.lineTo(i, verticalMax);
    ctx.stroke();
  }
  for (let i = verticalMin; i < verticalMax; i += pixelPerSquare) {
    ctx.beginPath();
    ctx.moveTo(horizontalMin, i);
    ctx.lineTo(horizontalMax, i);
    ctx.stroke();
  }
}

function init() {
  return new Promise((resolve, rejekt) => {resolve()});
}

function mouseMove() {
  return null;
}

export let gridLayer = {
  draw: draw,
  init: init,
  mouseMove: mouseMove
}
