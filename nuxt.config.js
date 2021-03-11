export default {
  globalName: 'parlamentni-mapy',
  target: 'static', // default is 'server'
  components: true,
  publicRuntimeConfig: {
    globalTitle: 'Parlamentní mapy.cz'
  },
  modules: ['@nuxtjs/style-resources'],
  css: [
    '@/assets/scss/main.scss',
  ],
  build: {

  },
  head: {
    title: 'Parlamentní mapy.cz',
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
  }
};
