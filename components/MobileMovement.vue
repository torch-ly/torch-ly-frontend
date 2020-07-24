<template>
  <div>
    <div v-for="character in characters" class="ml-2 mr-2">
      <table class="mt-8 mb-15">
        <tr>
          <th class="w-1/3">
            <div class="w-2/3">
              <img v-bind:src="character.img">
            </div>
          </th>
          <th class="text-left">{{ character.name }}</th>
        </tr>
      </table>
      <div class="grid gap-6 grid-cols-3 text-center mt-3">
        <div class="hover:bg-gray-300 rounded-lg h-12">&nwarr;</div>
        <div class="hover:bg-gray-300 rounded-lg h-12">&uarr;</div>
        <div class="hover:bg-gray-300 rounded-lg h-12">&nearr;</div>
        <div class="hover:bg-gray-300 rounded-lg h-12">&larr;</div>
        <div class="hover:bg-gray-300 rounded-lg h-12">o</div>
        <div class="hover:bg-gray-300 rounded-lg h-12">&rarr;</div>
        <div class="hover:bg-gray-300 rounded-lg h-12">&LowerLeftArrow;</div>
        <div class="hover:bg-gray-300 rounded-lg h-12">&darr;</div>
        <div class="hover:bg-gray-300 rounded-lg h-12">&LowerRightArrow;</div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "~/components/Table";
import {store} from "~/logic/stage/main";

export default {
  components: {Table},
  data() {
    return {
      characters: null
    }
  },
  methods: {
    getAllCharacter() {
      return [
        {
          name: "Aracokra",
          img: "https://5e.tools/img/MM/Aarakocra.png?v=1.108.1",
          id: 1
        },
        {
          name: "Ervin",
          img: "https://5e.tools/img/MM/Adult%20Blue%20Dracolich.png?v=1.108.1",
          id: 1
        }
      ]
    }
  },
  created() {
    this.characters = this.getAllCharacter().filter(character => character.id == store.state.authentication.playerID);
  }
}
</script>
