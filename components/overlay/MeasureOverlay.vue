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

    <ToggleBox
      title="Circle measure"
      v-bind:checked.sync="measure.circular"
      v-on:update:checked="$event ? setTool(measureTools.circle) : setTool(measureTools.line)"
    />

    <ToggleBox
      title="Cone measure"
      v-bind:checked.sync="measure.cone"
      v-on:update:checked="$event ? setTool(measureTools.cone) : setTool(measureTools.line)"
    />

    <button class="submit-button active:submit-button-active mt-2" v-show="savableMeasureToolActive"
            @click="saveMeasureAsPainting">Save as drawing
    </button>

  </div>
</template>

<script>
import AdvancedOptions from "../gui-components/AdvancedOptions";
import measureTools from "@/enums/tools/measureTools";
import {mapActions} from "vuex";
import tools from "@/enums/tools/tools";
import {saveAsDrawing} from "~/logic/stage/layers/measure/circleMeasure";
import ToggleBox from "@/components/gui-components/ToggleBox";

export default {
  components: {AdvancedOptions, ToggleBox},
  data() {
    return {
      tools,
      measureTools,
      boxSize: this.$store.state.manu.measureDetails.boxSize,
      unitEnding: this.$store.state.manu.measureDetails.unitEnding,
      measure: {
        circular: false,
        cone: false
      }
    }
  },
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
    measureTool(e) {

      //TODO optimize this code

      if (e === measureTools.circle) {
        this.measure.circular = true;
        this.measure.cone = false;
      } else if (e === measureTools.cone) {
        this.measure.circular = false;
        this.measure.cone = true;
      }

    }
  },
  methods: {
    ...mapActions({
      setTool: "manu/setTool"
    }),
    submitUnitChange() {
      this.$store.commit("manu/setMeasureDetails", {
        boxSize: this.boxSize,
        unitEnding: this.unitEnding
      })
    },
    restoreDefault() {
      this.boxSize = 5;
      this.unitEnding = "ft";
      this.$store.commit("manu/setMeasureDetails", {
        boxSize: 5,
        unitEnding: "ft"
      })
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
</style>
