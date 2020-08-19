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
                field: 'img',
                value: section.img
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
      :class="{mDark: section.settings.background === 'dark'}"
    >
      <div class="landing__container">
        <div class="questions__row">
          <image-item
            divClass="questions__illustration"
            :img="section.img"
            :items="null"
            field="img"
            :sectionId="section.id"
          />
          <div class="questions__body">
            <h2 v-if="isEdit">
              <editor :text="section.title || ''" :sectionId="section.id" field="title" />
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
                <a
                  class="button button-primary"
                  @click.prevent="formDialogQuestion = true"
                >Задать вопрос</a>
                <form-dialog :section="section" field="form_callback" v-model="formDialogQuestion"></form-dialog>
              </div>
              <div class="questions__action">
                <a
                  class="button button-secondary"
                  @click.prevent="formDialogCallback = true"
                >Заказать звонок</a>
                <form-dialog :section="section" field="form_callback" v-model="formDialogCallback"></form-dialog>
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
      isEdit: "isEdit",
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
  },
  data: () => ({
    formDialogQuestion: false,
    formDialogCallback: false,
  }),
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
