<template lang="pug">

  .section


    .section-padding-h-margin-v.typography-has-no-margin-top

      h1.typography-main-title(v-if="soubor.caption" v-html="soubor.caption")

      .image-item-detail.columns.is-multiline

        .image-container(v-if="soubor.image.full_url").column.is-four-fifths-desktop.is-two-thirds-tablet.is-full-mobile

          nuxt-picture.slider-image(
            format="webp"
            quality="50"
            loading="lazy"
            :src="soubor.image.full_url"
            sizes="mobile:100vw tablet:100vw desktop:100vw widescreen::100vw fullhd:80vw"
          )

        .image-item-detail-content.is-one-fifth-desktop.column.is-one-third-tablet.is-full-mobile

          .file-thumb-footer
            .file-type
              // :TODO: #8 #7 Enable icons for more file types
              <IconFileTypeImage  />

          .desc(v-if="soubor.description" v-html="soubor.description.rendered.replace(/<[^>]*>?/gm, '')")

          .source
            p Zdroj:
            p {{soubor.alt_text}}


</template>

<style lang="sass" scoped>


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
        await store.dispatch("getMedia", {id: params.id});

        const storeItem = [...store.state.media_soubory].filter(soubor => soubor.id == params.id)[0];


        return {
          soubor: storeItem
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
          class: 'alt-bg subpage-media'
        },
      }
    }

}
</script>

