<template>
  <PopupContainer v-show="active">
    <form @submit.prevent="newCharacter" class="relative">
      <h2 class="header1">Charakter hinzufügen</h2>

      <input type="text" name="name" class="input-field" placeholder="Name" v-model="character.name"><br>

      <input type="text" name="token" class="input-field" placeholder="Token-URL" v-model="character.token"><br>

      <div class="text-white select-none" @click="toggleActive">
        Advanced
        <fa v-show="!advanced" icon="caret-right" class="advanced-icon"></fa>
        <fa v-show="advanced" icon="caret-down" class="advanced-icon"></fa>
      </div>

      <br>

      <div v-show="advanced">
        <input type="text" name="sheet" class="input-field" placeholder="Character-Sheet-URL" v-model="character.sheet"><br>

        <input type="number" name="xValue" class="input-field" placeholder="X-Value"
               v-model="character.pos.point.x"><br>

        <input type="number" name="yValue" class="input-field" placeholder="Y-Value"
               v-model="character.pos.point.y"><br>

        <input type="number" name="size" class="input-field" placeholder="Size" v-model="character.pos.size"><br>
      </div>

      <input type="submit" class="submit-button active:submit-button-active mt-2">

      <div class="p-3 absolute top-0 right-0 -mt-2 -mr-2" @click="closePopup">
        <fa icon="times" class="text-white text-xl"/>
      </div>
    </form>
  </PopupContainer>
</template>

<script>
  import PopupContainer from "../gui-components/PopupContainer";
  import {addCharacter} from "../../plugins/backendComunication";

  export default {
    components: {PopupContainer},
    data() {
      return {
        active: false,
        advanced: false,
        character: {
          name: "",
          token: "",
          pos: {
            point: {}
          },
          sheet: "",
          visible: false,
          player: ["5f1832bcca858f1b38cebf41"]
        }
      }
    },
    mounted() {
      this.$root.$on("openCharacterPopup", () => {
        this.active = true;
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
          player: this.character.player
        });
        this.closePopup();
      },
      closePopup() {
        this.active = false;
      },
      toggleActive() {
        this.advanced = !this.advanced;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "assets/css/scheme";

  .advanced-icon {
    @apply ml-2 text-xl;
  }
</style>
