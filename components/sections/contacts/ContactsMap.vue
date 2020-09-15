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
    mapBehaviors: ["drag", "dblClickZoom", "multiTouch"],
    myMap: null
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
      this.myMap = map;
      this.placeMarkers(map);
      this.$emit("map-ready", map);
    },
    placeMarkers(map) {
      map.geoObjects.removeAll();
      for (var i = 0; i < this.items.length; i++) {
        if (!this.items[i] || !this.items[i].coords) {
          this.$emit("map-empty");
          break;
        }
        let place = this.items[i];
        let coords = place.coords.replace(/\s+/g, "").split(",");
        let title = place.title || "";
        let address = place.address || "";
        let phone = place.phone || "";
        var placemark = new ymaps.Placemark(
          coords,
          {
            balloonContentHeader: title,
            balloonContentBody: address + "<br>" + phone
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
    }
  },
  watch: {
    items: function() {
      this.placeMarkers(this.myMap);
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
