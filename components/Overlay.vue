<template>
  <div
    class="hidden md:block fixed w-full md:w-64 bottom-0 md:top-0 right-0 bg-gray-700 animate__animated animate__fadeInRight text-white flex justify-center items-center flex-col p-6"
    :class="{'hidden' : !visible}">

    <MoveOverlay class="animate__animated animate__fadeInRight" v-if="$store.state.manu.move"/>
    <PaintOverlay class="animate__animated animate__fadeInRight" v-if="$store.state.manu.drawing"/>
    <MeasureOverlay class="animate__animated animate__fadeInRight" v-if="$store.state.manu.measure"/>
    <FogOfWarOverlay class="animate__animated animate__fadeInRight" v-if="$store.state.manu.fogOfWar"/>

  </div>
</template>
<script>
  import BrushSelector from "./BrushSelector";
  import PaintOverlay from "~/components/overlay/PaintOverlay";
  import MeasureOverlay from "./overlay/MeasureOverlay";
  import MoveOverlay from "./overlay/MoveOverlay";
  import FogOfWarOverlay from "./overlay/FogOfWarOverlay";

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
      FogOfWarOverlay
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
