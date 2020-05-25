<template>
  <div>
    <div id="container"></div>
    <div id="menu">
      <div>
        <button id="pulse-button">Pulse</button>

        <!--TODO change initial text-->
        <button id="snap-to-grid-button">Snap to Grid</button>

        <button id="delete-button">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Konva from "konva";
  import {main} from "../logic/stage/main";

  export default {
    data: {
      return: {
        screenContext: null
      }
    },
    mounted() {

      let width = window.innerWidth;
      let height = window.innerHeight;
      let stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
        draggable: true
      });
      main(stage, width, height);
    }
  }
</script>

<style scoped>
  #menu {
    display: none;
    position: absolute;
    width: auto;
    background-color: white;
    box-shadow: 0 0 5px grey;
    border-radius: 3px;
  }

  #menu button {
    width: 100%;
    background-color: white;
    border: none;
    margin: 0;
    padding: 10px;
  }

  #menu button:hover {
    background-color: lightgray;
  }
</style>
