<template lang="pug">
  span.custom-select(@click="toggleSelect()" :data-has-been-selected="hasBeenSelected" :data-open="isActive")
    span.option-default(:id="ZakladniPolozka.id" :data-option-default-text="ZakladniPolozka.text") <span class="option-default-text">{{ZakladniPolozka.text}}</span> <small class="option-selected-text">{{selectedOptionText}}</small>
    span.options
      span.option(v-for="polozka in RaditDle" :data-option-id="polozka.id"  @click="selectOption(polozka.id, polozka.text, Namespace)") {{polozka.text}}
</template>


<style lang="sass">
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .custom-select

    $custom-select-width: 260px

    @extend .button

    cursor: pointer
    width: $custom-select-width
    position: relative
    font-size: 12px


    &, &:focus, &:active
      outline: none
      user-select: none

    &[data-has-been-selected="true"]
      .option-default-text
        display: none

    &[data-open="true"]

      top: -1px // :TODO: #4 A bug when a custom select is open, it moves down by 1px

      border-bottom: none
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0
      .options
        display: flex

      .option-default-text
        display: inline-block


      .option-selected-text
        display: none


    .options
      background: #fff
      position: absolute
      left: -1px
      display: none
      flex-direction: column
      border: 1px solid #000
      border-top: none
      width: $custom-select-width
      border-bottom-left-radius: 10px
      border-bottom-right-radius: 10px

      .option
        display: block

        &.selected
          text-decoration: underline

</style>

<script>
export default {
   props: ['Namespace', 'ZakladniPolozka', 'RaditDle'],

  created() {
    // :TODO: #5 Check if this is necessary and will be implemented
    if (this.$store.state.poslanci_seznam_razeni_id !== undefined) {
      // we have a default order value set
      let getFilterInDefaults = this.RaditDle.filter(item => item.id === this.$store.state.poslanci_seznam_razeni_id);
      if (getFilterInDefaults.length > 0) {
        const {selectedOptionId, selectedOptionText} = getFilterInDefaults;
        const namespace = this.Namespace;
        this.$emit('selectOption', {selectedOptionId, selectedOptionText, namespace});
      }
    }
  },
   data() {
      return {
        isActive: false,
        selectedOption: undefined,
        selectedOptionText: undefined,
        hasBeenSelected: false
      }
    },

  methods: {
    toggleSelect: function() {

      this.isActive = (this.isActive) ? false: true;

    },
    selectOption: function (selectedOptionId, selectedOptionText, Namespace) {

      if (!this.hasBeenSelected) {
        this.hasBeenSelected = true
      }

      this.selectedOption = selectedOptionId;
      this.selectedOptionText = selectedOptionText;
      this.$el.querySelectorAll(`.selected`).forEach(item => item.classList.remove('selected'));
      this.$el.querySelector(`[data-option-id="${selectedOptionId}"]`).classList.add('selected')

      this.$store.dispatch('raditPoslanciSeznam', {selectedOptionId, selectedOptionText, Namespace});
    }
  }

}
</script>
