<template>
  <div>
    <form @submit.prevent="submit" v-if="url.length === 0">
      <input type="file" name="image" id="image-file">
      <input type="submit" class="submit-button mt-4" :disabled="uploading">
    </form>
    <p class="text-lg text-white text-center font-bold" v-else>{{url}}</p>
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
          })
          .catch(console.error);
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "assets/css/scheme";
</style>
