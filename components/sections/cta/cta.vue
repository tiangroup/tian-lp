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
      class="cta custom-v-spacing-2 mDark"
      :style="
        section.bg_img
          ? `background-image:url(\'${$site_img(section.bg_img)}\');`
          : ''
      "
    >
      <div class="landing__container">
        <div class="cta__body cells align-items-center justify-content-between">
          <div class="cta__text cell cell-12 cell-md-7 cell-xl-6">
            <h2 v-if="isEdit">
              <editor :text="section.title || ''" :sectionId="section.id" field="title" />
            </h2>
            <h2 v-else>{{ section.title }}</h2>
            <div class="cta__timer">
              <div class="timer">
                <div class="timer__text">До конца акции осталось</div>
                <div class="timer__time">
                  <span class="timer__value timer__value--days">28</span>
                  <span class="timer__value timer__value--hours">15</span>
                  <span class="timer__value timer__value--minutes">56</span>
                </div>
              </div>
            </div>
            <div class="cta__offer">
              <div class="cta__offer__text" v-if="isEdit">
                <editor
                  :text="section.description || ''"
                  :sectionId="section.id"
                  field="description"
                />
              </div>
              <div class="cta__offer__text" v-else>{{ section.description }}</div>
            </div>
            <image-item
              divClass="cta__offer__image"
              :img="section.img"
              :items="null"
              field="img"
              :sectionId="section.id"
            />
          </div>

          <div class="cell cell-12 cell-md-5 cell-xl-4">
            <form-inline :section="section" field="form_cta" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-theme cta__countdown">
      <div class="landing__container">
        <div class="cta__countdown__row">
          <div class="cta__countdown__timer">
            <div class="timer">
              <div class="timer__text">До конца акции осталось</div>
              <div class="timer__time">
                <span class="timer__value timer__value--days">28</span>
                <span class="timer__value timer__value--hours">15</span>
                <span class="timer__value timer__value--minutes">56</span>
              </div>
            </div>
          </div>
          <div class="cta__countdown__action">
            <a
              @click.prevent="dialogCtaBtn = true"
              class="button button-secondary"
            >Заказать прямо сейчас</a>
            <form-dialog :section="section" field="form_cta" v-model="dialogCtaBtn"></form-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    section: Object,
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    countdown() {
      return this.section.settings.countdown === true;
    },
  },
  data: () => ({
    dialogCtaBtn: false,
  }),
  methods: {
    ...mapMutations({
      showImageUpload: "SET_DIALOG_IMAGE_UPLOAD",
      setImageUpload: "SET_IMAGE_UPLOAD",
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
  },
};
</script>
