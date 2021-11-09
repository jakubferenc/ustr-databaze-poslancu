<template lang="pug">
  a.search(href="#" role="search")
    <SearchIconImage />
    .icon-text Vyhledávat
</template>


<style lang="sass" scoped>

.search
  display: flex
  align-items: center

  text-decoration: none

  .icon-text
    margin-left: 1rem

    +until($fullhd)
      display: none

  svg path
    stroke: #000

html.has-slider svg path
  stroke: #fff

</style>


<script>
  import SearchIconImage from "~/assets/images/icon-search.svg?inline";

  export default {
    components: { SearchIconImage },
  };
</script>
