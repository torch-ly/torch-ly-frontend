<template>
  <div>
    <Table/>
    <Overlay/>
    <FloatingButtons/>
  </div>
</template>
<script>
  import Table from "../components/Table";
  import Overlay from "../components/overlay/Overlay";
  import FloatingButtons from "../components/FloatingButtons"

  export default {
    components: {Overlay, Table, FloatingButtons}
  }
</script>
