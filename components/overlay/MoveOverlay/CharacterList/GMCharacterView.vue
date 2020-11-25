<template>
  <div>
    <div
        v-for="player in players"
        :key="player.key"
    >
      <div
          v-if="player.charactersOnStage > 0"
          class="border rounded p-2 mb-2"
      >
        <div
            class="flex flex-row justify-between select-none"
            @click="player.active = !player.active"
        >
          <div>{{ player.object.name }}</div>
          <div class="w-1/5 flex flex-row justify-between items-center">
            {{ player.charactersOnStage }}
            <fa
                v-if="!player.active"
                icon="caret-right"
                class="active-icon"
            />
            <fa
                v-else
                icon="caret-down"
                class="active-icon"
            />
          </div>
        </div>
        <MultipleCharacterView
            v-if="player.active"
            :player-i-d="player.object.id"
        />
      </div>
    </div>
  </div>
</template>
<script>
import MultipleCharacterView from "@/components/overlay/MoveOverlay/CharacterList/MutlitpleCharacterView";
import {getCharactersByPlayerID} from "@/plugins/utils/characterHelper";

export default {
  components: {MultipleCharacterView},
  data() {
    return {
      players: []
    };
  },
  computed: {
    allPlayers() {
      return this.$store.state.players.players;
    },
    allCharacters() {
      return this.$store.state.character.characters;
    }
  },
  watch: {
    allPlayers() {
      this.generatePlayerArray();
    },
    allCharacters() {
      this.generatePlayerArray();
    }
  },
  created() {
    this.generatePlayerArray();
  },
  methods: {
    getCharactersByPlayerID,
    generatePlayerArray() {

      if (this.allPlayers == undefined)
        return;

      let oldArray = [...this.players];
      this.players = [];

      for (let player of this.allPlayers) {

        let wasActiveBeforeReset;
        if (JSON.parse(JSON.stringify(oldArray.filter((char) => char.object.id === player.id))).length > 0) {
          wasActiveBeforeReset = JSON.parse(JSON.stringify(oldArray.filter((char) => char.object.id === player.id)))[0].active;
        } else {
          wasActiveBeforeReset = false;
        }

        this.players.push({
          object: player,
          active: wasActiveBeforeReset,
          charactersOnStage: this.getCharactersByPlayerID(player.id).length,
        });
      }

      // characters without players
      this.players.push({
        object: {
          id: null,
          name: "Unassigned Characters"
        },
        active: oldArray.length > 0 ? oldArray[oldArray.length - 1] : false,
        charactersOnStage: this.allCharacters.filter((character) => character.players.length === 0).length
      });
      console.log(this.players);
    }
  }
};
</script>
<style scoped>
.active-icon {
  @apply ml-2 text-xl w-2;
}
</style>
