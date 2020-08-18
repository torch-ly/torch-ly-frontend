import {stage} from "./main";
import {getRelativePointerPosition} from "./layers/layerFunctions";

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

export function addFogOfWarListener() {
  stage.on('mousedown', () => {
    selection.start = getRelativePointerPosition(stage);
    selection.end = {x: null, y: null};
  });
  stage.on('mouseup', () => {
    selection.start = {x: null, y: null};
    selection.end = getRelativePointerPosition(stage);
  })
}
