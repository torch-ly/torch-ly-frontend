<template>
    <PopupContainer
        ref="popupContainer"
        title="Add Conditions"
    >
        <div class="grid grid-flow-row grid-cols-4 grid-rows-3 gap-4">
            <div
                v-for="(condition, index) in conditions"
                :key="condition.key"
                @click="activateCondition(index)"
            >
                <div class="mb-2 text-white font-bold select-none">
                    {{ condition.name }}
                </div>
                <div class="flex flex-row">
                    <div class="flex justify-center items-center">
                        <input
                            v-model="condition.active"
                            type="checkbox"
                        >
                    </div>
                    <img
                        :src="condition.src"
                        class="ml-4 w-12 h-12"
                    >
                </div>
            </div>
        </div>
        <div
            class="submit-button active:submit-button-active mt-5"
            @click="saveConditions"
        >
            Save
        </div>
    </PopupContainer>
</template>

<script>
import PopupContainer from "../gui-components/PopupContainer";
import conditions from "@/enums/conditions";
import {setCharacterConditions} from "@/plugins/backendComunication/characters";

export default {
	components: {PopupContainer},
	data() {
		return {
			conditions: [],
			character: null
		};
	},
	mounted() {
		this.$root.$on("open-character-conditions-popup", (character) => {
			this.$refs.popupContainer.active = true;
			this.character = character;
			this.loadConditions();
		});

		this.$root.$on("close-character-conditions-popup", () => {
			this.$refs.popupContainer.active = false;
		});
	},
	methods: {
		loadConditions() {
			this.conditions = [];
			for (let condition of Object.keys(conditions)) {
				let isActive = false;
				for (let con of this.character.conditions)
					if (con === condition) {
						isActive = true;
						break;
					}


				if (isActive)  // character has this condition
					this.conditions.push({
						src: conditions[condition],
						name: condition,
						active: true
					});
				else
					this.conditions.push({
						src: conditions[condition],
						name: condition,
						active: false
					});

			}
		},
		saveConditions() {
			let activeConditions = [];
			for (let condition of this.conditions)
				if (condition.active)
					activeConditions.push(condition.name);



			setCharacterConditions(this.character.id, activeConditions);
			this.$root.$emit("close-character-conditions-popup");
		},
		activateCondition(index) {
			this.conditions[index].active = !this.conditions[index].active;
		}
	}
};
</script>

<style scoped lang="scss">
@import "assets/css/scheme";
</style>
