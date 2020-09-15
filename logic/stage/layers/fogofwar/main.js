import {stage, store} from "../../main";
import {getRelativePointerGridRectangle, getRelativePointerPosition} from "../layerFunctions";
import {blockSnapSize} from "../grid/main";
import deepcopy from "deepcopy";
import * as turf from "@turf/turf";
import {setFogOfWar} from "~/plugins/backendComunication/fogOfWar";


let layer;
let polygons = [];
let currentPolygon = [];
let nextPolygon;
let insert = true;
let ununionizable = [];
let transparent = false;

let snapToGrid = false;

export function setFogOfWarLayer(player) {
  layer = player;
}

export function addFogOfWarListener() {
  stage.on('mouseup touchend', (e) => {
    let point_x_y = getRelativePointerPosition(stage);
    if (snapToGrid) {
      let point = getRelativePointerGridRectangle();
      let insertF = (insert && e.evt.button === 0);
      let smallerRect = (insertF ? 0.1 : -0.1);
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
      (insertF ? InsertPolygon() : DeletePolygon())
    } else {
      addPointToPolygon([point_x_y.x, point_x_y.y]);
      if(e.evt.button === 2){
        (insert ? InsertPolygon() : DeletePolygon());
      }
    }
  });

  stage.on('mousemove touchmove', () => {
    if (snapToGrid)
      return;
    let point_x_y = getRelativePointerPosition(stage);
    showNextPoint([point_x_y.x, point_x_y.y])
  });
}

export function destroyCurrentlyDrawing(){
  currentPolygon = [];

  if(nextPolygon != null){
    nextPolygon.destroy();
  }

  nextPolygon = null;
}

//graphql
//send data via graphql
export function syncronize() {
  let polygons = [];
  for (let i = 0; i < this.polygons.length; i++) {
    polygons.push(this.polygons[i].points());
  }
  setFogOfWar([polygons, ununionizable]);
}

export function toggleTransparent(){
  transparent = !transparent;
  for(let poly of polygons){
    poly.fill(transparent ? "rgba(0,0,0,0.13)" : "#000000");
  }
  layer.batchDraw();
}

//receive data via graphql
export function recieveSyncronize(p_polygons) {

  for (let poly of polygons) {
    poly.destroy();
  }

  for (let coordinate of p_polygons[0]) {
    let konva_line = new Konva.Line({
      id: ID(),
      points: coordinate,
      closed: true,
      strokeWidth: 3,
      listening: (!store.state.authentication.gm),
    });
    konva_line.fill(transparent ? "rgba(0,0,0,0.13)" : "#000");
    konva_line.stroke("#000000");
    layer.add(konva_line);
    polygons.push(konva_line);
  }

  ununionizable = p_polygons[1];

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

export function resetFogOfWar() {
  polygons = [];
  currentPolygon = [];
  nextPolygon = null;
  ununionizable = [];

  layer.destroyChildren();
  layer.batchDraw();
}

function turf_from_konva(konva_polygon) {
  let coordinates = [];
  let point = [];
  for (let i = 0; i < konva_polygon.points().length; i++) {
    if (i % 2 === 0) {
      point = [];
      point.push(konva_polygon.points()[i]);
    } else {
      point.push(konva_polygon.points()[i]);
      coordinates.push(deepcopy(point));
    }
  }
  coordinates.push(coordinates[0]);
  return turf.polygon([coordinates]);
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
  let intersect_polygons = [];

  //check for overlapping polygons
  for (let i = 0; i < polygons.length; i++) {
    if(ununionizable.includes(polygons[i].id())){
      continue;
    }
    let overlap_polygon = turf_from_konva(polygons[i]);
    if (turf.booleanOverlap(turf_polygon, overlap_polygon) || turf.booleanContains(turf_polygon, overlap_polygon) ||
      turf.booleanContains(overlap_polygon, turf_polygon)) {
      intersects.push(i);
      intersect_polygons.push(overlap_polygon);
    }
  }

  if (intersects.length === 0) {
    //No overlaps found
    polygons.push(addPolygons(turf_polygon, (transparent ? "rgba(0,0,0,0.13)" : "#000")));
  } else {
    //build a union of all overlapping polygons
    let union = turf_polygon;

    for (let i = 0; i < intersects.length; i++) {
      union = turf.union(union, intersect_polygons[i])
    }

    //delete old polygons
    for (let i of intersects.sort().reverse()) {
      polygons[i].destroy();
      polygons.splice(i, 1);
    }

    //add new union
    polygons.push(addPolygons(union, (transparent ? "rgba(0,0,0,0.13)" : "#000")));
  }
  layer.batchDraw();
}

//cut intersection of polygon with index "index" and the cut_polygon and draw it
function cutIntersection(index, cut_turf_polygon) {
  let difference = turf.difference(turf_from_konva(polygons[index]), cut_turf_polygon);
  let len = difference.geometry.coordinates.length;
  if (polygons[index] != null)
    polygons[index].destroy();
  if (len > 1) {
    //check if intersection results in multiple polygons
    for (let j = 0; j < len; j++) {
      let split_poly = turf.polygon(difference.geometry.coordinates[j]);
      if (j === 0) {
        polygons[index] = addPolygons(split_poly, (transparent ? "rgba(0,0,0,0.13)" : "#000"));
      } else {
        polygons.push(addPolygons(split_poly, (transparent ? "rgba(0,0,0,0.13)" : "#000")));
      }
    }
  } else {
    polygons[index] = addPolygons(difference, (transparent ? "rgba(0,0,0,0.13)" : "#000"));
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

  for (let i = 0; i < polygons.length; i++) {
    let check_polygon = turf_from_konva(polygons[i]);
    if (turf.booleanContains(turf_polygon, check_polygon)) {
      inside.push(i);
      continue;
    }

    if (turf.booleanContains(check_polygon, turf_polygon)) {
      overlayed.push(i)
      continue;
    }

    if (turf.booleanOverlap(turf_polygon, check_polygon)) {
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

      let overlayed_turf_polygon = turf_from_konva(polygons[i]);

      let b_ununionizable = ununionizable.includes(polygons[i].id());
      removeElement(ununionizable, polygons[i].id());

      //destroy old polygon
      polygons[i].destroy();

      //split polygon
      //search for split lines
      let innerPoints = [turf_polygon.geometry.coordinates[0][0], turf_polygon.geometry.coordinates[0][1]];
      let firstcords;
      let firstindex;
      let secondindex;

      let coordinates = deepcopy(overlayed_turf_polygon.geometry.coordinates[0]).splice(0, overlayed_turf_polygon.geometry.coordinates[0].length - 1);

      //calculate first point on outer polygon
      for (let j = 0; j < coordinates.length; j++) {
        if (lineInsidePolygon(polygons[i].points(), [innerPoints[0], coordinates[j]], coordinates[j])) {
          firstcords = [innerPoints[0], coordinates[j]];
          firstindex = j;
          break;
        }
      }

      //calculate second point on outer polygon
      for (let j = (firstindex + 1); (j % coordinates.length !== firstindex); j++) {
        let index_j = j % coordinates.length;
        if (lineInsidePolygon(polygons[i].points(), [innerPoints[1], coordinates[index_j]], coordinates[index_j]) &&
          !linescross(firstcords[0], firstcords[1], innerPoints[1], coordinates[index_j])) {
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
      polygons[i] = addPolygons(firstpolygon, (transparent ? "rgba(0,0,0,0.13)" : "#000"));
      cutIntersection(i, turf_polygon);
      if(b_ununionizable){
        ununionizable.push(polygons[i].id());
      }
      let second_konva = addPolygons(secondpolygon, (transparent ? "rgba(0,0,0,0.13)" : "#000"));
      polygons.push(second_konva);
      cutIntersection(polygons.length - 1, turf_polygon);
      ununionizable.push(polygons[polygons.length-1].id());
    }
  }catch (e){
    console.log("Error in overlap");
    console.log(e);
    return;
  }
  //delete all polygons inside removing polygon
  for (let i of inside.sort().reverse()) {
    removeElement(ununionizable, polygons[i].id())
    polygons[i].destroy();
    polygons.splice(i, 1);
  }

  layer.batchDraw();
}

//helper functions
//get konva polygon from turf polygon and draw it with color
function addPolygons(turf, color) {
  let konva_line = turf_to_Konva(turf);

  konva_line.fill(color);
  konva_line.stroke("#000000");
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

  arr = deepcopy(arr);
  arr = arr.splice(0, arr.length - 1);

  return new Konva.Line({
    id: ID(),
    points: arr.flat(),
    closed: true,
    strokeWidth: 3,
    listening: (!store.state.authentication.gm),
  });
}

const ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

//polygon_coordinates first and last not matching, line coordinates = [x, y]
function lineInsidePolygon(polygon_coordinates, line_coordinates, cords_to_splice) {
  let cords = deepcopy(polygon_coordinates);
  for(let i = 0; i < cords.length-1; i++){
    if(cords[i] === cords_to_splice[0] && cords[i+1] === cords_to_splice[1]){
      cords.splice(i, 2);
      if(i !== 0){
        cords.push(cords[0]);
        cords.push(cords[1]);
      }
    }
  }
  for(let i = 0; i < cords.length - 2; i += 2){
    if(linescross([cords[i], cords[i+1]], [cords[i+2], cords[i+3]], line_coordinates[0], line_coordinates[1])){
      return false;
    }
  }
  return true;
}

function linescross(p, q, r, s){
  let d1 = direction(p,q,r);
  let d2 = direction(p,q,s);
  if (d1 === 0 && onSegment(p,q,r)) return true;
  if (d2 === 0 && onSegment(p,q,s)) return true;
  if((d1>0&&d2>0)||(d1<0&&d2<0))return false;
  let d3 = direction(r,s,p);
  let d4 = direction(r,s,q);
  if (d3 === 0 && onSegment(r,s,p)) return true;
  if (d4 === 0 && onSegment(r,s,q)) return true;
  if((d3>0&&d4>0)||(d3<0&&d4<0)) return false;
  return !(d1 === d2 && d2 === d3 && d3 === d4 && d4 === 0);
}

function det(a, b) {  return a[0]*b[1] - a[1]*b[0]; }

function direction(p1, q1, r1) {
  let a = [q1[0]-p1[0], q1[1]-p1[1]];
  let b = [r1[0]-q1[0], r1[1]-q1[1]];
  return det(a,b);
}

function onSegment(p,q, x) {
  let topright = [Math.max(p[0],q[0]), Math.max(p[1],q[1])];
  let botleft = [Math.min(p[0],q[0]), Math.min(p[1],q[1])];
  return (x[0] <= topright[0])&&(x[1] <= topright[1])&& (botleft[0] <= x[0])&&(botleft[1] <= x[1]);
}

//draw temporary polygon
function showNextPoint(point) {
  let points = deepcopy(currentPolygon);

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

function removeElement(array, element){
  const index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
}

function pointToArray(point) {
  return [point.x, point.y];
}
