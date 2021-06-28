<template lang="pug">

  .poslanci-seznam.seznam-with-filter()

    .filter-seznam

        .filter-seznam-filter-statistics(v-if="MaStatistiky")

          .filter-seznam-filter-statistics-content.columns.is-multiline

            .statistics-diagram.simple.is-one-third-desktop.column

              .diagram-desc Poměr pohlaví poslanců
              .diagram-graphics
                span.diagram-graphics-value {{PoslanciStatistiky.percentageMale}} <small>%</small>
                span.diagram-graphics-desc muži

            .statistics-diagram.simple.is-one-third-desktop.column

              .diagram-desc Vzdělání
              .diagram-graphics
                span.diagram-graphics-value {{PoslanciStatistiky.percentageHasUniversityDegree}} <small>%</small>
                span.diagram-graphics-desc má titul

            .statistics-diagram.simple.is-one-third-desktop.column

              .diagram-desc Znovuzvolení (2+ mandátů)
              .diagram-graphics
                span.diagram-graphics-value {{PoslanciStatistiky.percentageHasMoreThanOneMandate}} <small>%</small>
                span.diagram-graphics-desc

            .statistics-diagram.simple.is-one-third-desktop.column

              .diagram-desc Nejvyšší věk
              .diagram-graphics
                span.diagram-graphics-value {{PoslanciStatistiky.oldestAge}}
                span.diagram-graphics-desc let

            .statistics-diagram.simple.is-one-third-desktop.column

              .diagram-desc Nejnižší věk
              .diagram-graphics
                span.diagram-graphics-value {{PoslanciStatistiky.lowestAge}}
                span.diagram-graphics-desc let

            .statistics-diagram.simple.is-one-third-desktop.column

              .diagram-desc Průměrný věk
              .diagram-graphics
                span.diagram-graphics-value {{PoslanciStatistiky.averageAge}}
                span.diagram-graphics-desc let


        .filter-seznam-bar(v-if="MaFiltr")

          .filter-seznam-bar-left
            span.button.button-filter(:class="sidebarButtonToggleStyles" @click="toggleSidebar()")
              span(v-if="isSidebarOpen") Zavřít filtr
              span(v-else) Otevřít filtr


          .filter-seznam.bar-right

            span.custom-select(@click="toggleSelect()" :data-has-been-selected="radit.hasBeenSelected" :data-open="radit.isActive")
              span.option-default(:id="radit.ZakladniPolozka.id" :data-option-default-text="radit.ZakladniPolozka.text") <span class="option-default-text">{{radit.ZakladniPolozka.text}}</span> <small class="option-selected-text">{{radit.selectedOptionText}}</small>
              span.options
                span.option(v-for="polozka in radit.RaditDle" :data-option-id="polozka.id"  @click="selectOrderOption(polozka.id, polozka.text)") {{polozka.text}}


        .seznam-content-container()

          .seznam-filter-sidebar(v-if="MaFiltr && isSidebarOpen")
            .seznam-filter-sidebar-content

              .seznam-filter-sidebar-content-header
                p.typography-filter-heading Zobrazuje se {{pocetPoslancuFiltrovanych}} z {{pocetPoslancu}} <br>poslanců



              .seznam-filter-sidebar-content-section(v-for="filtrSekceKey in Object.keys(filtrNastaveni)" :key="filtrSekceKey")

                //// sekce
                ////////////////////////////////////////////////////////////////////////////////
                .seznam-filter-sidebar-content-section-title.typography-filter-heading {{filtrNastaveni[filtrSekceKey].title}}
                .seznam-filter-sidebar-content-section-content.typography-filter-text

                  ol.filter-list(:class="{'filter-list-inline' : filtrNastaveni[filtrSekceKey].order === 'inline', 'filter-list-radios' : filtrNastaveni[filtrSekceKey].type === 'radio', 'filter-list-checkboxes' : filtrNastaveni[filtrSekceKey].type === 'checkbox'}")
                    li.filter-list-item(v-for="(filtrPolozka, index) in filtrNastaveni[filtrSekceKey].values" :key="index")
                      label(:for="filtrPolozka.id" :class="{disabled: filtrPolozka.disabled}")
                        .filter-list-item-checkbox
                          input(
                            @click="selectFilterOption(filtrSekceKey, index, filtrNastaveni[filtrSekceKey].multiple, filtrNastaveni[filtrSekceKey].reset, $event)"
                            :type="filtrNastaveni[filtrSekceKey].type"
                            :id="filtrPolozka.id"
                            :disabled="filtrPolozka.disabled"
                            :checked="filtrPolozka.selected ? 'checked' : ''"
                            :data-checked="filtrPolozka.selected"
                            :class="{selected: filtrPolozka.selected}"
                            :name="filtrNastaveni[filtrSekceKey].type ==='radio' ? filtrSekceKey : false"
                            :value="filtrPolozka.id"
                          )
                        .filter-list-item-value {{filtrPolozka.text}}

                ////////////////////////////////////////////////////////////////////////////////




          .seznam-filter-list

            .columns.is-multiline.is-mobile()

              Poslanec(
                v-for="(poslanec, index) in poslanci"
                :key="index"
                :Id="poslanec.Id"
                :Jmeno="poslanec.Jmeno"
                :Prijmeni="poslanec.Prijmeni"
                :ZivotniData="poslanec.ZivotniData"
                :DatumNarozeniZobrazene="poslanec.DatumNarozeniZobrazene"
                :DatumUmrtiZobrazene="poslanec.DatumUmrtiZobrazene"
                :Mandaty="poslanec.Mandaty"
                :ZobrazitMandaty="aktualniNastaveniRazeni === 'radit-pocet-mandatu' || aktualniNastaveniRazeni === 'radit-pocet-mandatu-sestupne' "
                class="is-one-third-mobile is-one-third-tablet column is-2-fullhd is-2-widescreen is-one-quarter-desktop"
                )

            .component-footer(v-if="MaButtonMore")

              a(v-if="MaButtonMore && ButtonMoreLink" :href="ButtonMoreLink").typo-form-button.button-large Zobrazit všechny poslance

              a(v-if="MaButtonMore && MaPaginaci" href="").typo-form-button.button-large Načíst další poslance

</template>

<style lang="sass" scoped>

  @import "~/assets/scss/bulma"
  @import "~/assets/scss/typography"

  .statistics-diagram
    display: flex
    justify-content: center
    align-item: center


  label.disabled,
  input:disabled
    cursor: not-allowed
    pointer-events: none
    opacity: .5

  .filter-list-item-value
    text-transform: lowercase

    &:first-letter
      text-transform: uppercase

  .filter-seznam-bar
    display: flex
    align-item: center
    justify-content: space-between
    margin-bottom: 40px
    font-size: 12px

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
  props: ["PoslanciVstupniPolozky", "KesovatPoslanceInterne", "PoslanciStatistiky", "MaFiltr", "MaButtonMore", "ButtonMoreLink", "MaPaginaci", "MaStatistiky", "NastaveniFiltrace"],

  computed: {

    filtrNastaveni() {

      const defaults = {

      }

      return Object.assign({}, defaults, this.NastaveniFiltrace, this.filtrNastaveniAktualniPolozky);

    },

    poslanci() {

      let currentPoslanci = (this.$store.state.poslanci_filtrovani.length) ?  this.$store.state.poslanci_filtrovani : this.PoslanciVstupniPolozky;

      if (this.MaFiltr) {

        if (!this.radit.hasBeenSelected) {

          // make zakladni razeni sort filter
          currentPoslanci = [...currentPoslanci].sort((a, b) => (a.Id > b.Id) ? 1 : -1);

        }

        if ( this.filtrovat.hasBeenSelected ) {

          // filter has been set, let us filter poslance

          // here filtering based on the this.filterNastaveni

          let filteredPoslanci = this.PoslanciVstupniPolozky;

          filteredPoslanci = filteredPoslanci.filter((poslanec) => {

            let itemSatisfyFilter = [];


            // filter
            Object.keys(this.filtrNastaveni).forEach((polozkaFiltrKey) => {

              // filter these properties

              const itemPropertyToTest = this.filtrNastaveni[polozkaFiltrKey].property;


              let tempFilterResults = []; // here will be several boolean variables true or false, we need to get at last one true for the filter item to be true as such and this the item passes the filter


              // filter section either have multiple items for only one item, then the itemPropertyToTest is a string
              // or multiple items for multiple "poslanec" properties, then attribute "property" must be for each filter item as well as "property" for the filter section must be an array
              if (!Array.isArray(itemPropertyToTest)) {

                // we are testing one property with multiple values

                const thisFilterItemSelectedItems = this.filtrNastaveni[polozkaFiltrKey].values.filter(item => item.selected || (item.selected && item.default));

                thisFilterItemSelectedItems.forEach(itemFiltervalidator => {


                  tempFilterResults.push(itemFiltervalidator.validate(poslanec[itemPropertyToTest]));

                });

                itemSatisfyFilter = [...itemSatisfyFilter, tempFilterResults.includes(true)]; // includes at least one "true" anwwer to if it the item satisfies at least one from the multiple filter section

              } else {


                itemPropertyToTest.forEach(itemPropertyToTestIndividual => {

                  const thisFilterItemSelectedItems = this.filtrNastaveni[polozkaFiltrKey].values.filter( item => (item.selected && item.property === itemPropertyToTestIndividual) || (item.selected && item.default) );

                  thisFilterItemSelectedItems.forEach(validator => {

                    tempFilterResults.push(validator.validate(poslanec[itemPropertyToTestIndividual]));

                  });

                });

                itemSatisfyFilter = [...itemSatisfyFilter, tempFilterResults.includes(true)];


              }

            });

            // must be all true

            // new set is just for performance so that ".includes" picks only from max. two array items (true | false)
            // :TODO: but I am not sure if it is necessary for the performance

            return ![...new Set(itemSatisfyFilter)].includes(false);


          });


          currentPoslanci = filteredPoslanci;


        }

        if (this.radit.hasBeenSelected) {

          currentPoslanci = this.getRazeniPoslanciSeznam(this.radit.selectedOptionId, currentPoslanci);

        }


      }


      return currentPoslanci;

    },

    sidebarButtonToggleStyles() {
      return {
        active: this.isSidebarOpen
      }
    },
    pocetPoslancuFiltrovanych() {
      return this.poslanci.length;
    },
    pocetPoslancu: function() {
      return this.PoslanciVstupniPolozky.length;
    },
    aktualniNastaveniRazeni() {
      return this.radit.selectedOptionId;
    }
  },

  methods: {

    toggleSidebar() {

      this.isSidebarOpen = (this.isSidebarOpen) ? false: true;

    },

    toggleSelect() {

      this.radit.isActive = (this.radit.isActive) ? false: true;

    },

    selectOrderOption(selectedOptionId, selectedOptionText) {

      if (!this.radit.hasBeenSelected) {
        this.radit.hasBeenSelected = true
      }

      this.radit.selectedOptionId = selectedOptionId;
      this.radit.selectedOptionText = selectedOptionText;
      this.$el.querySelectorAll(`.option.selected`).forEach(item => item.classList.remove('selected'));
      this.$el.querySelector(`[data-option-id="${selectedOptionId}"]`).classList.add('selected');

    },


    // this functions edits the reactive object this.FiltrNastaveni
    // html elements inside the Sidebar filter will be then automagically, reactivelly re-renders based on the contents of that reactive object this.FiltrNastaveni
    // so there is no need to manually change the DOM html

    // Also poslanci will be automagically re-rendered and filtered also based on the reactivity of the this.FiltrNastaveni object

    // This function merges together this.FilterNastaveni and the whole subproperty of this object
    // This function basically selects which filter items are selected and which not.
    // The filtering as such is done inside the computer property this.poslanci where the whole logic based on this.FilterNastaveni lies
    selectFilterOption(filtrSekceKey, thisObjIndex, multiple, sectionHasReset, $event) {

      // just an indicator if the filter has been used at least once
      // :TODO: may not be needed
      if (!this.filtrovat.hasBeenSelected) {
        this.filtrovat.hasBeenSelected = true;
      }

      const tempResult = this.filtrNastaveni[filtrSekceKey];


      if (multiple) {

        if (sectionHasReset) {

          const isItemReset = tempResult.values[thisObjIndex].reset || false;

          tempResult.values.forEach((item, index) => {

            if (isItemReset) {

              item.selected = (index === thisObjIndex) ? true : false;

            } else {

              if (index === thisObjIndex) {
                item.selected = (item.selected) ? false : true;
              }

              if (item.reset) {
                item.selected = false;
              }

            }


          });

          // Check if no options are selected, then select vse/reset button
          if (tempResult.values.filter(item => item.selected).length === 0) {
            tempResult.values.filter(item => item.reset)[0].selected = true;
          }


        } else {

          tempResult.values[thisObjIndex].selected = (tempResult.values[thisObjIndex].selected) ? false : true;

        }

      } else {

        tempResult.values.forEach((item, index) => {

          item.selected = (thisObjIndex === index) ? true : false;

        });

      }



      this.filtrNastaveniAktualniPolozky = {[filtrSekceKey]: tempResult};


      this.$store.dispatch("setPoslanciFiltrovani", this.poslanci);

    },

    getRazeniPoslanciSeznam(selectedOptionId, poslanci) {


      let filteredPoslanci = [...poslanci];


      // Sorting

      if (selectedOptionId === 'radit-datum-narozeni') {

        filteredPoslanci = filteredPoslanci.sort((a, b) => (a.DatumNarozeniZobrazene > b.DatumNarozeniZobrazene) ? 1 : -1);

      }

      if (selectedOptionId === 'radit-datum-narozeni-sestupne') {

        filteredPoslanci = filteredPoslanci.sort((a, b) => (a.DatumNarozeniZobrazene < b.DatumNarozeniZobrazene) ? 1 : -1);

      }

      if (selectedOptionId === 'radit-prijmeni') {

        filteredPoslanci = filteredPoslanci.sort((a, b) => {
          const nameA = a.Prijmeni.toLowerCase();
          const nameB = b.Prijmeni.toLowerCase();

          return (nameA > nameB) ? 1 : -1;

        });

      }

      if (selectedOptionId === 'radit-prijmeni-sestupne') {

        filteredPoslanci = filteredPoslanci.sort((a, b) => {
          const nameA = a.Prijmeni.toLowerCase();
          const nameB = b.Prijmeni.toLowerCase();

          return (nameA < nameB) ? 1 : -1;

        });

      }

      if (selectedOptionId === 'radit-pocet-mandatu') {

        filteredPoslanci = filteredPoslanci.sort((a, b) => (a.Mandaty.length > b.Mandaty.length) ? 1 : -1);

      }

      if (selectedOptionId === 'radit-pocet-mandatu-sestupne') {

        filteredPoslanci = filteredPoslanci.sort((a, b) => (a.Mandaty.length < b.Mandaty.length) ? 1 : -1);

      }

      if (selectedOptionId === 'radit-id') {

        filteredPoslanci = filteredPoslanci.sort((a, b) => (a.Id > b.Id) ? 1 : -1);

      }

      return filteredPoslanci;

      //this.PoslanciFiltrovani = filteredPoslanci;

      // commit & dispatch

      //this.$store.commit("updatePoslanciFiltrovani", this.PoslanciFiltrovani);

    },

  },

  created() {
    // :TODO: #5 Check if this is necessary and will be implemented
    if (this.radit.selectedOptionId !== undefined) {
      // we have a default order value set
      let getFilterInDefaults = this.RaditDle.filter(item => item.id === this.radit.selectedOptionId);
      if (getFilterInDefaults.length) {
        const {selectedOptionId, selectedOptionText} = getFilterInDefaults;
        this.$emit('selectOption', {selectedOptionId, selectedOptionText});
      }
    }
  },

  mounted() {

    this.$sidebar = this.$el.querySelector('.seznam-filter-sidebar');


  },

  data() {
    return {
      filtrovat: {
        hasBeenSelected: false
      },
      radit: {
        isActive: false,
        selectedOptionId: undefined,
        selectedOptionText: undefined,
        hasBeenSelected: false,
        RaditDle: [
          { id: 'radit-id', text: 'Základní řazení' },
          { id: 'radit-prijmeni', text: 'Podle příjmení' },
          { id: 'radit-prijmeni-sestupne', text: 'Podle příjmení (sestupně)' },
          { id: 'radit-pocet-mandatu', text: 'Podle počtu mandátů' },
          { id: 'radit-pocet-mandatu-sestupne', text: 'Podle počtu mandátů (sestupně)' },
          { id: 'radit-datum-narozeni', text: 'Podle data narození' },
          { id: 'radit-datum-narozeni-sestupne', text: 'Podle data narození (sestupně)' },
        ],
        ZakladniPolozka: { id: 'radit-default', text: 'řadit dle' },
      },
      PoslanciFiltrovani: [],
      filtrNastaveniAktualniPolozky: {},
      isSidebarOpen: true, // can set a default value
    };
  },
};
</script>
