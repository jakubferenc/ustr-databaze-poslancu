<template lang="pug">

  .snemovny-seznam.section-padding.alt-bg

    h2.typography-section-title() Parlamentní tělesa

    .container-list.columns.is-multiline

      ParlamentNahled(
        v-for="parlament in parlamenty"
        :key="parlament.Id"
        :Nazev="parlament.Nazev"
        class="is-one-third-desktop is-half-tablet column")



</template>

<style lang="sass" scoped>
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .snemovny-seznam



</style>

<script>
export default {
    created() {
      this.$store.dispatch("getParlamenty");
    },
    computed: {
      parlamenty() {
        return this.$store.state.parlamenty;
      },
    },
   props: [],
}
</script>
