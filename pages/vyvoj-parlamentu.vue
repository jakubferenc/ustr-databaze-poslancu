<template lang="pug">

  .page

    h1.typography-main-title {{title}}

    .section-padding-h-margin-v

      .timeline-vertical

        .casova-osa-line

        .timeline-item-row(v-for="item in casova_osa" :key="item.id")

          .timeline-item-box.timeline-item-box-image(@click="openPopUpDetail(item, $event)")

            .timeline-item-image-container

              img.timeline-item-image.typography-image-thumb-medium(v-if="item.featured_image !== null" :src="item.featured_image.image.thumb_url" :alt="item.featured_image.description")

              .timeline-item-image-description(v-if="item.featured_image.description !== null")
                small
                  span {{item.featured_image.description}}

          .timeline-item-box.timeline-item-box-date.timeline-item-date
            .casova-osa-circle(:class="{large: item.casova_osa_dulezita == '1', small: item.casova_osa_dulezita != '1'}") {{item.casova_osa_rok}}

          .timeline-item-box.timeline-item-box-title
            .timeline-item-title(@click="openPopUpDetail(item, $event)") {{item.title}}

</template>


<style lang="sass" scoped>

  @use "sass:math"

  .timeline-vertical
    position: relative

    .casova-osa-line
      border-left: 5px dotted #000
      height: 2px
      position: absolute
      top: 0
      margin-top: -80px
      bottom: 0
      margin-bottom: -80px

      width: 0
      z-index: 0
      height: calc(100% + 160px)

      left: 0

      +from($fullhd)
        margin-left: -2px
        left: 50%

  .timeline-item-box-image
    cursor: pointer

  .timeline-item-box
    display: flex
    justify-content: flex-start

    +from($fullhd)
      justify-content: center
      flex: 1

  .timeline-item-row

    display: flex
    justify-content: space-between
    position: relative
    align-items: center
    margin-bottom: 120px

    &:nth-child(2n+1)
      flex-direction: row-reverse

    &.reverse
      flex-direction: row-reverse

    &:last-child
      margin-bottom: 0




    +until($fullhd)
      .timeline-item-box-date
        order: 1

      .timeline-item-box-image
        order: 2

      .timeline-item-box-title
        order: 3


    .timeline-item-image-container

      .timeline-item-image
        width: 100%
        background-color: lightgray

        max-width: 300px

        +from($fullhd)
          max-width: 500px

      .timeline-item-image-description
        margin-top: math.div($margin-until-desktop, 4)
        line-height: 1.4


    .timeline-item-title

      @extend %typography-section-title

      max-width: 300px
      cursor: pointer

      +from($fullhd)
        max-width: 500px


    .timeline-item-box-date

       +until($fullhd)
        width: $large-circle-height


    .casova-osa-circle
      background-color: #000
      display: flex
      align-items: center
      justify-content: center
      border-radius: 100%
      color: #fff
      line-height: 1

      &.small

        width: math.div($large-circle-height, 2)
        height: math.div($large-circle-height, 2)
        font-size: 18px
        margin-left: -1 * math.div($large-circle-height, 4)

        +from($fullhd)
          margin-left: 0


      &.large

        width: 160px
        height: 160px
        margin-left: -80px
        line-height: 1
        font-size: 32px

        +from($fullhd)
          margin-left: 0

</style>

<script>

const CasovaOsaData = () => import('~/data/casova-osa.json').then(m => m.default || m);

export default {


    async asyncData({params, error, payload, store, $axios, $config}) {

      if (payload) {
        return {
          soubor: payload
        }
      } else {

        if (!$config.useFileCachedAPI) {

          // :TODO: check if in store, it is cached, so that when we have results stored in the store, we just return the array of "stranka" items
          await store.dispatch("getCasovaOsa");

          return {
            casova_osa: store.state.casova_osa
          }

        } else {

          const CasovaOsaRes = await CasovaOsaData();

          return {
            casova_osa: CasovaOsaRes
          }

        }



      }

    },

    methods: {

      openPopUpDetail: function(item, e) {

        item.scrollTop = window.scrollY;

        this.$store.dispatch("setPopupTimelineDetail", item);
        document.getElementsByTagName('html')[0].classList.add('popup-detail-on');

      }

    },
    computed: {

      htmlClassComputed() {
        return this.htmlClass.join(' ');
      }
    },
    data() {
      return {
        title: `Časová osa vývoje parlamentarismu v českých zemích a Československu`,
        htmlClass: ['alt-bg']
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.public.globalTitle}`,
        htmlAttrs: {
          class: this.htmlClassComputed
        }
      }
    }

}
</script>
