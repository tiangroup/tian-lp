import axios from "axios";

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: process.env.MODE_BUILD == "static" ? "static" : "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: ""
      }
    ]
    // link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: [
    //"medium-editor/dist/css/medium-editor.min.css",
    //"medium-editor/dist/css/themes/beagle.min.css",
    //"slick-carousel/slick/slick.css"
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "~/plugins/medium-editor", ssr: false },
    { src: "~/plugins/inject" },
    { src: "~/plugins/yandex-metrika", mode: "client" },
    { src: "~/plugins/slick", ssr: false },
    { src: "~/plugins/vue-gallery.client.js", ssr: false },
    { src: "~/plugins/v-clipboard", ssr: false },
    { src: "~/plugins/axios.js", mode: "client" }
  ],
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
    "~modules/robots",
    "~modules/sitemap",
    [
      "nuxt-env",
      {
        keys: [
          "API_BACKEND",
          "APP_BACKEND",
          { key: "ADMIN_TOKEN", secret: true }
        ]
      }
    ],
    [
      "@pivale/nuxt-image-loader-module",
      {
        imagesBaseDir: "content",
        imageStyles: {
          origin: {},
          icon_sm: { actions: ["resize|46|46"] },
          icon_md: { actions: ["resize|63|63"] },
          sq_xs: { macros: ["scaleAndCrop|63|63"] },
          sq_sm: { actions: ["resize|176|176>", "quality|85%"]},
          sq_md: { actions: ["resize|244|244>", "quality|85%"]},
          sq_lg: { actions: ["resize|520|520>", "quality|85%"]},
          rect_sm: { macros: ["scaleAndCrop|158|82"] },
          rect_md: { macros: ["scaleAndCrop|397|262"] },
          rect_lg: { actions: ["gravity|Center", "resize|592|391", "quality|95%"] },
          resize_sm: { actions: ["resize|158|82>", "quality|85%"] },
          resize_md: { actions: ["resize|400|200>", "quality|85%"] },
          resize_xl: { actions: ["resize|1400|1400>", "quality|95%"] },
          resize_v_md: { actions: ["resize|280|404", "quality|85%"] },
          resize_sq_sm: { actions: ["resize|176|176", "quality|85%"] },
          promo1: { actions: ["resize|696|600", "quality|95%"] },
          questions: { actions: ["resize|645|456", "quality|95%"] },
          cover: { actions: ["gravity|Center", "resize|1920|700>", "quality|100%"] },
          sq_lg_ext: { actions: ["trim", "gravity|Center", "resize|520|520>", "quality|85%"] },
          logo: { actions: ["resize|250|100>", "quality|95%"] },
          rect_benefits: { macros: ["scaleAndCrop|560|400"] }
        }
      }
    ],
    [
      "@nuxtjs/recaptcha",
      {
        hideBadge: true,
        siteKey: "-",
        version: 3
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: false
  },
  proxy: {
    // "/api/data/": {
    //   target: process.env.API_BACKEND,
    //   pathRewrite: { "^/api/data/": "" }
    // }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url:
              (process.env.API_BACKEND || "https://api.tian-lp.ru") +
              "/auth/local",
            method: "post",
            propertyName: "jwt"
          },
          user: {
            url:
              (process.env.API_BACKEND || "https://api.tian-lp.ru") +
              "/users/me",
            method: "get",
            propertyName: ""
          },
          logout: false
        }
      }
    },
    redirect: false,
    resetOnError: true,
    localStorage:
      process.env.MODE_BUILD == "static"
        ? false
        : {
            prefix: "auth."
          },
    cookie:
      process.env.MODE_BUILD == "static"
        ? false
        : {
            prefix: "auth.",
            options: {
              path: "/"
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
  build: {
    extractCSS: true
  },
  serverMiddleware: [
    "~/api/upload",
    "~/api/sites",
    "~/api/forms",
    "~/api/auth"
  ],
  generate: {
    fallback: true,
    routes() {
      const api_backend = process.env.API_BACKEND || "https://api.tian-lp.ru";
      const site_name = process.env.SITE_NAME;
      // console.log("!!! API_BACKEND: " + api_backend);
      // console.log("!!! SITE_NAME: " + site_name);
      return axios
        .get(`${api_backend}/sites`, {
          params: { name: site_name }
        })
        .then(({ data }) => {
          if (data.length) {
            return data[0].pages
              .filter(page => page.slug != "/")
              .map(page => page.slug);
          }
        });
    }
  }
};
