export default {
  globalName: 'databaze-poslancu',
  target: 'static', // default is 'server'
  components: true,
  publicRuntimeConfig: {
    globalTitle: 'Databáze poslanců.cz'
  },
  modules: ['@nuxtjs/style-resources', '@nuxtjs/proxy',  '@nuxtjs/axios'],
  css: [
    '~assets/scss/main.scss',
  ],
  styleResources: {
    sass: ['~bulma/sass/utilities/all']
  },
  build: {

  },
  buildModules: ["@nuxtjs/svg", '@nuxtjs/html-validator'],
  proxy: {
    '/Api/snemovny/seznam': 'http://parliament.ustrcr.cz',
    '/Api/osoby': 'http://parliament.ustrcr.cz'
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
