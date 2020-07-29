<template>
  <PopupContainer v-show="active">
    <form @submit.prevent="addCharacter" class="relative">
      <h2 class="header1">Charakter hinzufügen</h2>

      <input type="text" name="name" class="input-field" placeholder="Name"><br>

      <input type="text" name="token" class="input-field" placeholder="Token-URL"><br>

      <input type="submit" class="submit-button active:submit-button-active mt-2">

      <div class="p-3 absolute top-0 right-0 -mt-2 -mr-2" @click="closePopup">
        <fa icon="times" class="text-white text-xl"/>
      </div>
    </form>
  </PopupContainer>
</template>

<script>
  import PopupContainer from "../gui-components/PopupContainer"

  export default {
    components: {PopupContainer},
    data() {
      return {
        active: false
      }
    },
    mounted() {
      this.$root.$on("openCharacterPopup", () => {
        this.active = true;
      });
    },
    methods: {
      addCharacter() {
        //TODO add character
      },
      closePopup() {
        this.active = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "assets/css/scheme";
</style>
