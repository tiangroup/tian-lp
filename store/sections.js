export const state = () => ({
  sections: [],

  sections2: [
    {
      name: "Шапка страницы",
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
            image: "/admin/tuning/sections/header/header-1.jpg"
          },
          {
            title: "2",
            value: "view2",
            image: "/admin/tuning/sections/header/header-2.jpg"
          },
          {
            title: "3",
            value: "view3",
            image: "/admin/tuning/sections/header/header-3.jpg"
          },
          {
            title: "4",
            value: "view4",
            image: "/admin/tuning/sections/header/header-4.jpg"
          },
          {
            title: "5",
            value: "view5",
            image: "/admin/tuning/sections/header/header-5.jpg"
          },
          {
            title: "6",
            value: "view6",
            image: "/admin/tuning/sections/header/header-6.jpg"
          }
        ]
      },
      template: {
        __component: "sections.header",
        show: false,
        settings: {
          background: "light",
          view: "view1"
        },
        menu: [],
        logo_slogan: "Название организации",
        logo_text: "Логотип",
        address: "Адрес организации",
        phone: '<a href="tel:+79002000700">+7 (900) 2000 700</a>'
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
      },
      template: {
        __component: "sections.promo",
        show: false,
        settings: {
          background: "light",
          form: true,
          image: false,
          button: false
        },
        title: "Заголовок блока",
        description: "Описание блока"
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
      },
      template: {
        __component: "sections.highlights",
        show: false,
        settings: {
          background: "light"
        }
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
            image: "/admin/tuning/sections/benefits/benefits-1.png"
          },
          {
            title: "В цифрах",
            value: "view2",
            image: "/admin/tuning/sections/benefits/benefits-2.png"
          },
          {
            title: "С одной картинкой",
            value: "view3",
            image: "/admin/tuning/sections/benefits/benefits-3.png"
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

export const mutations = {
  SET_SECTIONS(state, sections) {
    state.sections = sections;
  }
};

export const actions = {
  async loadSections({ commit }) {
    try {
      const sections = await this.$axios.$get(`${this.$url_api}/sections`);
      commit("SET_SECTIONS", sections);
    } catch (error) {
      console.error(error);
    }
  }
};

export const getters = {
  sections: state => state.sections
};
