<template lang="pug">

.slovnik-slider.section-padding-h-margin-v

  h2.section-title {{componentTitle}}

  .slovnik-slider-container

    .slovnik-slider-items-container(:style="generatedStyles")
      .slovnik-slider-item(v-for="item in SlovnikovaHesla")
        SlovnikoveHeslo(
          :key="item.id"
          :Title="item.title.rendered"
          :Slug="item.slug"
          InSlider="true"
          :Description="item.content.rendered"
          class=""
        )

    .slovnik-slider-nav(role="navigation")
      a.slider-nav-item.slider-nav-left(href="#" @click="move('prev', $event)")
        <SlovnikSliderImageArrowLeft />

      a.slider-nav-item.slider-nav-right(href="#" @click="move('next', $event)")
        <SlovnikSliderImageArrowRight />


    .component-footer(v-if="MaButtonMore")

      .buttons-more

        NuxtLink(class="typo-form-button button-large" :to="`/slovnik/`") Zobrazit všechny pojmy


</template>

<style lang="sass" scoped>

.component-footer
  margin-top: 50px

.section-title
  @extend %typography-section-title


.slovnik-slider-container

  width: 100%
  overflow-x: hidden
  position: relative

  .slovnik-slider-items-container
    width: 600%
    display: flex
    padding-top: 5px
    transition: transform ease-out .5s

  .slovnik-slider-item
    width: calc(100% - 100px)

  .slovnik-slider-nav
    max-width: 150px
    display: flex
    justify-content: space-between
    margin-left: auto
    margin-right: auto
    z-index: 2

    a:hover
      svg
        circle
          fill: #000
        text
          fill: #fff

</style>

<script>
import SlovnikoveHeslo from "~/components/SlovnikoveHeslo.vue";

import SlovnikSliderImageArrowLeft from "~/assets/images/slider-arrow-left.svg?inline";
import SlovnikSliderImageArrowRight from "~/assets/images/slider-arrow-right.svg?inline";


export default {
    props: ['MaButtonMore', 'SlovnikovaHesla'],
    components: { SlovnikoveHeslo, SlovnikSliderImageArrowLeft,  SlovnikSliderImageArrowRight},

    computed: {
      step() {
        return 100 / this.SlovnikovaHesla.length;
      },
      total() {
        return this.SlovnikovaHesla.length;
      },
      generatedStyles() {
        return {
          width: `${this.SlovnikovaHesla.length * 100}%`,
          transform: `translateX(-${this.currentPosition * this.step}%)`
        }
      }
    },
    data() {
      return {
        componentTitle: `Slovník pojmů`,
        currentPosition: 0
      }
    },
    methods: {
      move: function(direction, e) {

        e.preventDefault();

        if (direction == 'prev' && this.currentPosition - 1 >= 0) {
          this.currentPosition = this.currentPosition - 1;
        }

        if (direction == 'next' && this.currentPosition + 1 < this.total) {
          this.currentPosition = this.currentPosition + 1;
        }


      },
    }
}
</script>
