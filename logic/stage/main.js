import {init} from "./layers/layerManager";
import {enableZoom} from "./functions/zoom";
import {moveTokenByArrows} from "./functions/objectFunctions";
import {initDrawingStoreWatch} from "@/logic/tools";
import {enablePointer} from "@/logic/stage/layers/measure/pointer";
import {addSelectionRect} from "@/logic/stage/functions/transformer/selector";
import Konva from "konva";

export let stage = null;
export let stageWidth = 0;
export let stageHeight = 0;

export let store = {};

export default function (context) {
	store = context.store;
	initDrawingStoreWatch();
}

export function main(pStage, width, height) {
	Konva.hitOnDragEnabled = true;

	stage = pStage;
	stageWidth = width;
	stageHeight = height;

	init();
	enableZoom();
	resize();
	moveTokenByArrows();
	enablePointer();
	addSelectionRect();
}

function resize() {
	window.addEventListener("resize", () => {
		stage.width(window.innerWidth);
		stage.height(window.innerHeight);
		stageWidth = window.innerWidth;
		stageHeight = window.innerHeight;
		stage.draw();
	});
}
