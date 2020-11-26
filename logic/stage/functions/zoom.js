import {stage} from "../main";
import {updateGrid} from "@/logic/stage/layers/grid/main";

export function enableZoom() {
	stage.on("wheel", (e) => {
		if (!stage.draggable())
			return;

		let scaleBy = 0.95;
		e.evt.preventDefault();
		if (e.evt.deltaY > 0)
			zoomByScale(scaleBy);
		else
			zoomByScale(1 + (1 - scaleBy));

	});

	let lastCenter = null;
	let lastDist = 0;

	stage.on("touchmove", function (e) {
		e.evt.preventDefault();

		if (!stage.draggable())
			return;

		let touch1 = e.evt.touches[0];
		let touch2 = e.evt.touches[1];

		if (touch1 && touch2) {
			// if the stage was under Konva's drag&drop
			// we need to stop it, and implement our own pan logic with two pointers
			if (stage.isDragging())
				stage.stopDrag();


			let p1 = {
				x: touch1.clientX,
				y: touch1.clientY,
			};
			let p2 = {
				x: touch2.clientX,
				y: touch2.clientY,
			};

			if (!lastCenter) {
				lastCenter = getCenter(p1, p2);
				return;
			}
			let newCenter = getCenter(p1, p2);

			let dist = getDistance(p1, p2);

			if (!lastDist)
				lastDist = dist;


			// local coordinates of center point
			let pointTo = {
				x: (newCenter.x - stage.x()) / stage.scaleX(),
				y: (newCenter.y - stage.y()) / stage.scaleX(),
			};

			let scale = stage.scaleX() * (dist / lastDist);

			stage.scaleX(scale);
			stage.scaleY(scale);

			// calculate new position of the stage
			let dx = newCenter.x - lastCenter.x;
			let dy = newCenter.y - lastCenter.y;

			let newPos = {
				x: newCenter.x - pointTo.x * scale + dx,
				y: newCenter.y - pointTo.y * scale + dy,
			};

			stage.position(newPos);
			stage.batchDraw();

			lastDist = dist;
			lastCenter = newCenter;
		}
	});

	stage.on("touchend", function () {
		lastDist = 0;
		lastCenter = null;
	});
}

function zoomByScale(scaleFactor) {
	let oldScale = stage.scaleX();

	let pointer = stage.getPointerPosition();

	let newScale = oldScale * scaleFactor;

	let mousePointTo = {
		x: (pointer.x - stage.x()) / oldScale,
		y: (pointer.y - stage.y()) / oldScale,
	};

	stage.scale({
		x: newScale,
		y: newScale
	});

	let newPos = {
		x: pointer.x - mousePointTo.x * newScale,
		y: pointer.y - mousePointTo.y * newScale,
	};
	stage.position(newPos);

	updateGrid();
	stage.batchDraw();
}

function getDistance(p1, p2) {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1, p2) {
	return {
		x: (p1.x + p2.x) / 2,
		y: (p1.y + p2.y) / 2,
	};
}
