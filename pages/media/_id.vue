<template lang="pug">

  .section

    h1.typography-main-title(v-html="soubor.caption.rendered")

    .section-padding-h-margin-v

      .image-item-detail.columns.is-multiline

        .image-container(v-if="soubor.media_details.sizes.full").column.is-four-fifths-desktop.is-two-thirds-tablet.is-full-mobile
          img.file-image(:src="soubor.media_details.sizes.full.source_url" alt="")

        .image-item-detail-content.is-one-fifth-desktop.column.is-one-third-tablet.is-full-mobile

          .file-thumb-footer
            .file-type
              <IconFileTypeImage  />

          .desc(v-html="soubor.description.rendered.replace(/<[^>]*>?/gm, '')")

          .source
            p Zdroj:
            p {{soubor.alt_text}}




</template>

<style lang="sass" scoped>
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .image-item-detail

    .image-container
      img
        width: 100%
    .image-item-detail-content

  .source
    margin-top: 1em

</style>

<script>
import IconFileTypeImage from "~/assets/images/icon-file-image.svg?inline";
import IconFileTypeVideo from "~/assets/images/icon-file-video.svg?inline";
import IconFileTypeDocument from "~/assets/images/icon-file-document.svg?inline";

export default {
     components: { IconFileTypeImage, IconFileTypeVideo, IconFileTypeDocument },

    // :NOTE: {params, error, payload, store} is a deconstructed "context" variable
    async asyncData({params, error, payload, store, $axios, $config}) {

      if (payload) {
        return {
          soubor: payload
        }
      } else {

        // :TODO: check if in store, it is cached, so that when we have results stored in the store, we just return the array of "stranka" items
        await store.dispatch("getMedia");

        let storeItems = [...store.state.media_soubory];

        storeItems = storeItems.filter(soubor => soubor.id == params.id)[0];

        return {
          soubor: storeItems
        }

      }

    },

    mounted() {

    },

    data() {
      return {
        media: {}
      }
    },
    head () {
      return {
        title: `DOPLNIT — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'alt-bg'
        },

      }
    }

}
</script>

