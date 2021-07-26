<template lang="pug">

    .section

      h1.typography-main-title {{title}}

      .container-list.columns.is-multiline.section-padding-h-margin-v

        SlovnikoveHeslo(v-for="item in slovnikova_hesla" v-bind:key="item.id" :title="item.title.rendered" :description="item.content.rendered" class="is-one-third column")


</template>


<script>
export default {


    async asyncData ({store}) {

      await store.dispatch("getSlovnikovaHesla");

    },


    computed: {
      slovnikova_hesla() {
        return this.$store.state.slovnikova_hesla;
      },
    },
    data() {
      return {
        title: `Slovník pojmů`,
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'alt-bg'
        }
      }
    }

}
</script>
