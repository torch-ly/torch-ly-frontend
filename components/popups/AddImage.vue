<template>
  <PopupContainer v-show="active">
    <h3 style="color: white">Add Image</h3>
    <form class="relative flex flex-col" @submit.prevent="addImage">

      <div class="p-3 absolute top-0 right-0 -mt-10 -mr-2" @click="closePopup">
        <fa icon="times" class="text-white text-xl"/>
      </div>

      <input type="number" ref="x" name="x" class="input-field mt-4" placeholder="X">

      <input type="number" ref="y" name="y" class="input-field mt-4" placeholder="Y">

      <input type="number" ref="rotation" name="rotation" class="input-field mt-4" placeholder="Rotation">

      <div class="mt-4 flex flex-row justify-center"><label style="color: white" for="snapToGrid">SnapToGrid:</label><input type="checkbox" ref="snapToGrid" id="snapToGrid" name="snapToGrid" class="input-field" ></div>

      <div class="mt-4 hr"/>

      <div class="mt-4 flex flex-row justify-center"><label style="color: white" for="shape">Shape / Image</label><input type="checkbox" ref="shape" id="shape" name="shape" class="input-field" @change="changePerspective"></div>

      <div class="mt-4 mb-4 hr"/>

      <div ref="image_part">
      <FileUpload ref="imageupload" class="font-lg" />
      <div class="flex flex-col justify-center items-center"> <div class="text-center mb2" style="color: white">URL:</div> <input type="url" class="input-field"></div>
      <div class="flex flex-col">
        <button class="submit-button mb-3" @click="useImageToBackground">Use Uploaded URL</button> <button class="submit-button" @click="useURLToBackground">Use Given URL</button>
      </div>
      </div>
      <div ref="color_part" style="display: none">
        <div><label for="color">Color:</label><input class="input-field" id="color" type="color" placeholder="Color" ref="color"></div>
      </div>

    </form>
  </PopupContainer>
</template>

<script>
  import PopupContainer from "../gui-components/PopupContainer";
  import FileUpload from "../gui-components/FileUpload";

  export default {
    components: {PopupContainer, FileUpload},
    data() {
      return {
        active: false,
        isShape: false,
      }
    },
    mounted() {
      this.$root.$on("openImagePopup", () => {
        this.active = true;
      });
    },
    methods:{
      closePopup() {
        this.active = false;
      },
      addImage(){

      },
      changePerspective(e){

        this.isShape = e.target.checked;
        console.log(this.isShape);
        this.$refs.color_part.style.display = (this.isShape ? "" : "None");
        this.$refs.image_part.style.display = (this.isShape ? "None" : "");
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "assets/css/scheme";

  #snapToGrid, #shape{
    margin-bottom: 0 !important;
  }
</style>
