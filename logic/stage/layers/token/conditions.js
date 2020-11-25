import Konva from "konva";
import {draw, layer, out, setOut} from "@/logic/stage/layers/token/main";
import conditions from "@/enums/conditions";

let conditionSize = 40;

export function loadConditionImages(parent, parentPos, activeConditionList) {
  parent.conditions = [];
  for (let i = 0; i < activeConditionList.length; i++) {
    let imageObj = new Image(conditionSize, conditionSize);
    imageObj.onload = function () {
      let image = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        listening: false
      });

      image.conditionName = activeConditionList[i];
      parent.conditions.push(image);
      out.push(image);

      draw(out);

      updateConditionImagePosition(parent.conditions, parentPos);
    };
    imageObj.src = conditions[activeConditionList[i]];
  }


}

export function updateConditionImagePosition(conditions, parentPos) {
  for (let i = 0; i < conditions.length; i++) {
    conditions[i].x(Math.floor((parentPos.x - parentPos.width / 2) + parentPos.width - (i + 1) * conditionSize));
    conditions[i].y(Math.floor((parentPos.y - parentPos.width / 2)));
    conditions[i].moveToTop();
  }
  layer.batchDraw();
}

export function removeConditionImages(character) {
  for (let condition of character.conditions) {
    setOut(out.filter(object => object.conditionName != condition.conditionName));
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
