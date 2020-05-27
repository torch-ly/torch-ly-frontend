<template>
  <div>
    <form id="form">
      <label for="kb_selected_color">Bitte Farbe wählen: </label>
      <input type="color" id="kb_selected_color">
      <span id="hex">(#000000)</span>
    </form>
  </div>
</template>

<script>
  import {setColor} from "../logic/stage/layers/freeDrawing/main";

  export default {
    mounted() {
      // Farbe aus ColorPicker auslesen
      let theInput = document.getElementById("kb_selected_color");
      setColor(theInput.value);
      theInput.addEventListener("input", function () {

        // Farcode (Hex) schreiben
        document.getElementById("hex").innerHTML = theInput.value;
      }, false);
    }
  }
</script>

<style scoped>
  #form {
    background-color: #e7e7e7;
  }
</style>
