import Konva from "konva";
import {addSnapToGridListener, addTransformer, addTransformerClickListener} from "../layerFunctions";

let out = [];

export function init() {

  //create Rects
  addObjects();

  //adds invisible Transformer to all objekts in out
  addTransformer(out);

  //adds clicklistener to enable transformer
  addTransformerClickListener(out);

  //if snapToGrid == true -> object will snap to grid
  addSnapToGridListener(out);

  return out;
}

function addObjects() {
  let rect1 = new Konva.Rect({
    x: 50,
    y: 20,
    width: 120,
    height: 600,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4,
    draggable: false,
    tr: null
  });

  rect1.snapToGrid = true;
  rect1.hasMenu = true;

  let rect2 = new Konva.Rect({
    x: 80,
    y: 20,
    width: 120,
    height: 600,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    draggable: false,
    tr: null
  });
  rect2.snapToGrid = true;
  rect2.hasMenu = true;


  /*loadImages({pic1: 'https://frontend.somigo.de/images/event-placeholder.jpg'}, function () {
    console.log(images)
    let pic = new Konva.Image({
      image: images.pic1,
      x: 120,
      y: 50,
    });
    out.push(pic)
  })*/

  /*Konva.Image.fromURL('/picture.jpg', function (darthNode) {
    darthNode.setAttrs({
      x: 200,
      y: 50,
      scaleX: 0.5,
      scaleY: 0.5,
    });
    out.push(darthNode)
  });*/

  out.push(rect1, rect2);
}
