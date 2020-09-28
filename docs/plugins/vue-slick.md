# Slick slider

Официальная документация компонента: [https://www.npmjs.com/package/vue-slick](https://www.npmjs.com/package/vue-slick)

## client-only

Слик нужно оборачивать в `<client-only>`. Для компонентов, для которых критична индексация содержимого слайдера задаем placeholder

```vue
<client-only>
  <slick>
    <video-item></video-item>
  </slick>
  <template slot="placeholder">
    <video-item :isEdit="false"></video-item>
  </template>
</client-only>
```

## Проблемы с реактивностью

У слика проблемы с динамически добавляемыми элементами и прочими реактивностями. Есть 2 пути решения.

### Директива :key для динамически пересоздаваемого слика

Для обновления слика можно использовать директиву :key, но простой key, зависящий от количества элементов в коллекции items не дает нужного эффекта (при удалении, перемещениях слайдов) или нет обновления или выдает ошибку. Поэтому можно формировать key следующим образом:

```js
itemsCount() {
  return this.section.items.length;
},
slickKey() {
  let key = "" + this.isEdit;
  if (this.itemsCount) {
    for (var i = 0; i < this.itemsCount; i++) {
      key += this.section.items[i].id;
    }
  }
  console.log(key);
  return key;
},
```

Если посмотреть на генерируемый key, видно будет, что при добавлении элементов сначала создаеца ключ ...undefined..., а потом уже key с правильным id нововставленного элемента.

### Обновление слика через v-if

#### Реактивное добавление, удаление, перемещение слайдов

При использовании slick с реактивным редактированием элементов (в т.ч. добавление, удаление, перемещение слайдов), необходимо вручную обновлять слайдер. Для этого задаеца переменная isSlick:true и создаеца метод

```js
restartSlick() {
    this.isSlick = false;
    const _this = this;
    setTimeout(function() {
        _this.isSlick = true;
      }, 200);
  }
```

##### NB: значение таймаута < 200 дает некорректную отрисовку слайдера - картинок в клонированных слайдах (.slick-cloned) нет.

У компонента [buttons-item](/components/admin/ButtonsItem.vue) можно использовать событие @onAction

```vue
<buttons-item ... @onAction="restartSlick" />
```

#### Добавление первого элемента в коллекцию кнопкой \<buttons-item-add\>

Вручную перерисовывать слайдер. Можно рещить через отслеживание количества элементов в section.items и если было 0, стало 1, перерисовываеца слайдер. Теоретически можно было бы использовать эту схему для перерисовки слайдера в прочих случаях, описанных выше (см. Реактивное добавление, удаление, перемещение слайдов), но перемещение элементов не дает обновления section.items -> слайдер не перерисовываеца.

#### Реактивные изменения отображения слайдера в зависимости от параметров страницы

Также не забывать отслеживать реактивные изменения через watch и перезагружать слик при необходимости. Например, в режиме редактирования у слайдеров infinity: false, а в режиме просмотра infinity: true. Тогда в watch отслеживаем переменную isEdit, которая отвечает за отображение элементов режима редактирования

```js
watch: {
  isEdit: function () {
      this.restartSlick();
  },
},
```

## Перемещение к n-слайду

При обновлении слайдера было бы неплохо перемещать его к нужному слайду. Частично это можно реализовать, если запоминать позицию слайдера перед обновлением. Для этого

```js
beforeUpdate: function () {
  if (this.$refs.slick) {
    this.currentSlide = this.$refs.click.currentSlide;
  }
},
```

А в методе инициализации слика перемещаем слайдер к сохраненному слайду

```js
handleInit(event, slick) {
  if (this.currentSlide) {
    slick.goTo(this.currentSlide, true);
  }
}
```

Такая обработка не гарантирует перемещения туда, куда точно надо, нужно ее усложнять (добавили слайд, нужно переместить к новому, по факту происходит перемещение к предыдущему слайду и пр.)

## Клики на клонированных слайдах

При infinity: true создаюца клоны слайдов, на которые не копируюца вьюшные события. Клики и другие события нужно отслеживать вручную через метод handleInit(). Не забывать потом отвязывать события в beforeDestroy.

```js
<slick @init="handleInit"></slick>
...
methods: {
  handleInit(event, slick) {
    document
      .getElementById(this.section.id)
      .addEventListener("click", this.handleClick);
  },
  handleClick(e) {
    if(e.target.closest(".slick-cloned")) {
      console.log("clone click");
    }
  }
},
beforeDestroy: function () {
  document
    .getElementById(this.section.id)
    .removeEventListener("click", this.handleClick);
},
```

## Синхронизация сликов

Конечно же, ничего не работает, как должно. См. решения в [issues на гитхабе](https://github.com/staskjs/vue-slick/issues/68)
