import Konva from "konva";
import {stage} from "../main";
import {draw as drawGrid} from "./grid/main";
import {createRect} from "./freeDrawing/selectionRect";

export function init() {
  let grid = new Konva.Layer();
  let background = new Konva.Layer();
  let token = new Konva.Layer();
  let freeDrawing = new Konva.Layer();
  let menu = new Konva.Layer();

  //if change of oder happens -> correct setActiveLayer in overlay.vue

  drawGrid(grid);
  stage.add(grid);

  /*drawBackground(background);
  stage.add(background);

  drawToken(token);
  stage.add(token);

  drawFree(freeDrawing);
  stage.add(freeDrawing);

  drawMenu(menu);
  stage.add(menu);*/

  createRect(freeDrawing, true);
  stage.add(freeDrawing);
}
