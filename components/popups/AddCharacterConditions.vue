<template>
  <PopupContainer ref="popupContainer" title="Add Character">
    <div class="grid grid-flow-row grid-cols-4 grid-rows-3 gap-4">
      <div v-for="(condition, index) in conditions">
        <div class="flex flex-row" @click="activateCondition(index)">
          <div class="flex justify-center items-center">
            <input type="checkbox" v-model="condition.active">
          </div>
          <img :src="condition.src" width="50" height="50" class="ml-4">
        </div>
      </div>
    </div>
    <div class="submit-button active:submit-button-active mt-5" @click="saveConditions">Save</div>
  </PopupContainer>
</template>

<script>
import PopupContainer from "../gui-components/PopupContainer";
import conditions from "@/enums/conditions";
import {updateConditionImages} from "@/logic/stage/layers/token/init";
import {setCharacterConditions} from "@/plugins/backendComunication/characters";

export default {
  components: {PopupContainer},
  data() {
    return {
      conditions: [],
      character: null
    }
  },
  mounted() {
    this.$root.$on("openCharacterConditionsPopup", (character) => {
      this.$refs.popupContainer.active = true;
      this.character = character;
      this.loadConditions();
    });

    this.$root.$on("closeCharacterConditionsPopup", () => {
      this.$refs.popupContainer.active = false;
    });
  },
  methods: {
    loadConditions() {
      this.conditions = [];
      for (let condition of Object.keys(conditions)) {
        let isActive = false;
        for (let con of this.character.conditions) {
          if (con == condition) {
            isActive = true;
            break;
          }
        }
        if (isActive) { // character has this condition
          this.conditions.push({
            src: conditions[condition],
            name: condition,
            active: true
          })
        } else {
          this.conditions.push({
            src: conditions[condition],
            name: condition,
            active: false
          })
        }
      }
    },
    saveConditions() {
      let activeConditions = [];
      for (let condition of this.conditions) {
        if (condition.active) {
          activeConditions.push(condition.name);
        }
      }
      let newCharacter = {
        ...this.character,
        conditions: activeConditions
      }
      this.$store.commit("character/updateCharacter", newCharacter);
      updateConditionImages(this.character.id, activeConditions);
      setCharacterConditions(this.character.id, activeConditions)
    },
    activateCondition(index) {
      this.conditions[index].active = !this.conditions[index].active;
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/css/scheme";
</style>
