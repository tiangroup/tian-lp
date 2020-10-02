<template>
  <div class="contacts__map">
    <client-only>
      <yandex-map
        :settings="settings"
        :coords="mapCenter"
        zoom="10"
        class="contacts__map__container"
        @map-was-initialized="processMap"
        :controls="mapControls"
        :behaviors="mapBehaviors"
        v-if="showMap"
      >
        <ymap-marker
          v-for="item in items.filter((i) => i.id)"
          :key="item.id"
          :coords="getCoords(item.coords)"
          :icon="markerIcon"
          marker-id="item.id"
          :hint-content="item.title"
          :balloon-template="balloonTemplate"
        />
      </yandex-map>
    </client-only>
  </div>
</template>
<script>
import { yandexMap, ymapMarker, loadYmap } from "vue-yandex-maps";
export default {
  components: { yandexMap, ymapMarker, loadYmap },
  props: {
    items: Array,
    mapKey: String,
  },
  data: () => ({
    mapCenter: [55.159897, 61.402554],
    mapControls: [
      "fullscreenControl",
      "routeEditor",
      "trafficControl",
      "typeSelector",
      "zoomControl",
    ],
    mapBehaviors: ["drag", "dblClickZoom", "multiTouch"],
    myMap: null,
    markerIcon: {
      layout: "default#image",
      iconImageHref: "/assets/images/icon-loc.svg",
      iconImageSize: [38, 45],
      iconImageOffset: [-19, -40],
    },
    showMap: false,
  }),
  computed: {
    settings() {
      return {
        apiKey: this.mapKey || "",
        lang: "ru_RU",
      };
    },
    balloonTemplate(item) {
      return `
        <p>${item.title}</p>
        <p>${item.address}</p>
        <p>${item.phone}</p>
      `;
    },
  },
  methods: {
    processMap(map) {
      if (map) {
        this.myMap = map;
        this.placeMarkers(map);
        this.$emit("map-ready", map);
      }
    },
    placeMarkers(map) {
      // map.geoObjects.removeAll();
      // for (var i = 0; i < this.items.length; i++) {
      //   if (this.items[i].coords) {
      //     let place = this.items[i];
      //     let coords = place.coords.replace(/\s+/g, "").split(",");
      //     let title = place.title || "";
      //     let address = place.address || "";
      //     let phone = place.phone || "";
      //     var placemark = new ymaps.Placemark(
      //       coords,
      //       {
      //         balloonContentHeader: title,
      //         balloonContentBody: address + "<br>" + phone,
      //       },
      //       {
      //         iconLayout: "default#image",
      //         iconImageHref: "/assets/images/icon-loc.svg",
      //         iconImageSize: [38, 45],
      //         iconImageOffset: [-19, -40],
      //       }
      //     );
      //     map.geoObjects.add(placemark);
      //   }
      // }
      // map
      //   .setBounds(map.geoObjects.getBounds(), {
      //     checkZoomRange: true,
      //   })
      //   .then(function () {
      //     if (map.getZoom() > 16) {
      //       map.setZoom(16);
      //     }
      //   });
    },
    getCoords(coords) {
      return coords.replace(/\s+/g, "").split(",");
    },
  },
  mounted: function () {
    this.showMap = true;
  },
  // watch: {
  //   items: function () {
  //     if (this.myMap) {
  //       this.placeMarkers(this.myMap);
  //     }
  //   },
  // },
};
</script>

<style>
.contacts__map__container {
  height: 100%;
  width: 100%;
  display: block;
}
</style>
