<template>
  <div>

    <!-- Shows length of last measurement -->
    <p class="text-lg font-bold mb-4">Length: {{getLength}} </p>

    <!-- Options for changing units and size per square -->
    <AdvancedOptions>
      <input type="number" class="input-field" v-model="boxSize" @change="submitUnitChange">

      <input type="text" class="input-field mt-2" v-model="unitEnding" @change="submitUnitChange">

      <div class="p-2 mt-2" @click="restoreDefault">
        <fa icon="undo" class="mx-auto block"></fa>
      </div>
    </AdvancedOptions>

  </div>
</template>

<script>
import {store} from "../../logic/stage/main";
import AdvancedOptions from "../gui-components/AdvancedOptions";

export default {
  data() {
    return {
      boxSize: store.state.manu.measureDetails.boxSize,
      unitEnding: store.state.manu.measureDetails.unitEnding,
    }
  },
  components: {AdvancedOptions},
  computed: {
    getLength() {
      let measureDetails = this.$store.state.manu.measureDetails;
      return measureDetails.length * measureDetails.boxSize + " " + measureDetails.unitEnding;
    }
  },
  methods: {
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
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "assets/css/scheme";
</style>
