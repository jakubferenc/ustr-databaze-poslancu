<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    .section-padding-h-margin-v

      PoslanciSeznamAPI(

        v-if="poslanci && nastaveniFiltrace"

        :PoslanciVstupniPolozky="poslanci"
        :NastaveniFiltrace="nastaveniFiltrace"
        :PoslanciStatistiky="poslanciStatistiky"
        :MaPaginaci="false"
        :MaFiltr="true"
        :MaStatistiky="false"
        :MaButtonMore="true"
        :ButtonMoreLink="false"
        :MaFiltrPresAPI="true"
        :MaButtonMorePrevious="this.currentQuery.stranka > 1"

        v-on:loadPreviousItems="loadPreviousItemsHandler($event)"
        v-on:loadMoreItems="loadMoreItemsHandler($event)"
        v-on:refreshSelectedFilters="refreshSelectedFiltersHandler($event)"
      )


</template>


<script>

import apiModule from '../factories';

const PoslanciSeznamAPI = () => import('~/components/PoslanciSeznamAPI.vue');

const normalizeURLParamsToValueInArrayFormat = (routeURLParams) => {

  // immutable, modern way to iterate object and make the value inside an array v => [v]
  return Object.fromEntries(Object.entries(routeURLParams).map(([k, v]) => [k, [v] ]));

};

export default {

    components: { PoslanciSeznamAPI },

    async fetch() {

      // data variable accessible for api calls and other work here

      this.currentQuery = {
        ...this.defaultQuery,
        ...normalizeURLParamsToValueInArrayFormat(this.$route.query), // take URL params at the request time and add them to the request for API
      };

      // make API requests to get parlaments that will be fixed in the filter
      // also, get API request for poslanci and related filter settings

      await this.$store.dispatch("getParlamentyDatabaze");

      this.currentQueryStringified = `?${this.stringifyQueryForAPI(this.currentQuery)}`;
      await this.$store.dispatch("getPoslanciAll", this.currentQueryStringified);

      // now, we should have both all fixed filter items available, and also all poslanci items with the filter data


      this.defaultFilterData = this.currentFilterData = {
        ...this.$store.state.filter_data,
      };

      this.defaultFilterSettings = this.currentFilterSettings = apiModule.createFilterSettingsForApiUseFactory(this.currentFilterData, this.currentQuery);

    },


    methods: {

      async prepareRequestFilteredViaAPI(currentQuery, $store) {

        this.currentQueryStringified = `?${this.stringifyQueryForAPI(currentQuery)}`;

        await this.$store.dispatch("getParlamentyDatabaze");

        await this.$store.dispatch("getPoslanciAll", this.currentQueryStringified);

        // Defines which params are reacting to the current filter settings
        // But for Parlamenty/Snemovny which must stay fixed


        this.currentFilterData = {
          ...this.$store.state.filter_data,
          Pohlavi: this.defaultFilterData.Pohlavi.map(item => item),
          Parlamenty: this.$store.state.parlamentyDatabaze, // overwrite the .Parlamenty attribute because we want the parlaments to be fixed all the time and displayed in the filter
        };


        this.currentFilterSettings = apiModule.createFilterSettingsForApiUseFactory(this.currentFilterData, this.currentQuery);


        this.$router.push({
          path: '/poslanci/',
          query: this.currentQuery
        });


      },

      cleanUpNullQueryParamsFromFilter(queryObj = {} /* :Object */) /* :Object */ {


        let filteredQueryParams = {};


        Object.keys(queryObj).forEach((key) => {

          if (Array.isArray(queryObj[key])) {


              const paramSingleValue = queryObj[key][0];

              // only add attributes that have a selected value
              if (paramSingleValue != undefined && paramSingleValue != null) {

                filteredQueryParams[key] = queryObj[key];

              }


          } else {

            throw new Error('Filter params must be enclosed in an array!');
          }

        });

        return filteredQueryParams;

      },

      stringifyQueryForAPI(query = {}) {


        let finalQueryString = '';

        Object.keys(query).forEach((key) => {

          const thisItem = query[key];

          if (thisItem.length == 1) {

            // it's a single value param
            finalQueryString = finalQueryString + `&${key}=${thisItem[0]}`;

          }

          if (thisItem.length >= 2) {

            // it's a multiple value param
            // we need to iterate over it and add for each value the same Key=value string because of how API is designed
            // for example: to get multiple names, you need "Name=Jakub&Name=Josef&name=Anežka"
            thisItem.forEach((subItem) => {

              finalQueryString = finalQueryString + `&${key}=${subItem}`;

            });


          }


        });

        return finalQueryString;



      },

      async refreshSelectedFiltersHandler($event) {

        const activeFilterItems = $event;

        console.log("Poslanci, event: refreshSelectedFiltersHandler, data: ", activeFilterItems);

        this.currentQuery = {
          ...this.defaultQuery,
          // ...normalizeURLParamsToValueInArrayFormat(this.$route.query), // take URL params at the request time and add them to the request for API
          ...this.cleanUpNullQueryParamsFromFilter(activeFilterItems),
        };

        // // call API

        await this.prepareRequestFilteredViaAPI(this.currentQuery, this.$store);

      },


      async loadItems(newStranka) {


        const newLimit = parseInt(this.currentQuery.limit) || this.defaultQuery.limit;


        const queryObj = {
          ...this.$route.query,
          ...{ stranka: [newStranka]},
          ...{ limit: [newLimit]},
        };


        const filteredQueryParams = this.cleanUpNullQueryParamsFromFilter(queryObj);
        this.currentQuery = filteredQueryParams;

        this.$router.push({
          path: '/poslanci/',
          query: this.currentQuery
        });

        // call API
        await this.getPoslanciFilteredAPI(this.currentQuery, this.$store);

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

    created() {


    },


    computed: {

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
        defaultFilterData: {},
        currentFilterData: {},
        currentQuery: {},
        defaultQuery: {
          Poslanec: [true],
          Limit: [100],
          Stranka: [1]
        },
        title: `Poslanci`,
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


