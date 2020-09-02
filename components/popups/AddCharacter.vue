<template>
  <PopupContainer ref="popupContainer" title="Add Character">
    <form @submit.prevent="newCharacter">

      <input type="text" name="name" class="input-field mb-4" placeholder="Name" v-model="character.name">
      <input type="text" name="token" class="input-field mb-4" placeholder="Token-URL" v-model="character.token">


      <AdvancedOptions>
        <input type="text" name="sheet" class="input-field mb-4" placeholder="Character-Sheet-URL"
               v-model="character.sheet">

        <input type="number" name="xValue" class="input-field mb-4" placeholder="X-Value"
               v-model="character.pos.point.x">

        <input type="number" name="yValue" class="input-field mb-4" placeholder="Y-Value"
               v-model="character.pos.point.y">

        <input type="number" name="size" class="input-field mb-4" placeholder="Size" v-model="character.pos.size">
      </AdvancedOptions>

      <input type="submit" class="submit-button active:submit-button-active mt-2">
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
      }
    },
    mounted() {
      this.$root.$on("openCharacterPopup", () => {
        this.$refs.popupContainer.active = true;
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
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "assets/css/scheme";

  .advanced-icon {
    @apply ml-2 text-xl;
  }
</style>
