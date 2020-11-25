import {blockSnapSize} from "../layers/grid/main";
import {stage} from "../main";

export function addSnapToGridListener(objects) {
	for (let object of objects) {
		if (object.characterID != null)
			continue;

		object.on("dragend transformend", () => {
			if (object.snapToGrid) {
				snapToGrid(object);
			}
		});
	}
}

export function snapToGrid(object) {

	let rot = object.rotation();
	object.rotation(0);

	let x = Object.prototype.hasOwnProperty.call(object, "attrs") ? object.attrs.x : object.x();
	let y = Object.prototype.hasOwnProperty.call(object, "attrs") ? object.attrs.y : object.y();

	object.position({
		x: Math.round(x / blockSnapSize) * blockSnapSize,
		y: Math.round(y / blockSnapSize) * blockSnapSize
	});

	object.rotation(rot);

	stage.batchDraw();
}

export function getRelativePointerPosition(node) {
	// the function will return pointer position relative to the passed node
	let transform = node.getAbsoluteTransform().copy();
	// to detect relative position we need to invert transform
	transform.invert();

	// get pointer (say mouse or touch) position
	let pos = node.getStage().getPointerPosition();

	// now we find relative point
	return transform.point(pos);
}

export function getRelativePointerGridRectangle() {
	let point = getRelativePointerPosition(stage);
	return {
		x: Math.floor(point.x / blockSnapSize) * blockSnapSize,
		y: Math.floor(point.y / blockSnapSize) * blockSnapSize
	};
}

export function copy(object) {
	return JSON.parse(JSON.stringify(object));
}
