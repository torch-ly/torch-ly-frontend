<template>
  <div>
    <BrushSelector></BrushSelector>

    <hr class="my-4">

    <div class="flex flex-row mt-2">
      <label class="switch">
        <input type="checkbox" @change="onEraserSwitch" v-model="erasing">
        <span class="slider round"></span>
      </label>
      <div class="flex items-center ml-2">Eraser</div>
    </div>

    <button class="submit-button active:submit-button-active mt-2" @click="clearDrawingLayer">
      Clear all
    </button>

    <hr class="my-4">

    <div class="flex flex-col">
      <div class="flex flex-row mt-2">
        <label class="switch">
          <input type="checkbox" @change="onShapeSnapToGridSwitch" v-model="snapToGrid">
          <span class="slider round"></span>
        </label>
        <div class="flex items-center ml-2">Snap Shapes To Grid</div>
      </div>

      <div class="flex flex-row mt-2">
        <label class="switch">
          <input type="checkbox" @change="onRectangleSwitch" v-model="rectangle">
          <span class="slider round"></span>
        </label>
        <div class="flex items-center ml-2">Rectangle</div>
      </div>

      <div class="flex flex-row mt-2">
        <label class="switch">
          <input type="checkbox" @change="onCircleSwitch" v-model="circle">
          <span class="slider round"></span>
        </label>
        <div class="flex items-center ml-2">Circle</div>
      </div>

    </div>
  </div>
</template>
<script>
import BrushSelector from "./BrushSelector";
import {mapActions} from 'vuex';
import tools from '@/enums/tools/tools';
import {clearAllDrawings} from "@/plugins/backendComunication/drawing";
import drawTools from "@/enums/tools/drawTools";

export default {
  data: () => {
    return {
      tools,
      drawTools,
      erasing: false,
      snapToGrid: false,
      rectangle: false,
      circle: false
    }
  },
  components: {
    BrushSelector
  },
  methods: {
    ...mapActions({
      setTool: "manu/setTool"
    }),
    clearDrawingLayer() {
      clearAllDrawings();
    },
    onShapeSnapToGridSwitch() {
      if (this.$store.state.manu.freeDrawing.snapToGrid) {
        this.$store.commit("manu/setDrawingObjectSnapToGrid", false);
      } else {
        this.$store.commit("manu/setDrawingObjectSnapToGrid", true);
      }
    },
    onEraserSwitch() {
      if (this.currentTool !== this.drawTools.eraser) {
        this.setTool(this.drawTools.eraser);
      } else {
        this.setTool(this.drawTools.pen);
      }
    },
    onRectangleSwitch() {
      if (this.currentTool !== this.drawTools.rectangle) {
        this.setTool(this.drawTools.rectangle);
      } else {
        this.setTool(this.drawTools.pen);
      }
    },
    onCircleSwitch() {
      if (this.currentTool !== this.drawTools.circle) {
        this.setTool(this.drawTools.circle);
      } else {
        this.setTool(this.drawTools.pen);
      }
    }
  },
  computed: {
    drawing() {
      return this.$store.state.manu["drawing"];
    },
    currentTool() {
      return this.$store.state.manu["drawTool"];
    },
    snapToGridActive() {
      return this.$store.state.manu.freeDrawing.snapToGrid;
    }
  },
  watch: {
    currentTool() {
      this.erasing = false;
      this.rectangle = false;
      this.circle = false;

      if (this.currentTool == this.tools.eraser) {
        this.erasing = true;
      }
      if (this.currentTool == this.tools.rectangle) {
        this.rectangle = true;
      } else if (this.currentTool == this.tools.circle) {
        this.circle = true;
      }
    },
    snapToGridActive() {
      this.snapToGrid = this.snapToGridActive;
    }
  }
}
</script>
<style scoped lang="scss">
@import "assets/css/scheme";

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f32121;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 3px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #20880a;
}

input:focus + .slider {
  box-shadow: 0 0 1px #20880a;
}

input:checked + .slider:before {
  -webkit-transform: translateX(19px);
  -ms-transform: translateX(19px);
  transform: translateX(19px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
