<template lang="pug">



#scroll-top.poslanci-seznam.seznam-with-filter(v-on="$listeners")

  .mapa-container.section(v-if="MaMapu && Mod === 'Vse' ")

    h2.section-title Místo narození poslanců
      span.section-title-subtitle Mapa se aktualizuje podle zvoleného nastavení filtru


    Mapa(
      v-if="poslanci"
      :PoslanciVstupniData="poslanci"
      :NastaveniMapa="NastaveniMapa"
    )

  .filter-seznam

      h2.section-title(v-if="Nadpis && ['Vse', 'Seznam'].includes(Mod)") {{Nadpis}}

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


        .filter-seznam.bar-right(v-if="MaRazeni")

          span.custom-select(@click="toggleSelect()" :data-has-been-selected="radit.hasBeenSelected" :data-open="radit.isActive")
            span.option-default(:id="radit.ZakladniPolozka.id" :data-option-default-text="radit.ZakladniPolozka.text") <span class="option-default-text">{{radit.ZakladniPolozka.text}}</span> <small class="option-selected-text">{{radit.selectedOptionText}}</small>
            span.options
              span.option(v-for="polozka in radit.RaditDle" :data-option-id="polozka.id"  @click="onSelectOrderOption(polozka.id, polozka.text, polozka.apiId)") {{polozka.text}}


      .seznam-content-container()

        .seznam-filter-sidebar(v-if="MaFiltr" v-show="isSidebarOpen")
          .seznam-filter-sidebar-content

            .seznam-filter-sidebar-content-header
              p.typography-filter-heading Zobrazuje se {{pocetPoslancuFiltrovanych}} z {{PoslanciStatistiky.pocetPoslancu}} <br>poslanců



            .seznam-filter-sidebar-content-section(v-for="filtrSekceKey in Object.keys(filtrNastaveni)" :key="filtrSekceKey" :class="{hidden: isDefaultParlamentSelected && filtrSekceKey == 'SnemovniObdobi'}")

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
                          @click="onSelectFilterOption(filtrSekceKey, valueIndex, filtrNastaveni[filtrSekceKey].multiple, filtrNastaveni[filtrSekceKey].reset, $event)"
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
                  v-on:multi-range-change="onRangeChange($event)"
                  :QueryStructure="filtrNastaveni[filtrSekceKey].queryStructure"
                  :Name="`${filtrSekceKey}`"
                  :Id="`${filtrSekceKey}`"
                  :CurrentMinValue="filtrNastaveni[filtrSekceKey].values[0]"
                  :CurrentMaxValue="filtrNastaveni[filtrSekceKey].values[1]"
                  :MinValue="filtrNastaveni[filtrSekceKey].values[2]"
                  :MaxValue="filtrNastaveni[filtrSekceKey].values[3]"
                )


              //// END sekce
              ////////////////////////////////////////////////////////////////////////////////


        .seznam-filter-list

          .mapa-container.section(v-if="MaMapu && Mod === 'Mapa' ")


            Mapa(v-if="poslanci" :PoslanciVstupniData="poslanci" :NastaveniMapa="NastaveniMapa" :Velka="true")


          .component-footer(v-if="(MaButtonMore || MaPaginaci) && ['Vse', 'Seznam'].includes(Mod)")

            .pagination-bar(v-if="MaPaginaci")
              //- .to-the-top
              //-   a(href="#" data-scroll-into="true" rel="#scroll-top") Zpět nahoru
              .pagination-list
                a.pagination-list-prev.pagination-item( @click="doPagination(1)") &lt; &lt; &nbsp;
                .pagination-list-number(v-for="(pageNumber, index) in Array(PaginaceNastaveni.PocetStranek) ")
                  a.pagination-list-number.pagination-item(:class="{active: PaginaceNastaveni.Stranka == index+1}" @click="doPagination(index+1)") {{index+1}}
                //- .pagination-list-last-number
                //-   .pagination-item.bullets ...
                //-   a( @click="doPagination(index+1)").pagination-item 40

                a.pagination-list-next.pagination-item(@click="doPagination(Array(PaginaceNastaveni.PocetStranek).length)") &nbsp;  &gt;  &gt;


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
              class="is-one-third-mobile is-one-third-tablet column is-2-fullhd is-2-widescreen is-one-quarter-desktop"
              )


          .component-footer(v-if="MaButtonMore || MaPaginaci")

            .pagination-bar(v-if="MaPaginaci")
              //- .to-the-top
              //-   a(href="#" data-scroll-into="true" rel="#scroll-top") Zpět nahoru
              .pagination-list
                a.pagination-list-prev.pagination-item( @click="doPagination(1)") &lt; &lt; &nbsp;
                .pagination-list-number(v-for="(pageNumber, index) in Array(PaginaceNastaveni.PocetStranek) ")
                  a.pagination-list-number.pagination-item(:class="{active: PaginaceNastaveni.Stranka == index+1}" @click="doPagination(index+1)") {{index+1}}
                //- .pagination-list-last-number
                //-   .pagination-item.bullets ...
                //-   a( @click="doPagination(index+1)").pagination-item 40

                a.pagination-list-next.pagination-item(@click="doPagination(Array(PaginaceNastaveni.PocetStranek).length)") &nbsp;  &gt;  &gt;


                a.pagination-list-next.pagination-item(href="#") &nbsp;  &gt;  &gt;


            .buttons-more
              NuxtLink(v-if="MaButtonMore && ButtonMoreLink" :to="ButtonMoreLink").typo-form-button.button-large Zobrazit všechny poslance

              a(v-if="MaButtonMore && MaButtonMorePrevious" @click="loadPreviousItems()").typo-form-button.button-large Načíst předchozí poslance
              a(v-if="MaButtonMore" @click="loadMoreItems()").typo-form-button.button-large Načíst další poslance

</template>

<style lang="sass" scoped>

.section-title

  @extend %typography-section-title


.mapa-container
  margin-bottom: 4em

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

.hidden
  display: none

.seznam-filter-sidebar-content-section-content
  max-height: 300px
  overflow-y: auto

.filter-list
  padding-left: 5px

.pagination-bar

  margin-bottom: 3em

  .pagination-item
    text-decoration: none
    min-width: 30px
    text-align: center
    display: inline-block
    border: 1px solid transparent
    cursor: pointer

    &:not(.bullets).active
      border-color: #000
      background-color: #000
      color: #fff

    &:not(.bullets):hover
      border-color: #000


  .pagination-list
    display: flex
    justify-content: flex-start
    flex-wrap: wrap
    margin-top: 1em




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
const Poslanec = () => import("~/components/Poslanec.vue");
const Mapa = () => import("~/components/Mapa.vue");
const MultiRangeSlider = () => import("~/components/MultiRangeSlider.vue");

import { customLogger, normalizeURLParamsToValueInArrayFormat } from "~/utils/functions";

export default {
  components: { Poslanec, MultiRangeSlider, Mapa },

  props: [
    "MaButtonMorePrevious",
    "PoslanciVstupniPolozky",
    "PoslanciStatistiky",
    "MaFiltr",
    "MaButtonMore",
    "ButtonMoreLink",
    "MaPaginaci",
    "MaStatistiky",
    "NastaveniFiltrace",
    "PaginaceNastaveni",
    "MaMapu",
    "Nadpis",
    "NastaveniMapa",
    "Mod",
    "MaRazeni",
  ],

  computed: {
    isDefaultParlamentSelected() {
      return (
        this.NastaveniFiltrace &&
        this.NastaveniFiltrace?.["Snemovny"]?.values[0]?.selected
      );
    },

    filtrNastaveni() {
      return { ...this.NastaveniFiltrace };
    },

    poslanci() {
      return this.PoslanciVstupniPolozky;
    },

    sidebarButtonToggleStyles() {
      return {
        active: this.isSidebarOpen,
      };
    },
    pocetPoslancuFiltrovanych() {
      return this.poslanci.length;
    },

    aktualniNastaveniRazeni() {
      return this.radit.selectedOptionId;
    },
  },

  methods: {
    getOnlyActiveFilterSectionsWithSelectedValues() {
      const allFilters = { ...this.filtrNastaveni };

      const onlyActivelySelectedFilters = {};

      Object.keys(allFilters).forEach((itemKeyName) => {
        const keyName = itemKeyName;
        const item = allFilters[keyName];

        // check active values for radio or checkboxes
        if (item.type === "radio" || item.type === "checkbox") {
          const activeValues = item.values
            .filter((valueObj) => valueObj.selected === true)
            .map((valueObj) => {
              // if we selected a default option, we won't send the particular section of a filter
              // so that the particular section will not influence the API filtering of the data
              return valueObj.default === true ? null : valueObj.id;
            })
            .filter((item) => item !== null);

          // if (activeValues.length > 1) {
          //   // we have multiple options selected in the filter for the given parameter
          //   // let's make it serialized

          //     activeValues.join(this.$config.router.multipleValuesSeparator);

          // }

          // if the field is not empty, i.e. something is selected for given attribute/parameter, and it's not a default value
          // add the parameter key to the array we will send further
          if (activeValues.length > 0) {
            onlyActivelySelectedFilters[keyName] = activeValues;
          }
        }

        if (item.type === "range") {
          if (item.values[0] !== item.values[2]) {
            onlyActivelySelectedFilters[item.queryStructure[0]] = [item.values[0]];
          }

          if (item.values[1] !== item.values[3]) {
            onlyActivelySelectedFilters[item.queryStructure[1]] = [item.values[1]];
          }
        }
      });

      return onlyActivelySelectedFilters;
    },

    doPagination(index) {
      this.$emit("doPagination", index);
    },

    loadPreviousItems() {
      this.$emit("loadPreviousItems");
    },

    loadMoreItems() {
      this.$emit("loadMoreItems");
    },

    toggleSidebar() {
      this.isSidebarOpen = this.isSidebarOpen ? false : true;
    },

    toggleSelect() {
      this.radit.isActive = this.radit.isActive ? false : true;
    },

    onSelectOrderOption(selectedOptionId, selectedOptionText, apiId) {
      if (!this.radit.hasBeenSelected) {
        this.radit.hasBeenSelected = true;
      }

      this.radit.selectedOptionId = selectedOptionId;
      this.radit.selectedOptionText = selectedOptionText;
      this.$el
        .querySelectorAll(`.option.selected`)
        .forEach((item) => item.classList.remove("selected"));
      this.$el
        .querySelector(`[data-option-id="${selectedOptionId}"]`)
        .classList.add("selected");

      this.$emit("selectOrderOption", apiId);
    },

    onSelectFilterOption(filtrSekceKey, thisObjIndex, multiple, sectionHasReset, $event) {
      if (!this.filtrovat.hasBeenSelected) {
        this.filtrovat.hasBeenSelected = true;
      }

      const tempResult = this.filtrNastaveni[filtrSekceKey]; // by reference

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
        tempResult.values.forEach((item, index) => {
          item.selected = thisObjIndex === index ? true : false;
        });
      }

      const onlyActivelySelectedFilters = this.getOnlyActiveFilterSectionsWithSelectedValues();

      this.$emit("refreshSelectedFilters", onlyActivelySelectedFilters);
    },

    onRangeChange($event) {
      // Process this range

      /// Normalize this range request Query by containing the value with an array, like all other filter values
      const currentRangeQuery = normalizeURLParamsToValueInArrayFormat($event.values);

      // check all other range sliders if the absolute max or min is different from current min or max values
      // if so, add them to the query, because we want it to have it in the URL string

      let onlyActivelySelectedFilters = this.getOnlyActiveFilterSectionsWithSelectedValues();

      onlyActivelySelectedFilters = {
        ...onlyActivelySelectedFilters,
        ...currentRangeQuery,
      };

      this.$emit("refreshSelectedFilters", onlyActivelySelectedFilters);
    },
  },

  mounted() {
    this.$nextTick(() => {
      const timer = setTimeout(() => {
        this.$sidebar = this.$el.querySelector(".seznam-filter-sidebar");

        if (this.MaPaginaci) {
          const $scrollIntoViewBtn = this.$el.querySelector("[data-scroll-into]");

          if ($scrollIntoViewBtn) {
            $scrollIntoViewBtn.addEventListener("click", (e) => {
              e.preventDefault();

              const $target = this.$el.querySelector(e.currentTarget.getAttribute("rel"));
              $target.scrollIntoView();
            });
          }
        }
      }, 500);
    });
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
          { id: "radit-id", text: "Základní řazení", apiId: 0 },
          { id: "radit-prijmeni", text: "Podle příjmení (od A)", apiId: 1 },
          { id: "radit-prijmeni-sestupne", text: "Podle příjmení (od Z)", apiId: 2 },
          { id: "radit-pocet-mandatu", text: "Nejméně mandátů", apiId: 3 },
          { id: "radit-pocet-mandatu-sestupne", text: "Nejvíce mandátů", apiId: 4 },
          { id: "radit-datum-narozeni", text: "Datum narození", apiId: 9 },
          {
            id: "radit-datum-narozeni-sestupne",
            text: "Datum narození(Sestupně)",
            apiId: 10,
          },
          { id: "radit-datum-umrti", text: "Datum úmrtí", apiId: 11 },
          { id: "radit-datum-umrti-sestupne", text: "Datum úmrtí (Sestupně)", apiId: 12 },
          { id: "radit-datum-narozeni-mandat", text: "Věk na začátku mandátu", apiId: 5 },
          {
            id: "radit-datum-narozeni-mandat-sestupne",
            text: "Věk na začátku mandátu (Sestupně)",
            apiId: 6,
          },
          {
            id: "radit-datum-narozeni-konec-mandatu",
            text: "Věk na konci mandátu",
            apiId: 7,
          },
          {
            id: "radit-datum-narozeni-konec-mandatu-sestupne",
            text: "Věk na konci mandátu (Sestupně)",
            apiId: 8,
          },
        ],
        ZakladniPolozka: { id: "radit-default", text: "řadit dle" },
      },
      PoslanciFiltrovani: [],
      isSidebarOpen: true, // can set a default value
    };
  },
};
</script>
