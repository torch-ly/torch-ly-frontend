<template>
  <div
    class="hidden md:block fixed md:w-64 bottom-0 md:top-0 right-0 bg-gray-700 animate__animated animate__fadeInRight text-white flex justify-center items-center flex-col"
    :class="{'hidden' : !visible}">

    <MoveOverlay class="animate__animated animate__fadeInRight p-6" v-show="$store.state.manu.move"/>
    <PaintOverlay class="animate__animated animate__fadeInRight p-6" v-show="$store.state.manu.drawing"/>
    <MeasureOverlay class="animate__animated animate__fadeInRight p-6" v-show="$store.state.manu.measure"/>
    <FogOfWarOverlay class="animate__animated animate__fadeInRight p-6" v-show="$store.state.manu.fogOfWar"/>
    <MonsterOverlay class="animate__animated animate__fadeInRight" v-show="$store.state.manu.monsters"/>

  </div>
</template>
<script>
  import BrushSelector from "./components/BrushSelector";
  import PaintOverlay from "@/components/overlay/PaintOverlay";
  import MeasureOverlay from "./MeasureOverlay";
  import MoveOverlay from "./MoveOverlay";
  import FogOfWarOverlay from "./FogOfWarOverlay";
  import MonsterOverlay from "./MonsterOverlay"

  export default {
    data() {
      return {
        layerButtonAcive: false
      }
    },
    components: {
      MoveOverlay,
      BrushSelector,
      MeasureOverlay,
      PaintOverlay,
      FogOfWarOverlay,
      MonsterOverlay
    },
    methods: {
      dropdownChange(e) {
        this.$store.commit("manu/setLayer", e.target.value);
      },
      clickErase() {
        this.$store.commit("manu/setErase");
      }
    },
    computed: {
      visible() {
        return this.$store.state.manu.drawing || this.$store.state.manu.measure || this.$store.state.manu.move;
      }
    }
  }
</script>
