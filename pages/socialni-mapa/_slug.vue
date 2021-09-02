<template lang="pug">

  .page

    h1.typography-main-title
      span {{rodina.title}} <br>
      span ({{rodina.datum}}) <br>
      span.typography-item-detail-text.typography-alt-heading.rodina-thumb-count-people
        span {{rodina.pocet_osob}}&nbsp;
        span(v-if="rodina.pocet_osob === 1") poslanec
        span(v-if="rodina.pocet_osob > 1 && rodina.pocet_osob < 5") poslanci
        span(v-if="rodina.pocet_osob > 4") poslanců
        span &nbsp;v rodině

    .section-padding-h-margin-v.section-content-max-width


        .columns.rodina-thumb.typography-row-with-image.typography-centered-text-content

          .column.row-in-image.is-half-desktop
            .rodina-thumb-image.typography-image-thumb-larger
              //- img(:src="rodina.featured_image.sizes.full.source_url")
          .column.row-in-text.is-half-desktop.typography-body-text
            .rodina-thumb-text(v-html="rodina.content")

    .section-padding-h-margin-v

      h2.typography-section-title Sociální mapa vztahů

      .social-mapping-network-container

        // begin :social map component
        <SocialniMapa v-for="poslanec in rodina.osoby" :key="poslanec.Id" :Poslanec="poslanec" :hasNadpis="true" />


    .rodina-detail-events.section-padding-h-margin-v(v-if="rodina.casova_osa")

      h2.typography-section-title Důležité události

      CasovaOsa(:Data="rodina.casova_osa")

    .parlament-detail-galerie-medii.section-padding.alt-bg(v-if="rodina.galerie")

      h2.typography-section-title Galerie médií

      GalerieMediiSeznam(:Soubory="rodina.galerie" :MaButtonMore="false" :MaFilter="false")


</template>

<style lang="sass" scoped>
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/main"


  .columns.rodina-thumb.typography-row-with-image.typography-centered-text-content
    text-align: left


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

    // :NOTE: {params, error, payload, store} is a deconstructed "context" variable
    async asyncData({params, error, payload, store, $axios, $config}) {

      try {

        // check if the payload exists for the static generated page
        if (payload) {
          return {
            rodina: payload
          }
        } else {

          // :TODO: check if in store, it is cached, so that when we have results stored in the store, we just return the array of "stranka" items
          await store.dispatch("getRodinySocialniMapy");

          const rodina = store.state.rodiny_socialni_mapy.filter(rodina => rodina.slug === params.slug)[0];


          return {
            rodina: rodina
          }

        }



      } catch (err) {
        console.warn(err);
      }

    },

    mounted() {

      console.log(this.rodina);

      const lines = [];

      const $sections = this.$el.querySelectorAll('.person-social-network-container');

      $sections.forEach(($section) => {

        let lineIds = 0;

        const $thisSvgLayer = $section.querySelector('.svg-layer');

        const $poslanecInSection = $section.querySelector('.person-social-network-item-poslanec');

        const poslanecBoundingClientRect = $poslanecInSection.getBoundingClientRect();

        const $otherPersons = $section.querySelectorAll('.person-social-network-item:not(.person-social-network-item-poslanec)');

        $otherPersons.forEach( ($otherPerson) => {

            // find the center of the element

          //   lines.push(new LeaderLine(
          //     LeaderLine.pointAnchor($poslanecInSection, {x: '50%', y: '50%'}),
          //     LeaderLine.pointAnchor($otherPerson, {x: '50%', y: '50%'}),
          //     {color: 'black', size: 1, path: 'straight'}
          //   ));

          });

        });

    },

    data() {
      return {
        rodina: {}
      }
    },
    head () {
      return {
        title: `${this.rodina.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'subpage-socialni-mapa'
        },

      }
    }

}
</script>
