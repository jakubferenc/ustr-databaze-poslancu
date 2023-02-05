<template lang="pug">

.section

  .typography-title-container
    h1.is-title.typography-main-title {{ title }}
    h2.is-title.typography-page-subtitle Mapy stranické příslušnosti propojují údaje o poslancích jednotlivých zastupitelských sborů, místa jejich narození a politickou příslušností vyjádřenou buď volební stranou nebo členstvím v politické straně, což se týká poslanců a poslankyň zvolených do Ústavodárného Národního shromáždění republiky Československé, Národního shromáždění ČSR/ČSSR, obou sněmoven Federálního shromáždění ČSSR/ČSFR a České národní rady. V případě těchto parlamentních těles existuje totiž pouze jedna volební strana (Národní fronta), a tudíž by její zobrazení nepřineslo žádnou novou informaci.

  .section-padding-h-margin-v.smaller-vertical-margin-only

    PoslanciSeznamAPI(

      v-if="poslanci && nastaveniFiltrace && paginaceNastaveni.Celkem"

      :PoslanciVstupniPolozky="poslanci"
      :NastaveniFiltrace="nastaveniFiltrace"
      :PoslanciStatistiky="poslanciStatistiky"
      :MaPaginaci="false"
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
      :IsLoading="isGlobalLoading"
      :Nadpis="false"
      :MaRazeni="false"
      :MaMapu="true"
      :Mod="['map', 'list', 'all']"
      :NastaveniMapa="nastaveniMapa"
      :MaModNavigace="true"
    )

</template>

<script>
import apiModule from '../factories';
import { mapGetters } from 'vuex';
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
      title: 'Interaktivní mapy stranické příslušnosti',
      defaultQuery: {
        Poslanec: ['true'],
        Limit: [8000],
        Stranka: [1],
      },
    };
  },
  async created() {
    try {
      this.$store.dispatch('setLoading', { loadingState: true });
      const routerParams = normalizeURLParamsToValueInArrayFormat(this.$route.query); // take URL params at the request time and add them to the request for API

      this.currentQuery = Object.assign({}, this.defaultQuery, routerParams);

      // make API requests to get parlaments that will be fixed in the filter
      // also, get API request for poslanci and related filter settings

      // now, we should have both all fixed filter items available, and also all poslanci items with the filter data

      await this.prepareRequestFilteredViaAPI(this.currentQuery);
    } catch (e) {
      console.error(e);
    } finally {
      this.$store.dispatch('setLoading', { loadingState: false });
    }
  },

  methods: {
    normalizeURLParamsToValueInArrayFormat,
    stringifyQueryForAPI,
    normalizeQueryParamsVariableTypes,

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

      this.currentFilterSettings = apiModule.createFilterSettingsForApiUseParliamentMapsFactory(
        this.currentFilterData,
        currentQueryNormalized
      );

      this.$router.push({
        path: '/snemovny-mapy/',
        query: this.currentQuery,
      });
      this.$store.dispatch('setLoading', { loadingState: false });
    },
  },

  computed: {
    ...mapGetters({
      isGlobalLoading: 'getLoadingState',
    }),
    nastaveniMapa() {
      return {
        zobrazovatDruhyAdres: [1],
        zvyraznitPoslancePodlePolitickePrislusnosti: {
          enable: true,
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
