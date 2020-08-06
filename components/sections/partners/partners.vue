<template>
<div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
    <div class="partners custom-v-spacing bg-primary">
        <div class="landing__container">
          <h2>Партнеры</h2>
          <div class="partners__list cells justify-content-center">
            <div class="partners__item-wrap cell cell-6 cell-sm-4 cell-md-3 cell-xl-2">
              <div class="partners__item">
                <div class="partners__image"><img src="/assets/content-images/partners/p-1.png"></div>
                <div class="partners__text">Acer</div>
              </div>
            </div>
            <div class="partners__item-wrap cell cell-6 cell-sm-4 cell-md-3 cell-xl-2">
              <div class="partners__item">
                <div class="partners__image">
                  <a href="" target="_blank"><img src="/assets/content-images/partners/p-2.png"></a>
                </div>
                <div class="partners__text">Локомотив-Кубань</div>
              </div>
            </div>
            <div class="partners__item-wrap cell cell-6 cell-sm-4 cell-md-3 cell-xl-2">
              <div class="partners__item">
                <div class="partners__image"><img src="/assets/content-images/partners/p-3.png"></div>
                <div class="partners__text">
                  <a href="" target="_blank">Starbucks</a>
                </div>
              </div>
            </div>
            <div class="partners__item-wrap cell cell-6 cell-sm-4 cell-md-3 cell-xl-2">
              <div class="partners__item">
                <a href="" target="_blank">
                  <div class="partners__image"><img src="/assets/content-images/partners/p-4.png"></div>
                  <div class="partners__text">Газпром</div>
                </a>
              </div>
            </div>
            <div class="partners__item-wrap cell cell-6 cell-sm-4 cell-md-3 cell-xl-2">
              <div class="partners__item">
                <div class="partners__image"><img src="/assets/content-images/partners/p-5.png"></div>
                <div class="partners__text">DPD</div>
              </div>
            </div>
            <div class="partners__item-wrap cell cell-6 cell-sm-4 cell-md-3 cell-xl-2">
              <div class="partners__item">
                <div class="partners__image"><img src="/assets/content-images/partners/p-6.png"></div>
                <div class="partners__text">Supreme</div>
              </div>
            </div>
            <div class="partners__item-wrap cell cell-6 cell-sm-4 cell-md-3 cell-xl-2">
              <div class="partners__item">
                <div class="partners__image"><img src="/assets/content-images/partners/p-7.png"></div>
                <div class="partners__text">Dolce & Gabbana</div>
              </div>
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
  }
}
  
</script>