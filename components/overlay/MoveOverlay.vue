<template>
  <div class="m-6">
    <select required v-bind:value="$store.state.manu.layer" @input="dropdownChange"
            class="w-full text-black p-1 rounded-full">
      <option>Background</option>
      <option>Token</option>
    </select>

    <ul id="tokenList"></ul>

  </div>
</template>

<script>
  import {clearTransformerNodes} from "../../logic/stage/layers/transformer";
  import {stage} from "../../logic/stage/main";

  export default {
    data() {
      return {
        tokens: []
      }
    },
    methods: {
      dropdownChange(e) {
        clearTransformerNodes();
        stage.batchDraw();
        this.$store.commit("manu/setLayer", e.target.value)
      }
    },
    mounted() {
    }
  }
</script>
