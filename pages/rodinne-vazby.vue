<template lang="pug">

    h1.typography-main-title {{title}}

</template>

<script>
export default {


    data() {
      return {
        title: `Rodinné vazby`,
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
