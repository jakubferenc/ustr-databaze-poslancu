import axios from "axios";


const config = {
  wordpressAPIURLWebsite: 'https://ustr-databaze-poslancu.jakubferenc.cz/wp-json',
  databazePoslancuURL: 'https://parliament.ustrcr.cz',
  globalTitle: 'Databáze poslanců.cz'
};

export default {
  /*env: {
    baseUrl: process.env.BASE_URL || 'https://localhost:3000'
  },
  server: {
    port: 3000,
    host: 'localhost',
    timing: false
  },*/

  publicRuntimeConfig: {...config},
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

      const strankyRes = await axios.get(`${config.wordpressAPIURLWebsite}/wp/v2/pages?_embed`);
      const rodinyRes = await axios.get(`${config.wordpressAPIURLWebsite}/wp/v2/rodina?_embed`);

      // generate media
      const wpFetchHeaders = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Expose-Headers': 'x-wp-total'
        }
      };

      const { headers } = await this.$axios.get(`${config.wordpressAPIURLWebsite}/wp/v2/media?per_page=100`, wpFetchHeaders);
      const totalPages = headers['x-wp-totalpages'];

      let mediaRes = [];

      for (let page = 1; page <=totalPages; page++) {

        let posts = await this.$axios.get(`${wordpressAPIURLWebsite}/wp/v2/media?per_page=100&page=${page}`, wpFetchHeaders);
        mediaRes = [...mediaRes, ...posts.data];

      }

      mediaRes = mediaRes.filter(soubor => soubor.media_details.sizes !== undefined);

      //const osobyRes = await axios.get(`${databazePoslancuURL}/Api/osoby/vsechny/`);

      // const osobyRoutes = osobyRes.data.map(item => {

      //   return {
      //     route: `/poslanec/${item.id}`,
      //     payload: item // thanks to the payload, we are caching results for the subpage here
      //   };

      // });

      const mediaRoutes = mediaRes.map(item => {

        return {

          route: `/media/${item.id}`,
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

      routes = [...strankyRoutes, ...rodinyRoutes, ...mediaRoutes];

      return routes;

    }
  },
  build: {
    loaders: {
      sass: { sourceMap: false },
      scss: { sourceMap: false },
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
  modules: [
    ['@nuxtjs/style-resources', {
      sass: ['~bulma/sass/utilities/all']
    }],
    ['@nuxtjs/proxy', {
      '/Api/snemovny/seznam': `${config.databazePoslancuURL}`,
      '/Api/snemovny/': `${config.databazePoslancuURL}`,
      '/Api/osoby': `${config.databazePoslancuURL}`,
      '/Api/soubory': `${config.databazePoslancuURL}`,
      '/wp/v2/slovnik': `${config.wordpressAPIURLWebsite}`,
      '/wp/v2/pages': `${config.wordpressAPIURLWebsite}`,
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
