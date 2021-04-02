/*
this is where we will eventually hold the data for all of our posts
*/
export const state = () => ({
  slovnikova_hesla: [],
  parlamenty: [],
  poslanci: []
});
/*
this will update the state with the posts
*/
export const mutations = {
  updateSlovnikovaHesla: (state, slovnikova_hesla) => {
      state.slovnikova_hesla = slovnikova_hesla;
  },
  updateParlamenty: (state, parlamenty) => {
    state.parlamenty = parlamenty;
  },
  updatePoslanci: (state, poslanci) => {
    state.poslanci = poslanci;
  },
};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {

  async getSlovnikovaHesla({ state, commit }) {
    if (state.slovnikova_hesla.length) return;
    try {
      let slovnikova_hesla = await fetch( `http://ustr-databaze-poslancu.jakubferenc.cz/wp-json/wp/v2/slovnik?per_page=100`
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

  async getParlamenty({ state, commit }) {
    if (state.parlamenty.length) return;
    try {
      let parlamenty = await this.$axios.get('/Api/snemovny/seznam')
      .then(res => res.data);

      parlamenty = parlamenty
        .map(({ Id, Nazev, SnemovniObdobi}) => ({
          Id,
          Nazev,
          SnemovniObdobi,
        }));

      commit("updateParlamenty", parlamenty);
    } catch (err) {
      console.log(err);
    }
  },

  async getPoslanciSeznam({ state, commit }) {
    if (state.poslanci.length) return;
    try {

      let poslanci = await this.$axios.get('/Api/osoby?limit=20').then(res => res.data);
      poslanci = poslanci
        .map(({ Id, Jmeno, Prijmeni, ZivotniData, DatumNarozeniZobrazene, DatumUmrtiZobrazene}) => {

          if (DatumNarozeniZobrazene !== null) {
            DatumNarozeniZobrazene = DatumNarozeniZobrazene.split('. ')[2];
          }

          if (DatumUmrtiZobrazene !== null) {
            DatumUmrtiZobrazene = DatumUmrtiZobrazene.split('. ')[2];
          }

          return {
            Id,
            Jmeno,
            Prijmeni,
            ZivotniData,
            DatumNarozeniZobrazene,
            DatumUmrtiZobrazene,
          };

        });

      commit("updatePoslanci", poslanci);
    } catch (err) {
      console.log(err);
    }
  }

};
