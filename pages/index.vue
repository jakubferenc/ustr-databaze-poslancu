<template lang="pug">

  .section

    <Rozcestnik />

    PoslanciSeznam(:Poslanci="poslanci" :MaNadpis="true" :MaFilter="false" :PolozekNaRadku="6")

    <SlovnikSlider />

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
