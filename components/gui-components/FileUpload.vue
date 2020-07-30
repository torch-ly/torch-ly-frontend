<template>
  <div>
    <form @submit.prevent="submit" class="flex flex-row text-white" v-if="url.length === 0">
      <input type="file" name="image" id="image-file" class="w-2/3 mt-1">
      <input type="submit" class="bg-accent-light p-2 font-bold rounded text-center select-none w-1/3"
             :disabled="uploading" value="Upload Image">
    </form>
    <a :href="imageUrl" target="_blank" class="text-lg mx-auto block text-white text-center font-bold italic" v-else>{{url}}</a>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        url: "",
        uploading: false
      }
    },
    computed: {
      imageUrl() {
        return "https://" + process.env.IMAGE_SERVER + this.url;
      }
    },
    methods: {
      submit() {
        this.uploading = true;

        let image = document.getElementById("image-file").files[0];
        let formData = new FormData();

        formData.append("image", image);
        fetch("https://" + process.env.IMAGE_SERVER + "/upload", {method: "POST", body: formData})
          .then(response => response.text())
          .then(data => {
            console.log(data);
            this.url = data;
            this.uploading = false;
            this.$emit("uploadSuccess", this.imageUrl);
          })
          .catch(console.error);
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "assets/css/scheme";
</style>
