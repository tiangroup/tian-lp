<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
    <div
      class="staff custom-v-spacing custom-h-spacing bg-primary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <h2 v-if="isEdit">
          <editor :text="section.title || ''" :sectionId="section.id" field="title" />
        </h2>
        <h2 v-else>{{ section.title }}</h2>
        <div class="staff__list mx-n15 mx-md-n1rem" v-if="section.items && isSlick">
          <slick ref="slick" :options="updatedSlickOptions">
            <div
              class="staff__item-wrap cell"
              :class="{'position-relative': isEdit}"
              v-for="item in section.items.filter(i => i.id)"
              :key="item.id"
            >
              <buttons-item
                v-if="isEdit"
                :itemId="item.id"
                :sectionId="section.id"
                @onAction="onItemsChange"
                @onItemDelete="onItemDelete"
              />
              <div class="staff__item">
                <image-item
                  divClass="staff__image"
                  :img="item.img"
                  :itemId="item.id"
                  :sectionId="section.id"
                />
                <div class="staff__info">
                  <div class="staff__name" v-if="isEdit">
                    <editor
                      data-placeholder="Имя Фамилия"
                      :text="item.name || ''"
                      :sectionId="section.id"
                      field="name"
                      :itemId="item.id"
                    />
                  </div>
                  <div v-else class="staff__name">{{ item.name }}</div>
                  <div class="staff__position" v-if="isEdit">
                    <editor
                      data-placeholder="должность"
                      :text="item.position || ''"
                      :sectionId="section.id"
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
                      :sectionId="section.id"
                      field="phone"
                      :itemId="item.id"
                    />
                  </div>
                  <div v-else class="staff__phone" v-html="item.phone"></div>
                  <div class="staff__email">
                    <editor
                      data-placeholder="mail@mail.ru"
                      :text="item.email || ''"
                      :sectionId="section.id"
                      field="email"
                      :itemId="item.id"
                      v-if="isEdit"
                    />
                    <a
                      v-else-if="isValidEmail(item.email)"
                      :href="`mailto:${item.email}`"
                    >{{ item.email }}</a>
                    <span v-else>{{ item.email }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="staff__item-wrap cell"
              v-if="isEdit && (!section.items || !section.items.length)"
            >
              <buttons-item-add :sectionId="section.id" />
            </div>
          </slick>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    section: Object,
  },
  data: () => ({
    isSlick: true,
    slickOptions: {
      arrows: true,
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      draggable: false,
      infinite: false,
      prevArrow:
        '<button type="button" class="slick-arrow slick-prev"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L2 13.9706L15.966 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      nextArrow:
        '<button type="button" class="slick-arrow slick-next"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L15 13.9706L1.03398 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    },
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    updatedSlickOptions() {
      return Object.assign(this.slickOptions, {
        infinite: !this.isEdit,
        draggable: !this.isEdit,
      });
    },
  },
  methods: {
    isValidEmail(emailString) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(emailString);
    },
    onItemsChange(event) {
      console.log(event);
      this.restartSlick();
    },
    restartSlick() {
      this.isSlick = false;
      const _this = this;
      setTimeout(function () {
        _this.isSlick = true;
      }, 100);
    },
    async onItemDelete(payload) {
      const item = this.section.items.find((i) => i.id == payload.itemId);
      const formData = new FormData();
      formData.append("image", item.img);
      await this.$axios.post("/api/upload/image-remove", formData);
    },
  },
  watch: {
    isEdit: function () {
      this.updatedSlickOptions.infinite = !this.isEdit;
      this.updatedSlickOptions.draggable = !this.isEdit;
      this.restartSlick();
    },
  },
};
</script>
