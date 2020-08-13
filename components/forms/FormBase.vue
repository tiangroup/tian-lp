<template>
  <form class="form">
    <div class="form__body" v-if="form">
      <div class="form__title">
        {{ form.form.title }}
      </div>
      <label
        class="field field--text"
        v-for="item in form.fields.filter(i => i.id)"
        :key="item.id"
        :class="{ 'field--required': item.required }"
      >
        <div class="field__label">
          {{ item.label }}
        </div>
        <input
          v-if="item.type == 'text'"
          type="text"
          class="field__input"
          :name="item.id"
          :required="!!item.required"
          v-model="formData[item.id]"
        />
        <input
          v-if="item.type == 'tel'"
          type="tel"
          class="field__input"
          :name="item.id"
          :required="!!item.required"
        />
        <input
          v-if="item.type == 'email'"
          type="email"
          class="field__input"
          :name="item.id"
          :required="!!item.required"
        />
      </label>

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
    }
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
