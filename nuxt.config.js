import axios from "axios";
import apiFactory from './factories';
import projectConfig from './project.config';

const dev = process.env.NODE_ENV !== 'production';

const config = {dev, ...projectConfig};

export default {
  target: 'static', // default is 'server'
  ssr: true,
  components: true,
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  router: {
    trailingSlash: true,
  },
  publicRuntimeConfig: config,
  env: {
    baseUrl: process.env.BASE_URL || 'https://localhost:3000'
  },
  sitemap: {
    hostname: !dev ? config.baseURL.production : config.baseURL.development,
    trailingSlash: true,
  },
  render: {
    static: {
      // Add CORS header to static files.
      setHeaders(res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
      },
    }
  },
  generate: {
    exclude: [
      /^\/poslanec/ // path starts with /poslanec
    ],
    crawler: true,
    async routes() {

      let routes = [];

      const rodinyRes = await apiFactory.getRodinySocialniMapyFactory(config.wordpressAPIURLWebsite, config.databazePoslancuURL);
      const mediaRes =  await apiFactory.getAllMediaFactory(config.wordpressAPIURLWebsite, config.databazePoslancuURL, 100);
      const strankyRes =  await apiFactory.getAllStrankyFactory(config.wordpressAPIURLWebsite);

      const slovnikRes =  await apiFactory.getSlovnikovaHeslaFactory(config.wordpressAPIURLWebsite);

      //const osobyRes = await y.get(`${databazePoslancuURL}/Api/osoby/vsechny/`);

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

      const strankyRoutes = strankyRes.map(item => {

        return {
          route: `/stranka/${item.slug}`,
          payload: item // thanks to the payload, we are caching results for the subpage here
        };

      });

      const rodinyRoutes = rodinyRes.map(item => {

        // load persons in a family

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
    ['@nuxtjs/style-resources', {
      // your settings here
      sass: [
        '~assets/scss/defs/_all.sass',
      ],
      scss: [],
      hoistUseStatements: true  // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
    }],
    "@nuxtjs/svg",
    ['@nuxt/image', {
      // The screen sizes predefined by `@nuxt/image`:
      screens: config.responsive.breakpoints,
      domains: [config.wordpressURLWebsite, config.netlifyURL]
    }],
  ],
  modules: [
    ['@nuxtjs/proxy', {
      '/Api/snemovny/seznam': `${config.databazePoslancuURL}`,
      '/Api/snemovny/': `${config.databazePoslancuURL}`,
      '/Api/osoby': `${config.databazePoslancuURL}`,
      '/Api/soubory': `${config.databazePoslancuURL}`,
      '/wp/v2/slovnik': `${config.wordpressAPIURLWebsite}`,
      '/wp/v2/pages': `${config.wordpressAPIURLWebsite}`,
    }],
    // ['@nuxtjs/sentry', {
    //   dsn: 'https://9b271b2be5df44b9b13ace36c73dbfbe@o621712.ingest.sentry.io/5752198', // Enter your project's DSN here
    //   // Additional Module Options go here
    //   // https://sentry.nuxtjs.org/sentry/options
    //   config: {
    //     // Add native Sentry config here
    //     // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
    //   },
    // }],
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
    title: config.globalTitle,
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
