<template lang="pug">

  .section

    <Rozcestnik />

    .section-padding-h-margin-v

      h2.typography-section-title Seznam poslanců

      PoslanciSeznam(:PoslanciVstupniPolozky="poslanci" :MaStatistiky="false" :MaPaginaci="false" :MaFilter="false" :MaButtonMore="true" :ButtonMoreLink="/poslanci/")

    <ParlamentySeznam :Parlamenty="parlamenty"/>

    SlovnikSlider(:MaButtonMore="true" :SlovnikovaHesla="slovnikova_hesla")

    .section-padding.alt-bg

      h2.typography-section-title() Galerie médií

      GalerieMediiSeznam(:Soubory="soubory" :MaButtonMore="true" :MaFilter="false")

</template>

<script>
export default {

    async fetch ({store}) {

      await store.dispatch("getMedia");

      await store.dispatch("getPoslanciHomepage", {
        limit: 20,
        stranka: 1
      });

      await store.dispatch("getParlamenty");

      await store.dispatch("getSlovnikovaHesla");

    },

    computed: {
      soubory() {
        return this.$store.state.media_soubory;
      },
      poslanci() {
        return this.$store.state.poslanci_homepage;
      },
      parlamenty() {
        return this.$store.state.parlamenty;
      },
      slovnikova_hesla() {
        return this.$store.state.slovnikova_hesla;
      },
    },

    data() {
      return {
        title: `Hlavní stránka`,
        hasSlider: false,
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'index has-slider'
        }
      }
    }

}
</script>
