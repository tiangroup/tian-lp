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
            <div class="hero__action" v-if="button || form" :style="styleDiv">
              <buttons-form-editor
                v-if="isEdit && section.promo_form"
                :section="section"
                field="promo_form"
              />
              <v-dialog v-model="dialogButton" max-width="400">
                <template v-slot:activator="{ on, attrs }">
                  <a class="button button-primary" v-bind="attrs" v-on="on">
                    {{ buttonLabel }}
                  </a>
                </template>
                <form-popup
                  :section="section"
                  field="promo_form"
                  @close="dialogButton = false"
                />
              </v-dialog>
            </div>
          </div>

          <div class="cell cell-12 cell-sm-6 cell-lg-4" v-if="form">
            <form-inline :section="section" field="promo_form" />
          </div>
          <image-item
            v-if="image && !form"
            divClass="hero__image"
            :img="section.img"
            :items="null"
            field="img"
            :sectionId="section.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import MyComponent from "@/components/forms/BaseForm.vue";
export default {
  props: {
    section: Object
  },
  data: () => ({
    dialogButton: false
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
    },
    buttonLabel() {
      return "Кнопка";
    }
  },
  methods: {
    ...mapMutations({
      showImageUpload: "SET_DIALOG_IMAGE_UPLOAD",
      setImageUpload: "SET_IMAGE_UPLOAD"
    }),
    itemImageSelect() {
      this.setImageUpload({
        sectionId: this.section.id,
        field: "bg_img",
        items: null,
        value: this.section.bg_img
      });
      this.showImageUpload(true);
    },
    buttonClick() {
      // this.$modal.show(
      //   MyComponent,
      //   {
      //     section: this.section,
      //     field: "promo_form"
      //   },
      //   {
      //     height: "auto",
      //     scrollable: true
      //   }
      // );
      this.dialog = true;
    }
  }
};
</script>
