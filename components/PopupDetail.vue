<template lang="pug">
  .popup-timeline-detail(v-if="popupTimelineDetailContent && popupTimelineDetailContent.galerie")
    .background-shadow

    .popup-timeline-detail-content(:style="{top: `calc(25% + ${elementScrollTop}px)`}")

      .button-close(@click="closePopup()") X Zavřít detail
      .section-padding-h-margin-v

          h1.typography-main-title {{popupTimelineDetailContent.title}}

          .popup-content.columns.is-multiline

            .gallery-container.column.is-one-half-tablet
              .image-gallery-container
                .image-gallery-item(v-for="(imageItem, index) in popupTimelineDetailContent.galerie" :index="imageItem.id" )
                  img(@click="changeImageGallery(index)" @mouseenter="changeImageGallery(index)" :src="imageItem.image.thumb_url" :alt="(imageItem.caption) ? imageItem.caption : '' " :title="(imageItem.caption) ? imageItem.caption : '' ")

              .image-main-container(v-if="popupTimelineDetailContent && popupTimelineDetailContent.galerie[activeImageId]")
                NuxtLink(v-on:click.native="redirectToDetail()" :to="`/media/${popupTimelineDetailContent.galerie[activeImageId].id}/`")
                  img(v-if="popupTimelineDetailContent.galerie[activeImageId]" :src="popupTimelineDetailContent.galerie[activeImageId].image.thumb_url")
                .timeline-item-image-description(v-if="popupTimelineDetailContent.galerie[activeImageId].description")
                  div
                    .image-main-caption {{popupTimelineDetailContent.galerie[activeImageId].caption}}
                    br
                    small.image-main-description {{popupTimelineDetailContent.galerie[activeImageId].description}}
                    br
                    br
                    small.image-main-source Zdroj: {{popupTimelineDetailContent.galerie[activeImageId].alt_text}}
            .text-container.column.is-one-half-tablet(v-html="popupTimelineDetailContent.content")
</template>


<style lang="sass" scoped>


  .gallery-container
    display: flex

    .image-gallery-container
      margin-right: 30px


  .image-gallery-item
    width: 150px
    height: 150px
    position: relative
    margin-bottom: 5px
    cursor: pointer

    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      object-fit: cover

  .timeline-item-image-description
    line-height: 1.2

  .popup-content

    .gallery-container,
    .text-container


  .popup-timeline-detail
    display: none

    .typography-main-title
      width: 100%
      margin-left: auto
      margin-right: auto

      +from($desktop)
        width: 75%

      +from($fullhd)
        width: 50%

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
      activeImageId: 0,
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


  },

  mounted() {


  },

  methods: {

    changeImageGallery(index) {

      this.activeImageId = index;

    },

    redirectToDetail() {

      this.closePopup();

    },

    closePopup: function() {

      this.$store.dispatch("setPopupTimelineDetail", {}); // remove content from the store
      document.getElementsByTagName('html')[0].classList.remove('popup-detail-on');

    }
  },
}
</script>
