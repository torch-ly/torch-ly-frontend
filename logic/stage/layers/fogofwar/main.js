
import {stage, store} from "../../main";
import {copy, getRelativePointerGridRectangle, getRelativePointerPosition} from "../layerFunctions";
import {blockSnapSize} from "../grid/main";
import deepcopy from "deepcopy";
import * as turf from "@turf/turf";
import {setFogOfWar} from "~/plugins/backendComunication/fogOfWar";


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
      currentPolygon = [];
      point.x += smallerRect;
      point.y += smallerRect;
      currentPolygon.push(pointToArray(point))
      point.x += blockSnapSize - (2 * smallerRect);
      currentPolygon.push(pointToArray(point));
      point.y += blockSnapSize - (2 * smallerRect);
      currentPolygon.push(pointToArray(point));
      point.x -= blockSnapSize - (2 * smallerRect);
      currentPolygon.push(pointToArray(point));
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
//send data via graphql
export function syncronize() {
  let polygons = [];
  for (let i = 0; i < turf_polygons.length; i++) {
    polygons.push(turf_polygons[i].geometry.coordinates[0]);
  }
  setFogOfWar(polygons);
}

//receive data via graphql
export function recieveSyncronize(p_polygons) {
  if(!store.state.authentication.gm)
    return;
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
//toggle insert / delete mode
export function toggleInsert() {
  currentPolygon = []

  if (nextPolygon != null) {
    nextPolygon.destroy();
  }

  layer.batchDraw();
  insert = !insert;
}

//toggle snapToGrid mode
export function toggleSnapToGrid() {
  currentPolygon = []

  if (nextPolygon != null) {
    nextPolygon.destroy();
  }

  layer.batchDraw();
  snapToGrid = !snapToGrid;
}

//insert and delete
//Insert currentPolygon
export function InsertPolygon() {
  //no lines or points
  if (currentPolygon.length < 3)
    return;
  let coordinates = [[...currentPolygon, currentPolygon[0]]];
  let turf_polygon = turf.polygon(coordinates);
  currentPolygon = []

  //destroy preview polygon
  if (nextPolygon != null) {
    nextPolygon.destroy();
  }

  let intersects = [];

  //check for overlapping polygons
  for (let i = 0; i < turf_polygons.length; i++) {
    if (turf.booleanOverlap(turf_polygon, turf_polygons[i]) || turf.booleanContains(turf_polygon, turf_polygons[i]) ||
      turf.booleanContains(turf_polygons[i], turf_polygon)) {
      intersects.push(i);
    }
  }


  if (intersects.length === 0) {
    //No overlaps found
    polygons.push(addPolygons(turf_polygon, "#000"));
    turf_polygons.push(turf_polygon);
  } else {
    //build a union of all overlapping polygons
    let union = turf_polygon;

    for (let i = 0; i < intersects.length; i++) {
      union = turf.union(union, turf_polygons[intersects[i]])
    }

    //delete old polygons
    for (let i of intersects.sort().reverse()) {
      turf_polygons.splice(i, 1);
      polygons[i].destroy();
      polygons.splice(i, 1);
    }

    //add new union
    polygons.push(addPolygons(union, "#000"));
    turf_polygons.push(union);
  }
  layer.batchDraw();
  console.log(polygons);
  console.log(turf_polygons);
}

//cut intersection of polygon with index "index" and the cut_polygon and draw it
function cutIntersection(index, cut_turf_polygon) {
  let difference = turf.difference(turf_polygons[index], cut_turf_polygon);
  let len = difference.geometry.coordinates.length;
  if (polygons[index] != null)
    polygons[index].destroy();

  if (len > 1) {
    //check if intersection results in multiple polygons
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

//Delete current polygon
export function DeletePolygon() {
  //ignore points and lines
  if (currentPolygon.length < 3)
    return;

  let coordinates = [[...currentPolygon, currentPolygon[0]]];
  let turf_polygon = turf.polygon(coordinates);
  currentPolygon = []

  //destroy preview polygon
  if (nextPolygon != null) {
    nextPolygon.destroy();
  }

  //check all polygons for intersections, within and contains
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

  //cut intersections of all intersecting polygons
  for (let i of intersect) {
    cutIntersection(i, turf_polygon);
  }

  //process all within polygons
  try {
    for (let i of overlayed) {

      //destroy old polygon
      polygons[i].destroy();

      //split polygon
      //search for split lines
      let innerPoints = [turf_polygon.geometry.coordinates[0][0], turf_polygon.geometry.coordinates[0][1]];
      let firstline;
      let secondLine;
      let firstindex;
      let secondindex;

      let coordinates = deepcopy(turf_polygons[i].geometry.coordinates[0]).splice(0, turf_polygons[i].geometry.coordinates[0].length - 1);

      //calculate first point on outer polygon
      for (let j = 0; j < coordinates.length; j++) {
        firstline = turf.lineString([innerPoints[0], coordinates[j]]);
        if (turf.booleanContains(turf_polygons[i], firstline)) {
          firstindex = j;
          break;
        }
      }

      //calculate second point on outer polygon
      for (let j = (firstindex + 1); (j % coordinates.length !== firstindex); j++) {
        let index_j = j % coordinates.length;
        secondLine = turf.lineString([innerPoints[1], coordinates[index_j]]);
        if (turf.booleanContains(turf_polygons[i], secondLine) && turf.booleanDisjoint(firstline, secondLine)) {
          secondindex = index_j;
          break;
        }
      }

      //make sure first point comes before second point
      if (firstindex > secondindex) {
        let firstSplice = coordinates.splice(0, firstindex);
        secondindex = firstSplice.length - 1 + secondindex;
        firstindex = 0;
        coordinates = [...coordinates, ...firstSplice];
      }

      //splice coordinates
      let splice = coordinates.splice(firstindex, secondindex - firstindex + 1);
      let firstpolygon = turf.polygon([[...splice, innerPoints[1], innerPoints[0], splice[0]]]);
      let secondSplice = coordinates.splice(firstindex, coordinates.length - firstindex);

      //setup coodinates for second polygon
      //cant use spread operator for some reason
      let secondcoordinates = coordinates;
      secondcoordinates.push(splice[0]);
      secondcoordinates.push(innerPoints[0]);
      secondcoordinates.push(innerPoints[1]);
      secondcoordinates.push(splice[splice.length - 1]);
      secondcoordinates = [...secondcoordinates, ...secondSplice];
      secondcoordinates.push(coordinates[0]);
      let secondpolygon = turf.polygon([secondcoordinates]);

      //cut intersection of both polygons
      turf_polygons[i] = firstpolygon;
      cutIntersection(i, turf_polygon);
      turf_polygons.push(secondpolygon);
      //push null so array entry exists
      polygons.push(null);
      cutIntersection(polygons.length - 1, turf_polygon);
    }
  }catch (e){
    console.log("Error in overlap");
    return;
  }
  //delete all polygons inside removing polygon
  for (let i of inside.sort().reverse()) {
    turf_polygons.splice(i, 1);
    polygons[i].destroy();
    polygons.splice(i, 1);
  }

  layer.batchDraw();
  console.log(polygons);
  console.log(turf_polygons);
}

//helper functions
//get konva polygon from turf polygon and draw it with color
function addPolygons(turf, color) {
  let konva_line = turf_to_Konva(turf);

  konva_line.fill(color);
  konva_line.stroke(color);
  layer.add(konva_line);

  return konva_line;
}

//add a point to the current polygon
function addPointToPolygon(point) {
  currentPolygon.push(point);
}

//calculate a Konva polygon from a turf polygon
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
