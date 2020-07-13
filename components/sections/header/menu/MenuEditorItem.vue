<template>
  <v-card class="mb-4">
    <v-card-title>
      <span>{{ menuItem.title }}</span>
      <v-spacer></v-spacer>
      <v-btn icon fab x-small color="green" v-if="!first" @click="itemUp">
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
      <v-btn icon fab x-small color="green" v-if="!last" @click="itemDown">
        <v-icon>mdi-arrow-down</v-icon>
      </v-btn>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <v-card-text v-show="show">
        <v-text-field label="Заголовок пункта" v-model="itemTitle" />
        <v-select
          :items="itemTypes"
          item-text="name"
          item-value="value"
          label="Тип пункта"
          v-model="itemType"
        ></v-select>
        <v-text-field
          label="Ссылка"
          v-model="itemLink"
          v-if="menuItem.type == 'link'"
        />
        <v-select
          :items="sectionsSelect"
          item-text="name"
          item-value="value"
          label="Блок"
          v-model="itemLink"
        ></v-select>
        <v-row class="mr-1">
          <v-spacer></v-spacer>
          <v-btn icon @click="itemDelete">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    sectionId: String,
    menuItem: {},
    first: false,
    last: false
  },
  data: () => ({
    show: false,
    itemTypes: [
      {
        name: "Ссылка на блок",
        value: "anchor"
      },
      {
        name: "Внешняя ссылка",
        value: "link"
      }
    ]
  }),
  computed: {
    ...mapGetters({
      page: "pages/page",
      sections: "sections/sections"
    }),
    itemTitle: {
      get: function() {
        return this.menuItem.title;
      },
      set: function(value) {
        this.setItem({
          sectionId: this.sectionId,
          items: "menu",
          field: "title",
          itemId: this.menuItem.id,
          value
        });
      }
    },
    itemType: {
      get: function() {
        return this.menuItem.type;
      },
      set: function(value) {
        this.setItem({
          sectionId: this.sectionId,
          items: "menu",
          field: "type",
          itemId: this.menuItem.id,
          value
        });
      }
    },
    itemLink: {
      get: function() {
        return this.menuItem.link;
      },
      set: function(value) {
        this.setItem({
          sectionId: this.sectionId,
          items: "menu",
          field: "link",
          itemId: this.menuItem.id,
          value
        });
      }
    },
    sectionsSelect() {
      const sections = this.page.sections
        .filter(s => s.show === true)
        .map(s => ({
          name:
            s.title ||
            this.sections.find(i => i.component == s.__component).name,
          value: s.slug ? `#${s.slug}` : `#${s.id}`
        }));

      return sections;
    }
  },
  methods: {
    ...mapMutations({
      setItem: "pages/SET_ITEM_FIELD",
      deleteItem: "pages/DELETE_ITEM",
      upItem: "pages/UP_ITEM",
      downItem: "pages/DOWN_ITEM"
    }),
    itemDown() {
      this.downItem({
        sectionId: this.sectionId,
        items: "menu",
        itemId: this.menuItem.id
      });
    },
    itemUp() {
      this.upItem({
        sectionId: this.sectionId,
        items: "menu",
        itemId: this.menuItem.id
      });
    },
    itemDelete() {
      this.deleteItem({
        sectionId: this.sectionId,
        items: "menu",
        itemId: this.menuItem.id
      });
    }
  }
};
</script>
