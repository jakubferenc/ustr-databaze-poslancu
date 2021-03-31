<template lang="pug">

  .poslanec()
    .id {{ Id }}
    .title {{ KrestniJmeno }} {{ Prijmeni }}
    .content {{ ZivotniData }}


</template>

<style lang="sass">
  .poslanec
    text-align: center
</style>

<script>
export default {
   props: ['KrestniJmeno', 'Id', 'Prijmeni', 'ZivotniData']
}
</script>

