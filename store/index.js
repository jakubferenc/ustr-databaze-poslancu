/*
this is where we will eventually hold the data for all of our posts
*/
/*eslint no-unsafe-optional-chaining: "error"*/
import apiFactory from '../factories';
import projectConfig from '../project.config';
import { stripHTMLTags, shuffleArray, dateISOStringToCZFormat } from '../utils/functions';

import {
  getFilterDataFromPoslanciAll,
  normalizeSouborAttrs,
} from '../utils/functions';

export const state = () => ({
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
});
/*
this will update the state with the posts
*/
export const mutations = {

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

    let media_soubory = [];


    if (opts.id) {
      // we want a specific media id

      // check if we have it in the store
      const storeItem = [...state.media_soubory].filter(soubor => soubor.id == opts.id);

      if (storeItem.length && storeItem.length > 0) {
        // return the required item from the store
        return storeItem[0];

      } else {

        // we do not have the item in the store, we need to make the axios call to the API

        try {
          let post = await this.$axios.get(`${projectConfig.wordpressAPIURLWebsite}/wp/v2/media/${opts.id}`);
          post = post.data;

          let media_soubory = [...state.media_soubory, post];

          media_soubory = media_soubory.map(item => {
            return normalizeSouborAttrs(item);
          });

          commit("updateMedia", media_soubory);
          return;

        } catch (err) {
          console.warn(err);
        }

      }

    } else {

      if (state.is_downloaded.media_soubory) {

        return;

      } else {

        try {

          let media_soubory = await apiFactory.getAllMediaFactory(projectConfig.wordpressAPIURLWebsite, projectConfig.databazePoslancuURL, opts.limit);

          commit("updateMedia", media_soubory);
          commit("updateIsDownloaded", 'media_soubory');

        } catch (err) {
          console.warn(err);
        }

      }

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

      let poslanciRequest = await this.$axios.get(`${projectConfig.databazePoslancuURL}/Api/osoby?Limit=${limit}&Stranka=${stranka}&Fotografie=true`);
      poslanciRequest = poslanciRequest.data;

      let poslanci = poslanciRequest.Poslanci;

      let poslanciRequestZeny = await this.$axios.get(`${projectConfig.databazePoslancuURL}/Api/osoby?Limit=${limit}&Stranka=${stranka}&Fotografie=true&Pohlavi=2`);
      poslanciRequestZeny = poslanciRequestZeny.data;

      const poslanciZeny = poslanciRequestZeny.Poslanci;

      poslanci = shuffleArray([...poslanci, ...poslanciZeny]);

      if (filterCallback !== null) {
        poslanci = poslanci.filter(filterCallback);
      }

      poslanci = poslanci
        .map((poslanec) => {

          console.log(poslanec.DatumNarozeni);
          console.log(poslanec.DatumUmrti);

          if (!poslanec.DatumNarozeniZobrazene && poslanec.DatumNarozeni) {
            poslanec.DatumNarozeniZobrazene = dateISOStringToCZFormat(poslanec.DatumNarozeni);
          }

          if (!poslanec.DatumUmrtiZobrazene && poslanec.DatumUmrti) {
            poslanec.DatumUmrtiZobrazene = dateISOStringToCZFormat(poslanec.DatumUmrti);
          }

          return poslanec;

        });

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

  async getPoslanciSeznam({ state, commit, dispatch }, {limit = 20, stranka = 1, filterCallback = null} ) {
    if (state.poslanci.length) return;
    try {

      let poslanci = await this.$axios.get(`${projectConfig.databazePoslancuURL}/Api/osoby?limit=${limit}&stranka=${stranka}`).then(res => res.data);

      if (filterCallback !== null) {
        poslanci = poslanci.filter(filterCallback);
      }

      poslanci = poslanci
        .map((poslanec) => {

          if (poslanec.DatumNarozeniZobrazene !== null) {
            poslanec.DatumNarozeniZobrazene = poslanec.DatumNarozeniZobrazene.split('. ')[2];
          }

          if (poslanec.DatumUmrtiZobrazene !== null) {
            poslanec.DatumUmrtiZobrazene = poslanec.DatumUmrtiZobrazene.split('. ')[2];
          }

          return poslanec;

        });

      commit("updatePoslanci", poslanci);
      dispatch("setPoslanciFiltrovani", poslanci);

    } catch (err) {
      console.warn(err);
    }
  },


  async getPoslanciAll({ state, commit, dispatch }, filtrNastaveniParamsString) {

    try {

      let poslanciRequest = await this.$axios.get(`${projectConfig.databazePoslancuURL}/Api/osoby/${filtrNastaveniParamsString}`);
      poslanciRequest = poslanciRequest.data;

      const poslanci = poslanciRequest.Poslanci;
      const filterData = poslanciRequest.Filtry;


      commit("updatePoslanci", poslanci);
      commit("updateFilterData", filterData);


    } catch (err) {
      console.warn(err);
    }

  },

};


