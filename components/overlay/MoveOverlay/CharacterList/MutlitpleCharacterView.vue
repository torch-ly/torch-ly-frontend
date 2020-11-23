<template>
  <div>
    <div v-for="character in getCharactersByPlayerID(currentPlayer)">
      <div class="w-full flex flex-column my-4 justify-center items-center" @click="selectToken(character)">
        <img class="w-20 h-20 block" draggable="false" v-bind:src="character.token">
        <div class="w-2/3 flex-col ml-2 pl-2 border-l-2 text-lg py-2"><span
          class="font-bold block"
          :class="{'text-red-500' : characterStore.hoverOverCharacter === character.id}">{{ character.name }}</span>
          <span class="block">{{ getPlayerNames(character) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {selectToken} from "@/logic/stage/functions/transformer/transformer";
import {getCharactersByPlayerID} from "@/plugins/utils/characterHelper";

export default {
  props: ['playerID'],
  methods: {
    getCharactersByPlayerID,
    selectToken,
    getPlayerNames(character) {
      let out = "";

      for (let player of character.players) {
        if (out === "") {
          out += player.name;
        } else {
          out += ", " + player.name;
        }
      }

      return out;
    }
  },
  computed: {
    characterStore() {
      return this.$store.state.character;
    },
    charactersInStore() {
      return this.characterStore.characters;
    },
    currentPlayer() {
      return this.$store.state.authentication.playerID
    }
  }
}
</script>
