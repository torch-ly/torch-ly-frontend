import Konva from "konva";
import {stage} from "../main";
import {setLayer as drawBackground} from "./background/main";
import {draw as drawGrid} from "./grid/main";
import {draw as drawMenu} from "./menu/main";
import {draw as drawFree} from "./freeDrawing/main";

export function init() {
  let background = new Konva.Layer();
  let grid = new Konva.Layer();
  let menu = new Konva.Layer();
  let freeDrawing = new Konva.Layer();

  drawGrid(grid);
  stage.add(grid);

  drawBackground(background);
  stage.add(background);

  drawMenu(menu);
  stage.add(menu);

  drawFree(freeDrawing);
  stage.add(freeDrawing);
}
