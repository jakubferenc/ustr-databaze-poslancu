<template lang="pug">

  .section

    h1.typography-main-title {{title}}

    .section-padding-h-margin-v

      GalerieMediiSeznam(v-if="soubory" :Soubory="soubory" :MaButtonMore="false" :MaFilter="true")

</template>


<script>
const GalerieMediiSeznam = () => import('~/components/GalerieMediiSeznam.vue');

import MediaData from '~/data/media.json';

export default {

    components: { GalerieMediiSeznam },


    async fetch ({store, $config}) {

      if (!$config.useFileCachedAPI) {
        await store.dispatch("getMedia");
      }

    },
    computed: {
      soubory() {

        let media;

        if (this.$config.useFileCachedAPI) {
          media = MediaData;
        } else {
          media = [...this.$store.state.media_soubory];
        }

        return media;
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
