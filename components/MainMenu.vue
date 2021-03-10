<template lang="pug">
  nav
    <NuxtLink to="/">Hlavní stránka</NuxtLink>
    <NuxtLink to="/vyvoj-parlamentu">Vývoj parlamentu</NuxtLink>
    <NuxtLink to="/poslanci">Poslanci</NuxtLink>
    <NuxtLink to="/parlamenty">Parlamenty</NuxtLink>
    <NuxtLink to="/rodinne-klany">Rodinné klany</NuxtLink>
    <NuxtLink to="/slovnik">Slovník</NuxtLink>
    <NuxtLink to="/galerie-medii">Galerie médií</NuxtLink>
</template>


<style lang="sass" scoped>
  nav a
    margin-left: 15px
    &:first-child
      margin-left: 0
    font-size: 15px


  .nuxt-link-exact-active
    text-decoration: underline

</style>
