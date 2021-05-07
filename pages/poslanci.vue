<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    .section-padding-h-margin-v

      PoslanciSeznam(:Poslanci="poslanci" :PoslanciStatistiky="poslanciStatistiky" :MaPaginaci="true" :MaFiltr="true" :MaStatistiky="true" :MaButtonMore="true" :ButtonMoreLink="false")


</template>


<script>
export default {

    async fetch ({store}) {
      await store.dispatch("getPoslanciSeznam", {
        limit: 150,
        stranka: 1,
      });
    },

    computed: {
      poslanci() {
        return this.$store.state.poslanci;
      },
      poslanci_sezmam_razeni_default_id() {
        return this.$store.state.poslanci_seznam_razeni_id;
      },
      poslanciStatistiky() {

        return this.$store.state.poslanci_statistiky;
      }
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
          class: 'alt-bg'
        }
      }
    }

}
</script>


