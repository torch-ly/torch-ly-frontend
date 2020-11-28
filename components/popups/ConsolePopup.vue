<template>
    <PopupContainer
        ref="popupContainer"
        title="Console"
    >
        <Console />
    </PopupContainer>
</template>
<script>
import PopupContainer from "../gui-components/PopupContainer";
import Console from "@/components/Console";

export default {
	components: {PopupContainer, Console},
	computed: {
		openConsolePopup() {
			return this.$store.state.console.openConsolePopup;
		}
	},
	watch: {
		openConsolePopup(value) {
			if (value) {
				this.$refs.popupContainer.active = !this.$refs.popupContainer.active;
				this.$store.commit("console/openConsolePopup", false);
			}
		}
	},
	mounted() {
		this.$root.$on("open-console-popup", () => {
			this.$refs.popupContainer.active = true;
		});
		this.$root.$on("close-console-popup", () => {
			this.$refs.popupContainer.active = false;
		});
	}
};
</script>
<style scoped lang="scss">
@import "assets/css/scheme";
</style>
