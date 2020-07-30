<template>
  <PopupContainer ref="popupContainer" title="Add Shape or Image">
    <form class="flex flex-col text-white" @submit.prevent="addImage">

      <!-- shape kind -->
      <select required v-model="inputs.type" class="dropdown">
        <option class="p-2">Image</option>
        <option>Shape</option>
      </select>

      <div class="mb-4 hr"/>

      <!-- URL option for image -->
      <div ref="image_part" v-if="inputs.type === 'Image'">

        <!-- upload tool -->
        <div class="bg-highlight rounded p-2 mb-4">
          <p class="text-center font-bold mb-2">{{uploadToolTitle}}</p>
          <FileUpload ref="imageupload" @uploadSuccess="inputs.url = $event;"/>
        </div>

        <input type="url" placeholder="Image URL" class="input-field mb-4" v-model="inputs.url">

      </div>

      <!-- Color chooser for shape option -->
      <div class="mb-4" v-else>
        <label for="color" class="inline-block">Select Color:</label>
        <input class="h-6 ml-2 rounded inline-block" id="color" type="color" placeholder="Color" v-model="inputs.color">
      </div>

      <AdvancedOptions class="mb-4 mt-2">
        <input v-model="inputs.x" type="number" ref="x" name="x" class="input-field mb-4" placeholder="X">
        <input v-model="inputs.y" type="number" ref="y" name="y" class="input-field mb-4" placeholder="Y">
        <input v-model="inputs.rotation" type="number" ref="rotation" name="rotation" class="input-field mb-4"
               placeholder="Rotation">

        <!-- snap to grid checkbox -->
        <div class="pb-4">
          <label for="snapToGrid" class="inline-block">SnapToGrid:</label>
          <input type="checkbox" v-model="inputs.snapToGrid" id="snapToGrid" class="ml-2 inline-block">
        </div>
      </AdvancedOptions>

      <button class="submit-button" type="submit" @click="addObject">Insert</button>


    </form>
  </PopupContainer>
</template>
<script>
  import PopupContainer from "../gui-components/PopupContainer";
  import FileUpload from "../gui-components/FileUpload";
  import AdvancedOptions from "../gui-components/AdvancedOptions";

  export default {
    components: {AdvancedOptions, PopupContainer, FileUpload},
    data() {
      return {
        active: false,
        inputs: {
          url: "",
          x: "",
          y: "",
          rotation: "",
          snapToGrid: true,
          type: "Image",
          color: "#000000"
        }
      }
    },
    computed: {
      uploadToolTitle() {
        return this.inputs.url.includes(process.env.IMAGE_SERVER) ? 'Generated URL' : 'Upload-Tool';
      }
    },
    mounted() {
      this.$root.$on("openImagePopup", () => {
        this.$refs.popupContainer.active = true;
      });
    },
    methods: {
      addObject() {

      },
    }
  }
</script>
<style scoped lang="scss">
  @import "assets/css/scheme";
</style>
