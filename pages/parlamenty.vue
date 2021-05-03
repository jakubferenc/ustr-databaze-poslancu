<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    <ParlamentRadek v-for="parlament in parlamenty" :key="parlament.Id" :Id="parlament.Id" :Nazev="parlament.Nazev" :SnemovniObdobi="parlament.SnemovniObdobi" />


</template>


<script>
export default {

    async fetch({store}) {

      await store.dispatch("getParlamenty");
    },

    /*async fetch({ store }) {

      let parlamenty = await $axios.get('http://parliament.ustrcr.cz/Api/snemovny/seznam');
      console.log(parlamenty);
      console.log(parlamenty.data);

      parlamenty = parlamenty.data;

      console.log(parlamenty);
      console.log(typeof parlamenty);

      parlamenty = await Promise.all(parlamenty.map(async (parlament) => {

        const getSnemovniObdobi = await $axios.get(`http://parliament.ustrcr.cz/Api/snemovny/${parlament.Id}`);
        parlament.SnemovniObdobi = getSnemovniObdobi.data.SnemovniObdobi;

        return parlament;

      }));

      return {
        parlamenty
      }

    },*/

    computed: {
      parlamenty() {
        return this.$store.state.parlamenty;
      }
    },


    data() {
      return {
        title: `Představení parlamentních těles`,
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: ''
        }
      }
    }

}
</script>
