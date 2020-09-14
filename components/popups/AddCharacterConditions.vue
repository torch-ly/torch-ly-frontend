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
      console.log(character)
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
      for (let condition of Object.keys(conditions)) {
        if (this.character.conditions.filter(con => con.name == condition) > 0) { // character has this condition
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
      console.log(this.conditions)
      for (let condition of this.conditions) {
        console.log(condition.active)
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
      console.log(this.$store.state.character.characters)
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
