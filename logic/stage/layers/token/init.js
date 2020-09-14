import Konva, {Image as KonvaImage} from "konva";
import {addSnapToGridListener} from "../layerFunctions";
import {store} from "../../main";
import {blockSnapSize} from "../grid/main";
import {draw, layer} from "./main";
import {addTransformerClickListener} from "../transformer";
import {removeCharacter, setCharacterPosition} from "../../../../plugins/backendComunication/characters";
import {addTransformationListener} from "~/logic/stage/layers/transformer";
import devices from "@/enums/devices";
import conditions from "@/enums/conditions";

let out = [];
let conditionSize = 40;

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

    image.conditions = [];
    loadConditionImages(image, {x: image.x(), y: image.y(), width: image.width()}, character.conditions || []);

    image.x(image.x() + image.width() / 2);
    image.y(image.y() + image.height() / 2);

    image.offsetX(image.width() / 2);
    image.offsetY(image.height() / 2);

    image.snapToGrid = true;
    image.characterID = character.id;
    image.on('dragend', e => {
      setCharacterPosition(image.characterID, {
        x: Math.round((image.x() - image.width() / 2) / blockSnapSize),
        y: Math.round((image.y() - image.height() / 2) / blockSnapSize)
      })
    });

    image.on('dragmove', () => {
      updateConditionImagePosition(image.conditions, {
        x: image.x(),
        y: image.y(),
        width: image.width()
      }, character.conditions || []);
    })

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

      updateConditionImagePosition(oldCharacter.conditions, {
        x: oldCharacter.x(),
        y: oldCharacter.y(),
        width: oldCharacter.width()
      })

      layer.batchDraw();

      return;
    }
  }

  // The character is new
  loadImage(character);

}

export function removeKonvaCharacter(characterID) {
  for (let i = 0; i < out.length; i++) {
    if (out[i].characterID == characterID) {
      out.splice(i, 1);
      draw(out);
      return;
    }
  }
}

function loadConditionImages(parent, parentPos, activeConditionList) {
  parent.conditions = [];
  for (let i = 0; i < activeConditionList.length; i++) {
    let imageObj = new Image(conditionSize, conditionSize);
    imageObj.onload = function () {
      let image = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj
      });

      image.conditionName = activeConditionList[i];
      parent.conditions.push(image);
      out.push(image);

      draw(out);
      updateConditionImagePosition(parent.conditions, parentPos)
    };
    imageObj.src = conditions[activeConditionList[i]];
  }


}

function updateConditionImagePosition(conditions, parentPos) {
  for (let i = 0; i < conditions.length; i++) {
    conditions[i].x(Math.floor((parentPos.x - parentPos.width / 2) + parentPos.width - (i + 1) * conditionSize));
    conditions[i].y(Math.floor((parentPos.y - parentPos.width / 2)));
    conditions[i].moveToTop();
  }
  layer.batchDraw();
}

function removeConditionImages(character) {
  for (let condition of character.conditions) {
    out = out.filter(object => object.conditionName != condition.conditionName)
    condition.destroy();
  }
}

export function updateConditionImages(characterID, conditions) {
  let konvaCharacter = layer.children.filter(img => img.characterID == characterID)[0];
  removeConditionImages(konvaCharacter);
  loadConditionImages(konvaCharacter, {
    x: konvaCharacter.x(),
    y: konvaCharacter.y(),
    width: konvaCharacter.width()
  }, conditions);
}
