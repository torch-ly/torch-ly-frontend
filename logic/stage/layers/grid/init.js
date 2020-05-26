import Konva from "konva";
import {blockSnapSize} from "./main";
import {stageHeight, stageWidth} from "../../main";

export function init() {
  let out = [];
  let width = Math.floor((stageWidth * 2) / blockSnapSize) * blockSnapSize + 1;
  let height = Math.floor((stageHeight * 2) / blockSnapSize) * blockSnapSize + 1;


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
      strokeWidth: 1,
    }));
  }

  return out;
}
