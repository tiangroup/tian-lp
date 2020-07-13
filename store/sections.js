export const state = () => ({
  sections: [
    {
      name: "Шапка сайта",
      component: "sections.header",
      settings: {
        background: [
          {
            title: "Светлый",
            value: "light",
            class: "tuning-bg__color1"
          },
          {
            title: "Темный",
            value: "dark",
            class: "tuning-bg__color2"
          }
        ],
        view2: [
          {
            title: "1",
            value: "view1",
            image: "/tuning/sections/header/header-1.jpg"
          },
          {
            title: "2",
            value: "view2",
            image: "/tuning/sections/header/header-2.jpg"
          },
          {
            title: "3",
            value: "view3",
            image: "/tuning/sections/header/header-3.jpg"
          },
          {
            title: "4",
            value: "view4",
            image: "/tuning/sections/header/header-4.jpg"
          },
          {
            title: "5",
            value: "view5",
            image: "/tuning/sections/header/header-5.jpg"
          },
          {
            title: "6",
            value: "view6",
            image: "/tuning/sections/header/header-6.jpg"
          }
        ]
      }
    },
    {
      name: "Промо",
      component: "sections.promo",
      settings: {
        background: [
          {
            title: "Светлый",
            value: "light",
            class: "tuning-bg__color1"
          },
          {
            title: "Темный",
            value: "dark",
            class: "tuning-bg__color2"
          }
        ],
        options: [
          {
            label: "Форма обратной связи",
            field: "form"
          },
          {
            label: "Картинка png на фоне",
            field: "image"
          },
          {
            label: "Кнопка",
            field: "button"
          }
        ]
      }
    },
    {
      name: "Тизер",
      component: "sections.highlights",
      settings: {
        background: [
          {
            title: "Светлый",
            value: "light",
            class: "tuning-bg__color1"
          },
          {
            title: "Темный",
            value: "dark",
            class: "tuning-bg__color2"
          }
        ]
      }
    },
    {
      name: "Преимущества",
      component: "sections.benefits",
      settings: {
        background: [
          {
            title: "Светлый",
            value: "light",
            class: "tuning-bg__color1"
          },
          {
            title: "Темный",
            value: "dark",
            class: "tuning-bg__color2"
          }
        ],
        view: [
          {
            title: "С картинками",
            value: "view1",
            image: "/tuning/sections/benefits/benefits-1.png"
          },
          {
            title: "В цифрах",
            value: "view2",
            image: "/tuning/sections/benefits/benefits-1.png"
          },
          {
            title: "С одной картинкой",
            value: "view3",
            image: "/tuning/sections/benefits/benefits-1.png"
          }
        ]
      }
    },
    {
      name: "Схема работы",
      component: "sections.process",
      settings: {
        background: [
          {
            title: "Светлый",
            value: "light",
            class: "tuning-bg__color1"
          },
          {
            title: "Темный",
            value: "dark",
            class: "tuning-bg__color2"
          }
        ]
      }
    }
  ]
});

export const getters = {
  sections: state => state.sections
};
