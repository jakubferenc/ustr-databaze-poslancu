<template lang="pug">

  .section

    //- <Rozcestnik />

    .section-padding.alt-bg

      h2.section-title Mapová data poslanců

      p ZDE bude neinteraktivní grafika mapy + sociálních map => odkaz na /poslanci a "reklama na mapové funkce aplikace"

    .section-padding-h-margin-v

      h2.section-title Seznam poslanců

      PoslanciSeznam(:PoslanciVstupniPolozky="poslanci" :MaStatistiky="false" :MaPaginaci="false" :MaFilter="false" :MaButtonMore="true" :ButtonMoreLink="/poslanci/")

    <ParlamentySeznam :Parlamenty="parlamenty"/>

    SlovnikSlider(:MaButtonMore="true" :SlovnikovaHesla="slovnikova_hesla")

    .section-padding.alt-bg

      h2.section-title Galerie médií

      GalerieMediiSeznam(:Soubory="soubory" :MaButtonMore="true" :MaFilter="false")

</template>

<style lang="sass" scoped>

  .section-title
    @extend %typography-section-title

</style>

<script>

export default {

    components: {  },


    async asyncData ({store}) {

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

        const limit = 20;

        let media = [...this.$store.state.media_soubory];

        return media.slice(0, limit);
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

    mounted() {

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
