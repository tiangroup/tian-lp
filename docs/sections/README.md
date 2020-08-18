# Блоки

::: tip Папка компонентов блока
`/components/sections`

Каждый блок помещася в свою подпапку с названием блока.
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

Название должно быть вида `sections_benefits` , что соответствует названию компоненты в базе `"__component": "sections.benefits"`.
