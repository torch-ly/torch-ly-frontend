<template>
  <div>
    <button class="button" @click="inputClick">{{InsertButtonText}}</button>
    <div class="hr"/>
    <button class="button" @click="toggleClick">Toggle Delete/Insert</button>
    <div class="hr"></div>
    <button class="button" @click="syncronizeClick">Syncronize FogOfWar</button>
  </div>
</template>
<style lang="scss">
  @import "assets/css/scheme";
</style>
<script>
import {DeletePolygon, InsertPolygon, syncronize, toggleInsert} from "../../logic/stage/layers/fogofwar/main";

  export default {
    data() {
      return {
        InsertButtonText: "Insert",
        insert: true,
      }
    },
    methods: {
      inputClick() {
        this.insert ? InsertPolygon() : DeletePolygon()
      },
      toggleClick(){
        toggleInsert();
        this.insert = !this.insert;
        this.InsertButtonText = !this.insert ? "Delete" : "Insert";
      },
      syncronizeClick(){
        syncronize();
      }
    }
  }
</script>
