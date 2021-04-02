<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    PoslanciSeznam(:Poslanci="poslanci" :MaNadpis="false" :MaFilter="true" :PolozekNaRadku="6")

</template>


<script>
export default {

    created() {
      this.$store.dispatch("getPoslanciSeznam");
    },
    computed: {
      poslanci() {
        return this.$store.state.poslanci;
      },
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
          class: ''
        }
      }
    }

}
</script>
