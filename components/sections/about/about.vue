<template>
  <div :id="section.id" :class="{ 'position-relative': _isEdit }">
    <buttons-section v-if="_isEdit" :section="section" />
    <div
      class="about custom-v-spacing bg-primary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <div class="about__wrap">
          <h2 v-if="isEdit">
            <editor
              :text="section.title || ''"
              :sectionId="section.id"
              field="title"
            />
          </h2>
          <h2 v-else>{{ section.title }}</h2>
          <image-item
            divClass="about__illustration"
            :img="section.img"
            :items="null"
            field="img"
            :sectionId="section.id"
            v-if="section.img || isEdit"
          />
          <div class="about__intro" v-if="isEdit">
            <editor
              :text="section.description || ''"
              :sectionId="section.id"
              field="description"
            />
          </div>
          <div class="about__intro" v-else v-html="section.description"></div>
          <div class="body-copy" v-if="isEdit">
            <editor
              data-placeholder="Контентная область"
              :text="section.content || ''"
              :sectionId="section.id"
              field="content"
              editContent="html"
            />
          </div>
          <div class="body-copy" v-else v-html="section.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    section: Object
  },
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit"
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
    },
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    }
  }
};
</script>
