import {stage} from "../../main";
import {snapToGrid} from "../layerFunctions";

export function draw(layer) {
  // setup menu

  let currentShape;
  let menuNode = document.getElementById('menu');
  document.getElementById('pulse-button').addEventListener('click', () => {
    currentShape.to({
      scaleX: 2,
      scaleY: 2,
      onFinish: () => {
        currentShape.to({scaleX: 1, scaleY: 1});
      },
    });
  });

  document.getElementById('delete-button').addEventListener('click', () => {
    currentShape.destroy();
    layer.draw();
  });

  document.getElementById('snap-to-grid-button').addEventListener('click', (e) => {
    snapToGrid(currentShape)
    if (currentShape.snapToGrid) {
      e.target.innerHTML = "Snap to Grid: ON"
    } else {
      e.target.innerHTML = "Snap to Grid: OFF"
    }
    currentShape.snapToGrid = !currentShape.snapToGrid;
  });

  window.addEventListener('click', () => {
    // hide menu
    menuNode.style.display = 'none';
  });

  stage.on('contextmenu', function (e) {
    // prevent default behavior
    e.evt.preventDefault();
    if (e.target === stage) {
      // if we are on empty place of the stage we will do nothing
      return;
    }
    if (e.target.hasMenu) {
      currentShape = e.target;
      // show menu
      menuNode.style.display = 'initial';
      let containerRect = stage.container().getBoundingClientRect();
      menuNode.style.top =
        containerRect.top + stage.getPointerPosition().y + 4 + 'px';
      menuNode.style.left =
        containerRect.left + stage.getPointerPosition().x + 4 + 'px';
    }
  });
}
