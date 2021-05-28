<template lang="pug">
  .popup-timeline-detail
    .background-shadow

    .popup-timeline-detail-content(:style="{top: `calc(30% + ${elementScrollTop}px)`}")

      .button-close(@click="closePopup()") X Zavřít detail
      .section-padding-h-margin-v


          h1.typography-main-title {{popupTimelineDetailContent.title}}
</template>


<style lang="sass">

  @import 'bulma/sass/utilities/mixins.sass'

  .popup-timeline-detail
    display: none

    @at-root html.popup-detail-on &
      z-index: 9
      display: block

    .popup-timeline-detail-content
      position: absolute
      left: 0
      width: 100vw
      min-height: 100vh
      background: white

      @at-root html.popup-detail-on &

        animation: slideUp .5s



    .background-shadow
      background: rgba(0,0,0,.3)
      position: fixed
      top: 0
      left: 0
      width: 100vw
      height: 100vh
      display: none

      @at-root html.popup-detail-on &
        display: block

    .button-close
      position: absolute
      top: 40px
      right: 40px
      cursor: pointer

</style>

<script>

export default {

  data() {
    return {

    }
  },
  computed: {

    // show the popup with top (margin top) pixesl according to the scrolltop amount of the element that invoked the event
    elementScrollTop() {
      return this.$store.state.popup_timeline_detail.scrollTop;
    },

    popupTimelineDetailContent() {
      return this.$store.state.popup_timeline_detail;
    },
    isPopUpVisible() {
      return Object.keys(this.$store.state.popup_timeline_detail).length > 0;
    }

  },

  mounted() {

    this.$element = this.$el.querySelector(`.popup-timeline-detail`);
    this.$popupRealContent = this.$el.querySelector('.popup-timeline-detail-content');

    this.$popupRealContent.addEventListener('transitions', (e) => {
      console.log("transition ended!");
    });

    this.$popupRealContent.addEventListener('transitionend', (e) => {
      console.log("transition ended!");
    });

  },

  methods: {
    closePopup: function() {

      this.$store.dispatch("setPopupTimelineDetail", {}); // remove content from the store
      document.getElementsByTagName('html')[0].classList.remove('popup-detail-on');

    }
  },
}
</script>
