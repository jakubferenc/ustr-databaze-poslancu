<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    .container-list.columns.is-multiline

      Poslanec(
        v-for="poslanec in poslanci"
        v-bind:key="poslanec.Id"
        :Id="poslanec.Id"
        :KrestniJmeno="poslanec.KrestniJmeno"
        :Prijmeni="poslanec.Prijmeni"
        :ZivotniData="poslanec.ZivotniData"
        class="is-one-third column"
        )


</template>


<script>
export default {

    created() {
      this.$store.dispatch("getPoslanci");
    },
    computed: {
      poslanci() {
        return this.$store.state.poslanci;
      },
    },
    data() {
      return {
        title: `Poslanci`,
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
