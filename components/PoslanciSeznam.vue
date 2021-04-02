<template lang="pug">

  .poslanci-seznam.section-padding-h-margin-v

    h2.typography-section-title(v-if="MaNadpis") Seznam poslanců

    .poslanci-seznam-bar(v-if="MaFilter")

      .poslanci-seznam-bar-left
        span.button.button-filter Otevřít filtr

      .poslanci-seznam.bar-right
        span přepínač seznam / seznam

        CustomSelect(:ZakladniPolozka="{id: '', value: '', text: 'řadit dle'}" :Polozky="[{id: '', value: 'test-01', text: 'Test 01'}, {id: '', value: 'test-02', text: 'Test 02'}, {id: '', value: 'test-03', text: 'Test 03'}]")

    .container-list.columns.is-multiline.is-mobile

      Poslanec(
        v-for="poslanec in Poslanci"
        v-bind:key="poslanec.Id"
        :Id="poslanec.Id"
        :Jmeno="poslanec.Jmeno"
        :Prijmeni="poslanec.Prijmeni"
        :ZivotniData="poslanec.ZivotniData"
        :DatumNarozeniZobrazene="poslanec.DatumNarozeniZobrazene"
        :DatumUmrtiZobrazene="poslanec.DatumUmrtiZobrazene"
        class="is-one-third-mobile is-one-third-tablet column is-2-fullhd is-2-widescreen is-one-quarter-desktop"
        )


</template>

<style lang="sass" scoped>
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .poslanci-seznam
    .container-list
      align-items: flex-start


  .poslanci-seznam-bar
    display: flex
    align-item: center
    justify-content: space-between
    margin-bottom: 40px

  .button-filter
    width: 340px

</style>

<script>
export default {
   props: ['Poslanci', 'MaNadpis', 'MaFilter', 'PolozekNaRadku'],
}
</script>
