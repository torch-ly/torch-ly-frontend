<template>
  <div>
    <div class="text-white select-none" @click="toggleActive">

      <!-- title which uses default value when not provided -->
      <h3 class="text-lg text-bold mb-2 inline-block">{{title}}</h3>

      <fa v-if="!active" icon="caret-right" class="advanced-icon"></fa>
      <fa v-else icon="caret-down" class="advanced-icon"></fa>
    </div>

    <!-- advanced options shown when active is true -->
    <slot v-if="active"/>

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
