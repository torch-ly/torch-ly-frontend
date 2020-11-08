<template>
  <AdvancedOptions title="Mange GM Status">
    <div class="ml-10">
      <div v-for="player in allPlayers" class="flex flex-row">
        <span>{{ player.name }}</span>
        <div class="flex items-center justify-center ml-2">
          <input
            type="checkbox"
            @change="updateGMProperty(player.id)"
            :disabled="player.id === $store.state.authentication.playerID"
            :checked="player.gm">
        </div>
      </div>
    </div>
  </AdvancedOptions>
</template>
<script>
import AdvancedOptions from "@/components/gui-components/AdvancedOptions";

export default {
  components: {AdvancedOptions},
  computed: {
    allPlayers() {
      return this.$store.state.players.players;
    }
  },
  methods: {
    updateGMProperty(id) {
      console.log(id)
    }
  }
}
</script>
