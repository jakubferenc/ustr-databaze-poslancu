<template lang="pug">

.parlament-tabs

  nav.parlament-tabs-nav
    .tabs.columns
      a.tab.column.is-one-fourth(v-for="(item, key) in nastaveni" @click.prevent="selectActiveTab(nastaveni[key].id)" :class="{ active: nastaveni[key].id === activeTabId}" href="#") {{ nastaveni[key].title }}
    .line

  .parlament-tabs-content-container

    .parlament-tabs-content-item(v-for="(item, key) in nastaveni" :class="{ active: nastaveni[key].id === activeTabId }" v-if="nastaveni[key].id === activeTabId" )
      div(v-html="nastaveni[key].obsah")

</template>


<style lang="sass">
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

 .parlament-tabs
    margin-top: 100px

    .parlament-tabs-nav

      .line
        height: 1px
        background: #000
        position: relative
        z-index: 0

      .tabs
        display: flex
        margin-bottom: 0

      .tab
        height: 100px
        text-align: center
        position: relative
        bottom: -1px
        margin-left: -1px
        display: flex
        align-items: center
        justify-content: center
        text-decoration: none
        border-width: 1px
        border-style: solid
        border-color: transparent

        &:hover,
        &.active
          border-top-left-radius: 15px
          border-top-right-radius: 15px
          border-color: #000
          border-bottom: 1px solid #F8F6F1
          z-index: 2

        &.active
          text-decoration: underline

.parlament-tabs-content-item
  padding: 50px 20px 0 20px

  display: none

  &.active
    display: flex

</style>

<script>
export default {
  props: ['nastaveni'],
  data() {
    return {
      activeTabId: Object.values(this.nastaveni).filter(item => item.aktivni === true)[0].id
    }
  },
  computed: {

  },
  created() {

    console.log(this.activeTabId);

  },


  methods: {
    selectActiveTab: function(id) {

      this.activeTabId = id;

    },
  }

}
</script>
