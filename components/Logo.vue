<template lang="pug">
  <NuxtLink class="logo" to="/">
    <AppLogoImage />
    span.logo-text Databáze poslanců
  </NuxtLink>
</template>

<style lang="sass" scoped>

.logo
  display: flex
  justify-content: center
  align-items: center
  text-decoration: none

  .logo-text
    margin-left: 20px
    +until($fullhd)
      display: none
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
