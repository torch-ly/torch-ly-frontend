<template>
  <div class="m-6">
    <p class="text-lg font-bold">Länge: {{length}}</p>
  </div>
</template>
<script>
  export default {
    computed: {
      length() {
        let measureDetails = this.$store.state.manu.measureDetails;
        return measureDetails.length * measureDetails.boxSize + " " + measureDetails.unitEnding;
      }
    }
  }
</script>
