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
    components: {Overlay, Table, FloatingButtons, FloatingInfos, AddImage, AddCharacter, BrushSelector, MobileMovement, Login, SelectBackgroundLayer}
  }
</script>
