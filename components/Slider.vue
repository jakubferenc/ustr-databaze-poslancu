<template lang="pug">
  .slider
    .slider-item(data-slider-item="first")
      .slider-text.typography-hero-title.slider-text-light Úvodní text. Představení projektu. Zde by tedy měl být jeden delší odstavec nebo dva, které stručně, jasně a úderně shrnou, o čem aplikace je.
      .slider-footer
        .slider-footer-description
          span.slider-footer-descriotion-image
            <SliderFooterLogo01Image />
          span.slider-footer-description-text Poslanecká sněmovna Říšské rady (1911–1918)
      img.slider-image
</template>


<style lang="sass" scoped>
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .slider-item[data-slider-item="first"]
    background-image: url(~/assets/images/slider-homepage.jpg)

  html:not(.has-slider) .slider
    display: none

  .slider
    position: relative
    z-index: -1
    color: #fff

    .slider-item
      position: relative
      height: 100vh
    .slider-image
      position: absolute
      width: 100%
      height: 100%
      object-fit: cover
    .slider-text
      position: absolute
      z-index: 1
      font-size: 65px
      top: 100px
      left: 50px
    .slider-text-light
      color: #fff

      +until($desktop)

      +from($tablet)

      +from($desktop)

      +from($widescreen)
        width: 66%

      +from($fullhd)
    .slider-footer
      position: absolute
      bottom: 50px
      left: 50px

    .slider-footer-description
      display: flex
      align-items: flex-end
      .slider-footer-description-text
        margin-left: 20px
        max-width: 250px
</style>


<script>
  import SliderFooterLogo01Image from "~/assets/images/slider-footer-logo-01.svg?inline";

  export default {
    components: { SliderFooterLogo01Image },
  };
</script>
