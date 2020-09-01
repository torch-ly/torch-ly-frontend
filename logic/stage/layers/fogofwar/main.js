import {stage, store} from "../../main";
import {getRelativePointerPosition} from "../layerFunctions";
import * as turf from "@turf/turf";
import {setFogOfWar} from "../../../../plugins/backendComunication";

let layer;
let polygons = [];
let turf_polygons = [];
let currentPolygon = [];
let nextPolygon;
let insert = true;

export function draw(player){
  layer = player;
  addFogOfWarListener();
}

export function DeletePolygon() {
  try {
    let coordinates = [[...currentPolygon, currentPolygon[0]]];
    let turf_polygon = turf.polygon(coordinates);
    currentPolygon = []
    if (nextPolygon != null) {
      nextPolygon.destroy();
    }
    let inside = [];
    let intersect = [];

    for (let i = 0; i < turf_polygons.length; i++) {
      if (turf.booleanContains(turf_polygon, turf_polygons[i])) {
        inside.push(i);
        continue;
      }
      if (turf.booleanOverlap(turf_polygon, turf_polygons[i])) {
        intersect.push(i);
      }
    }

    for (let i of intersect) {
      let difference = turf.difference(turf_polygons[i], turf_polygon);
      let len = difference.geometry.coordinates.length;
      polygons[i].destroy();
      if (len > 1) {
        for (let j = 0; j < len; j++) {
          let split_poly = turf.polygon(difference.geometry.coordinates[j]);
          if (j === 0) {
            polygons[i] = addPolygons(split_poly, "#000");
            turf_polygons[i] = split_poly;
          } else {
            polygons.push(addPolygons(split_poly, "#000"));
            turf_polygons.push(split_poly);
          }
        }
      } else {
        polygons[i] = addPolygons(difference, "#000");
        turf_polygons[i] = turf_polygons[i];
      }
    }

  for(let i of inside.sort().reverse()){
    turf_polygons.splice(i, 1);
    polygons[i].destroy();
    polygons.splice(i, 1);
  }

  }catch(e){
    alert("Bitte neu zeichen")
  }
  console.log(polygons.length)
  layer.batchDraw();
}

export function syncronize(){
  let polygons = [];
  for(let i = 0; i < turf_polygons.length; i++){
    polygons.push(turf_polygons[i].geometry.coordinates[0]);
  }
  setFogOfWar(polygons);
}

export function recieveSyncronize(p_polygons) {
  //if(!dm)
  //  return;
  turf_polygons = [];
  for(let poly in polygons){
    poly.destroy();
  }
  for(let coordinates of p_polygons){
    let turf_polygon = turf.polygon([coordinates]);
    polygons.push(addPolygons(turf_polygon, "#000"));
    turf_polygons.push(turf_polygon);
  }
  layer.draw();
}

export function toggleInsert() {
  currentPolygon = []
  if(nextPolygon != null){
    nextPolygon.destroy();
  }
  layer.batchDraw();
  insert = !insert;
}

export function InsertPolygon(){
  let coordinates = [[...currentPolygon, currentPolygon[0]]];
  let turf_polygon = turf.polygon(coordinates);
  currentPolygon = []
  if(nextPolygon != null){
    nextPolygon.destroy();
  }
  let intersects = [];
  for(let i = 0; i < turf_polygons.length; i++){
    if(turf.booleanOverlap(turf_polygon, turf_polygons[i]) || turf.booleanContains(turf_polygon, turf_polygons[i]) ||
      turf.booleanContains(turf_polygons[i], turf_polygon)){
      intersects.push(i);
    }
  }
  if(intersects.length === 0){
    console.log("no overlaps");
    polygons.push(addPolygons(turf_polygon, "#000"));
    turf_polygons.push(turf_polygon);
  }else {
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
    console.log(polygons.length)
    layer.batchDraw();
}

function addPolygons(turf, color){
  let konva_line = turf_to_Konva(turf);
  konva_line.fill(color);
  konva_line.stroke(color);
  layer.add(konva_line);
  return konva_line;
}

function turf_to_Konva(turf_poylgon){
  let arr = turf_poylgon.geometry.coordinates[0];
  arr = JSON.parse(JSON.stringify(arr));
  arr = arr.splice(0, arr.length - 1);
  return new Konva.Line({
    points: arr.flat(),
    closed: true,
    strokeWidth: 1,
  });
}

function showNextPoint(point) {
  let points = JSON.parse(JSON.stringify(currentPolygon));
  points.push(point);
  if(nextPolygon != null){
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

function addPointToPolygon(point){
  currentPolygon.push(point);
}


function addFogOfWarListener() {
  stage.on('mouseup', () => {
    if(!store.state.manu.fogOfWar)
      return;
    let point_x_y = getRelativePointerPosition(stage);
    addPointToPolygon([point_x_y.x, point_x_y.y])
  })
  stage.on('mousemove', () => {
    if(!store.state.manu.fogOfWar)
      return;
    let point_x_y = getRelativePointerPosition(stage);
    showNextPoint([point_x_y.x, point_x_y.y])
  })
}
