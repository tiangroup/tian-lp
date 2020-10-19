<template>
  <div>
    <div class="tuning-panel__title">Настройка разделов</div>
    <div class="tuning-panel__blocks">
      <div class="tuning-panel__subtitle">Настройте внешний вид разделов</div>
      <div class="tuning-panel__block">
        <div class="tuning-panel__row mb-25px justify-content-between">
          <table class="tuning-sort">
            <tbody>
              <tr
                class="tuning-sort__row"
                v-for="section in sections.filter((s) => s.id)"
                :key="section.id"
                :class="{ 'tuning-sort__row--active': section.show === true }"
              >
                <td class="tuning-sort__cell tuning-sort__name">
                  {{ section.title }}
                </td>
                <td class="tuning-sort__cell tuning-sort__action">
                  <button class="button button-icon">
                    <span class="icon icon-tuning"></span>
                    <span class="sr-only">Настройки блока</span>
                  </button>
                </td>
                <td class="tuning-sort__cell tuning-sort__action">
                  <label class="state-switch">
                    <input
                      type="checkbox"
                      class="state-switch__input"
                      :checked="section.show"
                    />
                    <div class="state-switch__label">
                      <span class="sr-only">Включить/выключить блок</span>
                    </div>
                  </label>
                </td>
                <td class="tuning-sort__cell tuning-sort__move">
                  <button class="button button-icon" type="button">
                    <div class="button__body">
                      <span class="icon icon-move"></span>
                      <span class="sr-only">Переместить блок</span>
                    </div>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="tuning-sort__submit">
                  <button type="button" name="" class="button button-primary">
                    <div class="button__body">Применить</div>
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sections: Array,
  },
};
</script>