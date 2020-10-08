# ImageItem

::: tip Компонент
`/components/admin/ImageItem.vue`
:::

Выводит блок с картинкой и встроенным редактором поля для картинки (загрузка картинки или вставки svg-кода картинки).

Для вывода картинки загруженного файла:

```vue
<image-item
  divClass="staff__image"
  :img="item.img"
  :itemId="item.id"
  :sectionId="section.id"
  imageStyle="rect_lg"
/>
```

Для вывода svg картинки:

```vue
<image-item
  divClass="highlights__icon"
  :svg="item.svg"
  :itemId="item.id"
  :sectionId="section.id"
  :field="null"
  fieldSvg="svg"
/>
```

Для вывода svg картинки или загруженного файла:

```vue
<image-item
  divClass="highlights__icon"
  :svg="item.svg"
  :img="item.img"
  :itemId="item.id"
  :sectionId="section.id"
  field="img"
  fieldSvg="svg"
  imageStyle="rect_lg"
/>
```

в результате будет выведена следующая разметка для загруженного файла:

```html
<div class="staff__image">
  <img src="/content-images/staff/s-1.jpg" />
</div>
```

для svg кода:

```html
<div class="highlights__icon">
  <svg ... fill="none" xmlns="http://www.w3.org/2000/svg">
    ...
  </svg>
</div>
```

| параметр   |   тип    | значение                                                                                | по умолчанию |
| ---------- | :------: | --------------------------------------------------------------------------------------- | ------------ |
| divClass   | `String` | класс блока с картинкой                                                                 |              |
| img        | `String` | ссылка на картинку (значение поля картинки)                                             |              |
| sectionId  | `String` | id текущего section                                                                     |              |
| field      | `String` | имя поля картинки                                                                       | `img`        |
| items      | `String` | имя поля массива элементов                                                              | `items`      |
| itemId     | `String` | id элемента                                                                             |              |
| fieldSvg   | `String` | имя поля для svg кода (если задано это поле, поле `field` игнорируется и выводится svg) |              |
| imageStyle | `String` | стиль размера картинки, которая будет обрезаться из исходной                            |              |

## imageStyle

Определены следующие стили размеров для картинок:

| стиль   | вид           | размер  |
| ------- | ------------- | ------- |
| icon_sm | иконка        | 46х46   |
| icon_md | иконка        | 63х63   |
| sq_sm   | квадрат       | 176х176 |
| sq_md   | квадрат       | 244х244 |
| sq_lg   | квадрат       | 520х520 |
| rect_sm | прямоугольник | 158х82  |
| rect_md | прямоугольник | 397х262 |
| rect_lg | прямоугольник | 592х391 |
