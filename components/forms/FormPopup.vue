<template>
  <div class="over">
    <a
      class="button"
      :class="[buttonClass]"
      v-if="!isCenter"
      @click.prevent="dialogButton = true"
    >
      {{ button }}
    </a>
    <v-dialog v-else v-model="dialogButton" max-width="400" scrollable>
      <template v-slot:activator="{ on, attrs }">
        <a class="button" :class="[buttonClass]" v-bind="attrs" v-on="on">
          {{ button }}
        </a>
      </template>
      <div class="der-popup" :style="styleDiv" :class="{ mDark: isThemeDark }">
        <form-editor-button
          v-if="isEdit && section[field]"
          :formId="section[field]"
          popup
        />
        <div class="der-popup__close">
          <button
            class="button button-icon button-close"
            @click="dialogButton = false"
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
        <div class="der-popup__body">
          <div :class="popupClass">
            <form-base
              :section="section"
              :field="field"
              :hiddenData="hiddenData"
              @send="onSend"
            >
              <slot></slot>
            </form-base>
          </div>
        </div>
      </div>
    </v-dialog>
    <v-navigation-drawer
      app
      temporary
      class="over"
      width="400"
      :right="settings.popup == 'right'"
      v-model="dialogButton"
      v-if="!isCenter"
    >
      <div class="der-popup" :style="styleDiv" :class="{ mDark: isThemeDark }">
        <form-editor-button
          v-if="isEdit && section[field]"
          :formId="section[field]"
          popup
        />
        <div class="der-popup__close">
          <button
            class="button button-icon button-close"
            @click="dialogButton = false"
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
        <div class="der-popup__body">
          <div :class="popupClass">
            <form-base
              :section="section"
              :field="field"
              :hiddenData="hiddenData"
              @send="onSend"
            >
              <slot></slot>
            </form-base>
          </div>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    section: Object,
    field: {
      type: String,
      default: "form"
    },
    buttonClass: {
      type: String,
      default: "button-primary"
    },
    popupClass: {
      type: String
    },
    hiddenData: String,
    darkTheme: Boolean
  },
  data: () => ({
    dialogButton: false
  }),
  async fetch() {
    if (this.section[this.field]) {
      await this.$store.dispatch("forms/loadForm", this.section[this.field]);
    }
  },
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit",
      getForm: "forms/form",
      isEditor: "forms/isEditor",
      settings: "sites/settings"
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
    },
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    button() {
      const form_id = this.section[this.field];
      return form_id &&
        this.getForm(form_id) &&
        this.getForm(form_id).form.openButton
        ? this.getForm(form_id).form.openButton
        : "Открыть";
    },
    isCenter() {
      return this.settings.popup != "right" && this.settings.popup != "left";
    },
    isThemeDark() {
      return this.darkTheme || false;
    }
  },
  methods: {
    onSend(payload) {
      this.dialogButton = false;
      this.$forms.showMessage(payload);
    }
  },
  watch: {
    isEditor(value) {
      if (value) {
        this.dialogButton = false;
      }
    }
  }
};
</script>

<style scoped>
.over {
  z-index: 200;
}
</style>
