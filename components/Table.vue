<template>
  <canvas id="screen"></canvas>
</template>

<script>
  import {main} from "../logic/canvas/main";

  export default {
    data: {
      return: {
        screenContext: null
      }
    },
    mounted() {
      let canvas = document.getElementById("screen");
      let ctx = canvas.getContext("2d");
      this.screenContext = ctx;

      main(this, canvas, ctx);
    },
    methods: {

    }
  }
</script>
