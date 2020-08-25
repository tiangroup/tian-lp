<template>
  <footer :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section"></buttons-section>
    <div class="footer bg-secondary">
      <div class="ascend">
        <a href="#page-header" class="ascend__link" title="Наверх"></a>
      </div>
      <div class="landing__container">
        <div class="footer__row">
          <div class="copy">&copy; 2020 Интернет-магазин VR</div>
          <div class="tian">
            Интернет-агентство Tian Group:
            <a href="https://it-tian.ru/">создание</a> и
            <a href="https://it-tian.ru/">продвижение</a> сайтов
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    ButtonsSection: () => import("@/components/admin/ButtonsSection"),
  },
  props: {
    section: Object,
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    view() {
      return this.section.settings.view || "view1";
    },
  },
};
</script>
