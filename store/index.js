/*
this is where we will eventually hold the data for all of our posts
*/
export const state = () => ({
  slovnikova_hesla: []
});
/*
this will update the state with the posts
*/
export const mutations = {
  updateSlovnikovaHesla: (state, slovnikova_hesla) => {
      state.slovnikova_hesla = slovnikova_hesla;
  }
};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
  async getSlovnikovaHesla({ state, commit }) {
    if (state.slovnikova_hesla.length) return;
    try {
      let slovnikova_hesla = await fetch( `http://ustr-parlamentni-mapy.jakubferenc.cz/wp-json/wp/v2/slovnik?per_page=100`
      ).then(res => res.json())
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
  }
};
