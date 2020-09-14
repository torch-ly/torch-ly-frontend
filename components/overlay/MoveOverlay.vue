<template>
  <div>

    <!-- Drop down for layer selection -->
    <select v-bind:value="currentLayer" @input="dropdownChange" v-if="gm"
            class="dropdown" ref="layerdropdown" @load="dropdownChange">
      <option>Background</option>
      <option>Token</option>
    </select>

    <div class="hr" v-if="gm"/>

    <div v-if="currentLayer === 'Token'">
      <!-- Button for adding Character-->
      <button class="submit-button active:submit-button-active mb-4 mt-4" @click="openTokenPopup">
        Add Character
      </button>

      <CharacterList/>
    </div>

    <!-- Input fields to change attributes of objects in background layer (only active if background layer is selected) -->
    <div v-if="currentLayer === 'Background'">

      <button class="submit-button active:submit-button-active mt-4" @click="openBackgroundPopup">
        Add Shape or Image
      </button>

      <div class="hr mt-4"/>

      <button class="submit-button active:submit-button-active mb-4 mt-4" @click="openBackgroundLayerPopup">
        Select Map
      </button>

    </div>

  </div>
</template>
<script>
import {clearTransformerNodes} from "../../logic/stage/layers/transformer";
import {stage} from "../../logic/stage/main";
import LoadingSpinner from "../gui-components/LoadingSpinner";
import FileUpload from "../gui-components/FileUpload";
import CharacterList from "./components/CharacterList/CharacterList";

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
      openTokenPopup() {
        this.$root.$emit("openCharacterPopup");
      },
      openBackgroundPopup() {
        this.$root.$emit('openImagePopup');
      },
      openBackgroundLayerPopup() {
        this.$root.$emit('openBackgroundLayerPopup');
      }
    },
    watch: {
      gm(gm) {
        if (!gm) {
          this.$store.commit("manu/setLayer", "Token");
          clearTransformerNodes();
        }
      }
    },
    computed: {
      currentLayer() {
        return this.$store.state.manu.layer;
      },
      gm() {
        return this.$store.state.authentication.gm;
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
