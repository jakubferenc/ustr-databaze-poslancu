// import typopoPackage from 'typopo';
// const {fixTypos} = typopoPackage;
export function shuffleArray(unshuffledArray) {

  return unshuffledArray
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)

};

export const dateISOStringToCZFormat = (dateString, removeStartZero = true) => {
  const res = dateString.split("T")[0].split("-").reverse().join(". ");

  return removeStartZero ? (res[0] === "0" ? res.slice(1) : res) : res;
};

export const addRecursivelyPerson = (dimensionalArrayOfPersons, searchedPersonObj, topLevelDimensionalArrayOfPersons) => {

  const thisIndexFound = dimensionalArrayOfPersons.findIndex(item => item.Id === searchedPersonObj.PrimarniOsobaId);

  if (thisIndexFound > -1) {
    // we have a parent for the child item

    const parentObj = dimensionalArrayOfPersons[thisIndexFound];
    if (!parentObj.children) parentObj.children = [];

    parentObj.children = [...parentObj.children, searchedPersonObj];

  } else {

    // we don't have a parent, do recursive until the there aren't any objects with children, then add to the root

    [...dimensionalArrayOfPersons].forEach((possibleParent) => {

      if (possibleParent.children && possibleParent.children?.length > 0) {

        addRecursivelyPerson(possibleParent.children, searchedPersonObj, topLevelDimensionalArrayOfPersons);

      }

    });

  }

  return dimensionalArrayOfPersons;

};

export const customLogger = (...args) => {


  if (process.env.NODE_ENV === 'production') return;

  console.log(...args);


};

export const normalizeURLParamsToValueInArrayFormat = (routeURLParams) => {

  // immutable, modern way to iterate object and make the value inside an array v => [v]
  return Object.fromEntries(Object.entries(routeURLParams).map(([k, v]) => [k, [v] ]));

};

export const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;


export const stripHTMLTags = (htmlText) => {

  return htmlText.replace(/(<([^>]+)>)/gi, "");

};

export const getOpenGraphMeta = (meta) => {

  const countSocialMediaMetaDataDescription = 160;

  const descriptionToEdit = (meta && meta.description) || description;
  const truncatedDescription = truncate(descriptionToEdit, countSocialMediaMetaDataDescription, '...');

  return [
    {
      hid: "og:site_name",
      name: "og:site_name",
      content: (meta && meta.site_name) || site_name,
    },
    {
      hid: "description",
      name: "description",
      content: truncatedDescription,
    },
    {
      hid: "og:type",
      property: "og:type",
      content: (meta && meta.type) || type,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: (meta && meta.url) || url,
    },
    {
      hid: "og:title",
      property: "og:title",
      content: (meta && meta.title) || title,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: truncatedDescription,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: (meta && meta.mainImage) || mainImage,
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: (meta && meta.url) || url,
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: (meta && meta.title) || title,
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: truncatedDescription,
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: (meta && meta.mainImage) || mainImage,
    },
  ];
};

export const normalizeUstrApiMediaObjectForWordpress = (soubor) => {

  soubor.url = soubor.URLNahled;
  soubor.title = soubor.Poznamka;
  soubor.mime_type = soubor.Mime;

  return soubor;

};

export const normalizeMediaAttrs = (item) => {

  if (!item.sizes) {
    if (item.media_details) {
      item.sizes = item.media_details.sizes;
    }
  }

  return item;

};

export const getAdresaDruhHumanReadableName = (adresaDruhNumber) => {

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
export const normalizeQueryParamsVariableTypes = (queryParams) => {
  // transform string boolean to real boolean
  // transform string numbers to real numbers

  let queryParamsNormalized = { ...queryParams };

  Object.keys(queryParamsNormalized).forEach((key) => {
    if (Array.isArray(queryParams[key])) {
      queryParamsNormalized[key] = [...queryParamsNormalized[key]].map((item) => {
        if (item === "true" || item === true) {
          return true;
        } else if (item === "false" || item === false) {
          return false;
        } else if (!Number.isNaN(Number(item))) {
          return parseInt(item);
        }
      });
    }
  });

  return queryParamsNormalized;
};

export function stringifyQueryForAPI(query = {}) {
  let finalQueryString = "";

  Object.keys(query).forEach((key, index) => {
    const thisPrefix = index === 0 ? "" : "&";

    const thisItem = query[key];

    if (thisItem.length === 1) {
      // it's a single value param
      finalQueryString = finalQueryString + `${thisPrefix}${key}=${thisItem[0]}`;
    }

    if (thisItem.length >= 2) {
      // it's a multiple value param
      // we need to iterate over it and add for each value the same Key=value string because of how API is designed
      // for example: to get multiple names, you need "Name=Jakub&Name=Josef&name=Anežka"
      thisItem.forEach((subItem, subIndex) => {
        const thisPrefix = index == 0 && subIndex == 0 ? "" : "&";

        finalQueryString = finalQueryString + `${thisPrefix}${key}=${subItem}`;
      });
    }
  });

  return finalQueryString;
}


export const getAdresyProMapuForPoslanecFromMandaty = (poslanec) => {


  let adresyPolozky = [];

  if (poslanec.Adresy) {
    adresyPolozky = [...poslanec.Adresy].map((adresa) => {

      adresa.DruhNazev = getAdresaDruhHumanReadableName(adresa.Druh);

      return adresa;

    });
  }

  // check if adresa from the mandat is in the poslanec.Adresy
  // if so, add date and other metadata to the same address (don't create a new one)

  if (poslanec.Mandaty && poslanec.Mandaty.length > 0) {


    [...poslanec.Mandaty].forEach((mandat) => {

      if (mandat.AdresyVykonMandatu.length) {

        mandat.AdresyVykonMandatu.forEach((thisItemAddress) => {

          const existingItemIndex = adresyPolozky.findIndex(itemExisting => itemExisting.GeoX === thisItemAddress.GeoX && itemExisting.GeoY === thisItemAddress.GeoY);

          const thisZaznamPrepare = {

            DatumZacatkuZobrazene: mandat.DatumZacatkuZobrazene,
            DatumKonceZobrazene: mandat.DatumKonceZobrazene,
            Parlament: mandat.Parlament,
            Id: thisItemAddress.Id,
            _mandatId: mandat.Id,

          };

          if (existingItemIndex > -1 && [2, 3].includes(thisItemAddress.Druh) ) {

            // the address of the type and geo address already exists, let's

            if (adresyPolozky[existingItemIndex].Zaznamy === undefined) {

              adresyPolozky[existingItemIndex].Zaznamy = [];

            }

            adresyPolozky[existingItemIndex].Zaznamy.push(thisZaznamPrepare);

            // } else {

            //   const existingItemIndexZaznam = adresyPolozky[existingItemIndex].Zaznamy.findIndex(itemExisting => itemExisting.DatumZacatkuZobrazene === thisZaznamPrepare.DatumZacatkuZobrazene);

            //   if (existingItemIndexZaznam === -1) {

            //     adresyPolozky[existingItemIndex].Zaznamy.push(thisZaznamPrepare);

            //   }

            // }


          }


        });


      }

      // if (mandat.AdresyZvoleni.length) {

      //   [...mandat.AdresyVykonMandatu].forEach((thisItemAddress) => {

      //     const existingItemIndex = adresyPolozky.findIndex(itemExisting => itemExisting.GeoX === thisItemAddress.GeoX && itemExisting.GeoY === thisItemAddress.GeoY);

      //     const thisZaznamPrepare = {

      //       DatumZacatkuZobrazene: mandat.DatumZacatkuZobrazene,
      //       DatumKonceZobrazene: mandat.DatumKonceZobrazene,
      //       Parlament: mandat.Parlament,
      //       Id: thisItemAddress.Id,
      //       _mandatId: mandat.id,

      //     };

      //     if (existingItemIndex > -1 && [2, 3].includes(thisItemAddress.Druh) ) {

      //       // the address of the type and geo address already exists, let's

      //       if (!adresyPolozky[existingItemIndex].Zaznamy) {

      //         adresyPolozky[existingItemIndex].Zaznamy = [];

      //       }

      //       adresyPolozky[existingItemIndex].Zaznamy.push(thisZaznamPrepare);

      //       // } else {

      //       //   const existingItemIndexZaznam = adresyPolozky.Zaznamy.findIndex(itemExisting => itemExisting.DatumZacatkuZobrazene === thisItemAddress.DatumZacatkuZobrazene && itemExisting.DatumZacatkuZobrazene === thisItemAddress.DatumZacatkuZobrazene);

      //       //   if (existingItemIndexZaznam === -1) {

      //       //     adresyPolozky[existingItemIndexZaznam].Zaznamy.push(thisZaznamPrepare);

      //       //   }

      //       // }


      //     }



      //   });


      // }


    });




  }



  return adresyPolozky;


};

export const getAdresyProMapuForPoslanec = (poslanec) => {

  if (poslanec.Adresy) {

    return [...poslanec.Adresy].map((adresa) => {

      adresa.DruhNazev = getAdresaDruhHumanReadableName(adresa.Druh);

      return adresa;

    });
  }

  return [];


};

export const getCasovaOsaDataForPoslanec = (poslanec) => {

  const randomColors = [];

  let casovaOsaPolozky = [];

  if (poslanec.DatumNarozeni) {

    casovaOsaPolozky = [...casovaOsaPolozky, {

      datum_udalosti: poslanec.DatumNarozeni.split("T")[0],
      dulezita: true,
      nazev_udalosti: `Datum narození<br> ${poslanec.DatumNarozeniZobrazene}`,
      typUdalosti: ['datumNarozeni'],

    }];

  }

  if (poslanec.Mandaty) {

    const casovePolozkyMandatyCalculated = poslanec.Mandaty.reduce((acc, mandat, index) => {

      const datum_zacatek = mandat.DatumZacatku && mandat.DatumZacatku != null && mandat.DatumZacatku.split("T")[0] || '';
      const datum_konec = mandat.DatumKonce && mandat.DatumKonce != null && mandat.DatumKonce.split("T")[0] || '';

      const nazevUdalostiContent = (mandat) => {

        const mandatParliament = mandat.Parlament || 'Neuvedeno';

        const result = `${mandatParliament}<br>${mandat.DatumZacatkuZobrazene} — ${mandat.DatumKonceZobrazene}`;

        return result;

      };

      acc.push({

        datum_udalosti: `${datum_zacatek}`,
        dulezita: true,
        nazev_udalosti: nazevUdalostiContent(mandat),
        typUdalosti: ['mandat']

      });


      return acc;

    }, []);

    casovaOsaPolozky = [...casovaOsaPolozky,...casovePolozkyMandatyCalculated];


  }

  // casovaOsaPolozky = casovaOsaPolozky.sort((a, b) => (a.datum_udalosti > b.datum_udalosti) ? 1 : (a.datum_udalosti < b.datum_udalosti ) ? -1 : 0);

  if (poslanec.DatumUmrti) {

    casovaOsaPolozky = [...casovaOsaPolozky, {

      datum_udalosti: poslanec.DatumUmrti.split("T")[0],
      dulezita: true,
      nazev_udalosti: `Datum úmrtí <br>${poslanec.DatumUmrtiZobrazene}`,
      typUdalosti: ['datumUmrti']

    }];

  }

  return casovaOsaPolozky;


};


export const getFilterDataFromPoslanciAll = (poslanci) => {

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



export const normalizeSouborAttrs = (file) => {

  let newFile = {
    id: file.id,
    title: '',
    alt_text: '',
    author: file.author,
    caption: '',
    date: file.date,
    description: file.description,
    slug: '',
    image: {
      thumb_url: '',
      full_url: '',
    },
  };


  if (file.media_details) {
    // most probably a file from wordpress media gallery

    newFile.caption = (file.caption.rendered) ? stripHTMLTags(file.caption.rendered) : undefined; // remove html from the caption
    newFile.alt_text = file.alt_text;
    newFile.slug = file.slug;

    if (file.description.rendered) {

      // we need to clean up the description from the wordpress media gallery
      // media gallery joins together description and html for displaying the subpage for the given attachment

      newFile.description = stripHTMLTags(file.description.rendered.split('</a></p>')[1]);

    }

    if (file.media_details.sizes && file.media_details.sizes.medium_large) {
      newFile.image.thumb_url = file.media_details.sizes.medium_large.source_url;
    } else if (file.media_details.sizes && file.media_details.sizes.medium)  {
      newFile.image.thumb_url = file.media_details.sizes.medium.source_url;
    }

    if (file.media_details.sizes && file.media_details.sizes.full) {
      newFile.image.full_url = file.media_details.sizes.full.source_url;
    }

  }

  if  (file.sizes) {
    // most probably a file from acf gallery

    newFile.caption = file.caption; // works as a description
    newFile.alt_text = file.alt;
    newFile.slug = file.name;
    newFile.title = file.title;

    if (file.sizes.medium_large) {
      newFile.image.thumb_url = file.sizes.medium_large;
    } else if (file.sizes.medium)  {
      newFile.image.thumb_url = file.sizes.medium;
    }

    if (file.sizes.full) {
      newFile.image.full_url = file.sizes.full;
    }

  }

  return newFile;

};

export const getDruhMandatuFromId = (MandatDruhId) => {
  const mandatDruhIdString = MandatDruhId.toString();
  const MandatTypeEnum = Object.freeze({
    '1': 'virilista',
    '2': 'řádný',
    '3': 'doplňovací volba',
    '4': 'volený náhradník',
    '5': 'dosazený náhradník',
    '6': 'dědičné právo',
    '7': 'jmenování',
    '8': 'přijetí za stav',
    '255': 'jiné',
  });

  if (!Object.keys(MandatTypeEnum).includes(mandatDruhIdString)) throw new Error(`Mandat type Id ${mandatDruhIdString} is not in the Enum`);
  return MandatTypeEnum[mandatDruhIdString];
};


export const poslanciFilterAPIMapper = () => {


  return {

    limit: 'Limit',
    stranka: 'Stranka',
    'ma-foto': 'Fotografie',
    pohlavi: 'Pohlavi',
    narodnost: 'Narodnost',
    nabozenske_vyznani: 'Vyznani',
    dalsi: {
      'ma-socialni-vazby': 'OsobbniVztahyPrimarni'
    },
    snemovni_obdobi: 'SnemovniObdobi',
    snemovna: 'Snemovna',
    volebni_strana: 'VolebniStrana',
    poslanecky_klub: 'PoslaneckyKlub',
    politicka_strana: 'PolitickaStrana',
    kurie: 'Kurie',
    kooptace: 'Kooptace',
    poslanec: 'Poslanec',
    pozice: 'Pozice'

  };


}
