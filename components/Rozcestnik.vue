<template lang="pug">

.section.section-rozcestnik.section-padding-h-margin-v

  h2.section-title Rozcestník aplikace

  .columns.is-multiline.is-tablet

    .rozcestnik-item.is-full.is-one-quarter-tablet.column

      .rozcestnik-item-title Časová osa

      NuxtLink.rozcestnik-item-content(to="/vyvoj-parlamentu/")
        //- .rozcestnik-item-text.typography-body-text Zde bude text, který představí danou sekci webu. onsetetur sadipscing elitr, sed diam nonumy eirmod et dolore magna aliquyam erat, sed.
        .rozcestnik-item-image
          img(src="~/assets/images/risska-rada-01-thumb.jpg" alt="")

    .rozcestnik-item.is-full.is-one-quarter-tablet.column


      .rozcestnik-item-title Jak funguje parlament
      NuxtLink.rozcestnik-item-content(to="/stranka/vyvoj-parlamentarismu/")
        //- .rozcestnik-item-text.typography-body-text Zde bude text, který představí danou sekci webu. onsetetur sadipscing elitr, sed diam nonumy eirmod et dolore magna aliquyam erat, sed.
        .rozcestnik-item-image
          img(src="~/assets/images/risska-rada-02-thumb.jpg" alt="")

    .rozcestnik-item.is-full.is-one-quarter-tablet.column

      .rozcestnik-item-title Společenské vazby
      NuxtLink.rozcestnik-item-content(to="/socialni-mapy/")
        //- .rozcestnik-item-text.typography-body-text Zde bude text, který představí danou sekci webu. onsetetur sadipscing elitr, sed diam nonumy eirmod et dolore magna aliquyam erat, sed.
        .rozcestnik-item-image
          img(src="~/assets/images/risska-rada-01-thumb.jpg" alt="")


    .rozcestnik-item.is-full.is-one-quarter-tablet.column

      .rozcestnik-item-title Ženy v parlamentu
      NuxtLink.rozcestnik-item-content(to="/stranka/zeny-v-parlamentu/")
        //- .rozcestnik-item-text.typography-body-text Zde bude text, který představí danou sekci webu. onsetetur sadipscing elitr, sed diam nonumy eirmod et dolore magna aliquyam erat, sed.
        .rozcestnik-item-image
          img(src="~/assets/images/zeny-v-parlamentu-thumb.png" alt="")

</template>


<style lang="sass">

  .section-title
    @extend %typography-section-title

  .rozcestnik-item-title
    margin-bottom: .5em

  .section-padding-h-margin-v.columns
    @extend %section-padding-h-margin-v

  .typography-body-text
    @extend %typography-body-text

  a
    text-decoration: none

  .section-rozcestnik
    justify-content: space-between

    .rozcestnik-item

      +from($tablet)
        display: flex
        max-width: 528px
        flex-direction: column
        align-items: center

    // :TODO: #2 Uprav margin pro responzivitu
    .rozcestnik-item-text
      margin: 1rem 0
      +from($widescreen)
        margin: 30px 0


    .rozcestnik-item-content
      display: block
      width: 100%


    .rozcestnik-item-image
      height: 265px

      img
        width: 100%
        height: 100%
        object-fit: cover

</style>


<script>

</script>
