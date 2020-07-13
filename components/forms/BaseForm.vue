<template>
  <div class="form-wrap bg-theme" :style="styleDiv" v-if="form">
    <buttons-form-editor v-if="isEdit && form" :form="form" />
    <form action="" class="form">
      <div class="form__body">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    formId: null
  },
  components: {
    ButtonsFormEditor: () => import("@/components/forms/ButtonsFormEditor")
  },
  mounted: async function() {
    if (this.formId) {
      await this.$store.dispatch("forms/loadForm", this.formId);
    }
  },
  computed: {
    ...mapGetters({
      getForm: "forms/form"
    }),
    loading() {
      return this.form ? false : true;
    },
    isEdit() {
      return this.$auth.loggedIn && this.form;
    },
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    form() {
      return this.getForm(this.formId);
    }
  }
};
</script>
