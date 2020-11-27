<template>
	<div
		class="fixed top-0 w-screen md:p-4 flex z-10 justify-center items-center animate__animated animate__animated animate__fadeInDown"
	>
		<transition leave-active-class="animate__animated animate__fadeOutUp">
			<button
				v-if="visible"
				class="notification w-full md:w-64 bg-gray-700 p-3 text-white text-center md:rounded border-2 border-red-400"
				@mouseenter="mouseenter"
				@mouseleave="mouseleave"
				@click="click"
			>
				Use fullscreen?
			</button>
		</transition>
	</div>
</template>
<script>
import {openFullscreen} from "@/plugins/utils/FullscreenHelper";

export default {
	data() {
		return {
			visible: true,
			timeout: null
		};
	},
	created() {
		this.timeout = this.getTimeout();
	},
	methods: {
		openFullscreen,
		getTimeout() {
			return setTimeout(() => this.visible = false, 4000);
		},
		click() {
			this.visible = false;
			this.openFullscreen();
		},
		mouseenter() {
			clearTimeout(this.timeout);
		},
		mouseleave() {
			this.timeout = this.getTimeout();
		}
	}
};
</script>
