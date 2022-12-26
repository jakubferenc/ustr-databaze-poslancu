<template lang="pug">

    .section-content-max-width.section-padding-h-margin-v.section-stranka(v-if="slovnikove_heslo")

      h1.typography-main-title {{slovnikove_heslo.title}}

      .excerpt-container.typography-row-with-image(:class="excerptKontejnerStyly")

        .row-in-image.featured-image(v-if="slovnikove_heslo.featured_image")
          img(:src="slovnikove_heslo.featured_image.image.full_url")

        .row-in-text.real-content-container.real-content-text
          .typography-item-detail-text(v-html="slovnikove_heslo.content")

    .section-content-max-width.section-padding-h-margin-v.section-stranka(v-else)

      h1.typography-main-title Vámi hledané slovníkové heslo „<small>{{slug}}</small>“ jsme nemohli najít, nebo neexistuje.




</template>

<style lang="sass">


.section-stranka
  .typography-main-title
    margin-top: 0
    padding-top: 0

.typography-row-with-image:not(.has-featured-image)
  display: flex
  align-items: center
  justify-content: center
</style>
<script>
const SlovnikovaHeslaData = () =>
  import("~/data/slovnik.json").then((m) => m.default || m);

export default {
  // :NOTE: {params, error, payload, store} is a deconstructed "context" object
  async asyncData({ $config, params, error, payload, store }) {
    if (payload) {
      return {
        slovnikove_heslo: payload,
      };
    } else {
      await store.dispatch("getSlovnikovaHesla");

      const slovnikove_heslo = store.state.slovnikova_hesla.filter(
        (item) => item.slug === params.slug
      )[0];

      return {
        slovnikove_heslo,
        slug: params.slug,
      };
    }
  },

  computed: {
    excerptKontejnerStyly() {
      return {
        "has-featured-image": this.slovnikove_heslo.featured_image,
      };
    },
  },

  mounted() {},

  data() {
    return {};
  },
  head() {
    return {
      title: `${this.slovnikove_heslo.title || "Nenalezeno"} — ${
        this.$config.globalTitle
      }`,
      htmlAttrs: {
        class: "subpage-slovnik",
      },
    };
  },
};
</script>
