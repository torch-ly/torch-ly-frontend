<template>
    <div>
        <ToggleBox
            title="Insert / Delete"
            @update:checked="setInsert(!$event); deleteMode = $event"
        />

        <button
            v-if="deleteMode"
            class="submit-button active:submit-button-active mt-2"
            @click="DeletePolygon"
        >
            Delete
        </button>
        <button
            v-else
            class="submit-button active:submit-button-active mt-2"
            @click="InsertPolygon"
        >
            Insert
        </button>

        <button
            class="submit-button active:submit-button-active mt-2"
            @click="syncronize"
        >
            Syncronize FogOfWar
        </button>

        <ToggleBox
            title="Snap to Grid"
            @update:checked="setSnapToGrid($event)"
        />

        <button
            class="submit-button active:submit-button-active mt-2"
            @click="resetFogOfWar"
        >
            Clear FogOfWar
        </button>

        <ToggleBox
            title="See Through Fog Of war"
            @update:checked="setTransparent($event)"
        />
    </div>
</template>
<script>
import {
	DeletePolygon,
	InsertPolygon,
	resetFogOfWar,
	setInsert,
	setSnapToGrid,
	setTransparent,
	syncronize
} from "../../logic/stage/layers/fogofwar/main";
import ToggleBox from "@/components/gui-components/ToggleBox";

export default {
	components: {ToggleBox},
	data() {
		return {
			deleteMode: false
		};
	},
	methods: {
		syncronize,
		setSnapToGrid,
		resetFogOfWar,
		setTransparent,
		InsertPolygon,
		DeletePolygon,
		setInsert
	}
};
</script>
<style lang="scss" scoped>
@import "assets/css/scheme";
</style>
