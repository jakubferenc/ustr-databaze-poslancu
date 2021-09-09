import axios from "axios";

const getAllStrankyFactory = async (wordpressAPIURLWebsite) => {

  let strankyRes =  await axios.get(`${wordpressAPIURLWebsite}/wp/v2/pages?_embed`);

  strankyRes = strankyRes.data
    .filter(page => page.status === "publish")
    .map(({ id, date, slug, title, content, excerpt, _embedded }) => ({
      id: id,
      date: date,
      slug: slug,
      title: title.rendered,
      content: content.rendered,
      excerpt: excerpt.rendered,
      featured_image: (Array.isArray(_embedded['wp:featuredmedia'])) ? _embedded['wp:featuredmedia'][0].media_details : false,
      author: _embedded.author /* will return an array of authors and their meta data */
    }));


  return strankyRes;

};

const getAllMediaFactory = async(wordpressAPIURLWebsite, databazePoslancuURL, limit) => {

  let media_soubory = [];

  // generate media
  const wpFetchHeaders = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'x-wp-total'
    }
  };

  const { headers } = await axios.get(`${wordpressAPIURLWebsite}/wp/v2/media?per_page=${limit}`, wpFetchHeaders);
  const totalPages = headers['x-wp-totalpages'];

  for (let page = 1; page <=totalPages; page++) {

    let posts = await axios.get(`${wordpressAPIURLWebsite}/wp/v2/media?per_page=${limit}&page=${page}`, wpFetchHeaders);
    media_soubory = [...media_soubory, ...posts.data];

  }

  media_soubory = media_soubory.filter(soubor => soubor.media_details.sizes !== undefined);

  return media_soubory;

};

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
  getAllMediaFactory: getAllMediaFactory,
  getAllStrankyFactory: getAllStrankyFactory,
};

