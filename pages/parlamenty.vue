<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    .container-list.columns.is-multiline

      Parlament(v-for="parlament in parlamenty" v-bind:key="parlament.Id" :Nazev="parlament.Nazev" class="is-one-third column")


</template>


<script>
export default {

    created() {
      this.$store.dispatch("getParlamenty");
    },
    computed: {
      parlamenty() {
        return this.$store.state.parlamenty;
      },
    },
    data() {
      return {
        title: `Parlamenty`,
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
