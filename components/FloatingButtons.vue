<template>
	<div class="hidden md:block fixed top-0 left-0">
		<div class="relative m-6 flex flex-col justify-center items-center">
			<popper
				trigger="hover"
				:options="popperOptions"
			>
				<div
					class="w-56 text-center bg-red-300 uppercase text-white text-sm p-1 rounded font-bold  animate__animated animate__fadeIn animate__fast"
				>
					Edit Map / Tokens (CTRL + B)
				</div>

				<fa
					slot="reference"
					icon="arrows-alt"
					:class="{'button-selected' : currentTool === tools.move}"
					class="button"
					@click="setTool(tools.move)"
				/>
			</popper>

			<popper
				trigger="hover"
				:options="popperOptions"
			>
				<div
					class="w-48 text-center bg-red-300 uppercase text-white text-sm p-1 rounded font-bold  animate__animated animate__fadeIn animate__fast"
				>
					Paint Mode
				</div>

				<fa
					slot="reference"
					icon="pen"
					:class="{'button-selected' : currentTool === tools.draw}"
					class="button"
					@click="setTool(drawTools.pen)"
				/>
			</popper>

			<popper
				trigger="hover"
				:options="popperOptions"
			>
				<div
					class="w-48 text-center bg-red-300 uppercase text-white text-sm p-1 rounded font-bold  animate__animated animate__fadeIn animate__fast"
				>
					Measure Tool
				</div>

				<fa
					slot="reference"
					icon="ruler-combined"
					:class="{'button-selected' : currentTool === tools.measure}"
					class="button"
					@click="setTool(measureTools.line)"
				/>
			</popper>

			<popper
				trigger="hover"
				:options="popperOptions"
			>
				<div
					class="w-48 text-center bg-red-300 uppercase text-white text-sm p-1 rounded font-bold  animate__animated animate__fadeIn animate__fast"
				>
					Fog of War
				</div>

				<fa
					v-show="$store.state.authentication.gm"
					slot="reference"
					icon="cloud"
					:class="{'button-selected' : currentTool === tools.fogOfWar}"
					class="button"
					@click="setTool(tools.fogOfWar)"
				/>
			</popper>

			<popper
				trigger="hover"
				:options="popperOptions"
			>
				<div
					class="w-48 text-center bg-red-300 uppercase text-white text-sm p-1 rounded font-bold  animate__animated animate__fadeIn animate__fast"
				>
					Library (CTRL + M)
				</div>

				<fa
					slot="reference"
					icon="book"
					:class="{'button-selected' : currentTool === tools.monsters}"
					class="button"
					@click="setTool(tools.monsters)"
				/>
			</popper>

			<popper
				trigger="hover"
				:options="popperOptions"
			>
				<div
					class="w-48 text-center bg-red-300 uppercase text-white text-sm p-1 rounded font-bold  animate__animated animate__fadeIn animate__fast"
				>
					Save Map (CTRL + S)
				</div>

				<fa
					v-show="currentLayerIs('Background')"
					slot="reference"
					icon="save"
					class="button active:border-2"
					@click="saveClick"
				/>
			</popper>
		</div>
	</div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import {saveBackgroundLayer} from "@/logic/stage/layers/background/init";
import tools from "@/enums/tools/tools";
import drawTools from "~/enums/tools/drawTools";
import measureTools from "~/enums/tools/measureTools";
import Popper from "vue-popperjs";

export default {
	components: {Popper},
	data: () => {
		return {
			tools,
			drawTools,
			measureTools,
			popperOptions: {
				placement: "right",
				modifiers: {offset: {offset: "0,10px"}}
			}
		};
	},
	computed: {
		...mapState({
			currentTool: state => state.manu.currentTool
		})
	},
	methods: {
		...mapActions({
			setTool: "manu/setTool"
		}),
		saveClick() {
			setTimeout(() => {
				saveBackgroundLayer();
			}, 0);
		},
		currentLayerIs(layer) {
			return this.$store.state.manu.layer === layer;
		}
	}
};
</script>
<style scoped lang="scss">
  .button {
    @apply p-2 rounded m-0 bg-gray-700 mb-4 w-10 h-10 text-white border-red-400;
  }

  .button-selected {
    @apply border-2 ;
  }
</style>
