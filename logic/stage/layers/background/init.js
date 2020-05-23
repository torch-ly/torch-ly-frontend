import Konva from "konva";

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
    draggable: true
  });

  out.push(rect1, rect2);

  let tr = new Konva.Transformer();
  out.push(tr);
  tr.nodes([rect1]);

  let tr2 = new Konva.Transformer();
  out.push(tr2);
  tr2.nodes([rect2]);


  return out;
}
