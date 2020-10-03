<template>
  <div v-if="initiative.length > 0" class="fixed top-0 right-0 text-white p-6 bg-gray-800 bg-opacity-50 h-fit max-h-screen rounded-bl animate__animated animate__fadeInRight" :class="marginClass()">

    <div class="container block transition-height duration-500 overflow-hidden" :style="{'--height': initiative.length * 14 / 4 + 'rem'}" :class="{'h-28-important' : !fullList}">

      <draggable
        class="select-none"
        tag="ul"
        v-model="newInitiative"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false">
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <li
            v-for="(init, index) in newInitiative" v-if="characters.length > 0"
            :key="init.id"
            class="mb-4 flex flex-row justify-between items-center"
            :class="{'text-lg' : index === 0}">

            <div class="flex flex-row items-center w-auto">
              <img :src="getCharacterByID(init.id).token" class="w-10 h-10 mr-2">
              <span class="block font-bold max-h-10">{{ getCharacterByID(init.id).name }}</span>
            </div>
            <div class="ml-2">
              {{ init.value }}
            </div>

          </li>
        </transition-group>
      </draggable>
    </div>

    <div class="flex flex-end justify-between flex-row-reverse text-3xl">
      <fa icon="angle-up" class="block icon transition duration-500 transform" @click="fullList = !fullList"
          :class="{'rotate-180' : !fullList}"/>
      <fa icon="arrow-right" class="block icon" :class="buttonVisibility()" @click="$store.commit('character/nextTurn')"/>
      <fa icon="sort" class="block text-2xl icon" :class="buttonVisibility()" @click="$store.commit('character/orderInitiative')"/>
    </div>

  </div>
</template>
<script>
import draggable from "vuedraggable";
import devices from "@/enums/devices";

export default {
  components: {draggable},
  data() {
    return {
      fullList: true,
      drag: false,
      newInitiative: []
    }
  },
  watch: {
    initiative() {
      this.newInitiative = this.$store.state.character.initiative;
    },
    newInitiative(ini) {
      this.$store.commit("character/setInitiativeOrder", ini)
    },
  },
  computed: {
    initiative() {
      return this.$store.state.character.initiative;
    },
    characters() {
      return this.$store.state.character.characters;
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: !this.gm,
        ghostClass: "ghost"
      };
    },
    gm() {
      return this.$store.state.authentication.gm;
    }
  },
  mounted() {
    this.fullList &= this.gm;
  },
  methods: {
    getCharacterByID(id) {
      for (let character of this.characters) {
        if (character.id === id) {
          return character;
        }
      }
      return {};
    },
    marginClass() {
      let a = {};
      a[this.$store.state.config.device === devices.DEFAULT ? "mr-64" : ""] = true;
      return a;
    },
    buttonVisibility() {
      return {
        "hidden": !this.gm
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "assets/css/scheme";

.icon {
  @apply w-8 h-8 bg-white bg-opacity-50 rounded-full p-2;
}

.h-28-important {
  height: 7rem !important;
}

.container {
  height: var(--height);
}
</style>
