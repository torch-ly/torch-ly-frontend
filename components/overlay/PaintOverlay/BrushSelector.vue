<template>
  <div class="">
    <div class="flex flex-col mb-2">
      Color:
      <input
        type="color"
        class="mt-1 w-24 h-6"
        :value="$store.state.manu.freeDrawing.color"
        @input="onChange"
      >
    </div>
    <div class="">
      Stroke Width:
      <input
        type="range"
        min="1"
        max="50"
        class="w-full mt-1"
        :value="$store.state.manu.freeDrawing.strokeWidth"
        @change="widthChange"
      >
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex";
import tools from "@/enums/tools/tools";

export default {
	data() {
		return {
			hex: "#000000",
			tools
		};
	},
	methods: {
		...mapActions({
			setTool: "manu/setTool"
		}),
		onChange(e) {
			this.hex = e.target.value;
			this.$store.commit("manu/setDrawingColor", e.target.value);
		},
		widthChange(e) {
			this.$store.commit("manu/setDrawingStrokeWidth", e.target.value);
		}
	}
};
</script>
