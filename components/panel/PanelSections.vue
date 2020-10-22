<template>
  <div>
    <div class="tuning-panel__title">Настройка разделов</div>
    <div class="tuning-panel__blocks">
      <div class="tuning-panel__subtitle">Настройте внешний вид разделов</div>
      <div class="tuning-panel__block">
        <div class="tuning-panel__row mb-25px justify-content-between">
          <div class="tuning-sort">
            <v-expansion-panels accordion flat>
              <draggable
                v-model="sectsArray"
                handle=".sort-handle"
                @change="handleSectionsReorder"
              >
                <v-expansion-panel
                  class="tuning-sort__row"
                  v-for="(section, sectionIndex) in sectsArray.filter(
                    (s) => s.id
                  )"
                  :key="section.id + sectionIndex"
                  :class="{ 'tuning-sort__row--active': section.show === true }"
                >
                  <div class="tuning-sort__cell tuning-sort__name">
                    {{ sectionName(section) }}
                  </div>
                  <div class="tuning-sort__cell tuning-sort__action">
                    <v-expansion-panel-header
                      hide-actions
                      class="button button-icon"
                      @click="toggleSectionSettings(section.id)"
                    >
                      <span class="icon icon-tuning"></span>
                      <span class="sr-only">Настройки блока</span>
                    </v-expansion-panel-header>
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
      sectionMoved: {
        id: null,
        newIndex: null,
      },
      sectsArray: this.sections,
    };
  },
  computed: {
    ...mapGetters({
      sects: "sections/sections",
    }),
  },
  methods: {
    ...mapMutations({
      setSectionField: "pages/SET_SECTION_FIELD",
      moveSection: "pages/MOVE_SECTION",
    }),
    toggleSectionSettings(id) {
      document.getElementById(id).scrollIntoView();
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
      if (sectionConfig) {
        return sectionConfig.name;
      } else {
        return section.title;
      }
    },
    handleSectionsReorder(payload) {
      if (payload.moved) {
        this.moveSection({
          sectionId: payload.moved.element.id,
          newIndex: payload.moved.newIndex,
        });
      }
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
.v-expansion-panel-header {
  display: block;
  min-height: 0 !important;
  padding: 0;
  text-align: center !important;
}
</style>