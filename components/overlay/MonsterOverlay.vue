<template>
  <div class="relative h-screen">
    <div class="w-full absolute p-6 bg-gray-700">
      <input class="w-full input-field" ref="input" v-model="searchTerm" placeholder="Search..." @keyup="atChange" autofocus>
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
    }
  },
  components: {LoadingSpinner},
  methods: {
    atChange(e) {
      if (e.key.length > 1 && e.key !== "Backspace") return;
      let monsters = false;

      this.monsters = this.monsters.map(m => {
        let visible = m.name.includes(this.searchTerm);
        m.visible = visible;
        monsters |= visible;
        return m;
      });

      this.noMonsters = !monsters;
    },
    monsterUrl(name) {
      return "https://www.dndbeyond.com/monsters/" + name.replace(/ /g, "-").replace(/"/g, "");
    }
  },
  computed: {
    monstersActive() {
      return this.$store.state.manu.monsters;
    }
  },
  watch: {
    monstersActive (value) {
        if (value)
          this.$nextTick(() => this.$refs.input.focus());
    }
  },
  async fetch() {

    this.monsters = JSON.parse((await getMonsters()).data.getMonsters).map(a => {
      this.noMonsters = false;

      return {
        ...a,
        visible: true
      }
    })

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
