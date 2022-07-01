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

const ParlamentyData = () => import('~/data/parlamenty.json').then(m => m.default || m);

export default {

    components: { ParlamentRadek },


    async fetch() {

      try {

        if (!this.$config.useFileCachedAPI) {


          await this.$store.dispatch("getParlamenty");


          this.parlamenty = this.$store.state.parlamenty;


        } else {

          const parlamentyRes = await ParlamentyData();

          this.parlamenty = parlamentyRes;

        }


      } catch (err) {
        console.warn(err);
      }

    },



    computed: {

    },


    data() {
      return {
        title: `Představení zastupitelských sborů`,
        parlamenty: [],
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
