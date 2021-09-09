<template lang="pug">

    .section-content-max-width.section-padding-h-margin-v.section-stranka

      h1.typography-main-title {{stranka.title}}

      .excerpt-container.typography-row-with-image(:class="excerptKontejnerStyly")

        .row-in-image.featured-image(v-if="stranka.featured_image")
          img(:src="stranka.featured_image.sizes.full.source_url")

      .real-content-container.real-content-text
        .typography-item-detail-text(v-html="stranka.content")


</template>

<style lang="sass">

  .section-stranka
    .typography-main-title
      margin-top: 0
      padding-top: 0

</style>
<script>

export default {

    // :NOTE: {params, error, payload, store} is a deconstructed "context" object
    async asyncData({params, error, payload, store}) {

      if (payload) {
        return {
          stranka: payload
        }
      } else {

        // :TODO: check if in store, it is cached, so that when we have results stored in the store, we just return the array of "stranka" items
        await store.dispatch("getStranky");

        return {
          stranka: store.state.stranky.filter(stranka => stranka.slug === params.slug)[0]
        }

      }

    },

    mounted() {
    },

    data() {
      return {
        excerptKontejnerStyly: {
          'has-featured-image': true,
        }
      }
    },
    head () {
      return {
        title: `${this.stranka.slug} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'page genericka-stranka'
        }
      }
    }

}
</script>
