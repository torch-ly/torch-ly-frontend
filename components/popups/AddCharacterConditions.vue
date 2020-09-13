<template>
  <PopupContainer ref="popupContainer" title="Add Character">
    <div class="grid grid-flow-row grid-cols-4 grid-rows-3 gap-4">
      <div v-for="(condition, index) in conditions">
        <div class="flex flex-row" @click="activateCondition(index)">
          <div class="flex justify-center items-center">
            <input type="checkbox">
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

export default {
  components: {PopupContainer},
  data() {
    return {
      conditions: this.generateConditionJSON(),
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
      for (let condition in conditions) {
        this.conditions[condition] = this.characters.conditions[condition];
      }
    },
    saveConditions() {
      for (let condition in conditions) {
        this.characters.conditions[condition] = this.conditions[condition];
      }
    },
    generateConditionJSON() {
      let json = [];

      for (let condition in conditions) {
        json.push({
          src: conditions[condition],
          active: false,
        })
      }
      console.log(json)
      return json;
    },
    activateCondition(index) {
      this.conditions[index].active ^= true;
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/css/scheme";
</style>
