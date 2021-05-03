<template lang="pug">

  .parlament-detail.section

    .parlament-detail-header

      .parlament-detail-header-stats.stats-left

        .chart-row

          .chart-widget.text-right.chart-pie
            .chart-graphics.pie
            .chart-text Poměr pohlaví poslanců

        .chart-row

          .chart-widget.text-right.chart-pie
            .chart-graphics.pie
            .chart-text Vzdělání

        .chart-row

          .chart-widget.text-right.chart-pie
            .chart-graphics.pie
            .chart-text Nově zvolení/Znovuzvolení

      .component-snemovna-schema
        <ParlamentNahledObecnyImage />

      .parlament-detail-header-stats.stats-right

        .chart-row

          .chart-widget.text-left.chart-pie
            .chart-graphics.text-data
              .text-data-main 50
              .text-data-sub let
            .chart-text Průměrný věk

        .chart-row

          .chart-widget.text-left.chart-pie
            .chart-graphics.text-data
              .text-data-main 34
              .text-data-sub let
            .chart-text Nejnižší věk

        .chart-row

          .chart-widget.text-left.chart-pie
            .chart-graphics.text-data
              .text-data-main 21
              .text-data-sub let
            .chart-text Nejvyšší věk

    .parlament-detail-title
      h1.typography-main-title.typography-has-no-margin-top.typography-has-no-margin-bottom {{ title }} <br> ({{date}})
      .counter-poslanci 514 poslanců celkem




    .parlament-detail-map

    .parlament-detail-about

    .parlament-detail-events


    .parlament-detail-poslanci

    .parlament-detail-galerie-medii

    .parlament-detail-metadata-table



</template>

<style lang="sass">
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .component-snemovna-schema
    svg
      width: 886px
      height: 450px

  .parlament-detail-title

    text-align: center

    .typography-main-title
      line-height: 1

    .counter-poslanci
      margin-top: 10px


  .parlament-detail-header

    padding: $margin-until-desktop
    display: flex
    justify-content: space-between

    .parlament-detail-header-stats

      display: flex
      flex-direction: column
      width: 360px

      &.stats-left
        align-items: flex-start

  .chart-row
    margin-bottom: 40px

  .chart-widget
    display: flex
    align-items: center
    justify-content: center

    .chart-text
      @extend .typography-filter-heading

    &.text-left
      flex-direction: row-reverse


      .chart-text
        margin-right: 20px

    &.text-right

      .chart-text
        margin-left: 20px

    .chart-graphics

      &.text-data

        width: 126px
        height: 126px
        background-color: #EDECE7
        display: inline-block
        border-radius: 100%
        display: flex
        align-items: center
        justify-content: center
        flex-direction: column

        .text-data-main
          @extend .typography-grafy-data-text

        .text-data-sub
          margin-top: 3px

      &.pie
        width: 126px
        height: 126px
        background-color: #EDECE7
        display: inline-block
        border-radius: 100%



</style>

<script>
  import ParlamentNahledObecnyImage from "~/assets/images/icon-parlamentni-teleso.svg?inline";

export default {

    components: { ParlamentNahledObecnyImage },

    created() {
    },

    data() {
      return {
        title: `Revoluční národní shromáždění`,
        date: '1918–1920'
      }
    },

    mounted() {

      const schemaCircles = this.$el.querySelectorAll('.component-snemovna-schema svg circle');

      schemaCircles.forEach((el, index) => {

        if (index <= 40) {
          el.style.fill = "#C0E4F1"
        }

        if (index > 40 && index <= 80) {
          el.style.fill = "#ACD0C0"
        }

        if (index > 80 && index <= 180) {
          el.style.fill = "#DDC3B6"
        }

        if (index > 180 && index <= schemaCircles.length+1) {
          el.style.fill = "#E8D7AD"
        }

        el.addEventListener('mouseenter', (e) => {
          e.target.style.fill = "red";
        });

        el.addEventListener('click', (e) => {

        });

      });

    },

    head () {
      return {
        title: `${this.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'alt-bg-02'
        }
      }
    }

}
</script>
