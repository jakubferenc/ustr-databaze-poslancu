import axios from "axios";


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
  publicRuntimeConfig: {
    wordpressAPIURLWebsite,
    databazePoslancuURL
  },
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
  modules: ['@nuxtjs/style-resources', '@nuxtjs/proxy',  '@nuxtjs/axios', '@nuxtjs/sitemap' /*'@nuxtjs/sentry'*/],
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
    }
  },
  buildModules: [
    "@nuxtjs/svg",
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
  }

};
