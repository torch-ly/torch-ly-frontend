<template>
  <div>

    <div class="hr mb-4"/>

    <div v-if="getOwnCharacters().length !== 0 && !isGM">

      <MultipleCharacterView v-if="$store.state.character.selectedCharacter == ''"
                             :player-i-d="$store.state.authentication.playerID"/>
      <SingleCharacterView v-else/>

    </div>

    <GMCharacterView v-if="isGM && $store.state.character.selectedCharacter == ''"/>

    <SingleCharacterView v-if="$store.state.character.selectedCharacter !== ''"/>

  </div>
</template>

<script>
import {store} from "../../../../logic/stage/main";
import SingleCharacterView from "@/components/overlay/MoveOverlay/CharacterList/SingleCharacterView";
import MultipleCharacterView from "@/components/overlay/MoveOverlay/CharacterList/MutlitpleCharacterView"
import GMCharacterView from "@/components/overlay/MoveOverlay/CharacterList/GMCharacterView";

export default {
  components: {GMCharacterView, SingleCharacterView, MultipleCharacterView},
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
  },
  computed: {
    allCharacters() {
      return this.$store.state.character.characters;
    },
    isGM() {
      return this.$store.state.authentication.gm;
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../../../assets/css/scheme";
</style>
