<template lang="pug">

.tab-navigation(:class="typ")

  nav.parlament-tabs-nav.tabs-nav
    .tabs.columns
      a.tab.column.is-one-fourth(v-for="(item, key) in nastaveni" @click.prevent="selectActiveTab(nastaveni[key].id)" :class="{ active: nastaveni[key].id === activeTabId}" href="#") {{ nastaveni[key].title }}
    .line

  .tab-navigation-content-container.parlament-tabs-content-container(v-if="typ =='parlament-radek' ")

    .tab-navigation-content-item.parlament-tabs-content-item(v-for="(item, key) in nastaveni" :id="nastaveni[key].id" :class="{ active: nastaveni[key].id === activeTabId, [nastaveni[key].id]: true }"  v-html="nastaveni[key].obsah")


  .tab-navigation-content-container(v-if="typ =='parlament-detail-navigace' ")

    .tab-navigation-content-item(v-for="(item, key) in nastaveni" :id="nastaveni[key].id" :class="{ active: nastaveni[key].id === activeTabId, [nastaveni[key].id]: true }")

      .parlament-detail-data-item-circle-container.section-padding.smaller-vertical-margin

        .chart-widget.text-left.chart-pie(v-for="(polozka, klic) in item.data" :key="item.data.id")
          .chart-graphics.text-data
            .text-data-main {{polozka.pocet}}
          .chart-text {{polozka.nazev}}






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
          width: 100px

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


  .tab-navigation.parlament-radek
    margin-top: 100px

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



</style>

<script>
export default {
  props: ['nastaveni', 'typ'],
  data() {
    return {
      activeTabId: Object.values(this.nastaveni).filter(item => item.aktivni === true)[0].id
    }
  },
  computed: {

  },

  methods: {
    selectActiveTab: function(id) {

      this.activeTabId = id;

    },
  }

}
</script>
