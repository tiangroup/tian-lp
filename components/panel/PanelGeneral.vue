<template>
  <div>
    <div class="tuning-panel__title">Общие настройки</div>
    <div class="tuning-panel__blocks">
      <div class="tuning-panel__block">
        <div class="tuning-panel__block__title">Общий цвет фона</div>
        <div class="cells">
          <div class="cell cell-auto mb-15px">
            <div class="tuning-bg tuning-bg--pills">
              <button
                class="tuning-bg__color tuning-bg__color1"
                :class="{
                  'tuning-bg__color--active': settings.background != 'dark'
                }"
                @click="setSettingsBackground('light')"
              ></button>
            </div>
            <div class="tuning-bg__label" aria-hidden="true">Светлый</div>
          </div>
          <div class="cell cell-auto mb-15px">
            <div class="tuning-bg tuning-bg--pills">
              <button
                class="tuning-bg__color tuning-bg__color2"
                :class="{
                  'tuning-bg__color--active': settings.background == 'dark'
                }"
                @click="setSettingsBackground('dark')"
              ></button>
            </div>
            <div class="tuning-bg__label" aria-hidden="true">Темный</div>
          </div>
        </div>
      </div>
      <div class="tuning-panel__block">
        <div class="tuning-panel__block__title mb-25px">
          Базовый цвет элементов
        </div>
        <div class="cells">
          <div
            class="cell cell-auto mb-25px"
            v-for="(color, index) in brandColors"
            :key="index"
          >
            <div class="tuning-bg">
              <button
                class="tuning-bg__color"
                :class="{
                  'tuning-bg__color--active': colorSelected === index
                }"
                :style="getColorBg(color)"
                :title="color.name"
                @click="
                  setBrandColor({
                    index: index,
                    h: color.h,
                    s: color.s,
                    l: color.l
                  })
                "
              ></button>
            </div>
          </div>

          <div class="cell cell-auto mb-25px">
            <div class="tuning-bg">
              <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <button
                    class="tuning-bg__color tuning-bg__colorN"
                    :class="{
                      'tuning-bg__color--active':
                        colorSelected === brandColors.length + 1
                    }"
                    title="Пользовательский"
                    v-bind="attrs"
                    v-on="on"
                  ></button>
                </template>
                <v-color-picker
                  dot-size="25"
                  hide-mode-switch
                  mode="hsla"
                  swatches-max-height="200"
                  @update:color="handlePickedColor"
                  v-model="userColor"
                ></v-color-picker>
              </v-menu>
            </div>
          </div>
        </div>
      </div>
      <div class="tuning-panel__block">
        <div class="tuning-panel__block__title">Вид кнопок</div>
        <div class="tuning-panel__settings tuning-panel__row">
          <div class="tuning-panel__cell tuning-setting-wrap">
            <button
              class="tuning-panel__setting tuning-setting"
              :class="{
                'tuning-setting--active': settings.buttons !== 'rect'
              }"
              @click="setSettingsButtons('round')"
            >
              <div class="tuning-setting__image">
                <img
                  src="https://api.tian-lp.ru/uploads/buttons_round_658421c806.png"
                />
              </div>
              <div class="tuning-setting__title">Скругленные</div>
            </button>
          </div>
          <div class="tuning-panel__cell tuning-setting-wrap">
            <button
              class="tuning-panel__setting tuning-setting"
              :class="{
                'tuning-setting--active': settings.buttons == 'rect'
              }"
              @click="setSettingsButtons('rect')"
            >
              <div class="tuning-setting__image">
                <img
                  src="https://api.tian-lp.ru/uploads/buttons_rect_9356a4595b.png"
                />
              </div>
              <div class="tuning-setting__title">Прямоугольные</div>
            </button>
          </div>
        </div>
      </div>
      <div class="tuning-panel__block">
        <div class="tuning-panel__block__title">
          Расположение всплывающих форм
        </div>
        <div class="tuning-panel__settings tuning-panel__row">
          <div class="tuning-panel__cell tuning-setting-wrap">
            <button
              class="tuning-panel__setting tuning-setting"
              :class="{
                'tuning-setting--active': settings.popup == 'right'
              }"
              @click="setSettingsPopup('right')"
            >
              <div class="tuning-setting__image">
                <img
                  src="https://api.tian-lp.ru/uploads/popup_r_3cb7e205c4.png"
                />
              </div>
              <div class="tuning-setting__title">Справа</div>
            </button>
          </div>
          <div class="tuning-panel__cell tuning-setting-wrap">
            <button
              class="tuning-panel__setting tuning-setting"
              @click="setSettingsPopup('center')"
              :class="{
                'tuning-setting--active':
                  !settings.popup || settings.popup == 'center'
              }"
            >
              <div class="tuning-setting__image">
                <img
                  src="https://api.tian-lp.ru/uploads/popup_c_e466725a7b.png"
                />
              </div>
              <div class="tuning-setting__title">По центру</div>
            </button>
          </div>
          <div class="tuning-panel__cell tuning-setting-wrap">
            <button
              class="tuning-panel__setting tuning-setting"
              @click="setSettingsPopup('left')"
              :class="{
                'tuning-setting--active': settings.popup == 'left'
              }"
            >
              <div class="tuning-setting__image">
                <img
                  src="https://api.tian-lp.ru/uploads/popup_l_11ca5cfae0.png"
                />
              </div>
              <div class="tuning-setting__title">Слева</div>
            </button>
          </div>
        </div>
      </div>
      <div class="tuning-panel__block">
        <div class="tuning-panel__block__title mb-0">Демо панель</div>
        <div class="cells">
          <div class="cell cell-auto">
            <v-switch v-model="demo" label="показывать на сайте"></v-switch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    sections: Array
  },
  data: function () {
    return {
      brandColors: [
        {
          name: "Темно-синий",
          h: 224,
          s: 0.82,
          l: 0.35
        },
        {
          name: "Синий",
          h: 223,
          s: 0.91,
          l: 0.55
        },
        {
          name: "Голубой",
          h: 198,
          s: 0.91,
          l: 0.55
        },
        {
          name: "Темно-зеленый",
          h: 136,
          s: 0.77,
          l: 0.25
        },
        {
          name: "Зеленый",
          h: 136,
          s: 0.75,
          l: 0.34
        },
        {
          name: "Салатовый",
          h: 92,
          s: 0.59,
          l: 0.49
        },
        {
          name: "Желтый",
          h: 43,
          s: 0.94,
          l: 0.51
        },
        {
          name: "Темно-красный",
          h: 0,
          s: 0.73,
          l: 0.38
        },
        {
          name: "Красный",
          h: 0,
          s: 0.84,
          l: 0.57
        },
        {
          name: "Ярко-розовый",
          h: 346,
          s: 0.78,
          l: 0.51
        },
        {
          name: "Фиолетовый",
          h: 285,
          s: 0.58,
          l: 0.44
        },
        {
          name: "Сиреневый",
          h: 284,
          s: 0.59,
          l: 0.64
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      site: "sites/site",
      settings: "sites/settings"
    }),
    userColor: {
      get() {
        return (
          this.settings.color || {
            h: 223,
            s: 0.91,
            l: 0.55
          }
        );
      },
      set(value) {
        this.setSettingsColor(value);
      }
    },
    colorSelected() {
      const color = this.brandColors.find(
        (c) =>
          c.h == this.userColor.h &&
          c.s == this.userColor.s &&
          c.l == this.userColor.l
      );
      return color
        ? this.brandColors.indexOf(color)
        : this.brandColors.length + 1;
    },
    demo: {
      get() {
        return this.site.demo;
      },
      set(value) {
        this.setDemo(value);
      }
    }
  },
  methods: {
    ...mapMutations({
      setSettingsField: "pages/SET_SETTINGS_FIELD",
      setSettingsColor: "sites/SET_SETTINGS_COLOR",
      setSettingsBackground: "sites/SET_SETTINGS_BACKGROUND",
      setSettingsButtons: "sites/SET_SETTINGS_BUTTONS",
      setSettingsPopup: "sites/SET_SETTINGS_POPUP",
      setDemo: "sites/SET_DEMO"
    }),
    setBrandColor(payload) {
      this.setSettingsColor({
        h: payload.h,
        s: payload.s,
        l: payload.l
      });
    },
    getColorBg(color) {
      return {
        "background-color": `hsl(${color.h},${Math.floor(
          color.s * 100
        )}%,${Math.floor(color.l * 100)}%)`
      };
    },
    handlePickedColor() {
      this.setBrandColor({
        h: this.userColor.h,
        s: this.userColor.s,
        l: this.userColor.l
      });
    }
  }
};
</script>
