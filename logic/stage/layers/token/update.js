import {layer} from "@/logic/stage/layers/token/main";
import {Image as KonvaImage} from "konva";
import {blockSnapSize} from "@/logic/stage/layers/grid/main";
import {updateConditionImages} from "@/logic/stage/layers/token/conditions";
import {loadImage} from "@/logic/stage/layers/background/init";

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

      /*updateConditionImagePosition(oldCharacter.conditions, {
        x: oldCharacter.x(),
        y: oldCharacter.y(),
        width: oldCharacter.width()
      })*/

      updateConditionImages(character.id, character.conditions);

      layer.batchDraw();

      return;
    }
  }

  // The character is new
  loadImage(character);

}
