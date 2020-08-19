# Блоки

::: tip Папка компонентов блока
`/components/sections`

Каждый блок помещается в свою подпапку с соответствующим названием.
:::

В корне `/components/sections` находится компонент Sections.vue, в нём регистрируются компоненты блоков:

```js
  ...
  components: {
    sections_header: () => import("~/components/sections/header/header"),
    sections_benefits: () => import("~/components/sections/benefits/benefits"),
    sections_highlights: () => import("~/components/sections/highlights/highlights"),
    sections_process: () => import("~/components/sections/process/process"),
    ...
  },
  ...
```

Название компонента блока должно быть вида `sections_benefits` , что соответствует названию компоненты в базе `"__component": "sections.benefits"`.

В каждый блок передаются следующие параметры:

| Параметр | Тип       | Значение             |
| -------- | --------- | -------------------- |
| section  | `Object`  | section блока        |
| isEdit   | `Boolean` | режим редактирования |
