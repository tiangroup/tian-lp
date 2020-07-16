export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: [
    "medium-editor/dist/css/medium-editor.min.css",
    "medium-editor/dist/css/themes/beagle.min.css"
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [{ src: "~/plugins/medium-editor", ssr: false }],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    [
      "@reallifedigital/nuxt-image-loader-module",
      {
        imagesBaseDir: "content",
        imageStyles: {
          thumbnail: {
            actions: [
              "gravity|Center",
              "resize|320|180^",
              "extent|320|180|+0|+90"
            ]
          },
          small: { macros: ["scaleAndCrop|160|90"] },
          medium: { macros: ["scaleAndCrop|320|180"] },
          large: { macros: ["scaleAndCrop|640|360"] }
        },
        // Optional responsive style profiles:
        responsiveStyles: {
          thumb: {
            srcset: "small 160w, medium 320w, large 640w",
            sizes: "(min-width: 1280px) 100vw, 50vw"
          }
        }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  proxy: {
    "/api/data/": {
      target: process.env.API_BACKEND || "https://api.tian-lp.ru:443",
      pathRewrite: { "^/api/data/": "" }
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/data/auth/local",
            method: "post",
            propertyName: "jwt"
          },
          user: { url: "/api/data/users/me", method: "get", propertyName: "" },
          logout: false
        }
      }
    }
  },
  bootstrapVue: {
    icons: true // Install the IconsPlugin (in addition to BootStrapVue plugin
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  serverMiddleware: ["~/api/upload"]
};
