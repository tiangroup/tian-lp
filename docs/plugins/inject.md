# inject

::: tip Плагин
`/plugins/inject.js`
:::

Плагин инжектирует (встраивает) некоторые общие функции и данные.

В компонентах доступен через `this.$name`

## site_api

`String`

Содержит url api данных

## site_app

`String`

Содержит url приложения

## images

`Object`

Функция `src` возвращает ссылку на изображение для сайта, передается значение из поля картинки

```js
const src = this.$images.src(img);
```

```vue
<img :src="$images.src(item.img)" />
```

Функция `upload` вызывает форму для загрузки изображения

```js
this.$images.upload({
  sectionId: this.sectionId, // id блока
  id: this.itemId, // id элемента (если загружается для элемента)
  field: this.field, // имя поля картинки
  items: this.items, // имя поля массива элементов (если загружается для элемента)
  value: this.img // значение поля картинки
});
```

## site_img(img)

Функция возвращает ссылку на изображение для сайта, передается значение из поля картинки, аналогична `$images.src(img)`

```vue
<img :src="$site_img(item.img)" />
```

## confirm(payload)

Функция вызывает диалоговое окно подтверждение действия пользователем

```js
methods: {
  imageDelete() {
    this.$confirm({
      title: "Удалить картинку",
      message: "Вы действительно хотите удалить картинку?",
      button: {
        no: "Отмена",
        yes: "Удалить"
      },
      callback: async confirm => {
        if (confirm) {
          ...
        }
      }
    });
  }
}
```

## overlay(show)

Показ оверлея(загрузки) на всю страницу

```js
methods: {
  async add() {
    ...
    this.$overlay(true);
    await this.savePage();
    this.$overlay(false);
  }
}
```
