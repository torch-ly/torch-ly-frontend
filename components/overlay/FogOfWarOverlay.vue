<template>
  <div>
    <button class="button" @click="inputClick">{{InsertButtonText}}</button>
    <div class="hr"/>
    <button class="button" @click="toggleClick">Toggle Delete/Insert</button>
    <div class="hr"></div>
    <button class="button" @click="toggleTransparentMode">Toggle FogOfWar-SeeThrough</button>
    <div class="hr"></div>
    <button class="button" @click="syncronizeClick">Syncronize FogOfWar</button>
    <div class="hr"></div>
    <div><label>SnapGrid</label><input type="checkbox" @change="gridSnapChanged" value="false"></div>
  </div>
</template>
<style lang="scss">
  @import "assets/css/scheme";
</style>
<script>
  import {
    DeletePolygon,
    InsertPolygon,
    syncronize,
    toggleInsert,
    toggleSnapToGrid, toggleTransparent
  } from "../../logic/stage/layers/fogofwar/main";

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
      },
      gridSnapChanged(){
        toggleSnapToGrid();
      },
      toggleTransparentMode(){
        toggleTransparent()
      }
    }
  }
</script>
