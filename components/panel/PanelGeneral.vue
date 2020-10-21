<template>
  <div>
    <div class="tuning-panel__title">Общие настройки</div>
    <div class="tuning-panel__blocks">
      <div class="tuning-panel__block">
        <div class="tuning-panel__block__title mb-25px">Общий цвет фона</div>
        <div class="cells mb-15">
          <div class="cell cell-auto">
            <div class="tuning-bg tuning-bg--pills">
              <button
                class="tuning-bg__color tuning-bg__color1"
                :class="{ 'tuning-bg__color--active': isThemeLight }"
                @click="setSectionTheme('light')"
              ></button>
            </div>
            <div class="tuning-bg__label" aria-hidden="true">Светлый</div>
          </div>
          <div class="cell cell-auto">
            <div class="tuning-bg tuning-bg--pills">
              <button
                class="tuning-bg__color tuning-bg__color2"
                :class="{ 'tuning-bg__color--active': !isThemeLight }"
                @click="setSectionTheme('dark')"
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
                  'tuning-bg__color--active': colorSelected === index,
                }"
                :style="
                  getColorBg({
                    hue: color.hue,
                    saturation: color.saturation,
                    lightness: color.lightness,
                  })
                "
                :title="color.name"
                @click="
                  setBrandColor({
                    index: index,
                    hue: color.hue,
                    saturation: color.saturation,
                    lightness: color.lightness,
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
                        colorSelected === brandColors.length + 1,
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
        <div class="tuning-panel__block__title mb-25px">Вид кнопок</div>
        <div class="tuning-panel__settings tuning-panel__row">
          <div class="tuning-panel__cell tuning-setting-wrap">
            <button
              class="tuning-panel__setting tuning-setting"
              :class="{
                'tuning-setting--active': isBorderRadiusSet,
              }"
              @click="setButtonRadius"
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
                'tuning-setting--active': !isBorderRadiusSet,
              }"
              @click="removeButtonRadius"
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
        <div class="tuning-panel__block__title mb-25px">
          Расположение всплывающих форм
        </div>
        <div class="tuning-panel__settings tuning-panel__row">
          <div class="tuning-panel__cell tuning-setting-wrap">
            <a
              href=""
              class="tuning-panel__setting tuning-setting tuning-setting--active"
            >
              <div class="tuning-setting__image">
                <img
                  src="https://api.tian-lp.ru/uploads/popup_r_3cb7e205c4.png"
                />
              </div>
              <div class="tuning-setting__title">Справа</div>
            </a>
          </div>
          <div class="tuning-panel__cell tuning-setting-wrap">
            <a href="" class="tuning-panel__setting tuning-setting">
              <div class="tuning-setting__image">
                <img
                  src="https://api.tian-lp.ru/uploads/popup_c_e466725a7b.png"
                />
              </div>
              <div class="tuning-setting__title">По центру</div>
            </a>
          </div>
          <div class="tuning-panel__cell tuning-setting-wrap">
            <a href="" class="tuning-panel__setting tuning-setting">
              <div class="tuning-setting__image">
                <img
                  src="https://api.tian-lp.ru/uploads/popup_l_11ca5cfae0.png"
                />
              </div>
              <div class="tuning-setting__title">Слева</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    sections: Array,
  },
  data: function () {
    return {
      brandColors: [
        {
          name: "Темно-синий",
          hue: "224",
          saturation: "82%",
          lightness: "35%",
        },
        {
          name: "Синий",
          hue: "223",
          saturation: "91%",
          lightness: "55%",
        },
        {
          name: "Голубой",
          hue: "198",
          saturation: "91%",
          lightness: "55%",
        },
        {
          name: "Темно-зеленый",
          hue: "136",
          saturation: "77%",
          lightness: "25%",
        },
        {
          name: "Зеленый",
          hue: "136",
          saturation: "75%",
          lightness: "34%",
        },
        {
          name: "Салатовый",
          hue: "92",
          saturation: "59%",
          lightness: "49%",
        },
        {
          name: "Желтый",
          hue: "43",
          saturation: "94%",
          lightness: "51%",
        },
        {
          name: "Темно-красный",
          hue: "0",
          saturation: "73%",
          lightness: "38%",
        },
        {
          name: "Красный",
          hue: "0",
          saturation: "84%",
          lightness: "57%",
        },
        {
          name: "Ярко-розовый",
          hue: "346",
          saturation: "78%",
          lightness: "51%",
        },
        {
          name: "Фиолетовый",
          hue: "285",
          saturation: "58%",
          lightness: "44%",
        },
        {
          name: "Сиреневый",
          hue: "284",
          saturation: "59%",
          lightness: "64%",
        },
      ],
      isBorderRadiusSet: true,
      isThemeLight: true,
      colorSelected: 1,
      userColor: {
        h: 223,
        s: 0.91,
        l: 0.55,
      },
    };
  },
  methods: {
    ...mapMutations({
      setSettingsField: "pages/SET_SETTINGS_FIELD",
    }),
    setBrandColor(payload) {
      const rootEl = document.getElementById("lp");
      rootEl.style.setProperty("--hue", payload.hue);
      rootEl.style.setProperty("--saturation", payload.saturation);
      rootEl.style.setProperty("--lightness", payload.lightness);
      this.colorSelected = payload.index;
    },
    getColorBg(payload) {
      return {
        "background-color":
          "hsl(" +
          payload.hue +
          "," +
          payload.saturation +
          ", " +
          payload.lightness +
          ")",
      };
    },
    handlePickedColor() {
      this.setBrandColor({
        index: this.brandColors.length + 1,
        hue: this.userColor.h,
        saturation: Math.floor(this.userColor.s * 100) + "%",
        lightness: Math.floor(this.userColor.l * 100) + "%",
      });
    },
    setButtonRadius() {
      document.getElementById("app").classList.remove("buttons--style2");
      this.isBorderRadiusSet = true;
    },
    removeButtonRadius() {
      document.getElementById("app").classList.add("buttons--style2");
      this.isBorderRadiusSet = false;
    },
    setSectionTheme(val) {
      this.isThemeLight = val === "light" ? true : false;
      for (const section of this.sections) {
        this.setSettingsField({
          id: section.id,
          field: "background",
          value: val,
        });
      }
    },
  },
};
</script>