import {stage, store} from "../../main";
import {getRelativePointerPosition} from "../layerFunctions";
import * as turf from "@turf/turf";

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
  let allUnions = [];
  for(let i = 0; i < turf_polygons.length; i++){
    let a = turf.intersect(turf_polygon, turf_polygons[i]);
    if(a !== null){
      allUnions.push(i);
    }
  }
  if(allUnions.length === 0){
    console.log("no overlaps");
    addPolygons(turf_polygon, "#000");
  }else{
    let union = turf_polygon;
    for(let i = 0; i < allUnions.length; i++){
      union = turf.union(union, turf_polygons[allUnions[i]])

    }
    for(let i of allUnions.sort().reverse()){
      turf_polygons.splice(i, 1);
      polygons[i].destroy();
      polygons.splice(i, 1);
    }
    addPolygons(union, "#000");
  }
}

function addPolygons(turf, color){
  let konva_line = turf_to_Konva(turf);
  konva_line.fill(color);
  konva_line.stroke(color);
  polygons.push(konva_line);
  turf_polygons.push(turf);
  layer.add(konva_line);
  layer.batchDraw();
  console.log("length: " + polygons.length);
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
  if(!insert)
    return;
  let points = JSON.parse(JSON.stringify(currentPolygon));
  points.push(point);
  if(nextPolygon != null){
    nextPolygon.destroy();
  }
  nextPolygon = new Konva.Line({
    points: points.flat(),
    fill: "#888888",
    stroke: "#888888",
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
