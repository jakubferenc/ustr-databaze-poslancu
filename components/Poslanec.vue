<template lang="pug">

  NuxtLink(class="poslanec-thumb" :to="`/poslanec/${Id}`")
    .poslanec-image

    .poslanec-metadata
      .poslanec-title {{ Jmeno }} {{ Prijmeni }}

      .poslanec-years(v-if="DatumNarozeniZobrazene && DatumUmrtiZobrazene") ({{DatumNarozeniZobrazene}} — {{DatumUmrtiZobrazene}})
      .mandaty(v-if="ZobrazitMandaty") {{ pocetMandatu }} mandátů
      .content {{ ZivotniData }}

</template>

<style lang="sass" scoped>
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .poslanec-thumb
    text-align: center
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    margin-bottom: 50px
    text-decoration: none

    .poslanec-image
      width: 155px
      height: 155px
      border-radius: 155px
      background-color: lightgray

    .poslanec-metadata
      margin-top: 20px

    .poslanec-title
      @extend .typography-poslanec-thumb-title

</style>

<script>
export default {
   props: ['Id', 'Jmeno', 'Prijmeni', 'ZivotniData', 'DatumNarozeniZobrazene', 'DatumUmrtiZobrazene', 'Mandaty', 'ZobrazitMandaty'],
   computed: {
     pocetMandatu() {
       return this.Mandaty.length;
     }
   }
}
</script>
