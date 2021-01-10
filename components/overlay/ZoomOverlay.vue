<template>
    <div class="flex flex-col m-4 text-white">
        <div class="h-8 w-8 bg-gray-700 rounded flex items-center justify-center" @click="zoomUp">
            <fa icon="plus" />
        </div>
        <div class="h-8 w-8 flex items-center justify-center" @click="resetZoom">
            <span class="text-black select-none">{{zoomFactor}}</span>
        </div>
        <div class="h-8 w-8 bg-gray-700 rounded flex items-center justify-center" @click="zoomDown">
            <fa icon="minus" />
        </div>
    </div>
</template>
<script>
import {resetZoom, zoomByScale} from "@/logic/stage/functions/zoom";

export default {
	computed: {
		zoomFactor() {
			return Math.floor(this.$store.state.manu.zoomFactor * 100) / 100;
		},
	},
	methods: {
		zoomUp() {
			zoomByScale(1.05);
		},
		zoomDown() {
			zoomByScale(0.95);
		},
		resetZoom,
	}
};
</script>
