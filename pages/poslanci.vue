<template lang="pug">

  .section

    h1.typography-main-title {{ title }}

    .section-padding-h-margin-v

      PoslanciSeznam(
        v-if="poslanci"

        :PoslanciVstupniPolozky="poslanci"
        :NastaveniFiltrace="nastaveniFiltrace"
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

const PoslanciSeznam = () => import('~/components/PoslanciSeznam.vue');
const ParlamentyData = () => import('~/data/parlamenty.json').then(m => m.default || m);

export default {

    components: { PoslanciSeznam },

    async asyncData({params, error, payload, store, $config}) {

      try {

        if (!$config.useFileCachedAPI) {
          await store.dispatch("getParlamenty");

          return {
            parlamenty: this.$store.state.parlamenty,
          }

        } else {

          const parlamentyRes = await ParlamentyData();

          return {
            parlamenty: parlamentyRes,
          }

        }


      } catch (err) {
        console.warn(err);
      }

    },

    created() {


    },


    async fetch() {

      const queryObj = {
        ...this.defaultQuery,
        ...this.$route.query,

      };

      this.currentQuery = queryObj;

      await this.getPoslanciFilteredAPI(this.currentQuery, this.$store);

    },


    methods: {


      async getPoslanciFilteredAPI(currentQuery, $store) {

        console.log("calling API with these parameters: ", currentQuery);

        await $store.dispatch("getPoslanciAll", this.currentQuery);

        // the values must fit the API points and data formats!

      },

      cleanUpQueryParams(queryObj = {} /* :Object */) /* :Object */ {

        let filteredQueryParams = Object.keys(queryObj).filter(key => queryObj[key][0] !== null).reduce((prev, curr) => {

          if (queryObj[curr].length === 1) {
            // is not a real array with multiple items, just a single item put in an array as a container to have all values uniformed as arrays
            prev[curr] = queryObj[curr][0];

          } else if (Array.isArray(queryObj[curr]) && queryObj[curr].length > 1) {
            // it's a real array with multiple values
            // make it string separated by a separator given in the config
            prev[curr] = queryObj[curr].join(this.$config.router.multipleValuesSeparator);
          }

          return prev;

        }, {});

        return filteredQueryParams;

      },

       refreshSelectedFiltersHandler($event) {

        const newLimit = parseInt(this.currentQuery.limit) || this.defaultQuery.limit;
        const activeFilterItems = $event;

        console.log("params when filter changed activeFilterItems", activeFilterItems);

        const queryObj = {
          ...this.$route.query,
          ...activeFilterItems,
          ...{ limit: [newLimit]},
        };

        console.log("params when filter changed queryObj", queryObj);


        const filteredQueryParams = this.cleanUpQueryParams(queryObj);
        this.currentQuery = filteredQueryParams;


        this.$router.push({
          path: '/poslanci/',
          query: this.currentQuery
        });

        // call API
        this.getPoslanciFilteredAPI(this.currentQuery, this.$store);

      },


      async loadItems(newStranka) {

        const newLimit = parseInt(this.currentQuery.limit) || this.defaultQuery.limit;

        const queryObj = {
          ...this.$route.query,
          ...{ stranka: [newStranka]},
          ...{ limit: [newLimit]},
        };


        const filteredQueryParams = this.cleanUpQueryParams(queryObj);
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


    computed: {

      parlamentySimple() {

        return this.parlamenty.map(item => {

          return {

            Id: item.Id,
            Nazev: item.Nazev,

          };

        });

      },

      poslanci() {


        return this.$store.state.poslanci;


      },

       nastaveniFiltrace() {

        const {nabozenske_vyznani, narodnosti, maji_vysokou_skolu} = this.$store.state.filter_data;

        const parlamenty = this.parlamentySimple;

        return apiModule.createFilterSettingsForAPIFactory(nabozenske_vyznani, narodnosti, parlamenty, maji_vysokou_skolu);


       },

    },

    data() {
      return {
        currentQuery: {},
        defaultQuery: {
          limit: [40],
          stranka: [1],
          parlamentni_telesa: ['vse-parlamenty'],
          pohlavi: [null]
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


