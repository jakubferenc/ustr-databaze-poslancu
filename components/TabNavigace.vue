<template lang="pug">

.tab-navigation(:class="Typ" :style="componentStyles")

  nav.parlament-tabs-nav.tabs-nav
    .tabs.columns
      a.tab.column.is-one-fourth(v-for="(item, key) in Nastaveni.polozky" @click.prevent="selectActiveTab(item.id)" :class="{ active: item.id === activeTabId}" href="#")
        span {{ item.title }}
        span.count-items(v-if="item.pocetPolozekNadpis != undefined") &nbsp;({{item.pocetPolozekNadpis}})
    .line

  .tab-navigation-content-container.parlament-tabs-content-container(v-if="Typ =='parlament-radek' ")

    .tab-navigation-content-item.parlament-tabs-content-item(v-for="(item, key) in Nastaveni.polozky" :id="item.id" :class="{ active: item.id === activeTabId, [item.id]: true }")

      .casova-osa-container(v-if="key === 'duleziteUdalosti' ")
        CasovaOsa(:Data="item.obsah" )
      .galerie-medii-container(v-else-if="key === 'galerieMedia' " )
        GalerieMediiSeznam(v-if="Array.isArray(item.obsah)" :Soubory="item.obsah" :MaButtonMore="false" :MaFilter="false")
        div(v-else) Parlamentní těleso {{ item.title }} neobsahuje galerii
      .obsah-container(v-else)
        div(v-html="item.obsah")

  // :TODO: #6 Create a separate component to display tab nav for this page type?
  // probably temporary
  // better to have a separate component to display tab navigation for this page type
  .tab-navigation-content-container(v-if="Typ == 'parlament-detail-navigace'")
    .tab-navigation-content-item(v-for="(item, key) in Nastaveni.polozky" :id="item.id" :class="{ active: item.id === activeTabId, [item.id]: true }")

      .parlament-detail-data-item-circle-container.section-padding.smaller-vertical-margin

        .chart-widget.text-left.chart-pie(v-for="(polozka, klic) in item.data" :key="polozka.Id")
          .chart-graphics.text-data
            .text-data-main {{polozka.PocetNavazanychPoslancu}}
          .chart-text {{polozka.Nazev}}

  .tab-navigation-content-container.parlament-tabs-content-container(v-if="Typ =='mandat-radek' ")

    .tab-navigation-content-item.parlament-tabs-content-item(v-for="(item, key) in Nastaveni.polozky" :key="item.id" :class="{ active: item.id === activeTabId, [item.id]: true }")

      .columns.is-multiline(v-if=" item.id === 'zakladni-informace' ")

        .column.is-one-third-widescreen

          .metadata-section
            .metadata-section-title.typography-metadata-section-title
              h3 Začátek mandátu
            .metadata-section-content.typography-item-detail-text
              div {{item.mandat.DatumZacatkuZobrazene}}



        .column.is-one-third-widescreen

          .metadata-section
            .metadata-section-title.typography-metadata-section-title
              h3 Konec mandátu
            .metadata-section-content.typography-item-detail-text
              div {{item.mandat.DatumKonceZobrazene}}


        .column.is-one-third-widescreen

          .metadata-section
            .metadata-section-title.typography-metadata-section-title
              h3 Délka mandátu
            .metadata-section-content.typography-item-detail-text
              div
                span(v-if="item.mandat.Delka.Roky > 0")
                  span {{item.mandat.Delka.Roky}}
                  span(v-if="item.mandat.Delka.Roky > 4") &nbsp;let,&nbsp;
                  span(v-if="item.mandat.Delka.Roky < 5 && item.mandat.Delka.Roky > 1") &nbsp;roky,&nbsp;
                  span(v-if="item.mandat.Delka.Roky == 1") &nbsp;rok,&nbsp;
                span(v-if="item.mandat.Delka.Dny > 0")
                  span {{item.mandat.Delka.Dny}}
                  span(v-if="item.mandat.Delka.Dny > 4") &nbsp;dnů
                  span(v-if="item.mandat.Delka.Dny < 5 && item.mandat.Delka.Roky > 1") &nbsp;dny
                  span(v-if="item.mandat.Delka.Dny == 1") &nbsp;den

        .column.is-one-third-widescreen

          .metadata-section
            .metadata-section-title.typography-metadata-section-title
              h3 Forma ukončení mandátu
            .metadata-section-content.typography-item-detail-text
              div DOPLNIT formu ukončení nemáme v API
              //- div(v-if="adresaNarozeni.mesto") {{adresaNarozeni.mesto}}
              //- div {{adresaNarozeni.zeme}}

        .column.is-one-third-widescreen(v-if="item.mandat.VolebniStrana")
          .metadata-section
            .metadata-section-title.typography-metadata-section-title
              h3 Volební strana
            .metadata-section-content.typography-item-detail-text
              div {{item.mandat.VolebniStrana}}

        .column.is-one-third-widescreen(v-if="item.mandat.Kurie")
          .metadata-section
            .metadata-section-title.typography-metadata-section-title
              h3 Kurie
            .metadata-section-content.typography-item-detail-text
              div {{item.mandat.Kurie}}

        .column.is-one-third-widescreen(v-if="item.mandat.Profese")
          .metadata-section
            .metadata-section-title.typography-metadata-section-title
              h3 Profese (v době zvolení)
            .metadata-section-content.typography-item-detail-text
              div {{item.mandat.Profese}}

        .column.is-one-third-widescreen(v-if="item.mandat.VekNaZacatkuMandatu")
          .metadata-section
            .metadata-section-title.typography-metadata-section-title
              h3 Věk na začátku mandátu
            .metadata-section-content.typography-item-detail-text
              div {{item.mandat.VekNaZacatkuMandatu}}

        .column.is-one-third-widescreen(v-if="item.mandat.VekNaKonciMandatu")
          .metadata-section
            .metadata-section-title.typography-metadata-section-title
              h3 Věk na konci mandátu
            .metadata-section-content.typography-item-detail-text
              div {{item.mandat.VekNaKonciMandatu}}


      .columns.is-multiline(v-if=" item.id === 'parlamentni-funkce' ")

        div(v-if="item.mandat.Funkce.length" )
          .column.is-one-third-widescreen(v-for="(funkce, index) in item.mandat.Funkce" :key="index")

            .metadata-section
              .metadata-section-title.typography-metadata-section-title
                h3 Název funkce
              .metadata-section-content.typography-item-detail-text
                div {{funkce}}

        div(v-else) {{$t('components.TabNavigation.tabHasNoItems')}}

      .columns.is-multiline(v-if=" item.id === 'vybory' ")


        .column.is-one-third-widescreen(v-if="item.mandat.Vybory.length && item.mandat.Vybory.length > 0" v-for="(vybor, index) in item.mandat.Vybory" :key="index")

          .metadata-section
            .metadata-section-title.typography-metadata-section-title
              h3 Název výboru
            .metadata-section-content.typography-item-detail-text
              div {{vybor}}

        div(v-else) {{$t('components.TabNavigation.tabHasNoItems')}}

</template>


<style lang="sass">
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"



  .tab-navigation.parlament-detail-navigace

    .parlament-detail-data-item-circle-container

      display: flex
      margin-left: auto
      margin-right: auto
      flex-wrap: wrap
      justify-content: flex-start

      .chart-widget
        margin-bottom: $margin-until-desktop / 2

        +until($desktop)

        +from($desktop)
          margin-left: $margin-from-desktop/4
          margin-right: $margin-from-desktop/4

        +from($tablet)

        +from($desktop)

        +from($fullhd)

        .chart-graphics
          width: 90px
          height: 90px
          border-radius: 100%
          background-color: #fff

        .chart-text
          width: 150px

    .tab-navigation-content-item
      display: none

      &.active
        display: block

    .tabs
      max-width: 886px
      margin: 0 auto

    .tab
      @extend .typography-filter-heading

      width: 175px
      height: 41px
      border-radius: 8px
      text-decoration: none
      display: flex
      align-items: center
      justify-content: center

      &:hover,
      &.active
        background-color: #fff
        text-decoration: underline


  .tab-navigation
    margin-top: 100px

    &.mandat-radek,
    &.parlament-radek

      .parlament-tabs-nav

        .line
          height: 1px
          background: #000
          position: relative
          z-index: 0

        .tabs
          display: flex
          margin-bottom: 0

        .tab
          height: 100px
          text-align: center
          position: relative
          bottom: -1px
          margin-left: -1px
          display: flex
          align-items: center
          justify-content: center
          text-decoration: none
          border-width: 1px
          border-style: solid
          border-color: transparent

          &:hover,
          &.active
            border-top-left-radius: 15px
            border-top-right-radius: 15px
            border-color: #000
            border-bottom: 1px solid #F8F6F1
            z-index: 2

          &.active
            text-decoration: underline

    .parlament-tabs-content-item
      padding: 50px 20px 0 20px

      display: none

      &.active
        display: block

      &.dalsi-informace
        text-align: left

        p
          margin-bottom: 1em



</style>

<script>
export default {
  props: ['Nastaveni', 'Typ'],
  data() {
    return {
      defaultStyles: {},
      activeTabId: Object.values(this.Nastaveni.polozky).filter(item => item.aktivni === true)[0].id
    }
  },
  computed: {

    componentStyles() {

      return Object.assign({}, this.defaultStyles, this.Nastaveni?.tabNavigaceNastaveni?.style ? this.Nastaveni.tabNavigaceNastaveni.style : {});

    },

  },

  mounted() {
  },

  methods: {
    selectActiveTab: function(id) {

      this.activeTabId = id;

    },
  }

}
</script>
