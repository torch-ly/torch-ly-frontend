import {stage, store} from "@/logic/stage/main";
import {getRelativePointerPosition} from "@/logic/stage/functions/layerFunctions";
import Konva from "konva";

import {layer} from "@/logic/stage/layers/drawing/main";
import {removeDrawing} from "@/plugins/backendComunication/drawing";

let eraserRect;

export default function () {
	let isDrawing = false; // currently drawing a line

	stage.batchDraw();

	eraserRect = new Konva.Rect({
		visible: true,
		width: store.state.manu.freeDrawing.strokeWidth * 10,
		height: store.state.manu.freeDrawing.strokeWidth * 10,
		stroke: "black"
	});

	layer.add(eraserRect);

	stage.on("mousedown touchstart", () => {
		destroyIntersectingObjects();
		// Start drawing
		isDrawing = true;

		let pos = getRelativePointerPosition(stage);
		eraserRect.position({
			x: pos.x - eraserRect.width() / 2,
			y: pos.y - eraserRect.height() / 2
		});

		destroyIntersectingObjects();

		layer.batchDraw();
	});

	stage.on("mousemove touchmove", () => {
		let pos = getRelativePointerPosition(stage);
		eraserRect.position({
			x: pos.x - eraserRect.width() / 2,
			y: pos.y - eraserRect.height() / 2
		});

		layer.batchDraw();

		if (!isDrawing)
			return;

		destroyIntersectingObjects();

	});

	stage.on("mouseup touchend", () => {
		// End drawing
		isDrawing = false;
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

function destroyIntersectingObjects() {

	for (let object of layer.children)
		if (object instanceof Konva.Line)
			destroyIntersectingLines(object);
		else if (object instanceof Konva.Circle)
			destroyIntersectingCircle(object);


}

function destroyIntersectingLines(object) {
	let points = object.points();
	for (let i = 0; i < points.length - 2; i += 2)
		if (lineCrossesEraser([ {x: points[i], y: points[i + 1]}, {x: points[i + 2], y: points[i + 3]} ]))
			removeDrawing(object.objectID);


}

function destroyIntersectingCircle(object) {
	let pos = getRelativePointerPosition(stage);

	let distance = Math.sqrt(Math.pow(object.x() - pos.x, 2) + Math.pow(object.y() - pos.y, 2));

	if (Math.abs(distance - object.radius()) < (eraserRect.width() * 3 / 4))
		removeDrawing(object.objectID);

}

export function removeEraser() {
	try {
		eraserRect.destroy();
		layer.batchDraw();
	} catch (e) {
	}
}

function lineCrossesEraser(points) {
	let rectTop = eraserRect.y();
	let rectBottom = eraserRect.y() + eraserRect.height();
	let rectLeft = eraserRect.x();
	let rectRight = eraserRect.x() + eraserRect.width();

	let square = [
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ]
	];

	for (let i = 0; i < 2; i++) {
		if (points[i].y <= rectTop)
			square[i][0] = 1;
		else if (points[i].y >= rectBottom)
			square[i][1] = 1;


		if (points[i].x <= rectLeft)
			square[i][3] = 1;
		else if (points[i].x >= rectRight)
			square[i][2] = 1;

	}

	if (JSON.stringify(square[0]) === JSON.stringify(square[1]))
		if (JSON.stringify(square[0]) === JSON.stringify([ 0, 0, 0, 0 ]))
			return true;
		else
			return false;


	for (let i = 0; i < 4; i++)
		if (square[0][i] === square[1][i] && square[0][i] === 1)
			return false;


	return true;
}
