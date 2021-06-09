<template lang="pug">
  nav.main-menu(role="navigation" aria-label="Primary")
    NuxtLink(to="/") Hlavní stránka
    span &nbsp;|
    NuxtLink(to="/vyvoj-parlamentu") Vývoj parlamentarismu
    span &nbsp;|
    NuxtLink(to="/poslanci") Poslanci
    span &nbsp;|
    NuxtLink.link-parlamenty(to="/parlamenty") Parlamenty
    span &nbsp;|
    NuxtLink(to="/rodinne-vazby") Sociální mapy
    span &nbsp;|
    NuxtLink(to="/slovnik") Slovník
    span &nbsp;|
    NuxtLink(to="/galerie-medii") Galerie médií
</template>


<style lang="sass" scoped>
  .main-menu
    a
      margin-left: 15px
      text-decoration: none
      &:first-child
        margin-left: 0

    .nuxt-link-exact-active
      text-decoration: underline

  html.subpage-parlament .link-parlamenty
    @extend .nuxt-link-exact-active

</style>

<script>
export default {

    data() {
      return {

      }
    },

}
</script>
