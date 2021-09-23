<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    .section-padding-h-margin-v

      PoslanciSeznam(
        :PoslanciVstupniPolozky="poslanci"
        :NastaveniFiltrace="nastaveniFiltrace"
        :PoslanciStatistiky="poslanciStatistiky"
        :MaPaginaci="true"
        :MaFiltr="true"
        :MaStatistiky="true"
        :MaButtonMore="true"
        :ButtonMoreLink="false"
      )


</template>


<script>

import apiModule from '../factories';

export default {

    async asyncData ({store}) {
      await store.dispatch("getPoslanciAll");
    },

    computed: {
      poslanci() {
        return this.$store.state.poslanci.slice(0, 100);
      },
      poslanci_filtrovani() {
        return this.$store.state.poslanci_filtrovani;
      },
      poslanci_seznam_razeni_default_id() {
        return this.$store.state.poslanci_seznam_razeni_id;
      },
      poslanciStatistiky() {

        return this.$store.state.poslanci_statistiky;
      },

     nastaveniFiltrace() {

      // the values must fit the API points and data formats!

      const {nabozenske_vyznani, narodnosti, parlamenty, maji_vysokou_skolu} = this.$store.state.filter_data;

      const filterSettings = apiModule.createFilterSettingsFactory(nabozenske_vyznani, narodnosti, parlamenty, maji_vysokou_skolu);

      return filterSettings;

    }

  },

    data() {
      return {
        title: `Poslanci`,
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'alt-bg'
        }
      }
    }

}
</script>


