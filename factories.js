import axios from "axios";
import axiosRetry from "axios-retry";
import https from 'https';

import {
  normalizeSouborAttrs,
  getAdresyProMapuForPoslanec,
  getCasovaOsaDataForPoslanec,
  stripHTMLTags,
  dateISOStringToCZFormat,
  shuffleArray,
} from './utils/functions.js';


const axiosInstance = axios.create({
  // Keep the timeout low in development so it at least somehow responsive
  timeout: process.dev ? 45000 : 45000,
  httpsAgent: new https.Agent({ keepAlive: true })

});

// We need retrying on timeout, because wordpress api quite often hangs
axiosRetry(axiosInstance, {
  retries: 5,
  retryDelay: () => 5000,
  shouldResetTimeout: true,
  retryCondition: (error) => {
    return !error.response;
  },
});

/**
 *
 * A method that transforms filter settings/data from API into a JS object used fot setting up the filter sidebar
 * which is automatically set up with this javascript object.
 * Not all filterData need be used with the filter sidebar, it depends on what is returned here.
 *
 * @param {*} filterData // Fiter data that are returned from API after each API call
 * @param {*} activeData
 * @returns
 */



const createFilterSettingsForApiUseFactory = (
  filterData = {},
  activeData = {}
) => {

  let sectionId = 0;

  let finalResult = {
    PoslaneckySlib: {
      id: sectionId++,
      title: 'Poslanecky Slib',
      type: 'radio',
      order: 'inline',
      property: 'PoslaneckySlib',
      info: "Nějaké informace k vysvětlení",
      hasCounter: false,
      values: undefined,
    },
    Pohlavi: {
      id: sectionId++,
      title: 'Pohlaví',
      type: 'radio',
      order: 'inline',
      property: 'Pohlavi',
      hasCounter: false,
      values: undefined,
    },
    Snemovny: {
      id: sectionId++,
      title: 'Zastupitelské sbory',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      info: "Nějaké informace k vysvětlení",
      hasCounter: true,
      values: undefined
    },
    SnemovniObdobi: {
      id: sectionId++,
      title: 'Sněmovní období',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      info: "Nějaké informace k vysvětlení",
      hasCounter: true,
      values: undefined
    },
    VolebniStrany: {
      id: sectionId++,
      title: 'Volební strany',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      info: "Nějaké informace k vysvětlení",
      property: 'VolebniStrany',
      hasCounter: true,
      values: undefined
    },
    Kluby: {
      id: sectionId++,
      title: 'Kluby',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      info: "Nějaké informace k vysvětlení",
      property: 'Kluby',
      hasCounter: true,
      values: undefined
    },
    Vybory: {
      id: sectionId++,
      title: 'Výbory',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      info: "Nějaké informace k vysvětlení",
      property: 'Vybory',
      hasCounter: true,
      values: undefined
    },
    Kurie: {
      id: sectionId++,
      title: 'Kurie',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      info: "Nějaké informace k vysvětlení",
      property: 'Kurie',
      hasCounter: true,
      values: undefined
    },
    Narodnosti: {
      id: sectionId++,
      title: 'Národnosti',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      info: "Nějaké informace k vysvětlení",
      property: 'Narodnosti',
      hasCounter: true,
      values: undefined
    },
    Vyznani: {
      id: sectionId++,
      title: 'Náboženské vyznání',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      property: 'NabozenstviNarozeni',
      info: "Nějaké informace k vysvětlení",
      hasCounter: true,
      values: undefined
    },
    UniverzitniVzdelani: {
      id: sectionId++,
      title: 'Vzdělání',
      type: 'radio',
      order: 'inline',
      property: 'UniverzitniVzdelani',
      info: "Nějaké informace k vysvětlení",
      hasCounter: false,
      values: undefined,
    },
    SocialniVazby: {
      id: sectionId++,
      title: 'Sociální vazby',
      type: 'radio',
      order: 'inline',
      info: "Nějaké informace k vysvětlení",
      hasCounter: false,
      values: undefined,
    },
    Fotografie: {
      id: sectionId++,
      title: 'Fotografie',
      type: 'radio',
      order: 'inline',
      info: "Nějaké informace k vysvětlení",
      hasCounter: false,
      values: undefined,
    },
    DruhMandatu: {
      id: sectionId++,
      title: 'Druh mandátu',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      property: 'DruhMandatu',
      info: "Nějaké informace k vysvětlení",
      hasCounter: false,
      values: undefined
    },
    DruhUkonceniMandatu: {
      id: sectionId++,
      title: 'Druh ukončení mandátu',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      property: 'DruhMandatu',
      info: "Nějaké informace k vysvětlení",
      hasCounter: false,
      values: undefined
    },
    PocetMandatu: {
      id: sectionId++,
      title: 'Počet mandátů',
      type: 'range',
      order: 'inline',
      info: "Nějaké informace k vysvětlení",
      hasCounter: false,
      queryStructure: ['MinimalniPocetMandatu', 'MaximalniPocetMandatu', 'AbsolutniMinimalniPocetMandatu', 'AbsolutniMaximalniPocetMandata'], // order matterrs, first lower bound, next higher bound
      values: undefined,
    },
    VekNaZacatkuMandatu: {
      id: sectionId++,
      title: 'Věk na začátku mandátu',
      type: 'range',
      order: 'inline',
      info: "Nějaké informace k vysvětlení",
      hasCounter: false,
      queryStructure: ['VekNaZacatkuMandatuMin', 'VekNaZacatkuMandatuMax'], // order matterrs, first lower bound, next higher bound
      values: undefined,
    },
    VekNaKonciMandatu: {
      id: sectionId++,
      title: 'Věk na konci mandátu',
      type: 'range',
      order: 'inline',
      info: "Nějaké informace k vysvětlení",
      hasCounter: false,
      queryStructure: ['VekNaKonciMandatuMin', 'VekNaKonciMandatuMax'], // order matterrs, first lower bound, next higher bound
      values: undefined,
    },


  };

  let poslaneckySlibMapped = [...filterData.PoslaneckySlib].map(poslaneckySlibId => {

    return {

      id: poslaneckySlibId,
      text: (poslaneckySlibId === true) ? 'Ano' : 'Ne',
      selected: false,
    };

  });

  poslaneckySlibMapped = [
    {id: 0, text: 'Vše', default: true, reset: true, selected: true},
    ...poslaneckySlibMapped,
  ];

  let pohlaviMapped = [...filterData.Pohlavi].map(itemPohlaviID => {

    return {

      id: itemPohlaviID,
      text: (itemPohlaviID == 1) ? 'Muž' : 'Žena',
      selected: false, // Pohlavi = ["0"] || Pohlavi = ["1"] || Pohlavi = ["2"]

    };

  });

  pohlaviMapped = [
    {id: 0, text: 'Vše', default: true, reset: true, selected: true},
    ...pohlaviMapped
  ];

  let parlamentyMapped = [...filterData.Parlamenty].map(item => {

    return {
            id: item.Id,
            text: item.Nazev,
            selected: false,
          };

  });

  parlamentyMapped = [
    {id: 'vse-parlamenty', text: 'Vše', default: true, reset: true, selected: true},
    ...parlamentyMapped
  ];

  let snemovniObdobiMapped = [...filterData.SnemovniObdobi].map(item => {

    return {
            id: item.Id,
            text: item.Nazev,
            selected: false,
          };

  });

  snemovniObdobiMapped = [
    {id: 'vse-snemovni-obdobi', text: 'Vše', default: true, reset: true, selected: true},
    ...snemovniObdobiMapped
  ];

  let narodnostiMapped = [...filterData.Narodnosti].map(item => {

    return {
            id: item.Id,
            text: item.Nazev,
            selected: false,
          };

  });
  narodnostiMapped = [
    {id: 'vse-narodnosti', text: 'Vše', default: true, reset: true, selected: true},
    ...narodnostiMapped
  ];


  let vyznaniMapped = [...filterData.Vyznani].map(item => {

    return {
            id: item.Id,
            text: item.Nazev,
            selected: false,
          };

  });
  vyznaniMapped = [
    {id: 'vse-vyznani', text: 'Vše', default: true, reset: true, selected: true},
    ...vyznaniMapped
  ];

  const vysokaSkolaMapped = [
    {id: false, text: 'Vše', default: true, reset: true, selected: true},
    {id: true, text: 'Má VŠ', disabled: false}
  ];


  const SocialniVazbyMapped = [
    {id: false, text: 'Vše', default: true, reset: true, selected: true},
    {id: true, text: 'Má sociální vztahy', disabled: false}
  ];

  const maFotkuMapped = [
      {id: false, text: 'Vše', default: true, reset: true, selected: true},
      {id: true, text: 'Má fotku', default: false, selected: false, property: 'Soubory', },
  ];

  /* finding the lowest and highest integer number from an array
      can be done to select first and last number, as API returns the numbers sorted from lowest to highest
  */



  let druhMandatuMapped = [...filterData.DruhMandatu].map(item => {

    return {
            id: item.Id,
            text: item.Nazev,
            selected: false,
          };

  });
  druhMandatuMapped = [
    {id: 'vse-druh-mandatu', text: 'Vše', default: true, reset: true, selected: true},
    ...druhMandatuMapped,
  ];


  let druhUkonceniMandatuMapped = [...filterData.DruhUkonceniMandatu].map(item => {

    return {
            id: item.Id,
            text: item.Nazev,
            selected: false,
          };

  });
  druhUkonceniMandatuMapped = [
    {id: 'vse-druh-mandatu', text: 'Vše', default: true, reset: true, selected: true},
    ...druhUkonceniMandatuMapped,
  ];

  const pocetMandatuMapped = [
    filterData.PocetMandatu[0], // current min
    filterData.PocetMandatu[filterData.PocetMandatu.length-1], // current max
    filterData.AbsolutniMinimalniPocetMandatu, // default min
    filterData.AbsolutniMaximalniPocetMandatu, // default max
  ];


  const vekyNaZacatkuMandatuMapped = [
    filterData.VekNaZacatkuMandatu[0], // current min
    filterData.VekNaZacatkuMandatu[filterData.VekNaZacatkuMandatu.length - 1], // current max
    filterData.AbsolutniMinimalniVekNaZacatkuMandatu, // default min
    filterData.AbsolutniMaximalniVekNaZacatkuMandatu, // default max

  ]; ///
////////

  const vekyNaKonciMandatuMapped = [
    filterData.VekNaKonciMandatu[0], // current min
    filterData.VekNaKonciMandatu[filterData.VekNaKonciMandatu.length-1], // current max
    filterData.AbsolutniMinimalniVekNaKonciMandatu, // default min
    filterData.AbsolutniMaximalniVekNaKonciMandatu, // default max

  ]; ///
   ////////////////////////////////////////////////////////////////////////

  finalResult.PoslaneckySlib.values = poslaneckySlibMapped;
  finalResult.Pohlavi.values = pohlaviMapped;
  finalResult.Snemovny.values = parlamentyMapped;
  finalResult.SnemovniObdobi.values = snemovniObdobiMapped;
  finalResult.Narodnosti.values = narodnostiMapped;
  finalResult.Vyznani.values = vyznaniMapped;
  finalResult.UniverzitniVzdelani.values = vysokaSkolaMapped;
  finalResult.SocialniVazby.values = SocialniVazbyMapped;
  finalResult.Fotografie.values = maFotkuMapped;

  finalResult.DruhMandatu.values = druhMandatuMapped;
  finalResult.DruhUkonceniMandatu.values = druhUkonceniMandatuMapped;
  finalResult.PocetMandatu.values = pocetMandatuMapped;
  finalResult.VekNaZacatkuMandatu.values = vekyNaZacatkuMandatuMapped;
  finalResult.VekNaKonciMandatu.values = vekyNaKonciMandatuMapped;

  if (filterData.Kluby && filterData.Kluby !== null) {

    const klubyMapped = [...filterData.Kluby].map(item => {

      return {
              id: item.Id,
              text: item.Nazev.split('|')[0].trim(),
              selected: false,
            };

    });

    finalResult.Kluby.values = [
      {id: 'vse-kluby', text: 'Vše', default: true, reset: true, selected: true},
      ...klubyMapped
    ];

  } else {

    delete finalResult.Kluby;

  }


  if (filterData.VolebniStrany && filterData.VolebniStrany !== null) {

    const stranyMapped = [...filterData.VolebniStrany].map(item => {

      return {
              id: item.Id,
              text: item.Nazev,
              selected: false,
            };

    });


    finalResult.VolebniStrany.values = [
      {id: 'vse-strany', text: 'Vše', default: true, reset: true, selected: true},
      ...stranyMapped
    ];

  } else {

    delete finalResult.VolebniStrany;

  }


  if (filterData.Vybory && filterData.Vybory !== null) {


    let vyboryMapped = [...filterData.Vybory].map(item => {

      return {
              id: item.Id,
              text: item.Nazev,
              selected: false,
            };

    });


    finalResult.Vybory.values = [
      {id: 'vse-vybory', text: 'Vše', default: true, reset: true, selected: true},
      ...vyboryMapped
    ];

  } else {

    delete finalResult.Vybory;

  }

  if (filterData.Kurie && filterData.Kurie !== null) {

    let kurieMapped = [...filterData.Kurie].map(item => {

      return {
              id: item.Id,
              text: item.Nazev,
              selected: false,
            };

    });


    finalResult.Kurie.values = [
      {id: 'vse-kurie', text: 'Vše', default: true, reset: true, selected: true},
      ...kurieMapped
    ];


  } else {

    delete finalResult.Kurie;

  }


  ////////////////////////////////////////////////////////////////////////

  // make active items in the filter based on the current query

  Object.keys(finalResult).forEach((key) => {

    if ( finalResult[key].type !== 'range' ) {

      // we don't want to pick selected item from range, beucase there are no selected items, but just two numbers

      if (activeData[key]) { // if the key is in the active data


        // let's check the specific selected values, it's not the default reset one



          finalResult[key].values.map((valueItem) => {


            valueItem.selected = activeData[key].includes(valueItem.id);

            return valueItem;

          }) ;


      } else {

        // the key is not in the selected keys/filter items, so let's make the default item active/selected
        finalResult[key].values.map(valueItem => {

          if (valueItem.default) {

            valueItem.selected = true;

          }

          return valueItem;

        });

      }


    }


  });


  return finalResult;

};

const createFilterSettingsForApiUseParliamentMapsFactory = (filterData = {}, activeData = {}) => {

  let sectionId = 0;

  let finalResult = {

    Pohlavi: {
      id: sectionId++,
      title: 'Pohlaví',
      type: 'radio',
      order: 'inline',
      property: 'Pohlavi',
      hasCounter: false,
      values: undefined,
    },
    Snemovny: {
      id: sectionId++,
      title: 'Zastupitelské sbory',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      info: "Nějaké informace k vysvětlení",
      hasCounter: true,
      values: undefined
    },
    SnemovniObdobi: {
      id: sectionId++,
      title: 'Sněmovní období',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      info: "Nějaké informace k vysvětlení",
      hasCounter: true,
      values: undefined
    },
    VolebniStrany: {
      id: sectionId++,
      title: 'Politické strany',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      info: "Nějaké informace k vysvětlení",
      property: 'VolebniStrany',
      hasCounter: true,
      values: undefined
    },
    // Kluby: {
    //   id: sectionId++,
    //   title: 'Kluby',
    //   type: 'checkbox',
    //   multiple: true,
    //   reset: true,
    //   order: 'block',
    //   info: "Nějaké informace k vysvětlení",
    //   property: 'Kluby',
    //   hasCounter: true,
    //   values: undefined
    // },
    Fotografie: {
      id: sectionId++,
      title: 'Fotografie',
      type: 'radio',
      order: 'inline',
      info: "Nějaké informace k vysvětlení",
      hasCounter: false,
      values: undefined,
    },



  };



  let pohlaviMapped = [...filterData.Pohlavi].map(itemPohlaviID => {

    return {

      id: itemPohlaviID,
      text: (itemPohlaviID == 1) ? 'Muž' : 'Žena',
      selected: false, // Pohlavi = ["0"] || Pohlavi = ["1"] || Pohlavi = ["2"]

    };

  });

  pohlaviMapped = [
    {id: 0, text: 'Vše', default: true, reset: true, selected: true},
    ...pohlaviMapped
  ];



  let parlamentyMapped = [...filterData.Parlamenty].map(item => {

    return {
            id: item.Id,
            text: item.Nazev,
            selected: false,
          };

  });

  parlamentyMapped = [
    {id: 'vse-parlamenty', text: 'Vše', default: true, reset: true, selected: true},
    ...parlamentyMapped
  ];

  let snemovniObdobiMapped = [...filterData.SnemovniObdobi].map(item => {

    return {
            id: item.Id,
            text: item.Nazev,
            selected: false,
          };

  });

  snemovniObdobiMapped = [
    {id: 'vse-snemovni-obdobi', text: 'Vše', default: true, reset: true, selected: true},
    ...snemovniObdobiMapped
  ];





    const maFotkuMapped = [
        {id: false, text: 'Vše', default: true, reset: true, selected: true},
        {id: true, text: 'Má fotku', default: false, selected: false, property: 'Soubory', },
    ];

    /* finding the lowest and highest integer number from an array
       can be done to select first and last number, as API returns the numbers sorted from lowest to highest
    */


  finalResult.Pohlavi.values = pohlaviMapped;
  finalResult.Snemovny.values = parlamentyMapped;
  finalResult.SnemovniObdobi.values = snemovniObdobiMapped;
  finalResult.Fotografie.values = maFotkuMapped;

  // if (filterData.Kluby && filterData.Kluby !== null) {

  //   const klubyMapped = [...filterData.Kluby].map(item => {

  //     return {
  //             id: item.Id,
  //             text: item.Nazev.split('|')[0].trim(),
  //             selected: false,
  //           };

  //   });

  //   finalResult.Kluby.values = [
  //     {id: 'vse-kluby', text: 'Vše', default: true, reset: true, selected: true},
  //     ...klubyMapped
  //   ];

  // } else {

  //   delete finalResult.Kluby;

  // }


  if (filterData.VolebniStrany && filterData.VolebniStrany !== null) {

    const stranyMapped = [...filterData.VolebniStrany].map(item => {

      return {
              id: item.Id,
              text: item.Nazev,
              selected: false,
            };

    });


    finalResult.VolebniStrany.values = [
      {id: 'vse-strany', text: 'Vše', default: true, reset: true, selected: true},
      ...stranyMapped
    ];

  } else {

    delete finalResult.VolebniStrany;

  }

  ////////////////////////////////////////////////////////////////////////


  // make active items in the filter based on the current query

  Object.keys(finalResult).forEach((key) => {

    if ( finalResult[key].type !== 'range' ) {

      // we don't want to pick selected item from range, beucase there are no selected items, but just two numbers

      if (activeData[key]) { // if the key is in the active data


        // let's check the specific selected values, it's not the default reset one



          finalResult[key].values.map((valueItem) => {


            valueItem.selected = activeData[key].includes(valueItem.id);

            return valueItem;

          }) ;


      } else {

        // the key is not in the selected keys/filter items, so let's make the default item active/selected
        finalResult[key].values.map(valueItem => {

          if (valueItem.default) {

            valueItem.selected = true;

          }

          return valueItem;

        });

      }


    }


  });


  return finalResult;

};


const getAllStrankyFactory = async (wordpressAPIURLWebsite) => {

  const strankyResource =  await axiosInstance.get(`${wordpressAPIURLWebsite}/wp/v2/pages?_embed`);

  const strankyRes = strankyResource.data;

  return strankyRes
  .filter(page => page.status === "publish")
  .map(({ id, date, slug, title, content, excerpt, _embedded }) => ({
    id,
    date,
    slug,
    title: title.rendered,
    content: content.rendered,
    excerpt: excerpt.rendered,
    featured_image: (Array.isArray(_embedded['wp:featuredmedia'])) ? _embedded['wp:featuredmedia'][0].media_details : false,
    author: _embedded.author /* will return an array of authors and their meta data */
  }));

};

const getAllMediaFactory = async (wordpressAPIURLWebsite, databazePoslancuURL, limit) => {

  let media_soubory = [];
  const mediaIdsToFilter = [25];

  // generate media
  const wpFetchHeaders = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'x-wp-total'
    }
  };

  const { headers } = await axiosInstance.get(`${wordpressAPIURLWebsite}/wp/v2/media?per_page=${limit}`, wpFetchHeaders);
  const totalPages = headers['x-wp-totalpages'];

  for (let page = 1; page <=totalPages; page++) {

    const posts = await axiosInstance.get(`${wordpressAPIURLWebsite}/wp/v2/media?per_page=${limit}&page=${page}`, wpFetchHeaders);
    media_soubory = [...media_soubory, ...posts.data];


  }

  return media_soubory
  .filter(soubor => !mediaIdsToFilter.includes(soubor.id))
  .map(item => normalizeSouborAttrs(item));

};


const getRodinySocialniMapyFactory = async (wordpressAPIURLWebsite, databazePoslancuURL) => {

  let rodiny = await axiosInstance.get(`${wordpressAPIURLWebsite}/wp/v2/rodina?_embed`)
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

    if (item.galerie?.length) {

      item.galerie = item.galerie.map(file => {

        return normalizeSouborAttrs(file);
      });

    }

    return item;

  });

  // normalize gallery files if there's a gallery


  return await Promise.all(rodiny.map(async (rodina) => {

    rodina.osoby = await Promise.all(rodina.osoby_ids.map(async (osoba_id) => {

      const osoba = await axiosInstance.get(`${databazePoslancuURL}/Api/osoby/${osoba_id}`);

      return osoba.data;

    }));

    return rodina;

  }));

};


const getCasovaOsaFactory = async (wordpressAPIURLWebsite) => {


  try {

    let casova_osa = [];

    // generate media
    const wpFetchHeaders = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'x-wp-total'
      }
    };

    const limit = 100;

    const { headers } = await axiosInstance.get(`${wordpressAPIURLWebsite}/wp/v2/casova_osa?per_page=${limit}`, wpFetchHeaders);
    const totalPages = headers['x-wp-totalpages'];

    for (let page = 1; page <=totalPages; page++) {

      const posts = await axiosInstance.get(`${wordpressAPIURLWebsite}/wp/v2/casova_osa?_embed&per_page=${limit}&page=${page}`, wpFetchHeaders);
      casova_osa = [...casova_osa, ...posts.data];

    }

    casova_osa = casova_osa
    .filter(el => el.status === "publish")
    .sort((a, b) => (a.casova_osa_datum > b.casova_osa_datum) ? 1 : (a.casova_osa_datum < b.casova_osa_datum ) ? -1 : 0) // sort from the lowest date, format yyyy-mm-dd
    .map(({ id, slug, title, date, content, casova_osa_datum, acf , casova_osa_dulezita }) => {

      const galerie_all = (acf.galerie) ? acf.galerie.map(item => {
        return normalizeSouborAttrs(item);
      }) : null;

      return {
        id,
        slug,
        title: title.rendered,
        date,
        content: content.rendered,
        casova_osa_rok: casova_osa_datum.split('-')[0],
        casova_osa_datum,
        featured_image: (galerie_all) ? galerie_all[0] : null,
        galerie: (galerie_all) ? galerie_all.slice(1) : null,
        casova_osa_dulezita,
      };

    });

    return casova_osa;


  } catch (err) {

    console.warn(err);

  }

};


const getSlovnikovaHeslaFactory = async (wordpressAPIURLWebsite) => {


  try {

    let slovnikova_hesla = await axiosInstance.get(`${wordpressAPIURLWebsite}/wp/v2/slovnik?per_page=100&_embed`);

    slovnikova_hesla = slovnikova_hesla.data;

    return slovnikova_hesla
    .filter(el => el.status === "publish")
    .map(({ id, slug, title, date, excerpt, content, _embedded }) => ({
      id,
      slug,
      title: title.rendered,
      date,
      excerpt: stripHTMLTags(excerpt.rendered),
      content: content.rendered,
      featured_image: (_embedded?.['wp:featuredmedia']?.[0]) ? normalizeSouborAttrs(_embedded['wp:featuredmedia'][0]) : null,
    }));

  } catch (err) {

    console.warn(err);

  }
};

const getParlamentyDatabazeFactory = async (databazePoslancuURL) => {

  try {


    const parlamenty = await axiosInstance.get(`${databazePoslancuURL}/Api/snemovny/seznam`);
    return parlamenty.data;


} catch (err) {

  console.warn(err);

}

};

const getParlamentyFactory = async (wordpressAPIURLWebsite, databazePoslancuURL) => {

  try {


    const parlamenty = await getParlamentyDatabazeFactory(databazePoslancuURL);

    console.log('hello here 1', parlamenty);



    let parlamentyWPData = await axiosInstance.get( `${wordpressAPIURLWebsite}/wp/v2/parlamentni_telesa?per_page=100`);
    parlamentyWPData = parlamentyWPData.data;


    return await Promise.all(parlamenty.map(async (parlament) => {


      const getSnemovniObdobi = await axiosInstance.get(`${databazePoslancuURL}/Api/snemovny/${parlament.Id}`);

      parlament.SnemovniObdobi = getSnemovniObdobi.data.SnemovniObdobi;
      parlament.SnemovniObdobi = parlament.SnemovniObdobi.filter(snemovniObdobi => snemovniObdobi.Id !== 67); // :TODO: temporary, do on BE


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
      if (thisWPParlamentObj?.acf) {
        parlament.acf = thisWPParlamentObj.acf;
      }

      parlament.Barva = thisWPParlamentObj.barva;

      if (thisWPParlamentObj.acf?.casova_osa) {
        parlament.CasovaOsa = thisWPParlamentObj.acf.casova_osa;

        // sort by date
        parlament.CasovaOsa.sort();

        const beginningOfParlamentObj = {
          "datum_udalosti": parlament.SnemovniObdobi[0].DatumZacatku.split('T')[0],
          "nazev_udalosti": "Začátek parlamentního tělesa",
          "dulezita": [
          "true"
          ],
          "typUdalosti": ['datumZacatekParlamentu'],
        };

        const endOfParlamentObj = {
          "datum_udalosti": parlament.SnemovniObdobi[parlament.SnemovniObdobi.length-1].DatumKonce.split('T')[0],
          "nazev_udalosti": "Konec parlamentního tělesa",
          "dulezita": [
          "true"
          ],
          "typUdalosti": ['datumKonecParlamentu'],
        };

        parlament.CasovaOsa = [beginningOfParlamentObj, ...parlament.CasovaOsa, endOfParlamentObj];


      }

      if (thisWPParlamentObj.acf?.galerie) {

        parlament.Galerie = thisWPParlamentObj.acf.galerie.map(item => {

          return normalizeSouborAttrs(item);

        });

      }

      return parlament;

    }));


  } catch (err) {

    console.warn(err);

  }
};

const getAllSnemovniObdobiWordpressFactory = async(wordpressAPIURLWebsite, databazePoslancuURL = null) => {

  let snemovni_obdobi = [];
  const limit = 100;

  // generate media
  const wpFetchHeaders = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'x-wp-total'
    }
  };

  const { headers } = await axiosInstance.get(`${wordpressAPIURLWebsite}/wp/v2/snemovni_obdobi?per_page=${limit}`, wpFetchHeaders);
  const totalPages = headers['x-wp-totalpages'];

  for (let page = 1; page <=totalPages; page++) {

    const posts = await axiosInstance.get(`${wordpressAPIURLWebsite}/wp/v2/snemovni_obdobi?embed&per_page=${limit}&page=${page}`, wpFetchHeaders);
    snemovni_obdobi = [...snemovni_obdobi, ...posts.data];

  }

  return snemovni_obdobi;

  // let parlamenty = await axiosInstance.get(`${databazePoslancuURL}/Api/snemovny/seznam`);
  // parlamenty = parlamenty.data;

  // let snemovni_obdobi_ids = [];

  // let snemovni_obdobi_detail_arr = [];

  // await Promise.all(parlamenty.map(async (parlament) => {

  //   const getSnemovniObdobi = await axiosInstance.get(`${databazePoslancuURL}/Api/snemovny/${parlament.Id}`);

  //   getSnemovniObdobi.data.SnemovniObdobi.every(item => {

  //     snemovni_obdobi_ids.push(item.Id);

  //   });

  // }));

  // snemovni_obdobi_detail_arr = await Promise.all(snemovni_obdobi_ids.map(async (itemId) => {

  //   const snemovni_obdobi_detail = await getSnemovniObdobiDetailFactory(wordpressAPIURLWebsite, databazePoslancuURL, itemId);
  //   return snemovni_obdobi_detail;
  // }));

  // return snemovni_obdobi_detail_arr;

};

const getSnemovniObdobiDetailFactory = async (wordpressAPIURLWebsite, databazePoslancuURL, snemovniObdobiId) => {

  let snemovniObdobiObj = undefined;

  snemovniObdobiObj = await axiosInstance.get(`${databazePoslancuURL}/Api/snemovni-obdobi/${snemovniObdobiId}`);
  snemovniObdobiObj = snemovniObdobiObj.data;

  snemovniObdobiObj.Nazev = snemovniObdobiObj.Nazev.split('|')[0];
  snemovniObdobiObj.PocetPoslancu = snemovniObdobiObj.Poslanci.length;

  snemovniObdobiObj.Poslanci = snemovniObdobiObj.Poslanci.map((poslanec) => {

    if (!poslanec.DatumNarozeniZobrazene && poslanec.DatumNarozeni) {
      poslanec.DatumNarozeniZobrazene = dateISOStringToCZFormat(poslanec.DatumNarozeni);
    }

    if (!poslanec.DatumUmrtiZobrazene && poslanec.DatumUmrti) {
      poslanec.DatumUmrtiZobrazene = dateISOStringToCZFormat(poslanec.DatumUmrti);
    }

    return poslanec;

  });

  // prepare statistics, make them integer
  snemovniObdobiObj.SnemovniObdobiStatistikaZacatek.PrumernyVekPoslancu = parseInt(snemovniObdobiObj.SnemovniObdobiStatistikaZacatek.PrumernyVekPoslancu);
  snemovniObdobiObj.SnemovniObdobiStatistikaZacatek.ProcentoMuzu = parseInt(snemovniObdobiObj.SnemovniObdobiStatistikaZacatek.ProcentoMuzu);
  snemovniObdobiObj.SnemovniObdobiStatistikaZacatek.ProcentoVysokoskolaku = parseInt(snemovniObdobiObj.SnemovniObdobiStatistikaZacatek.ProcentoVysokoskolaku);


  snemovniObdobiObj.SnemovniObdobiStatistikaKonec.PrumernyVekPoslancu = parseInt(snemovniObdobiObj.SnemovniObdobiStatistikaKonec.PrumernyVekPoslancu);
  snemovniObdobiObj.SnemovniObdobiStatistikaKonec.ProcentoMuzu = parseInt(snemovniObdobiObj.SnemovniObdobiStatistikaKonec.ProcentoMuzu);
  snemovniObdobiObj.SnemovniObdobiStatistikaKonec.ProcentoVysokoskolaku = parseInt(snemovniObdobiObj.SnemovniObdobiStatistikaKonec.ProcentoVysokoskolaku);


  let snemovniObdobiObjWpData = await axiosInstance.get( `${wordpressAPIURLWebsite}/wp/v2/snemovni_obdobi?per_page=100`);
  snemovniObdobiObjWpData = snemovniObdobiObjWpData.data;

  // get wordpress content referenced via Id
  const thisWPSnemovniObdobiObj = snemovniObdobiObjWpData.filter((item) => parseInt(item.databaze_id) == snemovniObdobiId);


  if (thisWPSnemovniObdobiObj.length && thisWPSnemovniObdobiObj.length === 1) {


    snemovniObdobiObjWpData = thisWPSnemovniObdobiObj[0];

    snemovniObdobiObj.Popis = snemovniObdobiObjWpData.content.rendered;
    snemovniObdobiObj.WPNazev = snemovniObdobiObjWpData.title.rendered;
    snemovniObdobiObj.StrucnyPopis = snemovniObdobiObjWpData.excerpt.rendered;
    snemovniObdobiObj.acf = {};
    if (snemovniObdobiObjWpData?.acf) {
      snemovniObdobiObj.acf = snemovniObdobiObjWpData.acf;
    }

    if (snemovniObdobiObjWpData.acf?.casova_osa) {
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

    // Normalize wordpress ACF gallery
    if (snemovniObdobiObjWpData.acf?.galerie) {


      snemovniObdobiObj.Galerie = snemovniObdobiObjWpData.acf.galerie.map(item => {

          return normalizeSouborAttrs(item);

        });

    }

    snemovniObdobiObj.UvodniFotografie = false;

    if (snemovniObdobiObjWpData.acf?.uvodni_fotografie) {

      snemovniObdobiObj.UvodniFotografie = snemovniObdobiObjWpData.acf.uvodni_fotografie.sizes.medium_large;

    }

  }


  return snemovniObdobiObj;


};


const getPoslanecDetailFactory = async (databazePoslancuURL, poslanecId) => {

  // :TODO: get cached poslanec if already in the store
  // :TODO: cache via http cache?

  try {

    const poslanecRes = await axiosInstance.get(`${databazePoslancuURL}/Api/osoby/${poslanecId}`);

    const poslanecData = poslanecRes.data;


    // prepare data for casova osa
    poslanecData.CasovaOsa = getCasovaOsaDataForPoslanec(poslanecData);

    poslanecData.AdresyProMapu = getAdresyProMapuForPoslanec(poslanecData);

    return poslanecData;

  } catch (err) {
    console.warn(err);
  };

};


const getPoslanciHomepageFactory = async(databazePoslancuURL, {limit, stranka, filterCallback = null}) => {

  let poslanciRequest = await axiosInstance.get(`${databazePoslancuURL}/Api/osoby?Limit=${limit}&Stranka=${stranka}&Fotografie=true`);
  poslanciRequest = poslanciRequest.data;

  let poslanci = poslanciRequest.Poslanci;

  let poslanciRequestZeny = await axiosInstance.get(`${databazePoslancuURL}/Api/osoby?Limit=${limit}&Stranka=${stranka}&Fotografie=true&Pohlavi=2`);
  poslanciRequestZeny = poslanciRequestZeny.data;

  const poslanciZeny = poslanciRequestZeny.Poslanci;

  poslanci = shuffleArray([...poslanci, ...poslanciZeny]);

  return poslanci
  .map((poslanec) => {

    if (!poslanec.DatumNarozeniZobrazene && poslanec.DatumNarozeni) {
      poslanec.DatumNarozeniZobrazene = dateISOStringToCZFormat(poslanec.DatumNarozeni);
    }

    if (!poslanec.DatumUmrtiZobrazene && poslanec.DatumUmrti) {
      poslanec.DatumUmrtiZobrazene = dateISOStringToCZFormat(poslanec.DatumUmrti);
    }

    return poslanec;

  });

};

export default {
  createFilterSettingsForApiUseParliamentMapsFactory,
  getPoslanecDetailFactory,
  getAllSnemovniObdobiWordpressFactory,
  getSnemovniObdobiDetailFactory,
  getParlamentyFactory,
  getCasovaOsaFactory,
  getRodinySocialniMapyFactory,
  getAllMediaFactory,
  getAllStrankyFactory,
  getSlovnikovaHeslaFactory,
  createFilterSettingsForApiUseFactory,
  getParlamentyDatabazeFactory,
  getPoslanciHomepageFactory,
};

