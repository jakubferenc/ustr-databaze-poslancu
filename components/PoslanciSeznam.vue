<template lang="pug">

  .poslanci-seznam.seznam-with-filter

    FilterSeznam(
      :Komponenta="'Poslanec'"
      :Polozky="Poslanci"
      :PoslanciStatistiky="PoslanciStatistiky"
      :MaFiltr="MaFiltr"
      :MaStatistiky="MaStatistiky"
      :MaButtonMore="MaButtonMore"
      :ButtonMoreLink="ButtonMoreLink"
      :MaPaginaci="MaPaginaci"
      :RaditZakladniPolozka="RaditZakladniPolozkaNastaveni"
      :RaditDle="RaditDleNastaveni")

</template>

<style lang="sass" scoped>

</style>

<script>
export default {
  props: ["PoslanciStatistiky", "Poslanci", "MaFiltr", "MaButtonMore", "ButtonMoreLink", "MaPaginaci", "MaStatistiky"],

  data() {
    return {
      RaditZakladniPolozkaNastaveni: { id: 'radit-default', text: 'řadit dle' },
      RaditDleNastaveni: [
        { id: 'radit-id', text: 'Základní řazení' },
        { id: 'radit-prijmeni', text: 'Podle příjmení' },
        { id: 'radit-prijmeni-sestupne', text: 'Podle příjmení (sestupně)' },
        { id: 'radit-pocet-mandatu', text: 'Podle počtu mandátů' },
        { id: 'radit-pocet-mandatu-sestupne', text: 'Podle počtu mandátů (sestupně)' },
        { id: 'radit-datum-narozeni', text: 'Podle data narození' },
        { id: 'radit-datum-narozeni-sestupne', text: 'Podle data narození (sestupně)' },

      ],
    };
  },
};
</script>
