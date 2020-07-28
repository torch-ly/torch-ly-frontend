import {blockSnapSize} from "./grid/main";
import {stage, store} from "../main";
import {getTokenLayer} from "./layerManager";

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

export function moveCharacter(object, moveTo) {
  let newCharacter = {...object};
  switch (moveTo) {
    case 'L':
      newCharacter.pos.point.x = calculateSnapToGrid(object.pos.point.x - blockSnapSize);
      newCharacter.pos.point.y = calculateSnapToGrid(object.pos.point.y);
      break;
    case 'R':
      newCharacter.pos.point.x = (calculateSnapToGrid(object.pos.point.x) + blockSnapSize);
      newCharacter.pos.point.y = (calculateSnapToGrid(object.pos.point.y));
      break;
    case 'U':
      newCharacter.pos.point.y = (calculateSnapToGrid(object.pos.point.y) - blockSnapSize);
      newCharacter.pos.point.x = (calculateSnapToGrid(object.pos.point.x));
      break;
    case 'D':
      newCharacter.pos.point.y = (calculateSnapToGrid(object.pos.point.y) + blockSnapSize);
      newCharacter.pos.point.x = (calculateSnapToGrid(object.pos.point.x));
      break;
  }
  store.commit("character/updateCharacter", newCharacter);
  getTokenLayer().batchDraw();
}

function calculateSnapToGrid(value) {
  return Math.round(value / blockSnapSize) * blockSnapSize;
}
