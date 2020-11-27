<template>
	<div
		v-show="diceActive"
		@click="disableDice"
	>
		<div id="canvas" />
	</div>
</template>
<script>
import {clearBox, dice_initialize, roll} from "@/logic/dice/main";

export default {
	data() {
		return {
			diceActive: true
		};
	},
	computed: {
		diceValue() {
			return this.$store.state.dice.value;
		}
	},
	watch: {
		diceValue(value) {
			if (value !== "") {
				this.diceActive = true;
				roll(value);
				this.$store.commit("dice/roll", "");
			}
		}
	},
	mounted() {
		dice_initialize(document.body);
	},
	methods: {
		disableDice() {
			clearBox();
			this.diceActive = false;
		}
	}
};
</script>
