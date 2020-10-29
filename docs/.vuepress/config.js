const moment = require("moment");

module.exports = {
  title: "TianLP",
  description: "Документация TianLP",
  themeConfig: {
    // nav: [
    //   //{ text: "Блоки", link: "/sections/" },
    //   //{ text: "Компоненты", link: "/components/" }
    // ],
    sidebar: [
      "/",
      {
        title: "Блоки страницы",
        path: "/sections/",
        children: [
          "/sections/header",
          "/sections/promo",
          "/sections/highlights",
          "/sections/benefits",
          "/sections/products",
          "/sections/services",
          "/sections/photoes",
          "/sections/process",
          "/sections/staff",
          "/sections/reviews",
          "/sections/about",
          "/sections/partners",
          "/sections/video",
          "/sections/tarifs",
          "/sections/cta",
          "/sections/questions",
          "/sections/contacts",
          "/sections/footer"
        ]
      },
      {
        title: "Компоненты",
        children: [
          "/components/editor",
          "/components/editor-html",
          "/components/editor-text",
          "/components/image-item",
          "/components/forms"
        ]
      },
      {
        title: "Плагины",
        children: [
          "/plugins/inject",
          "/plugins/vue-slick",
          "/plugins/vue-gallery",
          "/plugins/vue-yandex-maps"
        ]
      }
    ],
    lastUpdated: "Изменено"
  },
  plugins: [
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          //return new Date(timestamp).toLocaleString(lang);
          moment.locale(lang);
          return moment(timestamp).format("LLL");
        }
      }
    ]
  ],
  locales: {
    "/": {
      lang: "ru-RU"
    }
  }
};
