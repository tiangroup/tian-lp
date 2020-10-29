# EditorText

::: tip Компонент
`/components/admin/EditorText.vue`
:::

Выводит неформатированное текстовое поле.

```vue
<editor-text :text="section.title" :sectionId="section.id" field="title" />
```

| параметр  |   тип    | значение                                                   | по умолчанию |
| --------- | :------: | ---------------------------------------------------------- | ------------ |
| text      | `String` | редактируемый текст                                        |
| sectionId | `String` | id section                                                 |              |
| field     | `String` | имя редактируемого поля                                    |              |
| items     | `String` | имя поля элементов, когда редактируется элемент            | `items`      |
| itemId    | `String` | id элемента, в котором редактируется текстовое поле        | `null`       |
| object    | `String` | имя поля объекта в section для редактирования поля `field` | `null`       |
