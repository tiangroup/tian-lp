const moment = require("moment");

module.exports = {
  title: "TianLP",
  description: "Документация TianLP",
  themeConfig: {
    // nav: [
    //   //{ text: "Блоки", link: "/sections/" },
    //   //{ text: "Компоненты", link: "/components/" }
    // ],
    sidebar: ["/sections/", "/components/", "/plugins/"],
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
