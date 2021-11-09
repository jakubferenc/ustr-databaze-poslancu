<template lang="pug">
  nav.main-menu(role="navigation" aria-label="Primary")
    NuxtLink(to="/") Úvod
    span &nbsp;|
    NuxtLink(to="/vyvoj-parlamentu/") Vývoj parlamentarismu
    span &nbsp;|
    NuxtLink.link-poslanci(to="/poslanci/") Poslanci
    span &nbsp;|
    NuxtLink.link-parlamenty(to="/parlamenty/") Parlamenty
    span &nbsp;|
    NuxtLink.link-socialni-mapy(to="/socialni-mapy/") Sociální mapy
    span &nbsp;|
    NuxtLink.link-slovnik(to="/slovnik/") Slovník
    span &nbsp;|
    NuxtLink.link-galerie-medii(to="/galerie-medii/") Galerie
    span &nbsp;|
    NuxtLink(to="/stranka/o-projektu/") O projektu
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

  html.subpage-socialni-mapa .link-socialni-mapy
    @extend .nuxt-link-exact-active

  html.subpage-poslanci .link-poslanci
    @extend .nuxt-link-exact-active

  html.subpage-media .link-galerie-medii
    @extend .nuxt-link-exact-active

  html.subpage-slovnik .link-slovnik
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
