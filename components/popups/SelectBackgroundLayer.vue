<template>
  <PopupContainer ref="popupContainer" title="Select Map" class="select-none">
    <div v-for="layer of layerNames"
         class="p-4 text-white text-lg hover:bg-primary-light rounded flex justify-between flex-row"
         @click="layerSelection(layer)">
      {{layer.name}}
      <div v-if="layer.selected">
        <fa icon="check"/>
      </div>
      <div v-else @click.stop="removeLayer(layer)">
        <fa icon="trash" :class="{'text-accent': layerToRemove === layer}"/>
      </div>
    </div>
    <div class="w-full flex flex-row justify-between items-center h-10 p-4 mt-4">
      <div class="w-11/12 inline-block">
        <input placeholder="Map Name" class="input-field" v-model="newLayerName">
      </div>
      <fa icon="plus" @click="addLayer" class="text-white inline-block hover:text-accent"/>
    </div>
  </PopupContainer>
</template>

<script>
import PopupContainer from "../gui-components/PopupContainer";
import {store} from "../../logic/stage/main";
import {
  addMap,
  getBackgroundLayerNames,
  removeMap,
  setBackgroundLayerName
} from "../../plugins/backendComunication/map";

export default {
  components: {PopupContainer},
  data() {
    return {
      newLayerName: null,
      layerToRemove: null
    }
  },
  mounted() {
    this.$root.$on("openBackgroundLayerPopup", () => {
      this.$refs.popupContainer.active = true;
      });
    },
    methods: {
      layerSelection(layer) {
        if(layer.selected)
          return

        setBackgroundLayerName(layer.name);
        getBackgroundLayerNames();
      },
      addLayer() {
        if (this.newLayerName == null)
          return;

        addMap(this.newLayerName);

        this.newLayerName = "";
        getBackgroundLayerNames();
      },
      removeLayer(layer) {
        if (this.layerToRemove != layer) {
          this.layerToRemove = layer;
        } else {
          removeMap(this.layerToRemove.name);
          getBackgroundLayerNames();
        }
        return true;
      }
    },
    computed: {
      layerNames() {
        return store.state.backgroundLayerNames.layers;
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "assets/css/scheme";
</style>
