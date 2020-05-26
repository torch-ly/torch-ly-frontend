<template>
  <div>
    <button id="drag-and-drop-button" class="menu-button">Hand</button>
    <button id="paint-button" class="menu-button">Paint</button>
    <button id="layer-button" class="menu-button" v-on:click="switchLayerMenu">Layer</button>
    <div v-if="layerButtonAcive">
      <ul id="layer-list">
        <li>
          <button id="layer-button-background" class="sub-menu-button" v-on:click="setActiveLayer('background')">
            Background
          </button>
        </li>
        <li>
          <button id="layer-button-token" class="sub-menu-button" v-on:click="setActiveLayer('token')">Token</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import ButtonMenu from "./ButtonMenu";
  import {setLayerDragAndDrop} from "../logic/stage/layers/layerFunctions";
  import {stage} from "../logic/stage/main";

  export default {
    components: {ButtonMenu},
    data() {
      return {
        layerButtonAcive: false
      }
    },
    methods: {
      switchLayerMenu: function () {
        this.layerButtonAcive = !this.layerButtonAcive;
        console.log(stage)
      },
      setActiveLayer: function (layer) {
        this.layerButtonAcive = false;
        if (layer == "background") {

          setLayerDragAndDrop(stage.children[1], true);   //backgroundlayer: stage.children[1]

          setLayerDragAndDrop(stage.children[2], false);  //tokelayer: stage.children[2]

        } else if (layer == "token") {

          setLayerDragAndDrop(stage.children[1], false);  //backgroundlayer: stage.children[1]

          setLayerDragAndDrop(stage.children[2], true);   //tokelayer: stage.children[2]

        }
      }
    }
  }
</script>

<style scoped>
  .menu-button {
    background-color: #e7e7e7;
    color: black;
    border-radius: 8px;
    border: 2px solid gray;

    position: absolute;
    width: 100px;
    height: 50px;
    left: 5px;


    transition-duration: 0.4s;
  }

  .sub-menu-button {
    position: absolute;
    width: 150px;
    height: 50px;
    left: 110px;
    border: 2px solid gray;
    background-color: #e7e7e7;
    color: black;
  }

  .menu-button:hover {
    background-color: white;
  }

  .sub-menu-button:hover {
    background-color: white;
  }

  #drag-and-drop-button {
    top: 80px;
  }

  #paint-button {
    top: 140px;
  }

  #layer-button {
    top: 200px;
  }

  #layer-button-background {
    top: 170px;
  }

  #layer-button-token {
    top: 220px;
  }

  #layer-list {
    width: 100px;
  }

</style>
