const moment = require("moment");

module.exports = {
  title: "TianLP",
  description: "Документация TianLP",
  themeConfig: {
    // nav: [
    //   //{ text: "Блоки", link: "/sections/" },
    //   //{ text: "Компоненты", link: "/components/" }
    // ],
    sidebar: ["/sections/", "/components/", "/plugin-docs/"],
    lastUpdated: "Изменено"
  },
  plugins: [
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          const moment = require("moment");
          moment.locale(lang);
          return moment(timestamp).fromNow();
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
