<template>
  <div>
    <Table/>

    <Overlay/>

    <FloatingButtons/>
    <FloatingInfos/>

    <AddCharacter/>
    <AddImage/>
    <SelectBackgroundLayer/>
    <Login/>
    <MobileMovement class="md:hidden"></MobileMovement>

    <div class="w-full h-full fixed top-0 left-0 bg-gray-700 flex justify-center items-center select-none" v-show="visible" :class="{'animate__animated animate__fadeOutDown animate__fast' : fadeOut}">
      <span class="font-10xl font-bold text-accent">t<img src="/icon-resized.png" class="inline-block h-auto w-16 -mt-6 mx-1" :class="{'mirrored' : mirrored}">rch.ly</span>
    </div>
  </div>
</template>
<script>
  import Table from "../components/Table";
  import Overlay from "../components/overlay/Overlay";
  import FloatingButtons from "../components/FloatingButtons";
  import FloatingInfos from "../components/FloatingInfos";
  import AddImage from "@/components/popups/AddImage";
  import AddCharacter from "@/components/popups/AddCharacter";
  import BrushSelector from "@/components/overlay/components/BrushSelector";
  import MobileMovement from "@/components/MobileMovement";
  import Login from "@/components/popups/Login";
  import SelectBackgroundLayer from "@/components/popups/SelectBackgroundLayer";

  export default {
    components: {Overlay, Table, FloatingButtons, FloatingInfos, AddImage, AddCharacter, BrushSelector, MobileMovement, Login, SelectBackgroundLayer},
    data() {
      return {
        mirrored: false,
        fadeOut: false,
        visible: true
      }
    },
    mounted() {
      let self = this;
      let interval = setInterval(() => self.mirrored = !self.mirrored, 100);
      setTimeout(() => {
        self.fadeOut = true;
      }, 2000);
      setTimeout(() => {
        clearInterval(interval);
        self.visible = false;
      }, 2500);
    }
  }
</script>
<style>
  .font-10xl {
    font-size: 6rem;
  }

  .mirrored {
    -moz-transform:    scaleX(-1); /* Gecko */
    -o-transform:      scaleX(-1); /* Opera */
    -webkit-transform: scaleX(-1); /* Webkit */
    transform:         scaleX(-1); /* Standard */

    filter: FlipH;                 /* IE 6/7/8 */
  }
</style>
