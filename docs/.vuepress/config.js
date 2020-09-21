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
      //"/sections/",
      {
        title: "Блоки страницы",
        path: "/sections/",
        children: ["/sections/header", "/sections/promo"]
      },
      {
        title: "Компоненты",
        children: [
          "/components/editor",
          "/components/image-item",
          "/components/forms"
        ]
      },
      {
        title: "Плагины",
        //path: "/plugins/",
        children: [
          "/plugins/inject",
          "/plugins/vue-slick",
          "/plugins/vue-gallery"
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
