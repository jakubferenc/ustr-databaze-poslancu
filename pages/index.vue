<template lang="pug">

  .section

    <Rozcestnik />

    .section-padding.alt-bg

      h2.section-title Mapová data poslanců

      p ZDE bude neinteraktivní grafika mapy + sociálních map => odkaz na /poslanci a "reklama na mapové funkce aplikace"

    .section-padding-h-margin-v

      h2.section-title Seznam poslanců

      //- PoslanciSeznam(v-if="poslanci" :PoslanciVstupniPolozky="poslanci" :MaStatistiky="false" :MaPaginaci="false" :MaFilter="false" :MaButtonMore="true" :ButtonMoreLink="/poslanci/")

    //- ParlamentySeznam(v-if="parlamenty" :Parlamenty="parlamenty")

    SlovnikSlider(v-if="slovnikova_hesla"  :MaButtonMore="true" :SlovnikovaHesla="slovnikova_hesla")

    .section-padding.alt-bg

      h2.section-title Galerie médií

      GalerieMediiSeznam(v-if="soubory" :Soubory="soubory" :MaButtonMore="true" :MaFilter="false")

</template>

<style lang="sass" scoped>

  .section-title
    @extend %typography-section-title

</style>

<script>
const Rozcestnik = () => import('~/components/Rozcestnik.vue');
const PoslanciSeznam = () => import('~/components/PoslanciSeznam.vue');
const ParlamentySeznam = () => import('~/components/ParlamentySeznam.vue');
const SlovnikSlider = () => import('~/components/SlovnikSlider.vue');
const GalerieMediiSeznam = () => import('~/components/GalerieMediiSeznam.vue');

import SlovnikovaHeslaData from '~/data/slovnik.json';
import MediaData from '~/data/media.json';

export default {

    components: { Rozcestnik, PoslanciSeznam, ParlamentySeznam, SlovnikSlider, GalerieMediiSeznam },

    async asyncData ({store, $config}) {

      if (!$config.useFileCachedAPI) {

        // wordpress api calls
        await store.dispatch("getMedia");
        await store.dispatch("getSlovnikovaHesla");

        await store.dispatch("getPoslanciHomepage", {
          limit: 20,
          stranka: 1
        });

        await store.dispatch("getParlamenty");

      }

    },

    computed: {

      soubory() {

        const limit = 20;

        let media;

        if (this.$config.useFileCachedAPI) {
          media = MediaData.slice(0, limit);
        } else {
          media = [...this.$store.state.media_soubory].slice(0, limit);
        }

        return media;
      },
      poslanci() {
        return this.$store.state.poslanci_homepage;
      },
      parlamenty() {
        return this.$store.state.parlamenty;
      },
      slovnikova_hesla() {

        if (this.$config.useFileCachedAPI) {
          return SlovnikovaHeslaData;
        } else {
          return this.$store.state.slovnikova_hesla;
        }

      },
    },

    created() {


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
