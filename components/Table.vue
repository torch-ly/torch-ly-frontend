<template>
  <canvas id="screen"></canvas>
</template>

<script>
  import {moveAndZoom} from "../logic/canvas/moveAndZoom";
  import {main} from "../logic/canvas/main";

  export default {
    data: {
      return: {
        screenContext: null
      }
    },
    mounted() {
      let screen = document.getElementById("screen");
      let ctx = screen.getContext("2d");
      this.screenContext = ctx;

      main(this, screen);
    },
    methods: {

    }
  }
</script>
