<template>
  <div class="m-6">
    <select required v-bind:value="$store.state.manu.layer" @input="dropdownChange"
            class="w-full text-black p-1 rounded-full mb-4">
      <option>Background</option>
      <option>Token</option>
    </select>

    <div class="hr"/>

    <button class="submit-button active:submit-button-active mb-4 mt-4" @click="openPopup">Add Character</button>

    <div class="hr"/>

    <form id="backgroud-pos" v-on:submit.prevent="updateBackgroundObject" class="mt-2">
      X: <input ref="x" name="x" type="number" v-bind:value="$store.state.selectedBackgroundObject.x"
                class="input-field">
      <br>
      Y: <input ref="y" name="y" type="number" v-bind:value="$store.state.selectedBackgroundObject.y"
                class="input-field">
      <br>
      Rotation: <input ref="rotation" name="rotation" type="number"
                       v-bind:value="$store.state.selectedBackgroundObject.rotation" class="input-field">
      <br>
      SnapToGrid: <input ref="snapToGrid" name="snapToGrid" type="checkbox"
                         v-bind:checked="$store.state.selectedBackgroundObject.snapToGrid" class="input-narrow">
      <br>
      <input type="submit" class="submit-button active:submit-button-active mt-4">
    </form>

    <div class="hr my-4"/>

    <FileUpload class="font-lg" />

  </div>
</template>

<script>
  import {clearTransformerNodes} from "../../logic/stage/layers/transformer";
  import {stage} from "../../logic/stage/main";
  import LoadingSpinner from "../gui-components/LoadingSpinner";
  import FileUpload from "../gui-components/FileUpload";

  export default {
    data() {
      return {
        tokens: []
      }
    },
    components: {LoadingSpinner, FileUpload},
    methods: {
      dropdownChange(e) {
        clearTransformerNodes();
        stage.batchDraw();
        this.$store.commit("manu/setLayer", e.target.value);
      },

      updateBackgroundObject(e) {
        this.$store.commit("selectedBackgroundObject/updateObject", {
          x: this.$refs.x.value,
          y: this.$refs.y.value,
          rotation: this.$refs.rotation.value,
          snapToGrid: this.$refs.snapToGrid.checked
        });
      },
      openPopup() {
        this.$root.$emit("openCharacterPopup")
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="scss">
  @import "assets/css/scheme";

  .input {
    @apply text-black mt-4 ml-2 w-16 p-1 rounded;
  }

  .input-narrow {
    @apply text-black mt-4 ml-2 w-3 rounded;
  }
</style>
