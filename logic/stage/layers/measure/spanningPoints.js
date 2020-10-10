import {stage, store} from "~/logic/stage/main";
import {layer} from "~/logic/stage/layers/measure/main";
import {blockSnapSize} from "~/logic/stage/layers/grid/main";
import {getRelativePointerPosition} from "~/logic/stage/functions/layerFunctions";

export let circle1, circle2;
export let offsetX, offsetY;
let measureArrow;
let updateMeasureObject;

export function addSpanningPoints(measureObject, pUpdateMeasureObject) {

  layer.add(measureObject);

  updateMeasureObject = pUpdateMeasureObject;

  measureArrow = new Konva.Arrow({
    strokeWidth: 3,
    fill: '#4a5568',
    stroke: '#4a5568',
    pointerLength: 20,
    pointerWidth: 20,
    points: [],
    listening: false
  });

  layer.add(measureArrow);

  stage.on("mousedown touchstart", () => {
    if (!circle1) {
      addFirstCircle();
    } else if (!circle2) {
      addSecondCircle();
    }
    layer.batchDraw();
  });

  stage.on("mousemove touchmove", () => {
    if (circle1 && !circle2) {
      measureArrow.points([circle1.x(), circle1.y(), getSnapPos().x, getSnapPos().y]);
      store.commit("manu/setMeasureLength", Math.max(Math.abs(measureArrow.points()[0] - measureArrow.points()[2]),
        Math.abs(measureArrow.points()[1] - measureArrow.points()[3])) / blockSnapSize);
      layer.batchDraw();
    } else if (circle2) {
      measureArrow.visible(false);
      layer.batchDraw();
    }
  });

  stage.on('mouseup touchend', () => {
    if (circle1 && !circle2 && Math.max(Math.abs(measureArrow.points()[0] - getSnapPos().x),
      Math.abs(measureArrow.points()[1] - getSnapPos().y)) / blockSnapSize > 0) {
      addSecondCircle();
    }
  })
}

export function disableSpanningPoints() {
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

  circle1 = null;
  circle2 = null;
  measureArrow = null;

  offsetX = null;
  offsetY = null;

  layer.batchDraw();
}

function addFirstCircle() {
  circle1 = new Konva.Circle({
    x: getSnapPos().x,
    y: getSnapPos().y,
    radius: 20,
    fill: '#4a5568',
    stroke: 'black',
    draggable: true
  });

  measureArrow.points([circle1.x(), circle1.y()]);

  circle1.on('dragmove', changeCircle1);
  circle1.on('dragend', snapCircle1);

  layer.add(circle1);
}

function addSecondCircle() {
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

  circle2.on('dragmove', changeCircle2);
  circle2.on('dragend', snapCircle2);

  updateMeasureObject();

  layer.batchDraw();
}

function snapCircle1() {
  circle1.x(blockSnapSize * Math.round(circle1.x() / blockSnapSize));
  circle1.y(blockSnapSize * Math.round(circle1.y() / blockSnapSize));

  changeCircle1();
}

function snapCircle2() {
  circle2.x(blockSnapSize * Math.round(circle2.x() / blockSnapSize));
  circle2.y(blockSnapSize * Math.round(circle2.y() / blockSnapSize));

  changeCircle2();
}

export function updateOffset() {
  offsetX = circle2.x() - circle1.x();
  offsetY = circle2.y() - circle1.y();
}

function getSnapPos() {
  return {
    x: blockSnapSize * Math.round(getRelativePointerPosition(stage).x / blockSnapSize),
    y: blockSnapSize * Math.round(getRelativePointerPosition(stage).y / blockSnapSize)
  }
}

function changeCircle1() {
  circle2.x(circle1.x() + offsetX);
  circle2.y(circle1.y() + offsetY);

  updateMeasureObject();
}

function changeCircle2() {
  updateOffset();
  updateMeasureObject();
}
