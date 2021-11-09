<template lang="pug">
  .slider
    .slider-item(data-slider-item="first")
      .slider-text.typography-hero-title.slider-text-light(v-html="stranka_homepage_obsah.content")
      .slider-footer
        .slider-footer-description
          span.slider-footer-descriotion-image
            <SliderFooterLogo01Image />
          span.slider-footer-description-text Thunovský palác, popisek se nastaví ve Wordpressu
      nuxt-picture.slider-image(
        format="webp"
        quality="50"
        loading="lazy"
        src="/images/slider-homepage.jpg"
        sizes="mobile:100vw tablet:100vw desktop:100vw widescreen::100vw fullhd:100vw"
      )
</template>


<style lang="sass" scoped>


  .slider-item[data-slider-item="first"]

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

    async fetch() {

      await this.$store.dispatch("getStranky");

    },

    components: { SliderFooterLogo01Image },

    computed: {

      stranka_homepage_obsah() {

        return this.$store.state.stranky.filter(item => item.id == 538)[0];

      },

    },
  };
</script>
