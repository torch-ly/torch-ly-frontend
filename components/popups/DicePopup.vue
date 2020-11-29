<template>
    <PopupContainer
        ref="popupContainer"
        title="Dice Popup"
        class="text-white"
    >
        <span class="text-xl">Basic Rolls</span>
        <div
            class="w-full flex flex-row justify-between mt-5"
        >
            <div
                v-for="dice in diceTypes"
                :key="dice.key"
            >
                <div
                    @click="roll(1, dice)"
                >
                    {{ dice }}
                </div>
            </div>
        </div>

        <span class="text-xl">Advanced Roll</span>
        <div
            class="w-full flex-row justify-between mt-5"
        >
            Roll:

            <input
                v-model="number"
                type="number"
                value="1"
                class="input"
            >
            <select
                v-model="sides"
                class="input"
            >
                <option
                    v-for="dice in diceTypes"
                    :key="dice.key"
                    :value="dice"
                    :selected="dice === 'd20'"
                >
                    {{ dice }}
                </option>
            </select>

            +

            <input
                v-model="modifire"
                type="number"
                value="0"
                class="input"
                disabled
            >

            <button
                class="bg-accent-light active:bg-accent p-2 ml-5 font-bold w-20 rounded text-white text-center select-none"
                @click="roll(number, sides)"
            >
                Roll
            </button>
        </div>

        Modifires will be supported soon
    </PopupContainer>
</template>
<script>
import PopupContainer from "../gui-components/PopupContainer";

export default {
	components: {PopupContainer},
	data() {
		return {
			diceTypes: [ "d4", "d6", "d8", "d10", "d12", "d20", "d100" ],
			number: 1,
			sides: "d20",
			modifire: 0
		};
	},
	mounted() {
		this.$root.$on("open-dice-popup", () => {
			this.$refs.popupContainer.active = true;
		});
		this.$root.$on("close-dice-popup", () => {
			this.$refs.popupContainer.active = false;
		});
	},
	methods: {
		roll(number, sides) {
			this.$store.dispatch("console/execute", "/roll " + number + sides);
		}
	}
};
</script>
<style scoped lang="scss">
@import "assets/css/scheme";

.input {
  @apply w-20 h-6 rounded text-black pl-2
}
</style>
