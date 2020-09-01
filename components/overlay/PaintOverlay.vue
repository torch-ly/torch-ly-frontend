<template>
  <div>
    <BrushSelector></BrushSelector>

    <hr class="my-4">

    <div class="block">
      Stiftbreite:
      <input type="range" min="1" max="50" value="3" class="w-full" @change="widthChange"
             :value="$store.state.manu.freeDrawing.strokeWidth">
    </div>

    <hr class="my-4">

    <button :class="{'bg-red-300' : !$store.state.manu.erase , 'bg-red-400' : $store.state.manu.erase}"
            class="w-full outline-none rounded-full p-2" @click="setTool(tools.eraser)">
      Radierer
    </button>

    <button class="w-full outline-none rounded-full p-2 mt-4 bg-red-300" @click="clearDrawingLayer">
      Clear all
    </button>
  </div>
</template>
<script>
  import BrushSelector from "./components/BrushSelector";
  import {clearDrawing} from "../../logic/stage/layers/mouseTools/main";
  import {mapActions} from 'vuex';
  import tools from '@/enums/tools';

  export default {
    data: () => {
      return {
        tools
      }
    },
    components: {
      BrushSelector
    },
    methods: {
      ...mapActions({
        setTool: "manu/setTool"
      }),
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
