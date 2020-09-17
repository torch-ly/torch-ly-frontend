<template>
  <div>
    <BrushSelector></BrushSelector>

    <hr class="my-4">

    <div class="flex flex-row mt-2">
      <label class="switch">
        <input type="checkbox" @change="changeEraserState" :checked="true">
        <span class="slider round"></span>
      </label>
      <div class="flex items-center ml-2">Eraser</div>
    </div>

    <button class="submit-button active:submit-button-active mt-2" @click="clearDrawingLayer">
      Clear all
    </button>

    <hr class="my-4">

    <div class="flex flex-col">
      <button v-on:click="onShapeSnapToGridSwitch">Snap Shapes To Grid</button>

      <button v-on:click="setTool(tools.circle)">Circle</button>

      <button v-on:click="setTool(tools.rectangle)">Rectangle</button>
    </div>
  </div>
</template>
<script>
import BrushSelector from "./BrushSelector";
import {clearDrawing} from "../../../logic/stage/layers/mouseTools/main";
import {mapActions} from 'vuex';
import tools from '@/enums/tools';
import {store} from "@/logic/stage/main";

export default {
  data: () => {
    return {
      tools
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
      clearDrawing();
    },
    onShapeDrawingClick(object) {
      if (store.state.manu.freeDrawing.drawingObject == '') {
        this.$store.commit("manu/setDrawingObject", object);
      } else {
        this.$store.commit("manu/setDrawingObject", '');
      }
    },
    onShapeSnapToGridSwitch() {
      this.$store.commit("manu/setDrawingObjectSnapToGrid");
    },
    changeEraserState() {
      if (this.currentTool === this.tools.pen) {
        this.setTool(this.tools.eraser);
      } else if (this.currentTool === this.tools.eraser) {
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
  background-color: #20880a;
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
  background-color: #f32121;
}

input:focus + .slider {
  box-shadow: 0 0 1px #f32121;
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
