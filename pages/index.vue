<template lang="pug">

  .section

    <Rozcestnik />

    .section-padding.alt-bg

      h2.section-title Mapová data poslanců

      p ZDE bude neinteraktivní grafika mapy + sociálních map => odkaz na /poslanci a "reklama na mapové funkce aplikace"

    .section-padding-h-margin-v

      h2.section-title Seznam poslanců

    PoslanciSeznam(v-if="poslanci" :PoslanciVstupniPolozky="poslanci" :MaStatistiky="false" :MaPaginaci="false" :MaFilter="false" :MaButtonMore="true" :ButtonMoreLink="/poslanci/")

    ParlamentySeznam(v-if="parlamenty" :Parlamenty="parlamenty")

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

import ParlamentyData from '~/data/parlamenty.json';


export default {

    components: { Rozcestnik, PoslanciSeznam, ParlamentySeznam, SlovnikSlider, GalerieMediiSeznam },

    async asyncData ({store, $config}) {

      const limit = 20;


      if (!$config.useFileCachedAPI) {

        // wordpress api calls
        await store.dispatch("getMedia");
        await store.dispatch("getSlovnikovaHesla");

        await store.dispatch("getPoslanciHomepage", {
          limit: 20,
          stranka: 1
        });

        await store.dispatch("getParlamenty");

        return {
          poslanci: store.state.poslanci_homepage,
          parlamenty: store.state.parlamenty,
          slovnikova_hesla: store.state.slovnikova_hesla,
          soubory: [...store.state.media_soubory].slice(0, limit)
        }


      } else {

        await store.dispatch("getPoslanciHomepage", {
          limit: 20,
          stranka: 1
        });



        return {
          poslanci: store.state.poslanci_homepage,
          parlamenty: ParlamentyData,
          slovnikova_hesla: SlovnikovaHeslaData,
          soubory: MediaData.slice(0, limit),
        }



      }

    },

    computed: {


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
