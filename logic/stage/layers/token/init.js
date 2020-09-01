import Konva, {Image as KonvaImage} from "konva";
import {addSnapToGridListener} from "../layerFunctions";
import {store} from "../../main";
import {blockSnapSize} from "../grid/main";
import {draw, layer} from "./main";
import {addTransformerClickListener} from "../transformer";
import {setCharacterPosition} from "../../../../plugins/backendComunication";
import {removeCharacter} from "@/plugins/backendComunication";
import {addTransformationListener} from "~/logic/stage/layers/transformer";

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
    image.removeElement = () => {
      removeCharacter(image.characterID)
    }

    addTransformerClickListener(image);

    addSnapToGridListener([image]);

    addTransformationListener(image);

    out.push(image);
    draw(out);
  };
  imageObj.src = character.token;
}


export function updateCharacterAttrs(character) {
  let oldCharacters = layer.children.filter(child => child instanceof KonvaImage);

  for (let oldCharacter of oldCharacters) {
    if (oldCharacter.characterID === character.id) {
      // There is an existing old Character
      oldCharacter.scaleX(1);
      oldCharacter.scaleY(1);
      oldCharacter.x(character.pos.point.x * blockSnapSize);
      oldCharacter.y(character.pos.point.y * blockSnapSize);
      oldCharacter.width(character.pos.size * blockSnapSize);
      oldCharacter.height(character.pos.size * blockSnapSize);

      oldCharacter.rotation(character.pos.rot);

      console.log(oldCharacter)

      layer.batchDraw();

      return;
    }
  }

  // The character is new
  loadImage(character);

}

