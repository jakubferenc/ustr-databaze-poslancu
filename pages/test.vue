<template lang="pug">

</template>

<script>
export default {

    async fetch ({store}) {

      await store.dispatch("getMedia");

      await store.dispatch("getPoslanciHomepage", {
        limit: 20,
        stranka: 1
      });

      await store.dispatch("getParlamenty");

      await store.dispatch("getSlovnikovaHesla");

      await store.dispatch("getSnemovniObdobiDetail", {snemovniObdobiId: 95});

    },

    computed: {
      soubory() {
        return this.$store.state.media_soubory;
      },
      poslanci() {
        return this.$store.state.poslanci_homepage;
      },
      parlamenty() {
        return this.$store.state.parlamenty;
      },
      slovnikova_hesla() {
        return this.$store.state.slovnikova_hesla;
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
