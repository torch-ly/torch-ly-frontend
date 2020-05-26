<template>
  <button id="button">
    <img src="static/icons/brush-icon.png">
  </button>
</template>

<script>
  export default {
    props: ['imgSrc'],
    name: 'ButtonMenu'
  }
</script>

<style scoped>
  #button {
    width: 100px;
    height: 100px;
  }
</style>
