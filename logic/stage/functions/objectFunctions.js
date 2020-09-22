import {blockSnapSize} from "../layers/grid/main";
import {stage} from "../main";
import {setCharacterPosition} from "../../../plugins/backendComunication/characters";

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
  let pos = {
    x: Math.floor((character.x() - character.width() / 2) / blockSnapSize),
    y: Math.floor((character.y() - character.height() / 2) / blockSnapSize)
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
