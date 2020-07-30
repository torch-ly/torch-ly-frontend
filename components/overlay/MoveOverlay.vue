<template>
  <div class="m-6">
    <select required v-bind:value="$store.state.manu.layer" @input="dropdownChange"
            class="w-full text-black p-1 rounded-full mb-4" ref="layerdropdown" @load="dropdownChange">
      <option>Background</option>
      <option>Token</option>
    </select>

    <div class="hr"/>

    <button ref="add_character_button" class="submit-button active:submit-button-active mb-4 mt-4" @click="openTokenPopup">Add Character</button>

    <form ref="background_pos_form" id="backgroud-pos" v-on:submit.prevent="updateBackgroundObject" class="mt-2" style="display: none">
      X: <input ref="x" name="x" type="number" v-bind:value="$store.state.selectedBackgroundObject.x"
                class="input-field">
      <br>
      Y: <input ref="y" name="y" type="number" v-bind:value="$store.state.selectedBackgroundObject.y"
                class="input-field">
      <br>
      Rotation: <input ref="rotation" name="rotation" type="number"
                       v-bind:value="$store.state.selectedBackgroundObject.rotation" class="input-field">
      <br>
      SnapToGrid: <input ref="snapToGrid" name="snapToGrid" type="checkbox"
                         v-bind:checked="$store.state.selectedBackgroundObject.snapToGrid" class="input-narrow">
      <br>
      <input type="submit" class="submit-button active:submit-button-active mt-4">
    </form>

    <div ref="hr_background_divider" class="hr mt-4" style="display: none"/>

    <button ref="add_background_button" style="display: none" class="submit-button active:submit-button-active mb-4 mt-4" @click="openBackgroundPopup">Add Shape/Image</button>

    <!--<div class="hr my-4"/>

    <div id="background_image_adder" ref="background_image_adder">
      <FileUpload ref="imageupload" class="font-lg" />
      <br>
      <div class="flex flex-col justify-center items-center"> <div class="text-center mb2">URL:</div> <input type="url" class="input-field"></div>
      <div class="flex flex-col">
        <button class="submit-button mb-3" @click="useImageToBackground">Use Uploaded URL</button> <button class="submit-button" @click="useURLToBackground">Use Given URL</button>
      </div>
    </div>-->


  </div>
</template>

<script>
  import {clearTransformerNodes} from "../../logic/stage/layers/transformer";
  import {stage} from "../../logic/stage/main";
  import LoadingSpinner from "../gui-components/LoadingSpinner";
  import FileUpload from "../gui-components/FileUpload";

  export default {
    data() {
      return {
        tokens: []
      }
    },
    components: {LoadingSpinner, FileUpload},
    methods: {
      useImageToBackground(e){

      },

      useURLToBackground(e){

      },

      dropdownChange(e) {
        console.log(e.target.value);
        if(e.target.value !== "Background"){
          this.$refs.add_character_button.style.display = "";
          this.$refs.background_pos_form.style.display = "none";
          this.$refs.hr_background_divider.style.display = "none";
          this.$refs.add_background_button.style.display = "none";
        }else{
          this.$refs.add_character_button.style.display = "none";
          this.$refs.background_pos_form.style.display = "";
          this.$refs.hr_background_divider.style.display = "";
          this.$refs.add_background_button.style.display = "";
        }
        clearTransformerNodes();
        stage.batchDraw();
        this.$store.commit("manu/setLayer", e.target.value);
      },

      updateBackgroundObject(e) {
        this.$store.commit("selectedBackgroundObject/updateObject", {
          x: this.$refs.x.value,
          y: this.$refs.y.value,
          rotation: this.$refs.rotation.value,
          snapToGrid: this.$refs.snapToGrid.checked
        });
      },
      openTokenPopup() {
        this.$root.$emit("openCharacterPopup");
      },

      openBackgroundPopup(){
        this.$root.$emit('openImagePopup');
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="scss">
  @import "assets/css/scheme";

  .input {
    @apply text-black mt-4 ml-2 w-16 p-1 rounded;
  }

  .input-narrow {
    @apply text-black mt-4 ml-2 w-3 rounded;
  }
</style>
