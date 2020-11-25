<template>
  <div>
    <form
      v-if="url.length === 0"
      class="flex flex-row text-white"
      @submit.prevent="submit"
    >
      <input
        id="image-file"
        type="file"
        name="image"
        class="w-2/3 mt-1"
      >
      <input
        type="submit"
        class="bg-accent-light p-2 font-bold rounded text-center select-none w-1/3"
        :disabled="uploading"
        value="Upload Image"
      >
    </form>
    <a
      v-else
      :href="imageUrl"
      target="_blank"
      class="text-lg mx-auto block text-white text-center font-bold italic"
    >{{ url }}</a>
  </div>
</template>
<script>
export default {
	data() {
		return {
			url: "",
			uploading: false
		};
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
					this.url = data;
					this.uploading = false;
					this.$emit("upload-success", this.imageUrl);
				})
				.catch(console.error);
		}
	}
};
</script>
<style scoped lang="scss">
  @import "assets/css/scheme";
</style>
