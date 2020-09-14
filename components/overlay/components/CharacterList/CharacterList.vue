<template>
  <div v-if="getOwnCharacters().length !== 0">

    <div class="hr"/>

    <MultipleCharacterView v-if="$store.state.character.selectedCharacter == ''"/>
    <SingleCharacterView v-else/>

  </div>
</template>

<script>
import {store} from "../../../../logic/stage/main";
import SingleCharacterView from "@/components/overlay/components/CharacterList/SingleCharacterView";
import MultipleCharacterView from "@/components/overlay/components/CharacterList/MutlitpleCharacterView"

export default {
  components: {SingleCharacterView, MultipleCharacterView},
  methods: {
    getOwnCharacters() {
      if (store.state.authentication.playerID == null) {
        return store.state.character.characters;
      }

      let ownCharacter = [];
      for (let charater of store.state.character.characters) {
        for (let player of charater.players) {
          if (player.id == store.state.authentication.playerID) {
            ownCharacter.push(charater);
          }
        }
      }
      return ownCharacter;
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../../../assets/css/scheme";
</style>
