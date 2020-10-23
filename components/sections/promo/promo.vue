<template>
  <div :class="{ 'position-relative': _isEdit }" :id="section.id">
    <buttons-section v-if="_isEdit" :section="section">
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
                value: section.bg_img,
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
          ? `background-image:url(\'${$site_img(section.bg_img, 'cover')}\');`
          : ''
      "
      :class="{
        mDark: section.settings.background === 'dark',
        'hero--w-button': button && !form,
      }"
    >
      <div class="landing__container">
        <div class="hero__row">
          <div class="hero__body">
            <h2 class="hero__title" v-if="isEdit">
              <editor
                :text="section.title || ''"
                :sectionId="section.id"
                field="title"
              />
            </h2>
            <h2 class="hero__title" v-else>{{ section.title }}</h2>
            <div class="hero__text" v-if="isEdit">
              <editor
                :text="section.description || ''"
                :sectionId="section.id"
                field="description"
              />
            </div>
            <div class="hero__text" v-else>{{ section.description }}</div>
            <div class="hero__timer" v-if="countdown">
              <timer></timer>
            </div>
            <div class="hero__action" v-if="button || form">
              <form-popup :section="section" field="promo_form"></form-popup>
            </div>
          </div>

          <div class="hero__form-wrap" v-if="form">
            <form-inline :section="section" field="promo_form" />
          </div>
          <image-item
            v-if="image && !form"
            divClass="hero__image"
            :img="section.img"
            :items="null"
            field="img"
            :sectionId="section.id"
            imageStyle="promo1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Timer from "../cta/Timer.vue";
export default {
  components: {
    Timer,
  },
  props: {
    section: Object,
  },
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit",
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
    },
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
    countdown() {
      return this.section.settings.countdown === true;
    },
  },
  methods: {
    itemImageSelect() {
      this.$images.upload({
        sectionId: this.section.id,
        field: "bg_img",
        items: null,
        value: this.section.bg_img,
      });
    },
  },
};
</script>
