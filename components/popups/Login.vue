<template>
  <div v-show="active" class="fixed w-screen h-screen top-0 left-0 md:flex justify-center items-center z-40 overflow-hidden">
    <div
      class="w-full bg-primary md:w-1/2 relative md:rounded p-8 md:m-4 text-white shadow-2xl border-accent-light md:border-2">

      <div class="p-3 absolute top-0 right-0 mt-4 mr-4 hidden md:block" @click="active = false">
        <fa icon="times" class="text-white text-xl"/>
      </div>

      <p class="text-2xl font-bold text-center mb-6">Login</p>

      <p class="text-justify mb-6">Damit du <span class="font-bold">torch-ly</span> richtig nutzen kannst, solltest du
        dich mit der Authentifizierungs-ID anmelden. Sobald du diese eingegeben hast, kannst du die Seite in deinen
        Favoriten speichern oder sie zum Startbildschirm hinzufügen - die Authentifizierung bleibt erhalten. Damit dies
        möglich ist, speichern wir die Authentifizierung in der Webseitenaddresse - du solltest diese also nicht einfach
        so an Freunde verschicken, da diese dann Zugriff auf deinen Account haben. </p>

      <form @submit.prevent="submit">
        <input class="input-field mb-4" type="password" autofocus placeholder="Authentifizierungs-ID" v-model="authID"
               @keyup.enter="$refs.link.click()">
      </form>
      <a v-if="authID" ref="link"
         class="block animate__animated animate__fadeInDown submit-button active:submit-button-active"
         :href="'/?authID=' + authID">Login</a>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      authID: "",
      active: false
    }
  },
  mounted() {
    let self = this;
    this.$root.$on("login", () => self.active = true)
  }
}
</script>
<style lang="scss">
@import "assets/css/scheme";
</style>
