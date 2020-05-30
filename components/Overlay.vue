<template>
  <div class="fixed h-screen w-64 top-0 right-0 bg-gray-700 animate__animated animate__fadeInRight text-white flex justify-center items-center flex-col" :class="{'hidden' : !visible}">

    <PaintOverlay class="animate__animated animate__fadeInRight" v-if="$store.state.manu.drawing" />
    <MeasureOverlay class="animate__animated animate__fadeInRight" v-if="$store.state.manu.measure" />

  </div>
</template>
<script>
  import PaintOverlay from "~/components/overlay/PaintOverlay"
  import MeasureOverlay from "./overlay/MeasureOverlay";

  export default {
    data() {
      return {
        layerButtonAcive: false
      }
    },
    components: {
      MeasureOverlay,
      PaintOverlay
    },
    computed: {
      visible() {
        return this.$store.state.manu.drawing || this.$store.state.manu.measure;
      }
    }
  }
</script>
