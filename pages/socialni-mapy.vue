<template lang="pug">

  .page

    h1.typography-main-title {{title}}

    .section-padding-h-margin-v

      .rodina-thumb.typography-row-with-image

        .row-in-image.featured-image()
          img(src="")
        .row-in-text.excerpt-text.typography-item-detail-text
          p



</template>


<style lang="sass" scoped>
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"



</style>

<script>
export default {


    async fetch ({store}) {

      //await store.dispatch("getSocialniMapy");

    },

    data() {
      return {
        title: `Vybrané rodinné sociální mapy`,
        htmlClass: ['alt-bg']
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: this.htmlClassComputed
        }
      }
    }

}
</script>
