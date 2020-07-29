import {blockSnapSize} from "./grid/main";
import {stage, store} from "../main";
import {getTokenLayer} from "./layerManager";
import {setCharacterPosition} from "../../../plugins/backendComunication";

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

function moveToken(character, moveTo) {
  /*switch (moveTo) {
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
  }*/
  console.log(character)
  let pos = {
    x: Math.floor(character.x() / blockSnapSize),
    y: Math.floor(character.y() / blockSnapSize)
  }
  switch (moveTo) {
    case 'U':
      setCharacterPosition(character.characterID, {
        x: pos.x,
        y: pos.y - 1
      })
      break;
    case 'L':
      setCharacterPosition(character.characterID, {
        x: pos.x - 1,
        y: pos.y
      })
      break;
    case 'R':
      setCharacterPosition(character.characterID, {
        x: pos.x + 1,
        y: pos.y
      })
      break;
    case 'D':
      setCharacterPosition(character.characterID, {
        x: pos.x,
        y: pos.y + 1
      })
      break;
  }
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
