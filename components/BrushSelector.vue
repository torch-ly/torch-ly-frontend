<template>
  <div class="mt-4">
    <label for="kb_selected_color">Farbe: </label>
    <input type="color" id="kb_selected_color" class="ml-2" :value="$store.state.manu.freeDrawing.color" @input="onChange">
    <!--span v-text="hex">(#000000)</span-->
  </div>
</template>

<script>
  import {setColor} from "../logic/stage/layers/freeDrawing/main";

  export default {
    data() {
      return {
        hex: "#000000"
      }
    },
    methods: {
      onChange(e) {
        this.hex = e.target.value;
        this.$store.commit("manu/setDrawingColor", this.hex);
      }
    }
  }
</script>
