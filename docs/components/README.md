# Компоненты

## Текстовый редактор

::: tip Компонент
`/components/forms/Editor.vue`
:::

Выводит инлайн редактор для текстового поля.

```vue
<editor :text="section.title || ''" :sectionId="section.id" field="title" />
```

| параметр    |   тип    | значение                                                   | по умолчанию |
| ----------- | :------: | ---------------------------------------------------------- | ------------ |
| text        | `String` | редактируемый текст                                        |
| sectionId   | `String` | id section                                                 |              |
| field       | `String` | имя редактируемого поля                                    |              |
| items       | `String` | имя поля элементов, когда редактируется элемент            | `items`      |
| itemId      | `String` | id элемента, в котором редактируется текстовое поле        | `null`       |
| editContent | `String` | текст сохраняется с разметкой или без                      | `text`       |
| object      | `Object` | имя поля объекта в section для редактирования поля `field` | `null`       |

editContent :

- `text` - редактируемый текст должен быть без разметки
- `html` - редатируемый текст будет с разметкой

## Картинка

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

| параметр  |   тип    | значение                                                                                | по умолчанию |
| --------- | :------: | --------------------------------------------------------------------------------------- | ------------ |
| divClass  | `String` | класс блока с картинкой                                                                 |              |
| img       | `String` | ссылка на картинку (значение поля картинки)                                             |              |
| sectionId | `String` | id текущего section                                                                     |              |
| field     | `String` | имя поля картинки                                                                       | `img`        |
| items     | `String` | имя поля массива элементов                                                              | `items`      |
| itemId    | `String` | id элемента                                                                             |              |
| fieldSvg  | `String` | имя поля для svg кода (если задано это поле, поле `field` игнорируется и выводится svg) |              |

## Формы

::: tip Папка
`/components/forms`
:::

### FormInline.vue

Выводит форму на страницу.

```vue
<form-inline :section="section" :field="field"></form-inline>
```

| параметр |   тип    | значение        | по умолчанию |
| -------- | :------: | --------------- | ------------ |
| section  | `Object` | текущий section |              |
| field    | `String` | имя поля формы  | `form`       |

### FormPopup.vue

Выводит кнопку, по нажатию на которой вызывается диалоговое окно с формой.

```vue
<form-popup
  :section="section"
  :field="field"
  buttonClass="button-secondary"
></form-popup>
```

| параметр    |   тип    | значение                                                         | по умолчанию     |
| ----------- | :------: | ---------------------------------------------------------------- | ---------------- |
| section     | `Object` | текущий section                                                  |                  |
| field       | `String` | имя поля формы                                                   | `form`           |
| buttonClass | `String` | класс кнопки                                                     | `button-primary` |
| hiddenData  | `String` | данные для скрытого поля формы, для передачи выбранного элемента |                  |
| popupClass  | `String` | класс картинки в верхнем правом углу                             |                  |

buttonClass :

- `button-primary` - кнопка с фоном
- `button-secondary` - прозрачная кнопка

popupClass :

- `popup-order`
- `popup-callback`
- `popup-reviews`
- `popup-question`

### FormDialog.vue

Диалоговое окно с формой.

```vue
<a @click.prevent="dialog = true">Открыть</a>
...
<form-dialog :section="section" :field="field" v-model="dialog"></form-dialog>
...
<script>
export default {
  data: () => ({
    dialog: false
  })
};
</script>
```

| параметр   |   тип    | значение                                                         | по умолчанию |
| ---------- | :------: | ---------------------------------------------------------------- | ------------ |
| section    | `Object` | текущий section                                                  |              |
| field      | `String` | имя поля формы                                                   | `form`       |
| hiddenData | `String` | данные для скрытого поля формы, для передачи выбранного элемента |              |
| popupClass | `String` | класс картинки в верхнем правом углу                             |              |

popupClass :

- `popup-order`
- `popup-callback`
- `popup-reviews`
- `popup-question`

::: tip Слот
Для компонент форм определён слот по умолчанию, данные выводятся после заголовка формы, перед полями
:::
