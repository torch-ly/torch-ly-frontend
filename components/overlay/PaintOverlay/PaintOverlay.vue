<template>
  <div>
    <BrushSelector></BrushSelector>

    <hr class="my-4">

    <ToggleBox
      title="Eraser"
      name="brush"
      v-on:update:checked="$event ? setTool(drawTools.eraser) : setTool(drawTools.pen)"
    />

    <button class="submit-button active:submit-button-active mt-2" @click="clearAllDrawings">
      Clear all
    </button>

    <hr class="my-4">

    <div class="flex flex-col">

      <ToggleBox
        title="Snap Shapes To Grid"
        v-on:update:checked="$store.commit('manu/setDrawingObjectSnapToGrid', $event)"
      />

      <ToggleBox
        title="Rectangle"
        name="brush"
        v-on:update:checked="$event ? setTool(drawTools.rectangle) : setTool(drawTools.pen)"
      />

      <ToggleBox
        title="Circle"
        name="brush"
        v-on:update:checked="$event ? setTool(drawTools.circle) : setTool(drawTools.pen)"
      />

    </div>
  </div>
</template>
<script>
import BrushSelector from "./BrushSelector";
import ToggleBox from "@/components/gui-components/ToggleBox";
import {mapActions} from 'vuex';
import tools from '@/enums/tools/tools';
import {clearAllDrawings} from "@/plugins/backendComunication/drawing";
import drawTools from "@/enums/tools/drawTools";

export default {
  data: () => {
    return {
      tools,
      drawTools,
    }
  },
  components: {
    BrushSelector,
    ToggleBox
  },
  methods: {
    ...mapActions({
      setTool: "manu/setTool"
    }),
    clearAllDrawings,
  }
}
</script>
<style scoped lang="scss">
@import "assets/css/scheme";
</style>
