<template>
  <div class="bg-background h-screen fixed top-0">
    <div
      v-for="character in $store.state.character.characters"
      class="bg-primary text-white m-4 mb-0 rounded-lg shadow-lg">
      <div class="w-full flex flex-column">
        <img class="w-1/3 p-4 mr-0" v-bind:src="character.token">
        <th class="w-2/3 p-4 flex text-lg items-center text-left">{{ character.name }}</th>
      </div>
      <div class="grid gap-3 grid-cols-3 text-center p-3">
        <!--Create arrows for movement-controll-->
        <div v-for="(arrow, index) in arrows"
             class="flex justify-center items-center hover:bg-accent focus:bg-accent rounded-full h-12"
             @click="click(index, character)">
          <fa :icon="arrow" style="font-size: 1.8rem; color: white;" :class="{'rotate-45': [0,2,6,8].includes(index)}"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Table from "~/components/Table";
  import {moveToken} from "../logic/stage/layers/objectFunctions";
  import {setCharacterPosition} from "../plugins/backendComunication";

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
        console.log(index, character)
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
        // ToDo: Handle click
      }
    }
  }
  //.filter(character => character.players.includes($store.state.authentication.playerID))
</script>
<style scoped>
  .rotate-45 {
    transform: rotate(45deg);
  }
</style>
