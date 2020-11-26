import {createCircle, createRect} from "@/logic/stage/layers/drawing/drawShapes";
import {stage, store} from "@/logic/stage/main";
import {getRelativePointerPosition} from "@/logic/stage/functions/layerFunctions";
import Konva from "konva";

import {layer} from "@/logic/stage/layers/drawing/main";
import {addDrawing} from "@/plugins/backendComunication/drawing";

export default function () {
	createCircle(layer);
	createRect(layer);

	let isDrawing = false; // currently drawing a line
	let currentLine; // currently drawn line

	layer.batchDraw();

	stage.on("mousedown touchstart", (e) => {
		try {
			if (e.evt.touches[0].touchType === "direct")
				return;

		} catch (e) {
		}

		isDrawing = true;

		// Create new line object
		let pos = getRelativePointerPosition(stage);

		currentLine = new Konva.Line({
			stroke: store.state.manu.freeDrawing.color,
			strokeWidth: (store.state.manu.erase ? store.state.manu.freeDrawing.strokeWidth * 10 : store.state.manu.freeDrawing.strokeWidth),
			points: [ pos.x, pos.y ],
			globalCompositeOperation: "source-over",
			listening: false
		});

		layer.add(currentLine);

		layer.batchDraw();
	});

	stage.on("mousemove touchmove", () => {
		layer.batchDraw();

		if (!isDrawing)
			return;

		// If drawing, add new point to the current line object
		let pos = getRelativePointerPosition(stage);
		let newPoints = currentLine.points().concat([ pos.x, pos.y ]);

		currentLine.points(newPoints);

		layer.batchDraw();
	});

	stage.on("mouseup touchend", () => {
		// End drawing
		isDrawing = false;
		addDrawing({
			stroke: currentLine.stroke(),
			strokeWidth: currentLine.strokeWidth(),
			points: currentLine.points(),
			type: "Line"
		});
		currentLine.points([]);
		layer.batchDraw();
	});

	stage.on("touchstart", (e) => {
		try {
			if (e.evt.touches[0].touchType === "direct")
				stage.draggable(true);

		} catch (e) {
		}
	});

	stage.on("touchend", () => {
		stage.draggable(false);
	});
}

export function addDrawingObject(object) {
	if (object.type === "Line") {
		let line = new Konva.Line({
			...object,
			globalCompositeOperation: "source-over",
			listening: false
		});
		line.objectID = object._id;

		layer.add(line);
		layer.batchDraw();
	} else if (object.type === "Circle") {
		let circle = new Konva.Circle({
			...object,
			listening: false
		});

		circle.objectID = object._id;

		layer.add(circle);
		layer.batchDraw();
	}
}

export function removeDrawingObject(objectID) {
	try {
		layer.children.filter(object => object.objectID === objectID)[0].destroy();
		layer.batchDraw();
	} catch (e) {
	}
}
