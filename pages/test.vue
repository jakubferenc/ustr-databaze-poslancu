<template lang="pug">

</template>

<script>
export default {

    async asyncData ({store}) {

      await store.dispatch("getPoslanciAll");

    },

    mounted() {


    },

    computed: {
      soubory() {
        return this.$store.state.media_soubory;
      },
      poslanci() {
        return this.$store.state.poslanci;
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
