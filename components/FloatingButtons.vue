<template>
  <div class="hidden md:block fixed top-0 left-0">
    <div class="relative m-6 flex flex-col justify-center items-center">

      <popper
        trigger="hover"
        :options="popperOptions">

        <div class="w-56 text-center bg-red-300 uppercase text-white text-sm p-1 rounded font-bold  animate__animated animate__fadeIn animate__fast">
          Edit Map / Tokens (CTRL + B)
        </div>

        <fa icon="arrows-alt" slot="reference" @click="setTool(tools.move)" :class="{'button-selected' : currentTool === tools.move}" class="button"/>

      </popper>

      <popper
        trigger="hover"
        :options="popperOptions">

        <div class="w-48 text-center bg-red-300 uppercase text-white text-sm p-1 rounded font-bold  animate__animated animate__fadeIn animate__fast">
          Paint Mode
        </div>

        <fa icon="pen" @click="setTool(tools.pen)" slot="reference"
            :class="{'button-selected' : currentTool === tools.pen || currentTool === tools.eraser || currentTool === tools.rectangle || currentTool === tools.circle}"
            class="button"/>

      </popper>

      <popper
        trigger="hover"
        :options="popperOptions">

        <div class="w-48 text-center bg-red-300 uppercase text-white text-sm p-1 rounded font-bold  animate__animated animate__fadeIn animate__fast">
          Measure Tool
        </div>

        <fa icon="ruler-combined" slot="reference" @click="setTool(tools.measure)" :class="{'button-selected' :  currentTool === tools.measure}" class="button"/>

      </popper>

      <popper
        trigger="hover"
        :options="popperOptions">

        <div class="w-48 text-center bg-red-300 uppercase text-white text-sm p-1 rounded font-bold  animate__animated animate__fadeIn animate__fast">
          Fog of War
        </div>

        <fa icon="cloud" slot="reference" @click="setTool(tools.fogOfWar)" :class="{'button-selected' : currentTool === tools.fogOfWar}" class="button" v-if="$store.state.authentication.gm"/>

      </popper>

      <popper
        trigger="hover"
        :options="popperOptions">

        <div class="w-48 text-center bg-red-300 uppercase text-white text-sm p-1 rounded font-bold  animate__animated animate__fadeIn animate__fast">
          Library (CTRL + M)
        </div>

        <fa icon="book" slot="reference" @click="setTool(tools.monsters)" :class="{'button-selected' : currentTool === tools.monsters}" class="button"/>

      </popper>

      <popper
        trigger="hover"
        :options="popperOptions">

        <div class="w-48 text-center bg-red-300 uppercase text-white text-sm p-1 rounded font-bold  animate__animated animate__fadeIn animate__fast">
          Save Map (CTRL + S)
        </div>

        <fa v-show="currentLayerIs('Background')" slot="reference" icon="save" @click="saveClick" class="button active:border-2"/>

      </popper>

    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import {saveBackgroundLayer} from "@/logic/stage/layers/background/init";
import tools from '@/enums/tools';
import Popper from 'vue-popperjs';

export default {
  components: {Popper},
  data: () => {
    return {
      tools,
      popperOptions: {
        placement: 'right',
        modifiers: { offset: { offset: '0,10px' } }
      }
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
