<template lang="pug">

    .section

      h1.main-title {{title}}

      .container-list.container-slovnik.columns.is-multiline.section-padding-h-margin-v

        SlovnikoveHeslo(
          v-for="item in slovnikova_hesla"
          :key="item.id"
          :Title="item.title"
          :Slug="item.slug"
          :Excerpt="item.excerpt"
          :Description="item.content"
          class="is-one-third column"
        )


</template>

<style lang="sass">

.main-title
  @extend %typography-main-title

.container-slovnik
  align-items: flex-start
</style>

<script>
const SlovnikoveHeslo = () => import("~/components/SlovnikoveHeslo.vue");

export default {
  components: { SlovnikoveHeslo },

  async asyncData({ store, $config }) {
    await store.dispatch("getSlovnikovaHesla");

    return {
      slovnikova_hesla: store.state.slovnikova_hesla,
    };
  },

  data() {
    return {
      title: `Slovník pojmů`,
    };
  },

  head() {
    return {
      title: `${this.title} — ${this.$config.globalTitle}`,
      htmlAttrs: {
        class: "alt-bg",
      },
    };
  },
};
</script>
