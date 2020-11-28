<template>
    <PopupContainer
        ref="popupContainer"
        title="Select Map"
        class="select-none"
    >
        <div
            v-for="layer of layerNames"
            :key="layer.key"
            class="p-4 text-white text-lg hover:bg-primary-light rounded flex justify-between flex-row"
            @click="layerSelection(layer)"
        >
            {{ layer.name }}
            <div v-if="layer.selected">
                <fa
                    icon="check"
                    class="w-4"
                />
            </div>
            <div
                v-else
                @click.stop="removeLayer(layer)"
            >
                <fa
                    icon="trash"
                    :class="{'text-accent': layerToRemove === layer}"
                    class="w-4"
                />
            </div>
        </div>
        <div class="w-full flex flex-row justify-between items-center h-10 p-4 mt-4">
            <div class="w-11/12 inline-block">
                <input
                    v-model="newLayerName"
                    placeholder="Map Name"
                    class="input-field"
                >
            </div>
            <fa
                icon="plus"
                class="text-white inline-block hover:text-accent w-4"
                @click="addLayer"
            />
        </div>
    </PopupContainer>
</template>

<script>
import PopupContainer from "../gui-components/PopupContainer";
import {store} from "../../logic/stage/main";
import {
	addMap,
	getBackgroundLayerNames,
	removeMap,
	setBackgroundLayerName
} from "../../plugins/backendComunication/map";

export default {
	components: {PopupContainer},
	data() {
		return {
			newLayerName: null,
			layerToRemove: null
		};
	},
	computed: {
		layerNames() {
			return store.state.backgroundLayerNames.layers;
		}
	},
	mounted() {
		this.$root.$on("open-background-layer-popup", () => {
			this.$refs.popupContainer.active = true;
		});
	},
	methods: {
		layerSelection(layer) {
			if (layer.selected)
				return;


			setBackgroundLayerName(layer.name);
			getBackgroundLayerNames();
		},
		addLayer() {
			if (this.newLayerName == null)
				return;


			addMap(this.newLayerName);

			this.newLayerName = "";
			getBackgroundLayerNames();
		},
		removeLayer(layer) {
			if (this.layerToRemove !== layer)
				this.layerToRemove = layer;
			else {
				removeMap(this.layerToRemove.name);
				getBackgroundLayerNames();
			}
			return true;
		}
	}
};
</script>
<style scoped lang="scss">
@import "assets/css/scheme";
</style>
