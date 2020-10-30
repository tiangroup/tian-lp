<template>
  <div class="over">
    <v-dialog v-if="isCenter" v-model="dialog" max-width="400" scrollable>
      <div class="der-popup" :style="styleDiv">
        <form-editor-button
          v-if="isEdit && section[field]"
          :formId="section[field]"
        />
        <div class="der-popup__close">
          <button
            class="button button-icon button-close"
            @click="$emit('input', false)"
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
      v-model="dialog"
      v-if="!isCenter"
    >
      <div class="der-popup" :style="styleDiv">
        <form-editor-button
          v-if="isEdit && section[field]"
          :formId="section[field]"
        />
        <div class="der-popup__close">
          <button
            class="button button-icon button-close"
            @click="$emit('input', false)"
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
    value: false
  },
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
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    isCenter() {
      return this.settings.popup != "right" && this.settings.popup != "left";
    }
  },
  methods: {
    onSend(payload) {
      this.$emit("input", false);
      this.$forms.showMessage(payload);
    }
  },
  watch: {
    isEditor(value) {
      if (value) {
        this.$emit("input", false);
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
