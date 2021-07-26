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
              img(:src="rodina.featured_image.sizes.full.source_url")
          .column.row-in-text.is-half-desktop.typography-body-text
            .rodina-thumb-text(v-html="rodina.content")

    .section-padding-h-margin-v

      h2.typography-section-title Sociální mapa vztahů

      .social-mapping-network-container

        .person-social-network-container(v-for="poslanec in rodina.osoby" :key="poslanec.Id")

          svg.svg-layer

          .person-social-network-title.typography-section-title.smaller-bottom-margin sociální mapa pro: {{poslanec.CeleJmeno}}

          .person-category-section.primarny-vztahy-rodice-section(data-section-title="Rodiče" v-if="poslanec.OsobniVztahyPrimarni.map(item => item.Druh === 'otec' || item.Druh === 'matka' ).length > 0")

            .person-social-network-item(v-for="(osoba, index) in poslanec.OsobniVztahyPrimarni" v-if="osoba.Druh === 'otec' || osoba.Druh === 'matka' " :key="index")

              .content-container

                .header.typography-body-text
                  .category {{osoba.Druh}}

                .content.typography-alt-heading
                  .name <strong>{{osoba.Jmeno}}</strong>

              .image

          .person-category-section.person-poslanec-section(data-section-title="Poslanec")

            NuxtLink.person-social-network-item.person-social-network-item-poslanec(:to="`/poslanec/${poslanec.Id}`")

              .content-container

                .header.typography-body-text
                  .category
                    span(v-if="poslanec.Pohlavi === 1") poslanec
                    span(v-if="poslanec.Pohlavi === 2") poslankyně

                .content.typography-alt-heading
                  .name <strong>{{poslanec.CeleJmeno}}</strong>
                  .birth → <span>{{poslanec.DatumNarozeniZobrazene}}</span>
                  .death(v-if="poslanec.DatumUmrtiZobrazene") ← <span>{{poslanec.DatumUmrtiZobrazene}}</span>

              .image

            .person-social-network-item(v-for="(osoba, index) in poslanec.OsobniVztahyPrimarni" v-if="osoba.Druh === 'manžel' || osoba.Druh === 'manželka' " :key="index")

              .content-container

                .header.typography-body-text
                  .category {{osoba.Druh}}

                .content.typography-alt-heading
                  .name <strong>{{osoba.Jmeno}}</strong>

              .image



          .person-category-section.primarny-vztahy-section(data-section-title="Primární vztahy" v-if="poslanec.OsobniVztahyPrimarni")

            .person-social-network-item(v-for="(osoba, index) in poslanec.OsobniVztahyPrimarni" v-if="osoba.Druh !== 'otec' && osoba.Druh !== 'matka' && osoba.Druh !== 'manžel' && osoba.Druh !== 'manželka' " :key="index")

              .content-container

                .header.typography-body-text
                  .category {{osoba.Druh}}

                .content.typography-alt-heading
                  .name <strong>{{osoba.Jmeno}}</strong>

              .image

          .person-category-section.sekundarni-vztahy-section(data-section-title="Sekundární vztahy"  v-if="poslanec.OsobniVztahySekundarni.length > 0")

            .person-social-network-item(v-for="(osoba, index) in poslanec.OsobniVztahySekundarni" :key="index")

              .content-container

                .header.typography-body-text
                  .category {{osoba.Druh}}

                .content.typography-alt-heading
                  .name <strong>{{osoba.Jmeno}}</strong>

              .image


    .rodina-detail-events.section-padding-h-margin-v

      h2.typography-section-title Důležité události

      CasovaOsa(:Data="rodina.casova_osa" v-if="rodina.casova_osa")

    .parlament-detail-galerie-medii.section-padding.alt-bg

      h2.typography-section-title Galerie médií

      GalerieMediiSeznam(:Soubory="rodina.galerie" :MaButtonMore="false" :MaFilter="false")


</template>

<style lang="sass" scoped>
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/main"

  .svg-layer
    position: absolute
    top: 0
    left: 0
    pointer-events: none
    width: 100%
    height: 100%

  .person-category-section
    position: relative

    &:before
      @extend .typography-body-text

      position: absolute
      top: 0
      left: 0
      content: attr(data-section-title)
      font-size: 18px
      color: #B9B9B9



  .person-poslanec-section

    .person-social-network-item-poslanec
      position: relative
      z-index: 9

      background-color: #fefefe


  .person-social-network-container
    @extend .alt-bg
    padding: 40px
    margin-bottom: 4rem


  .person-category-section
    display: flex
    justify-content: center
    margin-bottom: 2rem


  .person-social-network-item
    width: 375px
    border-radius: 14px
    padding: 20px
    background-color: #EBEBEB
    text-decoration: none
    margin-right: $margin-until-desktop/2

    display: flex
    justify-content: space-between
    align-items: center

    .is-poslanec
      font-size: 12px
      font-style: italic

    .image
      border-radius: 100%
      width: 124px
      height: 124px
      background-color: lightgray

    .content-container
      display: flex
      flex-direction: column
      justify-content: space-between
      min-height: 157px

      .header
        line-height: 1.1

      .content
        font-size: 14px
        line-height: 1.1
        max-width: 200px



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
    async asyncData({params, error, payload, store, $axios}) {

      if (payload) {
        return {
          rodina: payload
        }
      } else {

        // :TODO: check if in store, it is cached, so that when we have results stored in the store, we just return the array of "stranka" items
        await store.dispatch("getRodinySocialniMapy");

        const databazePoslancuURL = 'https://parliament.ustrcr.cz';


        let rodina = {...store.state.rodiny_socialni_mapy.filter(rodina => rodina.slug === params.slug)[0]};

        rodina.osoby = await Promise.all(rodina.osoby_ids.map(async (osoba_id) => {

            let osoba = await $axios.get(`${databazePoslancuURL}/Api/osoby/${osoba_id}`);

            return osoba.data;

        }));



        return {
          rodina: rodina
        }


      }

    },

    mounted() {

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
