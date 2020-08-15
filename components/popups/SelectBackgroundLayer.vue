<template>
  <PopupContainer ref="popupContainer" title="Select Background Layer">
    <div v-for="layer of layerNames" class="p-4 text-white text-lg hover:bg-primary-light rounded"
         @click="layerSelection(layer)">{{layer}}
    </div>
  </PopupContainer>
</template>

<script>
  import PopupContainer from "../gui-components/PopupContainer";
  import {store} from "../../logic/stage/main";
  import {setBackgroundLayerName} from "../../plugins/backendComunication";

  export default {
    components: {PopupContainer},
    mounted() {
      this.$root.$on("openBackgroundLayerPopup", () => {
        this.$refs.popupContainer.active = true;
      });
    },
    methods: {
      layerSelection(layer) {
        setBackgroundLayerName(layer);
      }
    },
    computed: {
      layerNames() {
        return store.state.backgroundLayerNames.layers;
      }
    }
  }
</script>
