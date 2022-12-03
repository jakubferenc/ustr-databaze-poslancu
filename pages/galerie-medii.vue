<template lang="pug">

.section

  h1.typography-main-title {{title}}

  .section-padding-h-margin-v

    GalerieMediiSeznam(v-if="soubory" :Soubory="soubory" :MaButtonMore="false" :MaFilter="true")

</template>

<script>
const GalerieMediiSeznam = () => import("~/components/GalerieMediiSeznam.vue");

const MediaData = () => import("~/data/media.json").then((m) => m.default || m);

export default {
  components: { GalerieMediiSeznam },

  async asyncData({ params, error, payload, store, $config }) {
    try {
      if (!$config.useFileCachedAPI) {
        await store.dispatch("getMedia");

        return {
          soubory: [...store.state.media_soubory],
        };
      } else {
        const MediaRes = await MediaData();

        return {
          soubory: MediaRes,
        };
      }
    } catch (err) {
      console.warn(err);
    }
  },

  data() {
    return {
      title: `Galerie médií`,
      soubory: [],
    };
  },

  head() {
    return {
      title: `${this.title} — ${this.$config.globalTitle}`,
      htmlAttrs: {
        class: "alt-bg",
      },
    };
  },
};
</script>
