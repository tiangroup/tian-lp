# Блоки страницы

::: tip Папка компонентов блока
`/components/sections`

Каждый блок помещается в свою подпапку с соответствующим названием.
:::

В корне `/components/sections` находится компонент Section.vue, в нём регистрируются компоненты блоков:

```js
  ...
  import sections_header from "~/components/sections/header/header";
  import sections_benefits from "~/components/sections/benefits/benefits";
  import sections_highlights from "~/components/sections/highlights/highlights";
  import sections_process from "~/components/sections/process/process";
  export default {
    components: {
      sections_header,
      sections_benefits,
      sections_highlights,
      sections_process,
      ...
    },
    ...
  }
```

Название компонента блока должно быть вида `sections_benefits` , что соответствует названию компоненты в базе `"__component": "sections.benefits"`.

В каждый блок передаются следующие параметры:

| Параметр | Тип       | Значение             |
| -------- | --------- | -------------------- |
| section  | `Object`  | section блока        |
| isEdit   | `Boolean` | режим редактирования |
