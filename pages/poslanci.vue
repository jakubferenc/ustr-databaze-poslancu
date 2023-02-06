<template lang="pug">

.section

  h1.typography-main-title {{ title }}

  .section-padding-h-margin-v
    PoslanciSeznamAPI(
      v-if="poslanci && nastaveniFiltrace && paginaceNastaveni.Celkem"

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
      @doPagination="doPaginationHandler($event)"
      @selectOrderOption="selectOrderOptionHandler($event)"

      @loadPreviousItems="loadPreviousItemsHandler($event)"
      @loadMoreItems="loadMoreItemsHandler($event)"
      @refreshSelectedFilters="refreshSelectedFiltersHandler($event)"
      :NastaveniMapa="nastaveniMapa"
      :MaMapu="true"
      :Nadpis="false"
      :Mod="['list', 'map', 'all']"
      :MaRazeni="true"
      :MaModNavigace="true"
    )

</template>

<script>
import apiModule from '../factories';
import {
  normalizeURLParamsToValueInArrayFormat,
  stringifyQueryForAPI,
  normalizeQueryParamsVariableTypes,
} from '~/utils/functions';
import { poslanciFilterMixin } from '~/mixins/poslanciFilterMixin';
const PoslanciSeznamAPI = () => import('~/components/PoslanciSeznamAPI.vue');

export default {
  components: { PoslanciSeznamAPI },
  mixins: [poslanciFilterMixin],
  data() {
    return {
      title: 'Poslanci',
      defaultQuery: {
        Poslanec: ['true'],
        Limit: [400],
        Stranka: [1],
      },
    };
  },
  destroyed() {
    // you may call unsubscribe to stop the subscription
    if (this.unsubscribe) this.unsubscribe();
  },
  async created() {
    setTimeout(async () => {
      await this.init();
    }, 0);

    this.unsubscribe = this.$store.subscribeAction(async (action, state) => {
      if (action.type === 'resetPoslanci') {
        await this.init(true);
      }
    });
  },

  methods: {
    normalizeURLParamsToValueInArrayFormat,
    stringifyQueryForAPI,
    normalizeQueryParamsVariableTypes,

    async init(reset = false) {
      try {
        this.$store.dispatch('setLoading', { loadingState: true });

        // take URL params at the request time and add them to the request for API
        const routerParams = normalizeURLParamsToValueInArrayFormat(this.$route.query);

        this.currentQuery = Object.assign(
          {},
          this.defaultQuery,
          reset ? {} : routerParams
        );

        // make API requests to get parlaments that will be fixed in the filter
        // also, get API request for poslanci and related filter settings

        // now, we should have both all fixed filter items available, and also all poslanci items with the filter data
        await this.prepareRequestFilteredViaAPI(this.currentQuery);
      } catch (e) {
        console.log(e);
      } finally {
        this.$store.dispatch('setLoading', { loadingState: false });
      }
    },

    async prepareRequestFilteredViaAPI(currentQuery) {
      this.$store.dispatch('setLoading', { loadingState: true });
      this.currentQueryStringified = `?${this.stringifyQueryForAPI(currentQuery)}`;

      await this.$store.dispatch('getParlamentyDatabaze');
      await this.$store.dispatch('getPoslanciAll', this.currentQueryStringified);

      // Defines which params are reacting to the current filter settings
      // But for Parlamenty/Snemovny which must stay fixed
      this.currentFilterData = {
        ...this.$store.state.filter_data, // data, Filtry part from getPoslanciAll() action
        Pohlavi: this.defaultFilterData.Pohlavi.map((item) => item), // default values directly injected into filter data, not from Filtry from getPoslanciAll()
        PoslaneckySlib: this.defaultFilterData.PoslaneckySlib.map((item) => item), // default values directly injected into filter data, not from Filtry from getPoslanciAll()
        Parlamenty: this.$store.state.parlamentyDatabaze, // overwrite the .Parlamenty attribute because we want the parlaments to be fixed all the time and displayed in the filter
      };

      const currentQueryNormalized = normalizeQueryParamsVariableTypes(this.currentQuery);

      this.currentFilterSettings = apiModule.createFilterSettingsForApiUseFactory(
        this.currentFilterData,
        currentQueryNormalized
      );

      this.$router.push({
        path: '/poslanci/',
        query: this.currentQuery,
      });
      this.$store.dispatch('setLoading', { loadingState: false });
    },

    async loadItems(newStranka) {
      const newLimit = parseInt(this.currentQuery.limit) || this.defaultQuery.limit;

      this.currentQuery = {
        ...this.$route.query,
        ...{ stranka: [newStranka] },
        ...{ limit: [newLimit] },
      };

      this.$router.push({
        path: '/poslanci/',
        query: this.currentQuery,
      });

      // call API
      await this.getPoslanciFilteredAPI(this.currentQuery, this.$store);
    },

    async doPaginationHandler($event) {
      this.currentQuery = {
        ...this.currentQuery,
        ...{ Stranka: [$event] },
      };

      // // call API

      await this.prepareRequestFilteredViaAPI(this.currentQuery);
    },

    async selectOrderOptionHandler($event) {
      this.currentQuery = {
        ...this.currentQuery,
        ...{ Razeni: [$event] },
      };

      await this.prepareRequestFilteredViaAPI(this.currentQuery);
    },

    async loadPreviousItemsHandler($event) {
      const newStranka =
        parseInt(this.currentQuery.stranka) - 1 > 0
          ? parseInt(this.currentQuery.stranka) - 1
          : 1;
      this.loadItems(newStranka);
    },

    async loadMoreItemsHandler($event) {
      const newStranka = parseInt(this.currentQuery.stranka) + 1;
      this.loadItems(newStranka);
    },
  },

  computed: {
    nastaveniMapa() {
      return {
        zobrazovatDruhyAdres: [1],
        zvyraznitPoslancePodlePolitickePrislusnosti: {
          enable: false,
          currentSnemovny: null,
        },
      };
    },

    paginaceNastaveni() {
      const Celkem = this.$store.state.filter_data.CelkovyPocetNalezenychZaznamu;
      const Limit = this.currentQuery?.Limit?.[0] || this.defaultQuery.Limit[0];
      const Stranka = this.currentQuery?.Stranka?.[0] || this.defaultQuery.Stranka[0];
      const PocetStranek = Math.ceil(Celkem / Limit);

      return {
        Celkem,
        Limit,
        Stranka,
        PocetStranek,
      };
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
      };
    },
  },

  head() {
    return {
      title: `${this.title} — ${this.$config.globalTitle}`,
      htmlAttrs: {
        class: 'alt-bg',
      },
    };
  },
};
</script>
