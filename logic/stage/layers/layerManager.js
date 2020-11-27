import Konva from "konva";
import {stage, store} from "../main";
import {setLayer as drawBackground} from "./background/main";
import {draw as drawGrid} from "./grid/main";
import {setDrawLayer} from "./drawing/main";
import {setLayer as drawToken} from "./token/main";
import {setLayer as drawMeasure} from "./measure/main";
import {setFogOfWarLayer} from "./fogofwar/main";
import {addTransformerToLayer, createTransformer} from "../functions/transformer/transformer";

let background;
let grid;
let token;
let freeDrawing;
let measure;
let fogofwar;

export function init() {
	background = new Konva.Layer();
	grid = new Konva.Layer();
	token = new Konva.Layer();
	freeDrawing = new Konva.Layer();
	fogofwar = new Konva.Layer();
	measure = new Konva.Layer();

	stage.add(background);
	stage.add(grid);
	stage.add(token);
	stage.add(freeDrawing);
	stage.add(fogofwar);
	stage.add(measure);

	createTransformer();
	manageTransformerLayer();

	drawBackground(background);

	drawGrid(grid);

	drawToken(token);

	setDrawLayer(freeDrawing);

	setFogOfWarLayer(fogofwar);

	drawMeasure(measure);
}

export function manageTransformerLayer() {
	if (store.state.manu.layer === "Background")
		addTransformerToLayer(background);
	else if (store.state.manu.layer === "Token")
		addTransformerToLayer(token);

}
