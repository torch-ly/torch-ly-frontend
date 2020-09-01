<template>
  <div v-if="getOwnCharacters().length !== 0">

    <div class="hr"/>

    <div v-for="(character, index) in getOwnCharacters()">
      <div class="w-full flex flex-column my-4 justify-center items-center" @click="selectToken(character)">
        <img class="w-20 h-20 block" draggable="false"  v-bind:src="character.token">
        <div class="w-2/3 flex-col ml-2 pl-2 border-l-2 text-lg py-2"><span
          class="font-bold block">{{ character.name }}</span> <span class="block">{{ getPlayerNames(character) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {store} from "../../../logic/stage/main";
  import {selectToken} from "~/logic/stage/layers/transformer";

  export default {
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
      },
      selectToken(character) {
        selectToken(character);
      }
    },
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/css/scheme";
</style>
