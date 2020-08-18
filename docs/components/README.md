# Компоненты

## Формы

::: tip Папка
`/components/forms`
:::

### Форма на странице

`FormInline.vue`

Выводит форму на страницу.

```vue
<form-inline :section="section" :field="field"></form-inline>
```

| параметр |   тип    | значение        | по умолчанию |
| -------- | :------: | --------------- | ------------ |
| section  | `Object` | текущий section |              |
| field    | `String` | поле формы      | `form`       |

### Кнопка с диалоговым окном

`FormPopup.vue`

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
| field       | `String` | поле формы                                                       | `form`           |
| buttonClass | `String` | класс кнопки                                                     | `button-primary` |
| hiddenData  | `String` | данные для скрытого поля формы, для передачи выбранного элемента |                  |

buttonClass :

- `button-primary` - кнопка с фоном
- `button-secondary` - прозрачная кнопка

### Диалоговое окно

`FormDialog.vue`

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
| field      | `String` | поле формы                                                       | `form`       |
| hiddenData | `String` | данные для скрытого поля формы, для передачи выбранного элемента |              |

::: tip Слот
Для компонент форм определён слот по умолчанию, данные выводятся после заголовка формы, перед полями
:::
