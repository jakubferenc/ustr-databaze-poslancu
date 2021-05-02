<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    <ParlamentRadek v-for="parlament in parlamenty" :key="parlament.Id" :Id="parlament.Id" :Nazev="parlament.Nazev" :SnemovniObdobi="parlament.SnemovniObdobi" />


</template>


<script>
export default {

    fetch() {

      this.$store.dispatch("getParlamenty");
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
