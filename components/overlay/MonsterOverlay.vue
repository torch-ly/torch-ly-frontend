<template>
  <div class="relative h-screen">
    <div class="w-full absolute p-6 bg-gray-700">
      <input class="w-full input-field" v-model="searchTerm" placeholder="Search..." @keyup="atChange">
    </div>

    <div v-if="!noMonsters" class="h-full w-full pt-24">
      <div class="block w-full h-full overflow-auto px-6">
        <div v-for="monster in monsters" v-show="monster.visible" class="overflow-auto my-2 mx-1">
          <a :href="monsterUrl(monster.name)" target="_blank" :title="monster.name">{{monster.name}}</a>
        </div>
      </div>
    </div>

    <div v-else class="flex justify-center items-center p-6 pt-24">
      <p class="font-xl font-bold text-center">Hm - wo sind die Monster hin...? </p>
      <!--fa icon="monster"></fa-->
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import LoadingSpinner from "../gui-components/LoadingSpinner"
import {getMonsters} from "@/plugins/backendComunication";

export default {
  data() {
    return {
      monsters: [],
      noMonsters: true,
      searchTerm: "",
      debouncer: () => {},
    }
  },
  components: {LoadingSpinner},
  methods: {
    atChange(e) {
      if (e.key.length > 1 && e.key !== "Backspace") return;
      this.debouncer();
    },
    monsterUrl(name) {
      return "https://www.dndbeyond.com/monsters/" + name.replace(/ /g, "-").replace(/"/g, "");
    }
  },
  async created() {

    this.monsters = JSON.parse((await getMonsters()).data.getMonsters).map(a => {
      this.noMonsters = false;

      return {
        ...a,
        visible: true
      }
    })

    let self = this;

    this.debouncer = _.debounce(() => {
      let monsters = false;

      self.monsters = self.monsters.map(m => {
        let visible = m.name.includes(self.searchTerm);
        m.visible = visible;
        monsters |= visible;
        return m;
      });

      this.noMonsters = !monsters;
    }, 0)

    /*this.$axios.$get("https://5e.tools/data/bestiary/index.json?v=1.110.1").then(res => {



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
        this.monsters = this.monsters;
      });
    });*/
  }
}
</script>
<style lang="scss">
@import "assets/css/scheme";
</style>
