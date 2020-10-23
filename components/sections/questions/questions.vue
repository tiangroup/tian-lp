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
                field: 'img',
                value: section.img,
              })
            "
          >
            <v-icon>mdi-image</v-icon>
          </v-btn>
        </template>
        <span>Картинка</span>
      </v-tooltip>
    </buttons-section>
    <div
      class="questions custom-v-spacing-2 bg-primary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <div class="questions__row">
          <image-item
            divClass="questions__illustration"
            :img="section.img"
            :items="null"
            field="img"
            :sectionId="section.id"
            imageStyle="questions"
          />
          <div class="questions__body">
            <h2 v-if="isEdit">
              <editor
                :text="section.title || ''"
                :sectionId="section.id"
                field="title"
              />
            </h2>
            <h2 v-else>{{ section.title }}</h2>
            <div class="questions__text">
              <editor
                :text="section.description || ''"
                :sectionId="section.id"
                field="description"
                v-if="isEdit"
              />
              <div v-else>{{ section.description }}</div>
            </div>
            <div class="questions__actions">
              <div class="questions__action">
                <form-popup
                  :section="section"
                  field="form_callback"
                  buttonClass="button-primary"
                  popupClass="popup-callback"
                ></form-popup>
              </div>
              <div class="questions__action">
                <form-popup
                  :section="section"
                  field="form_question"
                  buttonClass="button-secondary"
                  popupClass="popup-question"
                ></form-popup>
              </div>
            </div>
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
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit",
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
    },
  },
  data: () => ({}),
  methods: {
    ...mapMutations({
      showImageUpload: "SET_DIALOG_IMAGE_UPLOAD",
      setImageUpload: "SET_IMAGE_UPLOAD",
    }),
    itemImageSelect() {
      this.setImageUpload({
        sectionId: this.section.id,
        field: "img",
        items: null,
        value: this.section.img,
      });
      this.showImageUpload(true);
    },
  },
};
</script>
