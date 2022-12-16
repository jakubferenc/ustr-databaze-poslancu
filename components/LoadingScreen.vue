<template lang="pug">
.loading-screen(v-if="initDelayElapsed")
  .loading-screen__shadow
    .top-bar
        <Logo />
  .loading-screen__content-container
    .loading-text
      .typography-main-title Nahrávám data
      .typography-section-title.typography-alt-heading.typography-smaller-text(v-if="showTextLongerWaiting") Nahráváme pro vás velké množství dat, mějte prosím strpení.
    .loading-icon
      <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</template>

<style lang="sass">
$margin-body: 50px

.typography-main-title
  margin-bottom: 0

.typography-main-title + .typography-section-title
  margin-bottom: 0

.top-bar
  background: #fff
  height: 80px
  display: flex
  justify-content: space-between
  padding: 0 $margin-body
  align-items: center
  display: flex
  justify-content: space-between
  a
    color: #000
    font-size: 15px
    font-family: Courier, monospace
</style>
<style lang="scss" scoped>
.loading-screen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;

  &__shadow {
    background-color: rgba(244, 244, 244, 0.98);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  &__content-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    z-index: 2;
    .loading-icon {
    }
    .loading-text {
      font-size: 3rem;
      color: #000;
      margin-bottom: 1em;
      margin-top: -10%;
    }
  }
}
.lds-grid {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
  position: relative;
  left: -80%;
}
.lds-grid div {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(0, 40, 150, 0.8);
  animation: lds-grid 1.2s linear infinite;
}
.lds-grid div:nth-child(1) {
  top: 8px;
  left: 8px;
  animation-delay: 0s;
}
.lds-grid div:nth-child(2) {
  top: 8px;
  left: 32px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(3) {
  top: 8px;
  left: 56px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(4) {
  top: 32px;
  left: 8px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(5) {
  top: 32px;
  left: 32px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(6) {
  top: 32px;
  left: 56px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(7) {
  top: 56px;
  left: 8px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(8) {
  top: 56px;
  left: 32px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(9) {
  top: 56px;
  left: 56px;
  animation-delay: -1.6s;
}
@keyframes lds-grid {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>

<script>
import Logo from "../components/Logo.vue";

export default {
  components: { Logo },

  data() {
    return {
      timer: () => {},
      showTextLongerWaiting: false,
      activeImageId: 0,
      initDelayElapsed: false,
      initDelayTimer: () => {},
    };
  },
  computed: {},
  created() {
    this.initDelayElapsed = false;
    this.initDelayTimer = setTimeout(() => {
      this.initDelayElapsed = true;
      clearTimeout(this.initDelayTimer);
    }, 1000);
  },
  mounted() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.showTextLongerWaiting = true;
      clearTimeout(this.timer);
    }, 8000);
  },

  methods: {},
};
</script>
