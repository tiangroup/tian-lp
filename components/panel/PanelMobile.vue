<template>
  <div>
    <div class="tuning-panel__title">Мобильная версия</div>
    <div class="tuning-panel__block">
      <div class="tuning-panel__block__title">Цвет шапки и меню</div>
      <div class="cells">
        <div class="cell cell-auto mb-15px">
          <div class="tuning-bg tuning-bg--pills">
            <button
              class="tuning-bg__color tuning-bg__color1"
              :class="{
                'tuning-bg__color--active':
                  !settings.header.mcolor || settings.header.mcolor == 'desktop'
              }"
              @click="setColor('desktop')"
            ></button>
          </div>
          <div class="tuning-bg__label" aria-hidden="true">
            Как на&nbsp;десктопе
          </div>
        </div>
        <div class="cell cell-auto mb-15px">
          <div class="tuning-bg tuning-bg--pills">
            <button
              class="tuning-bg__color tuning-bg__color3"
              :class="{
                'tuning-bg__color--active': settings.header.mcolor == 'color'
              }"
              @click="setColor('color')"
            ></button>
          </div>
          <div class="tuning-bg__label" aria-hidden="true">Цветной</div>
        </div>
      </div>
    </div>
    <div class="tuning-panel__block">
      <div class="tuning-panel__block__title">Варианты шапок</div>
      <div class="tuning-panel__row tuning-panel__settings">
        <div class="tuning-panel__cell tuning-setting-wrap">
          <button
            class="tuning-panel__setting tuning-setting"
            :class="{
              'tuning-setting--active':
                !settings.header.mheader || settings.header.mheader == 'button'
            }"
            @click="setHeader('button')"
          >
            <div class="tuning-setting__image">
              <img
                src="https://api.tian-lp.ru/uploads/m_header_1_de07dc0786.jpeg"
              />
            </div>
            <div class="tuning-setting__title">С кнопкой</div>
          </button>
        </div>
        <div class="tuning-panel__cell tuning-setting-wrap">
          <button
            class="tuning-panel__setting tuning-setting"
            :class="{
              'tuning-setting--active': settings.header.mheader == 'compact'
            }"
            @click="setHeader('compact')"
          >
            <div class="tuning-setting__image">
              <img
                src="https://api.tian-lp.ru/uploads/m_header_2_cc34cd5165.jpeg"
              />
            </div>
            <div class="tuning-setting__title">Компакт</div>
          </button>
        </div>
      </div>
    </div>
    <div class="tuning-panel__block">
      <div class="tuning-panel__block__title">Варианты меню</div>
      <div class="tuning-panel__row tuning-panel__settings">
        <div class="tuning-panel__cell tuning-setting-wrap">
          <button
            class="tuning-panel__setting tuning-setting"
            :class="{
              'tuning-setting--active':
                !settings.header.mmenu || settings.header.mmenu == 'long'
            }"
            @click="setMenu('long')"
          >
            <div class="tuning-setting__image">
              <img
                src="https://api.tian-lp.ru/uploads/m_menu_1_4a6858e905.jpeg"
              />
            </div>
            <div class="tuning-setting__title">Подробное</div>
          </button>
        </div>
        <div class="tuning-panel__cell tuning-setting-wrap">
          <button
            class="tuning-panel__setting tuning-setting"
            :class="{
              'tuning-setting--active': settings.header.mmenu == 'short'
            }"
            @click="setMenu('short')"
          >
            <div class="tuning-setting__image">
              <img
                src="https://api.tian-lp.ru/uploads/m_menu_2_d358c1f312.jpeg"
              />
            </div>
            <div class="tuning-setting__title">Краткое</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters({
      settings: "sites/settings"
    })
  },
  methods: {
    ...mapMutations({
      setColor: "sites/SET_SETTINGS_HEADER_MCOLOR",
      setHeader: "sites/SET_SETTINGS_HEADER_MHEADER",
      setMenu: "sites/SET_SETTINGS_HEADER_MMENU"
    })
  }
};
</script>
