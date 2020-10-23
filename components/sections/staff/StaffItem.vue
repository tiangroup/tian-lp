<template>
  <div :class="{ 'position-relative': isEdit }" class="staff__item-wrap cell">
    <buttons-item v-if="isEdit" :itemId="item.id" :sectionId="sectionId" />
    <div class="staff__item h-100">
      <image-item
        divClass="staff__image"
        :img="item.img"
        :itemId="item.id"
        :sectionId="sectionId"
        imageStyle="resize_sq_sm"
      />
      <div class="staff__info">
        <div class="staff__name" v-if="isEdit">
          <editor
            data-placeholder="Имя Фамилия"
            :text="item.name || ''"
            :sectionId="sectionId"
            field="name"
            :itemId="item.id"
          />
        </div>
        <div v-else class="staff__name">{{ item.name }}</div>
        <div class="staff__position" v-if="isEdit">
          <editor
            data-placeholder="должность"
            :text="item.position || ''"
            :sectionId="sectionId"
            field="position"
            :itemId="item.id"
          />
        </div>
        <div v-else class="staff__position">{{ item.position }}</div>
      </div>
      <div class="staff__contacts">
        <div class="staff__phone" v-if="isEdit">
          <editor
            data-placeholder="+7 351 111-22-33"
            :text="item.phone || ''"
            editContent="html"
            :sectionId="sectionId"
            field="phone"
            :itemId="item.id"
          />
        </div>
        <div v-else class="staff__phone" v-html="item.phone"></div>
        <div class="staff__email">
          <editor
            data-placeholder="mail@mail.ru"
            :text="item.email || ''"
            :sectionId="sectionId"
            field="email"
            :itemId="item.id"
            v-if="isEdit"
          />
          <a
            v-else-if="isValidEmail(item.email)"
            :href="`mailto:${item.email}`"
            >{{ item.email }}</a
          >
          <span v-else>{{ item.email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    sectionId: String,
    isEdit: Boolean,
  },
  data: () => ({}),
  methods: {
    isValidEmail(emailString) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(emailString);
    },
  },
};
</script>