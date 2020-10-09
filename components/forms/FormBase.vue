<template>
  <form
    class="form"
    @submit.prevent="onSubmit"
    :ref="`form-${form.id}`"
    v-if="form"
  >
    <div class="form__body">
      <div class="form__title">{{ form.form.title }}</div>
      <div class="form__intro" v-if="form.form.description">
        {{ form.form.description }}
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
        <button
          type="submit"
          class="button form__submit w-100 w-md-auto"
          :class="{ 'button--loading': loading }"
        >
          <span class="button__body">{{ form.form.button }}</span>
          <span class="button__spinner spinner"></span>
        </button>
      </div>
      <div class="form__text">
        Нажимая на кнопку, подтверждаю свое согласие с
        <a href @click.prevent="$forms.licence(true)"
          >условиями обработки персональных данных</a
        >
      </div>
    </div>
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
    formData: {},
    loading: false,
    message: false
  }),
  computed: {
    ...mapGetters({
      getForm: "forms/form",
      isEdit: "isEdit"
    }),
    styleDiv() {
      return this.isEdit
        ? {
            position: "relative"
          }
        : null;
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
    }),
    async onSubmit() {
      if (this.loading) return;
      this.loading = true;
      try {
        const formData = new FormData();
        for (let id of Object.keys(this.formData)) {
          if (this.formData[id] !== null) {
            formData.append(id, this.formData[id]);
          }
        }
        formData.append("id", this.formId);
        const { data } = await this.$axios.post(
          `${this.$site_app}/forms`,
          formData
        );
        this.formData = {};
        this.$refs[`form-${this.formId}`].reset();
        this.loading = false;
        this.$emit("send", {
          text: this.form.form.successMessage,
          //caption: "Форма отправлена",
          error: false
        });
      } catch (err) {
        this.loading = false;
        this.$emit("send", {
          error: true
        });
      }
    }
  },
  async mounted() {
    if (!this.formId && this.isEdit) {
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
<style scoped>
.der-popup a {
  color: var(--theme-color);
}
.der-popup a:hover {
  color: var(--theme-hover-color);
}
</style>
