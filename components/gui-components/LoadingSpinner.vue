<template>
  <div class="lds-dual-ring"></div>
</template>
<style scoped lang="scss">
  .lds-dual-ring {
    display: block;
    width: 4rem;
    height: 4rem;
  }

  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 3rem;
    height: 3rem;
    margin: .5rem;
    border-radius: 50%;
    border: .25rem solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
