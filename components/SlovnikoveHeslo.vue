<template lang="pug">

  .keyword()
    .title /{{ title }}/
    .description(v-html="description")


</template>

<style lang="sass" scoped>
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
    margin-bottom: 50px

  +from($desktop)
    margin-bottom: 100px

  .title
    @extend .is-title
    line-height: 0.75

    font-size: 6.19791667vw

    +from($tablet)
      font-size: 6.19791667vw

    +from($desktop)
      font-size: 6.19791667vw

    +from($fullhd)
      font-size: 119px

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
