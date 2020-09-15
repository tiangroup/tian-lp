import axios from "axios";

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
    title: "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
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
    { src: "~/plugins/slick", ssr: false },
    { src: "~/plugins/vue-gallery.client.js" },
    "~plugins/vue-js-modal.js"
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
    "@nuxtjs/robots",
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
  build: {},
  serverMiddleware: ["~/api/upload", "~/api/sites", "~/api/forms"],
  generate: {
    fallback: true,
    routes() {
      const api_backend = process.env.API_BACKEND || "https://api.tian-lp.ru";
      const site_name = process.env.SITE_NAME;
      console.log("!!! API_BACKEND: " + api_backend);
      console.log("!!! SITE_NAME: " + site_name);
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
  },
  robots: {
    UserAgent: "*",
    Disallow: "/"
  }
};
