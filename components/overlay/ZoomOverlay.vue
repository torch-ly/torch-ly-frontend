<template>
    <div class="flex flex-row m-4 text-white bg-gray-700 rounded">
        <div class="h-8 w-8 flex items-center justify-center" @click="zoomUp">
            <fa class="h-full w-full p-1" icon="plus" />
        </div>
        <div class="h-8 w-8 flex items-center justify-center" @click="resetZoom">
            <span class="select-none">{{zoomFactor}}</span>
        </div>
        <div class="h-8 w-8 flex items-center justify-center" @click="zoomDown">
            <fa class="h-full w-full p-1" icon="minus" />
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
