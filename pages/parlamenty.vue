<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    ParlamentRadek(
      v-for="parlament in parlamenty" :key="parlament.Id"
      :Id="parlament.Id"
      :Nazev="parlament.Nazev"
      :SnemovniObdobi="parlament.SnemovniObdobi"
      :StrucnyPopis="parlament.StrucnyPopis"
      :Popis="parlament.Popis"
      :Barva="parlament.Barva"
      :CasovaOsa="parlament.CasovaOsa"
      :Galerie="parlament.Galerie"
      :WPNazev="parlament.WPNazev"
      )


</template>


<script>

const ParlamentRadek = () => import('~/components/ParlamentRadek.vue');


import ParlamentyData from '~/data/parlamenty.json';


export default {

    components: { ParlamentRadek },


    async asyncData({store, $config}) {

      if (!$config.useFileCachedAPI) {
        await store.dispatch("getParlamenty");
      }

    },

    computed: {
      parlamenty() {

        if (this.$config.useFileCachedAPI) {
          return ParlamentyData;
        } else {
          return this.$store.state.parlamenty;
        }

      }
    },


    data() {
      return {
        title: `Představení parlamentních těles`,
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: ''
        }
      }
    }

}
</script>
