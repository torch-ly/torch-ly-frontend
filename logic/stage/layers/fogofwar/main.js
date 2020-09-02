import {stage, store} from "../../main";
import {copy, getRelativePointerGridRectangle, getRelativePointerPosition} from "../layerFunctions";
import * as turf from "@turf/turf";
import {setFogOfWar} from "../../../../plugins/backendComunication";
import {blockSnapSize} from "../grid/main";

let layer;
let polygons = [];
let turf_polygons = [];
let currentPolygon = [];
let nextPolygon;
let insert = true;

let snapToGrid = false;

export function setFogOfWarLayer(player) {
  layer = player;
}

export function addFogOfWarListener() {
  stage.on('mouseup', () => {
    let point_x_y = getRelativePointerPosition(stage);
    if (snapToGrid) {
      let point = getRelativePointerGridRectangle();
      let smallerRect = (insert ? 0.1 : -0.1);
      console.log(smallerRect);
      currentPolygon = [];
      point.x += smallerRect;
      point.y += smallerRect;
      console.log(point);
      currentPolygon.push(pointToArray(point))
      point.x += blockSnapSize - (2 * smallerRect);
      currentPolygon.push(pointToArray(point));
      point.y += blockSnapSize - (2 * smallerRect);
      currentPolygon.push(pointToArray(point));
      point.x -= blockSnapSize - (2 * smallerRect);
      currentPolygon.push(pointToArray(point));
      console.log(currentPolygon);
      (insert ? InsertPolygon() : DeletePolygon())
    } else {
      addPointToPolygon([point_x_y.x, point_x_y.y])
    }
  });

  stage.on('mousemove', () => {
    if (snapToGrid)
      return;
    let point_x_y = getRelativePointerPosition(stage);
    showNextPoint([point_x_y.x, point_x_y.y])
  });
}

//graphql
export function syncronize() {
  let polygons = [];
  for (let i = 0; i < turf_polygons.length; i++) {
    polygons.push(turf_polygons[i].geometry.coordinates[0]);
  }
  setFogOfWar(polygons);
}

export function recieveSyncronize(p_polygons) {
  //if(!dm)
  //  return;
  turf_polygons = [];

  for (let poly of polygons) {
    poly.destroy();
  }

  for (let coordinates of p_polygons) {
    let turf_polygon = turf.polygon([coordinates]);
    polygons.push(addPolygons(turf_polygon, "#000"));
    turf_polygons.push(turf_polygon);
  }

  layer.draw();
}

//frontend toggle
export function toggleInsert() {
  currentPolygon = []

  if (nextPolygon != null) {
    nextPolygon.destroy();
  }

  layer.batchDraw();
  insert = !insert;
}

export function toggleSnapToGrid() {
  currentPolygon = []

  if (nextPolygon != null) {
    nextPolygon.destroy();
  }

  layer.batchDraw();
  snapToGrid = !snapToGrid;
}

//insert and delete
export function InsertPolygon() {
  if (currentPolygon.length < 3)
    return;
  let coordinates = [[...currentPolygon, currentPolygon[0]]];
  let turf_polygon = turf.polygon(coordinates);
  currentPolygon = []

  if (nextPolygon != null) {
    nextPolygon.destroy();
  }

  let intersects = [];

  for (let i = 0; i < turf_polygons.length; i++) {
    if (turf.booleanOverlap(turf_polygon, turf_polygons[i]) || turf.booleanContains(turf_polygon, turf_polygons[i]) ||
      turf.booleanContains(turf_polygons[i], turf_polygon)) {
      intersects.push(i);
    }
  }

  if (intersects.length === 0) {
    console.log("no overlaps");
    polygons.push(addPolygons(turf_polygon, "#000"));
    turf_polygons.push(turf_polygon);
  } else {
    let union = turf_polygon;

    for (let i = 0; i < intersects.length; i++) {
      union = turf.union(union, turf_polygons[intersects[i]])
    }

    for (let i of intersects.sort().reverse()) {
      turf_polygons.splice(i, 1);
      polygons[i].destroy();
      polygons.splice(i, 1);
    }

    polygons.push(addPolygons(union, "#000"));
    turf_polygons.push(union);
  }
  layer.batchDraw();
  console.log("Polygon, Overlap length: " + polygons.length + " - " + overlapPolygons.length);
}

function cutIntersection(index, cut_turf_polygon){
  let difference = turf.difference(turf_polygons[index], cut_turf_polygon);
  let len = difference.geometry.coordinates.length;
  polygons[index].destroy();

  if (len > 1) {
    for (let j = 0; j < len; j++) {
      let split_poly = turf.polygon(difference.geometry.coordinates[j]);
      if (j === 0) {
        polygons[index] = addPolygons(split_poly, "#000");
        turf_polygons[index] = split_poly;
      } else {
        polygons.push(addPolygons(split_poly, "#000"));
        turf_polygons.push(split_poly);
      }
    }
  } else {
    polygons[index] = addPolygons(difference, "#000");
    turf_polygons[index] = difference;
  }
}

export function DeletePolygon() {
  if (currentPolygon.length < 3)
    return;

  let coordinates = [[...currentPolygon, currentPolygon[0]]];
  let turf_polygon = turf.polygon(coordinates);
  currentPolygon = []
  if (nextPolygon != null) {
    nextPolygon.destroy();
  }
  let inside = [];
  let intersect = [];
  let overlayed = [];

  for (let i = 0; i < turf_polygons.length; i++) {
    if (turf.booleanContains(turf_polygon, turf_polygons[i])) {
      inside.push(i);
      continue;
    }

    if (turf.booleanContains(turf_polygons[i], turf_polygon)) {
      overlayed.push(i)
      continue;
    }

    if (turf.booleanOverlap(turf_polygon, turf_polygons[i])) {
      intersect.push(i);
    }
  }

  console.log("inside, intersect, overlap length: " + inside.length + " - " + intersect.length + " - " + overlayed.length);

  for (let i of intersect) {
    cutIntersection(i, turf_polygon);
  }

  for (let i of inside.sort().reverse()) {
    turf_polygons.splice(i, 1);
    polygons[i].destroy();
    polygons.splice(i, 1);
  }

  if (overlayed.length > 0) {
    let overlapping = addPolygons(turf_polygon, "#00000000");
    overlapping.moveToTop();
    overlapPolygons.push(overlapping);
    overlapTurfPolygons.push(turf_polygon);
  }

  let destroyOverlapPolygons = [];

  for (let i = 0; i < overlapTurfPolygons.length; i++) {
    let overlap = false;
    for (let j = 0; j < turf_polygons.length; j++) {
      if (turf.booleanContains(turf_polygons[j], overlapTurfPolygons[i])) {
        overlap = true;
        break;
      }
      if(turf.booleanOverlap(turf_polygons[j], overlapTurfPolygons[i])){
        cutIntersection(j, overlapTurfPolygons[i]);
      }
    }
    if (!overlap) {
      destroyOverlapPolygons.push(i);
    }
  }

  for (let i of destroyOverlapPolygons.sort().reverse()) {
    overlapTurfPolygons.splice(i, 1);
    overlapPolygons[i].destroy();
    overlapPolygons.splice(i, 1);
  }

  console.log("Polygon, Overlap length: " + polygons.length + " - " + overlapPolygons.length);
  layer.batchDraw();
}

//helper functions
function addPolygons(turf, color) {
  let konva_line = turf_to_Konva(turf);

  konva_line.fill(color);
  konva_line.stroke(color);
  layer.add(konva_line);

  return konva_line;
}

function addPointToPolygon(point) {
  currentPolygon.push(point);
}

function turf_to_Konva(turf_poylgon) {
  let arr = turf_poylgon.geometry.coordinates[0];

  arr = JSON.parse(JSON.stringify(arr));
  arr = arr.splice(0, arr.length - 1);

  return new Konva.Line({
    points: arr.flat(),
    closed: true,
    strokeWidth: 1,
  });
}

//draw temporary polygon
function showNextPoint(point) {
  let points = JSON.parse(JSON.stringify(currentPolygon));

  points.push(point);

  if (nextPolygon != null) {
    nextPolygon.destroy();
  }

  nextPolygon = new Konva.Line({
    points: points.flat(),
    fill: (insert ? "#888888" : "#aa5555"),
    stroke: (insert ? "#888888" : "#aa5555"),
    closed: true,
    strokeWidth: 1,
  });

  layer.add(nextPolygon);
  layer.batchDraw();
}

function pointToArray(point) {
  return [point.x, point.y];
}
