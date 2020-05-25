import Konva from "konva";
import {stage} from "../main";
import {draw as drawBackground} from "./background/main";
import {draw as drawGrid} from "./grid/main";

export function init() {
  let background = new Konva.Layer();
  let grid = new Konva.Layer();

  drawGrid(grid);
  stage.add(grid);

  drawBackground(background);
  stage.add(background);
}
