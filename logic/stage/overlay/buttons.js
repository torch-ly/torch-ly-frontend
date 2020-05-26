export let buttonStates = {};

export function enableMenuButton() {
  let dragAndDropButton = document.getElementById("drag-and-drop-button");
  let paintButton = document.getElementById("paint-button");

  buttonStates.dragAndDrop = true;
  buttonStates.paint = false;

  dragAndDropButton.addEventListener('click', () => {
    disableAllButtonStates();
    buttonStates.dragAndDrop = true;
    console.log(buttonStates);
  });

  paintButton.addEventListener('click', () => {
    disableAllButtonStates();
    buttonStates.paint = true;
    console.log(buttonStates)
  });
}

function disableAllButtonStates() {
  buttonStates = {};
}

function setDragAndDrop() {

}
