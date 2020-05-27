<template>
  <div>
    <form>
      <label for="kb_selected_color">Bitte Farbe wählen: </label>
      <input type="color" id="kb_selected_color">
      <span id="hex">(#000000)</span>
    </form>
  </div>
</template>

<script>
  // Farbe aus ColorPicker auslesen
  let theInput = document.getElementById("kb_selected_color");
  console.log(theInput)
  //let theColor = theInput.value;
  theInput.addEventListener("input", function () {

// Farcode (Hex) schreiben
    document.getElementById("hex").innerHTML = theInput.value;

// Farbvariable schreiben
    document.documentElement.style.setProperty('--kb-color', theInput.value);

  }, false);
</script>

<style scoped>
  :root {
    --kb-color: silver;
  }

  body {
    background: var(--kb-color);
  }
</style>
