<template>
  <div class="mt-4">
    <label for="kb_selected_color">Bitte Farbe wählen: </label>
    <input type="color" id="kb_selected_color" @input="onChange">
    <span v-text="hex">(#000000)</span>
    <button :class="{'bg-red-300' : $store.state.manu.freeDrawing.drawingObject != 'circle' , 'bg-red-400' : $store.state.manu.freeDrawing.drawingObject == 'circle'}" class="w-full outline-none rounded-full p-2 mt-4" v-on:click="onCircleClick('circle')">Circle</button>
    <button :class="{'bg-red-300' : $store.state.manu.freeDrawing.drawingObject != 'rect' , 'bg-red-400' : $store.state.manu.freeDrawing.drawingObject == 'rect'}" class="w-full outline-none rounded-full p-2 mt-4" v-on:click="onCircleClick('rect')">Rectangle</button>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        hex: "#000000"
      }
    },
    methods: {
      onChange(e) {
        this.hex = e.target.value;
        this.$store.commit("manu/setDrawingColor", e.target.value);
      },
      onCircleClick(object) {
        console.log(object)
        this.$store.commit("manu/setDrawingObject", object)
      }
    }
  }
</script>
