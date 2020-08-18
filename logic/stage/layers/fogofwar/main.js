import {stage, store} from "../../main";
import {getRelativePointerPosition} from "../layerFunctions";


let layer;
let borders = {up: null, right: null, left: null, down: null};
let selection = {
  start: {
    x: null,
    y: null
  },
  end: {
    x: null,
    y: null
  }
};
let selectedRectangles = [];


export function draw(player){
  layer = player;
  addFogOfWarListener();
}

function selectFogOfWar() {
  //calculate rectangle
  //draw borders
  //add selected rectangles
}

function addFog(){
  //remove borders
  for(rect of selectedRectangles){
    // add all rectangles to layer
  }
}

function removeFog() {
  //remove borders
  for(rect of selectedRectangles){
    for(children of layer.children){
      // remove if necessary
    }
  }
}


function addFogOfWarListener() {
  stage.on('mousedown', () => {
    if(!store.state.manu.fogOfWar)
      return;
    selection.start = getRelativePointerPosition(stage);
  });
  stage.on('mouseup', () => {
    if(!store.state.manu.fogOfWar)
      return;
    selection.end = getRelativePointerPosition(stage);
    selectFogOfWar()
  })
}
