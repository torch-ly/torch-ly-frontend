import {blockSnapSize} from "./grid/main";
import {stage} from "../main";

export function addSnapToGridListener(objects) {
  for (let object of objects) {
    object.on('dragend transformend', (e) => {
      console.log(123456)
      if (object.snapToGrid) {
        snapToGrid(object);
      }
    });
  }
}

//TODO Löschen
export function snapToGrid(object) {
  if (object.characterID != null) {

    let x = object.x() + 0.5 * object.width();
    let y = object.y() + 0.5 * object.height();


    object.position({
      x: Math.round(x / blockSnapSize) * blockSnapSize,
      y: Math.round(y / blockSnapSize) * blockSnapSize
    });
    stage.batchDraw();
    return;
  }

  let rot = object.rotation();
  object.rotation(0);

  console.log(rot, object.rotation(), object.getTransform().getMatrix())

  let x = object.hasOwnProperty("attrs") ? object.attrs.x : object.x();
  let y = object.hasOwnProperty("attrs") ? object.attrs.y : object.y();

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
