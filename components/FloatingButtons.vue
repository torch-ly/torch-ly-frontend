<template>
  <div class="hidden md:block fixed top-0 left-0">
    <div class="relative m-6 flex flex-col justify-center items-center">
      <fa icon="arrows-alt" @click="handClick" :class="{'button-selected' : handSelected}" class="button"/>
      <fa :icon="$store.state.manu.erase ? 'trash' : 'pen'" @click="paintClick"
          :class="{'button-selected' : paintSelected}" class="button"/>
      <fa icon="ruler-combined" @click="measureClick" :class="{'button-selected' : measureSelected}" class="button"/>
      <fa icon="save" @click="saveClick" class="button active:border-2"/>
    </div>
  </div>
</template>
<script>
  import {useHand, usePen} from "../logic/stage/layers/freeDrawing/main";
  import {startDraw} from "../logic/stage/layers/measure/main";
  import {clearTransformerNodes} from "../logic/stage/layers/transformer";
  import {stage} from "../logic/stage/main";
  import {saveBackgroundLayer} from "../logic/stage/layers/background/init";

  export default {
    methods: {
      handClick() {
        this.$store.commit("manu/setHand");
        stage.draggable(true);
        useHand();
      },
      paintClick() {
        if (this.$store.state.manu.drawing)
          this.$store.commit("manu/setErase")
        else {
          this.$store.commit("manu/setDrawing");
          stage.draggable(false);
          usePen();
        }
        clearTransformerNodes();
      },
      measureClick() {
        this.$store.commit("manu/setMeasure");
        stage.draggable(false);
        startDraw();
      },
      saveClick() {
        setTimeout(() => {
          saveBackgroundLayer();
        }, 0);
      }
    },
    computed: {
      handSelected() {
        return this.$store.state.manu.move;
      },
      paintSelected() {
        return this.$store.state.manu.drawing;
      },
      measureSelected() {
        return this.$store.state.manu.measure;
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
