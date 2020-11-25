<template>
  <div class="hidden md:block fixed bottom-0 left-0">
    <div class="relative m-6 select-none">
      <div
        v-show="$store.state.errors.errors.size"
        class="w-auto flex flex-col button mb-4 border-4 border-red-400"
        @click="reload"
      >
        <fa
          icon="bolt"
          class="block mx-auto text-red-400 text-3xl"
        />
        <span class="block w-full text-center mt-1 font-500">Network Error</span>
      </div>

      <div class="flex flex-row">
        <div
          class="button"
          @click="$store.state.authentication.name === null ? $root.$emit('login') : false"
        >
          <span v-if="$store.state.authentication.name === null">You're not signed in; click to signin</span>
          <span v-else>Signed in as: {{ $store.state.authentication.name }}</span>
        </div>

        <div
          class="button ml-3 w-10 h-10 flex items-center justify-center"
          @click="$root.$emit('settings-popup')"
        >
          <fa
            icon="cog"
            class="w-4 h-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
	methods: {
		reload() {
			location.reload();
		}
	}
};
</script>
<style lang="scss">
  .button {
    @apply p-2 rounded bg-gray-700 text-white;
  }
</style>
