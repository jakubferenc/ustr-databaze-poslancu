<template lang="pug">

  .app-container

    .app-content
      <Header />
      <Main />
      <Footer />

    <PopupDetail v-if="isPopUpVisible" />

    .debug-bar


</template>


<script>

export default {

    async asyncData ({store}) {

    },

    computed: {

      isPopUpVisible() {

        if (this.$store.state.popup_timeline_detail && Object.keys(this.$store.state.popup_timeline_detail).hasOwnProperty('length')) {
          return Object.keys(this.$store.state.popup_timeline_detail).length > 0;
        } else {
          return false;
        }


      }


    },


    data() {
      return {
      }
    },

}
</script>

