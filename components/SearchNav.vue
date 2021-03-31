<template lang="pug">
  .search
    <SearchIcon />
    a(href="#").icon-text Vyhledávat
</template>


<style lang="sass" scoped>
.search
  .icon-text
    margin-left: 1rem

  svg path
    stroke: white
</style>


<script>
  import SearchIcon from "~/assets/images/icon-search.svg?inline";

  export default {
    components: { SearchIcon },
  };
</script>
