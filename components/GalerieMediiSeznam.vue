<template lang="pug">

    .galerie-medii-seznam

      <FilterSeznam v-if="MaFilter" :RaditZakladniPolozka="{id: '', value: '', text: 'řadit dle'}" :RaditDle="[{id: '', value: 'test-01', text: 'Test 01'}, {id: '', value: 'test-02', text: 'Test 02'}, {id: '', value: 'test-03', text: 'Test 03'}]" />

      .columns.is-multiline.is-mobile

        div.column.file-thumb(v-for="soubor in Soubory").is-one-fifth-desktop.is-one-third-tablet.is-half-mobile
          img.file-image(:src="soubor.URLNahled" alt="")
          .file-thumb-footer
            .file-title Popisek fotky
            .file-type
              <IconFileTypeImage />

      .component-footer(v-if="MaButtonMore")

        button.typo-form-button.button-large Zobrazit všechny pojmy

</template>

<style lang="sass" scoped>
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

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

      .file-thumb-footer
        display: flex
        justify-content: space-between


</style>

<script>
import IconFileTypeImage from "~/assets/images/icon-file-image.svg?inline";
import IconFileTypeVideo from "~/assets/images/icon-file-video.svg?inline";
import IconFileTypeDocument from "~/assets/images/icon-file-document.svg?inline";



export default {

  components: { IconFileTypeImage, IconFileTypeVideo, IconFileTypeDocument },

   props: ['Soubory', 'MaButtonMore', 'MaFilter'],
}
</script>
