<template>
  <div class="custom-h-spacing contacts--style2">
    <div class="landing__container">
      <div class="contacts__body">
        <h2>
          <editor :text="section.title || ''" :sectionId="section.id" field="title" v-if="isEdit" />
          <span v-else>{{ section.title }}</span>
        </h2>
        <div class="contacts__list mx-ncell">
          <slick :ref="slickRef" :options="updatedSlickOptions" v-if="isSlick" @init="handleInit">
            <div
              class="cell"
              :class="{ 'position-relative': isEdit }"
              v-for="item in section.items.filter(i => i.id)"
              :key="item.id"
            >
              <buttons-item
                v-if="isEdit"
                :itemId="item.id"
                :sectionId="section.id"
                @onAction="onItemsChange"
              />
              <div class="contacts__item department">
                <div class="department__title" v-if="item.title || isEdit">
                  <editor
                    data-placeholder="Филиал"
                    :text="item.title || ''"
                    :sectionId="section.id"
                    field="title"
                    :itemId="item.id"
                    v-if="isEdit"
                  />
                  <span v-else>{{ item.title }}</span>
                </div>
                <div class="department__address" v-if="item.address || isEdit">
                  <div class="department__address__text" v-if="isEdit">
                    <editor
                      data-placeholder="Введите адрес"
                      :text="item.address || ''"
                      :sectionId="section.id"
                      field="address"
                      :itemId="item.id"
                    />
                    <editor
                      data-placeholder="55.159897, 61.402554"
                      :text="item.coords || ''"
                      :sectionId="section.id"
                      field="coords"
                      :itemId="item.id"
                    />
                  </div>
                  <div v-else>{{ item.address }}</div>
                  <a
                    :data-coords="item.coords"
                    href
                    class="department__address__link"
                    @click.prevent="showItemOnMap(getItemCoords(item.coords))"
                    v-if="view === 'view2'"
                  >Показать на карте</a>
                </div>
                <div class="department__emails" v-if="item.email || isEdit">
                  <div class="department__email">
                    <editor
                      data-placeholder="Введите email"
                      :text="item.email || ''"
                      :sectionId="section.id"
                      field="email"
                      :itemId="item.id"
                      editContent="html"
                      v-if="isEdit"
                    />
                    <div v-else v-html="item.email"></div>
                  </div>
                </div>
                <div class="department__phones">
                  <div class="department__phone">
                    <div class="department__phone__link">
                      <a href="tel:+79088000890">+7 (908) 8000-890</a>
                    </div>
                    <div class="department__messenger messenger">
                      <ul class="messenger__list">
                        <li class="messenger__item">
                          <a href="tg://resolve?domain=username" class="messenger__link">
                            <span class="sr-only">Ссылка на чат в Телеграм</span>
                            <svg
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z"
                                fill="currentColor"
                              />
                            </svg>
                          </a>
                        </li>
                        <li class="messenger__item">
                          <a href="skype:USERNAME?chat" class="messenger__link">
                            <span class="sr-only">Ссылка на чат в Skype</span>
                            <svg
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m23.309 14.547c1.738-7.81-5.104-14.905-13.139-13.543-4.362-2.707-10.17.352-10.17 5.542 0 1.207.333 2.337.912 3.311-1.615 7.828 5.283 14.821 13.311 13.366 5.675 3.001 11.946-2.984 9.086-8.676zm-7.638 4.71c-2.108.867-5.577.872-7.676-.227-2.993-1.596-3.525-5.189-.943-5.189 1.946 0 1.33 2.269 3.295 3.194.902.417 2.841.46 3.968-.3 1.113-.745 1.011-1.917.406-2.477-1.603-1.48-6.19-.892-8.287-3.483-.911-1.124-1.083-3.107.037-4.545 1.952-2.512 7.68-2.665 10.143-.768 2.274 1.76 1.66 4.096-.175 4.096-2.207 0-1.047-2.888-4.61-2.888-2.583 0-3.599 1.837-1.78 2.731 2.466 1.225 8.75.816 8.75 5.603-.005 1.992-1.226 3.477-3.128 4.253z"
                                fill="currentColor"
                              />
                            </svg>
                          </a>
                        </li>
                        <li class="messenger__item">
                          <a href="viber://add?number=%2Bnumber" class="messenger__link">
                            <span class="sr-only">Ссылка на чат в Viber</span>
                            <svg
                              width="40"
                              height="40"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 50 50"
                              version="1.1"
                            >
                              <path
                                d="M44.781 13.156c-.781-2.789-2.328-4.992-4.593-6.55-2.86-1.973-6.149-2.668-8.989-3.094-3.93-.586-7.488-.668-10.883-.254-3.18.39-5.574 1.012-7.757 2.015-4.282 1.97-6.852 5.153-7.637 9.461a58.837 58.837 0 0 0-.79 5.79c-.343 4.171-.03 7.863.954 11.285.96 3.336 2.637 5.718 5.125 7.285.633.398 1.445.687 2.23.965.446.156.88.308 1.235.476.328.153.328.18.324.453-.027 2.371 0 7.02 0 7.02l.008.992h1.781l.29-.281c.19-.18 4.605-4.446 6.179-6.164l.215-.239c.27-.312.27-.312.547-.316 2.125-.043 4.296-.125 6.453-.242 2.613-.14 5.64-.395 8.492-1.582 2.61-1.09 4.515-2.82 5.66-5.14 1.195-2.423 1.902-5.044 2.168-8.016.469-5.227.137-9.762-1.012-13.864zM35.383 33.48c-.656 1.067-1.633 1.81-2.785 2.29-.844.351-1.703.277-2.535-.075-6.965-2.949-12.43-7.593-16.04-14.273-.746-1.375-1.261-2.875-1.855-4.328-.121-.297-.113-.649-.168-.977.05-2.347 1.852-3.672 3.672-4.07.695-.156 1.312.09 1.828.586a16.005 16.005 0 0 1 3.41 4.715c.371.777.203 1.465-.43 2.043-.132.12-.27.23-.414.34-1.445 1.085-1.656 1.91-.886 3.546 1.312 2.785 3.492 4.657 6.308 5.817.742.304 1.442.152 2.008-.45.078-.078.164-.156.219-.25 1.11-1.851 2.723-1.667 4.21-.613.977.696 1.927 1.43 2.891 2.137 1.473 1.082 1.461 2.098.567 3.562zM26.145 15c-.329 0-.657.027-.98.082a.999.999 0 1 1-.328-1.973c.429-.074.87-.109 1.308-.109C30.477 13 34 16.523 34 20.855c0 .442-.035.883-.11 1.31a1 1 0 0 1-1.972-.33A5.865 5.865 0 0 0 26.145 15zM31 21c0 .55-.45 1-1 1s-1-.45-1-1c0-1.652-1.348-3-3-3-.55 0-1-.45-1-1s.45-1 1-1c2.758 0 5 2.242 5 5zm5.71 2.223a1 1 0 0 1-1.952-.446 8.875 8.875 0 0 0 .219-1.96c0-4.86-3.957-8.817-8.817-8.817-.664 0-1.324.074-1.96.219a.996.996 0 0 1-1.196-.754.996.996 0 0 1 .754-1.195c.781-.18 1.59-.27 2.402-.27 5.965 0 10.817 4.852 10.817 10.816 0 .813-.09 1.622-.266 2.407z"
                                fill="currentColor"
                              />
                            </svg>
                          </a>
                        </li>
                        <li class="messenger__item">
                          <a href="https://wa.me/79991112233" class="messenger__link">
                            <span class="sr-only">Ссылка на чат в Whatsapp</span>
                            <svg
                              width="24"
                              height="24"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              xml:space="preserve"
                            >
                              <path
                                d="M256.064,0h-0.128C114.784,0,0,114.816,0,256c0,56,18.048,107.904,48.736,150.048l-31.904,95.104l98.4-31.456
                              			C155.712,496.512,204,512,256.064,512C397.216,512,512,397.152,512,256S397.216,0,256.064,0z M405.024,361.504
                              			c-6.176,17.44-30.688,31.904-50.24,36.128c-13.376,2.848-30.848,5.12-89.664-19.264C189.888,347.2,141.44,270.752,137.664,265.792
                              			c-3.616-4.96-30.4-40.48-30.4-77.216s18.656-54.624,26.176-62.304c6.176-6.304,16.384-9.184,26.176-9.184
                              			c3.168,0,6.016,0.16,8.576,0.288c7.52,0.32,11.296,0.768,16.256,12.64c6.176,14.88,21.216,51.616,23.008,55.392
                              			c1.824,3.776,3.648,8.896,1.088,13.856c-2.4,5.12-4.512,7.392-8.288,11.744c-3.776,4.352-7.36,7.68-11.136,12.352
                              			c-3.456,4.064-7.36,8.416-3.008,15.936c4.352,7.36,19.392,31.904,41.536,51.616c28.576,25.44,51.744,33.568,60.032,37.024
                              			c6.176,2.56,13.536,1.952,18.048-2.848c5.728-6.176,12.8-16.416,20-26.496c5.12-7.232,11.584-8.128,18.368-5.568
                              			c6.912,2.4,43.488,20.48,51.008,24.224c7.52,3.776,12.48,5.568,14.304,8.736C411.2,329.152,411.2,344.032,405.024,361.504z"
                                fill="currentColor"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="department__phone">
                    <div class="department__phone__link">
                      <a href="tel:+79088000890">+7 (351) 223-45-67</a>
                    </div>
                    <div class="department__messenger messenger">
                      <ul class="messenger__list">
                        <li class="messenger__item">
                          <a href="tg://resolve?domain=username" class="messenger__link">
                            <span class="sr-only">Ссылка на чат в Телеграм</span>
                            <svg
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z"
                                fill="currentColor"
                              />
                            </svg>
                          </a>
                        </li>
                        <li class="messenger__item">
                          <a href="skype:USERNAME?chat" class="messenger__link">
                            <span class="sr-only">Ссылка на чат в Skype</span>
                            <svg
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m23.309 14.547c1.738-7.81-5.104-14.905-13.139-13.543-4.362-2.707-10.17.352-10.17 5.542 0 1.207.333 2.337.912 3.311-1.615 7.828 5.283 14.821 13.311 13.366 5.675 3.001 11.946-2.984 9.086-8.676zm-7.638 4.71c-2.108.867-5.577.872-7.676-.227-2.993-1.596-3.525-5.189-.943-5.189 1.946 0 1.33 2.269 3.295 3.194.902.417 2.841.46 3.968-.3 1.113-.745 1.011-1.917.406-2.477-1.603-1.48-6.19-.892-8.287-3.483-.911-1.124-1.083-3.107.037-4.545 1.952-2.512 7.68-2.665 10.143-.768 2.274 1.76 1.66 4.096-.175 4.096-2.207 0-1.047-2.888-4.61-2.888-2.583 0-3.599 1.837-1.78 2.731 2.466 1.225 8.75.816 8.75 5.603-.005 1.992-1.226 3.477-3.128 4.253z"
                                fill="currentColor"
                              />
                            </svg>
                          </a>
                        </li>
                        <li class="messenger__item">
                          <a href="viber://add?number=%2Bnumber" class="messenger__link">
                            <span class="sr-only">Ссылка на чат в Viber</span>
                            <svg
                              width="40"
                              height="40"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 50 50"
                              version="1.1"
                            >
                              <path
                                d="M44.781 13.156c-.781-2.789-2.328-4.992-4.593-6.55-2.86-1.973-6.149-2.668-8.989-3.094-3.93-.586-7.488-.668-10.883-.254-3.18.39-5.574 1.012-7.757 2.015-4.282 1.97-6.852 5.153-7.637 9.461a58.837 58.837 0 0 0-.79 5.79c-.343 4.171-.03 7.863.954 11.285.96 3.336 2.637 5.718 5.125 7.285.633.398 1.445.687 2.23.965.446.156.88.308 1.235.476.328.153.328.18.324.453-.027 2.371 0 7.02 0 7.02l.008.992h1.781l.29-.281c.19-.18 4.605-4.446 6.179-6.164l.215-.239c.27-.312.27-.312.547-.316 2.125-.043 4.296-.125 6.453-.242 2.613-.14 5.64-.395 8.492-1.582 2.61-1.09 4.515-2.82 5.66-5.14 1.195-2.423 1.902-5.044 2.168-8.016.469-5.227.137-9.762-1.012-13.864zM35.383 33.48c-.656 1.067-1.633 1.81-2.785 2.29-.844.351-1.703.277-2.535-.075-6.965-2.949-12.43-7.593-16.04-14.273-.746-1.375-1.261-2.875-1.855-4.328-.121-.297-.113-.649-.168-.977.05-2.347 1.852-3.672 3.672-4.07.695-.156 1.312.09 1.828.586a16.005 16.005 0 0 1 3.41 4.715c.371.777.203 1.465-.43 2.043-.132.12-.27.23-.414.34-1.445 1.085-1.656 1.91-.886 3.546 1.312 2.785 3.492 4.657 6.308 5.817.742.304 1.442.152 2.008-.45.078-.078.164-.156.219-.25 1.11-1.851 2.723-1.667 4.21-.613.977.696 1.927 1.43 2.891 2.137 1.473 1.082 1.461 2.098.567 3.562zM26.145 15c-.329 0-.657.027-.98.082a.999.999 0 1 1-.328-1.973c.429-.074.87-.109 1.308-.109C30.477 13 34 16.523 34 20.855c0 .442-.035.883-.11 1.31a1 1 0 0 1-1.972-.33A5.865 5.865 0 0 0 26.145 15zM31 21c0 .55-.45 1-1 1s-1-.45-1-1c0-1.652-1.348-3-3-3-.55 0-1-.45-1-1s.45-1 1-1c2.758 0 5 2.242 5 5zm5.71 2.223a1 1 0 0 1-1.952-.446 8.875 8.875 0 0 0 .219-1.96c0-4.86-3.957-8.817-8.817-8.817-.664 0-1.324.074-1.96.219a.996.996 0 0 1-1.196-.754.996.996 0 0 1 .754-1.195c.781-.18 1.59-.27 2.402-.27 5.965 0 10.817 4.852 10.817 10.816 0 .813-.09 1.622-.266 2.407z"
                                fill="currentColor"
                              />
                            </svg>
                          </a>
                        </li>
                        <li class="messenger__item">
                          <a href="https://wa.me/79991112233" class="messenger__link">
                            <span class="sr-only">Ссылка на чат в Whatsapp</span>
                            <svg
                              width="24"
                              height="24"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              xml:space="preserve"
                            >
                              <path
                                d="M256.064,0h-0.128C114.784,0,0,114.816,0,256c0,56,18.048,107.904,48.736,150.048l-31.904,95.104l98.4-31.456
                              			C155.712,496.512,204,512,256.064,512C397.216,512,512,397.152,512,256S397.216,0,256.064,0z M405.024,361.504
                              			c-6.176,17.44-30.688,31.904-50.24,36.128c-13.376,2.848-30.848,5.12-89.664-19.264C189.888,347.2,141.44,270.752,137.664,265.792
                              			c-3.616-4.96-30.4-40.48-30.4-77.216s18.656-54.624,26.176-62.304c6.176-6.304,16.384-9.184,26.176-9.184
                              			c3.168,0,6.016,0.16,8.576,0.288c7.52,0.32,11.296,0.768,16.256,12.64c6.176,14.88,21.216,51.616,23.008,55.392
                              			c1.824,3.776,3.648,8.896,1.088,13.856c-2.4,5.12-4.512,7.392-8.288,11.744c-3.776,4.352-7.36,7.68-11.136,12.352
                              			c-3.456,4.064-7.36,8.416-3.008,15.936c4.352,7.36,19.392,31.904,41.536,51.616c28.576,25.44,51.744,33.568,60.032,37.024
                              			c6.176,2.56,13.536,1.952,18.048-2.848c5.728-6.176,12.8-16.416,20-26.496c5.12-7.232,11.584-8.128,18.368-5.568
                              			c6.912,2.4,43.488,20.48,51.008,24.224c7.52,3.776,12.48,5.568,14.304,8.736C411.2,329.152,411.2,344.032,405.024,361.504z"
                                fill="currentColor"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="department__phone">
                    <div class="department__phone__link">
                      <a href="tel:+79088000890">+7 (912) 8230-890</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </slick>
        </div>
      </div>
    </div>
    <contacts-map
      :items="section.items"
      v-if="view === 'view2'"
      @map-ready="defineMyMap"
      :map-key="section.map_key"
    ></contacts-map>
  </div>
</template>

<script>
import ContactsMap from "./ContactsMap";
export default {
  props: {
    section: Object,
    isEdit: Boolean,
    view: {
      type: String,
      default: "view2",
    },
  },
  components: {
    ContactsMap,
  },
  data() {
    return {
      currentSlide: 0,
      isSlick: true,
      itemsQty: null,
      myMap: {},
      slickOptions: {
        arrows: true,
        dots: true,
        slidesToShow: 2,
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
    };
  },
  computed: {
    updatedSlickOptions() {
      return Object.assign(this.slickOptions, {
        infinite: !this.isEdit,
        draggable: !this.isEdit,
      });
    },
    slickRef() {
      return "slick" + this.section.id;
    },
  },
  methods: {
    onItemsChange(event) {
      this.restartSlick();
      this.itemsQty = this.section.items.length;
    },
    async restartSlick() {
      this.currentSlide = this.$refs[this.slickRef].currentSlide();
      this.isSlick = false;
      let enableSlick = new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 200);
      });
      this.isSlick = await enableSlick;
    },
    handleInit(event, slick) {
      slick.goTo(this.currentSlide, true);
      if (!this.isEdit && this.view === "view2") {
        const showItemOnMap = this.showItemOnMap;
        const [slickTrack] = slick.$slideTrack;
        let slidesCloned = slickTrack.querySelectorAll(".slick-cloned");
        let slidesRealLength = slickTrack.querySelectorAll(
          ".slick-slide:not(.slick-cloned)"
        ).length;
        for (let m = 0; m < slidesCloned.length; m++) {
          let slideItem = slidesCloned[m];
          let slideDetailLink = slideItem.querySelector(
            ".department__address__link"
          );
          if (slideDetailLink) {
            slideDetailLink.addEventListener("click", function (e) {
              e.preventDefault();
              let slideCoords = this.getAttribute("data-coords");
              showItemOnMap(slideCoords.replace(/\s+/g, "").split(","));
            });
          }
        }
      }
    },
    showItemOnMap(coords) {
      if (this.myMap) {
        this.$vuetify.goTo(".contacts__map", { duration: 500 });
        this.myMap.setCenter(coords);
        this.myMap.setZoom(16, {
          checkZoomRange: true,
        });
      }
    },
    defineMyMap(inst) {
      this.myMap = inst;
    },
    getItemCoords(str) {
      return str.replace(/\s+/g, "").split(",");
    },
  },
  mounted: function () {
    this.itemsQty = this.section.items.length;
  },
  watch: {
    isEdit: function () {
      this.restartSlick();
    },
    section: function () {
      if (
        this.isEdit &&
        this.itemsQty === 0 &&
        this.section.items.length === 1
      ) {
        this.restartSlick();
      }
    },
  },
};
</script>
<style>
.department__phone__link a {
  color: var(--text-color);
}
</style>
