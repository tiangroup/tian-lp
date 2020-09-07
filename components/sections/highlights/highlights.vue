<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />

    <div
      class="highlights bg-primary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <div class="highlights__list cells">
          <div
            class="highlights__item cell cell-12 cell-sm-6 cell-lg-3"
            v-for="item in section.items.filter(i => i.id)"
            :key="item.id"
            :style="styleDiv"
          >
            <buttons-item
              v-if="isEdit"
              :itemId="item.id"
              :sectionId="section.id"
            />
            <v-menu v-if="isEdit" absolute offset-y>
              <template v-slot:activator="{ on }">
                <div
                  v-on="on"
                  class="highlights__icon"
                  :class="{ 'no-image': !item.svg }"
                  v-html="item.svg"
                  style="cursor: pointer"
                ></div>
              </template>
              <v-list>
                <v-list-item
                  @click="
                    itemSvgSelect({
                      items: 'items',
                      itemId: item.id,
                      field: 'svg',
                      value: item.svg
                    })
                  "
                >
                  <v-list-item-title>
                    Изменить картинку
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <div
              v-else
              class="highlights__icon"
              :class="{ 'no-image': !item.svg }"
              v-html="item.svg"
            ></div>
            <div class="highlights__text" v-if="isEdit">
              <editor
                :text="item.title || ''"
                :sectionId="section.id"
                field="title"
                :itemId="item.id"
              />
            </div>
            <div class="highlights__text" v-else>{{ item.title }}</div>
          </div>
          <div
            class="highlights__item cell cell-12 cell-sm-6 cell-lg-3"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <buttons-item-add :sectionId="section.id" />
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
    section: Object
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    }
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    itemSvgSelect(item) {
      this.$images.svg({
        value: item.value,
        callback: value => {
          this.setItemField({
            sectionId: this.section.id,
            itemId: item.itemId,
            items: item.items,
            field: item.field,
            value
          });
        }
      });
    }
  }
};
</script>
