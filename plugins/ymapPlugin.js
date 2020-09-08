import Vue from "vue";
import YmapPlugin from "vue-yandex-maps";

const settings = {
  apiKey: ""
}; // настройки плагина

Vue.use(YmapPlugin, settings);
