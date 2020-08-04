<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            x-small
            color="blue"
            v-bind="attrs"
            v-on="on"
            @click="
              itemImageSelect({
                field: 'bg_img',
                value: section.bg_img
              })
            "
          >
            <v-icon>mdi-image</v-icon>
          </v-btn>
        </template>
        <span>Фоновая картинка</span>
      </v-tooltip>
    </buttons-section>
    <div
      class="hero"
      :style="
        section.bg_img
          ? `background-image:url(\'${$site_img(section.bg_img)}\');`
          : ''
      "
      :class="{
        mDark: section.settings.background === 'dark',
        'hero--w-button': button && !form
      }"
    >
      <div class="landing__container">
        <div class="hero__row">
          <div class="hero__body">
            <h1 v-if="isEdit">
              <editor
                :text="section.title || ''"
                :sectionId="section.id"
                field="title"
              />
            </h1>
            <h1 v-else>{{ section.title }}</h1>
            <div class="hero__text" v-if="isEdit">
              <editor
                :text="section.description || ''"
                :sectionId="section.id"
                field="description"
              />
            </div>
            <div class="hero__text" v-else>
              {{ section.description }}
            </div>
            <div class="hero__action" v-if="button || form">
              <a href="#" class="button button-primary">Купить очки</a>
            </div>
          </div>

          <div class="cell cell-12 cell-sm-6 cell-lg-4" v-if="form">
            <base-form :formId="section.promo_form" v-if="section.promo_form" />
            <v-tooltip bottom v-else-if="isEdit">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  dark
                  x-small
                  color="green"
                  v-bind="attrs"
                  v-on="on"
                  @click="createPromoForm"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Добавить форму</span>
            </v-tooltip>
          </div>

          <div
            class="hero__image"
            v-if="image && !form"
            :title="isEdit ? 'Двойной клик - изменить картинку' : ''"
            :class="{
              'no-image': !section.img
            }"
            @dblclick="
              itemImageSelect({
                field: 'img',
                value: section.img
              })
            "
          >
            <img v-if="section.img" :src="$site_img(section.img)" />
          </div>
        </div>
      </div>
    </div>
    <image-upload
      v-if="isEdit"
      :dialog="dialogImageUpload"
      @close="dialogImageUpload = false"
      :itemImageEdit="itemImageEdit"
      @onUpload="onUploadImage"
    />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: {
    Editor: () => import("@/components/admin/Editor"),
    ButtonsSection: () => import("@/components/admin/ButtonsSection"),
    ImageUpload: () => import("@/components/admin/ImageUpload"),
    BaseForm: () => import("@/components/forms/BaseForm")
  },
  props: {
    section: Object
  },
  data: () => ({
    dialogImageUpload: false,
    itemImageEdit: {}
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    form() {
      return this.section.settings.form === true;
    },
    button() {
      return this.section.settings.button === true;
    },
    image() {
      return this.section.settings.image === true;
    }
  },
  methods: {
    ...mapMutations({
      setSectionField: "pages/SET_SECTION_FIELD"
    }),
    ...mapActions({
      savePage: "pages/savePage"
    }),
    itemImageSelect(item) {
      this.itemImageEdit = item;
      this.dialogImageUpload = true;
    },
    onUploadImage(payload) {
      this.dialogImageUpload = false;
      this.setSectionField({
        id: this.section.id,
        field: payload.field,
        value: payload.value
      });
      this.$store.dispatch("pages/savePage");
    },
    async createPromoForm() {
      if (!this.section.promo_form && this.isEdit) {
        const data = await this.$axios.$post("/api/data/forms", {
          form: {
            title: "Заголовок формы",
            button: "Отправить"
          },
          fields: [
            {
              label: "Имя",
              type: "text"
            },
            {
              label: "Телефон",
              type: "tel",
              required: true
            }
          ],
          admin: this.$auth.user.id
        });
        this.setSectionField({
          id: this.section.id,
          field: "promo_form",
          value: data.id
        });
        this.savePage();
      }
    }
  },
  async mounted() {}
};
</script>
