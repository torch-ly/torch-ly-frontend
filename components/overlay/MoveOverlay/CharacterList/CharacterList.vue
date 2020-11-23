<template>
  <div>

    <div class="hr mb-4"/>

    <SingleCharacterView v-if="$store.state.character.selectedCharacter !== ''"/>

    <MultipleCharacterView v-if="getOwnCharacters().length !== 0 && !isGM"
                           :player-i-d="$store.state.authentication.playerID"/>

    <GMCharacterView v-else-if="isGM"/>

  </div>
</template>

<script>
import SingleCharacterView from "@/components/overlay/MoveOverlay/CharacterList/SingleCharacterView";
import MultipleCharacterView from "@/components/overlay/MoveOverlay/CharacterList/MutlitpleCharacterView"
import GMCharacterView from "@/components/overlay/MoveOverlay/CharacterList/GMCharacterView";

export default {
  components: {GMCharacterView, SingleCharacterView, MultipleCharacterView},
  methods: {
    getOwnCharacters() {

      let ownCharacter = [];
      for (let charater of this.$store.state.character.characters) {
        for (let player of charater.players) {
          if (player.id === this.$store.state.authentication.playerID) {
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
