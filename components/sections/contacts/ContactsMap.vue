<template>
  <div class="contacts__map">
    <yandex-map
      :settings="settings"
      :coords="mapCenter"
      zoom="10"
      class="contacts__map__container"
      @map-was-initialized="processMap"
      :controls="mapControls"
      :behaviors="mapBehaviors"
    ></yandex-map>
  </div>
</template>
<script>
import { yandexMap } from "vue-yandex-maps";
export default {
  components: { yandexMap },
  props: {
    items: Array,
    mapKey: String
  },
  data: () => ({
    mapCenter: [55.159897, 61.402554],
    mapControls: [
      "fullscreenControl",
      "routeEditor",
      "trafficControl",
      "typeSelector",
      "zoomControl"
    ],
    mapBehaviors: ["drag", "dblClickZoom", "multiTouch"]
  }),
  computed: {
    settings() {
      return {
        apiKey: this.mapKey || "",
        lang: "ru_RU"
      };
    }
  },
  methods: {
    processMap(map) {
      for (var i = 0; i < this.items.length; i++) {
        let place = this.items[i];
        var placemark = new ymaps.Placemark(
          place.coords,
          {
            balloonContentHeader: place.name,
            balloonContentBody: place.address + "<br>" + place.phone
          },
          {
            iconLayout: "default#image",
            iconImageHref: "/icon-loc.svg",
            iconImageSize: [38, 45],
            iconImageOffset: [-19, -40]
          }
        );
        map.geoObjects.add(placemark);
        map
          .setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true
          })
          .then(function() {
            if (map.getZoom() > 16) {
              map.setZoom(16);
            }
          });
      }
      this.$emit("map-ready", map);
    }
  }
};
</script>

<style>
.contacts__map__container {
  height: 100%;
  width: 100%;
  display: block;
}
</style>
