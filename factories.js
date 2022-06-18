import axios from "axios";
import axiosRetry from "axios-retry";

// import https from 'https';

import {
  normalizeSouborAttrs,
  getAdresyProMapuForPoslanec,
  getCasovaOsaDataForPoslanec,
  stripHTMLTags,
  dateISOStringToCZFormat,
} from './utils/functions.js';


const axiosInstance = axios.create({
  // Keep the timeout low in development so it at least somehow responsive
  timeout: process.dev ? 10000 : 45000,
  // httpsAgent = new https.Agent({ keepAlive: true });

});

// We need retrying on timeout, because wordpress api quite often hangs
axiosRetry(axiosInstance, {
  retries: 50,
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




const createFilterSettingsForApiUseFactory = (filterData = {}, activeData = {}) => {

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
      title: 'Parlamentní tělesa',
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


    const pocetMandatuMapped = [
      filterData.PocetMandatu[0], // current min
      filterData.PocetMandatu[filterData.PocetMandatu.length-1], // current max
      filterData.AbsolutniMinimalniPocetMandatu, // default min
      filterData.AbsolutniMaximalniPocetMandatu, // default max
    ];


    const vekyNaZacatkuMandatuMapped = [
      filterData.VekNaZacatkuMandatu[0], // current min
      filterData.VekNaZacatkuMandatu[filterData.VekNaZacatkuMandatu.length-1], // current max
      filterData.AbsolutniMinimalniVekNaZacatkuMandatu, // default min
      filterData.AbsolutniMaximalniVekNaZacatkuMandatu, // default max

    ] ///
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

  finalResult.PocetMandatu.values = pocetMandatuMapped;
  finalResult.VekNaZacatkuMandatu.values = vekyNaZacatkuMandatuMapped;
  finalResult.VekNaKonciMandatu.values = vekyNaKonciMandatuMapped;

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

const createFilterFromAPISettingsFactory = (parlamenty, vyznani) => {


  // setting the filter validation
  ////////////////////////////////////////////////////////////////////////
  parlamenty = parlamenty.map(item => {

    return {
            id: item.Id,
            text: item.Nazev,
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

  vyznani = vyznani.map(item => {

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

  vyznani = [
    {id: 'vse-nabozenske-vyznani', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
    ...vyznani
  ];

  // narodnosti = narodnosti.map(item => {

  //   const itemId = (item === 'neuvedeno') ? 'narodnost-neuvedeno' : item;

  //   return {
  //           id: itemId,
  //           text: item,
  //           selected: false,
  //           validate: (property) => {

  //             if (Array.isArray(property) && property.length === 0) {

  //               if (item === 'neuvedeno') {
  //                 return true;
  //               }

  //             } else {
  //               return property.includes(item);
  //             }

  //           }
  //         };

  // });
  // narodnosti = [
  //   {id: 'vse-narodnosti', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
  //   ...narodnosti
  // ];

  const vysoka_skola = [
    {id: false, text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
    {id: true, text: 'Pouze vysoká škola', disabled: false, validate:  (property) => property === true}
  ];


  return {

    Snemovny: {
      id: 1,
      title: 'Parlamentní tělesa',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      property: 'Mandaty',
      values: parlamenty
    },
    Pohlavi: {
      id: 2,
      title: 'Pohlaví',
      type: 'radio',
      order: 'inline',
      property: 'Pohlavi',
      values: [
        {id: 'vse-pohlavi', text: 'Vše', default: true, reset: false, selected: true, validate: (property) => property === 1 || property === 2},
        {id: 1, text: 'Muž', validate: (property) => property === 1},
        {id: 2, text: 'Žena', validate: (property) => property === 2},
      ]
    },
    UniverzitniVzdelani: {
      id: 3,
      title: 'Vzdělání',
      type: 'radio',
      order: 'inline',
      property: 'UniverzitniVzdelani',
      values: vysoka_skola,
    },
    Vyznani: {
      id: 4,
      title: 'Náboženské vyznání',
      type: 'checkbox',
      multiple: true,
      reset: true,
      order: 'block',
      property: 'NabozenstviNarozeni',
      values: vyznani
    },
    // narodnosti: {
    //   id: 5,
    //   title: 'Národnosti',
    //   type: 'checkbox',
    //   multiple: true,
    //   reset: true,
    //   order: 'block',
    //   property: 'Narodnosti',
    //   values: narodnosti
    // },
    // vek: {
    //   id: 5,
    //   title: 'Věk (testuji, neni v dobe snemovniho obdobi)',
    //   type: 'radio',
    //   multiple: false,
    //   reset: true,
    //   order: 'block',
    //   property: 'Vek',
    //   values: [
    //     {id: 'vse-vek', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
    //     {id: 'vek-30', text: '30+', default: false, selected: false, validate: (property) => property >= 30 },
    //     {id: 'vek-40', text: '40+', default: false, selected: false, validate: (property) => property >= 40 },
    //     {id: 'vek-50', text: '50+', default: false, selected: false, validate: (property) => property >= 50 },
    //     {id: 'vek-60', text: '60+', default: false, selected: false, validate: (property) => property >= 60 },
    //     {id: 'vek-70', text: '70+', default: false, selected: false, validate: (property) => property >= 70 },
    //     {id: 'vek-75', text: '75+', default: false, selected: false, validate: (property) => property >= 75 },
    //     {id: 'vek-80', text: '80+', default: false, selected: false, validate: (property) => property >= 80 },
    //   ]
    // },
    // mandaty: {
    //   id: 5,
    //   title: 'Mandáty',
    //   type: 'radio',
    //   multiple: false,
    //   reset: true,
    //   order: 'block',
    //   property: 'Mandaty',
    //   values: [
    //     {id: 'vse-mandaty', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
    //     {id: 'ma-jeden-mandat', text: 'Má aspoň 1 mandát', default: false, selected: false, validate: (property) => property.length > 0 },
    //     {id: 'ma-pet-mandat', text: 'Má aspoň 5 mandátů', default: false, selected: false, validate: (property) => property.length > 4 },
    //     {id: 'ma-deset-mandat', text: 'Má aspoň 10 mandátů', default: false, selected: false, validate: (property) => property.length > 9 },
    //     {id: 'ma-dvanactplus-mandat', text: 'Má 12+ mandátů', default: false, selected: false, validate: (property) => property.length > 11 },
    //   ]
    // },
    // dalsi: {
    //   id: 6,
    //   title: 'Další vlastnosti',
    //   type: 'checkbox',
    //   multiple: true,
    //   reset: true,
    //   property: ['OsobniVztahyPrimarni', 'Soubory'],
    //   order: 'block',
    //   values: [
    //     {id: 'vse-dalsi', text: 'Vše', default: true, reset: true, selected: true, validate: (property) => true},
    //     {id: 'ma-fotku', text: 'Má fotku', default: false, selected: false, property: 'Soubory', validate: (property) => property.length },
    //     {id: 'ma-galerii', text: 'Má galerii', default: false, selected: false, property: 'Soubory', validate: (property) => property.length > 1 },
    //     {id: 'ma-sociálni-vazby', text: 'Má sociální vazby', property: 'OsobniVztahyPrimarni', default: false, selected: false, validate: (property) => property.length > 0 },
    //   ],
    // }

  };
  ////////////////////////////////////////////////////////////////////////

};

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

  media_soubory = media_soubory.map(item => {
    return normalizeSouborAttrs(item);
  });

  return media_soubory;

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



    let parlamentyWPData = await axiosInstance.get( `${wordpressAPIURLWebsite}/wp/v2/parlamentni_telesa?per_page=100`);
    parlamentyWPData = parlamentyWPData.data;

    return await Promise.all(parlamenty.map(async (parlament) => {


      const getSnemovniObdobi = await axiosInstance.get(`${databazePoslancuURL}/Api/snemovny/${parlament.Id}`);

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

export default {

  getPoslanecDetailFactory,
  getAllSnemovniObdobiWordpressFactory,
  getSnemovniObdobiDetailFactory,
  getParlamentyFactory,
  getCasovaOsaFactory,
  getRodinySocialniMapyFactory,
  getAllMediaFactory,
  getAllStrankyFactory,
  createFilterSettingsFactory,
  getSlovnikovaHeslaFactory,
  createFilterFromAPISettingsFactory,
  createFilterSettingsForApiUseFactory,
  getParlamentyDatabazeFactory,
};

