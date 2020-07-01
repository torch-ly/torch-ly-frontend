<template>
  <div class="fixed md:h-screen w-full md:w-64 bottom-0 md:top-0 right-0 bg-gray-700 animate__animated animate__fadeInRight text-white flex justify-center items-center flex-col" :class="{'hidden' : !visible}">

    <PaintOverlay class="animate__animated animate__fadeInRight" v-if="$store.state.manu.drawing" />
    <MeasureOverlay class="animate__animated animate__fadeInRight" v-if="$store.state.manu.measure" />
        <BrushSelector v-show="drawing"></BrushSelector>

        <button :class="{'bg-red-300' : !$store.state.manu.erase , 'bg-red-400' : $store.state.manu.erase}" class="w-full outline-none rounded-full p-2 mt-4" @click="clickErase">
          Radierer
        </button>

        <button :class="{'bg-red-300' : !$store.state.manu.erase , 'bg-red-400' : $store.state.manu.erase}" class="w-full outline-none rounded-full p-2 mt-4" @click="clearDrawingLayer">Clear all</button>
      </div>

    </div>
  </div>
</template>
<script>
  import BrushSelector from "./BrushSelector";
  import {clearDrawing} from "../logic/stage/layers/freeDrawing/main";
  import PaintOverlay from "~/components/overlay/PaintOverlay"
  import MeasureOverlay from "./overlay/MeasureOverlay";

  export default {
    data() {
      return {
        layerButtonAcive: false
      }
    },
    components: {
      BrushSelector,
      MeasureOverlay,
      PaintOverlay
    },
    methods: {
      dropdownChange(e) {
        console.log(e)
        this.$store.commit("manu/setLayer", e.target.value);
      },
      clickErase() {
        this.$store.commit("manu/setErase");
      },
      clearDrawingLayer() {
        clearDrawing();
      }
    },
    computed: {
      visible() {
        return this.$store.state.manu.drawing || this.$store.state.manu.measure;
      }
    }
  }
</script>
