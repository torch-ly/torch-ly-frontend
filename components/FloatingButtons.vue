<template>
  <div class="hidden md:block fixed top-0 left-0">
    <div class="relative m-6 flex flex-col justify-center items-center">
      <fa icon="arrows-alt" @click="handClick" :class="{'button-selected' : state.move}" class="button"/>

      <fa :icon="state.erase ? 'trash' : 'pen'" @click="paintClick"
          :class="{'button-selected' : state.drawing}" class="button"/>

      <fa icon="ruler-combined" @click="measureClick" :class="{'button-selected' : state.measure}" class="button"/>

      <fa icon="cloud" @click="fogOfWarClick" :class="{'button-selected' : state.fogOfWar}" class="button"/>

      <fa icon="book" @click="monstersClick" :class="{'button-selected' : state.monsters}" class="button"/>

      <fa v-if="currentLayerIs('Background')" icon="save" @click="saveClick" class="button active:border-2"/>
    </div>
  </div>
</template>
<script>
  import {useHand, usePen} from "../logic/stage/layers/freeDrawing/main";
  import {startDraw} from "../logic/stage/layers/measure/main";
  import {clearTransformerNodes} from "../logic/stage/layers/transformer";
  import {saveBackgroundLayer} from "../logic/stage/layers/background/init";

  export default {
    methods: {
      handClick() {
        this.$store.commit("manu/setHand");
        useHand();
      },
      paintClick() {
        if (this.$store.state.manu.drawing)
          this.$store.commit("manu/setErase")
        else {
          this.$store.commit("manu/setDrawing");
          usePen();
        }
        clearTransformerNodes();
      },
      measureClick() {
        this.$store.commit("manu/setMeasure");
        startDraw();
      },
      fogOfWarClick() {
        this.$store.commit("manu/setFogOfWar");
      },
      monstersClick() {
        this.$store.commit("manu/setMonsters");
      },
      saveClick() {
        setTimeout(() => {
          saveBackgroundLayer();
        }, 0);
      },
      currentLayerIs(layer) {
        return this.$store.state.manu.currentLayer === layer;
      }
    },
    computed: {
      state() {
        return this.$store.state.manu;
      }
    }
  }
</script>
<style scoped lang="scss">
  .button {
    @apply p-2 rounded m-0 bg-gray-700 mb-4 w-10 h-10 text-white border-red-400;
  }

  .button-selected {
    @apply border-2 ;
  }
</style>
