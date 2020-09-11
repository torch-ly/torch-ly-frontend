import Konva, {Image as KonvaImage} from "konva";
import {addSnapToGridListener} from "../layerFunctions";
import {store} from "../../main";
import {blockSnapSize} from "../grid/main";
import {draw, layer} from "./main";
import {addTransformerClickListener} from "../transformer";
import {removeCharacter, setCharacterPosition} from "../../../../plugins/backendComunication/characters";
import {addTransformationListener} from "~/logic/stage/layers/transformer";
import devices from "@/enums/devices";

let out = [];

export function init() {
  out = [];

  let characters = store.state.character.characters;

  if (store.state.config.device === devices.MOBILE)
    return ;

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
    image.offsetX(image.width() / 2);
    image.offsetY(image.height() / 2);

    image.x(image.x() + image.width() / 2);
    image.y(image.y() + image.height() / 2);

    image.snapToGrid = true;
    image.characterID = character.id;
    image.on('dragend', e => {
      setCharacterPosition(image.characterID, {
        x: Math.round((image.x() - image.width() / 2) / blockSnapSize),
        y: Math.round((image.y() - image.height() / 2) / blockSnapSize)
      })
    });
    image.removeElement = () => {
      removeCharacter(image.characterID)
    }

    image.on('mouseenter', () => {
      store.commit("character/setHoverOverCharacter", image.characterID);
    });

    image.on('mouseleave', () => {
      store.commit("character/setHoverOverCharacter", null);
    });

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

      oldCharacter.rotation(0)
      oldCharacter.offsetX(0);
      oldCharacter.offsetY(0);

      oldCharacter.scaleX(1);
      oldCharacter.scaleY(1);
      oldCharacter.x(character.pos.point.x * blockSnapSize);
      oldCharacter.y(character.pos.point.y * blockSnapSize);
      oldCharacter.width(character.pos.size * blockSnapSize);
      oldCharacter.height(character.pos.size * blockSnapSize);

      // Offset for snap to center
      oldCharacter.offsetX(oldCharacter.width() / 2);
      oldCharacter.offsetY(oldCharacter.height() / 2);

      oldCharacter.x(oldCharacter.x() + oldCharacter.width() / 2);
      oldCharacter.y(oldCharacter.y() + oldCharacter.height() / 2);

      oldCharacter.rotation(character.pos.rot);

      layer.batchDraw();

      return;
    }
  }

  // The character is new
  loadImage(character);

}

