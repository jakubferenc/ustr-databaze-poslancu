/*
this is where we will eventually hold the data for all of our posts
*/

const wordpressAPIURLWebsite = 'http://ustr-databaze-poslancu.jakubferenc.cz/wp-json';
const databazePoslancuURL = 'http://parliament.ustrcr.cz';


export const state = () => ({
  slovnikova_hesla: [],
  parlamenty: [],
  poslanci: [],
  poslanci_homepage: [],
  poslanci_statistiky: {},
  media_soubory: [],
  poslanci_seznam_razeni_id: undefined,
  stranky: [],
});
/*
this will update the state with the posts
*/
export const mutations = {
  updateStranky: (state, stranky) => {
    state.stranky = stranky;
},
  updateSlovnikovaHesla: (state, slovnikova_hesla) => {
    state.slovnikova_hesla = slovnikova_hesla;
  },
  updateParlamenty: (state, parlamenty) => {
    state.parlamenty = parlamenty;
  },
  updatePoslanci: (state, poslanci) => {
    state.poslanci = poslanci;
  },
  updatePoslanciStatistiky: (state, poslanci_statistiky) => {
    state.poslanci_statistiky = poslanci_statistiky;
  },
  updatePoslanciRazeniID: (state, poslanci_seznam_razeni_id) => {
    state.poslanci_seznam_razeni_id = poslanci_seznam_razeni_id;
  },
  updatePoslanciHomepage: (state, poslanci) => {
    state.poslanci_homepage = poslanci;
  },
  updateMedia: (state, media_soubory) => {
    state.media_soubory = media_soubory;
  }
};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {

  async getStranky ({ state, commit }) {

    if (state.stranky.length) return;

    try {

      let stranky = await fetch(`${wordpressAPIURLWebsite}/wp/v2/pages?_embed`)
      .then(res => res.json());

      stranky = stranky
        .filter(page => page.status === "publish")
        .map(({ id, date, slug, title, content, excerpt, _embedded }) => ({
          id: id,
          date: date,
          slug: slug,
          title: title.rendered,
          content: content.rendered,
          excerpt: excerpt.rendered,
          featured_image: _embedded['wp:featuredmedia'][0].media_details,
          author: _embedded.author /* will return an array of authors and their meta data */
        }));

      commit("updateStranky", stranky);

    } catch (err) {
      console.log(err);
    }
  },

  async getSlovnikovaHesla({ state, commit }) {
    if (state.slovnikova_hesla.length) return;
    try {
      let slovnikova_hesla = await fetch( `${wordpressAPIURLWebsite}/wp/v2/slovnik?per_page=100`
      ).then(res => res.json());
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
      console.log(err);
    }
  },

  async getMedia({ state, commit }) {
    if (state.media_soubory.length) return;
    try {
      let media_soubory = await this.$axios.get(`${databazePoslancuURL}/Api/soubory?limit=100`)
      .then(res => res.data);


        console.log(media_soubory);
      commit("updateMedia", media_soubory);
    } catch (err) {
      console.log(err);
    }
  },

  async getParlamenty({ state, commit }) {
    if (state.parlamenty.length) return;
    try {

      let parlamenty = await this.$axios.get(`${databazePoslancuURL}/Api/snemovny/seznam`);
      parlamenty = parlamenty.data;

      parlamenty = await Promise.all(parlamenty.map(async (parlament) => {

        const getSnemovniObdobi = await this.$axios.get(`${databazePoslancuURL}/Api/snemovny/${parlament.Id}`);
        parlament.SnemovniObdobi = getSnemovniObdobi.data.SnemovniObdobi;

        return parlament;

      }));

      commit("updateParlamenty", parlamenty);


    } catch (err) {
      console.log(err);
    }
  },

  async getPoslanciHomepage({ state, commit }, {limit = 20, stranka = 1, filterCallback = null} ) {
    if (state.poslanci.length) return;
    try {

      let poslanci = await this.$axios.get(`${databazePoslancuURL}/Api/osoby?limit=${limit}&stranka=${stranka}`).then(res => res.data);

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
      console.log(err);
    }
  },

  countPoslanciStatistiky({ state, commit, dispatch }) {

    let poslanciStatistiky = {};

    // Remove all items with Age == 0
    let poslanciFiltered = state.poslanci.filter((item) => typeof item.Vek == 'number');

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

  raditPoslanciSeznam({ state, commit }, {selectedOptionId, selectedOptionText, Namespace}) {

    let filteredPoslanci = null;

    if (selectedOptionId === 'radit-datum-narozeni') {

      filteredPoslanci = [...state.poslanci].sort((a, b) => (a.DatumNarozeniZobrazene > b.DatumNarozeniZobrazene) ? 1 : -1);

    }

    if (selectedOptionId === 'radit-datum-narozeni-sestupne') {

      filteredPoslanci = [...state.poslanci].sort((a, b) => (a.DatumNarozeniZobrazene < b.DatumNarozeniZobrazene) ? 1 : -1);

    }

    if (selectedOptionId === 'radit-prijmeni') {

      filteredPoslanci = [...state.poslanci].sort((a, b) => {
        const nameA = a.Prijmeni.toLowerCase();
        const nameB = b.Prijmeni.toLowerCase();

        return (nameA > nameB) ? 1 : -1;

      });

    }

    if (selectedOptionId === 'radit-prijmeni-sestupne') {

      filteredPoslanci = [...state.poslanci].sort((a, b) => {
        const nameA = a.Prijmeni.toLowerCase();
        const nameB = b.Prijmeni.toLowerCase();

        return (nameA < nameB) ? 1 : -1;

      });

    }

    if (selectedOptionId === 'radit-pocet-mandatu') {

      filteredPoslanci = [...state.poslanci].sort((a, b) => (a.Mandaty.length > b.Mandaty.length) ? 1 : -1);

    }

    if (selectedOptionId === 'radit-pocet-mandatu-sestupne') {

      filteredPoslanci = [...state.poslanci].sort((a, b) => (a.Mandaty.length < b.Mandaty.length) ? 1 : -1);

    }

    if (selectedOptionId === 'radit-id') {

      filteredPoslanci = [...state.poslanci].sort((a, b) => (a.Id > b.Id) ? 1 : -1);

    }

    commit("updatePoslanci", filteredPoslanci);
    commit("updatePoslanciRazeniID", selectedOptionId);

  },

  async getPoslanciSeznam({ state, commit, dispatch }, {limit = 20, stranka = 1, filterCallback = null} ) {
    if (state.poslanci.length) return;
    try {

      let poslanci = await this.$axios.get(`${databazePoslancuURL}/Api/osoby?limit=${limit}&stranka=${stranka}`).then(res => res.data);

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
      dispatch('countPoslanciStatistiky');

    } catch (err) {
      console.log(err);
    }
  }

};
