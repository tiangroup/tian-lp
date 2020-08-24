# Подключенные плагины
## Slick slider
Официальная документация компонента: [https://www.npmjs.com/package/vue-slick](https://www.npmjs.com/package/vue-slick)
### Реактивное добавление, удаление, перемещение слайдов
При использовании slick с реактивным редактированием элементов (в т.ч. добавление, удаление, перемещение слайдов), необходимо вручную обновлять слайдер. Для этого задаеца переменная isSlick:true и создаеца метод

```vue
restartSlick() {
  this.isSlick = false;
  const _this = this;
  setTimeout(function() {
    _this.isSlick = true;
  }, 200);
}
```
#### NB: значение таймаута < 200 дает некорректную отрисовку слайдера - картинок в клонированных слайдах (.slick-cloned) нет.

У компонента [buttons-item](/components/admin/ButtonsItem.vue) можно использовать событие @onAction

```vue
<buttons-item
  ...
  @onAction="restartSlick"
/>
```
### Реактивные изменения отображения слайдера в зависимости от параметров страницы
Также не забывать отслеживать реактивные изменения через watch и перезагружать слик при необходимости. Например, в режиме редактирования у слайдеров infinity: false, а в режиме просмотра infinity: true. Тогда в watch отслеживаем переменную isEdit, которая отвечает за отображение элементов режима редактирования
```vue
watch: {
  isEdit: function () {
    this.restartSlick();
  },
},
```
### Клики на клонированных слайдах
При infinity: true создаюца клоны слайдов, на которые не копируюца вьюшные события. Клики и другие события нужно отслеживать вручную через метод handleInit()
```vue
<slick
  ...
  @init="handleInit"
>
```
## Vue-gallery
Гитхаб компонента: [https://github.com/RobinCK/vue-gallery](https://github.com/RobinCK/vue-gallery)

Настройка closeOnSlideClick: true не работает для видео.