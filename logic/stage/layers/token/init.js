import Konva from "konva";
import {addSnapToGridListener} from "../layerFunctions";
import {store} from "../../main";
import {blockSnapSize} from "../grid/main";
import {draw} from "./main";
import {addTransformerClickListener} from "../transformer";
import {setCharacterPosition} from "../../../../plugins/backendComunication";

let out = [];

export function init() {
  out = [];

  let characters = store.state.character.characters;

  characters.forEach(character => loadImage(character));
}

function loadImage(character) {
  let imageObj = new Image(character.pos.size * blockSnapSize, character.pos.size * blockSnapSize);
  imageObj.onload = function () {
    let image = new Konva.Image({
      x: Math.floor(character.pos.point.x * blockSnapSize),
      y: Math.floor(character.pos.point.y * blockSnapSize),
      image: imageObj,
      rotation: character.pos.rot,
      id: String(character.id)
    });
    image.snapToGrid = true;
    image.characterID = character.id;
    image.on('dragend', e => {
      setCharacterPosition(image.characterID, {
        x: Math.round(image.x() / blockSnapSize),
        y: Math.round(image.y() / blockSnapSize)
      })
    });

    addTransformerClickListener(image);

    addSnapToGridListener([image]);

    out.push(image);
    draw(out);
  };
  imageObj.src = character.token;
}
