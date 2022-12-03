// responsive
const gap = 32;
const tablet = 769;
const desktop = 960 + 2 * gap;
const widescreen = 1152 + 2 * gap;
const fullhd = 1344 + 2 * gap;
const mobile = tablet-1;

export default {
  wordpressAPIURLWebsite: 'https://ustr-databaze-poslancu.jakubferenc.cz/wp-json',
  wordpressURLWebsite: 'https://ustr-databaze-poslancu.jakubferenc.cz/',
  netlifyURL: 'https://ustr-databaze-poslancu.netlify.app',
  databazePoslancuURL: 'https://parliament.mua.cas.cz',
  globalTitle: 'Databáze poslanců.cz',
  baseURL: 'https://www.databazeposlancu.cz',
  useFileCachedAPI: true,
  placeholders: {
    missingDate: '?'
  },
  mapbox: {
    accessToken: 'pk.eyJ1IjoiamFrdWJmZXJlbmMiLCJhIjoiY2tjbTNjbDI2MW01NzJ5czUzNGc0Y3FwNyJ9.bTpq3aGIwEIUqRkxlMOvCw',
  },
  router: {
    multipleValuesSeparator: ';',
  },
  poslanec: {
    socialniVazby: {
      showPritelType: false,
    }
  },
  responsive: {
    breakpoints: {
      mobile,
      tablet,
      desktop,
      widescreen,
      fullhd
    }
  }

};
