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
      :MaMapu="true"
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
    )

</template>
<style lang="sass">

  @use "sass:math"

  .section-title

    @extend %typography-section-title


</style>

<script>


import apiModule from '../factories';

import {customLogger, normalizeURLParamsToValueInArrayFormat} from '~/utils/functions'

let leafletObj;
let leafletObjMarkerCluster;

if (process.client) {

  leafletObj = () => import("leaflet");
  leafletObjMarkerCluster = () => import("leaflet.markercluster");

}

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
          path: '/poslanci-mapy/',
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

        customLogger("from refreshSelectedFiltersHandler", activeFilterItems);

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
          path: '/poslanci-mapy/',
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

    mounted() {



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
        mapInstance: null,
        mapSettings: {

          popup: {

            html: (item) => {

              let snemovniObdobiString = '';

              const imageContent = (item.ProfilovaFotka && item.ProfilovaFotka !== '') ? `
                <img src="${item.ProfilovaFotka}" class="map-person-thumb-head-icon-image" />
              ` : `<div class="map-person-thumb-head-icon-image">

                  <svg xmlns="http://www.w3.org/2000/svg" width="90" height="98" viewBox="0 0 90 98">
                    <g id="user-filled-person-shape-svgrepo" transform="translate(-3.577)">
                      <g id="Group_1365" data-name="Group 1365" transform="translate(3.578)">
                        <path id="Path_409" data-name="Path 409" d="M47.893,47.221c11.768,0,21.341-10.592,21.341-23.611S59.66,0,47.893,0,26.55,10.592,26.55,23.61,36.125,47.221,47.893,47.221Z" transform="translate(-2.965)"/>
                        <path id="Path_410" data-name="Path 410" d="M73.431,44.123a3.059,3.059,0,0,0-3.236,1.355A26.435,26.435,0,0,1,48.577,58.2,26.432,26.432,0,0,1,26.961,45.478a3.059,3.059,0,0,0-3.244-1.354C6.914,47.777,2.485,72.8,3.792,93.115a3.024,3.024,0,0,0,3.035,2.811h83.5a3.024,3.024,0,0,0,3.034-2.811C94.673,72.775,90.241,47.74,73.431,44.123Z" transform="translate(-3.578 2.074)"/>
                      </g>
                    </g>
                  </svg>



              </div>`;

              return `


                  <a class="is-map-card person-poslanec-card" href="/poslanec/${item.Id}/">

                    <div class="content-container">

                      <div class="header">
                        <div class="full-name">${item.Jmeno} ${item.Prijmeni}</div>
                      </div>

                      <div class="content">
                        <div class="desc">
                          <p>Narození: ${item.DatumNarozeniZobrazene} — Úmrtí: ${item.DatumUmrtiZobrazene}</p>

                          <div class="map-card__content__address">${item.Nazev}</div>
                          <div class="map-card__content__address__meta">GPS lokace: ${item.GeoX} ${item.GeoY}</div>
                          <div class="map-card__footer">Zobrazit detail poslance →</div>
                        </div>



                      </div>


                    </div>

                    <div class="image-container">${imageContent}</div>

                  </a>


              `;


            }
          },
          addresses: {
            cluster: {
              className: 'map__marker map__marker--cluster',
              iconSize: 30,
            },
            iconLargePerson: {
              className: 'map__marker map__marker--address',
              iconSize: 50,
              popupAnchor: [-200, 95],
              tooltip: {
                direction: 'bottom',
                offset: { x: 0, y: 20 },
              },
              html: (item, index) => {

                const start = `<div class="map__marker__container map-address-icon map-person-thumb-head-icon">`;
                const end = `</div>`;

                let content = '';

                if (item.ProfilovaFotka) {


                  content = `<img class="map-person-thumb-head-icon-image" src="${item.ProfilovaFotka}" alt="Fotografie osoby ${item.Jmeno} ${item.Prijmeni}">`;


                } else {
                  content = `

                    <svg xmlns="http://www.w3.org/2000/svg" width="88.772" height="95.926" viewBox="0 0 88.772 95.926">
                      <g id="user-filled-person-shape-svgrepo" transform="translate(-3.577)">
                        <g id="Group_1365" data-name="Group 1365">
                          <path id="Path_409" data-name="Path 409" d="M47.893,47.221c11.768,0,21.341-10.592,21.341-23.611S59.66,0,47.893,0,26.55,10.592,26.55,23.61,36.125,47.221,47.893,47.221Z"/>
                          <path id="Path_410" data-name="Path 410" d="M72.477,44.123a3,3,0,0,0-3.192,1.355A26.016,26.016,0,0,1,47.962,58.2a26.013,26.013,0,0,1-21.32-12.722,3,3,0,0,0-3.2-1.354C6.868,47.777,2.5,72.8,3.789,93.115a3,3,0,0,0,2.994,2.811h82.36a3,3,0,0,0,2.993-2.811C93.429,72.775,89.057,47.74,72.477,44.123Z"/>
                        </g>
                      </g>
                    </svg>

                  `;
                }

                return `${start} ${content} ${end}`;


              }
            },
            zIndex: 9,
          },
        },
        mapMarkers: [],
        mapBoundingBox: [],
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
          Limit: [300],
          Stranka: [1],
        },
        title: `Poslanci`,
      }
    },

    head () {
      return {
        title: `${this.title} — ${this.$config.public.globalTitle}`,
          link: [
            {
              rel:'stylesheet',
              href:'//unpkg.com/leaflet/dist/leaflet.css'
            },
            {
              rel:'stylesheet',
              href:'https://unpkg.com/browse/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css'
            },
            {
              rel:'stylesheet',
              href:'//api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css'
            },
          ],
        htmlAttrs: {
          class: 'alt-bg'
        }
      }
    }

}
</script>


