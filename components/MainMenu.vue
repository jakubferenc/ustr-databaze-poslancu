<template lang="pug">
  nav.main-menu(role="navigation" aria-label="Primary")
    NuxtLink(to="/")
      span Úvod
    span &nbsp;|
    NuxtLink(to="/vyvoj-parlamentu/")
      span.full-text Vývoj parlamentarismu
      span.short-text Parlamentarismus
    span &nbsp;|
    NuxtLink.link-snemovny-mapy(to="/snemovny-mapy/")
      span Mapy
    span &nbsp;|
    NuxtLink.link-poslanci(to="/poslanci/")
      span Poslanci
    span &nbsp;|
    NuxtLink.link-parlamenty(to="/parlamenty/")
      span.full-text Zastupitelské sbory
      span.short-text Sbory
    span &nbsp;|
    //- NuxtLink.link-socialni-mapy(to="/socialni-mapy/") Sociální mapy
    //- span &nbsp;|
    NuxtLink.link-slovnik(to="/slovnik/")
      span Slovník
    span &nbsp;|
    NuxtLink.link-galerie-medii(to="/galerie-medii/")
      span Galerie
    span &nbsp;|
    NuxtLink(to="/stranka/o-projektu/")
      span O projektu
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

.full-text
  +until($fullhd)
    display: none
  +from($fullhd)
    display: inline-block
.short-text
  +from($fullhd)
    display: none
  +until($fullhd)
    display: inline-block
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
    return {};
  },
};
</script>
