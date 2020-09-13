<template>
  <PopupContainer ref="popupContainer" title="Add Player to Character">
    <div v-for="player in players">
      <div class="flex flex-row text-white">
        <div class="flex justify-center items-center">
          <input type="checkbox" v-model="player.active">
        </div>
        <div class="ml-2">
          {{ player.player.name }}
        </div>
      </div>
    </div>

    <div class="submit-button active:submit-button-active my-2" @click="savePlayers()">Save</div>

  </PopupContainer>
</template>
<script>
import PopupContainer from "../gui-components/PopupContainer";
import {getAllPlayers} from "@/plugins/backendComunication/player";
import {setCharacterPlayers} from "@/plugins/backendComunication/characters";

export default {
  components: {PopupContainer},
  data() {
    return {
      character: null,
      players: []
    }
  },
  mounted() {
    this.$root.$on("openPlayerCharacterPopup", (character) => {
      this.$refs.popupContainer.active = true;
      this.character = character;

      this.players = [];
      for (let player of getAllPlayers()) {
        let found = false;
        for (let characterPlayer of character.players) {
          if (characterPlayer.id == player.id) {
            found = true;
            break;
          }
        }
        if (found) {
          this.players.push({
            player,
            active: true
          });
        } else {
          this.players.push({
            player,
            active: false
          })
        }
      }
      console.log(this.players)
    });
    this.$root.$on("closePlayerCharacterPopup", () => {
      this.$refs.popupContainer.active = false;
    });
  },
  methods: {
    savePlayers() {
      setCharacterPlayers(this.character.id, this.players.filter((player) => player.active).map((player) => player.player.id))
    }
  }
}
</script>
<style scoped lang="scss">
@import "assets/css/scheme";
</style>
