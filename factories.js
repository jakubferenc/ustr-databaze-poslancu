import axios from "axios";
import projectConfig from './project.config';


const getRodinySocialniMapyFactory = async (wordpressAPIURLWebsite, databazePoslancuURL) => {

  let rodiny = await axios.get(`${wordpressAPIURLWebsite}/wp/v2/rodina?_embed`)
  .then(res => res.data);

  rodiny = rodiny
    .filter(item => item.status === "publish")
    .map(({ id, date, slug, title, content, excerpt, _embedded, rodina_datum, rodina_osoby_ids, acf }) => ({
      id: id,
      date: date,
      slug: slug,
      title: title.rendered,
      content: content.rendered,
      excerpt: excerpt.rendered,
      featured_image: _embedded['wp:featuredmedia'][0].media_details,
      author: _embedded.author, /* will return an array of authors and their meta data */
      datum: rodina_datum,
      osoby_ids: rodina_osoby_ids.replace(/ +/g, "").split(','), // remove whitespace between commas
      pocet_osob: rodina_osoby_ids.replace(/ +/g, "").split(',').length,
      casova_osa: acf.casova_osa,
      galerie: acf.galerie
    }));

  rodiny = await Promise.all(rodiny.map(async (rodina) => {

    rodina.osoby = await Promise.all(rodina.osoby_ids.map(async (osoba_id) => {

      let osoba = await axios.get(`${databazePoslancuURL}/Api/osoby/${osoba_id}`);

      return osoba.data;

    }));

    return rodina;

  }));

  return rodiny;

};

export default {
  getRodinySocialniMapyFactory: getRodinySocialniMapyFactory,
};

