<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    <ParlamentRadek v-for="parlament in parlamenty" :key="parlament.Id" :Id="parlament.Id" :Nazev="parlament.Nazev" :SnemovniObdobi="parlament.SnemovniObdobi" :StrucnyPopis="parlament.StrucnyPopis" :Popis="parlament.Popis" :Barva="parlament.Barva" :CasovaOsa="parlament.CasovaOsa" :WPNazev="parlament.WPNazev" />


</template>


<script>
export default {

    async fetch({store}) {

      await store.dispatch("getParlamenty");
    },

    computed: {
      parlamenty() {
        return this.$store.state.parlamenty;
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
