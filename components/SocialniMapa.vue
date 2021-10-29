<template lang="pug">

  .person-social-network-container

    svg.svg-layer

    .person-social-network-title.typography-section-title.smaller-bottom-margin(v-if="MaNadpis") sociální mapa pro: {{Poslanec.CeleJmeno}}

    .person-category-section.primarny-vztahy-rodice-section(data-section-title="Rodiče" v-if="Poslanec.OsobniVztahyPrimarni.map(item => item.Druh === 'otec' || item.Druh === 'matka' ).length > 0")

      .person-social-network-item(v-for="(osoba, index) in Poslanec.OsobniVztahyPrimarni" v-if="osoba.Druh === 'otec' || osoba.Druh === 'matka' " :key="index")

        .content-container

          .header.typography-body-text.typography-karta-nadpis
            .category {{osoba.Druh}}

          .content.typography-alt-heading
            .name <strong>{{osoba.Jmeno}}</strong>

        .image

    .person-category-section.person-poslanec-section(data-section-title="Poslanec")

      NuxtLink.person-social-network-item.person-social-network-item-poslanec(:to="`/poslanec/${Poslanec.Id}/`")

        .content-container

          .header.typography-body-text.typography-karta-nadpis
            .category
              span(v-if="Poslanec.Pohlavi === 1") poslanec
              span(v-if="Poslanec.Pohlavi === 2") poslankyně

          .content.typography-alt-heading
            .name <strong>{{Poslanec.CeleJmeno}}</strong>
            .birth → <span>{{Poslanec.DatumNarozeniZobrazene}}</span>
            .death(v-if="Poslanec.DatumUmrtiZobrazene") ← <span>{{Poslanec.DatumUmrtiZobrazene}}</span>

        .image

      .person-social-network-item(v-for="(osoba, index) in Poslanec.OsobniVztahyPrimarni" v-if="osoba.Druh === 'manžel' || osoba.Druh === 'manželka' " :key="index")

        .content-container

          .header.typography-body-text.typography-karta-nadpis
            .category {{osoba.Druh}}

          .content.typography-alt-heading
            .name <strong>{{osoba.Jmeno}}</strong>

        .image



    .person-category-section.primarny-vztahy-section(data-section-title="Primární vztahy" v-if="Poslanec.OsobniVztahyPrimarni.length > 0 && hasPrimaryRelationsDifferentThanImmediateFamily(Poslanec)")

      .person-social-network-item(v-for="(osoba, index) in Poslanec.OsobniVztahyPrimarni" v-if="osoba.Druh !== 'otec' && osoba.Druh !== 'matka' && osoba.Druh !== 'manžel' && osoba.Druh !== 'manželka' " :key="index")

        .content-container

          .header.typography-body-text.typography-karta-nadpis
            .category {{osoba.Druh}}

          .content.typography-alt-heading
            .name <strong>{{osoba.Jmeno}}</strong>

        .image

    .person-category-section.sekundarni-vztahy-section(data-section-title="Sekundární vztahy"  v-if="Poslanec.OsobniVztahySekundarni.length > 0")

      .person-social-network-item(v-for="(osoba, index) in Poslanec.OsobniVztahySekundarni" :key="index")

        .content-container

          .header.typography-body-text.typography-karta-nadpis
            .category {{osoba.Druh}}

          .content.typography-alt-heading
            .name <strong>{{osoba.Jmeno}}</strong>

        .image


</template>


<style lang="sass">
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"


  .person-social-network-container
    @extend .alt-bg
    padding: 40px
    margin-bottom: 4rem

    .svg-layer
      position: absolute
      top: 0
      left: 0
      pointer-events: none
      width: 100%
      height: 100%


    .person-category-section
      position: relative
      display: flex
      justify-content: center
      margin-bottom: 2rem

      &:before
        @extend .typography-body-text

        position: absolute
        top: 0
        left: 0
        content: attr(data-section-title)
        font-size: 18px
        color: #B9B9B9


</style>

<script>

export default {

  props: ['Poslanec', 'MaNadpis'],

  components: {},

  methods: {

    hasPrimaryRelationsDifferentThanImmediateFamily(poslanec) {

      let hasDifferent = false;

      if (Array.isArray(poslanec.OsobniVztahyPrimarni)) {

        let osobniVztahyPrimarni = [...poslanec.OsobniVztahyPrimarni];

        osobniVztahyPrimarni = osobniVztahyPrimarni.filter(osoba => osoba.Druh !== 'otec' && osoba.Druh !== 'matka' && osoba.Druh !== 'manžel' && osoba.Druh !== 'manželka');

        if ( osobniVztahyPrimarni.length > 0 ) {
          hasDifferent = true;
        }

      } else {

        hasDifferent = false;

      }

      return hasDifferent;


    }

  },

  mounted() {

  },
   data() {
      return {

      }
    },

}
</script>
