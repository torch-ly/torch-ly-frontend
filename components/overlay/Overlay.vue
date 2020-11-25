<template>
  <div
      class="h-screen fixed top-0 right-0 bg-gray-700 w-64 animate__animated animate__fadeInRight text-white overflow-y-auto"
  >
    <MoveOverlay
        v-show="currentTool === tools.move"
        class="animate__animated animate__fadeInRight p-6"
    />
    <PaintOverlay
        v-show="currentTool === tools.draw"
        class="animate__animated animate__fadeInRight p-6"
    />
    <MeasureOverlay
        v-show="currentTool === tools.measure"
        class="animate__animated animate__fadeInRight p-6"
    />
    <FogOfWarOverlay
        v-show="currentTool === tools.fogOfWar"
        class="animate__animated animate__fadeInRight p-6"
    />
    <MonsterOverlay
        v-show="currentTool === tools.monsters"
        class="animate__animated animate__fadeInRight"
    />
  </div>
</template>
<script>
import PaintOverlay from "@/components/overlay/PaintOverlay/PaintOverlay";
import MeasureOverlay from "./MeasureOverlay";
import MoveOverlay from "./MoveOverlay/MoveOverlay";
import FogOfWarOverlay from "./FogOfWarOverlay";
import MonsterOverlay from "./MonsterOverlay";
import {mapState} from "vuex";
import tools from "@/enums/tools/tools";

export default {
  components: {
    MoveOverlay,
    MeasureOverlay,
    PaintOverlay,
    FogOfWarOverlay,
    MonsterOverlay,
  },
  data() {
    return {
      layerButtonAcive: false,
      tools
    };
  },
  computed: {
    visible() {
      return this.$store.state.manu.drawing || this.$store.state.manu.measure || this.$store.state.manu.move;
    },
    ...mapState({
      currentTool: state => state.manu.currentTool
    })
  },
  methods: {
    dropdownChange(e) {
      this.$store.commit("manu/setLayer", e.target.value);
    },
    clickErase() {
      this.$store.commit("manu/setErase");
    }
  }
};
</script>
