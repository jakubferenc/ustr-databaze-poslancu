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


    async asyncData({params, error, payload, store, $config}) {

      try {

        if (!$config.useFileCachedAPI) {
          await store.dispatch("getParlamenty");

          return {
            parlamenty: this.$store.state.parlamenty,
          }

        } else {

          const parlamentyRes = await ParlamentyData();

          return {
            parlamenty: parlamentyRes,
          }

        }


      } catch (err) {
        console.warn(err);
      }

    },



    computed: {

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
