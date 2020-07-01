import {blockSnapSize} from "./grid/main";
import {token} from "./layerManager";
import {stage} from "../main";

let objectToMove;

export function moveTokenByArrows() {
  window.addEventListener('keydown', function handler(e) {
    if (objectToMove == null)
      return;

    /*
    console.log(objectToMove.x(), objectToMove.x() + blockSnapSize, objectToMove.x() - blockSnapSize);

    if (e.key == 'ArrowLeft') {
      objectToMove.x(objectToMove.x() - blockSnapSize)
    } else if (e.key == 'ArrowRight') {
      objectToMove.x(objectToMove.x() + blockSnapSize)
    }
    e.preventDefault();
    */
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
  stage.on('mousemove', () => {
    //console.log(token.children[0].x(), token.children[0].y());
  })
}

function moveToken(ptoken, moveTo) {
  switch (moveTo) {
    case 'L':
      ptoken.x(ptoken.x() - blockSnapSize)
      break;
    case 'R':
      ptoken.x(ptoken.x() + blockSnapSize)
      break;
    case 'U':
      ptoken.y(ptoken.y() - blockSnapSize)
      break;
    case 'D':
      ptoken.y(ptoken.y() + blockSnapSize)
      break;
  }
  token.batchDraw();
}
