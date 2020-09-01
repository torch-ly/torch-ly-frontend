<template>
  <div>
    <div id="container" @contextmenu="$event.preventDefault()"></div>
  </div>
</template>

<script>
  import Konva from "konva";
  import {main} from "../logic/stage/main";

  export default {
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
