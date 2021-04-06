<template lang="pug">

.slovnik-slider.section-padding-h-margin-v

  h2.typography-section-title() {{componentTitle}}

  .slovnik-slider-container

    .slovnik-slider-nav(role="navigation")
      a.slider-nav-left(href="#" @click="move('prev', $event)")
        <SlovnikSliderImageArrowLeft />

      a.slider-nav-right(href="#" @click="move('next', $event)")
        <SlovnikSliderImageArrowRight />

    .slovnik-slider-items-container(:style="generatedStyles")
      .slovnik-slider-item(v-for="item in slovnikova_hesla")
        SlovnikoveHeslo(:key="item.id" :title="item.title.rendered" :description="item.content.rendered" class="")

    .component-footer(v-if="MaButtonMore")

      button.typo-form-button.button-large Zobrazit všechny pojmy


</template>

<style lang="sass" scoped>
@import "~/assets/scss/bulma"
@import "~/assets/scss/typography"

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
    position: absolute
    width: 100%
    display: flex
    justify-content: space-between
    z-index: 2

    a:hover
      svg
        circle
          fill: #000
        text
          fill: #fff

</style>

<script>
import SlovnikSliderImageArrowLeft from "~/assets/images/slider-arrow-left.svg?inline";
import SlovnikSliderImageArrowRight from "~/assets/images/slider-arrow-right.svg?inline";


export default {
    props: ['MaButtonMore'],
    components: { SlovnikSliderImageArrowLeft,  SlovnikSliderImageArrowRight},
    created() {
      this.$store.dispatch("getSlovnikovaHesla");
    },

    computed: {
      slovnikova_hesla() {
        return this.$store.state.slovnikova_hesla;
      },
      step() {
        return 100 / this.$store.state.slovnikova_hesla.length;
      },
      total() {
        return this.$store.state.slovnikova_hesla.length;
      },
      generatedStyles() {
        return {
          width: `${this.$store.state.slovnikova_hesla.length * 100}%`,
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
