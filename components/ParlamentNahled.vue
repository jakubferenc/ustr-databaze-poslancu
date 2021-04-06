<template lang="pug">

  .parlament-nahled()
    .parlament-nahled-image
      <ParlamentNahledObecnyImage />
    .parlament-nahled-title {{ Nazev }}


</template>

<style lang="sass">
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .parlament-nahled
    text-align: center

    +until($tablet)
      margin-top: 75px
      &:nth-child(1)
        margin-top: 0

    +from($tablet)
      margin-top: 100px
      &:nth-child(1),
      &:nth-child(2)
        margin-top: 0

    +from($desktop)
      margin-top: 150px

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3)
        margin-top: 0

    +from($widescreen)

    +from($fullhd)

    .parlament-nahled-image svg
      width: 100%

    .parlament-nahled-title
      margin-top: 50px

</style>

<script>
  import ParlamentNahledObecnyImage from "~/assets/images/icon-parlamentni-teleso.svg?inline";

  export default {
  components: { ParlamentNahledObecnyImage },
  props: ['Nazev', 'Id']
  }
</script>
