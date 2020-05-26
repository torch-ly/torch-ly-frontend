<template>
  <div>
    <button id="drag-and-drop-button" class="menu-button">Drag and Drop</button>
    <button id="paint-button" class="menu-button">Paint</button>
  </div>
</template>
<script>
  import ButtonMenu from "./ButtonMenu";

  export default {
    components: {ButtonMenu}
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

    transition-duration: 0.4s;
  }

  .menu-button:hover {
    background-color: white;
  }

  #drag-and-drop-button {
    top: 80px;
    left: 5px;
  }

  #paint-button {
    top: 140px;
    left: 5px;
  }
</style>
