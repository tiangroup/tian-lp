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
      class="cta custom-v-spacing-2 mDark"
      :style="
        section.bg_img
          ? `background-image:url(\'${$site_img(section.bg_img, 'cover')}\');`
          : ''
      "
    >
      <div class="landing__container">
        <div class="cta__body cells align-items-center justify-content-between">
          <div class="cta__text cell cell-12 cell-md-7 cell-xl-6">
            <h2 v-if="isEdit">
              <editor
                :text="section.title || ''"
                :sectionId="section.id"
                field="title"
              />
            </h2>
            <h2 v-else>{{ section.title }}</h2>
            <div
              class="cta__timer"
              v-if="countdown"
              @click.stop="callCtaDateDialog"
            >
              <timer :end-date="computedEndDate" @expired="reinitTimer"></timer>
            </div>
            <div class="cta__offer">
              <div class="cta__offer__text" v-if="isEdit">
                <editor
                  :text="section.description || ''"
                  :sectionId="section.id"
                  field="description"
                />
              </div>
              <div class="cta__offer__text" v-else>
                {{ section.description }}
              </div>
            </div>
            <image-item
              divClass="cta__offer__image"
              :img="section.img"
              :items="null"
              field="img"
              :sectionId="section.id"
              imageStyle="resize_md"
            />
          </div>

          <div class="cell cell-12 cell-md-5 cell-xl-4">
            <form-inline :section="section" field="form_cta" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-theme cta__countdown" v-if="countdown">
      <div class="landing__container">
        <div class="cta__countdown__row">
          <div class="cta__countdown__timer" @click.stop="callCtaDateDialog">
            <timer :end-date="computedEndDate" @expired="reinitTimer"></timer>
          </div>
          <div class="cta__countdown__action">
            <form-popup
              :section="section"
              field="form_cta"
              buttonClass="button-secondary"
              popupClass="popup-order"
            ></form-popup>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialogCtaDate" width="290px">
      <v-date-picker v-model="ctaDate" scrollable>
        <v-spacer></v-spacer>
        <v-btn depressed text color="gray" @click="dialogCtaDate = false"
          >Отменить</v-btn
        >
        <v-btn depressed text color="primary" @click="saveCtaDate(ctaDate)"
          >Сохранить</v-btn
        >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Timer from "./Timer.vue";
export default {
  components: {
    Timer,
  },
  props: {
    section: Object,
  },
  data: () => ({
    dialogCtaDate: false,
    ctaDate: "",
  }),
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit",
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
    },
    countdown() {
      return this.section.settings.countdown === true;
    },
    computedEndDate() {
      if (this.section.date) {
        return this.section.date;
      } else {
        let genDate = this.generateEndDate();
        return genDate;
      }
    },
  },
  methods: {
    ...mapMutations({
      showImageUpload: "SET_DIALOG_IMAGE_UPLOAD",
      setImageUpload: "SET_IMAGE_UPLOAD",
      setSectionField: "pages/SET_SECTION_FIELD",
    }),
    itemImageSelect() {
      this.setImageUpload({
        sectionId: this.section.id,
        field: "bg_img",
        items: null,
        value: this.section.bg_img,
      });
      this.showImageUpload(true);
    },
    callCtaDateDialog() {
      if (this.isEdit) {
        this.ctaDate = this.computedEndDate;
        this.dialogCtaDate = true;
      }
    },
    saveCtaDate(newDate) {
      this.setSectionField({
        id: this.section.id,
        field: "date",
        value: newDate,
      });
      this.$store.dispatch("pages/savePage");
      this.dialogCtaDate = false;
    },
    reinitTimer() {
      //console.log("expired");
      if (!this.isEdit) {
        let newEndDate = this.generateEndDate();
        this.saveCtaDate(newEndDate);
      }
    },
    generateEndDate() {
      let computedDate = new Date();
      // adding some magic numbers to make it look like smb cares
      computedDate.setTime(
        computedDate.getTime() + 84 * 60 * 60 * 1000 + 15 * 60 * 1000
      );
      return computedDate.toISOString().substr(0, 10);
    },
  },
  mounted: function () {
    if (!this.section.date) {
      this.ctaDate = this.generateEndDate();
    }
  },
};
</script>
