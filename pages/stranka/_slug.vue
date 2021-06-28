<template lang="pug">

    .section-content-max-width.section-padding-h-margin-v

      h1.typography-main-title {{stranka.title}}

      .excerpt-container.typography-row-with-image(:class="excerptKontejnerStyly")

        .row-in-image.featured-image()
          img(:src="stranka.featured_image.sizes.large.source_url")
        .row-in-text.excerpt-text.typography-item-detail-text
          p
            i(v-html="stranka.excerpt")

      .real-content-container.real-content-text
        .typography-item-detail-text(v-html="stranka.content")


</template>

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

    data() {
      return {
        excerptKontejnerStyly: {
          'has-featured-image': true,
        }
      }
    },
    head () {
      return {
        title: `${this.slug} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'page genericka-stranka'
        }
      }
    }

}
</script>
