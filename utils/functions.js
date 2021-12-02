import { fixTypos } from 'typopo';

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

  // http://parliament.ustrcr.cz/Api/Help/Api/GET-soubory_Limit_Stranka_Mime

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


export const getAdresyProMapuForPoslanec = (poslanec) => {


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




  }

  return [...adresyPolozky, ...adresyMandaty];


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

      const datum_zacatek = mandat.DatumZacatku.split("T")[0] || '';
      const datum_konec = mandat.DatumKonce.split("T")[0] || '';

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

  casovaOsaPolozky = casovaOsaPolozky.sort((a, b) => (a.datum_udalosti > b.datum_udalosti) ? 1 : (a.datum_udalosti < b.datum_udalosti ) ? -1 : 0);

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

    newFile.caption = (file.caption.rendered) ? fixTypos(stripHTMLTags(file.caption.rendered)) : undefined; // remove html from the caption
    newFile.alt_text = file.alt_text;
    newFile.slug = file.slug;

    if (file.description.rendered) {

      // we need to clean up the description from the wordpress media gallery
      // media gallery joins together description and html for displaying the subpage for the given attachment

      newFile.description = fixTypos(stripHTMLTags(file.description.rendered.split('</a></p>')[1]));

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
