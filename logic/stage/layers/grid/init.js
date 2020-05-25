import Konva from "konva";
import {blockSnapSize} from "./main";

export function init() {
  let out = [];
  let width = window.innerWidth;
  let height = window.innerHeight;


  for (let i = 0; i < width / blockSnapSize; i++) {
    out.push(new Konva.Line({
      points: [Math.round(i * blockSnapSize) + 0.5, 0, Math.round(i * blockSnapSize) + 0.5, height],
      stroke: '#ddd',
      strokeWidth: 1,
    }));
  }

  out.push(new Konva.Line({points: [0, 0, 10, 10]}));
  for (let j = 0; j < height / blockSnapSize; j++) {
    out.push(new Konva.Line({
      points: [0, Math.round(j * blockSnapSize), width, Math.round(j * blockSnapSize)],
      stroke: '#ddd',
      strokeWidth: 0.5,
    }));
  }

  return out;
}
