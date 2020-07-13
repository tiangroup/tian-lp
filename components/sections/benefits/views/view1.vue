<template>
  <div
    class="benefits custom-h-spacing bg-primary"
    :class="{ mDark: section.settings.background === 'dark' }"
  >
    <div class="landing__container">
      <h2 v-if="isEdit">
        <editor
          :text="section.title || ''"
          :sectionId="section.id"
          field="title"
        />
      </h2>
      <h2 v-else>{{ section.title }}</h2>
      <div class="benefits__intro" v-if="isEdit">
        <editor
          :text="section.description || ''"
          :sectionId="section.id"
          field="description"
        />
      </div>
      <div class="benefits__intro" v-else v-html="section.description"></div>
      <div class="benefits__list cells benefits__list--style1">
        <div
          class="cell cell-12 cell-sm-6 cell-lg-3"
          v-for="item in section.items.filter(i => i.id)"
          :key="item.id"
          :style="styleDiv"
        >
          <buttons-item
            v-if="isEdit"
            :itemId="item.id"
            :sectionId="section.id"
            @onItemDelete="onDeleteItem"
          />
          <div class="benefits__item">
            <div
              class="benefits__image"
              :class="{ 'no-image': !item.img }"
              :title="isEdit ? 'Двойной клик - изменить картинку' : ''"
              @dblclick="
                itemImageSelect({
                  id: item.id,
                  field: 'img',
                  items: 'items',
                  value: item.img
                })
              "
            >
              <img v-if="item.img" :src="item.img" />
            </div>

            <div class="benefits__body">
              <div v-if="isEdit" class="benefits__title">
                <editor
                  :text="item.title || ''"
                  :sectionId="section.id"
                  field="title"
                  :itemId="item.id"
                />
              </div>
              <div v-else class="benefits__title">{{ item.title }}</div>

              <div v-if="isEdit" class="benefits__description">
                <editor
                  :text="item.description || ''"
                  :sectionId="section.id"
                  field="description"
                  :itemId="item.id"
                />
              </div>
              <div v-else class="benefits__description">
                {{ item.description }}
              </div>
            </div>
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
export default {
  props: {
    section: Object,
    isEdit: Boolean
  },
  components: {
    Editor: () => import("@/components/admin/Editor"),
    ButtonsItem: () => import("@/components/admin/ButtonsItem"),
    ImageUpload: () => import("@/components/admin/ImageUpload")
  },
  computed: {
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    }
  },
  data: () => ({
    dialogImageUpload: false,
    itemImageEdit: {}
  }),
  methods: {
    itemImageSelect(item) {
      this.itemImageEdit = item;
      this.dialogImageUpload = true;
    },
    async onUploadImage(data) {
      await this.$emit("itemFieldEdit", data);
      this.dialogImageUpload = false;
    },
    onDeleteItem(payload) {
      this.$emit("onItemDelete", payload);
    }
  }
};
</script>
