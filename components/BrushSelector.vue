<template>
  <div class="mt-4">
    <label for="kb_selected_color">Bitte Farbe wählen: </label>
    <input type="color" id="kb_selected_color" @input="onChange">
    <span v-text="hex">(#000000)</span>
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
        setColor(e.value);
        this.hex = e.value;
      }
    }
  }
</script>
