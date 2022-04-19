<template lang="pug">

  .casova-osa-component

    .casova-osa-items-container

      .casova-osa-line

      .casova-osa-items

        .casova-osa-item(v-for="(udaj, index) in Data" :key="index" :class="{small: udaj.dulezita.toString() != 'true', large: udaj.dulezita.toString() === 'true'}")
          .casova-osa-circle(:class="{small: udaj.dulezita.toString() != 'true', large: udaj.dulezita.toString() === 'true', 'date-birth': udaj.typUdalosti && udaj.typUdalosti.includes('datumNarozeni'), 'date-mandat': udaj.typUdalosti && udaj.typUdalosti.includes('mandat'), 'date-death': udaj.typUdalosti && udaj.typUdalosti.includes('datumUmrti')}") {{ udaj.datum_udalosti.split('-')[0] }}
          .casova-osa-item-text(v-html="udaj.nazev_udalosti")


    .slovnik-slider-nav(role="navigation" v-if="showNavigation")
      span.slider-nav-item.slider-nav-left(@click="move('left', 50, true, $event)"  @mousedown="move('left', 50, false, $event)" @mouseup="stop()")
        SlovnikSliderImageArrowLeft()

      span.slider-nav-item.slider-nav-right(@click="move('right', 50, true, $event)" @mousedown="move('right', 50, false, $event)" @mouseup="stop()")
        SlovnikSliderImageArrowRight()

</template>


<style lang="sass">

  @use "sass:math"


  .casova-osa-component
    display: flex // it will primarily center the navigation buttons
    align-items: center
    flex-direction: column

  .slovnik-slider-nav

    margin-top: $margin-until-desktop
    display: flex
    justify-content: space-between

    +from($widescreen)
      width: 215px

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
    margin-top: $margin-until-desktop
    width: 100%
    padding-bottom: math.div($margin-until-desktop, 2)

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
    overflow-x: scroll


    -ms-overflow-style: -ms-autohiding-scrollbar
    position: relative
    z-index: 1
    scroll-behavior: smooth
    width: 100%

    .casova-osa-item
      display: flex
      flex-direction: column
      align-items: center
      max-width: 160px

      &.small
        padding-left: math.div($margin-until-desktop, 2)
        padding-right: math.div($margin-until-desktop, 2)

    .casova-osa-item-text
      margin-top: math.div($margin-until-desktop, 4)
      text-align: center

    .casova-osa-circle
      background-color: #000
      display: flex
      align-items: center
      justify-content: center
      text-align: center
      border-radius: 100%
      color: #fff
      margin: 0 10px 0 10px

      &.date-mandat
        background-color: #F8F6F1
        color: #000


      &.small

        @extend %typography-timeline-small-text

        width: 80px
        height: 80px

        margin-top: math.div($large-circle-height, 4)

      &.large

        @extend %typography-timeline-large-text

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

    console.log(this.Data);

    this.$casovaOsaContainer = this.$el.querySelector('.casova-osa-items-container');
    this.$casovaOsaItemsElement = this.$el.querySelector(`.casova-osa-items`);


    this.showNavigation = this.$casovaOsaItemsElement.scrollWidth > this.$casovaOsaItemsElement.clientWidth;

  },
   data() {
      return {
        leftPosition: 0,
        $casovaOsaItemsElement: null,
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

              this.$casovaOsaItemsElement.scrollBy({
                top: 0,
                left: direction == 'right' ? amount : -amount,
                behavior: 'smooth'
              });

            } else {

              clearInterval(timer);

            }

          }, 100);

      } else {

        this.$casovaOsaItemsElement.scrollBy({
          top: 0,
          left: direction == 'right' ? amount : -amount,
          behavior: 'smooth'
        });


      }

    },
  }

}
</script>
