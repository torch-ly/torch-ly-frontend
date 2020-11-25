<template>
  <div>
    <div class="hr mb-4"/>

    <SingleCharacterView v-if="$store.state.character.selectedCharacter !== ''"/>

    <MultipleCharacterView
        v-else-if="getCharactersByPlayerID(currentPlayer).length !== 0 && !isGM"
        :player-i-d="currentPlayer"
    />

    <GMCharacterView v-else-if="isGM"/>
  </div>
</template>

<script>
import SingleCharacterView from "@/components/overlay/MoveOverlay/CharacterList/SingleCharacterView";
import MultipleCharacterView from "@/components/overlay/MoveOverlay/CharacterList/MutlitpleCharacterView";
import GMCharacterView from "@/components/overlay/MoveOverlay/CharacterList/GMCharacterView";
import {getCharactersByPlayerID} from "@/plugins/utils/characterHelper";

export default {
  components: {GMCharacterView, SingleCharacterView, MultipleCharacterView},
  computed: {
    allCharacters() {
      return this.$store.state.character.characters;
    },
    isGM() {
      return this.$store.state.authentication.gm;
    },
    currentPlayer() {
      return this.$store.state.authentication.playerID;
    }
  },
  methods: {
    getCharactersByPlayerID,
  }
};
</script>
<style scoped lang="scss">
@import "../../../../assets/css/scheme";
</style>
