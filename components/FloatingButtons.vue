<template>
  <div class="fixed top-0 left-0">
    <div class="relative m-6 flex flex-col justify-center items-center">
      <img src="/move.svg" @click="handClick" :class="{'button-selected' : handSelected}" class="button"/>
      <img src="/pen.svg" @click="paintClick" :class="{'button-selected' : paintSelected}" class="button"/>
      <img src="/arrow.svg" @click="measureClick" :class="{'button-selected' : measureSelected}" class="button"/>
    </div>
    :
  </div>
</template>
<script>
  import {setStageDragAndDrop} from "../logic/stage/layers/layerFunctions";
  import {useHand, usePen} from "../logic/stage/layers/freeDrawing/main";

  export default {
    methods: {
      handClick() {
        this.$store.commit("manu/setHand");
        setStageDragAndDrop(true, true);
        useHand();
      },
      paintClick() {
        this.$store.commit("manu/setDrawing");
        setStageDragAndDrop(false, false);
        usePen();
      },
      measureClick() {
        this.$store.commit("manu/setMeasure");
        setStageDragAndDrop(false, false);
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
     @apply p-2 rounded m-0 bg-gray-700 mb-4;
  }

  .button-selected {
    @apply border-2 border-red-400;
  }
</style>
