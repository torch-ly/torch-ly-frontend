import tools from '@/enums/tools/tools';
import {clearTransformerNodes} from "../logic/stage/functions/transformer";
import drawTools from "@/enums/tools/drawTools";

export const state = () => ({
  currentTool: tools.DEFAULT,
  drawTool: null,

  layer: "Token",

  freeDrawing: {
    color: "#000000",
    strokeWidth: 3,
    drawingObject: "",
    snapToGrid: false
  },

  measureDetails: {
    length: 0,
    unitEnding: "ft",
    boxSize: "5"
  }
})

export const mutations = {
  setTool(state, tool) {
    state.currentTool = tool;
  },
  setDrawTool(state, tool) {
    state.drawTool = tool;
  },
  setDrawingColor(state, color) {
    state.freeDrawing.color = color;
  },
  setLayer(state, layer) {
    state.layer = layer;
  },
  setDrawingObject(state, object) {
    state.erase = false;
    state.freeDrawing.drawingObject = object;
  },
  setDrawingObjectSnapToGrid(state, value) {
    state.freeDrawing.snapToGrid = value;
  },
  setMeasureLength(state, length) {
    state.measureDetails.length = length;
  },
  setMeasureDetails(state, detail) {
    state.measureDetails.unitEnding = detail.unitEnding;
    state.measureDetails.boxSize = detail.boxSize
  },
  setDrawingStrokeWidth(state, width) {
    state.freeDrawing.strokeWidth = parseInt(width);
  }
}

export const actions = {
  setTool({commit, state}, tool) {

    clearTransformerNodes();
    if (JSON.stringify(drawTools).includes(tool)) {
      commit("setTool", tools.draw);
      commit("setDrawTool", tool);
    } else {
      commit("setDrawTool", null)
      commit("setTool", tool);
    }
  },
}
