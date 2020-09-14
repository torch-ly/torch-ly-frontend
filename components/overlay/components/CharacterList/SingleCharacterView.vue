<template>
  <div class="mt-3">
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
                <div class="w-1/3">AC: </div>
                <input class="w-2/3 text-black pl-1 rounded" type="number" v-model="ac">
              </div>
              <div class="submit-button active:submit-button-active my-2" @click="saveCharacterDetailChanges()">Save changes</div>
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
    <textarea v-model="notes" class="text-black"/>
  </div>
</template>
<script>
import {evaluate} from "mathjs";
import {setCharacterDetails} from "@/plugins/backendComunication/characters";
import {store} from "@/logic/stage/main";

export default {
  data() {
    return {
      selectedCharacter: null,
      hp: 5,
      ac: 4,
      notes: null
    }
  },
  methods: {
    evaluateHPBox() {
      this.hp = evaluate(this.hp);
      this.saveCharacterDetailChanges();
    },
    openPlayersPopup() {
      this.$root.$emit("openPlayerCharacterPopup", this.selectedCharacter);
    },
    saveCharacterDetailChanges() {
      setCharacterDetails(this.selectedCharacter.id, {
        hp: this.hp,
        ac: this.ac,
        notes: this.notes
      })
    },
    openInitiativePrompt() {
      let initiative = prompt("Initiative value: ");
      if (Number.isNaN(parseInt(initiative)))
        return;
      store.commit("character/addCharacterToInitiative", {
        id: this.selectedCharacter.id,
        value: parseInt(initiative)
      });
    },
    getSelectedCharacterByID() {
      for (let character of this.characterStore.characters) {
        if (character.id == this.characterStore.selectedCharacter) {
          this.selectedCharacter = character;
          if (character.details != null) {
            this.hp = character.details.hp;
            this.ac = character.details.ac;
            this.notes = character.details.notes;
          } else {
            this.hp = "0";
            this.ac = 0;
            this.notes = "";
          }
          break;
        }
      }
    }
  },
  computed: {
    characterStore() {
      return this.$store.state.character;
    },
    alreadyInInitiativeOrder() {
      return (this.$store.state.character.initiative.filter((a) => a.id == this.selectedCharacter.id).length > 0)
    },
    selectedCharacterStore() {
      return this.$store.state.character.selectedCharacter;
    }
  },
  created() {
    this.getSelectedCharacterByID();
  },
  watch: {
    selectedCharacterStore() {
      this.getSelectedCharacterByID();
    }
  }

}
</script>
