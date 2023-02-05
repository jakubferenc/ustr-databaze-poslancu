<template lang="pug">
.poslanci-seznam-container
  LoaderIndication(v-if="isLoading")
  #scroll-top.poslanci-seznam.seznam-with-filter(v-if="!isLoading")

    .mapa-container.section.mapa-container-above-list(v-if="MaMapu && Mod === 'Vse' ")

      h2.section-title Místo narození poslanců
        span.section-title-subtitle Mapa se aktualizace podle zvoleného nastavení filtru

      Mapa(:PoslanciVstupniData="poslanci" :Nadpis="false")


    .filter-seznam.section-padding-h-margin-v

      h2.section-title(v-if="Nadpis") {{Nadpis}}

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

            .diagram-desc Předchozí parlamentní zkušenost
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


        .filter-seznam.bar-right(v-if="MaRazeni")

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


              //// BEGIN sekce
              ////////////////////////////////////////////////////////////////////////////////
              .seznam-filter-sidebar-content-section-title.typography-filter-heading
                span {{filtrNastaveni[filtrSekceKey].title}}
                span(v-if="filtrNastaveni[filtrSekceKey].hasCounter") &nbsp;({{filtrNastaveni[filtrSekceKey].values.length}})
                span.info-icon(v-if="filtrNastaveni[filtrSekceKey].info") i
                  span.info-text ({{filtrNastaveni[filtrSekceKey].info}})

              .seznam-filter-sidebar-content-section-content.typography-filter-text(v-if="filtrNastaveni[filtrSekceKey].type == 'radio' || filtrNastaveni[filtrSekceKey].type == 'checkbox'")

                ol.filter-list(:class="{'filter-list-inline' : filtrNastaveni[filtrSekceKey].order === 'inline', 'filter-list-radios' : filtrNastaveni[filtrSekceKey].type === 'radio', 'filter-list-checkboxes' : filtrNastaveni[filtrSekceKey].type === 'checkbox'}")
                  li.filter-list-item(v-for="(filtrPolozka, valueIndex) in filtrNastaveni[filtrSekceKey].values" :key="valueIndex")
                    label(:for="`${filtrSekceKey}-${filtrPolozka.id}`" :class="{disabled: filtrPolozka.disabled}")
                      .filter-list-item-checkbox
                        input(
                          @click="onSelectFilterOption(filtrSekceKey, valueIndex, filtrNastaveni[filtrSekceKey].type, filtrNastaveni[filtrSekceKey].multiple, filtrNastaveni[filtrSekceKey].reset, $event)"
                          :type="filtrNastaveni[filtrSekceKey].type"
                          :id="`${filtrSekceKey}-${filtrPolozka.id}`"
                          :disabled="filtrPolozka.disabled"
                          :checked="filtrPolozka.selected  ? 'checked' : ''"
                          :data-checked="filtrPolozka.selected"
                          :class="{selected: filtrPolozka.selected}"
                          :name="filtrNastaveni[filtrSekceKey].type ==='radio' ? filtrSekceKey : false"
                          :value="filtrPolozka.id"
                        )
                      .filter-list-item-value {{filtrPolozka.text}}



              .seznam-filter-sidebar-content-section-content.typography-filter-text(v-if="filtrNastaveni[filtrSekceKey].type == 'range'")


                MultiRangeSlider(
                  v-on:multi-range-change="onRangeChange(filtrSekceKey, $event)"
                  :QueryStructure="filtrNastaveni[filtrSekceKey].queryStructure"
                  :Name="`${filtrSekceKey}`"
                  :Id="`${filtrSekceKey}`"
                  :CurrentMinValue="filtrNastaveni[filtrSekceKey].values[0].currentValue"
                  :CurrentMaxValue="filtrNastaveni[filtrSekceKey].values[1].currentValue"
                  :MinValue="filtrNastaveni[filtrSekceKey].values[2]"
                  :MaxValue="filtrNastaveni[filtrSekceKey].values[3]"
                )


              //// END sekce
              ////////////////////////////////////////////////////////////////////////////////




        .seznam-filter-list(v-if="PoslanciVstupniPolozky")

          .mapa-container.section(v-if="MaMapu && Mod === 'Mapa' ")

            Mapa(:PoslanciVstupniData="poslanci" :Velka="true" :Nadpis="false")

          .columns.is-multiline.is-mobile(v-if="['Vse', 'Seznam'].includes(Mod)")

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
              :Soubory="poslanec.Soubory"
              :ZobrazitMandaty="aktualniNastaveniRazeni === 'radit-pocet-mandatu' || aktualniNastaveniRazeni === 'radit-pocet-mandatu-sestupne' "
              class="is-one-third-mobile is-one-third-tablet column is-2-fullhd is-2-widescreen is-one-quarter-desktop"
              )

          .component-footer(v-if="MaButtonMore || MaPaginaci")

            .pagination-bar(v-if="MaPaginaci")
              .to-the-top
                a(href="#" data-scroll-into="true" rel="#scroll-top") Zpět nahoru
              .pagination-list
                a.pagination-list-prev.pagination-item(href="#") &lt;
                .pagination-list-number
                  a.pagination-list-number.pagination-item(href="#") 1
                  a.pagination-list-number.pagination-item(href="#") 2
                  a.pagination-list-number.pagination-item(href="#") 3
                  a.pagination-list-number.pagination-item(href="#") 4
                  a.pagination-list-number.pagination-item(href="#") 5
                .pagination-list-last-number
                  .pagination-item.bullets ...
                  a(href="#").pagination-item 40

                a.pagination-list-next.pagination-item(href="#") &gt;


            .buttons-more(v-if="MaButtonMore")
              NuxtLink(v-if="ButtonMoreLink" :to="ButtonMoreLink").typo-form-button.button-large Zobrazit všechny poslance

              a(v-if="MaButtonMorePrevious" @click="loadPreviousItems()").typo-form-button.button-large Načíst předchozí poslance
              a(v-if="!ButtonMoreLink" @click="loadMoreItems()").typo-form-button.button-large Načíst další poslance

</template>

<style lang="sass" scoped>
.mapa-container-above-list
  @extend %section-padding-h-margin-v
  padding-left: 0
  padding-right: 0

.filter-list-item-value
  &::first-letter
    text-transform: uppercase
.section-title
  @extend %typography-section-title

.info-icon
  display: inline-flex
  justify-content: center
  align-items: center
  content: "i"
  width: 20px
  height: 20px
  background-color: black
  color: #fff
  position: relative
  margin-left: 1em
  top: 4px

  &:hover
    .info-text
      display: block

  .info-text
    background-color: #fff
    color: #000
    min-width: 250px
    border-radius: 5px
    display: none
    position: absolute
    top: 1em
    left: 1em
    padding: 1em 2em
    z-index: 9

.pagination-bar
  display: flex
  justify-content: space-between
  margin-bottom: 3em

  .pagination-item
    text-decoration: none
    min-width: 30px
    text-align: center
    display: inline-block
    border: 1px solid transparent

    &:not(.bullets):hover
      border-color: #000


  .pagination-list
    display: flex
    justify-content: space-between



.statistics-diagram
  display: flex
  justify-content: center
  align-item: center


label.disabled,
input:disabled
  cursor: not-allowed
  pointer-events: none
  opacity: .5


.filter-seznam-bar
  display: flex
  align-item: center
  justify-content: space-between
  margin-bottom: 40px
  font-size: 12px

.custom-select

  $custom-select-width: 260px

  @extend %button

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
const Poslanec = () => import('~/components/Poslanec.vue');
const MultiRangeSlider = () => import('~/components/MultiRangeSlider.vue');
const Mapa = () => import('~/components/Mapa.vue');

export default {
  components: { Mapa, Poslanec, MultiRangeSlider },

  props: [
    'MaButtonMorePrevious',
    'PoslanciVstupniPolozky',
    'PoslanciStatistiky',
    'MaFiltr',
    'MaButtonMore',
    'ButtonMoreLink',
    'MaPaginaci',
    'MaStatistiky',
    'NastaveniFiltrace',
    'UkladatFiltrovanePoslanceDoStore',
    'MaMapu',
    'Nadpis',
    'Mod',
    'MaRazeni',
  ],

  computed: {
    isLoading() {
      return !(this.PoslanciVstupniPolozky?.length > 0 === true);
    },

    filtrNastaveni() {
      return this.NastaveniFiltrace;
    },

    poslanci() {
      return this.currentFilteredPoslanci;
    },

    sidebarButtonToggleStyles() {
      return {
        active: this.isSidebarOpen,
      };
    },
    pocetPoslancuFiltrovanych() {
      return this.poslanci.length;
    },
    pocetPoslancu: function () {
      return this.PoslanciVstupniPolozky.length;
    },
    aktualniNastaveniRazeni() {
      return this.radit.selectedOptionId;
    },
  },

  methods: {
    getFilteredPoslanci() {
      let currentPoslanci = [...this.PoslanciVstupniPolozky];

      if (this.MaFiltr) {
        if (!this.radit.hasBeenSelected) {
          // make zakladni razeni sort filter
          currentPoslanci = [...currentPoslanci].sort((a, b) => (a.Id > b.Id ? 1 : -1));
        }

        if (this.filtrovat.hasBeenSelected) {
          // filter has been set, let us filter poslance

          // here filtering based on the this.filterNastaveni

          currentPoslanci = currentPoslanci.filter((poslanec) => {
            let itemSatisfyFilter = [];

            // filter
            Object.keys(this.filtrNastaveni).forEach((polozkaFiltrKey) => {
              const itemPropertyToTest = this.filtrNastaveni[polozkaFiltrKey].property;

              let tempFilterResults = []; // here will be several boolean variables true or false, we need to get at least one true for the filter item to be true as such and this the item passes the filter

              if (this.filtrNastaveni[polozkaFiltrKey].type !== 'range') {
                const thisFilterItemSelectedItems = this.filtrNastaveni[
                  polozkaFiltrKey
                ].values.filter((item) => item.selected);

                // filter these properties of checkbox and radio buttons

                // filter section either has multiple items for only one item, then the itemPropertyToTest is a string
                // or multiple items for multiple "poslanec" properties, then attribute "property" must be for each filter item as well as "property" for the filter section must be an array

                // we are testing one property with multiple values
                thisFilterItemSelectedItems.forEach((itemFiltervalidator) => {
                  tempFilterResults = [
                    ...tempFilterResults,
                    itemFiltervalidator.validate(poslanec[itemPropertyToTest]),
                  ];
                });

                itemSatisfyFilter = [
                  ...itemSatisfyFilter,
                  tempFilterResults.includes(true),
                ];
              } else {
                // range
                // here we are testing attributes of the given poslanec against the range element and its setting inside this.filtrNastaveni
                // the validator function differs from radio or checkbox elements so that we need the current "min" or "max" value of the given range element

                console.log('validation range', polozkaFiltrKey);

                const thisFilterItemSelectedItems = this.filtrNastaveni[
                  polozkaFiltrKey
                ].values.filter((item) => item.hasOwnProperty('selected'));

                thisFilterItemSelectedItems.forEach((itemFiltervalidator) => {
                  tempFilterResults =
                    itemFiltervalidator.selected === false
                      ? [...tempFilterResults, true]
                      : [
                        ...tempFilterResults,
                        itemFiltervalidator.validate(
                          poslanec[itemPropertyToTest],
                          itemFiltervalidator.currentValue
                        ),
                      ];
                });

                // both min and max must be validated as true in order for the given poslanec to be included in the filtered list
                // threfore, we have to modify the imteSatisfyFilter evaluation for the range element
                // if one false is included, entire validation for the range element is false
                itemSatisfyFilter = [
                  ...itemSatisfyFilter,
                  !tempFilterResults.includes(false),
                ];
              }
            });

            // must be all true

            // new set is just for performance so that ".includes" picks only from max. two array items (true | false)
            // :TODO: but I am not sure if it is necessary for the performance

            return ![...new Set(itemSatisfyFilter)].includes(false);
          });
        }

        if (this.radit.hasBeenSelected) {
          currentPoslanci = this.getRazeniPoslanciSeznam(
            this.radit.selectedOptionId,
            currentPoslanci
          );
        }
      }

      if (this.UkladatFiltrovanePoslanceDoStore) {
        // commit & dispatch
        this.$store.dispatch('setPoslanciFiltrovani', currentPoslanci);
      }

      // return

      return currentPoslanci;
    },

    toggleSidebar() {
      this.isSidebarOpen = this.isSidebarOpen ? false : true;
    },

    toggleSelect() {
      this.radit.isActive = this.radit.isActive ? false : true;
    },

    selectOrderOption(selectedOptionId, selectedOptionText) {
      if (!this.radit.hasBeenSelected) {
        this.radit.hasBeenSelected = true;
      }

      this.radit.selectedOptionId = selectedOptionId;
      this.radit.selectedOptionText = selectedOptionText;
      this.$el
        .querySelectorAll(`.option.selected`)
        .forEach((item) => item.classList.remove('selected'));
      this.$el
        .querySelector(`[data-option-id="${selectedOptionId}"]`)
        .classList.add('selected');

      this.currentFilteredPoslanci = this.getFilteredPoslanci();
    },

    // this functions edits the reactive object this.FiltrNastaveni
    // html elements inside the Sidebar filter will be then automagically, reactivelly re-renders based on the contents of that reactive object this.FiltrNastaveni
    // so there is no need to manually change the DOM html

    // Also poslanci will be automagically re-rendered and filtered also based on the reactivity of the this.FiltrNastaveni object

    // This function merges together this.FilterNastaveni and the whole subproperty of this object
    // This function basically selects which filter items are selected and which not.
    // The filtering as such is done inside the computer property this.poslanci where the whole logic based on this.FilterNastaveni lies
    onSelectFilterOption(
      filtrSekceKey,
      thisObjIndex,
      type,
      multiple,
      sectionHasReset,
      $event
    ) {
      if (!this.filtrovat.hasBeenSelected) {
        this.filtrovat.hasBeenSelected = true;
      }

      const tempResult = this.filtrNastaveni[filtrSekceKey];

      // for checkboxes and radio buttons
      if (type !== 'range') {
        // checkboxes
        if (multiple) {
          if (sectionHasReset) {
            const isItemReset = tempResult.values[thisObjIndex].reset || false;

            tempResult.values.forEach((item, index) => {
              if (isItemReset) {
                item.selected = index === thisObjIndex;
              } else {
                if (index === thisObjIndex) {
                  item.selected = item.selected ? false : true;
                }

                if (item.reset) {
                  item.selected = false;
                }
              }
            });

            // Check if no options are selected, then select vse/reset button
            if (tempResult.values.filter((item) => item.selected).length === 0) {
              tempResult.values.filter((item) => item.reset)[0].selected = true;
            }
          } else {
            tempResult.values[thisObjIndex].selected = tempResult.values[thisObjIndex]
              .selected
              ? false
              : true;
          }
        } else {
          // radio buttons

          tempResult.values.forEach((item, index) => {
            // make a radio button option active if the selected radio button id equals the index within the filter section (the order is the same)
            item.selected = thisObjIndex === index;
          });
        }
      }

      this.currentFilteredPoslanci = this.getFilteredPoslanci();
    },

    getRazeniPoslanciSeznam(selectedOptionId, poslanci) {
      let filteredPoslanci = [...poslanci];

      // Sorting

      if (selectedOptionId === 'radit-datum-narozeni') {
        filteredPoslanci = filteredPoslanci.sort((a, b) =>
          a.DatumNarozeniZobrazene > b.DatumNarozeniZobrazene ? 1 : -1
        );
      }

      if (selectedOptionId === 'radit-datum-narozeni-sestupne') {
        filteredPoslanci = filteredPoslanci.sort((a, b) =>
          a.DatumNarozeniZobrazene < b.DatumNarozeniZobrazene ? 1 : -1
        );
      }

      if (selectedOptionId === 'radit-prijmeni') {
        filteredPoslanci = filteredPoslanci.sort((a, b) => {
          const nameA = a.Prijmeni.toLowerCase();
          const nameB = b.Prijmeni.toLowerCase();

          return nameA > nameB ? 1 : -1;
        });
      }

      if (selectedOptionId === 'radit-prijmeni-sestupne') {
        filteredPoslanci = filteredPoslanci.sort((a, b) => {
          const nameA = a.Prijmeni.toLowerCase();
          const nameB = b.Prijmeni.toLowerCase();

          return nameA < nameB ? 1 : -1;
        });
      }

      if (selectedOptionId === 'radit-pocet-mandatu') {
        filteredPoslanci = filteredPoslanci.sort((a, b) =>
          a.Mandaty.length > b.Mandaty.length ? 1 : -1
        );
      }

      if (selectedOptionId === 'radit-pocet-mandatu-sestupne') {
        filteredPoslanci = filteredPoslanci.sort((a, b) =>
          a.Mandaty.length < b.Mandaty.length ? 1 : -1
        );
      }

      if (selectedOptionId === 'radit-id') {
        filteredPoslanci = filteredPoslanci.sort((a, b) => (a.Id > b.Id ? 1 : -1));
      }

      // commit & dispatch

      this.$store.commit('updatePoslanciFiltrovani', filteredPoslanci);

      return filteredPoslanci;
    },

    onRangeChange(filtrSekceKey, $event) {
      if (!this.filtrovat.hasBeenSelected) {
        this.filtrovat.hasBeenSelected = true;
      }

      const tempResult = this.filtrNastaveni[filtrSekceKey];

      if ($event.values.MinimalniPocetMandatu) {
        tempResult.values[0].currentValue = $event.values.MinimalniPocetMandatu;
        tempResult.values[0].selected =
          tempResult.values[2] !== $event.values.MinimalniPocetMandatu;
      }
      if ($event.values.MaximalniPocetMandatu) {
        tempResult.values[1].currentValue = $event.values.MaximalniPocetMandatu;
        tempResult.values[1].selected =
          tempResult.values[3] !== $event.values.MaximalniPocetMandatu;
      }

      this.currentFilteredPoslanci = this.getFilteredPoslanci();
    },
  },

  created() {
    // :TODO: #5 Check if this is necessary and will be implemented
    if (this.radit.selectedOptionId !== undefined) {
      // we have a default order value set
      let getFilterInDefaults = this.RaditDle.filter(
        (item) => item.id === this.radit.selectedOptionId
      );
      if (getFilterInDefaults.length) {
        const { selectedOptionId, selectedOptionText } = getFilterInDefaults;
        this.$emit('selectOption', { selectedOptionId, selectedOptionText });
      }
    }

    this.currentFilteredPoslanci = [...this.PoslanciVstupniPolozky];
  },

  mounted() {
    this.$sidebar = this.$el.querySelector('.seznam-filter-sidebar');

    if (this.MaPaginaci) {
      const $scrollIntoViewBtn = this.$el.querySelector('[data-scroll-into]');
      $scrollIntoViewBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const $target = this.$el.querySelector(e.currentTarget.getAttribute('rel'));
        $target.scrollIntoView();
      });
    }
  },

  data() {
    return {
      filtrovat: {
        hasBeenSelected: false,
      },
      radit: {
        isActive: false,
        selectedOptionId: undefined,
        selectedOptionText: undefined,
        hasBeenSelected: false,
        RaditDle: [
          { id: 'radit-id', text: 'Základní řazení' },
          { id: 'radit-prijmeni', text: 'Podle příjmení (od A)' },
          { id: 'radit-prijmeni-sestupne', text: 'Podle příjmení (od Z)' },
          { id: 'radit-pocet-mandatu', text: 'Nejméně mandátů' },
          { id: 'radit-pocet-mandatu-sestupne', text: 'Nejvíce mandátů' },
          { id: 'radit-datum-narozeni', text: 'Od nejmladších' },
          { id: 'radit-datum-narozeni-sestupne', text: 'Od nejstarších' },
        ],
        ZakladniPolozka: { id: 'radit-default', text: 'řadit dle' },
      },
      filtrNastaveniAktualniPolozky: {},
      isSidebarOpen: true, // can set a default value
      currentFilteredPoslanci: [],
    };
  },
};
</script>
