<template lang="pug">

  .parlament()
    .title {{ Nazev }}


</template>

<style lang="sass">
  .parlament
    text-align: center
    border: 1px solid black
    margin-bottom: 1rem
</style>

<script>
export default {
 props: ['Nazev', 'Id']
}
</script>
