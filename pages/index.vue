<template lang="pug">

  .section

    <Rozcestnik />

    .section-padding-h-margin-v

      h2.typography-section-title Seznam poslanců

      PoslanciSeznam(:Poslanci="poslanci" :MaStatistiky="false" :MaPaginaci="false" :MaFilter="false" :MaButtonMore="true" :ButtonMoreLink="/poslanci/")

    <ParlamentySeznam />

    SlovnikSlider(:MaButtonMore="true")

    .section-padding.alt-bg

      h2.typography-section-title() Galerie médií

      GalerieMediiSeznam(:Soubory="soubory" :MaButtonMore="true" :MaFilter="false")

</template>

<script>
export default {

    created() {
      this.$store.dispatch("getMedia");
      this.$store.dispatch("getPoslanciHomepage", {
        limit: 20,
        stranka: 1
      });
    },

    computed: {
      soubory() {
        return this.$store.state.media_soubory;
      },
      poslanci() {
        return this.$store.state.poslanci_homepage;
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
