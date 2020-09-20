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
import tools from '@/enums/tools';
import {store} from "@/logic/stage/main";
import {clearAllDrawings} from "@/plugins/backendComunication/drawing";

export default {
  data: () => {
    return {
      tools,
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
      this.setTool(this.tools.pen);
      clearAllDrawings();
    },
    onShapeDrawingClick(object) {
      if (store.state.manu.freeDrawing.drawingObject == '') {
        this.$store.commit("manu/setDrawingObject", object);
      } else {
        this.$store.commit("manu/setDrawingObject", '');
      }
    },
    onShapeSnapToGridSwitch() {
      if (this.$store.state.manu.freeDrawing.snapToGrid) {
        this.$store.commit("manu/setDrawingObjectSnapToGrid", false);
      } else {
        this.$store.commit("manu/setDrawingObjectSnapToGrid", true);
      }
    },
    onEraserSwitch() {
      if (this.currentTool !== this.tools.eraser) {
        this.setTool(this.tools.eraser);
      } else {
        this.setTool(this.tools.pen);
      }
    },
    onRectangleSwitch() {
      if (this.currentTool !== this.tools.rectangle) {
        this.setTool(this.tools.rectangle);
      } else {
        this.setTool(this.tools.pen);
      }
    },
    onCircleSwitch() {
      if (this.currentTool !== this.tools.circle) {
        this.setTool(this.tools.circle);
      } else {
        this.setTool(this.tools.pen);
      }
    }
  },
  computed: {
    drawing() {
      return this.$store.state.manu["drawing"];
    },
    currentTool() {
      return this.$store.state.manu["currentTool"];
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
