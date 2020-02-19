
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#28a745', height: '4px', duration: 6000 },
  // loadingIndicator: {
  //   name: 'circle',
  //   color: 'red'
  // },
  /*
  ** Global CSS
  */
  css: [
    // '~/assets/css/style.css',

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/date-filter.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: 'http://localhost/my-first-nuxt-app/server/api_product/product'
  },

  env: {
    fbApiKey: 'AIzaSyAL_T6hXH0fxECd10Di4sJocmI1-wK0lOg'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
