<template>
  <div>
    <div class="tuning-panel__title">Настройка разделов</div>
    <div class="tuning-panel__blocks">
      <div class="tuning-panel__subtitle">Настройте внешний вид разделов</div>
      <div class="tuning-panel__block">
        <div class="tuning-panel__row mb-25px justify-content-between">
          <div class="tuning-sort">
            <v-expansion-panels v-model="currentPanel" accordion flat>
              <draggable v-model="sectsArray" handle=".sort-handle">
                <v-expansion-panel
                  class="tuning-sort__row"
                  v-for="(section, sectionIndex) in sections.filter(
                    (s) => s.id
                  )"
                  :key="section.id"
                  :class="{ 'tuning-sort__row--active': section.show === true }"
                >
                  <div class="tuning-sort__cell tuning-sort__name">
                    {{ sectionName(section) }}
                  </div>
                  <div class="tuning-sort__cell tuning-sort__action">
                    <button
                      class="button button-icon"
                      @click="toggleSectionSettings(sectionIndex, section.id)"
                    >
                      <span class="icon icon-tuning"></span>
                      <span class="sr-only">Настройки блока</span>
                    </button>
                  </div>
                  <div class="tuning-sort__cell tuning-sort__action">
                    <label class="state-switch">
                      <input
                        type="checkbox"
                        class="state-switch__input"
                        :checked="section.show"
                        @change="toggleSectionVisibility(section)"
                      />
                      <div class="state-switch__label">
                        <span class="sr-only">Включить/выключить блок</span>
                      </div>
                    </label>
                  </div>
                  <div class="tuning-sort__cell tuning-sort__move">
                    <button
                      class="button button-icon sort-handle"
                      type="button"
                    >
                      <span class="button__body">
                        <span class="icon icon-move"></span>
                        <span class="sr-only">Переместить блок</span>
                      </span>
                    </button>
                  </div>
                  <div class="tuning-sort__settings">
                    <v-expansion-panel-content eager>
                      <settings
                        :component="section.__component"
                        :sectionId="section.id"
                        :settings="section.settings"
                      />
                    </v-expansion-panel-content>
                  </div>
                </v-expansion-panel>
              </draggable>
            </v-expansion-panels>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  props: {
    sections: Array,
  },
  data: function () {
    return {
      currentPanel: null,
    };
  },
  computed: {
    ...mapGetters({
      sects: "sections/sections",
    }),
    sectsArray: {
      get: function () {
        return this.sections;
      },
      set: function () {},
    },
  },
  methods: {
    ...mapMutations({
      setSectionField: "pages/SET_SECTION_FIELD",
    }),
    toggleSectionSettings(index, id) {
      if (this.currentPanel === index) {
        this.currentPanel = null;
      } else {
        this.currentPanel = index;
        document.getElementById(id).scrollIntoView();
      }
    },
    toggleSectionVisibility(section) {
      this.setSectionField({
        id: section.id,
        field: "show",
        value: !section.show,
      });
    },
    sectionName(section) {
      const sectionConfig = this.sects.find(function (sect) {
        if (sect.component === section.__component) {
          return true;
        }
      });
      return sectionConfig.name;
    },
  },
};
</script>
<style scoped>
.v-expansion-panel-content__wrap {
  padding-left: 0;
  padding-right: 0;
}
.v-expansion-panel {
  border-radius: 0;
}
.v-expansion-panel::before,
.v-expansion-panel::after {
  content: none;
}
.v-expansion-panels > div {
  width: 100%;
}
</style>