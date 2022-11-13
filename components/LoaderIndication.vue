<template lang="pug">
.loader-container
  .loader
</template>


<style lang="sass" scoped>

.loader-container
  display: flex
  width: 100%
  justify-content: center
.loader
  border: 16px solid #ccc /* Light grey */
  border-top: 16px solid #3498db /* Blue */
  border-radius: 50%
  width: 120px
  height: 120px
  animation: spin 2s linear infinite

@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

</style>

<script>
  export default {
  };
</script>
