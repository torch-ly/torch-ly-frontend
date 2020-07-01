<template>
  <div class="m-6">
    <select required v-bind:value="$store.state.manu.layer" @input="dropdownChange" class="hidden w-full text-black p-2 rounded-full">
      <option>Background</option>
      <option>Token</option>
    </select>

    <BrushSelector v-show="drawing"></BrushSelector>

    <hr class="my-4">

    <span class="block">
      Stiftbreite:
      <input type="range" min="1" max="50" value="3" class="w-full" @change="widthChange"
             :value="$store.state.manu.freeDrawing.strokeWidth">
    </span>

    <hr class="my-4">

    <button :class="{'bg-red-300' : !$store.state.manu.erase , 'bg-red-400' : $store.state.manu.erase}"
            class="w-full outline-none rounded-full p-2" @click="clickErase">
      Radierer
    </button>

    <button class="w-full outline-none rounded-full p-2 mt-4 bg-red-300" @click="clearDrawingLayer">
      Clear all
    </button>
  </div>
</template>
<script>
  import BrushSelector from "../BrushSelector";
  import {clearDrawing} from "../../logic/stage/layers/freeDrawing/main";

  export default {
    components: {
      BrushSelector
    },
    methods: {
      dropdownChange(e) {
        this.$store.commit("manu/setLayer", e.target.value)
      },
      clickErase() {
        this.$store.commit("manu/setErase");
      },
      widthChange(e) {
        this.$store.commit("manu/setDrawingStrokeWidth", e.target.value)
      },
      clearDrawingLayer() {
        clearDrawing();
      }
    },
    computed: {
      drawing() {
        return this.$store.state["manu"]["drawing"];
      }
    }
  }
</script>
