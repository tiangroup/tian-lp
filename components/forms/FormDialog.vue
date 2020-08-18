<template>
  <div>
    <v-dialog v-model="value" max-width="400" @input="$emit('input', value)">
      <div class="der-popup" :style="styleDiv">
        <form-editor
          v-if="isEdit && section[field]"
          :section="section"
          :field="field"
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
          <div class="popup-callback">
            <form-base
              :section="section"
              :field="field"
              :hiddenData="hiddenData"
            >
              <slot></slot>
            </form-base>
          </div>
        </div>
      </div>
    </v-dialog>
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
    hiddenData: String,
    value: false
  },
  data: () => ({
    dialogButton: false
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
      getForm: "forms/form"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    }
  }
};
</script>
