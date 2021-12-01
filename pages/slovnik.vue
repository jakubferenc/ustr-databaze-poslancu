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

const SlovnikoveHeslo = () => import('~/components/SlovnikoveHeslo.vue');

const SlovnikovaHeslaData = () => import('~/data/slovnik.json').then(m => m.default || m);

export default {

    components: { SlovnikoveHeslo },


    async asyncData ({store, $config}) {

      if (!$config.useFileCachedAPI) {

        await store.dispatch("getSlovnikovaHesla");

        return {
          slovnikova_hesla: this.$store.state.slovnikova_hesla,
        }

      } else {

        const slovnikovaHeslaRes = await SlovnikovaHeslaData();

        return {
          slovnikova_hesla: slovnikovaHeslaRes,
        }

      }

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
