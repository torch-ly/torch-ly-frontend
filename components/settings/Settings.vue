<template>
  <div v-if="active"
       class="bg-gray-200 z-30 w-screen h-screen fixed top-0 left-0 animate__animated animate__fadeIn animate__fast text-gray-800">
    <div class="mx-auto max-w-4xl p-6 pt-18 relative">

      <!-- title -->
      <h1 class="title mb-6">Settings</h1>

      <!-- icons -->
      <div class="p-3 absolute top-0 right-0 mt-8 mr-4" @click="active = false">
        <fa icon="times" class="text-gray-700 text-2xl w-4 h-4"/>
      </div>

      <!-- set backend url -->
      <div class="mb-6 border-b border-gray-400">
        <input type="text" class="p-2 bg-gray-100 w-full rounded tracking-wider" v-model="backendURL"
               placeholder="Backend HOST"/>
        <button
          @click="reload"
          class="w-max-64 w-full float-right px-1 py-2 bg-red-200 mt-4 rounded animate__animated animate__fadeInDown">
          Refresh page
        </button>
      </div>

      <h1 class="title mt-20">User information</h1>

      <div class="text-lg mt-6">
        <p class="mb-6"><span class="select-none">UserID: </span>{{ $store.state.authentication.playerID }}</p>

        <a ref="link"
           class="block animate__animated animate__fadeInDown submit-button active:submit-button-active"
           :href="'/'"
           @click="logout">
          Logout
        </a>
      </div>

      <div v-if="$store.state.authentication.canActivateGM">
        <h1 class="title mt-20">GM Settings</h1>

        <div class="text-lg mt-6">
          <div class="flex flex-row">
            <span>Activate GM mode:</span>
            <div class="flex flex-center items-center ml-2">
              <input type="checkbox" v-model="gm">
            </div>
          </div>

          <!-- under development
          <ManageGMStatus /-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ManageGMStatus from "@/components/settings/ManageGMStatus";

export default {
  components: {ManageGMStatus},
  data() {
    return {
      active: false,
      backendURL: this.$store.state.config.backendURL,
      backendURLChanged: false
    }
  },
  created() {
    let self = this;
    this.$root.$on("settings-popup", () => {
      self.active = true;
    })
  },
  watch: {
    backendURL() {
      localStorage["torch-ly-backend"] = this.backendURL
      this.backendURLChanged = true
    }
  },
  methods: {
    reload() {
      location.reload()
    },
    logout() {
      this.$store.commit("authentication/setAuthID", "");
    }
  },
  computed: {
    gm: {
      get() {
        return this.$store.state.authentication.gm
      },
      set(value) {
        this.$store.commit('authentication/setGM', value)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.title {
  @apply text-2xl tracking-wider p-2 border-b border-gray-600;
}
</style>
