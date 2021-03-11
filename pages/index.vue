<template lang="pug">

  h1.typography-main-title {{ title }}

</template>




<script>
export default {

    data() {
      return {
        title: `Hlavní stránka`,
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'slovnik'
        }
      }
    }

}
</script>
