<template>
  <PopupContainer
      ref="popupContainer"
      title="Add Character"
  >
    <form @submit.prevent="newCharacter">
      <input
          v-model="character.name"
          type="text"
          name="name"
          class="input-field mb-4"
          placeholder="Name"
      >
      <input
          v-model="character.token"
          type="text"
          name="token"
          class="input-field mb-4"
          placeholder="Token-URL"
      >


      <AdvancedOptions>
        <input
            v-model="character.sheet"
            type="text"
            name="sheet"
            class="input-field mb-4"
            placeholder="Character-Sheet-URL"
        >

        <input
            v-model="character.pos.point.x"
            type="number"
            name="xValue"
            class="input-field mb-4"
            placeholder="X-Value"
        >

        <input
            v-model="character.pos.point.y"
            type="number"
            name="yValue"
            class="input-field mb-4"
            placeholder="Y-Value"
        >

        <input
            v-model="character.pos.size"
            type="number"
            name="size"
            class="input-field mb-4"
            placeholder="Size"
        >
      </AdvancedOptions>

      <input
          type="submit"
          class="submit-button active:submit-button-active mt-2"
      >
    </form>
  </PopupContainer>
</template>

<script>
import PopupContainer from "../gui-components/PopupContainer";
import AdvancedOptions from "../gui-components/AdvancedOptions";
import {addCharacter} from "../../plugins/backendComunication/characters";
import {store} from "../../logic/stage/main";

export default {
  components: {PopupContainer, AdvancedOptions},
  data() {
    return {
      character: {
        name: "",
        token: "",
        pos: {
          point: {}
        },
        sheet: "",
        visible: false
      }
    };
  },
  mounted() {
    this.$root.$on("open-character-popup", () => {
      this.$refs.popupContainer.active = true;
    });
    this.$root.$on("close-character-popup", () => {
      this.$refs.popupContainer.active = false;
    });
  },
  methods: {
    newCharacter() {
      if (this.character.token == "")
        return;

      addCharacter({
        name: this.character.name,
        token: this.character.token,
        pos: this.character.pos,
        sheet: this.character.sheet,
        visible: this.character.visible,
        player: [store.state.authentication.playerID]
      });

      this.$root.$emit("close-character-popup");
    },
  }
};
</script>

<style scoped lang="scss">
  @import "assets/css/scheme";

  .advanced-icon {
    @apply ml-2 text-xl;
  }
</style>
