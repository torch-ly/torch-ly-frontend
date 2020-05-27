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
    <button id="measure-button" class="menu-button">Measure</button>
  </div>
</template>
<script>
  import ButtonMenu from "./ButtonMenu";
  import {setLayerDragAndDrop} from "../logic/stage/layers/layerFunctions";
  import {stage} from "../logic/stage/main";
  import {activeLayer} from "../logic/stage/layers/layerManager";

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

        let background = stage.children[1]; //backgroundlayer: stage.children[1]
        let token = stage.children[2];      //tokelayer: stage.children[2]

        if (layer == "background") {

          setLayerDragAndDrop(background, true);

          setLayerDragAndDrop(token, false);

          activeLayer = background;

        } else if (layer == "token") {

          setLayerDragAndDrop(background, false);

          setLayerDragAndDrop(token, true);

          activeLayer = token;

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

  #measure-button {
    top: 260px;
  }

</style>
