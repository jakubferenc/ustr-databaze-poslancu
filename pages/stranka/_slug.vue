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

    async fetch ({store}) {
      await store.dispatch("getStranky");
    },

    computed: {
      stranka() {
        return this.$store.state.stranky.filter(stranka => stranka.slug === this.slug)[0];
      }
    },

    data() {
      return {
        slug: this.$route.params.slug,
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
