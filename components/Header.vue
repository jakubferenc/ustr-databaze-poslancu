<template lang="pug">
  header.main-header()
    .top-bar
      <Logo />
      <MainMenu />
      <SearchNav />

    <Slider v-if="true" />

</template>

<style lang="sass">

.main-header
  position: sticky
  top: 0
  z-index: 9

  .top-bar
    background: #fff
    height: 80px
    display: flex
    justify-content: space-between
    padding: 0 50px
    align-items: center

    a
      color: #000
      font-size: 15px
      font-family: Courier, monospace

html.has-slider .main-header
  position: relative
  .top-bar
    background-color: transparent
    position: absolute
    width: 100%

    a, &
      color: #fff

    .logo svg *
      fill: #fff

</style>

<script>

import Logo from '../components/Logo.vue';
import MainMenu from '../components/MainMenu.vue';
import SearchNav from '../components/SearchNav.vue';
import Slider from '../components/Slider.vue';

export default {

  components: { Logo, MainMenu, SearchNav, Slider },

  data() {
    return {
      data: {}
    };
  },
};
</script>
