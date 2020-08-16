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
let token;
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

  stage.add(grid);
  stage.add(background);
  stage.add(token);
  stage.add(freeDrawing);
  stage.add(measure)
  stage.add(menu);

  createTransformer();
  manageTransformerLayer();
  setSelectionLayer(menu);

  drawGrid(grid);

  drawBackground(background);

  drawToken(token);

  drawFree(freeDrawing);

  drawMeasure(measure);

  addSelectionListener();
}

export function manageTransformerLayer() {
  if (store.state.manu.layer == "Background") {
    addTransformerToLayer(background);
  } else if (store.state.manu.layer == "Token") {
    addTransformerToLayer(token);
  }
}

export function getTokenLayer() {
  return token;
}
