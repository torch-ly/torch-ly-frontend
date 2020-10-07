<template>
  <div>

    <!-- Shows length of last measurement -->
    <p class="text-lg font-bold mb-4">Length: {{ getLength }} </p>

    <!-- Options for changing units and size per square -->
    <AdvancedOptions>
      <input type="number" class="input-field" v-model="boxSize" @change="submitUnitChange">

      <input type="text" class="input-field mt-2" v-model="unitEnding" @change="submitUnitChange">

      <div class="p-2 mt-2" @click="restoreDefault">
        <fa icon="undo" class="mx-auto block"></fa>
      </div>
    </AdvancedOptions>

    <div class="flex flex-row mt-2">
      <div class="flex items-center">
        <label class="switch">
          <input type="checkbox" v-model="circularMeasure" @change="switchCircleMeasure">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="flex items-center ml-2 text-center">Circle measure</div>
    </div>

    <div class="flex flex-row mt-2">
      <div class="flex items-center">
        <label class="switch">
          <input type="checkbox" v-model="coneMeasure" @change="switchConeMeasure">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="flex items-center ml-2 text-center">Cone measure</div>
    </div>

    <button class="submit-button active:submit-button-active mt-2" v-show="savableMeasureToolActive"
            @click="saveMeasureAsPainting">Save as drawing
    </button>

  </div>
</template>

<script>
import {store} from "../../logic/stage/main";
import AdvancedOptions from "../gui-components/AdvancedOptions";
import measureTools from "@/enums/tools/measureTools";
import {mapActions} from "vuex";
import tools from "@/enums/tools/tools";
import {saveAsDrawing} from "~/logic/stage/layers/measure/circleMeasure";

export default {
  data() {
    return {
      tools,
      measureTools,
      boxSize: store.state.manu.measureDetails.boxSize,
      unitEnding: store.state.manu.measureDetails.unitEnding,
      circularMeasure: false,
      coneMeasure: false
    }
  },
  components: {AdvancedOptions},
  computed: {
    getLength() {
      let measureDetails = this.$store.state.manu.measureDetails;
      return measureDetails.length * measureDetails.boxSize + " " + measureDetails.unitEnding;
    },
    measureTool() {
      return this.$store.state.manu.measureTool;
    },
    savableMeasureToolActive() {
      return (this.$store.state.manu.measureTool === measureTools.circle || this.$store.state.manu.measureTool === measureTools.cone);
    }
  },
  watch: {
    measureTool() {
      this.coneMeasure = false;
      this.circularMeasure = false;

      if (this.measureTool == this.measureTools.circle) {
        this.circularMeasure = true;
      } else if (this.measureTool == this.measureTools.cone) {
        this.coneMeasure = true;
      }
    }
  },
  methods: {
    ...mapActions({
      setTool: "manu/setTool"
    }),
    submitUnitChange() {
      store.commit("manu/setMeasureDetails", {
        boxSize: this.boxSize,
        unitEnding: this.unitEnding
      })
    },
    restoreDefault() {
      this.boxSize = 5;
      this.unitEnding = "ft";
      store.commit("manu/setMeasureDetails", {
        boxSize: 5,
        unitEnding: "ft"
      })
    },
    switchCircleMeasure() {
      if (this.measureTool != this.measureTools.line) {
        this.setTool(this.measureTools.line);
      } else {
        this.setTool(this.measureTools.circle);
      }
    },
    switchConeMeasure() {
      if (this.measureTool != this.measureTools.line) {
        this.setTool(this.measureTools.line);
      } else {
        this.setTool(this.measureTools.cone);
      }
    },
    saveMeasureAsPainting() {
      if (this.$store.state.manu.measureTool === measureTools.circle) {
        saveAsDrawing();
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
