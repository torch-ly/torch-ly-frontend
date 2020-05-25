import {snapToGrid} from "../layerFunctions";
import {menuShape} from "./main";


export function installButtons() {
  pulseButton();
  deleteButton();
  snapToGridButton();
}

function pulseButton() {
  document.getElementById('pulse-button').addEventListener('click', () => {
    menuShape.to({
      scaleX: 2,
      scaleY: 2,
      onFinish: () => {
        menuShape.to({scaleX: 1, scaleY: 1});
      },
    });
  });
}

function deleteButton() {
  document.getElementById('delete-button').addEventListener('click', () => {
    menuShape.destroy();
    layer.draw();
  });
}

function snapToGridButton() {
  document.getElementById('snap-to-grid-button').addEventListener('click', (e) => {
    snapToGrid(menuShape)
    //TODO Change text bug
    if (menuShape.snapToGrid) {
      e.target.innerHTML = "Snap to Grid: ON"
    } else {
      e.target.innerHTML = "Snap to Grid: OFF"
    }
    menuShape.snapToGrid = !menuShape.snapToGrid;
  });
}
