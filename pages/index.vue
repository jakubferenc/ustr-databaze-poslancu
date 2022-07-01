<template lang="pug">

.sections-container

  <Slider :Polozky="sliderItems" />

  <Rozcestnik />

  .section-padding.alt-bg

    h2.section-title.section-title-no-margin-bottom Interaktivní mapy stranické příslušnosti

    p
      NuxtLink(to="/snemovny-mapy/")
        img(src="~/assets/images/banner-interaktivni-mapy.png" alt="")

  PoslanciSeznam(v-if="poslanci"  :PoslanciVstupniPolozky="poslanci" Nadpis="Výběr poslanců v databázi" :MaStatistiky="false" :MaPaginaci="false" :MaFilter="false" :MaButtonMore="true" ButtonMoreLink="/poslanci/" Mod="Seznam")

  ParlamentySeznam(v-if="parlamenty" Nadpis="Zastupitelské sbory" :Parlamenty="parlamenty" :MaButtonMore="true" ButtonMoreLink="/parlamenty/")

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
const Slider = () => import('~/components/Slider.vue');
const Rozcestnik = () => import('~/components/Rozcestnik.vue');
const PoslanciSeznam = () => import('~/components/PoslanciSeznam.vue');
const ParlamentySeznam = () => import('~/components/ParlamentySeznam.vue');
const SlovnikSlider = () => import('~/components/SlovnikSlider.vue');
const GalerieMediiSeznam = () => import('~/components/GalerieMediiSeznam.vue');

const MediaData = () => import('~/data/media.json').then(m => m.default || m);
const ParlamentyData = () => import('~/data/parlamenty.json').then(m => m.default || m);
const SlovnikovaHeslaData = () => import('~/data/slovnik.json').then(m => m.default || m);

const PoslanciHomepageData = () => import('~/data/poslanciHomepage.json').then(m => m.default || m);


const StrankyData = () => import('~/data/stranky.json').then(m => m.default || m);


export default {

    components: {Slider, Rozcestnik, PoslanciSeznam, ParlamentySeznam, SlovnikSlider, GalerieMediiSeznam },

    async asyncData ({store, $config}) {

      const limit = 20;


      if (!$config.useFileCachedAPI) {

        // wordpress api calls
        await store.dispatch("getMedia");
        await store.dispatch("getSlovnikovaHesla");

        await store.dispatch("getPoslanciHomepage", {
          limit: 10,
          stranka: 1
        });

        await store.dispatch("getParlamenty");

        await store.dispatch("getStranky");

        return {
          poslanci: store.state.poslanci_homepage,
          parlamenty: store.state.parlamenty,
          slovnikova_hesla: store.state.slovnikova_hesla,
          soubory: [...store.state.media_soubory].slice(0, limit),
          sliderItems: [...store.state.stranky].filter(item => item.id == 538),
        }



      } else {

        await store.dispatch("getPoslanciHomepage", {
          limit: 20,
          stranka: 1
        });

        const souboryRes  = await MediaData();
        const parlamentyRes = await ParlamentyData();
        const slovnikRes = await SlovnikovaHeslaData();

        const strankyRes = await StrankyData();

        const poslanciHomepageRes = await PoslanciHomepageData();


        return {
          poslanci: poslanciHomepageRes,
          parlamenty: parlamentyRes,
          slovnikova_hesla: slovnikRes,
          soubory: souboryRes.slice(0, limit),
          sliderItems: [...strankyRes].filter(item => item.id == 538),
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
