import {canvas, ctx} from "../../main";

function draw() {
  for (let i = 0; i < Math.ceil(canvas.width / 100); i++) {
    ctx.moveTo(i * 100, 0);
    ctx.lineTo(i * 100, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < Math.ceil(canvas.height / 100); i++) {
    ctx.moveTo(0, i * 100);
    ctx.lineTo(canvas.width, i * 100);
    ctx.stroke();
  }
}

function init() {
  return new Promise((resolve, rejekt) => {resolve()});
}

export let gridLayer = {
  draw: draw,
  init: init
}
