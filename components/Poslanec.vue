<template lang="pug">

  NuxtLink.poslanec-thumb(:to="`/poslanec/${Id}/`")
    .poslanec-image

      img(v-if="profilovaFotka" :src="profilovaFotka" )


    .poslanec-metadata
      .poslanec-title {{ Jmeno }} {{ Prijmeni }}

      .poslanec-years(v-if="DatumNarozeniZobrazene || DatumUmrtiZobrazene")
        span(v-if="DatumNarozeniZobrazene") ({{DatumNarozeniZobrazene}}&nbsp;&mdash;
        span(v-else) (?&nbsp;&mdash;
        span(v-if="DatumUmrtiZobrazene") &nbsp;{{DatumUmrtiZobrazene}})
        span(v-else) &nbsp;?)
      .mandaty(v-if="ZobrazitMandaty")
        span {{ pocetMandatu }}&nbsp;
        span(v-show="pocetMandatu > 4") mandátů
        span(v-show="pocetMandatu > 1 && pocetMandatu < 5") mandáty
        span(v-show="pocetMandatu === 1") mandát
      .content {{ VekBehemSnemovny }}

</template>

<style lang="sass" scoped>



.poslanec-thumb
  text-align: center
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  margin-bottom: 50px
  text-decoration: none

  .poslanec-title
    line-height: 1.2
  .poslanec-years
    font-size: 12px

  .poslanec-image
    width: 155px
    height: 155px
    border-radius: 155px
    background-color: lightgray
    overflow: hidden
    text-align: center
    display: flex
    align-items: center
    justify-content: center

    img
      width: 100%
      height: 100%
      object-fit: cover
      object-position: top


  .poslanec-metadata
    margin-top: 20px

  .poslanec-title
    @extend %typography-poslanec-thumb-title
</style>

<script>
export default {
  props: [
    'Id',
    'Jmeno',
    'Prijmeni',
    'ZivotniData',
    'DatumNarozeniZobrazene',
    'DatumUmrtiZobrazene',
    'Mandaty',
    'ZobrazitMandaty',
    'VekBehemSnemovny',
    'Soubory',
  ],
  computed: {

    profilovaFotka() {

      if (this.Soubory && this.Soubory.length && this.Soubory.length > 0) {

        return this.Soubory[0].URLNahled;

      }

    },

    pocetMandatu() {
      return this.Mandaty.length;
    },
  },
};
</script>
