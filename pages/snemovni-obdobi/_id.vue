<template lang="pug">

  .parlament-detail.section

    .parlament-detail-header

      .parlament-detail-header-stats.stats-left

        .chart-row


          .chart-widget.text-right.chart-pie
            .chart-graphics.text-data
              .text-data-main {{statistiky.ProcentoMuzu}}<small class="text-data-sub">%</small>
              .text-data-sub mužů
            .chart-text Poměr pohlaví poslanců

        .chart-row

          .chart-widget.text-right.chart-pie
            //.chart-graphics.pie
            .chart-graphics.text-data
              .text-data-main {{statistiky.ProcentoVysokoskolaku}}<small class="text-data-sub">%</small>
              .text-data-sub
            .chart-text vysokoškoláků

        .chart-row

          .chart-widget.text-right.chart-pie
            .chart-graphics.text-data
              .text-data-main {{ parseInt(statistiky.PocetMazaku / (snemovniObdobi.PocetPoslancu / 100))  }}<small class="text-data-sub">%</small>
              .text-data-sub
            .chart-text Znovuzvolených

      .component-snemovna-schema
        <ParlamentNahledObecnyImage />

      .parlament-detail-header-stats.stats-right

        .chart-row

          .chart-widget.text-left.chart-pie
            .chart-graphics.text-data
              .text-data-main {{statistiky.PrumernyVekPoslancu}}
              .text-data-sub let
            .chart-text Průměrný věk

        .chart-row

          .chart-widget.text-left.chart-pie
            .chart-graphics.text-data
              .text-data-main {{statistiky.NejnizsiVekPoslance}}
              .text-data-sub let
            .chart-text Nejnižší věk

        .chart-row

          .chart-widget.text-left.chart-pie
            .chart-graphics.text-data
              .text-data-main {{statistiky.NejvyssiVekPoslance}}
              .text-data-sub let
            .chart-text Nejvyšší věk

    .parlament-detail-title
      h1.typography-main-title.typography-has-no-margin-top.typography-has-no-margin-bottom {{snemovniObdobi.Nazev}} <br> ({{snemovniObdobi.DatumZacatkuZobrazene}} — {{snemovniObdobi.DatumKonceZobrazene}} )
      .counter-poslanci celkem {{snemovniObdobi.PocetPoslancu}} poslanců


    .parlament-meta-tab-navigation
      TabNavigace(:nastaveni="tabNavigaceNastaveni" typ="parlament-detail-navigace")


    .parlament-detail-map

      h2.typography-section-title Poslanci na mapě


      img(src="~/assets/images/section-map-mock.png" alt="")


    .parlament-detail-about.section-padding-h-margin-v

      h2.typography-section-title  O sněmovně

      .typography-text-block.columns.is-multiline

        .text-block-image.column.is-full.is-full-tablet.is-half-desktop
          img(v-if="snemovniObdobi.UvodniFotografie" :src="snemovniObdobi.UvodniFotografie" :alt="snemovniObdobi.Nazev")
        .text-block-text.real-content-text.column.is-full.is-full-tablet.is-half-desktop(v-html="snemovniObdobi.Popis")


    .parlament-detail-events.section-padding-h-margin-v

      h2.typography-section-title Důležité události

      CasovaOsa(:Data="snemovniObdobi.CasovaOsa" v-if="snemovniObdobi.CasovaOsa")


    .parlament-detail-poslanci.section-padding-h-margin-v

      h2.typography-section-title Poslanci

      PoslanciSeznam(
        :Poslanci="snemovniObdobi.Poslanci"
        :MaPaginaci="true"
        :MaFiltr="true"
        :MaStatistiky="false"
        :MaButtonMore="false"
        :ButtonMoreLink="false"
      )


    .parlament-detail-galerie-medii.section-padding-h-margin-v

      h2.typography-section-title Galerie médií

      GalerieMediiSeznam(:Soubory="snemovniObdobi.Galerie" :MaButtonMore="false" :MaFilter="false")

    .parlament-detail-metadata-table.section-padding-h-margin-v

      h2.typography-section-title Kompletní informace o sněmovně

      p fadfsd




</template>

<style lang="sass">
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .parlament-detail-map
    .typography-section-title
      position: relative
      z-index: 2
      margin-bottom: -140px

  .parlament-meta-tab-navigation
    margin: $margin-until-desktop / 2 0

    +until($desktop)

    +from($desktop)
      margin: $margin-until-desktop * 2 0

    +from($tablet)

    +from($desktop)

    +from($fullhd)



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
        text-align: right

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

 //import DoughnutChart from '~/components/DoughnutChart';

  const chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  export default {

      components: { ParlamentNahledObecnyImage },

      async fetch ({store, params}) {

        await store.dispatch("getSnemovniObdobiDetail", {
          snemovniObdobiId: params.id
        });


      },

      data() {
        return {
          ukazatDataProKonecneObdobi: false,
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
            e.target.classList.add('active');
          });

          el.addEventListener('mouseleave', (e) => {
            e.target.classList.remove('active');
          });

          el.addEventListener('click', (e) => {

          });

        });

      },

      computed: {


        snemovniObdobi() {

          return this.$store.state.snemovni_obdobi_detail;
        },

        statistiky() {

          if (!this.ukazatDataProKonecneObdobi) {
            return this.$store.state.snemovni_obdobi_detail.SnemovniObdobiStatistikaZacatek;
          } else {
            return this.$store.state.snemovni_obdobi_detail.SnemovniObdobiStatistikaKonec;
          }

        },


        tabNavigaceNastaveni() {

          return {
            poslaneckeKluby: {
              id: 'poslanecke-kluby',
              title: 'poslanecké kluby',
              data: [
                {
                  id: 1,
                  nazev: 'nějaký název',
                  pocet: 34
                },
                {
                  id: 2,
                  nazev: 'nějaký název',
                  pocet: 21
                }
              ],
              aktivni: true
            },
            volebniStrany: {
              id: 'volebni-strany',
              title: 'volební strany',
              data: [
                {
                  id: 1,
                  nazev: 'nějaký název',
                  pocet: 12
                }
              ],
            },
            uzemi: {
              id: 'uzemi',
              title: 'území',
              data: [
                {
                  id: 1,
                  nazev: 'nějaký název',
                  pocet: 57
                }
              ],
            },
            kurie: {
              id: 'kurie',
              title: 'kurie',
              data: [
                {
                  id: 1,
                  nazev: 'nějaký název',
                  pocet: 11
                }
              ],
            },
            narodnost: {
              id: 'narodnost',
              title: 'podle národnosti',
              data: [
                {
                  id: 1,
                  nazev: 'nějaký název',
                  pocet: 7
                }
              ],
            }
          };

        },
      },

      head () {
        return {
          title: `${this.snemovniObdobi.Nazev} (${this.snemovniObdobi.DatumZacatkuZobrazene} — ${this.snemovniObdobi.DatumKonceZobrazene}) — ${this.$config.globalTitle}`,
          htmlAttrs: {
            class: 'alt-bg-02 subpage-parlament'
          }
        }
      }

  }
</script>
