import {stage} from "../logic/stage/main";
import tools from '@/enums/tools';
import {clearTransformerNodes} from "../logic/stage/layers/transformer";

export const state = () => ({
  currentTool: tools.DEFAULT,

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
  setDrawingObjectSnapToGrid(state) {
    state.freeDrawing.snapToGrid = !state.freeDrawing.snapToGrid;
  },
  setMeasureLength(state, length) {
    state.measureDetails.length = length;
  },
  setMeasureDetails(state, detail) {
    state.measureDetails.unitEnding = detail.unitEnding;
    state.measureDetails.boxSize = detail.boxSize
  },
  setDrawingStrokeWidth(state, width) {
    state.freeDrawing.strokeWidth = width;
  }
}

export const actions = {
  setTool ({ commit, state }, tool) {
    clearTransformerNodes();
    commit("setTool", tool)
  }
}
