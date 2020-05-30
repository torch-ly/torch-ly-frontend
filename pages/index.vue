<template>
  <div>
    <Table></Table>
    <Overlay></Overlay>
    <FloatingButtons />
  </div>
</template>
<script>
  import Table from "../components/Table";
  import Overlay from "../components/Overlay";
  import FloatingButtons from "../components/FloatingButtons"

  export default {
    components: {Overlay, Table, FloatingButtons}
  }
</script>
