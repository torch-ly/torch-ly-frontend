<template>
  <div>
    <div class="flex justify-between mb-6 select-none">
      <div class="text-2xl">Initiative Order</div>
      <div class="flex justify-center items-center text-lg">
        <fa v-if="fullList" icon="caret-down" @click="fullList = !fullList"></fa>
        <fa v-else icon="caret-right" @click="fullList = !fullList"></fa>
      </div>

    </div>
    <div v-for="(init, index) in getInitiativeList()" v-if="characters.length > 0" class="mb-4 flex justify-between"
         :class="{'text-accent text-lg' : (index == currentInitiativeIndex && fullList) || (index == 0 && !fullList)}">
      <div>
        <span class="font-bold">{{ getCharacterByID(init.id).name }}</span>:
      </div>
      <div class="ml-2">
        {{ init.value }}
      </div>
    </div>
    <div class="flex justify-between">
      <button @click="$store.commit('character/orderInitiative')"
              class="submit-button active:submit-button-active mr-2">Order
      </button>
      <button @click="$store.commit('character/nextTurn')" class="submit-button active:submit-button-active">Next turn
      </button>
    </div>

  </div>
</template>
<script>

export default {
  data() {
    return {
      currentInitiativeIndex: 0,
      fullList: true
    }
  },
  computed: {
    initiative() {
      return this.$store.state.character.initiative;
    },
    characters() {
      return this.$store.state.character.characters;
    }
  },
  methods: {
    getCharacterByID(id) {
      for (let character of this.characters) {
        if (character.id === id) {
          return character;
        }
      }
      return null;
    },
    getInitiativeList() {
      if (!this.fullList) {
        return [this.initiative[this.currentInitiativeIndex], this.initiative[(this.currentInitiativeIndex + 1) % this.initiative.length]];
      } else {
        return this.initiative;
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "assets/css/scheme";
</style>
