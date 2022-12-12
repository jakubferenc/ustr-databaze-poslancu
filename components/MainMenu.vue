<template lang="pug">
nav.main-menu(role="navigation" aria-label="Primary")
  NuxtLink(@click.native="checkHideSearchNav" to="/")
    span Úvod
  span &nbsp;|
  NuxtLink(@click.native="checkHideSearchNav" to="/vyvoj-parlamentu/")
    span.full-text Vývoj parlamentarismu
    span.short-text Parlamentarismus
  span &nbsp;|
  NuxtLink.link-snemovny-mapy(@click.native="checkHideSearchNav" to="/snemovny-mapy/")
    span Mapy
  span &nbsp;|
  NuxtLink.link-poslanci(@click.native="checkHideSearchNav" to="/poslanci/")
    span Poslanci
  span &nbsp;|
  NuxtLink.link-parlamenty(@click.native="checkHideSearchNav" to="/parlamenty/")
    span.full-text Zastupitelské sbory
    span.short-text Sbory
  span &nbsp;|
  //- NuxtLink.link-socialni-mapy(@click.native="checkHideSearchNav" to="/socialni-mapy/") Sociální mapy
  //- span &nbsp;|
  NuxtLink.link-slovnik(@click.native="checkHideSearchNav" to="/slovnik/")
    span Slovník
  span &nbsp;|
  NuxtLink.link-galerie-medii(@click.native="checkHideSearchNav" to="/galerie-medii/")
    span Galerie
  span &nbsp;|
  NuxtLink(@click.native="checkHideSearchNav" to="/stranka/o-projektu/")
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
  methods: {
    checkHideSearchNav(e) {
      this.$store.dispatch("searchNavToggle", false);
    },
  },
};
</script>
