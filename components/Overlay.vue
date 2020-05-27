<template>
  <div class="fixed h-screen w-64 top-0 left-0 bg-primary text-white">
    <div class="relative w-full h-full">

      <h1 class="text-xl my-10 p-2 border-b-2 border-accent font-bold text-center">RPG Online Tool</h1>

      <div class="mx-4">
        <button id="drag-and-drop-button" class="button">Hand</button>
        <button id="paint-button" class="button">Paint</button>
        <button id="layer-button" v-on:click="switchLayerMenu" class="button">Layer</button>
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

        <BrushSelector id="brushSelector" v-if="drawing"></BrushSelector>

      </div>


    </div>
  </div>
</template>
<script>
  import {setLayerDragAndDrop} from "../logic/stage/layers/layerFunctions";
  import {stage} from "../logic/stage/main";
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
    },
    computed: {
      drawing() {
        return this.$store.state["manu"]["drawing"];
      }
    }
  }
</script>
<style lang="scss">
   @import "assets/css/scheme";

  .button {
    @apply block p-2 rounded-full w-full bg-color-1 mt-4;
  }

  // https://coolors.co/003049-d62828-f77f00-fcbf49-eae2b7
  // https://coolors.co/3c1518-69140e-a44200-d58936-fff94f

</style>
<style scoped>
  .sub-menu-button {
    position: absolute;
    width: 150px;
    height: 50px;
    left: 110px;
    border: 2px solid gray;
    background-color: #e7e7e7;
    color: black;
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
