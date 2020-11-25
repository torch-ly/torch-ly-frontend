<template>
  <div
      v-if="active"
      class="bg-popup overflow-auto fixed w-screen h-screen top-0 left-0 z-20 p-4 md:p-6"
  >
    <div class="relative bg-primary max-w-xl mx-auto p-4 md:p-6 rounded-lg">
      <!-- Header in case it is used -->
      <h2
          v-if="title"
          class="header1"
      >
        {{ title }}
      </h2>

      <slot/>

      <!-- Close icon in the top right -->
      <div
          class="p-3 absolute top-0 right-0 mt-2 mr-4"
          @click="active = false"
      >
        <fa
            icon="times"
            class="text-white text-xl w-4 h-4"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      active: false
    };
  }
};
</script>
<style scoped lang="scss">
@import "assets/css/scheme";
</style>
