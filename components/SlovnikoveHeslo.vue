<template lang="pug">

  .keyword(:class="{'in-slider': this.InSlider}")
    NuxtLink.keyword-title(:to="`/slovnikove-heslo/${Slug}/`") /{{ Title }}/
    .description(v-html="Excerpt")


</template>

<style lang="sass">


.keyword
  text-align: center
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  &:not(.in-slider)

    +until($desktop)
      margin-bottom: 50px

    +from($desktop)
      margin-bottom: 100px

  .keyword-title
    @extend %typography-main-title
    margin-bottom: 0
    padding-top: 0
    line-height: 1
    text-decoration: none

  .description
    font-size: 1rem
    font-family: Helvetica, Arial, sans-serif
    margin-top: 50px
    width: 75%

</style>

<script>
export default {
 props: ['Title', 'Slug', 'Excerpt', 'Description', 'InSlider']
}
</script>
