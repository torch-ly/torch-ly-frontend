<template>
  <div class="m-6">
    <select required v-bind:value="$store.state.manu.layer" @input="dropdownChange"
            class="w-full text-black p-1 rounded-full">
      <option>Background</option>
      <option>Token</option>
    </select>

    <div>
      <form id="backgroud-pos" v-on:submit.prevent="updateBackgroundObject">
        X: <input ref="x" name="x" type="number" v-bind:value="$store.state.selectedBackgroundObject.x">
        <br>
        Y: <input ref="y" name="y" type="number" v-bind:value="$store.state.selectedBackgroundObject.y">
        <br>
        Rotation: <input ref="rotation" name="rotation" type="number" v-bind:value="$store.state.selectedBackgroundObject.rotation">
        <br>
        SnapToGrid: <input ref="snapToGrid" name="snapToGrid" type="checkbox" v-bind:checked="$store.state.selectedBackgroundObject.snapToGrid">
        <br>
        <input type="submit">
      </form>
    </div>

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
        this.$store.commit("manu/setLayer", e.target.value);
      },

      updateBackgroundObject(e){
        this.$store.commit("selectedBackgroundObject/updateObject", {x: this.$refs.x.value, y: this.$refs.y.value, rotation: this.$refs.rotation.value, snapToGrid: this.$refs.snapToGrid.checked});
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  input{
    color: black;
  }
</style>
