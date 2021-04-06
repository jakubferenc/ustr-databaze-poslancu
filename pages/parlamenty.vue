<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    <ParlamentRadek />


</template>


<script>
export default {

    created() {
      this.$store.dispatch("getParlamenty");
    },
    computed: {
      parlamenty() {
        console.log(this.$store.state.parlamenty);
        return this.$store.state.parlamenty;
      },
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
