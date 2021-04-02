<template lang="pug">

.slovnik-slider.section-padding-h-margin-v

  h2.typography-section-title() {{componentTitle}}

  .slovnik-slider-container

    .slovnik-slider-nav(role="navigation")
      a.slider-nav-left(href="#")
        <SlovnikSliderImageArrowLeft />

      a.slider-nav-right(href="#")
        <SlovnikSliderImageArrowRight />

    .slovnik-slider-items-container
      .slovnik-slider-item(v-for="item in slovnikova_hesla")
        SlovnikoveHeslo(:key="item.id" :title="item.title.rendered" :description="item.content.rendered" class="")


</template>

<style lang="sass" scoped>
@import "~/assets/scss/bulma"
@import "~/assets/scss/typography"

.slovnik-slider-container

  width: 100%
  overflow-x: hidden

  .slovnik-slider-items-container
    width: 600%
    display: flex

  .slovnik-slider-item
    width: calc(100% - 100px)

</style>

<script>
import SlovnikSliderImageArrowLeft from "~/assets/images/slider-arrow-left.svg?inline";
import SlovnikSliderImageArrowRight from "~/assets/images/slider-arrow-right.svg?inline";


export default {
    components: { SlovnikSliderImageArrowLeft,  SlovnikSliderImageArrowRight},
    created() {
      this.$store.dispatch("getSlovnikovaHesla");
    },
    computed: {
      slovnikova_hesla() {
        return this.$store.state.slovnikova_hesla;
      },
    },
    data() {
      return {
        componentTitle: `Slovník pojmů`,
      }
    },
}
</script>
