import {blockSnapSize} from "@/logic/stage/layers/grid/main";
import {store} from "@/logic/stage/main";
import {layer} from "@/logic/stage/layers/measure/main";
import {addDrawing} from "~/plugins/backendComunication/drawing";
import {addSpanningPoints, circle1, circle2, disableSpanningPoints} from "~/logic/stage/layers/measure/spanningPoints";
import Konva from "konva";

let measureTriangle;

export function startConeMeasure() {

	measureTriangle = new Konva.Line({
		points: [],
		stroke: "#4a5568",
		fill: "rgba(74,85,104,0.17)",
		strokeWidth: 4,
		closed: true,
		listening: false
	});

	addSpanningPoints(measureTriangle, updateMeasure);
}


function updateMeasure() {
	if (!circle1 || !circle2)
		return;

	let vectorX = circle2.x() - circle1.x();
	let vectorY = circle2.y() - circle1.y();

	let rotatedVector = {
		x: vectorY,
		y: -1 * vectorX
	};

	let x1 = circle2.x() + 0.5 * rotatedVector.x;
	let y1 = circle2.y() + 0.5 * rotatedVector.y;
	let x2 = circle2.x() + (-0.5 * rotatedVector.x);
	let y2 = circle2.y() + (-0.5 * rotatedVector.y);

	measureTriangle.points([ x1, y1, circle1.x(), circle1.y(), x2, y2 , x1, y1]);

	let length = Math.sqrt(Math.pow(circle1.x() - circle2.x(), 2) + Math.pow(circle1.y() - circle2.y(), 2));

	store.commit("manu/setMeasureLength", Math.round(length / blockSnapSize));

	layer.batchDraw();
}

export function saveAsDrawing() {
	if (measureTriangle != null)
		addDrawing({
			points: measureTriangle.points(),
			stroke: "black",
			strokeWidth: 4,
			type: "Line"
		});

}

export function disableConeMeasure() {

	disableSpanningPoints();

	try {
		measureTriangle.destroy();
	} catch (e) {
	}

	measureTriangle = null;

	layer.batchDraw();
}
