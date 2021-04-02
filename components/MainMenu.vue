<template lang="pug">
  nav.main-menu(role="navigation" aria-label="Primary")
    NuxtLink(to="/") Hlavní stránka
    NuxtLink(to="/vyvoj-parlamentu") Vývoj parlamentu
    NuxtLink(to="/poslanci") Poslanci
    NuxtLink(to="/parlamenty") Parlamenty
    NuxtLink(to="/rodinne-klany") Rodinné klany
    NuxtLink(to="/slovnik") Slovník
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

</style>
