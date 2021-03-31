<template lang="pug">
  .logo
    <AppLogoImage />
    span.logo-text Databáze poslanců
</template>


<style lang="sass" scoped>
.logo
  display: flex
  justify-content: center
  align-items: center
  .logo-text
    margin-left: 20px
  svg
    width: 30px
    height: auto
</style>

<script>
  import AppLogoImage from "~/assets/images/logo.svg?inline";

  export default {
    components: { AppLogoImage },
  };
</script>
