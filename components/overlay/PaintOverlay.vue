<template>
  <div class="m-6">
    <select required v-bind:value="$store.state.manu.layer" @input="dropdownChange" class="hidden w-full text-black p-2 rounded-full">
      <option>Background</option>
      <option>Token</option>
    </select>

    <BrushSelector v-show="drawing"></BrushSelector>

    <button :class="{'bg-red-300' : !$store.state.manu.erase , 'bg-red-400' : $store.state.manu.erase}" class="w-full outline-none rounded-full p-2 mt-4" @click="clickErase">
      Radierer
    </button>
  </div>
</template>
<script>
  import BrushSelector from "../BrushSelector";

  export default {
    components: {
      BrushSelector
    },
    methods: {
      dropdownChange(e) {
        console.log(e)
        this.$store.commit("manu/setLayer", e.target.value)
      },
      clickErase() {
        this.$store.commit("manu/setErase");
      }
    },
    computed: {
      drawing() {
        return this.$store.state["manu"]["drawing"];
      }
    }
  }
</script>
