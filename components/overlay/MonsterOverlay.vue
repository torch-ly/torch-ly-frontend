<template>
  <div class="overflow-auto block w-full h-full p-6">
    <input class="input-field mb-4" v-model="searchTerm" placeholder="Search..." @keyup="atChange">
    <LoadingSpinner v-show="spinner" class="mx-auto" />

    <div v-if="filteredMonsters.length > 0">
      <div v-for="monster in filteredMonsters" class="overflow-auto my-2 mx-1">
        <a :href="monsterUrl(monster.name)" target="_blank" :title="monster.name">{{monster.name}}</a>
      </div>
    </div>

    <div v-else-if="!spinner" class="flex justify-center items-center">
      <p class="font-xl font-bold text-center">Hm - wo sind die Monster hin...? </p>
      <fa icon="monster"></fa>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import LoadingSpinner from "../gui-components/LoadingSpinner"

export default {
  data() {
    return {
      monsters: [],
      filteredMonsters: [],
      searchTerm: "",
      debouncer: () => {},
      spinner: false
    }
  },
  components: {LoadingSpinner},
  methods: {
    atChange(e) {
      console.log(e)
      if (e.key.length > 1 && e.key !== "Backspace") return;
      this.spinner = true;
      this.debouncer();
    },
    monsterUrl(name) {
      console.log(name)
      return "https://www.dndbeyond.com/monsters/" + name.replace(/ /g, "-").replace(/"/g, "");
    }
  },
  async created() {
    this.$axios.$get("https://5e.tools/data/bestiary/index.json?v=1.110.1").then(res => {

      let self = this;

      this.debouncer = _.debounce(() => {
        self.filteredMonsters = self.monsters.filter(m => m.name.includes(self.searchTerm));
        self.spinner = false;
      }, 500)

      let promises = [];
      Object.entries(res).forEach(book => promises.push(this.$axios.$get("https://5e.tools/data/bestiary/" + String(book[1]))));

      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }

      Promise.all(promises).then(values => {
        this.monsters = values.map(a => a.monster).flat().sort(compare)
        this.filteredMonsters = this.monsters;
      });
    });
  }
}
</script>
<style lang="scss">
@import "assets/css/scheme";
</style>
