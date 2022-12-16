/*
this is where we will eventually hold the data for all of our posts
*/
/*eslint no-unsafe-optional-chaining: "error"*/
import apiFactory from '../factories';
import projectConfig from '../project.config';
import { dateISOStringToCZFormat } from '../utils/functions';

import {
  getFilterDataFromPoslanciAll,
  normalizeSouborAttrs,
} from '../utils/functions';

export const state = () => ({
  is_loading: false,
  slovnikova_hesla: [],
  parlamenty: [],
  parlamentyDatabaze: [],
  poslanec: {},
  poslanci: [],
  poslanci_filtrovani: [],
  filter_data: {},
  poslanci_filter_data: {},
  poslanci_homepage: [],
  poslanci_statistiky: {},
  media_soubory: [],
  poslanci_seznam_razeni_id: undefined,
  stranky: [],
  snemovni_obdobi: [],
  snemovni_obdobi_detail: {},
  casova_osa: [],
  popup_timeline_detail: {},
  rodiny_socialni_mapy: [],
  is_downloaded: {
    stranky: false,
    snemovni_obdobi: false,
    media_soubory: false
  },
  search_nav: false,
});

export const getters = {
  getPoslanciHomepage: (state) => state.poslanci_homepage,
  getSearchNavStatus: (state) => state.search_nav,
  getLoadingState: (state) => state.is_loading,
  getSouboryHomepage: (state) => [...state.media_soubory].slice(0, 20),
};

/*
this will update the state with the posts
*/
export const mutations = {

  updateLoadingState: ( state, loadingState ) => {

    state.is_loading = loadingState;

  },

  updateSearchNavState: ( state, search_nav ) => {

    state.search_nav = search_nav;

  },

  updateFilterData: ( state, filter_data ) => {

    state.filter_data = filter_data;

  },

  updatePoslanecDetail: ( state, poslanec ) => {

    state.poslanec = poslanec;

  },

  updateRodinySocialniMapy: (state, rodiny_socialni_mapy) => {
    state.rodiny_socialni_mapy = rodiny_socialni_mapy;
  },

  updateStranky: (state, stranky) => {
    state.stranky = stranky;
  },
  updateCasovaOsa: (state, casova_osa) => {
    state.casova_osa = casova_osa;
  },
  updateSlovnikovaHesla: (state, slovnikova_hesla) => {
    state.slovnikova_hesla = slovnikova_hesla;
  },
  addSnemovniObdobi: (state, snemovni_obdobi) => {
    state.snemovni_obdobi = [...state.snemovni_obdobi, snemovni_obdobi];
  },
  updateSnemovniObdobiDetail: (state, snemovni_obdobi) => {
    state.snemovni_obdobi_detail = snemovni_obdobi;
  },
  updateParlamenty: (state, parlamenty) => {
    state.parlamenty = parlamenty;
  },

  updateParlamentyDatabaze: (state, parlamenty) => {
    state.parlamentyDatabaze = parlamenty;
  },

  updatePoslanciStatistiky: (state, poslanci_statistiky) => {
    state.poslanci_statistiky = poslanci_statistiky;
  },

  updatePoslanci: (state, poslanci) => {
    state.poslanci = poslanci;
  },

  updatePoslanciFiltrovani: (state, poslanci_filtrovani) => {
    state.poslanci_filtrovani = poslanci_filtrovani;
  },

  updatePoslanciRazeniID: (state, poslanci_seznam_razeni_id) => {
    state.poslanci_seznam_razeni_id = poslanci_seznam_razeni_id;
  },

  updatePoslanciHomepage: (state, poslanci) => {
    state.poslanci_homepage = poslanci;
  },
  updateMedia: (state, media_soubory) => {
    state.media_soubory = media_soubory;
  },
  updatePopupTimelineDetail: (state, popup_timeline_detail) => {
    state.popup_timeline_detail = popup_timeline_detail;
  },
  updateIsDownloaded(state, object_name) {
    state.is_downloaded[object_name] = true;
  }
};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {

  setLoading ({ state, commit }, loadingState) {
    try {
      commit("updateLoadingState", loadingState);
    } catch (err) {
      console.warn(err);
    }
  },

  searchNavToggle ({ state, commit }, { searchState }) {
    try {
      commit("updateSearchNavState", searchState);

    } catch (err) {
      console.warn(err);
    }
  },


  setPopupTimelineDetail ({ state, commit }, popup_timeline_detail) {
    try {

      commit("updatePopupTimelineDetail", popup_timeline_detail);

    } catch (err) {
      console.warn(err);
    }
  },


  setPoslanciFiltrovani ({ state, commit, dispatch }, poslanci_filtrovani) {
    try {

      commit("updatePoslanciFiltrovani", poslanci_filtrovani);
      dispatch("countPoslanciStatistiky");

    } catch (err) {
      console.warn(err);
    }
  },


  async getRodinySocialniMapy ({ state, commit }) {

    if (state.rodiny_socialni_mapy.length) return;

    try {

      const rodiny = await apiFactory.getRodinySocialniMapyFactory(projectConfig.wordpressAPIURLWebsite, projectConfig.databazePoslancuURL);


      commit("updateRodinySocialniMapy", rodiny);

    } catch (err) {
      console.warn(err);
    }
  },

  async getStranky ({ state, commit }) {

    if (state.stranky.length) return;

    try {

      const stranky = await apiFactory.getAllStrankyFactory(projectConfig.wordpressAPIURLWebsite);

      commit("updateStranky", stranky);

    } catch (err) {
      console.warn(err);
    }
  },

  async getCasovaOsa({ state, commit }) {

    if (state.casova_osa.length) return;

    try {

      const casova_osa = await apiFactory.getCasovaOsaFactory(projectConfig.wordpressAPIURLWebsite);

      commit("updateCasovaOsa", casova_osa);

    } catch (err) {

      console.warn(err);

    }
  },

  async getSlovnikovaHesla({ state, commit }) {

    try {

      const slovnikova_hesla = await apiFactory.getSlovnikovaHeslaFactory(projectConfig.wordpressAPIURLWebsite);

      commit("updateSlovnikovaHesla", slovnikova_hesla);

    } catch (err) {

      console.warn(err);

    }
  },

  async getMedia({ state, commit }, opts = {limit: 100, id: false} ) {

    // Wordpress media REST API reference — https://developer.wordpress.org/rest-api/reference/media/#list-media

    if (state.is_downloaded.media_soubory) return;


    try {

      const media_soubory = await apiFactory.getAllMediaFactory(projectConfig.wordpressAPIURLWebsite, projectConfig.databazePoslancuURL, opts.limit);

      commit("updateMedia", media_soubory);
      commit("updateIsDownloaded", 'media_soubory');

    } catch (err) {
      console.warn(err);
    }



  },

  async getSnemovniObdobiDetail({ state, commit }, { snemovniObdobiId }) {


    try {

      const snemovniObdobiObj = await apiFactory.getSnemovniObdobiDetailFactory(projectConfig.wordpressAPIURLWebsite, projectConfig.databazePoslancuURL, snemovniObdobiId);

      commit("addSnemovniObdobi", snemovniObdobiObj);
      commit("updateSnemovniObdobiDetail", snemovniObdobiObj);

    } catch (err) {

      console.warn(err);

    }



  },

  async getParlamentyDatabaze({ state, commit }) {

    if (state.parlamentyDatabaze.length) return;

    const parlamenty = await apiFactory.getParlamentyDatabazeFactory(projectConfig.databazePoslancuURL);

    commit("updateParlamentyDatabaze", parlamenty);

  },

  async getParlamenty({ state, commit }) {

    if (state.parlamenty.length) return;

    const parlamenty = await apiFactory.getParlamentyFactory(projectConfig.wordpressAPIURLWebsite, projectConfig.databazePoslancuURL);

    commit("updateParlamenty", parlamenty);


  },

  async getPoslanciHomepage({ state, commit }, {limit = 20, stranka = 1, filterCallback = null} ) {
    if (state.poslanci.length) return;

    try {

      const poslanci = await apiFactory.getPoslanciHomepageFactory(projectConfig.databazePoslancuURL, {limit, stranka, filterCallback,});
      commit("updatePoslanciHomepage", poslanci);

    } catch (err) {
      console.warn(err);
    }
  },

  countPoslanciStatistiky({ state, commit, dispatch }) {

    let poslanciStatistiky = {};

    // Remove all items with Age == 0
    let poslanciFiltered = state.poslanci_filtrovani.filter((item) => typeof item.Vek == 'number');

    poslanciStatistiky.averageAge = Math.round(poslanciFiltered.reduce((total, next) => total + next.Vek, 0) / poslanciFiltered.length);
    poslanciStatistiky.oldestAge = Math.round(Math.max(...poslanciFiltered.map(o => o.Vek), 0));
    poslanciStatistiky.lowestAge = Math.round(Math.min(...poslanciFiltered.map(o => o.Vek)));

    const arrTempMaleOnlyLength = poslanciFiltered.filter((item) => item.Pohlavi === 1).length;
    poslanciStatistiky.percentageMale =  Math.round(arrTempMaleOnlyLength / (poslanciFiltered.length / 100));

    const arrTempHasUniversityDegree = poslanciFiltered.filter((item) => item.UniverzitniVzdelani == true).length;
    poslanciStatistiky.percentageHasUniversityDegree = Math.round(arrTempHasUniversityDegree / (poslanciFiltered.length / 100));

    const arrTempHasMoreThanOneMandate = poslanciFiltered.filter((item) => item.Mandaty.length > 1).length;
    poslanciStatistiky.percentageHasMoreThanOneMandate = Math.round(arrTempHasMoreThanOneMandate / (poslanciFiltered.length / 100));


    commit("updatePoslanciStatistiky", poslanciStatistiky);

  },

  async getPoslanecDetail({ state, commit, dispatch }, {poslanecId}) {

    // :TODO: get cached poslanec if already in the store
    // :TODO: cache via http cache?

    const poslanec = await apiFactory.getPoslanecDetailFactory(projectConfig.databazePoslancuURL, poslanecId);

    commit("updatePoslanecDetail", poslanec);


  },

  async getPoslanciAll({ state, commit, dispatch }, filtrNastaveniParamsString) {

    try {

      let poslanciRequest = await this.$axios.get(`${projectConfig.databazePoslancuURL}/Api/osoby/${filtrNastaveniParamsString}`);
      poslanciRequest = poslanciRequest.data;

      let poslanci = poslanciRequest.Poslanci;
      const filterData = poslanciRequest.Filtry;


      poslanci = poslanci
        .map((poslanec) => {

          if (!poslanec.DatumNarozeniZobrazene && poslanec.DatumNarozeni) {
            poslanec.DatumNarozeniZobrazene = dateISOStringToCZFormat(poslanec.DatumNarozeni);
          }

          if (!poslanec.DatumUmrtiZobrazene && poslanec.DatumUmrti) {
            poslanec.DatumUmrtiZobrazene = dateISOStringToCZFormat(poslanec.DatumUmrti);
          }

          return poslanec;

        });


      commit("updatePoslanci", poslanci);
      commit("updateFilterData", filterData);


    } catch (err) {
      console.warn(err);
    }

  },

  async resetPoslanci({ state, commit, dispatch }) {

    try {

      commit("updatePoslanci", []);
      commit("updateFilterData", []);

    } catch (err) {
      console.warn(err);
    }

  },

};


