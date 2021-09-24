<template lang="pug">

  .page

    h1.typography-main-title {{title}}

    .section-padding-h-margin-v.section-content-max-width

      .main-perex.typography-body-text Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

      .columns.rodina-thumb.typography-row-with-image.typography-centered-text-content(v-for="(rodina, index) in rodiny" :key="rodina.id" :index="index" :class="{'rodina-thumb-reverse': (index % 2 === 0 || index === 0) ? false : true}")

        .column.row-in-image.is-half-desktop
          .rodina-thumb-image.typography-image-thumb-larger
            img(:src="rodina.featured_image.sizes.full.source_url")
        .column.row-in-text.is-half-desktop
          .rodina-thumb-text.typography-body-text
            .typography-section-title.smaller-bottom-margin {{rodina.title}} <br> ({{rodina.datum}})
            .typography-item-detail-text.typography-alt-heading.rodina-thumb-count-people
              span {{rodina.pocet_osob}}&nbsp;
              span(v-if="rodina.pocet_osob === 1") poslanec
              span(v-if="rodina.pocet_osob > 1 && rodina.pocet_osob < 5") poslanci
              span(v-if="rodina.pocet_osob > 4") poslanců
              span &nbsp;v rodině
            div(v-html="rodina.excerpt")
            .button-container
                NuxtLink.button.button-large(:to="`/socialni-mapa/${rodina.slug}`") Zobrazit detail rodiny



</template>


<style lang="sass" scoped>
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/main"

  .main-perex
    margin-top: -3em
    margin-bottom: 5em
    margin-left: auto
    margin-right: auto

    +from($desktop)
      width: 66%

  .button-container

    display: flex
    justify-content: center
    margin-top: 2rem

    .button.button-large

      +from($desktop)
        width: 190px

  .columns.rodina-thumb

    margin-bottom: 5rem

    +from($desktop)
      margin-bottom: 10rem


    &.rodina-thumb-reverse
      flex-direction: row-reverse

  .rodina-thumb-count-people

    text-transform: uppercase;
    margin-bottom: 2rem


  .rodina-thumb-text
    +from($desktop)
      max-width: 589px

  .rodina-thumb-image

    +from($desktop)
      max-width: 722px
      height: 485px
      background-color: lightgray

    img
      width: 100%
      height: 100%
      object-fit: cover



</style>

<script>
export default {


    async asyncData({params, error, payload, store, $config}) {


      try {

        await store.dispatch("getRodinySocialniMapy", {$config});

        return {
          rodiny: store.state.rodiny_socialni_mapy
        }

      } catch (err) {
        console.warn(err);
      }

    },


    data() {
      return {
        rodiny: [],
        title: `Vybrané rodinné sociální mapy`,
        htmlClass: ['alt-bg']
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: this.htmlClassComputed
        }
      }
    }

}
</script>
