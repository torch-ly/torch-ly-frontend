<template>
  <div class="hidden md:block fixed top-0 left-0">
    <div class="relative m-6 flex flex-col justify-center items-center">
      <fa icon="arrows-alt" @click="setTool(tools.move)" :class="{'button-selected' : currentTool === tools.move}" class="button"/>

      <fa icon="pen" @click="setTool(tools.pen)" :class="{'button-selected' : currentTool === tools.pen}" class="button"/>

      <fa icon="ruler-combined" @click="setTool(tools.measure)" :class="{'button-selected' :  currentTool === tools.measure}" class="button"/>

      <fa icon="cloud" @click="setTool(tools.fogOfWar)" :class="{'button-selected' : currentTool === tools.fogOfWar}" class="button"/>

      <fa icon="book" @click="setTool(tools.monsters)" :class="{'button-selected' : currentTool === tools.monsters}" class="button"/>

      <fa v-if="currentLayerIs('Background')" icon="save" @click="saveClick" class="button active:border-2"/>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import {saveBackgroundLayer} from "../logic/stage/layers/background/init";
  import tools from '@/enums/tools';


  export default {
    data: () => {
      return {
        tools
      }
    },
    methods: {
      ...mapActions({
        setTool: "manu/setTool"
      }),
      saveClick() {
        setTimeout(() => {
          saveBackgroundLayer();
        }, 0);
      },
      currentLayerIs(layer) {
        return this.$store.state.manu.layer === layer;
      }
    },
    computed: {
      ...mapState({
        currentTool: state => state.manu.currentTool
      })
    }
  }
</script>
<style scoped lang="scss">
  .button {
    @apply p-2 rounded m-0 bg-gray-700 mb-4 w-10 h-10 text-white border-red-400;
  }

  .button-selected {
    @apply border-2 ;
  }
</style>
