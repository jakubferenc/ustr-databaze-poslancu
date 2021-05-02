import axios from "axios";

const wordpressAPIURLWebsite = 'http://ustr-databaze-poslancu.jakubferenc.cz';
const databazePoslancuURL = 'http://parliament.ustrcr.cz';

let dynamicRoutes = async () => {
  const res = await axios
    .get(`${wordpressAPIURLWebsite}/wp-json/wp/v2/pages`);
  return res.data.map(stranka => `/stranka/${stranka.slug}`);
};

export default {
  globalName: 'databaze-poslancu',
  target: 'static', // default is 'server'
  ssr: false,
  components: true,
  publicRuntimeConfig: {
    globalTitle: 'Databáze poslanců.cz'
  },
  modules: ['@nuxtjs/style-resources', '@nuxtjs/proxy',  '@nuxtjs/axios'],
  css: [
    '~assets/scss/main.sass',
  ],
  styleResources: {
    sass: ['~bulma/sass/utilities/all']
  },
  generate: {
    routes: dynamicRoutes
  },
  build: {
  },
  buildModules: ["@nuxtjs/svg", '@nuxtjs/html-validator'],
  proxy: {
    '/Api/snemovny/seznam': `${databazePoslancuURL}`,
    '/Api/snemovny/': `${databazePoslancuURL}`,
    '/Api/osoby': `${databazePoslancuURL}`,
    '/Api/soubory': `${databazePoslancuURL}`,
    '/wp/v2/slovnik': `${wordpressAPIURLWebsite}/wp-json`,
    '/wp/v2/pages': `${wordpressAPIURLWebsite}/wp-json`,
  },
  head: {
    title: 'Databáze poslanců.cz',
    htmlAttrs: {
      lang: 'cs',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  storybook: {
    addons: [
      {
        name: '@storybook/preset-scss',
        options: {
          cssLoaderOptions: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
          }
        }
      }
    ]
  },
  htmlValidator: {
    usePrettier: false,
    options: {
      extends: [
        'html-validate:document',
        'html-validate:recommended',
        'html-validate:standard'
      ],
      rules: {
        'svg-focusable': 'off',
        'no-unknown-elements': 'error',
        // Conflicts or not needed as we use prettier formatting
        'void-style': 'off',
        'no-trailing-whitespace': 'off',
        // Conflict with Nuxt defaults
        'require-sri': 'off',
        'attribute-boolean-style': 'off',
        'doctype-style': 'off',
        // Unreasonable rule
        'no-inline-style': 'off'
      }
    }
  }

};
