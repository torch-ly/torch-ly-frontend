import Konva from "konva";
import {stage, store} from "../main";
import {setLayer as drawBackground} from "./background/main";
import {draw as drawGrid} from "./grid/main";
import {setDrawLayer} from "./mouseTools/main";
import {setLayer as drawToken} from "./token/main";
import {draw as drawMeasure} from "./measure/measure";
import {setFogOfWarLayer} from "./fogofwar/main";
import {addTransformerToLayer, createTransformer} from "./transformer";

let grid;
let background;
let token;
let freeDrawing;
let measure;
let fogofwar;

export function init() {
  grid = new Konva.Layer();
  background = new Konva.Layer();
  token = new Konva.Layer();
  freeDrawing = new Konva.Layer();
  fogofwar = new Konva.Layer();
  measure = new Konva.Layer();

  stage.add(grid);
  stage.add(background);
  stage.add(token);
  stage.add(freeDrawing);
  stage.add(fogofwar);
  stage.add(measure)

  createTransformer();
  manageTransformerLayer();

  drawGrid(grid);

  drawBackground(background);

  drawToken(token);

  setDrawLayer(freeDrawing);

  setFogOfWarLayer(fogofwar);

  drawMeasure(measure);
}

export function manageTransformerLayer() {
  if (store.state.manu.layer == "Background") {
    addTransformerToLayer(background);
  } else if (store.state.manu.layer == "Token") {
    addTransformerToLayer(token);
  }
}
