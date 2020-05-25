import {stage} from "../../main";
import {installButtons} from "./buttonFunctions";

export let menuShape;
let menuNode;

export function draw(layer) {
  // setup menu

  menuNode = document.getElementById('menu');

  installButtons();

  addDisableListener();

  addClickListener();
}

function addDisableListener() {
  stage.addEventListener('click', () => {
    // hide menu
    menuNode.style.display = 'none';
  });
}

function addClickListener() {
  stage.on('contextmenu', function (e) {
    // prevent default behavior
    e.evt.preventDefault();
    if (e.target === stage) {
      // if we are on empty place of the stage we will do nothing
      return;
    }
    if (e.target.hasMenu) {
      menuShape = e.target;
      // show menu
      menuNode.style.display = 'initial';
      let containerRect = stage.container().getBoundingClientRect();
      menuNode.style.top = containerRect.top + stage.getPointerPosition().y + 4 + 'px';
      menuNode.style.left = containerRect.left + stage.getPointerPosition().x + 4 + 'px';


      let snapToGridButton = document.getElementById('snap-to-grid-button');
      if (menuShape.snapToGrid) {
        snapToGridButton.innerHTML = "Snap to Grid: ON"
      } else {
        snapToGridButton.innerHTML = "Snap to Grid: OFF"
      }
    }
  });
}
