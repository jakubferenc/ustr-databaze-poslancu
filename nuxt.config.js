import axios from "axios";
import path from 'path';
import fs from 'fs';

const wordpressAPIURLWebsite = 'https://ustr-databaze-poslancu.jakubferenc.cz/wp-json';
const databazePoslancuURL = 'https://parliament.ustrcr.cz';

let dynamicRoutes = async () => {
  const res = await axios
    .get(`${wordpressAPIURLWebsite}/wp/v2/pages`);
  return res.data.map(stranka => `/stranka/${stranka.slug}`);
};

export default {
  /*env: {
    baseUrl: process.env.BASE_URL || 'https://localhost:8000'
  },
  server: {
    port: 8000,
    host: 'localhost',
    timing: false
  },*/
  render: {
    static: {
      setHeaders(res) {
        res.setHeader('X-Frame-Options', 'ALLOWALL');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      }
    }
  },
  globalName: 'databaze-poslancu',
  target: 'static', // default is 'server'
  ssr: true,
  components: true,
  publicRuntimeConfig: {
    globalTitle: 'Databáze poslanců.cz'
  },
  modules: ['@nuxtjs/style-resources', '@nuxtjs/proxy',  '@nuxtjs/axios', /*'@nuxtjs/sentry'*/],
  sentry: {
    dsn: 'https://9b271b2be5df44b9b13ace36c73dbfbe@o621712.ingest.sentry.io/5752198', // Enter your project's DSN here
    // Additional Module Options go here
    // https://sentry.nuxtjs.org/sentry/options
    config: {
      // Add native Sentry config here
      // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
    },
  },
  axios: {
    proxy: true
  },
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
    loaders: {
      scss: { sourceMap: true },
      vue: { cacheBusting: false },
    },
  },
  buildModules: [
    "@nuxtjs/svg",
    /*'@nuxtjs/html-validator',*/
    ['@aceforth/nuxt-netlify', { /* :TODO: dopsat zbývající proxy redirecty */
      redirects: [
        {
          from: '/Api/snemovny/seznam',
          to: `${databazePoslancuURL}/Api/snemovny/seznam`
        },
        {
          from: '/Api/snemovny/',
          to: `${databazePoslancuURL}/Api/snemovny/`,
        },
      ]
    }]
  ],
  proxy: {
    '/Api/snemovny/seznam': `${databazePoslancuURL}`,
    '/Api/snemovny/': `${databazePoslancuURL}`,
    '/Api/osoby': `${databazePoslancuURL}`,
    '/Api/soubory': `${databazePoslancuURL}`,
    '/wp/v2/slovnik': `${wordpressAPIURLWebsite}`,
    '/wp/v2/pages': `${wordpressAPIURLWebsite}`,
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
