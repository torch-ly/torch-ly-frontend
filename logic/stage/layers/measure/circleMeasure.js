import {blockSnapSize} from "@/logic/stage/layers/grid/main";
import {store} from "@/logic/stage/main";
import {layer} from "@/logic/stage/layers/measure/main";
import {addDrawing} from "~/plugins/backendComunication/drawing";
import {addSpanningPoints, circle1, circle2, disableSpanningPoints} from "~/logic/stage/layers/measure/spanningPoints";
import Konva from "konva";

let measureCircle;

export function startCircleMeasure() {

	measureCircle = new Konva.Circle({
		x: 0,
		y: 0,
		radius: 0,
		stroke: "#4a5568",
		fill: "rgba(74,85,104,0.17)",
		strokeWidth: 4,
		listening: false
	});

	addSpanningPoints(measureCircle, updateMeasure);
}


function updateMeasure() {
	if (!circle1 || !circle2)
		return;

	measureCircle.x(circle1.x());
	measureCircle.y(circle1.y());

	let radius = Math.sqrt(Math.pow(circle1.x() - circle2.x(), 2) + Math.pow(circle1.y() - circle2.y(), 2));

	measureCircle.radius(radius);

	store.commit("manu/setMeasureLength", Math.round(radius / blockSnapSize));

	layer.batchDraw();
}

export function saveAsDrawing() {
	if (measureCircle != null) 
		addDrawing({
			x: measureCircle.x(),
			y: measureCircle.y(),
			radius: measureCircle.radius(),
			stroke: "black",
			strokeWidth: 4,
			type: "Circle"
		});
	
}

export function disableCircleMeasure() {

	disableSpanningPoints();

	try {
		measureCircle.destroy();
	} catch (e) {
	}

	measureCircle = null;

	layer.batchDraw();
}
