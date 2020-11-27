<template>
	<div>
		<!-- Drop down for layer selection -->
		<select
			v-if="gm"
			ref="layerdropdown"
			:value="currentLayer"
			class="dropdown"
			@input="dropdownChange"
			@load="dropdownChange"
		>
			<option>Background</option>
			<option>Token</option>
		</select>

		<div
			v-if="gm"
			class="hr"
		/>

		<div v-if="currentLayer === 'Token'">
			<!-- Button for adding Character-->
			<button
				class="submit-button active:submit-button-active mb-4 mt-4"
				@click="openTokenPopup"
			>
				Add Character
			</button>

			<CharacterList />
		</div>

		<!-- Input fields to change attributes of objects in background layer (only active if background layer is selected) -->
		<div v-if="currentLayer === 'Background'">
			<button
				class="submit-button active:submit-button-active mt-4"
				@click="openBackgroundPopup"
			>
				Add Shape or Image
			</button>

			<div class="hr mt-4" />

			<button
				class="submit-button active:submit-button-active mb-4 mt-4"
				@click="openBackgroundLayerPopup"
			>
				Select Map
			</button>
		</div>
	</div>
</template>
<script>
import {clearTransformerNodes} from "../../../logic/stage/functions/transformer/transformer";
import {stage} from "../../../logic/stage/main";
import CharacterList from "./CharacterList/CharacterList";

export default {
	components: {CharacterList},
	data() {
		return {
			tokens: []
		};
	},
	computed: {
		currentLayer() {
			return this.$store.state.manu.layer;
		},
		gm() {
			return this.$store.state.authentication.gm;
		}
	},
	watch: {
		gm(gm) {
			if (!gm) {
				this.$store.commit("manu/setLayer", "Token");
				clearTransformerNodes();
			}
		}
	},
	methods: {
		dropdownChange(e) {
			clearTransformerNodes();
			stage.batchDraw();
			this.$store.commit("manu/setLayer", e.target.value);
		},
		openTokenPopup() {
			this.$root.$emit("open-character-popup");
		},
		openBackgroundPopup() {
			this.$root.$emit("open-image-popup");
		},
		openBackgroundLayerPopup() {
			this.$root.$emit("open-background-layer-popup");
		}
	}
};
</script>
<style scoped lang="scss">
@import "../../../assets/css/scheme";

.input {
  @apply text-black mt-4 ml-2 w-16 p-1 rounded;
}

.input-narrow {
  @apply text-black mt-4 ml-2 w-3 rounded;
}
</style>
