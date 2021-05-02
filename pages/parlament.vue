<template lang="pug">

  .parlament-detail

    h1(style="margin-bottom: 500px") hahah

    .parlament-detail-Header

    .parlament-detail-map

    .parlament-detail-about

    .parlament-detail-events


    .parlament-detail-poslanci

    .parlament-detail-galerie-medii

    .parlament-detail-metadata-table



</template>


<script>
export default {

    created() {
    },

    data() {
      return {
        title: `TEST název parlamentní těleso`,
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'alt-bg-02'
        }
      }
    }

}
</script>
