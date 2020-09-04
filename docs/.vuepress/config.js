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
          return new Date(timestamp).toLocaleString(lang);
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
