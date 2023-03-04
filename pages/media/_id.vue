<template lang="pug">

  .section


    .section-padding-h-margin-v.typography-has-no-margin-top

      h1.typography-main-title(v-if="soubor.caption" v-html="soubor.caption")

      .image-item-detail.columns.is-multiline

        .image-container(v-if="getFullUrl(soubor)").column.is-four-fifths-desktop.is-two-thirds-tablet.is-full-mobile

          nuxt-picture.slider-image(
            format="jpg"
            quality="50"
            loading="lazy"
            :src="getFullUrl(soubor)"
            sizes="mobile:100vw tablet:100vw desktop:100vw widescreen::100vw fullhd:80vw"
          )

        .image-item-detail-content.is-one-fifth-desktop.column.is-one-third-tablet.is-full-mobile

          .file-thumb-footer
            .file-type
              // :TODO: #8 #7 Enable icons for more file types
              <IconFileTypeImage  />

          .desc(v-if="soubor.description") {{soubor.description}}

          .source(v-if="soubor.alt_text")
            p Zdroj:
            p {{soubor.alt_text}}


</template>

<style lang="sass" scoped>


.image-item-detail

  .image-container
    img
      width: 100%

.source
  margin-top: 1em
  word-break: break-word
</style>

<script>
import IconFileTypeImage from '~/assets/images/icon-file-image.svg?inline';
import IconFileTypeVideo from '~/assets/images/icon-file-video.svg?inline';
import IconFileTypeDocument from '~/assets/images/icon-file-document.svg?inline';

const MediaData = () => import('~/data/media.json').then((m) => m.default || m);

export default {
  components: { IconFileTypeImage, IconFileTypeVideo, IconFileTypeDocument },

  // :NOTE: {params, error, payload, store} is a deconstructed "context" variable
  async asyncData({ params, error, payload, store, $axios, $config }) {
    if (payload) {
      return {
        soubor: payload,
      };
    } else {
      if (!$config.useFileCachedAPI) {
        // :TODO: check if in store, it is cached, so that when we have results stored in the store, we just return the array of "stranka" items
        await store.dispatch('getMedia', { id: params.id });

        const storeItem = [...store.state.media_soubory].filter(
          (soubor) => soubor.id == params.id
        )[0];

        return {
          soubor: storeItem,
        };
      } else {
        const MediaRes = await MediaData();

        const filteredItem = MediaRes.filter((soubor) => soubor.id == params.id)[0];

        return {
          soubor: filteredItem,
        };
      }
    }
  },
  methods: {
    getFullUrl(imageObject) {
      return imageObject?.image?.full_url;
    },
  },
  mounted() { },

  data() {
    return {
      media: {},
    };
  },
  head() {
    return {
      title: `${this.soubor.caption} — ${this.$config.globalTitle}`,
      htmlAttrs: {
        class: 'alt-bg subpage-media',
      },
    };
  },
};
</script>
