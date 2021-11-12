<template lang="pug">

  .section

    h1.typography-main-title {{title}}

    .section-padding-h-margin-v

      GalerieMediiSeznam(v-if="soubory" :Soubory="soubory" :MaButtonMore="false" :MaFilter="true")

</template>


<script>
export default {

    async fetch ({store}) {
      await store.dispatch("getMedia");
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
