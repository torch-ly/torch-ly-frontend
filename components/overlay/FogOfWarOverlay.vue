<template>
  <div>

    <div class="flex flex-row">
      <label class="switch" @click="toggleClick()">
        <input type="checkbox" v-model="insert">
        <span class="slider round"></span>
      </label>
      <div class="flex items-center ml-2">Insert / Delete</div>
    </div>

    <button class="submit-button active:submit-button-active mt-2" @click="inputClick">{{ insertButtonText }}</button>

    <button class="submit-button active:submit-button-active mt-2" @click="syncronizeClick">Syncronize FogOfWar</button>

    <div class="flex flex-row mt-2">
      <label class="switch">
        <input type="checkbox" @change="gridSnapChanged" value="false">
        <span class="slider round"></span>
      </label>
      <div class="flex items-center ml-2">Snap to Grid</div>
    </div>

    <button class="button" @click="toggleTransparentMode">Toggle FogOfWar-SeeThrough</button>

  </div>
</template>
<script>
  import {
    DeletePolygon,
    InsertPolygon,
    syncronize,
    toggleInsert,
    toggleSnapToGrid, toggleTransparent
  } from "../../logic/stage/layers/fogofwar/main";

export default {
  data() {
    return {
      insert: false,
    }
  },
  methods: {
    inputClick() {
      !this.insert ? InsertPolygon() : DeletePolygon()
    },
    toggleClick() {
      toggleInsert();
    },
    syncronizeClick() {
      syncronize();
    },
    gridSnapChanged() {
      toggleSnapToGrid();
    },
    toggleTransparentMode() {
      toggleTransparent()
    }
  },
  computed: {
    insertButtonText() {
      return (this.insert ? "Delete" : "Insert");
    }
  }
}
</script>
<style lang="scss">
@import "assets/css/scheme";
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #20880a;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 3px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #f32121;
}

input:focus + .slider {
  box-shadow: 0 0 1px #f32121;
}

input:checked + .slider:before {
  -webkit-transform: translateX(19px);
  -ms-transform: translateX(19px);
  transform: translateX(19px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
