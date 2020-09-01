<template>
  <div
    class="hidden md:block fixed md:w-64 bottom-0 md:top-0 right-0 bg-gray-700 animate__animated animate__fadeInRight text-white flex justify-center items-center flex-col"
    :class="{'hidden' : !visible}">

    <MoveOverlay class="animate__animated animate__fadeInRight p-6" v-show="currentTool === tools.move"/>
    <PaintOverlay class="animate__animated animate__fadeInRight p-6" v-show="[tools.pen, tools.eraser, tools.circle, tools.rectangle].indexOf(currentTool) >= 0"/>
    <MeasureOverlay class="animate__animated animate__fadeInRight p-6" v-show="currentTool === tools.measure"/>
    <FogOfWarOverlay class="animate__animated animate__fadeInRight p-6" v-show="currentTool === tools.fogOfWar"/>
    <MonsterOverlay class="animate__animated animate__fadeInRight" v-show="currentTool === tools.monsters"/>

  </div>
</template>
<script>
  import BrushSelector from "./components/BrushSelector";
  import PaintOverlay from "@/components/overlay/PaintOverlay";
  import MeasureOverlay from "./MeasureOverlay";
  import MoveOverlay from "./MoveOverlay";
  import FogOfWarOverlay from "./FogOfWarOverlay";
  import MonsterOverlay from "./MonsterOverlay"
  import {mapState} from 'vuex';
  import tools from '@/enums/tools';

  export default {
    data() {
      return {
        layerButtonAcive: false,
        tools
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
      },
      ...mapState({
        currentTool: state => state.manu.currentTool
      })
    }
  }
</script>
