import {stage} from "../main";

export let buttonStates = {};

export function enableMenuButton() {
  let dragAndDropButton = document.getElementById("drag-and-drop-button");
  let paintButton = document.getElementById("paint-button");

  buttonStates.dragAndDrop = true;
  buttonStates.paint = false;

  dragAndDropButton.addEventListener('click', () => {
    disableAllButtonStates();
    buttonStates.dragAndDrop = true;
    setDragAndDrop(true);
    console.log(buttonStates);
  });

  paintButton.addEventListener('click', () => {
    disableAllButtonStates();
    buttonStates.paint = true;
    console.log(buttonStates)
    setDragAndDrop(false);
  });
}

function disableAllButtonStates() {
  buttonStates = {};
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
