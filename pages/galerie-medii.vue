<template lang="pug">

  .section

    h1.typography-main-title {{title}}

    .section-padding-h-margin-v

      GalerieMediiSeznam(:Soubory="soubory" :MaButtonMore="false" :MaFilter="true")

</template>


<script>
export default {

    async fetch ({store}) {
      await store.dispatch("getMedia");
    },

    mounted() {

      console.log("from mounted", this.soubory);

    },

    computed: {
      soubory() {
        return this.$store.state.media_soubory;
      },
    },

    data() {
      return {
        title: `Galerie médií`,
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
