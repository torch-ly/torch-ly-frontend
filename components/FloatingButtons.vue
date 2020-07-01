<template>
  <div class="fixed top-0 left-0">
    <div class="relative m-6 flex flex-col justify-center items-center">
      <img src="/move.svg" @click="handClick" :class="{'button-selected' : handSelected}" class="button"/>
      <img :src="$store.state.manu.erase ? '/trash.svg' : '/pen.svg'" @click="paintClick" :class="{'button-selected' : paintSelected}" class="button"/>
      <img src="/arrow.svg" @click="measureClick" :class="{'button-selected' : measureSelected}" class="button"/>
    </div>
  </div>
</template>
<script>
  import {useHand, usePen} from "../logic/stage/layers/freeDrawing/main";
  import {startDraw} from "../logic/stage/layers/measure/main";
  import {clearTransformerNodes} from "../logic/stage/layers/transformer";
  import {stage} from "../logic/stage/main";

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
