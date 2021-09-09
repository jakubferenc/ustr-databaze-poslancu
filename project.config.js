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
  databazePoslancuURL: 'https://parliament.ustrcr.cz',
  globalTitle: 'Databáze poslanců.cz',
  baseURL: 'https://www.databazeposlancu.cz',
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
