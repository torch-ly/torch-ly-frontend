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

    <button class="submit-button active:submit-button-active mt-2" @click="clearAllDrawings">
      Clear all
    </button>

    <hr class="my-4">

    <div class="flex flex-col">

      <ToggleBox
        title="Snap Shapes To Grid"
        v-on:update:checked="$store.commit('manu/setDrawingObjectSnapToGrid', $event)"
      />

      <!--div class="flex flex-row mt-2">
        <label class="switch">
          <input type="checkbox" @change="onRectangleSwitch" v-model="rectangle">
          <span class="slider round"></span>
        </label>
        <div class="flex items-center ml-2">Rectangle</div>
      </div

      <div class="flex flex-row mt-2">
        <label class="switch">
          <input type="checkbox" @change="onCircleSwitch" v-model="circle">
          <span class="slider round"></span>
        </label>
        <div class="flex items-center ml-2">Circle</div>
      </div>

      -->

      <ToggleBox
        title="Rectangle"
        v-bind:checked.sync="forms.rectangle"
        v-on:update:checked="$event ? setTool(drawTools.rectangle) : setTool(drawTools.pen)"
      />

      <ToggleBox
        title="Circle"
        v-bind:checked.sync="forms.circle"
        v-on:update:checked="$event ? setTool(drawTools.circle) : setTool(drawTools.pen)"
      />

    </div>
  </div>
</template>
<script>
import BrushSelector from "./BrushSelector";
import ToggleBox from "@/components/gui-components/ToggleBox";
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
      forms: {
        rectangle: false,
        circle: false
      }
    }
  },
  components: {
    BrushSelector,
    ToggleBox
  },
  methods: {
    ...mapActions({
      setTool: "manu/setTool"
    }),
    clearAllDrawings,
    onEraserSwitch() {
      if (this.currentTool !== drawTools.eraser) {
        this.setTool(drawTools.eraser);
      } else {
        this.setTool(drawTools.pen);
      }
    }
  },
  computed: {
    drawing() {
      return this.$store.state.manu["drawing"];
    },
    currentTool() {
      return this.$store.state.manu["drawTool"];
    }
  },
  watch: {
    currentTool(e) {

      //TODO clean up this code
      console.log(e)
      if (e === drawTools.rectangle) {
        this.forms.circle = false;
        this.forms.rectangle = true;
      } else if (e === drawTools.circle) {
        this.forms.rectangle = false;
        this.forms.circle = true;
      }


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
