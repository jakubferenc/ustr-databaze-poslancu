<template lang="pug">
  nav
    NuxtLink(to="/") Hlavní stránka
    NuxtLink(to="/vyvoj-parlamentu") Vývoj parlamentu
    NuxtLink(to="/poslanci") Poslanci
    NuxtLink(to="/parlamenty") Parlamenty
    NuxtLink(to="/rodinne-klany") Rodinné klany
    NuxtLink(to="/slovnik") Slovník
    NuxtLink(to="/galerie-medii") Galerie médií
</template>


<style lang="sass" scoped>
  nav a
    margin-left: 15px
    &:first-child
      margin-left: 0


  .nuxt-link-exact-active
    text-decoration: underline

</style>
