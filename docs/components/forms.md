# Формы

::: tip Папка компонент
`/components/forms`
:::

## FormInline

Выводит форму на страницу.

```vue
<form-inline :section="section" :field="field"></form-inline>
```

| параметр |   тип    | значение        | по умолчанию |
| -------- | :------: | --------------- | ------------ |
| section  | `Object` | текущий section |              |
| field    | `String` | имя поля формы  | `form`       |

## FormPopup

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

## FormDialog

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
