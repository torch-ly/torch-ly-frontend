<template>
  <div class="fixed h-screen w-64 top-0 right-0 bg-gray-700 animate__animated animate__fadeInRight text-white" :class="{'hidden' : !$store.state.manu.drawing}">
    <div class="relative w-full h-full">

      <div class="m-6">
        <select required v-value="$store.state.manu.layer" @input="dropdownChange" class="hidden w-full text-black p-2 rounded-full">
          <option>Background</option>
          <option>Token</option>
        </select>

        <BrushSelector class="animate__animated animate__fadeInRight" v-show="drawing"></BrushSelector>
      </div>

    </div>
  </div>
</template>
<script>
  import BrushSelector from "./BrushSelector";

  export default {
    data() {
      return {
        layerButtonAcive: false
      }
    },
    components: {
      BrushSelector
    },
    methods: {
      dropdownChange(e) {
        this.$store.commit("manu/setLayer", e.target.value)
      },
    },
    computed: {
      drawing() {
        return this.$store.state["manu"]["drawing"];
      }
    }
  }
</script>
