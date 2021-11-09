<template lang="pug">

  .snemovny-seznam.section-padding.alt-bg

    h2.typography-section-title() Parlamentní tělesa

    .container-list.columns.is-multiline

      ParlamentNahled(
        v-for="parlament in Parlamenty"
        :key="parlament.Id"
        :Nazev="parlament.Nazev"
        class="is-one-third-desktop is-half-tablet column")



</template>

<style lang="sass" scoped>


  .snemovny-seznam



</style>

<script>
export default {

   props: ['Parlamenty'],
}
</script>
