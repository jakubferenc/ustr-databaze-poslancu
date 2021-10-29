<template lang="pug">

    .section-content-max-width.section-padding-h-margin-v.section-stranka

      h1.typography-main-title {{slovnikove_heslo.title.rendered}}

      .excerpt-container.typography-row-with-image(:class="excerptKontejnerStyly")

        .row-in-image.featured-image(v-if="slovnikove_heslo.featured_image")
          img(:src="slovnikove_heslo.featured_image.image.full_url")

        .row-in-text.real-content-container.real-content-text
          .typography-item-detail-text(v-html="slovnikove_heslo.content.rendered")




</template>

<style lang="sass">

  .real-content-text

  .section-stranka
    .typography-main-title
      margin-top: 0
      padding-top: 0

  .typography-row-with-image:not(.has-featured-image)
    display: flex
    align-items: center
    justify-content: center

</style>
<script>

export default {

    // :NOTE: {params, error, payload, store} is a deconstructed "context" object
    async asyncData({params, error, payload, store}) {

      if (payload) {
        return {
          slovnikove_heslo: payload
        }
      } else {

        // :TODO: check if in store, it is cached, so that when we have results stored in the store, we just return the array of "stranka" items
        await store.dispatch("getSlovnikovaHesla");

        const slovnikove_heslo = store.state.slovnikova_hesla.filter(item => item.slug === params.slug)[0];

        return {
          slovnikove_heslo,
        }

      }

    },

    computed: {

        excerptKontejnerStyly() {

          return {
            'has-featured-image': this.slovnikove_heslo.featured_image,
          }

        },

    },

    mounted() {

    },

    data() {
      return {

      }
    },
    head () {
      return {
        title: `${this.slovnikove_heslo.slug} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'page genericka-stranka'
        }
      }
    }

}
</script>
