<template>
  <form class="form">
    <div class="form__body" v-if="form">
      <div class="form__title">
        {{ form.form.title }}
      </div>
      <slot></slot>
      <component
        v-for="item in form.fields.filter(i => i.id)"
        :key="item.id"
        :is="`input_${item.type}`"
        :item="item"
        v-model="formData[item.id]"
      />
      <div class="field field--submit">
        <button type="submit" class="button form__submit w-100 w-md-auto">
          <div class="button__body">
            {{ form.form.button }}
          </div>
        </button>
      </div>
      <div class="form__text">
        Нажимая на&nbsp;кнопку, подтверждаю свое согласие с&nbsp;<a href=""
          >условиями обработки персональных данных</a
        >
      </div>
    </div>
    <div class="form__message"></div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    section: Object,
    field: {
      type: String,
      default: "form"
    },
    hiddenData: String
  },
  components: {
    input_text: () => import("./inputs/FormInputText"),
    input_tel: () => import("./inputs/FormInputTel"),
    input_email: () => import("./inputs/FormInputEmail"),
    input_textarea: () => import("./inputs/FormInputTextarea"),
    input_check: () => import("./inputs/FormInputCheck"),
    input_radio: () => import("./inputs/FormInputRadio"),
    input_select: () => import("./inputs/FormInputSelect")
  },
  data: () => ({
    formData: {}
  }),
  async fetch() {
    if (this.formId) {
      await this.$store.dispatch("forms/loadForm", this.formId);
    }
  },
  computed: {
    ...mapGetters({
      getForm: "forms/form",
      isEdit: "isEdit"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    form() {
      return this.formId ? this.getForm(this.formId) : null;
    },
    formId() {
      return this.section[this.field];
    }
  },
  methods: {
    ...mapActions({
      savePage: "pages/savePage",
      addForm: "forms/addForm",
      loadForm: "forms/loadForm"
    })
  },
  async mounted() {
    if (!this.formId) {
      await this.addForm({
        sectionId: this.section.id,
        field: this.field
      });
      await this.savePage();
      await this.loadForm(this.formId);
    }
  }
};
</script>
