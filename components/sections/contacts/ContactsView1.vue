<template>
  <div class="contacts--style1" v-intersect="onContactsIntersect">
    <div class="landing__container">
      <div class="contacts__row">
        <div class="contacts__body custom-v-spacing-2">
          <h2>
            <editor-text
              :text="section.title"
              :sectionId="section.id"
              field="title"
            />
          </h2>
          <div
            :class="{ 'position-relative': isEdit }"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <div class="item__add-button">
              <buttons-item-add :sectionId="section.id" />
            </div>
            <v-skeleton-loader
              boilerplate
              type="paragraph@2"
            ></v-skeleton-loader>
          </div>
          <div
            v-for="item in section.items.filter(isMainOffice)"
            :key="item.id"
          >
            <div
              class="addresses contacts__addresses connect__item"
              v-if="item.address || isEdit"
            >
              <div class="connect__row">
                <div class="connect__icon">
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.51855 6.5V5.5H6.48187V6V6.5H5.51855Z"
                      stroke="currentColor"
                    />
                    <path
                      d="M1.55675 8.72429C1.35405 8.39072 1.12937 7.72073 1.03953 6.84679C0.951568 5.99119 1.00319 5.03402 1.26707 4.15293C1.52927 3.27743 1.99072 2.50633 2.70692 1.95137C3.41745 1.40082 4.45966 1 5.99998 1C7.54031 1 8.58252 1.40082 9.29305 1.95138C10.0093 2.50634 10.4707 3.27745 10.7329 4.15295C10.9968 5.03404 11.0484 5.99121 10.9605 6.8468C10.8706 7.72074 10.6459 8.39072 10.4432 8.72426C9.99777 9.45729 9.18444 10.283 8.28452 11.0528C7.42138 11.7911 6.54621 12.4215 5.99997 12.7973C5.45373 12.4215 4.57854 11.7911 3.71541 11.0528C2.81549 10.283 2.00218 9.4573 1.55675 8.72429Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </div>
                <div class="connect__instances">
                  <div class="connect__instance">
                    <editor-text
                      data-placeholder="Введите адрес"
                      :text="item.address"
                      :sectionId="section.id"
                      field="address"
                      :itemId="item.id"
                    />
                  </div>
                  <div class="connect__instance" v-if="isEdit">
                    <editor-text
                      data-placeholder="55.159897, 61.402554"
                      :text="item.coords"
                      :sectionId="section.id"
                      field="coords"
                      :itemId="item.id"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="emails contacts__emails connect__item"
              v-if="item.email || isEdit"
            >
              <div class="connect__row">
                <div class="connect__icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 17C4.6106 17 1 13.4183 1 9C1 4.58172 4.55831 1 8.94771 1C13.3371 1 17 4.58172 17 9C17 10.227 16.5492 11.4609 16.0588 12.5"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M7.30964 5.99503C7.30964 5.99503 7.90258 5.23119 8.94647 4.83495C9.25804 4.71668 10.8183 4.49947 11.6592 5.49973C12.5 6.5 11.9999 7.97431 11.9999 10.4508C11.9999 11.7566 11.9726 12.5195 12.8729 13.1724C13.3116 13.4907 15.2451 14.1049 16.5 11.9997M11.6601 8.99863C11.1895 8.49863 9.29559 8.05535 7.99997 8.57732C6.95421 8.99863 6.10848 10.2229 6.32581 11.5244C6.51728 12.6709 7.37534 13.2185 8.5 13.4997C10.5 13.9997 11.7635 12.3665 11.7635 12.3665"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                </div>
                <div class="connect__instances">
                  <div class="connect__instance">
                    <editor-html
                      data-placeholder="Введите email"
                      :text="item.email"
                      :sectionId="section.id"
                      field="email"
                      :itemId="item.id"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="phones contacts__phones connect__item">
              <div class="connect__row">
                <div class="connect__icon">
                  <svg
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 14V2C1 1.44772 1.44772 1 2 1H9C9.55228 1 10 1.44772 10 2V14C10 14.5523 9.55228 15 9 15H2C1.44772 15 1 14.5523 1 14Z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M4.5 11.5V9.5H6.5V11.5H4.5Z"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
                <div class="connect__instances">
                  <div class="connect__instance">
                    <editor-html
                      data-placeholder="+7 900 111-22-33"
                      :text="item.phone"
                      :sectionId="section.id"
                      field="phone"
                      :itemId="item.id"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="social contacts__social" v-if="section.socials.length">
            <div class="social__title">Мы в соцсетях:</div>
            <social-list :section="section" :isEdit="isEdit"></social-list>
          </div>
        </div>
        <contacts-map
          :items="getMainOffice()"
          :map-key="section.map_key"
          v-if="showMap"
        ></contacts-map>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import ContactsMap from "./ContactsMap";
export default {
  components: {
    ContactsMap
  },
  props: {
    section: Object,
    isEdit: Boolean
  },
  data() {
    return {
      myMap: {},
      showMap: false
    };
  },
  computed: {},
  methods: {
    getMainOffice() {
      var mainOffice = [];
      if (this.section.items && this.section.items.length) {
        mainOffice.push(this.section.items[0]);
      }
      return mainOffice;
    },
    isMainOffice(item, itemIndex) {
      if (item.id && itemIndex === 0) {
        return true;
      }
    },
    onContactsIntersect(entries, observer) {
      this.showMap = entries[0].isIntersecting;
    }
  }
};
</script>
