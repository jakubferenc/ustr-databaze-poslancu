<template template lang="pug">

.galerie-medii-seznam

  .columns.is-multiline.is-mobile

    div.column.file-thumb(v-for="soubor in Soubory").is-one-fifth-desktop.is-one-third-tablet.is-half-mobile
      NuxtLink.file-link(:to="`/media/${soubor.id}/`")

        .image-container
          template(v-if="soubor.image.thumb_url")
            nuxt-picture.slider-image(
              quality="50"
              format="jpg"
              loading="lazy"
              :src="soubor.image.thumb_url"
              :alt="soubor.caption"
              sizes="mobile:100vw tablet:100vw desktop:100vw widescreen::100vw fullhd:80vw"
            )

        .file-thumb-footer
          .file-title(v-html="soubor.caption")
          .file-type
            <IconFileTypeImage  />

  .component-footer(v-if="MaButtonMore")

    .buttons-more

      NuxtLink.typo-form-button.button-large(to="/galerie-medii/") Zobrazit celou galerii

</template>

<style lang="sass" scoped>

@use "sass:math"



.file-link
  text-decoration: none

.galerie-medii-seznam

  .columns
    justify-content: flex-start

    +until($tablet)

      margin-bottom: 15px

    +from($tablet)
      margin-bottom: 25px

    +from($desktop)
      margin-bottom: 50px


  .file-thumb

    +until($tablet)

      width: 100%

    +from($tablet)
      width: 33%

    +from($desktop)
      width: 20%

    +from($widescreen)

    +from($fullhd)


    .file-image
      width: 100%
      height: 206px
      object-fit: cover
      object-position: top


    .file-thumb-footer
      display: flex
      justify-content: space-between

      .file-title
        text-align: left

        +from($desktop)
          font-size: 14px

      .file-type
        margin-left: math.div($margin-until-desktop, 4)
</style>

<script>
import IconFileTypeImage from '~/assets/images/icon-file-image.svg?inline';
import IconFileTypeVideo from '~/assets/images/icon-file-video.svg?inline';
import IconFileTypeDocument from '~/assets/images/icon-file-document.svg?inline';

let i = 0;

export default {
  props: ['Soubory', 'MaButtonMore', 'MaFilter'],

  components: { IconFileTypeImage, IconFileTypeVideo, IconFileTypeDocument },

  mounted() { },
};
</script>
