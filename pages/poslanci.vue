<template lang="pug">

.section

  h1.typography-main-title {{ title }}

  .section-padding-h-margin-v

    PoslanciSeznamAPI(

      v-if="poslanci && nastaveniFiltrace"

      :PoslanciVstupniPolozky="poslanci"
      :NastaveniFiltrace="nastaveniFiltrace"
      :PoslanciStatistiky="poslanciStatistiky"
      :MaPaginaci="true"
      :MaFiltr="true"
      :MaStatistiky="false"
      :MaButtonMore="false"
      :ButtonMoreLink="false"
      :PaginaceNastaveni="paginaceNastaveni"
      :MaButtonMorePrevious="this.currentQuery.stranka > 1"
      v-on:doPagination="doPaginationHandler($event)"
      v-on:selectOrderOption="selectOrderOptionHandler($event)"

      v-on:loadPreviousItems="loadPreviousItemsHandler($event)"
      v-on:loadMoreItems="loadMoreItemsHandler($event)"
      v-on:refreshSelectedFilters="refreshSelectedFiltersHandler($event)"

      :MaMapu="true"
      Nadpis="Poslanci"
      Mod="Vse"
      :MaRazeni="true"
    )

</template>


<script>

import apiModule from '../factories';

import {customLogger, normalizeURLParamsToValueInArrayFormat} from '~/utils/functions'

const PoslanciSeznamAPI = () => import('~/components/PoslanciSeznamAPI.vue');


const normalizeQueryParamsVariableTypes = (queryParams) => {

  // transform string boolean to real boolean
  // transform string numbers to real numbers

  let queryParamsNormalized = {...queryParams};

  Object.keys(queryParamsNormalized).forEach((key) => {

    if (Array.isArray(queryParams[key])) {

      queryParamsNormalized[key] = [...queryParamsNormalized[key]].map((item) => {


        if (item === 'true' || item === true) {
          return true;
        } else if (item === 'false' || item === false) {

          return false;

        } else if (!Number.isNaN(Number(item))) {

          return parseInt(item);

        }


      });

    }

  });

  return queryParamsNormalized;

}

export default {

    components: { PoslanciSeznamAPI },

    async fetch() {

      const routerParams = normalizeURLParamsToValueInArrayFormat(this.$route.query); // take URL params at the request time and add them to the request for API

      this.currentQuery = Object.assign({}, this.defaultQuery, routerParams);

      // make API requests to get parlaments that will be fixed in the filter
      // also, get API request for poslanci and related filter settings


      // now, we should have both all fixed filter items available, and also all poslanci items with the filter data

      await this.prepareRequestFilteredViaAPI(this.currentQuery);

    },


    methods: {

      async prepareRequestFilteredViaAPI(currentQuery) {


        this.currentQueryStringified = `?${this.stringifyQueryForAPI(currentQuery)}`;


        await this.$store.dispatch("getParlamentyDatabaze");

        await this.$store.dispatch("getPoslanciAll", this.currentQueryStringified);

        // Defines which params are reacting to the current filter settings
        // But for Parlamenty/Snemovny which must stay fixed

        this.currentFilterData = {
          ...this.$store.state.filter_data, // data, Filtry part from getPoslanciAll() action
          Pohlavi: this.defaultFilterData.Pohlavi.map(item => item), // default values directly injected into filter data, not from Filtry from getPoslanciAll()
          PoslaneckySlib: this.defaultFilterData.PoslaneckySlib.map(item => item), // default values directly injected into filter data, not from Filtry from getPoslanciAll()
          Parlamenty: this.$store.state.parlamentyDatabaze, // overwrite the .Parlamenty attribute because we want the parlaments to be fixed all the time and displayed in the filter
        };

        const currentQueryNormalized = normalizeQueryParamsVariableTypes(this.currentQuery);


        this.currentFilterSettings = apiModule.createFilterSettingsForApiUseFactory(this.currentFilterData, currentQueryNormalized);


        this.$router.push({
          path: '/poslanci/',
          query: this.currentQuery
        });


      },


      stringifyQueryForAPI(query = {}) {


        let finalQueryString = '';

        Object.keys(query).forEach((key, index) => {

          const thisPrefix = (index === 0) ? '' : '&';

          const thisItem = query[key];


          if (thisItem.length === 1) {

            // it's a single value param
            finalQueryString = finalQueryString + `${thisPrefix}${key}=${thisItem[0]}`;

          }

          if (thisItem.length >= 2) {

            // it's a multiple value param
            // we need to iterate over it and add for each value the same Key=value string because of how API is designed
            // for example: to get multiple names, you need "Name=Jakub&Name=Josef&name=Anežka"
            thisItem.forEach((subItem, subIndex) => {

              const thisPrefix = (index == 0 && subIndex == 0) ? '' : '&';

              finalQueryString = finalQueryString + `${thisPrefix}${key}=${subItem}`;

            });


          }


        });

        return finalQueryString;



      },

      async refreshSelectedFiltersHandler($event) {

        const activeFilterItems = $event;


        this.currentQuery = {
          ...this.defaultQuery,
          ...activeFilterItems,
        };

        // // call API
        await this.prepareRequestFilteredViaAPI(this.currentQuery);

      },


      async loadItems(newStranka) {


        const newLimit = parseInt(this.currentQuery.limit) || this.defaultQuery.limit;

        this.currentQuery = {
          ...this.$route.query,
          ...{ stranka: [newStranka]},
          ...{ limit: [newLimit]},
        };

        this.$router.push({
          path: '/poslanci/',
          query: this.currentQuery
        });

        // call API
        await this.getPoslanciFilteredAPI(this.currentQuery, this.$store);

      },


      async doPaginationHandler($event) {

        this.currentQuery = {
          ...this.currentQuery,
          ...{ Stranka: [$event]},

        };

        // // call API

        await this.prepareRequestFilteredViaAPI(this.currentQuery);

      },

      async selectOrderOptionHandler($event) {

        this.currentQuery = {
          ...this.currentQuery,
          ...{ Razeni: [$event]},
        };

        await this.prepareRequestFilteredViaAPI(this.currentQuery);

      },

      async loadPreviousItemsHandler($event) {

        const newStranka = parseInt(this.currentQuery.stranka) - 1 > 0 ? parseInt(this.currentQuery.stranka) - 1: 1;
        this.loadItems(newStranka);

      },

      async loadMoreItemsHandler($event) {

        const newStranka = parseInt(this.currentQuery.stranka) + 1;
        this.loadItems(newStranka);


      }

    },


    computed: {

      paginaceNastaveni() {

        const Celkem = this.$store.state.filter_data.CelkovyPocetNalezenychZaznamu;
        const Limit = this.currentQuery.Limit[0] || this.defaultQuery.Limit[0];
        const Stranka = this.currentQuery.Stranka[0] || this.defaultQuery.Stranka[0];
        const PocetStranek = Math.ceil(Celkem / Limit);

        return {
          Celkem,
          Limit,
          Stranka,
          PocetStranek,
        }

      },

      poslanci() {

        return this.$store.state.poslanci || [];


      },

       nastaveniFiltrace() {

         return this.currentFilterSettings;

       },

       poslanciStatistiky() {

         return {

           pocetPoslancu: this.$store.state.filter_data.CelkovyPocetNalezenychZaznamu,


         }

       },

    },

    data() {
      return {
        currentQueryStringified: '',
        currentFilterSettings: {},
        defaultFilterSettings: {},
        defaultFilterData: {
          PoslaneckySlib: [true, false],
          Pohlavi: [1, 2]
        },
        currentFilterData: {},
        currentQuery: {},
        defaultQuery: {
          Poslanec: ['true'],
          Limit: [400],
          Stranka: [1],
        },
        title: `Seznam poslanců`,
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.globalTitle}`,
        htmlAttrs: {
          class: 'alt-bg'
        }
      }
    }

}
</script>


