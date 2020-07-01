import {blockSnapSize} from "./grid/main";
import {stage} from "../main";

let objectToMove;

export function moveTokenByArrows() {
  window.addEventListener('keydown', (e) => {
    if (objectToMove == null)
      return;

    switch (e.key) {
      case 'ArrowLeft':
        moveToken(objectToMove, 'L');
        break;
      case 'ArrowRight':
        moveToken(objectToMove, 'R');
        break;
      case 'ArrowUp':
        moveToken(objectToMove, 'U');
        break;
      case 'ArrowDown':
        moveToken(objectToMove, 'D');
        break;
    }

    stage.batchDraw();
  })
}

export function setMoveObjectByArrow(object) {
  objectToMove = object;
}

function moveToken(object, moveTo) {
  switch (moveTo) {
    case 'L':
      object.x(calculateSnapToGrid(object.x()) - blockSnapSize);
      object.y(calculateSnapToGrid(object.y()));
      break;
    case 'R':
      object.x(calculateSnapToGrid(object.x()) + blockSnapSize);
      object.y(calculateSnapToGrid(object.y()));
      break;
    case 'U':
      object.y(calculateSnapToGrid(object.y()) - blockSnapSize);
      object.x(calculateSnapToGrid(object.x()));
      break;
    case 'D':
      object.y(calculateSnapToGrid(object.y()) + blockSnapSize);
      object.x(calculateSnapToGrid(object.x()));
      break;
  }
  //TODO only update current layer
  stage.batchDraw();
}

function calculateSnapToGrid(value) {
  return Math.round(value / blockSnapSize) * blockSnapSize;
}
