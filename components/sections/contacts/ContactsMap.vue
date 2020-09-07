<template>
  <div class="contacts__map">
    <!-- <yandex-map 
    :coords="mapCenter" 
    zoom="10" 
    class="contacts__map__container"
    @map-was-initialized="processMap"
    :controls="mapControls"
    ></yandex-map>-->
  </div>
</template>
<script>
export default {
  props: {
    items: Array
  },
  data: () => ({
    mapCenter: [55.159897, 61.402554],
    mapControls: [
      "fullscreenControl",
      "routeEditor",
      "trafficControl",
      "typeSelector",
      "zoomControl"
    ]
  }),
  methods: {
    processMap(map) {
      console.log(this.items);
      for (var i = 0; i < this.items.length; i++) {
        var placemark = new ymaps.Placemark(
          this.addr[i].coords,
          {
            iconCaption: place.name,
            balloonContentHeader: place.name,
            balloonContentBody: place.address + "<br>" + place.phone
          },
          {
            iconLayout: "default#image",
            // Своё изображение иконки метки.
            iconImageHref: "~/assets/images/icon-loc--map.png",
            // Размеры метки.
            iconImageSize: [38, 45],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-19, -40]
          }
        );
        map.geoObjects.add(placemark);
        map.setBounds(map.geoObjects.getBounds(), {
          checkZoomRange: true
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
