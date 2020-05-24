import Konva from "konva";
import {stage} from "../../main";

export function init() {
  let out = [];

  let rect1 = new Konva.Rect({
    x: 50,
    y: 20,
    width: 100,
    height: 500,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
    draggable: true
  });
  let rect2 = new Konva.Rect({
    x: 80,
    y: 20,
    width: 100,
    height: 500,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    draggable: false,
    tr: null
  });

  let tr = new Konva.Transformer();
  tr.nodes([rect1]);
  tr.visible(false);
  rect1.tr = tr;

  let tr2 = new Konva.Transformer();
  tr2.nodes([rect2]);
  rect2.tr = tr2;

  /*rect1.on('click', (e) => {
    tr.visible(true);
    console.log("true")
  })*/

  out.push(rect1, rect2);

  console.log(out);

  stage.on('click', function (e) {
    function disableAll() {
      console.log("clear")
      for (let object of out) {
        object.tr.visible(false);
        object.draggable(false);
      }
    }
    if (e.target == stage) {
      disableAll();
    } else {
      for (let object of out) {
        if (e.target == object) {
          console.log("te")
          object.tr.visible(true);
          object.draggable(true);
        }
      }
    }
  })

  //out.push(tr, tr2);



  return out;
}
