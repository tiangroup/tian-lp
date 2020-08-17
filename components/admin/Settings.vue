<template>
  <div>
    <v-row class="ml-4 mr-4" v-if="sectionConfig">
      <div class="tuning-panel__block">
        <div class="tuning-panel__row mb-25">
          <div class="tuning-panel__cell">
            <div class="tuning-panel__block__title">
              «{{ sectionConfig.name }}»
            </div>
          </div>
          <div class="tuning-panel__cell">
            <div class="tuning-panel__block__bg tuning-bg">
              <div class="tuning-bg__title">Фон</div>
              <a
                v-for="(background, index) in sectionConfig.settings.background"
                :key="index"
                href=""
                class="tuning-bg__color"
                :class="[
                  {
                    'tuning-bg__color--active':
                      settings.background == background.value
                  },
                  background.class
                ]"
                @click.prevent="setBackroundSettings(background.value)"
              >
                <span class="sr-only">{{ background.title }}</span>
              </a>
            </div>
          </div>
        </div>

        <div
          class="tuning-panel__row tuning-panel__settings"
          v-if="sectionConfig.settings.view_type == 1"
        >
          <div
            class="tuning-panel__cell tuning-setting-wrap"
            v-for="view in sectionConfig.settings.view"
            :key="view.id"
          >
            <a
              href=""
              class="tuning-panel__setting tuning-setting"
              :class="{
                'tuning-setting--active': settings.view == view.value
              }"
              @click.prevent="setViewSettings(view.value)"
            >
              <div class="tuning-setting__image">
                <img v-if="view.img" :src="`${$url_api}${view.img.url}`" />
              </div>
              <div class="tuning-setting__title">{{ view.title }}</div>
            </a>
          </div>
        </div>

        <div
          class="tuning-panel__settings tuning-panel__settings--column"
          v-if="sectionConfig.settings.view_type == 2"
        >
          <div
            class="tuning-setting-wrap"
            v-for="view in sectionConfig.settings.view"
            :key="view.id"
          >
            <a
              href=""
              class="tuning-panel__setting tuning-setting"
              :class="{
                'tuning-setting--active': settings.view == view.value
              }"
              @click.prevent="setViewSettings(view.value)"
            >
              <div class="tuning-setting__image">
                <img v-if="view.img" :src="`${$url_api}${view.img.url}`" />
              </div>
              <div class="tuning-setting__title">{{ view.title }}</div>
            </a>
          </div>
        </div>

        <div
          class="tuning-panel__row tuning-panel__options"
          v-if="sectionConfig.settings.options"
        >
          <div
            class="tuning-panel__cell tuning-option-wrap"
            v-for="(option, index) in sectionConfig.settings.options"
            :key="index"
          >
            <label
              class="tuning-panel__option tuning-option field field--check"
            >
              <input
                type="checkbox"
                class="field__input"
                :name="option.field"
                :checked="settings[option.field] === true"
                @change="setOptionsSettings"
              />
              <div class="fake-checkbox"></div>
              <div class="field__label">{{ option.label }}</div>
            </label>
          </div>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    component: String,
    sectionId: String,
    settings: Object
  },
  computed: {
    ...mapGetters({
      sections: "sections/sections",
      isApp: "isApp"
    }),
    sectionConfig: function() {
      return this.sections.find(item => item.component === this.component);
    }
  },
  methods: {
    ...mapMutations({
      setSettingsField: "pages/SET_SETTINGS_FIELD"
    }),
    setBackroundSettings(bg) {
      this.setSettingsField({
        id: this.sectionId,
        field: "background",
        value: bg
      });
    },
    setViewSettings(view) {
      this.setSettingsField({
        id: this.sectionId,
        field: "view",
        value: view
      });
    },
    setOptionsSettings(event) {
      const name = event.target.name;
      const checked = event.target.checked;
      this.setSettingsField({
        id: this.sectionId,
        field: name,
        value: checked
      });
    }
  }
};
</script>
