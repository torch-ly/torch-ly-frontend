import {stage} from "../main";
import {useHand, usePen} from "../layers/freeDrawing/main";

export function enableMenuButton() {
  let dragAndDropButton = document.getElementById("drag-and-drop-button");
  let paintButton = document.getElementById("paint-button");

  dragAndDropButton.addEventListener('click', () => {
    setDragAndDrop(true);

    useHand();
  });

  paintButton.addEventListener('click', () => {
    setDragAndDrop(false);

    usePen();
  });
}


function setDragAndDrop(enable) {
  if (enable) {
    //Activate DragAndDrop
    stage.draggable(true);
    for (let layer of stage.children) {
      for (let object of layer.children) {
        if (object.draggableIfEnabled != null) {
          object.draggable = object.draggableIfEnabled;
        }
        if (object.hasMenuIfEnabled != null) {
          object.hasMenu = object.hasMenuIfEnabled;
        }
      }
    }
  } else {
    //Deactivate DragAndDrop
    stage.draggable(false);
    for (let layer of stage.children) {
      for (let object of layer.children) {
        object.draggableIfEnabled = object.draggable;
        object.draggable = false;

        object.hasMenuIfEnabled = object.hasMenu;
        object.hasMenu = false;
      }
    }
  }
}
