<template>
  <div class="relative h-screen">
    <div class="w-full absolute p-6 bg-gray-700">
      <input
        ref="input"
        v-model="searchTerm"
        class="w-full input-field"
        placeholder="Search..."
        autofocus
        @keyup="atChange"
      >
    </div>

    <div
      v-if="!noMonsters"
      class="h-full w-full pt-24"
    >
      <div class="block w-full h-full overflow-auto px-6">
        <div
          v-for="monster in monsters"
          v-show="monster.visible"
          :key="monster.key"
          class="overflow-auto my-2 mx-1"
        >
          <div class="flex justify-between">
            <a
              :href="monsterUrl(monster.name)"
              target="_blank"
              :title="monster.name"
              draggable="true"
              @dragstart="drag($event, monster)"
            >{{ monster.name }}</a>
            <!--fa icon="angle-down"></fa-->
            <div
              class="select-none px-2 py-1"
              @click="expandMonster(monster)"
            >
              <div
                class="transition duration-200 transform "
                :class="{'-rotate-90' : !monster.details}"
              >
                ▼
              </div>
            </div>
          </div>
          <div
            v-if="monster.details"
            class="bg-gray-600 p-1 rounded animate__animated animate__fadeInDown animate__faster"
          >
            {{ generateHPString(monster) }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="flex justify-center items-center p-6 pt-24"
    >
      <p class="font-xl font-bold text-center">
        Hm - wo sind die Monster hin...?
      </p>
      <!--fa icon="monster"></fa-->
    </div>
  </div>
</template>
<script>
import {getMonsters} from "@/plugins/backendComunication/monster";
import {toggleLayer} from "@/logic/hotkey";

export default {
	data() {
		return {
			monsters: [],
			noMonsters: true,
			monsterDetailsActive: false,
			searchTerm: "",
		};
	},
	async fetch() {

		this.monsters = JSON.parse((await getMonsters()).data.getMonsters).map(a => {
			this.noMonsters = false;

			return {
				...a,
				visible: true,
				details: false
			};
		});
	},
	computed: {
		monstersActive() {
			return this.$store.state.manu.monsters;
		}
	},
	watch: {
		monstersActive(value) {
			if (value)
				this.$nextTick(() => this.$refs.input.focus());
		}
	},
	methods: {
		drag(e, monster) {
			e.dataTransfer.setData("monster", JSON.stringify(monster));
			e.dataTransfer.setData("imgUrl", "https://5e.tools/img/" + monster.source + "/" + monster.name + ".png");
		},
		atChange(e) {
			if (e.key === "b" && e.ctrlKey)
				toggleLayer();

			if (e.key.length > 1 && e.key !== "Backspace")
				return;

			let monsters = false;

			this.monsters = this.monsters.map(m => {
				let visible = m.name.toUpperCase().includes(this.searchTerm.toUpperCase());
				m.visible = visible;
				monsters |= visible;
				return m;
			});

			this.noMonsters = !monsters;
		},
		monsterUrl(name) {
			return "https://www.dndbeyond.com/monsters/" + name.replace(/ /g, "-").replace(/"/g, "");
		},
		expandMonster(monster) {
			if (monster.details) {
				monster.details = false;
				this.monsterDetailsActive = false;
			} else {
				if (this.monsterDetailsActive) {
					for (let creature of this.monsters) {
						if (creature.details) {
							creature.details = false;
							break;
						}
					}
				}
				monster.details = true;
				this.monsterDetailsActive = true;
			}
		},
		generateHPString(monster) {
			if (!Object.prototype.hasOwnProperty.call(monster, "hp"))
				return "";

			if (Object.prototype.hasOwnProperty.call(monster, "formula")) {
				return "Hit Points " + monster.hp.formula + " (" + monster.hp.average + ")";
			} else {
				return "Hit Points " + monster.hp.special;
			}
		}
	}
};
</script>
<style lang="scss">
@import "assets/css/scheme";
</style>
