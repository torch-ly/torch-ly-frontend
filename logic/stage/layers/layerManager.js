import Konva from "konva";
import {stage} from "../main";
import {draw} from "./background/main";

export function init() {
  let background = new Konva.Layer();

  let layers = [
    background
  ]

  for (let layer of layers) {
    draw(layer);
    stage.add(layer);
  }
}
