import axios from "axios";
import { normalizeSouborAttrs } from './utils/functions';


const createFilterSettingsFactory = (nabozenske_vyznani, narodnosti, parlamenty, vysoka_skola) => {


  // setting the filter validation
  ////////////////////////////////////////////////////////////////////////
  parlamenty = parlamenty.map(item => {

    const itemId = (item === 'neuvedeno') ? 'parlamenty-neuvedeno' : item;

    return {
            id: itemId,
            text: item,
            selected: false,
            validate: (property) => {

              if (Array.isArray(property) && property.length === 0) {

                if (item === 'neuvedeno') {
                  return true;
                }

              } else {
                return property.map(mandat => mandat.Parlament).includes(item);
              }

            }
          };

  });

  parlamenty = [
    {id: 'vse-parlamenty', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
    ...parlamenty
  ];

  nabozenske_vyznani = nabozenske_vyznani.map(item => {

    const itemId = (item === 'neuvedeno') ? 'nabozenstvi-neuvedeno' : item;

    return {
      id: itemId,
      text: item,
      selected: false,
      validate: (property) => {

        if (property === null) {

          if (item === 'neuvedeno') {
            return true;
          }

        } else {
          return property === item;
        }

      }
    };
  });

  nabozenske_vyznani = [
    {id: 'vse-nabozenske-vyznani', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
    ...nabozenske_vyznani
  ];

  narodnosti = narodnosti.map(item => {

    const itemId = (item === 'neuvedeno') ? 'narodnost-neuvedeno' : item;

    return {
            id: itemId,
            text: item,
            selected: false,
            validate: (property) => {

              if (Array.isArray(property) && property.length === 0) {

                if (item === 'neuvedeno') {
                  return true;
                }

              } else {
                return property.includes(item);
              }

            }
          };

  });
  narodnosti = [
    {id: 'vse-narodnosti', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
    ...narodnosti
  ];
  vysoka_skola = [
    {id: 'vse-skola', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
    {id: 'vysoka_skola', text: 'Pouze vysoká škola', disabled: false, validate:  (property) => property === true}
  ];


  return {

    parlamentni_telesa: {
      id: 1,
      title: 'Parlamentní tělesa',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      property: 'Mandaty',
      values: parlamenty
    },
    pohlavi: {
      id: 2,
      title: 'Pohlaví',
      type: 'radio',
      order: 'inline',
      property: 'Pohlavi',
      values: [
        {id: 'vse-pohlavi', text: 'Vše', default: true, reset: false, selected: true, validate: (property) => property === 1 || property === 2},
        {id: '1', text: 'Muž', validate: (property) => property === 1},
        {id: '2', text: 'Žena', validate: (property) => property === 2},
      ]
    },
    vzdelani: {
      id: 3,
      title: 'Vzdělání',
      type: 'radio',
      order: 'inline',
      property: 'UniverzitniVzdelani',
      values: vysoka_skola,
    },
    nabozenske_vyznani: {
      id: 4,
      title: 'Náboženské vyznání',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      property: 'NabozenstviNarozeni',
      values: nabozenske_vyznani
    },
    narodnosti: {
      id: 5,
      title: 'Národnosti',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      property: 'Narodnosti',
      values: narodnosti
    },
    vek: {
      id: 5,
      title: 'Věk (testuji, neni v dobe snemovniho obdobi)',
      type: 'radio',
      multiple: false,
      reset: true,
      order: 'block',
      property: 'Vek',
      values: [
        {id: 'vse-vek', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
        {id: 'vek-30', text: '30+', default: false, selected: false, validate: (property) => property >= 30 },
        {id: 'vek-40', text: '40+', default: false, selected: false, validate: (property) => property >= 40 },
        {id: 'vek-50', text: '50+', default: false, selected: false, validate: (property) => property >= 50 },
        {id: 'vek-60', text: '60+', default: false, selected: false, validate: (property) => property >= 60 },
        {id: 'vek-70', text: '70+', default: false, selected: false, validate: (property) => property >= 70 },
        {id: 'vek-75', text: '75+', default: false, selected: false, validate: (property) => property >= 75 },
        {id: 'vek-80', text: '80+', default: false, selected: false, validate: (property) => property >= 80 },
      ]
    },
    mandaty: {
      id: 5,
      title: 'Mandáty',
      type: 'radio',
      multiple: false,
      reset: true,
      order: 'block',
      property: 'Mandaty',
      values: [
        {id: 'vse-mandaty', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
        {id: 'ma-jeden-mandat', text: 'Má aspoň 1 mandát', default: false, selected: false, validate: (property) => property.length > 0 },
        {id: 'ma-pet-mandat', text: 'Má aspoň 5 mandátů', default: false, selected: false, validate: (property) => property.length > 4 },
        {id: 'ma-deset-mandat', text: 'Má aspoň 10 mandátů', default: false, selected: false, validate: (property) => property.length > 9 },
        {id: 'ma-dvanactplus-mandat', text: 'Má 12+ mandátů', default: false, selected: false, validate: (property) => property.length > 11 },
      ]
    },
    dalsi: {
      id: 6,
      title: 'Další vlastnosti',
      type: 'checkbox',
      multiple: true,
      reset: true,
      property: ['OsobniVztahyPrimarni', 'Soubory'],
      order: 'block',
      values: [
        {id: 'vse-dalsi', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
        {id: 'ma-fotku', text: 'Má fotku', default: false, selected: false, property: 'Soubory', validate: (property) => property.length },
        {id: 'ma-galerii', text: 'Má galerii', default: false, selected: false, property: 'Soubory', validate: (property) => property.length > 1 },
        {id: 'ma-sociálni-vazby', text: 'Má sociální vazby', property: 'OsobniVztahyPrimarni', default: false, selected: false, validate: (property) => property.length > 0 },
      ],
    }

  };
  ////////////////////////////////////////////////////////////////////////

};

const getAllStrankyFactory = async (wordpressAPIURLWebsite) => {

  const strankyResource =  await axios.get(`${wordpressAPIURLWebsite}/wp/v2/pages?_embed`);

  let strankyRes = strankyResource.data;

  strankyRes = strankyRes
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

const getAllMediaFactory = async (wordpressAPIURLWebsite, databazePoslancuURL, limit) => {

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

  media_soubory = media_soubory.map(item => {
    return normalizeSouborAttrs(item);
  });

  return media_soubory;

};

const getRodinySocialniMapyFactory = async (wordpressAPIURLWebsite, databazePoslancuURL) => {

  let rodiny = await axios.get(`${wordpressAPIURLWebsite}/wp/v2/rodina?_embed`)
  .then(res => res.data);

  rodiny = rodiny
    .filter(item => item.status === "publish")
    .map(({ id, date, slug, title, content, excerpt, _embedded, rodina_datum, rodina_osoby_ids, acf }) => ({
      id,
      date,
      slug,
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

  rodiny = rodiny.map(item => {

    if (item.galerie && item.galerie.length) {

      item.galerie = item.galerie.map(file => {

        return normalizeSouborAttrs(file);
      });

    }

    return item;

  });

  // normalize gallery files if there's a gallery


  rodiny = await Promise.all(rodiny.map(async (rodina) => {

    rodina.osoby = await Promise.all(rodina.osoby_ids.map(async (osoba_id) => {

      let osoba = await axios.get(`${databazePoslancuURL}/Api/osoby/${osoba_id}`);

      return osoba.data;

    }));

    return rodina;

  }));

  return rodiny;

};


const getSlovnikovaHeslaFactory = async (wordpressAPIURLWebsite) => {


  try {

    let slovnikova_hesla = await axios.get(`${wordpressAPIURLWebsite}/wp/v2/slovnik?per_page=100&_embed`);

    slovnikova_hesla = slovnikova_hesla.data;

    slovnikova_hesla = slovnikova_hesla
    .filter(el => el.status === "publish")
    .map(({ id, slug, title, date, excerpt, content, _embedded }) => ({
      id,
      slug,
      title,
      date,
      excerpt,
      content,
      featured_image: (_embedded && _embedded['wp:featuredmedia']) ? normalizeSouborAttrs(_embedded['wp:featuredmedia'][0]) : null,
    }));

   return slovnikova_hesla;

  } catch (err) {

    console.warn(err);

  }
};


export default {
  getRodinySocialniMapyFactory: getRodinySocialniMapyFactory,
  getAllMediaFactory: getAllMediaFactory,
  getAllStrankyFactory: getAllStrankyFactory,
  createFilterSettingsFactory: createFilterSettingsFactory,
  getSlovnikovaHeslaFactory: getSlovnikovaHeslaFactory,
};

