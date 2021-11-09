<template lang="pug">

  .app-container

    .app-content
      <Header />
      <Main />
      <Footer />

    <PopupDetail/>

    .debug-bar


</template>


<script>
import Header from "~/components/Header.vue";
import Main from "~/components/Main.vue";
import Footer from "~/components/Footer.vue";
import PopupDetail from "~/components/PopupDetail.vue";

export default {

      components: { Header, Main, Footer, PopupDetail },


}
</script>

