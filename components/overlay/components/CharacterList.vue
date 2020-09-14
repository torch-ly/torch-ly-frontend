<template>
  <div v-if="getOwnCharacters().length !== 0">

    <div class="hr"/>

    <div v-if="characterStore.selectedCharacter == ''">
      <div v-for="(character, index) in getOwnCharacters()">
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
    <div v-else class="mt-3">
      {{ getSelectedCharacterByID() }}
      <div class="w-full flex flex-column my-4 justify-center items-center">
        <img class="w-20 h-20 block" draggable="false" v-bind:src="selectedCharacter.token">
        <div class="w-2/3 flex-col ml-2 pl-2 border-l-2 text-lg py-2"><span
          class="font-bold block" contenteditable="true">{{ selectedCharacter.name }}</span>
          <span class="block">
            <form @submit.prevent="evaluateHPBox()">
              <div class="flex flex-row justify-between">
                <div class="w-1/3">HP: </div>
                <input class="w-2/3 text-black pl-1 rounded" v-on:keyup.enter="evaluateHPBox()" type="text"
                       autocomplete="off" v-model="hp">
              </div>
              <div class="flex flex-row justify-between mt-1">
                <div class="w-1/3">RK: </div>
                <input class="w-2/3 text-black pl-1 rounded" type="number" v-model="rk">
              </div>
            </form>
          </span>
        </div>
      </div>

      <div class="hr"/>

      <div class="submit-button active:submit-button-active my-2" @click="openPlayersPopup()">Add Players</div>

      <div class="submit-button active:submit-button-active my-2" @click="openInitiativePrompt()"
           v-if="!alreadyInInitiativeOrder">Add to Initiative
      </div>

      <div class="hr"/>

      <div class="text-lg mb-2">Notes:</div>
      <div contenteditable="true">
        gjlkdfgjklm,sjknmdg
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "../../../logic/stage/main";
import {selectToken} from "~/logic/stage/layers/transformer";
import {evaluate} from "mathjs";

export default {
  data() {
    return {
      selectedCharacter: null,
      hp: 5,
      rk: 4
    }
  },
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
    },
    getSelectedCharacterByID() {
      for (let character of this.characterStore.characters) {
        if (character.id == this.characterStore.selectedCharacter) {
          this.selectedCharacter = character;
        }
      }
    },
    evaluateHPBox() {
      this.hp = evaluate(this.hp);
    },
    openPlayersPopup() {
      this.$root.$emit("openPlayerCharacterPopup", this.selectedCharacter);
    },
    openInitiativePrompt() {
      let initiative = prompt("Initiative value: ");
      store.commit("character/addCharacterToInitiative", {
        id: this.selectedCharacter.id,
        value: initiative
      });
    }
  },
  computed: {
    characterStore() {
      return this.$store.state.character;
    },
    alreadyInInitiativeOrder() {
      return (this.$store.state.character.initiative.filter((a) => a.id == this.selectedCharacter.id).length > 0)
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../../assets/css/scheme";
</style>
