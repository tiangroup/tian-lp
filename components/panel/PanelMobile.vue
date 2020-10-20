<template>
  <div>
    <div class="tuning-panel__title">Мобильная версия</div>
    <div class="tuning-panel__block">
      <div class="tuning-panel__block__title mb-25px">Цвет шапки и меню</div>
      <div class="cells mb-15px">
        <div class="cell cell-auto">
          <div class="tuning-bg tuning-bg--pills">
            <button
              class="tuning-bg__color tuning-bg__color1 tuning-bg__color--active"
            ></button>
          </div>
          <div class="tuning-bg__label" aria-hidden="true">
            Как на&nbsp;десктопе
          </div>
        </div>
        <div class="cell cell-auto">
          <div class="tuning-bg tuning-bg--pills">
            <button class="tuning-bg__color tuning-bg__color3"></button>
          </div>
          <div class="tuning-bg__label" aria-hidden="true">Цветной</div>
        </div>
      </div>
    </div>
    <div class="tuning-panel__block">
      <div class="tuning-panel__block__title mb-25px">Варианты шапок</div>
      <div class="tuning-panel__row tuning-panel__settings">
        <div class="tuning-panel__cell tuning-setting-wrap">
          <a
            href=""
            class="tuning-panel__setting tuning-setting"
            @click.prevent
          >
            <div class="tuning-setting__image">
              <img
                src="https://api.tian-lp.ru/uploads/m_header_1_de07dc0786.jpeg"
              />
            </div>
            <div class="tuning-setting__title">С кнопкой</div>
          </a>
        </div>
        <div class="tuning-panel__cell tuning-setting-wrap">
          <a
            href=""
            class="tuning-panel__setting tuning-setting tuning-setting--active"
            @click.prevent
          >
            <div class="tuning-setting__image">
              <img
                src="https://api.tian-lp.ru/uploads/m_header_2_cc34cd5165.jpeg"
              />
            </div>
            <div class="tuning-setting__title">Компакт</div>
          </a>
        </div>
      </div>
    </div>
    <div class="tuning-panel__block">
      <div class="tuning-panel__block__title mb-25px">Варианты меню</div>
      <div class="tuning-panel__row tuning-panel__settings">
        <div class="tuning-panel__cell tuning-setting-wrap">
          <a
            href=""
            class="tuning-panel__setting tuning-setting"
            @click.prevent
          >
            <div class="tuning-setting__image">
              <img
                src="https://api.tian-lp.ru/uploads/m_menu_1_4a6858e905.jpeg"
              />
            </div>
            <div class="tuning-setting__title">Подробное</div>
          </a>
        </div>
        <div class="tuning-panel__cell tuning-setting-wrap">
          <a
            href=""
            class="tuning-panel__setting tuning-setting tuning-setting--active"
            @click.prevent
          >
            <div class="tuning-setting__image">
              <img
                src="https://api.tian-lp.ru/uploads/m_menu_2_d358c1f312.jpeg"
              />
            </div>
            <div class="tuning-setting__title">Краткое</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>