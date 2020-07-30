<template>
  <div>
    <div class="text-white select-none" @click="toggleActive">

      <h3 class="text-lg text-bold mb-2 inline-block">{{title}}</h3>

      <fa v-show="!active" icon="caret-right" class="advanced-icon"></fa>
      <fa v-show="active" icon="caret-down" class="advanced-icon"></fa>
    </div>

    <div v-show="active">

      <slot/>

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: "Advanced"
      }
    },
    data() {
      return {
        active: false
      }
    },
    methods: {
      toggleActive() {
        this.active = !this.active;
      }
    }
  }
</script>

<style scoped lang="scss">
  .advanced-icon {
    @apply ml-2 text-xl;
  }
</style>
