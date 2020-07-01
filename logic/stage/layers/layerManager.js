import Konva from "konva";
import {stage, store} from "../main";
import {setLayer as drawBackground} from "./background/main";
import {draw as drawGrid} from "./grid/main";
import {draw as drawFree} from "./freeDrawing/main";
import {setLayer as drawToken} from "./token/main";
import {draw as drawMeasure} from "./measure/main";
import {addSelectionListener, addTransformerToLayer, createTransformer, setSelectionLayer} from "./transformer";

let grid;
let background;
export let token;
let freeDrawing;
let measure;
let menu;

export function init() {
  grid = new Konva.Layer();
  background = new Konva.Layer();
  token = new Konva.Layer();
  freeDrawing = new Konva.Layer();
  measure = new Konva.Layer();
  menu = new Konva.Layer();

  createTransformer();
  manageTransformerLayer();
  setSelectionLayer(menu);

  drawGrid(grid);
  stage.add(grid);

  drawBackground(background);
  stage.add(background);

  drawToken(token);
  stage.add(token);

  drawFree(freeDrawing);
  stage.add(freeDrawing);

  drawMeasure(measure);
  stage.add(measure);

  addSelectionListener();
  stage.add(menu);
}

function manageTransformerLayer() {
  if (store.state.manu.layer == "Background") {
    addTransformerToLayer(background);
  } else if (store.state.manu.layer == "Token") {
    addTransformerToLayer(token);
  }
}
