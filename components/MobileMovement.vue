<template>
  <div>
    <div class="bg-background h-screen fixed top-0 overflow-auto">
      <div
        v-for="character in getOwnCharacters()"
        class="bg-primary text-white m-4 mb-0 rounded-lg shadow-lg last:mb-4">

        <div class="w-full flex flex-column">
          <img class="w-1/3 p-4 mr-0" v-bind:src="character.token">
          <th class="w-2/3 p-4 flex text-lg items-center text-left">{{ character.name }}</th>
        </div>

        <div class="grid gap-3 grid-cols-3 text-center p-3">
          <!-- Create arrows for movement-control -->
          <div v-for="(arrow, index) in arrows"
               class="flex justify-center items-center hover:bg-accent focus:bg-accent rounded-full h-12"
               @click="click(index, character)">

          <fa :icon="arrow" style="font-size: 1.8rem; color: white;"
                :class="{'rotate-45': [0,2,6,8].includes(index)}"/>

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
      arrows: ["angle-left", "angle-up", "angle-up", "angle-left", "dot-circle", "angle-right", "angle-down", "angle-down", "angle-right"]
    }
  },
  methods: {
    click(index, character) {
      window.navigator.vibrate(40);
      let pos = {
          x: character.pos.point.x,
          y: character.pos.point.y
        }
        switch (index) {
          case 1:
            setCharacterPosition(character.id, {
              x: pos.x,
              y: pos.y - 1
            })
            break;
          case 3:
            setCharacterPosition(character.id, {
              x: pos.x - 1,
              y: pos.y
            })
            break;
          case 5:
            setCharacterPosition(character.id, {
              x: pos.x + 1,
              y: pos.y
            })
            break;
          case 7:
            setCharacterPosition(character.id, {
              x: pos.x,
              y: pos.y + 1
            })
            break;
        }
      },
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
