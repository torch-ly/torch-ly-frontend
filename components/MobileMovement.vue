<template>
  <div class="bg-background min-h-screen overflow-scroll">
    <h1 class="text-center text-black mb-4 mt-8 text-2xl font-bold">Character overview of {{$store.state.authentication.name}}</h1>

    <div class="bg-background h-auto w-full overflow-auto grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <div
        v-for="character in getOwnCharacters()"
        class="bg-primary text-white  mb-0 rounded-lg shadow-lg h-auto">

        <div class="w-full flex flex-column justify-center">
          <img class="w-48 h-48 p-4 mr-0" v-bind:src="character.token">
          <p class="p-4 flex text-lg md:text-xl items-center text-left">{{ character.name }}</p>
        </div>

        <div class="grid gap-3 grid-cols-3 text-center p-3">
          <!-- Create arrows for movement-control -->
          <div v-for="(arrow, index) in arrows"
               class="flex justify-center items-center hover:bg-accent active:bg-accent rounded-full h-12"
               @click="click(index, character)">

            <fa v-if="index !== 4" :icon="arrow" class="text-white text-3xl w-16 h-16"
                :class="{'rotate-45': [0,2,6,8].includes(index)}"/>

            <div v-else>
              <p class="text-2xl select-none">{{ displacement }}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
    <div v-if="getOwnCharacters().length == 0" class="text-center text-xl m-10 font-bold">
      No Characters Loaded
    </div>
  </div>
</template>
<script>
import Table from "~/components/Table";
import {setCharacterPosition} from "../plugins/backendComunication/characters";
import {store} from "../logic/stage/main";

export default {
  components: {Table},
  data() {
    return {
      displacement: 0,
      moves: [],
      arrows: ["angle-left", "angle-up", "angle-up", "angle-left", "dot-circle", "angle-right", "angle-down", "angle-down", "angle-right"]
    }
  },
  methods: {
    click(index, character) {
      if (window.navigator.vibrate)
        window.navigator.vibrate(40);

      let pos = {
        x: character.pos.point.x,
        y: character.pos.point.y
      }
      switch (index) {
        case 0:
          setCharacterPosition(character.id, {
            x: pos.x - 1,
            y: pos.y - 1
          })
          break;
        case 1:
          setCharacterPosition(character.id, {
            x: pos.x,
            y: pos.y - 1
          })
          break;
        case 2:
          setCharacterPosition(character.id, {
            x: pos.x + 1,
            y: pos.y - 1
          })
          break;
        case 3:
          setCharacterPosition(character.id, {
            x: pos.x - 1,
            y: pos.y
          })
          break;
        case 4:
          if (window.navigator.vibrate)
              navigator.vibrate([50, 10, 50, 10, 50]);
          break;
        case 5:
          setCharacterPosition(character.id, {
            x: pos.x + 1,
            y: pos.y
          })
          break;
        case 6:
          setCharacterPosition(character.id, {
            x: pos.x - 1,
            y: pos.y + 1
          })
          break;
        case 7:
          setCharacterPosition(character.id, {
            x: pos.x,
            y: pos.y + 1
          })
          break;
        case 8:
          setCharacterPosition(character.id, {
            x: pos.x + 1,
            y: pos.y + 1
          })
          break;
      }
      if (index == 4){
        this.moves = [];
      }else if (index + this.moves[this.moves.length-1] == 8){
        this.moves.pop();
      }else{
        this.moves.push(index);
      }
      this.displacement = this.moves.length * 5;
    },
    //todo
    getOwnCharacters() {
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
  }
}
</script>
<style scoped>
.rotate-45 {
  transform: rotate(45deg);
}
</style>
