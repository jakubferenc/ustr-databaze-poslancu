<template lang="pug">

  .rozcestnik.section-padding-h-margin-v.columns.is-multiline.is-tablet

    .rozcestnik-item.is-full.is-one-quarter-tablet.column

      .rozcestnik-item-title Časová osa
      .rozcestnik-item-text.typography-body-text Zde bude text, který představí danou sekci webu. onsetetur sadipscing elitr, sed diam nonumy eirmod et dolore magna aliquyam erat, sed.
      .rozcestnik-item-image
        img(src="~/assets/images/risska-rada-01-thumb.jpg" alt="")

    .rozcestnik-item.is-full.is-one-quarter-tablet.column

      .rozcestnik-item-title Jak funguje parlament
      .rozcestnik-item-text.typography-body-text Zde bude text, který představí danou sekci webu. onsetetur sadipscing elitr, sed diam nonumy eirmod et dolore magna aliquyam erat, sed.
      .rozcestnik-item-image
        img(src="~/assets/images/risska-rada-02-thumb.jpg" alt="")

    .rozcestnik-item.is-full.is-one-quarter-tablet.column

      .rozcestnik-item-title Společenské vazby
      .rozcestnik-item-text.typography-body-text Zde bude text, který představí danou sekci webu. onsetetur sadipscing elitr, sed diam nonumy eirmod et dolore magna aliquyam erat, sed.
      .rozcestnik-item-image
        img(src="~/assets/images/risska-rada-01-thumb.jpg" alt="")


    .rozcestnik-item.is-full.is-one-quarter-tablet.column

      .rozcestnik-item-title Ženy v parlamentu
      .rozcestnik-item-text.typography-body-text Zde bude text, který představí danou sekci webu. onsetetur sadipscing elitr, sed diam nonumy eirmod et dolore magna aliquyam erat, sed.
      .rozcestnik-item-image
        img(src="~/assets/images/zeny-v-parlamentu-thumb.jpg" alt="")

</template>


<style lang="sass">
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .rozcestnik
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

</style>


<script>

</script>
