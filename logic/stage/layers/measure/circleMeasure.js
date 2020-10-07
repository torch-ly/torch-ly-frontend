import {blockSnapSize} from "@/logic/stage/layers/grid/main";
import {getRelativePointerPosition} from "@/logic/stage/functions/layerFunctions";
import {stage, store} from "@/logic/stage/main";
import {layer} from "@/logic/stage/layers/measure/main";

let circle1;
let circle2;
let measureArrow;
let measureCircle;

let offsetX;
let offsetY;

export function startCircleMeasure() {

  measureArrow = new Konva.Arrow({
    strokeWidth: 3,
    fill: '#4a5568',
    stroke: '#4a5568',
    pointerLength: 20,
    pointerWidth: 20,
    points: [],
    listening: false
  })

  layer.add(measureArrow);

  stage.on("mousedown", () => {
    if (!circle1) {
      circle1 = new Konva.Circle({
        x: getSnapPos().x,
        y: getSnapPos().y,
        radius: 20,
        fill: '#4a5568',
        stroke: 'black',
        draggable: true
      });

      measureArrow.points([circle1.x(), circle1.y()]);

      circle1.on('dragmove', moveCircle);
      circle1.on('dragend', snapCircle1);

      layer.add(circle1);

    } else if (!circle2) {
      circle2 = new Konva.Circle({
        x: getSnapPos().x,
        y: getSnapPos().y,
        radius: 20,
        fill: '#4a5568',
        stroke: 'black',
        draggable: true
      });

      measureArrow.points([circle1.x(), circle1.y(), circle2.x(), circle2.y()]);

      updateOffset();

      layer.add(circle2);

      measureCircle = new Konva.Circle({
        x: circle1.x(),
        y: circle1.y(),
        radius: 0,
        stroke: '#4a5568',
        fill: 'rgba(74,85,104,0.17)',
        strokeWidth: 4,
        listening: false
      });

      circle2.on('dragmove', changeRadius);
      circle2.on('dragend', snapCircle2);

      updateMeasure();

      layer.add(measureCircle);
      layer.batchDraw();
    }
    layer.batchDraw();
  });

  stage.on("mousemove", () => {
    if (circle1 && !circle2) {
      measureArrow.points([circle1.x(), circle1.y(), getSnapPos().x, getSnapPos().y]);
      store.commit("manu/setMeasureLength", Math.max(Math.abs(measureArrow.points()[0] - measureArrow.points()[2]), Math.abs(measureArrow.points()[1] - measureArrow.points()[3])) / blockSnapSize);
      layer.batchDraw();
    } else if (circle2) {
      measureArrow.visible(false);
      layer.batchDraw();
    }
  })

}


function updateMeasure() {
  if (!circle1 || !circle2)
    return;

  measureCircle.x(circle1.x());
  measureCircle.y(circle1.y());

  let radius = Math.sqrt(Math.pow(circle1.x() - circle2.x(), 2) + Math.pow(circle1.y() - circle2.y(), 2));

  measureCircle.radius(radius);

  store.commit("manu/setMeasureLength", Math.round(radius / blockSnapSize));

  layer.batchDraw();
}

function moveCircle() {
  circle2.x(circle1.x() + offsetX);
  circle2.y(circle1.y() + offsetY);

  updateMeasure();
}

function changeRadius() {
  updateOffset();
  updateMeasure();
}

function snapCircle1() {
  circle1.x(blockSnapSize * Math.round(circle1.x() / blockSnapSize));
  circle1.y(blockSnapSize * Math.round(circle1.y() / blockSnapSize));

  moveCircle();
}

function snapCircle2() {
  circle2.x(blockSnapSize * Math.round(circle2.x() / blockSnapSize));
  circle2.y(blockSnapSize * Math.round(circle2.y() / blockSnapSize));

  changeRadius();
}

function updateOffset() {
  offsetX = circle2.x() - circle1.x();
  offsetY = circle2.y() - circle1.y();
}

function getSnapPos() {
  return {
    x: blockSnapSize * Math.round(getRelativePointerPosition(stage).x / blockSnapSize),
    y: blockSnapSize * Math.round(getRelativePointerPosition(stage).y / blockSnapSize)
  }
}

export function disableCircleMeasure() {

  try {
    circle1.destroy()
  } catch (e) {
  }
  try {
    circle2.destroy()
  } catch (e) {
  }
  try {
    measureArrow.destroy()
  } catch (e) {
  }
  try {
    measureCircle.destroy()
  } catch (e) {
  }

  circle1 = null;
  circle2 = null;
  measureArrow = null;
  measureCircle = null;


  offsetX = null;
  offsetY = null;

  layer.batchDraw();
}
