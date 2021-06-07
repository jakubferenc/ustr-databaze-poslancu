<template lang="pug">

  .casova-osa-component

    .casova-osa-items-container

      .casova-osa-line

      .casova-osa-items

        .casova-osa-item(v-for="udaj in Data" :key="udaj.datum_udalosti")
          .casova-osa-circle(:class="{small: udaj.dulezita != 'true'}") {{ udaj.datum_udalosti.split('-')[0] }}
          .casova-osa-item-text {{udaj.nazev_udalosti}}



    .slovnik-slider-nav(role="navigation" v-if="showNavigation")
      span.slider-nav-item.slider-nav-left(@click="move('left', 50, true, $event)"  @mousedown="move('left', 50, false, $event)" @mouseup="stop()")
        SlovnikSliderImageArrowLeft()

      span.slider-nav-item.slider-nav-right(@click="move('right', 50, true, $event)" @mousedown="move('right', 50, false, $event)" @mouseup="stop()")
        SlovnikSliderImageArrowRight()

</template>


<style lang="sass">
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .slovnik-slider-nav

    margin-top: $margin-until-desktop

    .slider-nav-item

      cursor: pointer

    svg *
      user-select: none

    svg circle
      fill: #fff

    &:hover
      svg circle
        fill: #000
      svg text
        fill: #fff



  .casova-osa-items-container

    position: relative
    overflow-x: scroll
    margin-top: $margin-until-desktop

  .casova-osa-line
    border-bottom: 5px dotted #000
    height: 2px
    position: absolute
    top: 80px
    left: 0
    width: 100%
    z-index: 0

  .casova-osa-items

    display: flex
    justify-content: space-between
    align-items: flex-start
    flex-wrap: nowrap
    -webkit-overflow-scrolling: touch
    -ms-overflow-style: -ms-autohiding-scrollbar
    position: relative
    z-index: 1
    scroll-behavior: smooth

    .casova-osa-item
      display: flex
      flex-direction: column
      align-items: center
      max-width: 160px

    .casova-osa-item-text
      margin-top: $margin-until-desktop / 4
      text-align: center

    .casova-osa-circle
      background-color: #000
      display: flex
      align-items: center
      justify-content: center
      border-radius: 100%
      color: #fff
      margin: 0 10px 0 10px

      &.small

        @extend .typography-timeline-small-text

        width: 80px
        height: 80px

        margin-top: $large-circle-height / 4

      &.large

      @extend .typography-timeline-large-text

      width: 160px
      height: 160px



</style>

<script>
import SlovnikSliderImageArrowLeft from "~/assets/images/slider-arrow-left.svg?inline";
import SlovnikSliderImageArrowRight from "~/assets/images/slider-arrow-right.svg?inline";

export default {

  props: ['Data'],

  components: {SlovnikSliderImageArrowLeft,  SlovnikSliderImageArrowRight },

  mounted() {

    this.$element = this.$el.querySelector(`.casova-osa-items-container`);
    this.$casovaOsaContainer = this.$el.querySelector('.casova-osa-items-container');

    this.showNavigation = this.$casovaOsaContainer.scrollWidth > this.$casovaOsaContainer.clientWidth;

  },
   data() {
      return {
        leftPosition: 0,
        $element: null,
        canMove: false,
        intervalRef: null,
        $casovaOsaContainer: null,
        showNavigation: false
      }
    },

  methods: {
    stop: function() {

      clearInterval(this.intervalRef);
      this.canMove = false;

    },
    move: function(direction, amount, isClick = false, e) {

      e.stopPropagation();

      this.canMove = true;

      if (!isClick) {

        this.intervalRef = setInterval((e) => {


            if (this.canMove) {

              this.$element.scrollBy({
                top: 0,
                left: direction == 'right' ? amount : -amount,
                behavior: 'smooth'
              });

            } else {

              clearInterval(timer);

            }

          }, 100);

      }

    },
  }

}
</script>
