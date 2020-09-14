<template>
  <div>
    <div v-for="character in characterList">
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
import {selectToken} from "@/logic/stage/layers/transformer";

export default {
  data() {
    return {
      characterList: []
    }
  },
  methods: {
    updateOwnCharacters() {
      if (this.$store.state.authentication.playerID == null) {
        this.characterList = this.characterStore.characters;
      }

      let ownCharacter = [];
      for (let character of this.characterStore.characters) {
        for (let player of character.players) {
          if (player.id == this.$store.state.authentication.playerID) {
            ownCharacter.push(character);
          }
        }
      }
      this.characterList = ownCharacter;
    },
    selectToken(character) {
      selectToken(character);
    },
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
    }
  },
  watch: {
    charactersInStore() {
      console.log("whatcherIsActive");
      this.updateOwnCharacters();
    }
  },
  created() {
    this.updateOwnCharacters();
  }
}
</script>
