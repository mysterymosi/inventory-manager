export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/spread-js@0.0.2/index.min.js",
        type: "text/javascript"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#28a745", height: "3px", duration: 6000 },
  // loadingIndicator: {
  //   name: 'circle',
  //   color: 'red'
  // },
  /*
   ** Global CSS
   */
  css: [
    "~assets/css/anime.css"
    // "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~plugins/date-filter.js", "~plugins/core-component.js"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios"],

  axios: {
    // baseURL: "http://localhost/my-first-nuxt-app/server/inventory-manager-api"
    baseURL: "http://127.0.0.1:8000/api"
    // baseURL: "http://localhost/my-first-nuxt-app/server/api_product/product"
  },

  env: {
    fbApiKey: "AIzaSyAL_T6hXH0fxECd10Di4sJocmI1-wK0lOg"
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  transition: {
    name: "fade",
    mode: "out-in"
  }
};
