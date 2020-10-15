<template>
  <div class="landing__tp">
    <div class="landing__tpb">
      <button
        class="button button-primary button-icon button-tpb"
        @click="showTuningPanel = !showTuningPanel"
      >
        <svg
          width="27"
          height="28"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 2.5H1.99805" stroke="currentColor" />
          <path d="M4.99805 2.50049H20.998" stroke="currentColor" />
          <circle cx="3.49805" cy="2.5" r="2" stroke="currentColor" />
          <path d="M20.998 9.5H19" stroke="currentColor" />
          <path d="M16 9.50049H0" stroke="currentColor" />
          <circle
            r="2"
            transform="matrix(-1 0 0 1 17.5 9.5)"
            stroke="currentColor"
          />
          <path d="M0 17.5H1.99805" stroke="currentColor" />
          <path d="M4.99805 17.5005H20.998" stroke="currentColor" />
          <circle cx="3.49805" cy="17.5" r="2" stroke="currentColor" />
        </svg>
        <span class="sr-only">Показать / скрыть панель настроек</span>
      </button>
    </div>
    <v-navigation-drawer
      class="tp-holder"
      v-model="showTuningPanel"
      fixed
      floating
      temporary
      overlay-opacity="0"
      width="100%"
    >
      <div class="tuning">
        <div class="tuning-heading">
          <div class="tuning-heading__row">
            <div class="tuning-heading__cell">
              <div class="tuning-heading__title">Настройки лендинга</div>
            </div>
            <div class="tuning-heading__cell tuning-heading__reset">
              <button class="button button-text button-icon-w-text">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.20725 9.70724C6.81625 10.0982 6.18425 10.0982 5.79325 9.70724L2.79325 6.70724C2.40225 6.31624 2.40225 5.68424 2.79325 5.29324L5.79325 2.29324C5.98825 2.09824 6.24425 2.00024 6.50025 2.00024C6.75625 2.00024 7.01225 2.09824 7.20725 2.29324C7.59825 2.68424 7.59825 3.31624 7.20725 3.70724L5.91425 5.00024H17.9102C19.8902 5.00024 21.5002 6.58324 21.5002 8.52924V11.0002C21.5002 11.5532 21.0532 12.0002 20.5002 12.0002C19.9473 12.0002 19.5002 11.5532 19.5002 11.0002V8.52924C19.5002 7.68624 18.7873 7.00024 17.9102 7.00024L5.91425 7.00024L7.20725 8.29324C7.59825 8.68424 7.59825 9.31624 7.20725 9.70724ZM18.0861 19.0002H6.09005C4.11105 19.0002 2.50005 17.4172 2.50005 15.4712V13.0002C2.50005 12.4472 2.94705 12.0002 3.50005 12.0002C4.05305 12.0002 4.50005 12.4472 4.50005 13.0002V15.4712C4.50005 16.3132 5.21305 17.0002 6.09005 17.0002H18.0861L16.793 15.7072C16.4031 15.3162 16.4031 14.6842 16.793 14.2932C16.9881 14.0982 17.2441 14.0002 17.5 14.0002C17.7561 14.0002 18.012 14.0982 18.207 14.2932L21.2071 17.2932C21.5981 17.6842 21.5981 18.3162 21.2071 18.7072L18.207 21.7072C17.817 22.0982 17.1841 22.0982 16.793 21.7072C16.4031 21.3162 16.4031 20.6842 16.793 20.2932L18.0861 19.0002Z"
                    fill="currentColor"
                  />
                  <mask
                    id="mask0"
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                    x="2"
                    y="2"
                    width="20"
                    height="21"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.20725 9.70724C6.81625 10.0982 6.18425 10.0982 5.79325 9.70724L2.79325 6.70724C2.40225 6.31624 2.40225 5.68424 2.79325 5.29324L5.79325 2.29324C5.98825 2.09824 6.24425 2.00024 6.50025 2.00024C6.75625 2.00024 7.01225 2.09824 7.20725 2.29324C7.59825 2.68424 7.59825 3.31624 7.20725 3.70724L5.91425 5.00024H17.9102C19.8902 5.00024 21.5002 6.58324 21.5002 8.52924V11.0002C21.5002 11.5532 21.0532 12.0002 20.5002 12.0002C19.9473 12.0002 19.5002 11.5532 19.5002 11.0002V8.52924C19.5002 7.68624 18.7873 7.00024 17.9102 7.00024L5.91425 7.00024L7.20725 8.29324C7.59825 8.68424 7.59825 9.31624 7.20725 9.70724ZM18.0861 19.0002H6.09005C4.11105 19.0002 2.50005 17.4172 2.50005 15.4712V13.0002C2.50005 12.4472 2.94705 12.0002 3.50005 12.0002C4.05305 12.0002 4.50005 12.4472 4.50005 13.0002V15.4712C4.50005 16.3132 5.21305 17.0002 6.09005 17.0002H18.0861L16.793 15.7072C16.4031 15.3162 16.4031 14.6842 16.793 14.2932C16.9881 14.0982 17.2441 14.0002 17.5 14.0002C17.7561 14.0002 18.012 14.0982 18.207 14.2932L21.2071 17.2932C21.5981 17.6842 21.5981 18.3162 21.2071 18.7072L18.207 21.7072C17.817 22.0982 17.1841 22.0982 16.793 21.7072C16.4031 21.3162 16.4031 20.6842 16.793 20.2932L18.0861 19.0002Z"
                      fill="currentColor"
                    />
                  </mask>
                  <g mask="url(#mask0)"></g>
                </svg>
                Сбросить
              </button>
            </div>
            <div class="tuning-heading__cell tuning-heading__close">
              <button
                class="button button-icon"
                @click="showTuningPanel = false"
              >
                <span class="sr-only">Закрыть</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L9 9M17 17L9 9M9 9L1 17M9 9L17 1"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="tuning-body">
          <v-tabs vertical>
            <v-tab class="tuning-nav__item">Общие</v-tab>
            <v-tab class="tuning-nav__item">Шапка</v-tab>
            <v-tab class="tuning-nav__item">Разделы</v-tab>
            <v-tab class="tuning-nav__item">Футер</v-tab>
            <v-tab class="tuning-nav__item">Мобильная версия</v-tab>

            <v-tab-item>
              <div class="tuning-panel">
                <div class="tuning-panel__title">Общие настройки</div>
                <div class="tuning-panel__blocks">
                  <div class="tuning-panel__block">
                    <div class="tuning-panel__block__title mb-25px">
                      Общий цвет фона
                    </div>
                    <div class="cells mb-15">
                      <div class="cell cell-auto">
                        <div class="tuning-bg tuning-bg--pills">
                          <a
                            href=""
                            class="tuning-bg__color tuning-bg__color1 tuning-bg__color--active"
                          ></a>
                        </div>
                        <div class="tuning-bg__label" aria-hidden="true">
                          Светлый
                        </div>
                      </div>
                      <div class="cell cell-auto">
                        <div class="tuning-bg tuning-bg--pills">
                          <a
                            href=""
                            class="tuning-bg__color tuning-bg__color2"
                          ></a>
                        </div>
                        <div class="tuning-bg__label" aria-hidden="true">
                          Темный
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tuning-panel__block">
                    <div class="tuning-panel__block__title mb-25px">
                      Базовый цвет элементов
                    </div>
                    <div class="cells">
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color"
                            style="background-color: hsl(224, 82%, 35%)"
                            title="Темно-синий"
                          ></a>
                        </div>
                      </div>
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color tuning-bg__color--active"
                            style="background-color: hsl(223, 91%, 55%)"
                            title="Синий"
                          ></a>
                        </div>
                      </div>
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color"
                            style="background-color: hsl(198, 91%, 55%)"
                            title="Голубой"
                          ></a>
                        </div>
                      </div>
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color"
                            style="background-color: hsl(136, 77%, 25%)"
                            title="Темно-зеленый"
                          ></a>
                        </div>
                      </div>
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color"
                            style="background-color: hsl(136, 75%, 34%)"
                            title="Зеленый"
                          ></a>
                        </div>
                      </div>
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color"
                            style="background-color: hsl(92, 59%, 49%)"
                            title="Салатовый"
                          ></a>
                        </div>
                      </div>
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color"
                            style="background-color: hsl(43, 94%, 51%)"
                            title="Желтый"
                          ></a>
                        </div>
                      </div>
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color"
                            style="background-color: hsl(0, 73%, 38%)"
                            title="Темно-красный"
                          ></a>
                        </div>
                      </div>
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color"
                            style="background-color: hsl(0, 84%, 57%)"
                            title="Красный"
                          ></a>
                        </div>
                      </div>
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color"
                            style="background-color: hsl(346, 78%, 51%)"
                            title="Ярко-розовый"
                          ></a>
                        </div>
                      </div>
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color"
                            style="background-color: hsl(285, 58%, 44%)"
                            title="Фиолетовый"
                          ></a>
                        </div>
                      </div>
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color"
                            style="background-color: hsl(284, 59%, 64%)"
                            title="Сиреневый"
                          ></a>
                        </div>
                      </div>
                      <div class="cell cell-auto mb-25px">
                        <div class="tuning-bg">
                          <a
                            href=""
                            class="tuning-bg__color tuning-bg__colorN"
                            title="Пользовательский"
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tuning-panel__block">
                    <div class="tuning-panel__block__title mb-25px">
                      Вид кнопок
                    </div>
                    <div class="tuning-panel__settings tuning-panel__row">
                      <div class="tuning-panel__cell tuning-setting-wrap">
                        <a
                          href=""
                          class="tuning-panel__setting tuning-setting tuning-setting--active"
                        >
                          <div class="tuning-setting__image">
                            <!-- <img
                              src="../assets/images/tuning/buttons-round.png"
                            /> -->
                          </div>
                          <div class="tuning-setting__title">Скругленные</div>
                        </a>
                      </div>
                      <div class="tuning-panel__cell tuning-setting-wrap">
                        <a href="" class="tuning-panel__setting tuning-setting">
                          <div class="tuning-setting__image">
                            <!-- <img
                              src="../assets/images/tuning/buttons-rect.png"
                            /> -->
                          </div>
                          <div class="tuning-setting__title">Прямоугольные</div>
                        </a>
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
                            <!-- <img src="../assets/images/tuning/popup-r.png" /> -->
                          </div>
                          <div class="tuning-setting__title">Справа</div>
                        </a>
                      </div>
                      <div class="tuning-panel__cell tuning-setting-wrap">
                        <a href="" class="tuning-panel__setting tuning-setting">
                          <div class="tuning-setting__image">
                            <!-- <img src="../assets/images/tuning/popup-c.png" /> -->
                          </div>
                          <div class="tuning-setting__title">По центру</div>
                        </a>
                      </div>
                      <div class="tuning-panel__cell tuning-setting-wrap">
                        <a href="" class="tuning-panel__setting tuning-setting">
                          <div class="tuning-setting__image">
                            <!-- <img src="../assets/images/tuning/popup-l.png" /> -->
                          </div>
                          <div class="tuning-setting__title">Слева</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-tab-item>
            <v-tab-item></v-tab-item>
            <v-tab-item></v-tab-item>
            <v-tab-item></v-tab-item>
            <v-tab-item></v-tab-item>
          </v-tabs>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      showTuningPanel: false,
    };
  },
  methods: {},
};
</script>
<style scoped>
.tp-holder {
  background: transparent !important;
  box-shadow: none !important;
  max-width: 47rem;
  z-index: 10010;
}
</style>