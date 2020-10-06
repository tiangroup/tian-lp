<template>
  <v-card class="mb-4">
    <v-card-title>
      <span>{{ item.type }}</span>
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
        <v-select
          :items="types"
          item-text="name"
          item-value="value"
          label="Мессенджер"
          v-model="itemType"
        ></v-select>
        <v-text-field label="Ссылка" v-model="itemLink" />
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
import { mapMutations } from "vuex";
export default {
  props: {
    item: Object,
    sectionId: String,
    first: false,
    last: false
  },
  data: () => ({
    show: false,
    types: [
      {
        name: "Viber",
        value: "viber"
      },
      {
        name: "Whatsapp",
        value: "whatsapp"
      },
      {
        name: "Телеграм",
        value: "telegram"
      },
      {
        name: "Skype",
        value: "skype"
      }
    ]
  }),
  computed: {
    itemType: {
      get: function() {
        return this.item.type;
      },
      set: function(value) {
        this.setItem({
          sectionId: this.sectionId,
          items: "messengers",
          field: "type",
          itemId: this.item.id,
          value
        });
      }
    },
    itemLink: {
      get: function() {
        return this.item.link;
      },
      set: function(value) {
        this.setItem({
          sectionId: this.sectionId,
          items: "messengers",
          field: "link",
          itemId: this.item.id,
          value
        });
      }
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
        items: "messengers",
        itemId: this.item.id
      });
    },
    itemUp() {
      this.upItem({
        sectionId: this.sectionId,
        items: "messengers",
        itemId: this.item.id
      });
    },
    itemDelete() {
      this.deleteItem({
        sectionId: this.sectionId,
        items: "messengers",
        itemId: this.item.id
      });
    }
  }
};
</script>
