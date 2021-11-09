<template lang="pug">

    .section

      h1.main-title {{title}}

      .container-list.columns.is-multiline.section-padding-h-margin-v

        SlovnikoveHeslo(
          v-for="item in slovnikova_hesla"
          :key="item.id"
          :Title="item.title.rendered"
          :Slug="item.slug"
          :Excerpt="item.excerpt.rendered"
          :Description="item.content.rendered"
          class="is-one-third column"
        )


</template>

<style lang="sass">

  .main-title
    @extend %typography-main-title

</style>


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
