<template>
  <div>

    <!-- Drop down for layer selection -->
    <select v-bind:value="currentLayer" @input="dropdownChange"
            class="dropdown" ref="layerdropdown" @load="dropdownChange">
      <option>Background</option>
      <option>Token</option>
    </select>

    <div class="hr"/>

    <!-- Button for adding Character (only active if token layer is selected) -->
    <button class="submit-button active:submit-button-active mb-4 mt-4" @click="openTokenPopup"
            v-if="currentLayer === 'Token'">Add Character
    </button>

    <!-- Input fields to change attributes of objects in background layer (only active if background layer is selected) -->
    <div v-if="currentLayer === 'Background'">

      <form v-on:submit.prevent="updateBackgroundObject" class="mt-2">

        X:
        <input ref="x" type="number" :value="selectedBackgroundObject.x" class="input-field mb-4">

        Y:
        <input ref="y" type="number" :value="selectedBackgroundObject.y" class="input-field mb-4">

        Rotation:
        <input ref="rotation" type="number" :value="selectedBackgroundObject.rotation" class="input-field mb-4">

        SnapToGrid:
        <input ref="snapToGrid" type="checkbox" :checked="selectedBackgroundObject.snapToGrid" class="input-narrow">

        <input type="submit" class="submit-button active:submit-button-active mt-4">
      </form>

      <div class="hr mt-4"/>

      <button class="submit-button active:submit-button-active mb-4 mt-4" @click="openBackgroundPopup">Add Shape or
        Image
      </button>
    </div>

    <CharacterList/>

  </div>
</template>
<script>
  import {clearTransformerNodes} from "../../logic/stage/layers/transformer";
  import {stage} from "../../logic/stage/main";
  import LoadingSpinner from "../gui-components/LoadingSpinner";
  import FileUpload from "../gui-components/FileUpload";
  import CharacterList from "../CharacterList";

  export default {
    data() {
      return {
        tokens: []
      }
    },
    components: {LoadingSpinner, FileUpload, CharacterList},
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
      openTokenPopup() {
        this.$root.$emit("openCharacterPopup");
      },

      openBackgroundPopup() {
        this.$root.$emit('openImagePopup');
      }
    },
    computed: {
      currentLayer() {
        return this.$store.state.manu.layer;
      },
      selectedBackgroundObject() {
        return this.$store.state.selectedBackgroundObject;
      }
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
