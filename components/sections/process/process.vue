<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
    <div
      class="process custom-h-spacing custom-v-spacing bg-primary"
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
        <div class="process__list cells" v-if="section.items">
          <div
            class="process__item cell cell-12 cell-sm-6 cell-lg-3"
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
              <template v-slot:activator="{ on, attrs }">
                <div v-on="on" v-bind="attrs">
                  <div
                    class="process__image"
                    :class="{ 'no-image': !item.svg }"
                    v-html="item.svg"
                  ></div>
                </div>
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
              class="process__image"
              :class="{ 'no-image': !item.svg }"
              v-html="item.svg"
            ></div>

            <div class="process__body">
              <div class="process__title" v-if="isEdit">
                <editor
                  :text="item.title || ''"
                  :sectionId="section.id"
                  field="title"
                  :itemId="item.id"
                />
              </div>
              <div class="process__title" v-else>
                {{ item.title }}
              </div>
              <div class="process__description" v-if="isEdit">
                <editor
                  :text="item.description || ''"
                  :sectionId="section.id"
                  field="description"
                  :itemId="item.id"
                />
              </div>
              <div class="process__description" v-else>
                {{ item.description }}
              </div>
            </div>
          </div>
          <div
            class="process__item cell cell-12 cell-sm-6 cell-lg-3"
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
import { mapMutations, mapGetters } from "vuex";
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
      // this.$images.svg({
      //   value: item.value,
      //   callback: value => {
      //     this.setItemField({
      //       sectionId: this.section.id,
      //       itemId: item.itemId,
      //       items: item.items,
      //       field: item.field,
      //       value
      //     });
      //   }
      // });
      this.$images.svg({
        sectionId: this.section.id,
        itemId: item.itemId,
        items: item.items,
        field: item.field,
        value: item.value
      });
    }
  }
};
</script>
