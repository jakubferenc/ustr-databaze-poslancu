<template lang="pug">

  .keyword()
    .title {{ title }}
    .description(v-html="description")


</template>

<style lang="sass">
@import "~/assets/scss/bulma"
@import "~/assets/scss/typography"



.keyword
  text-align: center
  margin-bottom: 100px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  +until($desktop)
    margin-top: 50px
    margin-bottom: 50px

  +from($desktop)
    margin-top: 100px
    margin-bottom: 100px


  .title
    @extend .is-title
    font-size: 6.19791667
    line-height: 0.75

    font-size: 2.91666667vw * 2.5

    +from($tablet)
      font-size: 2.91666667vw * 2

    +from($desktop)
      font-size: 2.91666667vw * 1.5

    +from($fullhd)
      font-size: 52px

  .description
    font-size: 1rem
    font-family: Helvetica, Arial, sans-serif
    margin-top: 50px
    width: 75%

</style>

<script>
export default {
 props: ['title', 'description']
}
</script>
