<template lang="pug">
  span.custom-select(@click="toggleSelect()" :data-has-been-selected="hasBeenSelected" :data-open="isActive")
    span.option-default(:id="ZakladniPolozka.id" :data-option-default-text="ZakladniPolozka.text") <span class="option-default-text">{{ZakladniPolozka.text}}</span> <small class="option-selected-text">{{selectedOptionText}}</small>
    span.options
      span.option(v-for="polozka in Polozky" :data-option-id="polozka.value" @click="selectOption(polozka.value, polozka.text)") {{polozka.text}}
</template>


<style lang="sass">
@import "~/assets/scss/bulma"
@import "~/assets/scss/typography"

</style>

<script>
export default {
   props: ['ZakladniPolozka', 'Polozky'],

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
    selectOption: function (selectedOptionValue, selectedOptionText) {

      if (!this.hasBeenSelected) {
        this.hasBeenSelected = true
      }

      this.selectedOption = selectedOptionValue;
      this.selectedOptionText = selectedOptionText;
      this.$el.querySelectorAll(`.selected`).forEach(item => item.classList.remove('selected'));
      this.$el.querySelector(`[data-option-id="${selectedOptionValue}"]`).classList.add('selected')
    }
  }

}
</script>
