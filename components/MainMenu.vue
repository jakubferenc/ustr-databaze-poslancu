<template lang="pug">
nav.main-menu(role="navigation" aria-label="Primary")
  NuxtLink.link-index(to="/")
    span Úvod
  span &nbsp;|
  NuxtLink(to="/stranka/cesky-parlamentarismus/")
    span Parlamentarismus
  span &nbsp;|
  NuxtLink(to="/casova-osa/")
    span.full-text Časová osa
    span.short-text Časová osa
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
  //- NuxtLink.link-slovnik(to="/slovnik/")
  //-   span Slovník
  //- span &nbsp;|
  NuxtLink.link-galerie-medii(to="/galerie-medii/")
    span Galerie
  span &nbsp;|
  NuxtLink(to="/stranka/o-projektu/")
    span O projektu
</template>

<style lang="sass" scoped>
%active-link
  text-decoration: underline

html.page--parlament-detail .link-parlamenty
  @extend %active-link

.main-menu
  a
    margin-left: 15px
    text-decoration: none
    &:first-child
      margin-left: 0

  .nuxt-link-active:not(.link-index),
  .nuxt-link-exact-active
    @extend %active-link
    display: inline-flex

.full-text
  +until($fullhd)
    display: none
  +from($fullhd)
    display: block
.short-text
  +from($fullhd)
    display: none
  +until($fullhd)
    display: block
</style>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    checkHideSearchNav(e) {
      this.$store.dispatch('searchNavToggle', { searchNavToggle: false });
    },
  },
};
</script>
