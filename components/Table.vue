<template>
  <div id="container"></div>
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
      let stage = new Konva.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight,
        draggable: true
      });
      main(stage);
    },
    methods: {

    }
  }
</script>
