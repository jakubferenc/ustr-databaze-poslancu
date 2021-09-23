/*
this is where we will eventually hold the data for all of our posts
*/
/*eslint no-unsafe-optional-chaining: "error"*/
import apiFactory from '../factories';
import projectConfig from '../project.config';

const normalizeUstrApiMediaObjectForWordpress = (soubor) => {

  // http://parliament.ustrcr.cz/Api/Help/Api/GET-soubory_Limit_Stranka_Mime

  soubor.url = soubor.URLNahled;
  soubor.title = soubor.Poznamka;
  soubor.mime_type = soubor.Mime;

  return soubor;

};

const normalizeMediaAttrs = (item) => {

  if (!item.sizes) {
    if (item.media_details) {
      item.sizes = item.media_details.sizes;
    }
  }

  return item;

};

const getAdresaDruhHumanReadableName = (adresaDruhNumber) => {

  if (adresaDruhNumber == 1) {
    return 'Místo narození';
  }

  if (adresaDruhNumber == 2) {
    return 'Adresa bydliště při zvolení';
  }

  if (adresaDruhNumber == 3) {
    return 'Adresa bydliště při začátku mandátu';
  }

  if (adresaDruhNumber == 4) {
    return 'Adresa bydliště při svatbě';
  }

  if (adresaDruhNumber == 5) {
    return 'Adresa bydliště při úmrtí';
  }

  if (adresaDruhNumber == 6) {
    return 'Místo hrobu';
  }

  if (adresaDruhNumber == 255) {
    return 'Ostatní typ adresy';
  }

};

const getAdresyProMapuForPoslanec = (poslanec) => {


  let adresyPolozky = [];
  let adresyMandaty = [];

  if (poslanec.Adresy) {
    adresyPolozky = [...adresyPolozky, ...poslanec.Adresy.map((adresa) => {

      adresa.DruhNazev = getAdresaDruhHumanReadableName(adresa.Druh);

      return adresa;

    })];
  }

  if (poslanec.Mandaty && poslanec.Mandaty.length > 0) {


    poslanec.Mandaty.forEach((mandat, index) => {

      if (mandat.AdresyVykonMandatu) {
        adresyMandaty = [...adresyMandaty, ...mandat.AdresyVykonMandatu
          .filter(adresa => adresa.Druh != 1 && adresa.Druh != 5)
          .map((adresa) => {
          adresa._mandatId = mandat.Id;
          adresa.Parlament = mandat.Parlament;
          adresa.DatumZacatkuZobrazene = mandat.DatumZacatkuZobrazene;
          adresa.DatumKonceZobrazene = mandat.DatumKonceZobrazene;
          adresa.DruhNazev = getAdresaDruhHumanReadableName(adresa.Druh);
          adresa.DruhTyp = 'AdresaVykonMandatu';
          return adresa;
        })];
      }
      if (mandat.AdresyZvoleni) {
        adresyMandaty = [...adresyMandaty, ...mandat.AdresyZvoleni
          .filter(adresa => adresa.Druh != 1 && adresa.Druh != 5)
          .map((adresa) => {
          adresa._mandatId = mandat.Id;
          adresa.Parlament = mandat.Parlament;
          adresa.DatumZacatkuZobrazene = mandat.DatumZacatkuZobrazene;
          adresa.DatumKonceZobrazene = mandat.DatumKonceZobrazene;
          adresa.DruhNazev = getAdresaDruhHumanReadableName(adresa.Druh);
          adresa.DruhTyp = 'AdresaZvoleni';
          return adresa;
        })];
      }

    });

    console.info("adresyMandaty", adresyMandaty);



  }

  return [...adresyPolozky, ...adresyMandaty];


};

const getCasovaOsaDataForPoslanec = (poslanec) => {


  let casovaOsaPolozky = [];

  if (poslanec.DatumNarozeni) {

    casovaOsaPolozky = [...casovaOsaPolozky, {

      datum_udalosti: poslanec.DatumNarozeni.split("T")[0],
      dulezita: true,
      nazev_udalosti: `Datum narození ${poslanec.DatumNarozeniZobrazene}`,

    }];

  }

  if (poslanec.DatumUmrti) {

    casovaOsaPolozky = [...casovaOsaPolozky, {

      datum_udalosti: poslanec.DatumUmrti.split("T")[0],
      dulezita: true,
      nazev_udalosti: 'Datum úmrtí',

    }];

  }

  if (poslanec.Mandaty) {

    const casovePolozkyMandatyCalculated = poslanec.Mandaty.reduce((acc, mandat, index) => {

      if (mandat.DatumZacatku) {

        acc.push({

          datum_udalosti: mandat.DatumZacatku.split("T")[0],
          dulezita: false,
          nazev_udalosti: `Začátek mandátu (${mandat.DatumZacatkuZobrazene || 'Neuvedeno'} — ${mandat.DatumKonceZobrazene || 'Neuvedeno'})`,

        });

      }

      if (mandat.DatumKonce) {

        acc.push({

          datum_udalosti: mandat.DatumKonce.split("T")[0],
          dulezita: false,
          nazev_udalosti: `Konec mandátu (${mandat.DatumZacatkuZobrazene || 'Neuvedeno'} — ${mandat.DatumKonceZobrazene || 'Neuvedeno'})`,

        });

      }


      return acc;

    }, []);

    casovaOsaPolozky = [...casovaOsaPolozky,...casovePolozkyMandatyCalculated];


  }



  casovaOsaPolozky = casovaOsaPolozky.sort((a, b) => (a.datum_udalosti > b.datum_udalosti) ? 1 : (a.datum_udalosti < b.datum_udalosti ) ? -1 : 0);

  return casovaOsaPolozky;


};

const getFilterDataFromPoslanciAll = (poslanci) => {

  // the values must fit the API points and data formats!

  let filterData = {};

  let nabozenske_vyznani = [];
  let narodnosti = [];
  let mandaty = [];
  let parlamenty = [];
  let maFotku = [];
  let maGalerii = [];
  let maPrimarniSocialniVazby = [];
  let maSekundarniSocialniVazby = [];

  let vysoka_skola = [];
  let maji_vysokou_skolu = [];

  poslanci.forEach((item) => {

    const nabozenstvi_edited = (item.NabozenstviNarozeni === null || Array.isArray(item.NabozenstviNarozeni)) ? 'neuvedeno' : item.NabozenstviNarozeni;
    const narodnosti_edited = (item.Narodnosti === null || !Array.isArray(item.Narodnosti)) ? 'neuvedeno' : item.Narodnosti;

    const mandaty_edited = (item.Mandaty === null || !Array.isArray(item.Mandaty)) ? 'neuvedeno' : item.Mandaty;
    const soubory_edited = (item.Soubory === null) ? [] : item.Soubory;

    const vztahy_primarni_edited = (item.OsobniVztahyPrimarni === null) ? [] : item.OsobniVztahyPrimarni;
    const vztahy_sekundarni_edited = (item.OsobniVztahySekundarni === null) ? [] : item.OsobniVztahySekundarni;

    const parlamenty_edited = (item.Mandaty === null || !Array.isArray(item.Mandaty)) ? 'neuvedeno' : item.Mandaty.map(mandat => mandat.Parlament);

    nabozenske_vyznani.push(nabozenstvi_edited);

    if (Array.isArray(narodnosti_edited)) {
      narodnosti.push(...narodnosti_edited);
    } else {
      narodnosti.push(narodnosti_edited);
    }

    if (Array.isArray(parlamenty_edited)) {
      parlamenty.push(...parlamenty_edited);
    } else {
      parlamenty.push(parlamenty_edited);
    }

    maji_vysokou_skolu.push(item.UniverzitniVzdelani);


    if (Array.isArray(mandaty_edited )) {
      mandaty.push(mandaty_edited.length);
    } else {
      mandaty.push(0);
    }

    maFotku.push(soubory_edited.length);
    maGalerii.push(soubory_edited.length > 1);
    maPrimarniSocialniVazby.push(vztahy_primarni_edited.length);
    maSekundarniSocialniVazby.push(vztahy_sekundarni_edited.length);

  });

  // make unique values
  nabozenske_vyznani = [...new Set(nabozenske_vyznani)].sort((a,b) => a.toString().localeCompare(b));
  narodnosti = [...new Set(narodnosti)].sort((a,b) => a.toString().localeCompare(b));
  mandaty = [...new Set(mandaty)];
  parlamenty = [...new Set(parlamenty)];

  maji_vysokou_skolu = [...new Set(maji_vysokou_skolu)].includes(true);


  maFotku = [...new Set(maFotku)];
  maGalerii = [...new Set(maGalerii)];
  maPrimarniSocialniVazby = [...new Set(maPrimarniSocialniVazby)];
  maSekundarniSocialniVazby = [...new Set(maSekundarniSocialniVazby)];


  filterData = {
    pocet: poslanci.length,
    nabozenske_vyznani,
    narodnosti,
    mandaty,
    parlamenty,
    maFotku,
    maGalerii,
    maPrimarniSocialniVazby,
    maSekundarniSocialniVazby,
  };


  return filterData;

};


export const state = () => ({
  slovnikova_hesla: [],
  parlamenty: [],
  poslanec: {},
  poslanci: [],
  poslanci_filtrovani: [],
  filter_data: {
    filterData: {},
    filterSettings: {},
  },
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


  async getRodinySocialniMapy ({ state, commit }, ctx) {

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

      let casova_osa = await this.$axios.get(`${projectConfig.wordpressAPIURLWebsite}/wp/v2/casova_osa?_embed&per_page=100`);

      casova_osa = casova_osa.data;

      casova_osa = casova_osa
      .filter(el => el.status === "publish")
      .sort((a, b) => (a.casova_osa_datum > b.casova_osa_datum) ? 1 : (a.casova_osa_datum < b.casova_osa_datum ) ? -1 : 0) // sort from the lowest date, format yyyy-mm-dd
      .map(({ id, slug, title, date, content, casova_osa_datum, _embedded, casova_osa_dulezita }) => ({
        id,
        slug,
        title: title.rendered,
        date,
        content: content.rendered,
        casova_osa_rok: casova_osa_datum.split('-')[0],
        casova_osa_datum,
        featured_image: (_embedded) ? _embedded['wp:featuredmedia'][0].media_details : null,
        featured_image_description: (_embedded) ?_embedded['wp:featuredmedia'][0].title.rendered : null,
        casova_osa_dulezita,
      }));


      commit("updateCasovaOsa", casova_osa);

    } catch (err) {

      console.warn(err);

    }
  },

  async getSlovnikovaHesla({ state, commit }) {

    if (state.slovnikova_hesla.length) return;

    try {

      let slovnikova_hesla = await this.$axios.get(`${projectConfig.wordpressAPIURLWebsite}/wp/v2/slovnik?per_page=100`);

      slovnikova_hesla = slovnikova_hesla.data;

      slovnikova_hesla = slovnikova_hesla
      .filter(el => el.status === "publish")
      .map(({ id, slug, title, date, content }) => ({
        id,
        slug,
        title,
        date,
        content,
      }));

      commit("updateSlovnikovaHesla", slovnikova_hesla);

    } catch (err) {

      console.warn(err);

    }
  },

  async getMedia({ state, commit }, opts = {limit: 100, id: false} ) {

    // ÚSTR custom API reference — http://parliament.ustrcr.cz/Api/Help/Api/GET-soubory_Limit_Stranka_Mime
    // Wordpress media REST API reference — https://developer.wordpress.org/rest-api/reference/media/#list-media

    let media_soubory = [];


    if (opts.id) {
      // we want a specific media id

      // check if we have it in the store
      const storeItems = [...state.media_soubory];
      const storeItem = storeItems.filter(soubor => soubor.id == opts.id);

      if (storeItem.length && storeItem.length > 0) {
        // return the required item from the store
        return storeItem[0];

      } else {

        // we do not have the item in the store, we need to make the axios call to the API

        try {
          let post = await this.$axios.get(`${projectConfig.wordpressAPIURLWebsite}/wp/v2/media/${opts.id}?embed`);
          post = post.data;

          let media_soubory = [...state.media_soubory, post];

          commit("updateMedia", media_soubory);
          return;

        } catch (err) {
          console.warn(err);
        }

      }

    } else {

      if (state.is_downloaded.media_soubory) {
        return state.media_soubory;
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


    let snemovniObdobiObj = undefined;


    // check if the id is already in the store, if so, return it and do not do axios call
    const getDetailObjectIfExists = state.snemovni_obdobi.filter(item => item.Id === snemovniObdobiId);

    if (getDetailObjectIfExists.length) {

      snemovniObdobiObj = getDetailObjectIfExists;

      commit("updateSnemovniObdobiDetail", snemovniObdobiObj);

    } else {

      // object is not either in the snemovni obdobi detail object, not is it in the global snemovni obdobi array
      // therefore, we need to do API call

      try {

        snemovniObdobiObj = await this.$axios.get(`${projectConfig.databazePoslancuURL}/Api/snemovni-obdobi/${snemovniObdobiId}`);
        snemovniObdobiObj = snemovniObdobiObj.data;

        snemovniObdobiObj.Nazev = snemovniObdobiObj.Nazev.split('|')[0];
        snemovniObdobiObj.PocetPoslancu = snemovniObdobiObj.Poslanci.length;

        // prepare statistics, make them integer
        snemovniObdobiObj.SnemovniObdobiStatistikaZacatek.PrumernyVekPoslancu = parseInt(snemovniObdobiObj.SnemovniObdobiStatistikaZacatek.PrumernyVekPoslancu);
        snemovniObdobiObj.SnemovniObdobiStatistikaZacatek.ProcentoMuzu = parseInt(snemovniObdobiObj.SnemovniObdobiStatistikaZacatek.ProcentoMuzu);
        snemovniObdobiObj.SnemovniObdobiStatistikaZacatek.ProcentoVysokoskolaku = parseInt(snemovniObdobiObj.SnemovniObdobiStatistikaZacatek.ProcentoVysokoskolaku);


        snemovniObdobiObj.SnemovniObdobiStatistikaKonec.PrumernyVekPoslancu = parseInt(snemovniObdobiObj.SnemovniObdobiStatistikaKonec.PrumernyVekPoslancu);
        snemovniObdobiObj.SnemovniObdobiStatistikaKonec.ProcentoMuzu = parseInt(snemovniObdobiObj.SnemovniObdobiStatistikaKonec.ProcentoMuzu);
        snemovniObdobiObj.SnemovniObdobiStatistikaKonec.ProcentoVysokoskolaku = parseInt(snemovniObdobiObj.SnemovniObdobiStatistikaKonec.ProcentoVysokoskolaku);


        let snemovniObdobiObjWpData = await this.$axios.get( `${projectConfig.wordpressAPIURLWebsite}/wp/v2/snemovni_obdobi?per_page=100`);
        snemovniObdobiObjWpData = snemovniObdobiObjWpData.data;

        // get wordpress content referenced via Id
        let thisWPSnemovniObdobiObj = snemovniObdobiObjWpData.filter((item) => parseInt(item.databaze_id) == snemovniObdobiId);


        if (thisWPSnemovniObdobiObj.length && thisWPSnemovniObdobiObj === 1) {

          snemovniObdobiObjWpData = thisWPSnemovniObdobiObj[0];

          snemovniObdobiObj.Popis = snemovniObdobiObjWpData.content.rendered;
          snemovniObdobiObj.WPNazev = snemovniObdobiObjWpData.title.rendered;
          snemovniObdobiObj.StrucnyPopis = snemovniObdobiObjWpData.excerpt.rendered;

          if (snemovniObdobiObjWpData.acf && snemovniObdobiObjWpData.acf.casova_osa) {
            snemovniObdobiObj.CasovaOsa = snemovniObdobiObjWpData.acf.casova_osa;

            // sort by date
            snemovniObdobiObj.CasovaOsa.sort();

            // add auto generated beginning and the end date of the snemovni obdobi

            /*
            {
              "datum_udalosti": "1968-01-01",
              "nazev_udalosti": "Test událost",
              "dulezita": [
              "true"
              ]
            },


            const beginningOfTheSnemovniObdobiObj = {
              "datum_udalosti": snemovniObdobiObj.DatumZacatku.split('T')[0],
              "nazev_udalosti": "Začátek sněmovny",
              "dulezita": [
              "true"
              ]
            };

            const endOfTheSnemovniObdobiObj = {
              "datum_udalosti": snemovniObdobiObj.DatumKonce.split('T')[0],
              "nazev_udalosti": "Konec sněmovny",
              "dulezita": [
              "true"
              ]
            };

            snemovniObdobiObj.CasovaOsa = [beginningOfTheSnemovniObdobiObj, ...snemovniObdobiObj.CasovaOsa, endOfTheSnemovniObdobiObj];
            */

          }

          if (snemovniObdobiObjWpData.acf && snemovniObdobiObjWpData.acf.galerie) {

            snemovniObdobiObj.Galerie = snemovniObdobiObjWpData.acf.galerie;

          }

          snemovniObdobiObj.UvodniFotografie = false;

          if (snemovniObdobiObjWpData.acf && snemovniObdobiObjWpData.acf.uvodni_fotografie) {

            snemovniObdobiObj.UvodniFotografie = snemovniObdobiObjWpData.acf.uvodni_fotografie.sizes.medium_large;

          }

        }

        commit("addSnemovniObdobi", snemovniObdobiObj);
        commit("updateSnemovniObdobiDetail", snemovniObdobiObj);


      } catch (err) {
        console.warn(err);
      }

    }


  },

  async getParlamenty({ state, commit }) {
    if (state.parlamenty.length) return;
    try {

      let parlamenty = await this.$axios.get(`${projectConfig.databazePoslancuURL}/Api/snemovny/seznam`);
      parlamenty = parlamenty.data;

      let parlamentyWPData = await this.$axios.get( `${projectConfig.wordpressAPIURLWebsite}/wp/v2/parlamentni_telesa?per_page=100`);
      parlamentyWPData = parlamentyWPData.data;

      parlamenty = await Promise.all(parlamenty.map(async (parlament) => {

        const getSnemovniObdobi = await this.$axios.get(`${projectConfig.databazePoslancuURL}/Api/snemovny/${parlament.Id}`);

        parlament.SnemovniObdobi = getSnemovniObdobi.data.SnemovniObdobi;

        // get wordpress content referenced via Id
        let thisWPParlamentObj = parlamentyWPData.filter((item) => item.databaze_id == parlament.Id);


        // checking potential errors
        if (!thisWPParlamentObj.length) {
          throw new Error(`There is not Wordpress Parlament object matching the id from the main database. Parlament.Id is: ${parlament.Id}. 'Parlament name is: ${parlament.Nazev}`);
          return;
        }

        if (thisWPParlamentObj.length > 1) {
          throw new Error(`There are more than one Wordpress Parlament objects matching the id from the main database. Parlament.Id is: ${parlament.Id}. 'Parlament name is: ${parlament.Nazev}`);
          return;
        }

        thisWPParlamentObj = thisWPParlamentObj[0];
        parlament.Popis = thisWPParlamentObj.content.rendered;
        parlament.WPNazev = thisWPParlamentObj.title.rendered;
        parlament.StrucnyPopis = thisWPParlamentObj.excerpt.rendered;

        parlament.Barva = thisWPParlamentObj.barva;

        if (thisWPParlamentObj.acf && thisWPParlamentObj.acf.casova_osa) {
          parlament.CasovaOsa = thisWPParlamentObj.acf.casova_osa;

          // sort by date
          parlament.CasovaOsa.sort();

          const beginningOfParlamentObj = {
            "datum_udalosti": parlament.SnemovniObdobi[0].DatumZacatku.split('T')[0],
            "nazev_udalosti": "Začátek parlamentního tělesa",
            "dulezita": [
            "true"
            ]
          };

          const endOfParlamentObj = {
            "datum_udalosti": parlament.SnemovniObdobi[parlament.SnemovniObdobi.length-1].DatumKonce.split('T')[0],
            "nazev_udalosti": "Konec parlamentního tělesa",
            "dulezita": [
            "true"
            ]
          };

          parlament.CasovaOsa = [beginningOfParlamentObj, ...parlament.CasovaOsa, endOfParlamentObj];


        }

        if (thisWPParlamentObj.acf && thisWPParlamentObj.acf.galerie) {

          parlament.Galerie = thisWPParlamentObj.acf.galerie;

        }

        return parlament;

      }));

      commit("updateParlamenty", parlamenty);


    } catch (err) {
      console.warn(err);
    }
  },

  async getPoslanciHomepage({ state, commit }, {limit = 20, stranka = 1, filterCallback = null} ) {
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

    try {

      let poslanec = await this.$axios.get(`${projectConfig.databazePoslancuURL}/Api/osoby/${poslanecId}`);

      poslanec = poslanec.data;

      // prepare data for casova osa
      poslanec.CasovaOsa = getCasovaOsaDataForPoslanec(poslanec);

      poslanec.AdresyProMapu = getAdresyProMapuForPoslanec(poslanec);


      commit("updatePoslanecDetail", poslanec);


    } catch (err) {
      console.warn(err);
    };

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


  async getPoslanciAll({ state, commit, dispatch }) {

    if (state.poslanci.length) return;

    try {

      let poslanci = await this.$axios.get(`${projectConfig.databazePoslancuURL}/Api/osoby?Poslanec=true&Limit=99999`).then(res => res.data);

      const filterData = getFilterDataFromPoslanciAll(poslanci);

      commit("updatePoslanci", poslanci);
      commit("updateFilterData", filterData);


    } catch (err) {
      console.warn(err);
    }

  },

};


