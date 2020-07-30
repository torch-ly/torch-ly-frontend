<template>
  <div class="mt-4">
    <label for="kb_selected_color">Bitte Farbe wählen: </label>
    <input type="color" id="kb_selected_color" class="ml-2" :value="$store.state.manu.freeDrawing.color"
           @input="onChange">

    <button
      :class="{'bg-red-300' : !$store.state.manu.freeDrawing.snapToGrid, 'bg-red-400' : $store.state.manu.freeDrawing.snapToGrid}"
      class="w-full outline-none rounded-full p-2 mt-4" v-on:click="onShapeSnapToGridSwitch">Snap Shapes To Grid
    </button>
    <button
      :class="{'bg-red-300' : $store.state.manu.freeDrawing.drawingObject != 'circle' , 'bg-red-400' : $store.state.manu.freeDrawing.drawingObject == 'circle'}"
      class="w-full outline-none rounded-full p-2 mt-4" v-on:click="onShapeDrawingClick('circle')">Circle
    </button>
    <button
      :class="{'bg-red-300' : $store.state.manu.freeDrawing.drawingObject != 'rect' , 'bg-red-400' : $store.state.manu.freeDrawing.drawingObject == 'rect'}"
      class="w-full outline-none rounded-full p-2 mt-4" v-on:click="onShapeDrawingClick('rect')">Rectangle
    </button>
  </div>
</template>
<script>
  import {store} from "../logic/stage/main";

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
      onShapeDrawingClick(object) {
        if (store.state.manu.freeDrawing.drawingObject == '') {
          this.$store.commit("manu/setDrawingObject", object);
        } else {
          this.$store.commit("manu/setDrawingObject", '');
        }
      },
      onShapeSnapToGridSwitch() {
        this.$store.commit("manu/setDrawingObjectSnapToGrid");
      }
    }
  }
</script>
