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
export default {
  data() {
    return {
      data: {}
    };
  },
};
</script>
