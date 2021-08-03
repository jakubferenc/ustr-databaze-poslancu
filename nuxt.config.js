import axios from "axios";


const wordpressAPIURLWebsite = 'https://ustr-databaze-poslancu.jakubferenc.cz/wp-json';
const databazePoslancuURL = 'https://parliament.ustrcr.cz';

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
  generate: {
    async routes() {

      let routes = [];

      const strankyRes = await axios.get(`${wordpressAPIURLWebsite}/wp/v2/pages?_embed`);
      const rodinyRes = await axios.get(`${wordpressAPIURLWebsite}/wp/v2/rodina?_embed`);
      const osobyRes = await axios.get(`${databazePoslancuURL}/Api/osoby/vsechny/`);

      console.log("osobyRes", osobyRes);

      const osobyRoutes = osobyRes.data.map(item => {

        return {
          route: `/poslanec/${item.id}`,
          payload: item // thanks to the payload, we are caching results for the subpage here
        };

      });

      const strankyRoutes = strankyRes.data.map(item => {

        return {
          route: `/stranka/${item.slug}`,
          payload: item // thanks to the payload, we are caching results for the subpage here
        };

      });

      const rodinyRoutes = rodinyRes.data.map(item => {

        // load osoby

        const rodina_osoby_ids = item.rodina_osoby_ids.split(',');

        return {
          route: `/socialni-mapa/${item.slug}`,
          payload: item // thanks to the payload, we are caching results for the subpage here
        };

      });

      routes = [...osobyRoutes,...strankyRoutes, ...rodinyRoutes, ...routes];

      return routes;

    }
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
  globalName: 'databaze-poslancu',
  target: 'static', // default is 'server'
  ssr: true,
  components: true,
  publicRuntimeConfig: {
    globalTitle: 'Databáze poslanců.cz'
  },
  modules: [
    ['@nuxtjs/style-resources', {
      sass: ['~bulma/sass/utilities/all']
    }],
    ['@nuxtjs/proxy', {
      '/Api/snemovny/seznam': `${databazePoslancuURL}`,
      '/Api/snemovny/': `${databazePoslancuURL}`,
      '/Api/osoby': `${databazePoslancuURL}`,
      '/Api/soubory': `${databazePoslancuURL}`,
      '/wp/v2/slovnik': `${wordpressAPIURLWebsite}`,
      '/wp/v2/pages': `${wordpressAPIURLWebsite}`,
    }],
    ['@nuxtjs/sentry', {
      dsn: 'https://9b271b2be5df44b9b13ace36c73dbfbe@o621712.ingest.sentry.io/5752198', // Enter your project's DSN here
      // Additional Module Options go here
      // https://sentry.nuxtjs.org/sentry/options
      config: {
        // Add native Sentry config here
        // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
      },
    }],
    ['nuxt-i18n', {
      locales: [
        {code: 'cs', iso: 'cs-CZ', file: 'cs-CZ.js', dir: 'ltr'}
      ],
      lazy: true,
      langDir: '~lang/',
      defaultLocale: 'cs',
      vueI18n: {
        fallbackLocale: 'cs',
      },
    }],
    ['@nuxtjs/axios', {
      proxy: true
    }],
  ],
  css: [
    '~assets/scss/main.sass',
    { src: 'leaflet.markercluster/dist/MarkerCluster.css', lang: 'css' },
    { src: 'leaflet.markercluster/dist/MarkerCluster.Default.css', lang: 'css' }
  ],
  plugins: [
    { src: '~plugins/vue-leaflet.js', ssr: false },
  ],
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
